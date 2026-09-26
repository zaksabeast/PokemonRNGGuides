import { sortBy, uniq } from "lodash-es";
import { match } from "ts-pattern";
import dayjs from "dayjs";
import type { Difficulty, GameGuideRow, GuideSetup } from "~/guides";
import { languageByKey } from "~/types/language";

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

export const getSectionLabel = (section: PageSection) => {
  return match(section)
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

export const getSetupLabel = (setup: GuideSetup) => {
  return match(setup)
    .with("retail", () => "Retail")
    .with("cfw-emu", () => "Emulator")
    .exhaustive();
};

const getDifficultyLabel = (difficulty: Difficulty) => {
  return match(difficulty)
    .with("easy", () => "Beginner")
    .with("medium", () => "Intermediate")
    .with("hard", () => "Advanced")
    .exhaustive();
};

const formatUpdatedOn = (date: string) => dayjs(date).format("D MMM YYYY");

export const getGuideMetaLine = (guide: GameGuideRow) => {
  const languages = uniq(["en" as const, ...guide.translations])
    .map((lang) => languageByKey[lang].shortLabel)
    .join(", ");

  return [
    guide.difficulty == null ? null : getDifficultyLabel(guide.difficulty),
    guide.updatedOn == null ? null : formatUpdatedOn(guide.updatedOn),
    languages,
  ]
    .filter((part) => part != null)
    .join(" · ");
};

const getDifficultyDisplayOrder = (difficulty: Difficulty | null): number => {
  return match(difficulty)
    .with("easy", () => 0)
    .with("medium", () => 1)
    .with("hard", () => 2)
    .with(null, () => 3)
    .exhaustive();
};

export const sortGuides = (guides: GameGuideRow[]): GameGuideRow[] => {
  return sortBy(guides, [
    (guide) => guide.orderPriority,
    (guide) => getDifficultyDisplayOrder(guide.difficulty),
    (guide) => guide.isRoughDraft,
    (guide) => guide.title,
  ]);
};
