import * as tst from "ts-toolbelt";
import { match } from "ts-pattern";
import { guides, categories, externalGuides } from "./__generated__/guides";
import { groupBy, flatMap, get, uniq, uniqBy, orderBy } from "lodash-es";
import dayjs from "dayjs";
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
  difficulty: GuideMeta["difficulty"] | null;
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
  const isRetail = hasGuideVariant(guide, "retail");
  const isCfwEmu = hasGuideVariant(guide, "cfw-emu");

  const difficulty = match({
    isRetail,
    isCfwEmu,
    existingDifficulty: existing.difficulty,
    difficulty: guide.difficulty,
  })
    .with({ isRetail: true }, (matched) => matched.difficulty)
    .with(
      { isCfwEmu: true, existingDifficulty: null },
      (matched) => matched.difficulty,
    )
    .otherwise(({ existingDifficulty }) => existingDifficulty);

  return {
    ...existing,
    orderPriority: Math.min(existing.orderPriority, guide.orderPriority),
    displayAttributes: uniq([
      ...existing.displayAttributes,
      ...guide.displayAttributes,
    ]),
    translations: uniq([
      ...existing.translations,
      ...guideTranslationKeys(guide),
    ]),
    retailLink: variants?.retail ?? existing.retailLink,
    retailIsNew: existing.retailIsNew || (guide.isNew && isRetail),
    cfwEmuLink: variants?.cfwEmu ?? existing.cfwEmuLink,
    cfwEmuIsNew: existing.cfwEmuIsNew || (guide.isNew && isCfwEmu),
    isNew: existing.isNew || guide.isNew,
    hideFromNavDrawer: existing.hideFromNavDrawer && guide.hideFromNavDrawer,
    isRoughDraft: existing.isRoughDraft || guide.isRoughDraft,
    difficulty,
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

export type GuideUpdate = {
  slug: GuideSlug;
  name: string;
  game: string;
  status: "New" | "Updated";
  /** Only set when the guide is for a single variant */
  variant: "Retail" | "Emu" | null;
  /** ISO date (YYYY-MM-DD) */
  date: string;
};

// Guides added within this many days of their latest change are shown as new
const NEW_GUIDE_DAYS = 30;
const LATEST_GUIDE_COUNT = 4;

const getVariantLabel = (
  variants: readonly GuideVariant[] | null,
): GuideUpdate["variant"] => {
  if (variants == null || variants.length !== 1) {
    return null;
  }
  return variants[0] === "retail" ? "Retail" : "Emu";
};

export const getLatestGuideUpdates = (): GuideUpdate[] => {
  const updates = Object.values(guides).flatMap(({ meta }) => {
    const categories: readonly Category[] = meta.categories;

    if (
      meta.type !== "baseGuide" ||
      meta.isRoughDraft ||
      meta.hideFromNavDrawer ||
      meta.section === "site_info" ||
      categories.includes("Game Hub") ||
      categories.includes("Home")
    ) {
      return [];
    }

    const dates = [meta.addedOn, meta.lastUpdated].filter(
      (date) => date != null,
    );
    if (dates.length === 0) {
      return [];
    }

    const date = dates.sort().at(-1) ?? dates[0];
    const isNew =
      meta.addedOn != null &&
      dayjs(date).diff(dayjs(meta.addedOn), "day") <= NEW_GUIDE_DAYS;

    return [
      {
        groupId: meta.guideGroupId,
        slug: meta.slug,
        name: meta.navDrawerTitle,
        game:
          meta.categories.length === 1 ? meta.categories[0] : "Multiple games",
        status: isNew ? ("New" as const) : ("Updated" as const),
        variant: getVariantLabel(meta.guideVariants),
        date,
      },
    ];
  });

  // Retail and emulator variants share a group, so only show the group once
  return uniqBy(
    orderBy(updates, (update) => update.date, "desc"),
    (update) => update.groupId,
  )
    .slice(0, LATEST_GUIDE_COUNT)
    .map(({ groupId: _groupId, ...update }) => update);
};

export const categoryHasNewContent = (slug: CategorySlug) => {
  const categories = get(routeToCategory, slug) ?? [];
  const guides = categories.flatMap(
    (category) => guidesByCategoryWithMeta[category] ?? [],
  );
  return guides.some((guide) => guide.isNew);
};
