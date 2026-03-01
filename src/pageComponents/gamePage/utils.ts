import { sortBy } from "lodash-es";
import { match } from "ts-pattern";

export const sectionDisplayOrder = [
  "getting_started",
  "pokemon_rng",
  "other_rng",
  "rng_technique",
  "supporting_info",
  "technical_info",
  "tool",
  "patch",
] as const;

export type PageSection = (typeof sectionDisplayOrder)[number];

const isSectionDisplay = (section: string): section is PageSection => {
  return sectionDisplayOrder.includes(section as PageSection);
};

export const getSectionLabel = (section: string) => {
  if (!isSectionDisplay(section)) {
    return section;
  }

  return match<PageSection>(section)
    .with("tool", () => "Tools")
    .with("patch", () => "Patches")
    .with("getting_started", () => "Getting Started")
    .with("rng_technique", () => "RNG Techniques")
    .with("pokemon_rng", () => "Pokemon RNG")
    .with("other_rng", () => "Other RNG")
    .with("supporting_info", () => "Supporting Info")
    .with("technical_info", () => "Technical Info")
    .exhaustive();
};

export const sortGuides = <
  Guide extends {
    orderPriority: number;
    navDrawerTitle: string;
    isRoughDraft: boolean;
  },
>(
  guides: Guide[],
): Guide[] => {
  return sortBy(guides, [
    (guide) => guide.orderPriority,
    (guide) => guide.isRoughDraft,
    (guide) => guide.navDrawerTitle,
  ]);
};

export const filterVisibleGuide = <
  Guide extends { hideFromNavDrawer: boolean },
>(
  guide: Guide,
): guide is Guide & { hideFromNavDrawer: false } => {
  return !guide.hideFromNavDrawer;
};
