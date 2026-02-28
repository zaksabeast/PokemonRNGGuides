import React from "react/jsx-runtime";
import { Glob } from "bun";
import fs from "node:fs/promises";
import { evaluate } from "@mdx-js/mdx";
import { MDXContent } from "mdx/types";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import z from "zod";
import { difference, isArray, keyBy, groupBy, forEach } from "lodash-es";
import { guides as existingGuides } from "../src/__generated__/guides";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { toNativeAbsolute } from "./path";
import { formatRelativeUrl } from "../src/utils/formatRelativeUrl";
import { renderToStringAsync } from "../src/entry-server";
import { TagDetector } from "../src/components/tagDetector/tagDetector";
import { markdownComponents } from "../src/markdownExports";
import { Router } from "wouter";
import { ThemeProvider } from "../src/theme/provider";
import pmap from "p-map";
import prettier from "prettier";
import { match } from "ts-pattern";
import {
  sections,
  rngGuideVariants,
  isRngGuideSection,
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
  "GBA Overview",
  "GBA Technical Documentation",
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

const BaseGuideSchema = z
  .object({
    title: z.string(),
    navDrawerTitle: z
      .string()
      .nullish()
      .optional()
      .default(() => null),
    description: z.string(),
    category: SingleOrMultipleSchema(CategorySchema),
    slug: SlugSchema,
    isRoughDraft: z.boolean().default(false),
    section: GuideSectionSchema,
    variant: SingleOrMultipleSchema(GuideVariantSchema).optional(),
    guideKey: SlugSchema.nullish()
      .optional()
      .default(() => null),
    hideFromNavDrawer: z.boolean().default(false),
    addedOn: z
      .string()
      .nullish()
      .optional()
      .default(() => null)
      .refine((value) => value === null || dayjs(value).isValid(), {
        message: "Invalid date format",
      }),
    translation: z.null().optional().default(null),
    layout: z.enum(layouts).default("guide"),
    canonical: SlugSchema.nullish()
      .optional()
      .default(() => null),
  })
  .transform(({ category, section, variant, guideKey, ...meta }) => {
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

    if (!hasGuideSection && guideKey != null) {
      throw new Error(
        `guideKey is only allowed for section: guide (${meta.slug}).`,
      );
    }

    return {
      categories: normalizeCategories(category),
      section,
      guideVariants: hasGuideSection ? normalizedVariants : null,
      guideKey: guideKey ?? meta.slug,
      isNew: isNew(meta.addedOn),
      ...meta,
      navDrawerTitle: meta.navDrawerTitle ?? meta.title,
      type: "baseGuide" as const,
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
    canonical: SlugSchema.nullish()
      .optional()
      .default(() => null),
  })
  .transform((meta) => ({
    ...meta,
    hideFromNavDrawer: true,
    navDrawerTitle: meta.navDrawerTitle ?? meta.title,
    type: "translatedGuide" as const,
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
  { retail: string | null; cfwEmu: string | null }
>;

type GuidePairing = GuidePairingByGroup[string];

type DerivedGuideMetadata = GuideWithTranslations & {
  translations: Record<string, string> | null;
  guideGroupId: string;
  guideVariantLinks: GuidePairing | null;
};

const GENERATED_GUIDES_PATH = toNativeAbsolute(
  "../src/__generated__/guides.ts",
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

const applyGuideVariantToPairing = ({
  pairing,
  variant,
  guideSlug,
  groupId,
}: {
  pairing: GuidePairing;
  variant: (typeof rngGuideVariants)[number];
  guideSlug: string;
  groupId: string;
}): GuidePairing => {
  if (variant === "retail") {
    if (pairing.retail != null && pairing.retail !== guideSlug) {
      throw new Error(
        `Duplicate retail guide variant for group ${groupId} (${pairing.retail}, ${guideSlug})`,
      );
    }

    return {
      ...pairing,
      retail: guideSlug,
    };
  }

  if (pairing.cfwEmu != null && pairing.cfwEmu !== guideSlug) {
    throw new Error(
      `Duplicate cfw-emu guide variant for group ${groupId} (${pairing.cfwEmu}, ${guideSlug})`,
    );
  }

  return {
    ...pairing,
    cfwEmu: guideSlug,
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

const generateGuideMetadata = async <T extends Record<string, unknown>>(
  finalGuides: T[],
) => {
  const compiledGuides = `
  import React from 'react';
  import { memoize } from "lodash-es";

  export const guides = {
    ${finalGuides
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
    ${finalGuides.map((guide) => `"${guide.slug}"`).join(",\n")}
  ] as const;

  export const categories = ${JSON.stringify(emittedCategories)} as const;
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

  guides.sort((lhs, rhs) => lhs.slug.localeCompare(rhs.slug));

  return {
    guides,
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
  guidesWithTranslations: GuideWithTranslations[],
): GuidePairingByGroup => {
  return guidesWithTranslations.reduce<GuidePairingByGroup>(
    (pairingByGroup, guide) => {
      if (guide.type !== "baseGuide" || !isRngGuideSection(guide.section)) {
        return pairingByGroup;
      }

      const groupId = getGuidePairingGroupId(guide);
      const initialPairing =
        pairingByGroup[groupId] ?? createEmptyGuidePairing();

      const nextPairing = (guide.guideVariants ?? []).reduce(
        (pairing, variant) => {
          return applyGuideVariantToPairing({
            pairing,
            variant,
            guideSlug: guide.slug,
            groupId,
          });
        },
        initialPairing,
      );

      return {
        ...pairingByGroup,
        [groupId]: nextPairing,
      };
    },
    {},
  );
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

      return {
        ...metadata,
        displayAttributes,
      };
    },
    { concurrency: 5 },
  );
};

const checkCompiledGuidesUpToDate = async (compiledGuides: string) => {
  const existingGuidesString = await fs.readFile(GENERATED_GUIDES_PATH, {
    encoding: "utf8",
  });

  if (compiledGuides !== existingGuidesString) {
    console.error(
      "Guide metadata is out of date. Please run `bun run build:guides` to update it.",
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

  validateGuideReferences(guides);
  validateRemovedSlugs(guides);
  validateDuplicateSlugs(guides);

  const guidesWithTranslations = buildGuidesWithTranslations(guides);
  const guidePairingByGroup = buildGuidePairingByGroup(guidesWithTranslations);

  const finalGuides = await buildFinalGuides({
    guides: guidesWithTranslations,
    guideComponents,
    guidePairingByGroup,
    noDetectedTags,
  });

  const compiledGuides = await generateGuideMetadata(finalGuides);

  if (check) {
    await checkCompiledGuidesUpToDate(compiledGuides);
  } else {
    await writeCompiledGuides(compiledGuides);
  }

  process.exit(0);
};

main({
  check: process.argv.includes("--check"),
  noDetectedTags: process.argv.includes("--no-detected-tags"),
});
