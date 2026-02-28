import * as tst from "ts-toolbelt";
import { guides, categories } from "./__generated__/guides";
import { groupBy, flatMap, get, uniq } from "lodash-es";
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
  displayAttributes: GuideMeta["displayAttributes"][number][];
  retailSlug: GuideSlug | null;
  retailIsNew: boolean;
  cfwEmuSlug: GuideSlug | null;
  cfwEmuIsNew: boolean;
  isNew: boolean;
  hideFromNavDrawer: boolean;
  isRoughDraft: boolean;
  section: GuideMeta["section"];
};

export type GuidesBySection = {
  rng_technique: GamePageGuideCard[];
  pokemon_rng: GamePageGuideCard[];
  other_rng: GamePageGuideCard[];
  getting_started: GuideMeta[];
  supporting_info: GuideMeta[];
  technical_info: GuideMeta[];
  tool: GuideMeta[];
  patch: GuideMeta[];
  site_info: GuideMeta[];
  challenge: GuideMeta[];
};

type GuideMetaWithCategory = GuideMeta & { category: Category };

type GuideCardMap = Record<string, GamePageGuideCard>;

type GuideVariantLinkPair = {
  retail: GuideSlug | null;
  cfwEmu: GuideSlug | null;
};

type GuideVariant = "retail" | "cfw-emu";

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

const hasGuideVariant = (
  guide: GuideMetaWithCategory,
  variant: GuideVariant,
) => {
  const variants: readonly string[] = guide.guideVariants ?? [];
  return variants.includes(variant);
};

const createGuideCard = (
  guide: GuideMetaWithCategory,
  variants: GuideVariantLinkPair,
): GamePageGuideCard => {
  return {
    id: guide.guideGroupId,
    guideKey: guide.guideKey,
    title: guide.title,
    navDrawerTitle: guide.navDrawerTitle,
    description: guide.description,
    displayAttributes: [...guide.displayAttributes],
    retailSlug: variants.retail,
    retailIsNew: guide.isNew && hasGuideVariant(guide, "retail"),
    cfwEmuSlug: variants.cfwEmu,
    cfwEmuIsNew: guide.isNew && hasGuideVariant(guide, "cfw-emu"),
    isNew: guide.isNew,
    hideFromNavDrawer: guide.hideFromNavDrawer,
    isRoughDraft: guide.isRoughDraft,
    section: guide.section,
  };
};

const mergeGuideCard = (
  existing: GamePageGuideCard,
  variants: GuideVariantLinkPair,
  guide: GuideMetaWithCategory,
) => {
  return {
    ...existing,
    displayAttributes: uniq([
      ...existing.displayAttributes,
      ...guide.displayAttributes,
    ]),
    retailSlug:
      existing.retailSlug == null && variants.retail != null
        ? variants.retail
        : existing.retailSlug,
    retailIsNew:
      existing.retailIsNew || (guide.isNew && hasGuideVariant(guide, "retail")),
    cfwEmuSlug:
      existing.cfwEmuSlug == null && variants.cfwEmu != null
        ? variants.cfwEmu
        : existing.cfwEmuSlug,
    cfwEmuIsNew:
      existing.cfwEmuIsNew ||
      (guide.isNew && hasGuideVariant(guide, "cfw-emu")),
    isNew: existing.isNew || guide.isNew,
    hideFromNavDrawer: existing.hideFromNavDrawer && guide.hideFromNavDrawer,
    isRoughDraft: existing.isRoughDraft && guide.isRoughDraft,
  };
};

const mergeRngGuides = (
  guides: GuideMetaWithCategory[],
): GamePageGuideCard[] => {
  const cardsById = guides.reduce<GuideCardMap>((acc, guide) => {
    const variants = resolveGuideVariantLinks(guide);
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
