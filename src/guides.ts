import * as tst from "ts-toolbelt";
import { guides, categories } from "./__generated__/guides";

export { guides, guideSlugs, categories } from "~/__generated__/guides";

export type Guide = (typeof guides)[keyof typeof guides];
export type GuideMeta = Guide["meta"];
export type GuideSlug = GuideMeta["slug"];

export const getGuide = (slug: GuideSlug) => {
  return guides[slug];
};

export type Category = tst.L.UnionOf<typeof categories>;
