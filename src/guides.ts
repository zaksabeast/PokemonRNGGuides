import * as tst from "ts-toolbelt";
import { guides, categories } from "./__generated__/guides";
import { groupBy, flatMap, get } from "lodash-es";
import { match } from "ts-pattern";
import { Route } from "./routes/defs";

export const categoryOwners: Record<Category, Route> = {
  Home: "/",
  "Gold, Silver, Crystal": "/crystal/",
  "Transporter and Dream Radar": "/",
  "Ruby and Sapphire": "/ruby-and-sapphire/",
  Gamecube: "/gamecube/",
  "FireRed and LeafGreen": "/fire-red-and-leaf-green/",
  Emerald: "/emerald/",
  "Diamond, Pearl, and Platinum": "/diamond-pearl-and-platinum/",
  "HeartGold and SoulSilver": "/heart-gold-and-soul-silver/",
  "Black and White": "/black-and-white/",
  "Black 2 and White 2": "/black-2-and-white-2/",
  "X and Y": "/x-and-y/",
  "Omega Ruby and Alpha Sapphire": "/omega-ruby-and-alpha-sapphire/",
  "Sun and Moon": "/sun-and-moon/",
  "Ultra Sun and Ultra Moon": "/ultra-sun-and-ultra-moon/",
  "Sword and Shield": "/sword-and-shield/",
  "Brilliant Diamond and Shining Pearl":
    "/brilliant-diamond-and-shining-pearl/",
  "Legends Arceus": "/legends-arceus/",
  "GBA Overview": "/",
  "GBA Technical Documentation": "/",
  "GBA Tools": "/",
  "NDS Tools": "/",
  "3DS Tools": "/",
  "Switch Tools": "/",
  "USUM Challenges": "/",
  "User Settings": "/",
  "Game Hub": "/",
};

type DisplayAttribute =
  | GuideMeta["displayAttributes"][number]
  | "external-link";

type ExternalMeta = tst.O.Overwrite<
  tst.O.Merge<
    tst.O.Pick<
      GuideMeta,
      | "title"
      | "navDrawerTitle"
      | "categories"
      | "displayAttributes"
      | "isNew"
      | "tags"
      | "type"
      | "isRoughDraft"
      | "hideFromNavDrawer"
    >,
    { url: `https://${string}` }
  >,
  {
    type: "external-link";
    title: string;
    displayAttributes: DisplayAttribute[];
    navDrawerTitle?: string;
    description?: string;
  }
>;

const externalLinks = {} as const satisfies Record<
  `https://${string}`,
  { meta: ExternalMeta }
>;

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

const routeToCategory = {
  "/transporter-dream-radar/": ["Transporter and Dream Radar"],
  "/legends-arceus/": ["Legends Arceus", "Switch Tools"],
  "/crystal/": ["Gold, Silver, Crystal"],
  "/ruby-and-sapphire/": [
    "Ruby and Sapphire",
    "GBA Tools",
    "GBA Technical Documentation",
  ],
  "/gamecube/": ["Gamecube"],
  "/fire-red-and-leaf-green/": ["FireRed and LeafGreen", "GBA Tools"],
  "/emerald/": ["Emerald", "GBA Tools", "GBA Technical Documentation"],
  "/diamond-pearl-and-platinum/": ["Diamond, Pearl, and Platinum", "NDS Tools"],
  "/heart-gold-and-soul-silver/": ["HeartGold and SoulSilver", "NDS Tools"],
  "/black-and-white/": ["Black and White", "NDS Tools"],
  "/black-2-and-white-2/": ["Black 2 and White 2", "NDS Tools"],
  "/x-and-y/": ["X and Y", "3DS Tools"],
  "/omega-ruby-and-alpha-sapphire/": [
    "Omega Ruby and Alpha Sapphire",
    "3DS Tools",
  ],
  "/sun-and-moon/": ["Sun and Moon", "3DS Tools"],
  "/ultra-sun-and-ultra-moon/": ["Ultra Sun and Ultra Moon", "3DS Tools"],
  "/sword-and-shield/": ["Sword and Shield", "Switch Tools"],
  "/brilliant-diamond-and-shining-pearl/": [
    "Brilliant Diamond and Shining Pearl",
    "Switch Tools",
  ],
} satisfies Partial<Record<GuideSlug, Category[]>>;

const isToolCategory = (category: Category) => {
  return match(category)
    .with("GBA Tools", () => true)
    .with("NDS Tools", () => true)
    .with("3DS Tools", () => true)
    .with("Switch Tools", () => true)
    .with("Black 2 and White 2", () => false)
    .with("Black and White", () => false)
    .with("Diamond, Pearl, and Platinum", () => false)
    .with("HeartGold and SoulSilver", () => false)
    .with("Legends Arceus", () => false)
    .with("Ruby and Sapphire", () => false)
    .with("FireRed and LeafGreen", () => false)
    .with("Emerald", () => false)
    .with("Gold, Silver, Crystal", () => false)
    .with("X and Y", () => false)
    .with("Omega Ruby and Alpha Sapphire", () => false)
    .with("Sun and Moon", () => false)
    .with("Ultra Sun and Ultra Moon", () => false)
    .with("Sword and Shield", () => false)
    .with("Brilliant Diamond and Shining Pearl", () => false)
    .with("Gamecube", () => false)
    .with("GBA Overview", () => false)
    .with("GBA Technical Documentation", () => false)
    .with("Game Hub", () => false)
    .with("Home", () => false)
    .with("Transporter and Dream Radar", () => false)
    .with("USUM Challenges", () => false)
    .with("User Settings", () => false)
    .exhaustive();
};

const guidesWithFlattenedTags = flatMap(
  { ...guides, ...externalLinks },
  (guide) => {
    return guide.meta.tags.map((tag) => ({ ...guide.meta, tag }));
  },
);
const guidesWithFlattenedCategories = guidesWithFlattenedTags.flatMap(
  (guide) => {
    return guide.categories.map((category) => ({ ...guide, category }));
  },
);
const guideByCategory = groupBy(
  guidesWithFlattenedCategories,
  (guide) => guide.category,
);

export const getGuidesForSlug = (slug: GuideSlug) => {
  const categories = get(routeToCategory, slug);
  const guides =
    categories?.flatMap((category) => guideByCategory[category]) ?? null;
  return groupBy(guides, (guide) => {
    if (isToolCategory(guide.category)) {
      return "tool";
    }

    return guide.tag;
  });
};

export type CategorySlug = keyof typeof routeToCategory;

export const categoryHasNewContent = (slug: CategorySlug) => {
  const categories = get(routeToCategory, slug);
  const guides =
    categories?.flatMap((category) => guideByCategory[category]) ?? null;
  return guides.some((guide) => guide.isNew);
};
