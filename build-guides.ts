import React from "react/jsx-runtime";
import { Glob } from "bun";
import fs from "node:fs/promises";
import { evaluate } from "@mdx-js/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import z from "zod";
import { difference, isArray } from "lodash-es";
import { guides as existingGuides } from "./src/__generated__/guides";

// Only letters, numbers, spaces, the en-dash, period, hyphen, é, &, /, (, ), !, %, and ,
const titleAndDescriptionChars = /^[A-Za-z0-9 –.\-—é&/()!%,]+$/;

// Only lower case letters, numbers, and hyphens
const slugChars = /^[a-z0-9-]+$/;

const SingleGuideMetadataSchema = z.object({
  title: z.string().refine((value) => titleAndDescriptionChars.test(value)),
  description: z
    .string()
    .refine((value) => titleAndDescriptionChars.test(value)),
  slug: z
    .string()
    .refine((value) => value.length === 0 || slugChars.test(value)),
  isRoughDraft: z.boolean().default(false),
});

const GuideMetadataSchema = z.union([
  SingleGuideMetadataSchema,
  z.array(SingleGuideMetadataSchema),
]);

type GuideMetadata = z.infer<typeof SingleGuideMetadataSchema>;

const categories = [
  "Tools and Emulators",
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
];

const main = async () => {
  const glob = new Glob("guides/**/*.mdx");
  const guides: (GuideMetadata & { file: string; category: string })[] = [];

  // Scans the current working directory and each of its sub-directories recursively
  for await (const file of glob.scan(".")) {
    const category = file.split("/")[1];
    if (!categories.includes(category) && !file.includes("Home")) {
      throw new Error(`Invalid category: ${category}`);
    }

    const compiled = await evaluate(await fs.readFile(file), {
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      Fragment: React.Fragment,
      jsx: React.jsx,
      jsxs: React.jsxs,
    });
    const parsed = GuideMetadataSchema.parse(compiled.frontmatter);
    const metadatas = isArray(parsed) ? parsed : [parsed];

    for (const metadata of metadatas) {
      guides.push({ ...metadata, slug: `/${metadata.slug}`, file, category });
    }
  }

  const existingSlugs = Object.keys(existingGuides);
  const newSlugs = guides.map((guide) => guide.slug);
  const removedSlugs = difference(existingSlugs, newSlugs);

  if (removedSlugs.length > 0) {
    throw new Error("Removed slugs: " + removedSlugs.join(", "));
  }

  const compiledGuides = `
  import React from 'react';
  import { z } from "zod";

  export const guides = {
    ${guides
      .map(
        (guide) => `"${guide.slug}": {
          meta: ${JSON.stringify(guide)},
          Guide: React.lazy(() => import("~/../${guide.file}")),
        }`,
      )
      .join(",\n")}
  } as const;

  export const guideSlugs = [
    ${guides.map((guide) => `z.literal("${guide.slug}")`).join(",\n")}
  ] as const;

  export const categories = ${JSON.stringify(categories)} as const;
`;

  fs.mkdir("src/__generated__", { recursive: true });
  await fs.writeFile("src/__generated__/guides.ts", compiledGuides);
};

main();
