import fs from "node:fs/promises";
import { toNativeAbsolute } from "./path";

const resetGuides = `export const guides = {};
export const guideSlugs = [];
export const categories = [];`;

await fs.mkdir(toNativeAbsolute("../src/__generated__"), { recursive: true });
await fs.writeFile(
  toNativeAbsolute("../src/__generated__/guides.ts"),
  resetGuides,
);
