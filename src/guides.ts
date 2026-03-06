import * as tst from "ts-toolbelt";
import { guides, categories, externalGuides } from "./__generated__/guides";
import { groupBy, flatMap, get, uniq } from "lodash-es";
import { Route } from "./routes/defs";
import { SlugOrExternalLink } from "./types/navigation";
import { LanguageKey, LanguageSchema } from "~/types/language";

export type InternalGuideMeta = tst.U.Exclude<
  GuideMeta,
  { type: "externalLink" }
>;

export type InternalGuide = Guide & { meta: InternalGuideMeta };

export const categoryOwners: Record<Category, Route> = {
  Home: "/",
  "Gold, Silver, Crystal": "/crystal/",
  "Transporter and Dream Radar": "/transporter-dream-radar/",
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

export { guides, guideSlugs, categories } from "~/__generated__/guides";

export type Guide = (typeof guides)[keyof typeof guides];
export type GuideMeta = Guide["meta"];
export type GuideSlug = tst.U.Exclude<
  GuideMeta,
  { type: "externalLink" }
>["slug"];

export type GamePageGuideCard = {
  id: string;
  guideKey: string;
  title: string;
  navDrawerTitle: string;
  description: string;
  displayAttributes: GuideMeta["displayAttributes"][number][];
  retailLink: SlugOrExternalLink | null;
  retailIsNew: boolean;
  cfwEmuLink: SlugOrExternalLink | null;
  cfwEmuIsNew: boolean;
  isNew: boolean;
  hideFromNavDrawer: boolean;
  isRoughDraft: boolean;
  orderPriority: number;
  translations: LanguageKey[];
  section: GuideMeta["section"];
};

export type InternalOrExternalGuideMeta =
  | GuideMeta
  | (typeof externalGuides)[number];

export type GuidesBySection = {
  rng_technique: GamePageGuideCard[];
  pokemon_rng: GamePageGuideCard[];
  other_rng: GamePageGuideCard[];
  getting_started: InternalOrExternalGuideMeta[];
  supporting_info: InternalOrExternalGuideMeta[];
  technical_info: InternalOrExternalGuideMeta[];
  tool: InternalOrExternalGuideMeta[];
  patch: InternalOrExternalGuideMeta[];
  site_info: InternalOrExternalGuideMeta[];
  challenge: InternalOrExternalGuideMeta[];
};

type GuideMetaWithCategory = InternalOrExternalGuideMeta & {
  category: Category;
};

type GuideCardMap = Record<string, GamePageGuideCard>;

type GuideVariantLinkPair = {
  retail: SlugOrExternalLink | null;
  cfwEmu: SlugOrExternalLink | null;
};

type GuideVariant = "retail" | "cfw-emu";

export const getGuide = (slug: GuideSlug) => {
  return guides[slug];
};

export type Category = tst.L.UnionOf<typeof categories>;

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

const getCategoriesForSlug = (slug: GuideSlug) => {
  return get(routeToCategory, slug) ?? [];
};

const getGuidesForCategories = (categories: Category[]) => {
  return categories.flatMap(
    (category) => guidesByCategoryWithMeta[category] ?? [],
  );
};

const hasGuideVariant = (
  guide: GuideMetaWithCategory,
  variant: GuideVariant,
) => {
  const variants: readonly string[] = guide.guideVariants ?? [];
  return variants.includes(variant);
};

export const guideTranslationKeys = <
  Guide extends { translations?: GuideMeta["translations"] },
>(
  guide: Guide,
): LanguageKey[] => {
  const parsed = LanguageSchema.array().safeParse(
    Object.keys(guide.translations ?? {}),
  );
  return parsed.success ? parsed.data : [];
};

const createGuideCard = (
  guide: GuideMetaWithCategory,
  variants: GuideVariantLinkPair | null,
): GamePageGuideCard => {
  return {
    ...guide,
    id: guide.guideGroupId,
    translations: guideTranslationKeys(guide),
    displayAttributes: [...guide.displayAttributes],
    retailLink: variants?.retail ?? null,
    retailIsNew: guide.isNew && hasGuideVariant(guide, "retail"),
    cfwEmuLink: variants?.cfwEmu ?? null,
    cfwEmuIsNew: guide.isNew && hasGuideVariant(guide, "cfw-emu"),
  };
};

const mergeGuideCard = (
  existing: GamePageGuideCard,
  variants: GuideVariantLinkPair | null,
  guide: GuideMetaWithCategory,
): GamePageGuideCard => {
  return {
    ...existing,
    displayAttributes: uniq([
      ...existing.displayAttributes,
      ...guide.displayAttributes,
    ]),
    translations: uniq([
      ...existing.translations,
      ...guideTranslationKeys(guide),
    ]),
    retailLink: variants?.retail ?? existing.retailLink,
    retailIsNew:
      existing.retailIsNew || (guide.isNew && hasGuideVariant(guide, "retail")),
    cfwEmuLink: variants?.cfwEmu ?? existing.cfwEmuLink,
    cfwEmuIsNew:
      existing.cfwEmuIsNew ||
      (guide.isNew && hasGuideVariant(guide, "cfw-emu")),
    isNew: existing.isNew || guide.isNew,
    hideFromNavDrawer: existing.hideFromNavDrawer && guide.hideFromNavDrawer,
    isRoughDraft: existing.isRoughDraft || guide.isRoughDraft,
  };
};

const mergeRngGuides = (
  guides: GuideMetaWithCategory[],
): GamePageGuideCard[] => {
  const cardsById = guides.reduce<GuideCardMap>((acc, guide) => {
    const variants = guide.guideVariantLinks;
    const existing = acc[guide.guideGroupId];

    return {
      ...acc,
      [guide.guideGroupId]:
        existing == null
          ? createGuideCard(guide, variants)
          : mergeGuideCard(existing, variants, guide),
    };
  }, {});

  return Object.values(cardsById);
};

const internalGuidesWithCategory = flatMap(guides, (guide) => {
  return guide.meta.categories.map((category) => ({
    ...guide.meta,
    category,
  }));
});

const externalGuidesWithCategory = flatMap(externalGuides, (guide) => {
  return guide.categories.map((category) => ({
    ...guide,
    category,
  }));
});

const guidesWithCategory = [
  ...internalGuidesWithCategory,
  ...externalGuidesWithCategory,
];

const guidesByCategoryWithMeta = groupBy(
  guidesWithCategory,
  (guide) => guide.category,
);

export const getGuidesBySectionForSlug = (slug: GuideSlug): GuidesBySection => {
  const categories = getCategoriesForSlug(slug);
  const guides = getGuidesForCategories(categories);
  const grouped = groupBy(guides, (guide) => guide.section);

  return {
    rng_technique: mergeRngGuides(grouped.rng_technique ?? []),
    pokemon_rng: mergeRngGuides(grouped.pokemon_rng ?? []),
    other_rng: mergeRngGuides(grouped.other_rng ?? []),
    getting_started: grouped.getting_started ?? [],
    supporting_info: grouped.supporting_info ?? [],
    technical_info: grouped.technical_info ?? [],
    tool: grouped.tool ?? [],
    patch: grouped.patch ?? [],
    site_info: grouped.site_info ?? [],
    challenge: grouped.challenge ?? [],
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
