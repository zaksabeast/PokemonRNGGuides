import { Tag } from "~/components";
import { Color } from "@emotion/react";

export type Difficulty = "easy" | "medium" | "hard";

type DifficultyConfig = {
  label: string;
  color: Color;
};

const configs: Record<Difficulty, DifficultyConfig> = {
  easy: {
    label: "Easy",
    color: "SuccessActive",
  },
  medium: {
    label: "Medium",
    color: "WarningActive",
  },
  hard: {
    label: "Hard",
    color: "ErrorActive",
  },
};

type DifficultyTagProps = { difficulty: Difficulty | null };

export const DifficultyTag = ({ difficulty }: DifficultyTagProps) => {
  if (difficulty == null) {
    return null;
  }

  const config = configs[difficulty];

  return <Tag color={config.color}>{config.label}</Tag>;
};
