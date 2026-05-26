import React from "react/jsx-runtime";
import { Glob } from "bun";
import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import { evaluate } from "@mdx-js/mdx";
import { MDXContent } from "mdx/types";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import z from "zod";
import {
  difference,
  isArray,
  keyBy,
  groupBy,
  forEach,
  partition,
  xor,
  isEqual,
} from "lodash-es";
import { type SlugOrExternalLink } from "../src/types/navigation";
import { guides as existingGuides } from "../src/__generated__/guides";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { toNativeAbsolute } from "./path";
import { formatRelativeUrl } from "../src/utils/formatRelativeUrl";
import { renderToStringAsync } from "../src/entry-server";
import { TagDetector } from "../src/components/tagDetector/tagDetector";
import { type DetectableTag } from "../src/components/tagDetector/provider";
import { markdownComponents } from "../src/markdownExports";
import { Router } from "wouter";
import { ThemeProvider } from "../src/theme/provider";
import pmap from "p-map";
import prettier from "prettier";
import { match } from "ts-pattern";
import * as tst from "ts-toolbelt";
import {
  sections,
  rngGuideVariants,
  isRngGuideSection,
  rngGuideSections,
} from "../src/guideSections";

dayjs.extend(utc);

// Only lower case letters, numbers, and hyphens
const slugChars = /^[a-z0-9-]+$/;

const SlugSchema = z
  .string()
  .refine((value) => value.length === 0 || slugChars.test(value))
  .transform((url) =>
    formatRelativeUrl({ url, leadingSlash: true, trailingSlash: true }),
  );

const DateSchema = z.string().refine((value) => dayjs(value).isValid(), {
  message: "Invalid date format",
});

const GuideSectionSchema = z.enum(sections);
const GuideVariantSchema = z.enum(rngGuideVariants);

const layouts = ["titled", "guide"] as const;

const categories = [
  "Home",
  "Gold, Silver, Crystal",
  "Transporter and Dream Radar",
  "Ruby and Sapphire",
  "Gamecube",
  "FireRed and LeafGreen",
  "Emerald",
  "Diamond, Pearl, and Platinum",
  "HeartGold and SoulSilver",
  "Black and White",
  "Black 2 and White 2",
  "X and Y",
  "Omega Ruby and Alpha Sapphire",
  "Sun and Moon",
  "Ultra Sun and Ultra Moon",
  "Sword and Shield",
  "Brilliant Diamond and Shining Pearl",
  "Legends Arceus",
  "GBA Tools",
  "NDS Tools",
  "3DS Tools",
  "Switch Tools",
  "USUM Challenges",
  "User Settings",
  "Game Hub",
] as const;

const emittedCategories = [
  "Home",
  "Gold, Silver, Crystal",
  "Transporter and Dream Radar",
  "Ruby and Sapphire",
  "Gamecube",
  "FireRed and LeafGreen",
  "Emerald",
  "Diamond, Pearl, and Platinum",
  "HeartGold and SoulSilver",
  "Black and White",
  "Black 2 and White 2",
  "X and Y",
  "Omega Ruby and Alpha Sapphire",
  "Sun and Moon",
  "Ultra Sun and Ultra Moon",
  "Sword and Shield",
  "Brilliant Diamond and Shining Pearl",
  "Legends Arceus",
  "GBA Overview",
  "GBA Technical Documentation",
  "USUM Challenges",
  "User Settings",
  "Game Hub",
] as const;

const CategorySchema = z.enum(categories);

const categoryAliases: Partial<
  Record<
    (typeof categories)[number],
    readonly (typeof emittedCategories)[number][]
  >
> = {
  "GBA Tools": ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
  "NDS Tools": [
    "Diamond, Pearl, and Platinum",
    "HeartGold and SoulSilver",
    "Black and White",
    "Black 2 and White 2",
  ],
  "3DS Tools": [
    "Transporter and Dream Radar",
    "X and Y",
    "Omega Ruby and Alpha Sapphire",
    "Sun and Moon",
    "Ultra Sun and Ultra Moon",
  ],
  "Switch Tools": [
    "Sword and Shield",
    "Brilliant Diamond and Shining Pearl",
    "Legends Arceus",
  ],
};

const normalizeCategories = (
  rawCategories: (typeof categories)[number][],
): (typeof emittedCategories)[number][] => {
  const normalized = rawCategories.flatMap((category) => {
    const aliased = categoryAliases[category];
    if (aliased != null) {
      return [...aliased];
    }

    return [category as (typeof emittedCategories)[number]];
  });

  return [...new Set(normalized)];
};

const isNew = (addedOn: string | null) => {
  if (addedOn == null) {
    return false;
  }

  return dayjs.utc(addedOn).isAfter(dayjs.utc().subtract(7, "days"));
};

// eslint-disable-next-line react-refresh/only-export-components -- This is not a component
const SingleOrMultipleSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.union([schema, schema.array()]).transform((value) => {
    return isArray(value) ? value : [value];
  });

const MAX_ORDER_PRIORITY = 20;

const DifficultySchema = z.enum(["easy", "medium", "hard"]);

const BaseGuideSchema = z
  .object({
    // Title shown at the top of the guide
    title: z.string(),
    // Title shown outside the guide, such as game pages
    navDrawerTitle: z
      .string()
      .nullish()
      .optional()
      .default(() => null),
    // Description of the guide link sharing
    description: z.string(),
    // Game or game alias the guide belongs to
    category: SingleOrMultipleSchema(CategorySchema),
    // URL slug for the guide, must be unique across all guides
    slug: SlugSchema,
    // Whether the guide is a rough draft
    isRoughDraft: z.boolean().default(false),
    // Groups guides on game pages
    section: GuideSectionSchema,
    // Orders guides within sections
    orderPriority: z
      .number()
      .min(0)
      .max(MAX_ORDER_PRIORITY)
      .default(MAX_ORDER_PRIORITY),
    // Difficulty level of the guide, used for display and ordering on game pages
    difficulty: DifficultySchema.nullable()
      .optional()
      .default(() => null),
    // Specifies if a guide is for retail, cfw-emu, or both
    variant: SingleOrMultipleSchema(GuideVariantSchema).optional(),
    // Hides from navigation
    hideFromNavDrawer: z.boolean().default(false),
    // Date the guide was added, used to determine "new" status. Should be in ISO format (YYYY-MM-DD).
    addedOn: z
      .union([DateSchema, z.null()])
      .nullish()
      .optional()
      .default(() => null),
    // Unused for base guides
    translation: z.null().optional().default(null),
    // Visual layout of the guide page
    layout: z.enum(layouts).default("guide"),
    // Used for SEO when renaming slugs. Keep the original page/slug, hide the page, and set the new slug as canonical.
    canonical: SlugSchema.optional(),
  })
  .transform(({ category, section, variant, ...meta }) => {
    const normalizedVariants = variant ?? [];
    const hasGuideSection = isRngGuideSection(section);

    if (hasGuideSection && normalizedVariants.length === 0) {
      throw new Error(
        `Guide section requires variant for ${meta.slug}. Add variant.`,
      );
    }

    if (!hasGuideSection && normalizedVariants.length > 0) {
      throw new Error(
        `Variant without guide section for ${meta.slug}. Add section: guide or remove the variant.`,
      );
    }

    const navDrawerTitle = meta.navDrawerTitle ?? meta.title;

    return {
      id: meta.slug,
      categories: normalizeCategories(category),
      section,
      guideVariants: hasGuideSection ? normalizedVariants : null,
      // Guide keys are used to link two guides together (e.g. retail and cfw-emu variants).
      // If we hide a guide from the nav drawer, use the unique slug to avoid conflicts.
      // Otherwise, use the rough draft status and title so same-named guides are grouped together.
      guideKey: meta.hideFromNavDrawer
        ? meta.slug
        : [meta.isRoughDraft, navDrawerTitle].join("-"),
      isNew: isNew(meta.addedOn),
      ...meta,
      navDrawerTitle,
      lastUpdated: null as string | null,
      type: "baseGuide" as const,
      canonical: meta.canonical,
    };
  });

const TranslatedGuideSchema = z
  .object({
    title: z.string(),
    navDrawerTitle: z
      .string()
      .nullish()
      .optional()
      .default(() => null),
    description: z.string(),
    slug: SlugSchema,
    translation: z.object({
      enSlug: SlugSchema,
      language: z.enum(["es", "zh", "fr", "it", "de"]),
    }),
    canonical: SlugSchema.optional(),
  })
  .transform((meta) => ({
    ...meta,
    hideFromNavDrawer: true,
    navDrawerTitle: meta.navDrawerTitle ?? meta.title,
    lastUpdated: null as string | null,
    type: "translatedGuide" as const,
    canonical: meta.canonical,
  }));

const SingleGuideMetadataSchema = z.union([
  BaseGuideSchema,
  TranslatedGuideSchema,
]);

// Can't easily reuse SingleOrMultipleSchema here because of the transform
const GuideMetadataSchema = z
  .union([SingleGuideMetadataSchema, z.array(SingleGuideMetadataSchema)])
  .transform((value) => {
    return isArray(value) ? value : [value];
  });

type GuideMetadata = z.infer<typeof SingleGuideMetadataSchema>;
type BaseGuideMetadata = Extract<GuideMetadata, { type: "baseGuide" }>;

type BaseGuideSchemaType = z.infer<typeof BaseGuideSchema>;

type Sections = (typeof sections)[number];
type RngSections = (typeof rngGuideSections)[number];
type NonRngSections = tst.U.Exclude<Sections, RngSections>;

type ExternalLinkInput = tst.O.Merge<
  tst.O.Pick<
    BaseGuideSchemaType,
    "addedOn" | "categories" | "navDrawerTitle" | "guideKey" | "difficulty"
  >,
  {
    url: string;
    orderPriority?: number;
    displayAttributes?: DetectableTag[];
  } & (
    | {
        section: RngSections;
        guideVariants: (typeof rngGuideVariants)[number][];
      }
    | {
        section: NonRngSections;
        guideVariants?: never;
      }
  )
>;

type ExternalLinkMetadata = tst.O.Merge<
  tst.O.Omit<BaseGuideSchemaType, "slug" | "type" | "canonical">,
  {
    type: "externalLink";
    displayAttributes: DetectableTag[];
    canonical: null;
    url: string;
  }
>;

const externalGuides: ExternalLinkInput[] = [
  {
    addedOn: "2026-03-01",
    categories: ["Black and White", "Black 2 and White 2"],
    section: "tool",
    navDrawerTitle: "niart120's Gen 5 web tool",
    guideKey: "gen5-web-tool",
    displayAttributes: ["web_tool"],
    url: "https://niart120.github.io/5genSearch-web/",
    difficulty: null,
  },
  {
    addedOn: "2026-04-26",
    categories: ["Emerald"],
    section: "other_rng",
    navDrawerTitle: "Battle Frontier",
    guideKey: "emerald-battle-frontier",
    displayAttributes: ["web_tool"],
    guideVariants: ["retail"],
    url: "https://pokemoncompletion.com/BattleFacilities/Emerald/RngManipulation",
    difficulty: null,
  },
];

const getGuideLanguage = (guide: GuideMetadata) => {
  return match(guide)
    .with({ type: "baseGuide" }, () => "en")
    .with(
      { type: "translatedGuide" },
      (matched) => matched.translation.language,
    )
    .exhaustive();
};

const getGuideGroupId = ({
  language,
  guideKey,
  categories,
}: {
  language: string;
  guideKey: string;
  categories: string[];
}) => {
  const categoriesKey = [...categories].sort().join("|");
  return `${language}:${guideKey}:${categoriesKey}`;
};

type SitePageFile = {
  file: string;
  content: string;
};

type GuideWithFile = GuideMetadata & { file: string };

type GuideWithTranslations = GuideWithFile & {
  categories: BaseGuideMetadata["categories"];
  guideKey: BaseGuideMetadata["guideKey"];
  section: BaseGuideMetadata["section"];
  guideVariants: BaseGuideMetadata["guideVariants"];
  translations: Record<string, string> | null;
};

type GuidePairingByGroup = Record<
  string,
  { retail: SlugOrExternalLink | null; cfwEmu: SlugOrExternalLink | null }
>;

type GuidePairing = GuidePairingByGroup[string];

type DerivedGuideMetadata = GuideWithTranslations & {
  translations: Record<string, string> | null;
  guideGroupId: string;
  guideVariantLinks: GuidePairing | null;
};

type DerivedExternalLinkMetadata = ExternalLinkMetadata & {
  translations: null;
  guideGroupId: string;
  guideVariantLinks: GuidePairing | null;
  displayAttributes: string[];
};

type FinalGuideForEmit = DerivedGuideMetadata | DerivedExternalLinkMetadata;
type GuidePairingSource = GuideWithTranslations | ExternalLinkMetadata;

const GENERATED_GUIDES_PATH = toNativeAbsolute(
  "../src/__generated__/guides.ts",
);
const GUIDE_HASHES_PATH = toNativeAbsolute(
  "../src/__generated__/guideHashes.json",
);

const createEmptyGuidePairing = (): GuidePairing => ({
  retail: null,
  cfwEmu: null,
});

const getGuidePairingGroupId = (guide: GuideWithTranslations) => {
  return getGuideGroupId({
    language: getGuideLanguage(guide),
    guideKey: guide.guideKey,
    categories: guide.categories,
  });
};

const getPairingGroupId = (guide: GuidePairingSource) => {
  if (guide.type === "externalLink") {
    return getGuideGroupId({
      language: "en",
      guideKey: guide.guideKey,
      categories: guide.categories,
    });
  }

  return getGuidePairingGroupId(guide);
};

const computeFileHash = (content: Buffer | string): string => {
  // Normalize to string and convert CRLF to LF for consistent hashing across platforms
  let text = typeof content === "string" ? content : content.toString("utf-8");
  text = text.replace(/\r\n/g, "\n");

  const buffer = Buffer.from(text, "utf-8");
  return createHash("sha256").update(buffer).digest("hex");
};

type GuideHashEntry = {
  hash: string;
  lastUpdated: string | null;
};

type GuideHashMap = Record<string, GuideHashEntry>;

const loadPreviousHashes = async (): Promise<GuideHashMap> => {
  try {
    const content = await fs.readFile(GUIDE_HASHES_PATH, { encoding: "utf8" });
    return JSON.parse(content);
  } catch {
    // File doesn't exist yet, return empty map
    return {};
  }
};

const buildGuideHashMap = async (
  guideFiles: SitePageFile[],
  guides: GuideWithFile[],
): Promise<Record<string, string>> => {
  const hashes: Record<string, string> = {};
  const fileToGuides = new Map<string, GuideWithFile[]>();

  // Group guides by file
  for (const guide of guides) {
    const guidesInFile = fileToGuides.get(guide.file) ?? [];
    guidesInFile.push(guide);
    fileToGuides.set(guide.file, guidesInFile);
  }

  // Compute hash per file and assign to all guides in that file
  for (const { file, content } of guideFiles) {
    const hash = computeFileHash(content);
    const guidesInFile = fileToGuides.get(file) ?? [];
    for (const guide of guidesInFile) {
      hashes[guide.slug] = hash;
    }
  }

  return hashes;
};

const applyUpdatedTimestamps = (
  guides: GuideWithFile[],
  previousHashes: GuideHashMap,
  currentHashes: Record<string, string>,
): GuideWithFile[] => {
  const today = dayjs.utc().format("YYYY-MM-DD");

  return guides.map((guide) => {
    const previousEntry = previousHashes[guide.slug];
    const currentHash = currentHashes[guide.slug];
    const previousHash = previousEntry?.hash;

    // If file has changed, update lastUpdated to today
    if (previousHash !== currentHash || previousHash == null) {
      const validated = DateSchema.parse(today);
      return {
        ...guide,
        lastUpdated: validated,
      };
    }

    // If file hasn't changed, restore the previous lastUpdated date
    if (previousEntry?.lastUpdated != null && previousHash === currentHash) {
      const validated = DateSchema.parse(previousEntry.lastUpdated);
      return {
        ...guide,
        lastUpdated: validated,
      };
    }

    // Guide existed before but had no lastUpdated stored — leave it as null
    return guide;
  });
};

const writePreviousHashes = async (
  currentHashes: Record<string, string>,
  guides: GuideWithFile[],
) => {
  const guidesBySlug = keyBy(guides, (guide) => guide.slug);
  const hashMap: GuideHashMap = {};

  // Build hash map with both hash and lastUpdated from current guides
  for (const [slug, hash] of Object.entries(currentHashes)) {
    const guide = guidesBySlug[slug];
    hashMap[slug] = {
      hash,
      lastUpdated: guide?.lastUpdated ?? null,
    };
  }

  // Sort keys for stable ordering across builds
  const sortedHashMap = Object.keys(hashMap)
    .sort()
    .reduce((acc: GuideHashMap, key) => {
      acc[key] = hashMap[key];
      return acc;
    }, {});

  await fs.mkdir(toNativeAbsolute("../src/__generated__"), {
    recursive: true,
  });
  await fs.writeFile(
    GUIDE_HASHES_PATH,
    JSON.stringify(sortedHashMap, null, 2) + "\n",
  );
};

const applyGuideVariantToPairing = ({
  pairing,
  variant,
  guideLink,
  groupId,
}: {
  pairing: GuidePairing;
  variant: (typeof rngGuideVariants)[number];
  guideLink: SlugOrExternalLink;
  groupId: string;
}): GuidePairing => {
  if (variant === "retail") {
    if (pairing.retail != null) {
      throw new Error(
        `Duplicate retail guide variant for group ${groupId} (${JSON.stringify(pairing.retail)}, ${JSON.stringify(guideLink)})`,
      );
    }

    return {
      ...pairing,
      retail: guideLink,
    };
  }

  if (pairing.cfwEmu != null) {
    throw new Error(
      `Duplicate cfw-emu guide variant for group ${groupId} (${JSON.stringify(pairing.cfwEmu)}, ${JSON.stringify(guideLink)})`,
    );
  }

  return {
    ...pairing,
    cfwEmu: guideLink,
  };
};

const getGuideFiles = async (): Promise<SitePageFile[]> => {
  const results: SitePageFile[] = [];
  const glob = new Glob("guides/**/*.mdx");

  // Scans the current working directory and each of its sub-directories recursively
  for await (const rawFile of glob.scan(".")) {
    const file = rawFile.replace(/\\/g, "/"); // Needed for Windows contributors
    const content = await fs.readFile(file);
    results.push({ file, content: content.toString() });
  }
  return results;
};

const getEnSlug = (guide: GuideMetadata) => {
  return match(guide)
    .with({ type: "baseGuide" }, (matched) => matched.slug)
    .with({ type: "translatedGuide" }, (matched) => matched.translation.enSlug)
    .exhaustive();
};

const getEnGuide = (
  guide: GuideMetadata,
  allGuides: GuideMetadata[],
): BaseGuideMetadata => {
  const enSlug = getEnSlug(guide);
  const foundGuide = allGuides.find((guide) => guide.slug === enSlug);

  if (foundGuide == null) {
    throw new Error(`Missing English guide for ${guide.slug}`);
  }

  if (foundGuide.type !== "baseGuide") {
    throw new Error(`English guide for ${guide.slug} must be a base guide`);
  }

  return foundGuide;
};

const generateGuideMetadata = async (finalGuides: FinalGuideForEmit[]) => {
  const [externalGuides, internalGuides] = partition(
    finalGuides,
    (guide) => guide.type === "externalLink",
  );
  const compiledGuides = `
  import React from 'react';
  import { memoize } from "lodash-es";

  export const guides = {
    ${internalGuides
      .map(
        (guide) => `"${guide.slug}": {
          meta: ${JSON.stringify(guide)},
          Guide: React.lazy(() => import("~/../${guide.file}")),
          getRawFile: memoize(async () => {
            const file = await import("~/../${guide.file}?raw");
            return file.default;
          }),
        }`,
      )
      .join(",\n")}
  } as const;

  export const guideSlugs = [
    ${internalGuides.map((guide) => `"${guide.slug}"`).join(",\n")}
  ] as const;

  export const categories = ${JSON.stringify(emittedCategories)} as const;

  export const externalGuides = [
    ${externalGuides.map((guide) => JSON.stringify(guide)).join(",\n")}
  ] as const;
`;

  return prettier.format(compiledGuides, { parser: "typescript" });
};

const parseGuideFile = async ({ file, content }: SitePageFile) => {
  const compiled = await evaluate(content, {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    Fragment: React.Fragment,
    jsx: React.jsx,
    jsxs: React.jsxs,
  });

  let metadatas: GuideMetadata[];
  try {
    metadatas = GuideMetadataSchema.parse(compiled.frontmatter);
  } catch (error) {
    throw new Error(`Error on guide ${file}`, { cause: error });
  }

  return {
    metadatas,
    guideComponent: compiled.default,
  };
};

const parseGuideFiles = async (guideFiles: SitePageFile[]) => {
  const guides: GuideWithFile[] = [];
  const guideComponents: Record<string, MDXContent> = {};

  for (const { file, content } of guideFiles) {
    const { metadatas, guideComponent } = await parseGuideFile({
      file,
      content,
    });

    for (const metadata of metadatas) {
      guideComponents[metadata.slug] = guideComponent;
      guides.push({
        ...metadata,
        file,
      });
    }
  }

  // Apply auto-assigned canonical slugs for multi-guide files
  // This must be done before sorting to preserve original file order
  const guidesWithAutoCanonical = applyAutoCanonicalSlugsPreSort(guides);

  guidesWithAutoCanonical.sort((lhs, rhs) => lhs.slug.localeCompare(rhs.slug));

  return {
    guides: guidesWithAutoCanonical,
    guideComponents,
  };
};

const validateGuideReferences = (guides: GuideWithFile[]) => {
  const guidesBySlug = keyBy(guides, (guide) => guide.slug);

  for (const guide of guides) {
    if (
      guide.type === "translatedGuide" &&
      guidesBySlug[guide.translation.enSlug] == null
    ) {
      throw new Error(
        `English translation for ${guide.slug} (${guide.translation.enSlug}) not found`,
      );
    }

    if (guide.canonical != null && guidesBySlug[guide.canonical] == null) {
      throw new Error(
        `Canonical slug ${guide.canonical} for ${guide.slug} not found`,
      );
    }

    // Make sure canonical targets that are base guides are not hidden from navigation
    if (
      guide.canonical != null &&
      // Allow guides to reference themselves
      guide.canonical !== guide.slug &&
      // Only apply to base guides, not translations
      guide.translation == null
    ) {
      const canonicalGuide = guidesBySlug[guide.canonical];
      if (canonicalGuide?.hideFromNavDrawer) {
        throw new Error(
          `Canonical slug ${guide.canonical} for ${guide.slug} is hidden from nav drawer`,
        );
      }
    }
  }
};

const validateRemovedSlugs = (guides: GuideWithFile[]) => {
  const existingSlugs = Object.keys(existingGuides);
  const newSlugs = guides.map((guide) => guide.slug);
  const removedSlugs = difference(existingSlugs, newSlugs);

  if (removedSlugs.length > 0) {
    throw new Error("Removed slugs: " + removedSlugs.join(", "));
  }
};

const createTranslationsGetter = (guides: GuideWithFile[]) => {
  const guidesByEnSlug = groupBy(guides, getEnSlug);

  return (guide: GuideMetadata) => {
    const enSlug = getEnSlug(guide);
    const translations = guidesByEnSlug[enSlug] ?? [];

    if (translations.length <= 1) {
      return null;
    }

    return translations.reduce(
      (acc: Record<string, string>, translatedGuide) => {
        const languageCode = match(translatedGuide)
          .with({ type: "baseGuide" }, () => "en")
          .with(
            { type: "translatedGuide" },
            (matched) => matched.translation.language,
          )
          .exhaustive();

        acc[languageCode] = translatedGuide.slug;
        return acc;
      },
      {},
    );
  };
};

const buildGuidesWithTranslations = (guides: GuideWithFile[]) => {
  const getTranslations = createTranslationsGetter(guides);

  return guides.map((guide): GuideWithTranslations => {
    const enGuide = getEnGuide(guide, guides);

    return {
      ...enGuide,
      ...guide,
      translations: getTranslations(guide),
    };
  });
};

const buildGuidePairingByGroup = (
  guides: GuidePairingSource[],
): GuidePairingByGroup => {
  return guides.reduce<GuidePairingByGroup>((pairingByGroup, guide) => {
    if (!isRngGuideSection(guide.section)) {
      return pairingByGroup;
    }

    if (guide.type !== "baseGuide" && guide.type !== "externalLink") {
      return pairingByGroup;
    }

    const groupId = getPairingGroupId(guide);
    const initialPairing = pairingByGroup[groupId] ?? createEmptyGuidePairing();

    const guideLink: SlugOrExternalLink = match(guide)
      .with({ type: "externalLink" }, (matched) => ({
        type: "externalLink" as const,
        externalLink: matched.url,
      }))
      .with({ type: "baseGuide" }, (matched) => ({
        type: "slug" as const,
        slug: matched.slug,
      }))
      .exhaustive();

    const nextPairing = (guide.guideVariants ?? []).reduce(
      (pairing, variant) => {
        return applyGuideVariantToPairing({
          pairing,
          variant,
          guideLink,
          groupId,
        });
      },
      initialPairing,
    );

    return {
      ...pairingByGroup,
      [groupId]: nextPairing,
    };
  }, {});
};

const validateDuplicateSlugs = (guides: GuideWithFile[]) => {
  forEach(
    groupBy(guides, (guide) => guide.slug),
    (guidesWithSlug, slug) => {
      if (guidesWithSlug.length > 1) {
        throw new Error(`Duplicate slugs detected for ${slug}`);
      }
    },
  );
};

const applySelfCanonical = (guide: GuideWithFile): GuideWithFile => {
  return {
    ...guide,
    canonical: guide.canonical ?? guide.slug,
  };
};

const applyAutoCanonicalSlugsPreSort = (
  guides: GuideWithFile[],
): GuideWithFile[] => {
  const guidesByFile = groupBy(guides, (guide) => guide.file);

  const result = Object.entries(guidesByFile).flatMap(([_, fileGuides]) => {
    if (fileGuides.length <= 1) {
      return fileGuides.map(applySelfCanonical);
    }

    // fileGuides are in original file order (before global sort)
    // Use the first guide's slug as the canonical target for all others
    const firstSlug = fileGuides[0].slug;
    return fileGuides.map((guide, index) => {
      // If canonical is already set in frontmatter, skip auto assignment
      if (guide.canonical != null) {
        return guide;
      }

      // If it's the first guide in the file, set canonical to itself
      if (index === 0) {
        return applySelfCanonical(guide);
      }

      // For subsequent guides in the same file, set canonical to the first guide's slug
      return {
        ...guide,
        canonical: firstSlug,
      };
    });
  });

  return result;
};

const validateCanonicalUnchanged = (guides: GuideWithFile[]): void => {
  const guidesBySlug = keyBy(existingGuides, (guide) => guide.meta.slug);

  for (const guide of guides) {
    const previousGuide = guidesBySlug[guide.slug];
    const previousCanonical = previousGuide?.meta.canonical;

    if (previousCanonical != null && previousCanonical !== guide.canonical) {
      throw new Error(
        `Canonical slug changed for ${guide.slug}. Previous: ${previousCanonical}, Current: ${guide.canonical}`,
      );
    }
  }
};

const validateCanonicalCircularity = (guides: GuideWithFile[]): void => {
  const canonicalTargets = new Set(
    guides
      .filter((guide) => guide.canonical != null)
      .map((guide) => guide.canonical),
  );

  for (const guide of guides) {
    if (
      guide.canonical != null &&
      canonicalTargets.has(guide.slug) &&
      guide.canonical !== guide.slug
    ) {
      throw new Error(
        `Guide ${guide.slug} both has canonical set AND is referenced as a canonical`,
      );
    }
  }
};

const detectGuideTags = async (
  guideSlug: string,
  Guide: MDXContent,
  noDetectedTags: boolean,
) => {
  if (noDetectedTags) {
    return [];
  }

  let detectedTags = {};

  const setTags = (newTags: Partial<Record<string, boolean>>) => {
    detectedTags = { ...detectedTags, ...newTags };
  };

  await renderToStringAsync(
    <TagDetector setTags={setTags}>
      <ThemeProvider>
        <Router ssrPath={guideSlug}>
          <Guide components={markdownComponents} />
        </Router>
      </ThemeProvider>
    </TagDetector>,
  );

  return Object.keys(detectedTags);
};

const deriveGuideMetadata = ({
  guide,
  guidePairingByGroup,
}: {
  guide: GuideWithTranslations;
  guidePairingByGroup: GuidePairingByGroup;
}): DerivedGuideMetadata => {
  const guideGroupId = getGuidePairingGroupId(guide);

  return {
    ...guide,
    guideGroupId,
    guideVariantLinks: guidePairingByGroup[guideGroupId] ?? null,
  };
};

const renderGuideDisplayAttributes = async ({
  guide,
  guideComponents,
  noDetectedTags,
}: {
  guide: GuideWithTranslations;
  guideComponents: Record<string, MDXContent>;
  noDetectedTags: boolean;
}) => {
  const Guide = guideComponents[guide.slug];

  if (Guide == null) {
    throw new Error(`Guide component not found for ${guide.slug}`);
  }

  return detectGuideTags(guide.slug, Guide, noDetectedTags);
};

const buildFinalGuides = async ({
  guides,
  guideComponents,
  guidePairingByGroup,
  noDetectedTags,
}: {
  guides: GuideWithTranslations[];
  guideComponents: Record<string, MDXContent>;
  guidePairingByGroup: GuidePairingByGroup;
  noDetectedTags: boolean;
}) => {
  return pmap(
    guides,
    async (guide) => {
      const metadata = deriveGuideMetadata({
        guide,
        guidePairingByGroup,
      });

      const displayAttributes = await renderGuideDisplayAttributes({
        guide,
        guideComponents,
        noDetectedTags,
      });

      const isRoughDraft =
        metadata.type === "baseGuide" && metadata.isRoughDraft;
      const roughDraftAttribute = isRoughDraft ? ["rough_draft"] : [];

      return {
        ...metadata,
        displayAttributes: [...displayAttributes, ...roughDraftAttribute],
      };
    },
    { concurrency: 5 },
  );
};

const getExternalLinks = () => {
  return externalGuides.map((externalLink): ExternalLinkMetadata => {
    if (
      externalLink.addedOn != null &&
      !dayjs(externalLink.addedOn).isValid()
    ) {
      throw new Error(
        `Invalid addedOn date for external link ${externalLink.guideKey}: ${externalLink.addedOn}`,
      );
    }

    return {
      ...externalLink,
      id: externalLink.url,
      isNew: isNew(externalLink.addedOn),
      translation: null,
      canonical: null,
      hideFromNavDrawer: false,
      isRoughDraft: false,
      title: externalLink.navDrawerTitle,
      guideVariants: externalLink.guideVariants ?? null,
      displayAttributes: externalLink.displayAttributes ?? [],
      orderPriority: externalLink.orderPriority ?? MAX_ORDER_PRIORITY,
      lastUpdated: null,
      description: "",
      layout: "guide",
      type: "externalLink" as const,
    };
  });
};

const buildFinalExternalLinks = (
  externalLinks: ExternalLinkMetadata[],
  guidePairingByGroup: GuidePairingByGroup,
): DerivedExternalLinkMetadata[] => {
  return externalLinks.map((guide) => {
    const guideGroupId = getPairingGroupId(guide);

    return {
      ...guide,
      translations: null,
      guideGroupId,
      guideVariantLinks: guidePairingByGroup[guideGroupId] ?? null,
    };
  });
};

const checkCompiledGuidesUpToDate = async (
  compiledGuides: string,
  currentHashes: Record<string, string>,
) => {
  const existingGuidesString = await fs.readFile(GENERATED_GUIDES_PATH, {
    encoding: "utf8",
  });

  if (compiledGuides !== existingGuidesString) {
    console.error(
      "Guide metadata is out of date. Please run `bun run build:guides` to update it.",
    );
    process.exit(1);
  }

  const previousHashes = await loadPreviousHashes();
  const storedHashes = Object.fromEntries(
    Object.entries(previousHashes).map(([slug, entry]) => [slug, entry.hash]),
  );

  const hashesMatch = isEqual(currentHashes, storedHashes);

  if (!hashesMatch) {
    // Find first mismatch for debugging
    const currentSlugs = Object.keys(currentHashes).sort();
    const storedSlugs = Object.keys(storedHashes).sort();

    const diffSlugs = xor(storedSlugs, currentSlugs);
    const [missingInCurrent, extraInCurrent] = partition(
      diffSlugs,
      (slug) => !currentHashes[slug],
    );

    if (missingInCurrent.length > 0) {
      console.error(
        `Guides removed: ${missingInCurrent.slice(0, 3).join(", ")}${missingInCurrent.length > 3 ? ` (and ${missingInCurrent.length - 3} more)` : ""}`,
      );
    }

    if (extraInCurrent.length > 0) {
      console.error(
        `Guides added: ${extraInCurrent.slice(0, 3).join(", ")}${extraInCurrent.length > 3 ? ` (and ${extraInCurrent.length - 3} more)` : ""}`,
      );
    }

    for (const slug of currentSlugs) {
      if (storedHashes[slug] !== currentHashes[slug]) {
        console.error(`First hash mismatch: ${slug}`);
        console.error(`  Stored: ${storedHashes[slug]?.substring(0, 16)}`);
        console.error(`  Current: ${currentHashes[slug].substring(0, 16)}`);
        break;
      }
    }

    console.error(
      "Guide hashes are out of date. Please run `bun run build:guides` to update them.",
    );
    process.exit(1);
  }
};

const writeCompiledGuides = async (compiledGuides: string) => {
  await fs.mkdir(toNativeAbsolute("../src/__generated__"), {
    recursive: true,
  });
  await fs.writeFile(GENERATED_GUIDES_PATH, compiledGuides);
};

const main = async ({
  check,
  noDetectedTags,
}: {
  check: boolean;
  noDetectedTags: boolean;
}) => {
  const guideFiles = await getGuideFiles();
  const { guides, guideComponents } = await parseGuideFiles(guideFiles);
  const externalLinks = getExternalLinks();

  // Load previous hashes and compute current hashes
  const previousHashes = await loadPreviousHashes();
  const currentHashes = await buildGuideHashMap(guideFiles, guides);

  // Apply lastUpdated timestamps based on hash changes
  const guidesWithTimestamps = applyUpdatedTimestamps(
    guides,
    previousHashes,
    currentHashes,
  );

  validateCanonicalUnchanged(guidesWithTimestamps);
  validateGuideReferences(guidesWithTimestamps);
  validateRemovedSlugs(guidesWithTimestamps);
  validateDuplicateSlugs(guidesWithTimestamps);
  validateCanonicalCircularity(guidesWithTimestamps);

  const guidesWithTranslations =
    buildGuidesWithTranslations(guidesWithTimestamps);
  const guidePairingByGroup = buildGuidePairingByGroup([
    ...guidesWithTranslations,
    ...externalLinks,
  ]);

  const finalGuides = await buildFinalGuides({
    guides: guidesWithTranslations,
    guideComponents,
    guidePairingByGroup,
    noDetectedTags,
  });
  const finalExternalLinks = buildFinalExternalLinks(
    externalLinks,
    guidePairingByGroup,
  );

  const compiledGuides = await generateGuideMetadata([
    ...finalGuides,
    ...finalExternalLinks,
  ]);

  if (check) {
    await checkCompiledGuidesUpToDate(compiledGuides, currentHashes);
  } else {
    await writeCompiledGuides(compiledGuides);
    // Save the hashes and lastUpdated dates after successful write
    await writePreviousHashes(currentHashes, guidesWithTimestamps);
  }

  process.exit(0);
};

main({
  check: process.argv.includes("--check"),
  noDetectedTags: process.argv.includes("--no-detected-tags"),
});
