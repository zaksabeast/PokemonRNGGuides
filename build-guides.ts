import React from "react/jsx-runtime";
import { Glob } from "bun";
import fs from "node:fs/promises";
import { evaluate } from "@mdx-js/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import z from "zod";
import { difference, isArray, keyBy, groupBy } from "lodash-es";
import { guides as existingGuides } from "./src/__generated__/guides";
import { match, P } from "ts-pattern";
import dayjs from "dayjs";

// Only letters, numbers, spaces, the en-dash, period, hyphen, é, &, /, (, ), !, %, ,, ，, 《, 》, Chinese characters, ·, and 。
const titleAndDescriptionChars =
  /^[A-Za-z0-9 –.\-—é&/()!%,，《》\u4e00-\u9fff·。]+$/;

// Only lower case letters, numbers, and hyphens
const slugChars = /^[a-z0-9-]+$/;

const categories = [
  "Home",
  "Gold, Silver, Crystal",
  "Transporter",
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
  "Mystic Timer",
  "GBA Tools",
  "NDS Tools",
  "3DS Tools",
  "Switch Tools",
  "USUM Challenges",
] as const;

const CategorySchema = z.enum(categories);

type Category = z.infer<typeof CategorySchema>;
const TitleSchema = z
  .string()
  .refine((value) => titleAndDescriptionChars.test(value));

const SingleGuideMetadataSchema = z.object({
  title: TitleSchema,
  navDrawerTitle: TitleSchema.nullish()
    .optional()
    .default(() => null),
  description: z
    .string()
    .refine((value) => titleAndDescriptionChars.test(value)),
  category: CategorySchema.optional(),
  slug: z
    .string()
    .refine((value) => value.length === 0 || slugChars.test(value))
    .transform((slug) => (slug.startsWith("/") ? slug : `/${slug}`)),
  isRoughDraft: z.boolean().default(false),
  tag: z.enum(["retail", "emu", "cfw", "info", "any", "challenge"]),
  hideFromNavDrawer: z.boolean().default(false),
  addedOn: z
    .string()
    .nullish()
    .optional()
    .default(() => null)
    .refine((value) => value === null || dayjs(value).isValid(), {
      message: "Invalid date format",
    }),
  translation: z
    .object({
      enSlug: z
        .string()
        .transform((slug) => (slug.startsWith("/") ? slug : `/${slug}`)),
      language: z.enum(["es", "zh"]),
    })
    .optional(),
});

const getCategory = ({
  metadataCategory,
  directory,
}: {
  metadataCategory?: Category;
  directory: string;
}) => {
  return (
    match({
      metadataCategory,
      directory,
      directoryCategory: CategorySchema.safeParse(directory),
    })
      // If a category was set, use it
      .with(
        { metadataCategory: P.not(undefined) },
        (matched) => matched.metadataCategory,
      )
      // If a directory matches a category, use it
      .with(
        { directoryCategory: { success: true, data: P.any } },
        (matched) => matched.directoryCategory.data,
      )
      // Something is wrong!
      .otherwise(() => {
        throw new Error(`Invalid category: ${directory}`);
      })
  );
};

const GuideMetadataSchema = z.union([
  SingleGuideMetadataSchema,
  z.array(SingleGuideMetadataSchema),
]);

type GuideMetadata = z.infer<typeof SingleGuideMetadataSchema>;

const main = async () => {
  const glob = new Glob("guides/**/*.mdx");
  const guides: (GuideMetadata & { file: string; category: string })[] = [];

  // Scans the current working directory and each of its sub-directories recursively
  for await (const rawFile of glob.scan(".")) {
    const file = rawFile.replace(/\\/g, "/"); // Needed for Windows contributors

    const compiled = await evaluate(await fs.readFile(file), {
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      Fragment: React.Fragment,
      jsx: React.jsx,
      jsxs: React.jsxs,
    });
    let parsed: GuideMetadata | GuideMetadata[];
    try {
      parsed = GuideMetadataSchema.parse(compiled.frontmatter);
    } catch (error) {
      throw new Error(`Error on guide ${file}`, { cause: error });
    }

    const metadatas = isArray(parsed) ? parsed : [parsed];

    for (const metadata of metadatas) {
      const category = getCategory({
        directory: file.split("/")[1],
        metadataCategory: metadata.category,
      });
      guides.push({
        ...metadata,
        file,
        category,
        hideFromNavDrawer:
          metadata.translation != null || metadata.hideFromNavDrawer,
      });
    }
  }

  guides.sort((lhs, rhs) => {
    return lhs.slug.localeCompare(rhs.slug);
  });

  const guidesBySlug = keyBy(guides, (guide) => guide.slug);
  guides.forEach((guide) => {
    if (guide.translation == null) {
      return;
    }

    const translation = guidesBySlug[guide.translation.enSlug];
    if (translation == null) {
      throw new Error(
        `English translation for ${guide.slug} (${guide.translation.enSlug}) not found`,
      );
    }
  });

  const existingSlugs = Object.keys(existingGuides);
  const newSlugs = guides.map((guide) => guide.slug);
  const removedSlugs = difference(existingSlugs, newSlugs);

  if (removedSlugs.length > 0) {
    throw new Error("Removed slugs: " + removedSlugs.join(", "));
  }

  const guidesByEnSlug = groupBy(
    guides,
    (guide) => guide.translation?.enSlug ?? guide.slug,
  );

  const getTranslations = (guide: GuideMetadata) => {
    const translations =
      guidesByEnSlug[guide.translation?.enSlug ?? guide.slug];

    if (translations.length === 1) {
      return null;
    }

    return translations.reduce((acc, curr) => {
      acc[curr.translation?.language ?? "en"] = curr.slug;
      return acc;
    }, {});
  };

  const guidesWithTranslations = guides.map((guide) => ({
    ...guide,
    translations: getTranslations(guide),
  }));

  const compiledGuides = `
  import React from 'react';

  export const guides = {
    ${guidesWithTranslations
      .map(
        (guide) => `"${guide.slug}": {
          meta: ${JSON.stringify(guide)},
          Guide: React.lazy(() => import("~/../${guide.file}")),
        }`,
      )
      .join(",\n")}
  } as const;

  export const guideSlugs = [
    ${guidesWithTranslations.map((guide) => `"${guide.slug}"`).join(",\n")}
  ] as const;

  export const categories = ${JSON.stringify(categories)} as const;
`;

  fs.mkdir("src/__generated__", { recursive: true });
  await fs.writeFile("src/__generated__/guides.ts", compiledGuides);
};

main();
