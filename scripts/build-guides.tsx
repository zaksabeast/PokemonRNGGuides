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

dayjs.extend(utc);

// Only letters, numbers, spaces, the en-dash, period, hyphen, é, &, /, (, ), !, %, ,, ，, 《, 》, Chinese characters, ·, and 。
const titleAndDescriptionChars =
  /^[A-Za-z0-9 –.\-—é&/()!%,，《》\u4e00-\u9fff·。、（）]+$/;

// Only lower case letters, numbers, and hyphens
const slugChars = /^[a-z0-9-]+$/;

const SlugSchema = z
  .string()
  .refine((value) => value.length === 0 || slugChars.test(value))
  .transform(formatRelativeUrl);

const tags = [
  "retail",
  "emu",
  "cfw",
  "info",
  "any",
  "challenge",
  "patch",
] as const;

const TagSchema = z.enum(tags);

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

const CategorySchema = z.enum(categories);

const TitleSchema = z
  .string()
  .refine((value) => titleAndDescriptionChars.test(value));

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
    title: TitleSchema,
    navDrawerTitle: TitleSchema.nullish()
      .optional()
      .default(() => null),
    description: z
      .string()
      .refine((value) => titleAndDescriptionChars.test(value)),
    category: SingleOrMultipleSchema(CategorySchema),
    slug: SlugSchema,
    isRoughDraft: z.boolean().default(false),
    tag: SingleOrMultipleSchema(TagSchema),
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
  .transform(({ category, tag, ...meta }) => ({
    categories: category,
    tags: tag,
    isNew: isNew(meta.addedOn),
    ...meta,
    navDrawerTitle: meta.navDrawerTitle ?? meta.title,
    type: "baseGuide" as const,
  }));

const TranslatedGuideSchema = z
  .object({
    title: TitleSchema,
    navDrawerTitle: TitleSchema.nullish()
      .optional()
      .default(() => null),
    description: z
      .string()
      .refine((value) => titleAndDescriptionChars.test(value)),
    slug: SlugSchema,
    translation: z.object({
      enSlug: SlugSchema,
      language: z.enum(["es", "zh", "fr", "it"]),
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

type SitePageFile = {
  file: string;
  content: string;
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

const getEnGuide = (guide: GuideMetadata, allGuides: GuideMetadata[]) => {
  const enSlug = getEnSlug(guide);
  const foundGuide = allGuides.find((guide) => guide.slug === enSlug);

  if (foundGuide == null) {
    throw new Error(`Missing English guide for ${guide.slug}`);
  }

  return foundGuide;
};

const generateGuideMetadata = async <T extends Record<string, unknown>>(
  finalGuides: T[],
) => {
  const compiledGuides = `
  import React from 'react';

  export const guides = {
    ${finalGuides
      .map(
        (guide) => `"${guide.slug}": {
          meta: ${JSON.stringify(guide)},
          Guide: React.lazy(() => import("~/../${guide.file}")),
        }`,
      )
      .join(",\n")}
  } as const;

  export const guideSlugs = [
    ${finalGuides.map((guide) => `"${guide.slug}"`).join(",\n")}
  ] as const;

  export const categories = ${JSON.stringify(categories)} as const;
`;

  return prettier.format(compiledGuides, { parser: "typescript" });
};

const main = async ({
  check,
  noDetectedTags,
}: {
  check: boolean;
  noDetectedTags: boolean;
}) => {
  const guideFiles = await getGuideFiles();
  const guides: (GuideMetadata & { file: string })[] = [];

  const guideComponents: Record<string, MDXContent> = {};

  for (const { file, content } of guideFiles) {
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

    for (const metadata of metadatas) {
      guideComponents[metadata.slug] = compiled.default;
      guides.push({
        ...metadata,
        file,
      });
    }
  }

  guides.sort((lhs, rhs) => {
    return lhs.slug.localeCompare(rhs.slug);
  });

  const guidesBySlug = keyBy(guides, (guide) => guide.slug);
  guides.forEach((guide) => {
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
  });

  const existingSlugs = Object.keys(existingGuides);
  const newSlugs = guides.map((guide) => guide.slug);
  const removedSlugs = difference(existingSlugs, newSlugs);

  if (removedSlugs.length > 0) {
    throw new Error("Removed slugs: " + removedSlugs.join(", "));
  }

  const guidesByEnSlug = groupBy(guides, getEnSlug);

  const getTranslations = (guide: GuideMetadata) => {
    const enSlug = getEnSlug(guide);
    const translations = guidesByEnSlug[enSlug];

    // English guide only
    if (translations.length === 1) {
      return null;
    }

    return translations.reduce((acc, curr) => {
      const languageCode = match(curr)
        .with({ type: "baseGuide" }, () => "en")
        .with(
          { type: "translatedGuide" },
          (matched) => matched.translation.language,
        )
        .exhaustive();

      acc[languageCode] = curr.slug;
      return acc;
    }, {});
  };

  const guidesWithTranslations = guides.map((guide) => ({
    ...getEnGuide(guide, guides),
    ...guide,
    translations: getTranslations(guide),
  }));

  forEach(
    groupBy(guidesWithTranslations, (guide) => guide.slug),
    (guides, slug) => {
      if (guides.length > 1) {
        throw new Error(`Duplicate slugs detected for ${slug}`);
      }
    },
  );

  const finalGuides = await pmap(
    guidesWithTranslations,
    async (guide) => {
      let detectedTags = {};

      const setTags = (tags: Partial<Record<string, boolean>>) => {
        detectedTags = { ...detectedTags, ...tags };
      };
      const Guide = guideComponents[guide.slug];

      if (Guide == null) {
        throw new Error(`Guide component not found for ${guide.slug}`);
      }

      if (!noDetectedTags) {
        await renderToStringAsync(
          <TagDetector setTags={setTags}>
            <ThemeProvider>
              <Router ssrPath={guide.slug}>
                <Guide components={markdownComponents} />
              </Router>
            </ThemeProvider>
          </TagDetector>,
        );
      }

      return {
        ...guide,
        displayAttributes: Object.keys(detectedTags),
        translations: getTranslations(guide),
      };
    },
    { concurrency: 5 },
  );

  const compiledGuides = await generateGuideMetadata(finalGuides);

  if (check) {
    const existingGuidesString = await fs.readFile(
      toNativeAbsolute("../src/__generated__/guides.ts"),
      { encoding: "utf8" },
    );
    if (compiledGuides !== existingGuidesString) {
      console.error(
        "Guide metadata is out of date. Please run `bun run build:guides` to update it.",
      );
      process.exit(1);
    }
  } else {
    await fs.mkdir(toNativeAbsolute("../src/__generated__"), {
      recursive: true,
    });
    await fs.writeFile(
      toNativeAbsolute("../src/__generated__/guides.ts"),
      compiledGuides,
    );
  }

  process.exit(0);
};

main({
  check: process.argv.includes("--check"),
  noDetectedTags: process.argv.includes("--no-detected-tags"),
});
