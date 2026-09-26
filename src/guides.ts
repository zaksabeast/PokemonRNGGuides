import * as tst from "ts-toolbelt";
import { match } from "ts-pattern";
import { guides, categories, externalGuides } from "./__generated__/guides";
import { groupBy, flatMap, get, uniqBy, orderBy } from "lodash-es";
import { Route } from "./routes/defs";
import { SlugOrExternalLink } from "./types/navigation";
import { LanguageKey, LanguageSchema } from "~/types/language";
import { rngGuideVariants } from "./guideSections";

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

export type GuideSetup = (typeof rngGuideVariants)[number];

// Spelled out because guide metadata only includes difficulties that guides currently use
export type Difficulty = "easy" | "medium" | "hard";

export type DisplayAttribute = GuideMeta["displayAttributes"][number];

export type GameGuideRow = {
  id: string;
  title: string;
  link: SlugOrExternalLink;
  difficulty: Difficulty | null;
  /** ISO date (YYYY-MM-DD) */
  updatedOn: string | null;
  translations: LanguageKey[];
  displayAttributes: DisplayAttribute[];
  isNew: boolean;
  isRoughDraft: boolean;
  orderPriority: number;
  /** Set when the guide also exists for the other setup */
  otherSetupLink: SlugOrExternalLink | null;
};

export type RngGuidesBySetup = Record<GuideSetup, GameGuideRow[]>;

export type InternalOrExternalGuideMeta =
  | GuideMeta
  | (typeof externalGuides)[number];

export type GuidesBySection = {
  rng_technique: RngGuidesBySetup;
  pokemon_rng: RngGuidesBySetup;
  other_rng: RngGuidesBySetup;
  getting_started: GameGuideRow[];
  supporting_info: GameGuideRow[];
  technical_info: GameGuideRow[];
  tool: GameGuideRow[];
  patch: GameGuideRow[];
  site_info: GameGuideRow[];
  challenge: GameGuideRow[];
};

type GuideMetaWithCategory = InternalOrExternalGuideMeta & {
  category: Category;
};

type GuideVariantLinkPair = {
  retail: SlugOrExternalLink | null;
  cfwEmu: SlugOrExternalLink | null;
};

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

const hasGuideVariant = (guide: GuideMetaWithCategory, variant: GuideSetup) => {
  const variants: readonly string[] = guide.guideVariants ?? [];
  return variants.includes(variant);
};

export const getOtherGuideSetup = (setup: GuideSetup): GuideSetup => {
  return match(setup)
    .with("retail", () => "cfw-emu" as const)
    .with("cfw-emu", () => "retail" as const)
    .exhaustive();
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

const getGuideLink = (guide: GuideMetaWithCategory): SlugOrExternalLink => {
  return guide.type === "externalLink"
    ? { type: "externalLink", externalLink: guide.url }
    : { type: "slug", slug: guide.slug };
};

const getVariantLink = (
  links: GuideVariantLinkPair | null,
  setup: GuideSetup,
): SlugOrExternalLink | null => {
  return match(setup)
    .with("retail", () => links?.retail ?? null)
    .with("cfw-emu", () => links?.cfwEmu ?? null)
    .exhaustive();
};

const createGuideRow = ({
  id,
  guide,
  setup,
}: {
  id: string;
  guide: GuideMetaWithCategory;
  setup: GuideSetup | null;
}): GameGuideRow => {
  const links = setup == null ? null : guide.guideVariantLinks;

  return {
    id,
    title: guide.navDrawerTitle,
    link:
      (setup == null ? null : getVariantLink(links, setup)) ??
      getGuideLink(guide),
    difficulty: guide.difficulty ?? null,
    updatedOn: guide.lastUpdated ?? guide.addedOn ?? null,
    translations: guideTranslationKeys(guide),
    displayAttributes: [...guide.displayAttributes],
    isNew: guide.isNew,
    isRoughDraft: guide.isRoughDraft,
    orderPriority: guide.orderPriority,
    otherSetupLink:
      setup == null ? null : getVariantLink(links, getOtherGuideSetup(setup)),
  };
};

const isVisibleGuide = (guide: GuideMetaWithCategory) => {
  return !guide.hideFromNavDrawer;
};

// Retail and emulator variants share a group, so each setup gets its own row per group
const createRngGuideRows = (
  guides: GuideMetaWithCategory[],
  setup: GuideSetup,
): GameGuideRow[] => {
  const setupGuides = guides.filter(
    (guide) => isVisibleGuide(guide) && hasGuideVariant(guide, setup),
  );

  return uniqBy(setupGuides, (guide) => guide.guideGroupId).map((guide) =>
    createGuideRow({ id: guide.guideGroupId, guide, setup }),
  );
};

const createRngGuidesBySetup = (
  guides: GuideMetaWithCategory[],
): RngGuidesBySetup => {
  return {
    retail: createRngGuideRows(guides, "retail"),
    "cfw-emu": createRngGuideRows(guides, "cfw-emu"),
  };
};

const createGuideRows = (guides: GuideMetaWithCategory[]): GameGuideRow[] => {
  // Games with multiple categories can list the same guide more than once
  return uniqBy(guides.filter(isVisibleGuide), (guide) => guide.id).map(
    (guide) => createGuideRow({ id: guide.id, guide, setup: null }),
  );
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
    rng_technique: createRngGuidesBySetup(grouped.rng_technique ?? []),
    pokemon_rng: createRngGuidesBySetup(grouped.pokemon_rng ?? []),
    other_rng: createRngGuidesBySetup(grouped.other_rng ?? []),
    getting_started: createGuideRows(grouped.getting_started ?? []),
    supporting_info: createGuideRows(grouped.supporting_info ?? []),
    technical_info: createGuideRows(grouped.technical_info ?? []),
    tool: createGuideRows(grouped.tool ?? []),
    patch: createGuideRows(grouped.patch ?? []),
    site_info: createGuideRows(grouped.site_info ?? []),
    challenge: createGuideRows(grouped.challenge ?? []),
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

const LATEST_GUIDE_COUNT = 4;

const getVariantLabel = (
  variants: readonly GuideSetup[] | null,
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
    const isNew = meta.isNew;

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
