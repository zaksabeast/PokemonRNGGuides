import styled from "@emotion/styled";
import { type Color } from "@emotion/react";
import { Icon, Tag, type IconName } from "~/components";
import {
  getOtherGuideSetup,
  type GameGuideRow,
  type GuideSetup,
} from "~/guides";
import { getSetupLabel } from "./utils";

type ChipConfig = {
  key: string;
  label: string;
  icon: IconName;
  iconColor?: Color;
  tone?: "info" | "new";
};

const getChips = (guide: GameGuideRow, setup: GuideSetup): ChipConfig[] => {
  const otherSetupLabel = getSetupLabel(getOtherGuideSetup(setup));
  const chips: (ChipConfig | null)[] = [
    guide.isNew
      ? { key: "new", label: "New", icon: "Sparkles", tone: "new" }
      : null,
    guide.displayAttributes.includes("web_tool")
      ? { key: "web_tool", label: "Web tool", icon: "Build" }
      : null,
    guide.displayAttributes.includes("video_guide")
      ? { key: "video", label: "Video", icon: "PlayCircle" }
      : null,
    guide.otherSetupLink != null
      ? {
          key: "other_setup",
          label: `Also on ${otherSetupLabel.toLowerCase()}`,
          icon: "SwapHoriz",
          tone: "info",
        }
      : null,
    guide.displayAttributes.includes("rough_draft")
      ? {
          key: "rough_draft",
          label: "Rough draft",
          icon: "Edit",
          iconColor: "Warning",
        }
      : null,
  ];

  return chips.filter((chip) => chip != null);
};

const ChipRow = styled.div({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 8,
});

type Props = {
  guide: GameGuideRow;
  setup: GuideSetup;
  className?: string;
};

export const GuideChips = ({ guide, setup, className }: Props) => {
  const chips = getChips(guide, setup);

  if (chips.length === 0) {
    return null;
  }

  return (
    <ChipRow className={className}>
      {chips.map((chip) =>
        chip.tone === "new" ? (
          <Tag
            key={chip.key}
            variant="filled"
            icon={<Icon name={chip.icon} size={16} color="Success" />}
            color="Success"
            backgroundColor="SuccessBg"
          >
            {chip.label}
          </Tag>
        ) : chip.tone === "info" ? (
          <Tag
            key={chip.key}
            icon={<Icon name={chip.icon} size={16} color="Info" />}
            color="InfoTonal"
            backgroundColor="InfoTonalBg"
            borderColor="InfoTonalBorder"
          >
            {chip.label}
          </Tag>
        ) : (
          <Tag
            key={chip.key}
            icon={
              <Icon
                name={chip.icon}
                size={16}
                color={chip.iconColor ?? "Primary"}
              />
            }
          >
            {chip.label}
          </Tag>
        ),
      )}
    </ChipRow>
  );
};
