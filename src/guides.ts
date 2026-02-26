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
      | "section"
      | "guideVariants"
      | "guideKey"
      | "displayAttributes"
      | "isNew"
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

export type GamePageGuideCard = {
  id: string;
  guideKey: string;
  title: string;
  navDrawerTitle: string;
  description: string;
  retailSlug: GuideSlug | null;
  cfwEmuSlug: GuideSlug | null;
  isNew: boolean;
  hideFromNavDrawer: boolean;
  isRoughDraft: boolean;
};

export type GuidesBySection = {
  info: GuideMeta[];
  challenge: GuideMeta[];
  guides: GamePageGuideCard[];
  tool: GuideMeta[];
  patch: GuideMeta[];
};

type GuideMetaWithCategory = GuideMeta & { category: Category };

type GuideCardMap = Record<string, GamePageGuideCard>;

type GuideVariantLinkPair = {
  retail: GuideSlug | null;
  cfwEmu: GuideSlug | null;
};

export const getGuide = (slug: GuideSlug) => {
  return guides[slug];
};

export type Category = tst.L.UnionOf<typeof categories>;

export type LanguageKey = tst.O.RequiredKeys<
  tst.U.NonNullable<GuideMeta["translations"]>
>;

const routeToCategory = {
  "/transporter-dream-radar/": ["Transporter and Dream Radar"],
  "/legends-arceus/": ["Legends Arceus"],
  "/crystal/": ["Gold, Silver, Crystal"],
  "/ruby-and-sapphire/": ["Ruby and Sapphire", "GBA Technical Documentation"],
  "/gamecube/": ["Gamecube"],
  "/fire-red-and-leaf-green/": ["FireRed and LeafGreen"],
  "/emerald/": ["Emerald", "GBA Technical Documentation"],
  "/diamond-pearl-and-platinum/": ["Diamond, Pearl, and Platinum"],
  "/heart-gold-and-soul-silver/": ["HeartGold and SoulSilver"],
  "/black-and-white/": ["Black and White"],
  "/black-2-and-white-2/": ["Black 2 and White 2"],
  "/x-and-y/": ["X and Y"],
  "/omega-ruby-and-alpha-sapphire/": ["Omega Ruby and Alpha Sapphire"],
  "/sun-and-moon/": ["Sun and Moon"],
  "/ultra-sun-and-ultra-moon/": ["Ultra Sun and Ultra Moon"],
  "/sword-and-shield/": ["Sword and Shield"],
  "/brilliant-diamond-and-shining-pearl/": [
    "Brilliant Diamond and Shining Pearl",
  ],
} satisfies Partial<Record<GuideSlug, Category[]>>;

const createEmptySectionedGuides = (): GuidesBySection => ({
  info: [],
  challenge: [],
  guides: [],
  tool: [],
  patch: [],
});

const getCategoriesForSlug = (slug: GuideSlug) => {
  return get(routeToCategory, slug) ?? [];
};

const getGuidesForCategories = (categories: Category[]) => {
  return categories.flatMap(
    (category) => guidesByCategoryWithMeta[category] ?? [],
  );
};

const resolveGuideVariantLinks = (
  guide: GuideMetaWithCategory,
): GuideVariantLinkPair => {
  const variants: readonly string[] = guide.guideVariants ?? [];
  const links = guide.guideVariantLinks ?? null;

  return {
    retail: links?.retail ?? (variants.includes("retail") ? guide.slug : null),
    cfwEmu: links?.cfwEmu ?? (variants.includes("cfw-emu") ? guide.slug : null),
  };
};

const createGuideCard = (
  guide: GuideMetaWithCategory,
  variants: GuideVariantLinkPair,
): GamePageGuideCard => ({
  id: guide.guideGroupId,
  guideKey: guide.guideKey,
  title: guide.title,
  navDrawerTitle: guide.navDrawerTitle,
  description: guide.description,
  retailSlug: variants.retail,
  cfwEmuSlug: variants.cfwEmu,
  isNew: guide.isNew,
  hideFromNavDrawer: guide.hideFromNavDrawer,
  isRoughDraft: guide.isRoughDraft,
});

const mergeGuideCard = (
  existing: GamePageGuideCard,
  variants: GuideVariantLinkPair,
  guide: GuideMetaWithCategory,
) => {
  return {
    ...existing,
    retailSlug:
      existing.retailSlug == null && variants.retail != null
        ? variants.retail
        : existing.retailSlug,
    cfwEmuSlug:
      existing.cfwEmuSlug == null && variants.cfwEmu != null
        ? variants.cfwEmu
        : existing.cfwEmuSlug,
    isNew: existing.isNew || guide.isNew,
    hideFromNavDrawer: existing.hideFromNavDrawer && guide.hideFromNavDrawer,
    isRoughDraft: existing.isRoughDraft && guide.isRoughDraft,
  };
};

const addNonGuideToSection = (
  sectioned: GuidesBySection,
  guide: GuideMetaWithCategory,
) => {
  return match(guide.section)
    .with("info", () => ({
      ...sectioned,
      info: [...sectioned.info, guide],
    }))
    .with("challenge", () => ({
      ...sectioned,
      challenge: [...sectioned.challenge, guide],
    }))
    .with("patch", () => ({
      ...sectioned,
      patch: [...sectioned.patch, guide],
    }))
    .with("tool", () => ({
      ...sectioned,
      tool: [...sectioned.tool, guide],
    }))
    .with("guide", () => sectioned)
    .exhaustive();
};

const addGuideToCards = (
  guideCardsById: GuideCardMap,
  guide: GuideMetaWithCategory,
) => {
  const variants = resolveGuideVariantLinks(guide);
  const existing = guideCardsById[guide.guideGroupId];

  if (existing == null) {
    return {
      ...guideCardsById,
      [guide.guideGroupId]: createGuideCard(guide, variants),
    };
  }

  return {
    ...guideCardsById,
    [guide.guideGroupId]: mergeGuideCard(existing, variants, guide),
  };
};

const guidesByCategoryWithMeta = groupBy(
  flatMap({ ...guides, ...externalLinks }, (guide) => {
    return guide.meta.categories.map((category) => ({
      ...guide.meta,
      category,
    }));
  }),
  (guide) => guide.category,
) as Partial<Record<Category, GuideMetaWithCategory[]>>;

export const getGuidesBySectionForSlug = (slug: GuideSlug): GuidesBySection => {
  const categories = getCategoriesForSlug(slug);
  const guides = getGuidesForCategories(categories);
  let sectioned = createEmptySectionedGuides();
  let guideCardsById: GuideCardMap = {};

  guides.forEach((guide) => {
    if (guide.section !== "guide") {
      sectioned = addNonGuideToSection(sectioned, guide);
      return;
    }

    guideCardsById = addGuideToCards(guideCardsById, guide);
  });

  return {
    ...sectioned,
    guides: Object.values(guideCardsById),
  };
};

export type CategorySlug = keyof typeof routeToCategory;

export const categoryHasNewContent = (slug: CategorySlug) => {
  const categories = get(routeToCategory, slug) ?? [];
  const guides = categories.flatMap(
    (category) => guidesByCategoryWithMeta[category] ?? [],
  );
  return guides.some((guide) => guide.isNew);
};
