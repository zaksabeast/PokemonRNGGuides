import * as tst from "ts-toolbelt";
import { guides, categories } from "./__generated__/guides";

export { guides, guideSlugs, categories } from "~/__generated__/guides";

export type Guide = (typeof guides)[keyof typeof guides];
export type GuideMeta = Guide["meta"];
export type GuideSlug = GuideMeta["slug"];
export type GuideTag = GuideMeta["tags"][number];
export type GuideTags = Readonly<GuideMeta["tags"][number][]>;

export const getGuide = (slug: GuideSlug) => {
  return guides[slug];
};

export type Category = tst.L.UnionOf<typeof categories>;

export type LanguageKey = tst.O.RequiredKeys<
  tst.U.NonNullable<GuideMeta["translations"]>
>;
