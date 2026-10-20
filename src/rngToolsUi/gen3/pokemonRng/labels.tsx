import React from "react";
import { Tooltip } from "antd";
import { Flex, Link } from "~/components";
import { type InfoTooltipContent, type SummaryRow } from "~/components/form";
import { type BattleVideoInfo } from "../battleVideo/battleVideo";
import { formatHex } from "~/utils/formatHex";
import {
  formatLargeInteger,
  formatLargeIntegerWithSign,
} from "~/utils/formatLargeInteger";
import { lcrng_distance, pokerng_with_jump } from "~/utils/lcrng";

type FieldLabel = {
  label: string;
  tooltip: InfoTooltipContent;
};

export const minFramesBeforePaintingLabel = (): FieldLabel => ({
  label: "Min frames before painting",
  tooltip: {
    title: "Min frames before painting",
    description:
      "For advanced users. Those frames ensure there is enough time between booting the game and interacting with the painting.",
  },
});

export const minAdvsAfterPaintingLabel = (): FieldLabel => ({
  label: "Min advances after painting",
  tooltip: {
    title: "Min advances after painting",
    description:
      "To ensure there is enough time between interacting with the painting and creating a Battle Video.",
  },
});

export const usingPaintingReseedingLabel = (): FieldLabel => ({
  label: "Using Painting Reseeding?",
  tooltip: {
    title: "Painting Reseeding",
    description: (
      <>
        <Link href="/emerald-painting-reseeding/" newTab>
          Painting Reseeding
        </Link>{" "}
        is a RNG technique to make the RNG state jump by millions of advances
        instantly, giving access to RNG states that would normally not be
        reachable realistically.
      </>
    ),
  },
});

export const advanceFromSeed0Txt = (seed: number) => {
  return `Equivalent to ${formatLargeInteger(lcrng_distance(0, seed))} advances without painting reseeding`;
};

export const targetFrameBeforePaintingLabel = (
  advBefore: number,
): SummaryRow => {
  return {
    label: "Target frame before painting",
    value: (
      <Tooltip title={advanceFromSeed0Txt(advBefore)}>
        {formatLargeInteger(advBefore)} (Seed: {formatHex(advBefore, 2)})
      </Tooltip>
    ),
    show: advBefore > 0,
  };
};

export const targetAdvanceAfterPaintingTitle = (targetPaintingAdvs: {
  before: number;
  after: number;
}) => {
  const seed = pokerng_with_jump(
    targetPaintingAdvs.before,
    targetPaintingAdvs.after,
  );
  const seedTxt = `Seed: ${formatHex(seed, 4)}`;
  if (targetPaintingAdvs.before === 0) {
    return seedTxt;
  }

  return (
    <Flex vertical>
      <div>{seedTxt}</div>
      <div>{advanceFromSeed0Txt(seed)}</div>
    </Flex>
  );
};

export const targetAdvanceAfterPaintingLabel = (
  targetPaintingAdvs: {
    before: number;
    after: number;
  },
  initialAdvFromBattleVideo = 0,
): SummaryRow => {
  let afterTxt = `${formatLargeInteger(targetPaintingAdvs.after)}`;
  if (initialAdvFromBattleVideo > 0) {
    afterTxt += ` (${formatLargeIntegerWithSign(targetPaintingAdvs.after - initialAdvFromBattleVideo)} from Battle Video)`;
  }

  return {
    label: "Target advance after painting",
    value: (
      <Tooltip title={targetAdvanceAfterPaintingTitle(targetPaintingAdvs)}>
        {afterTxt}
      </Tooltip>
    ),
    show: targetPaintingAdvs.before > 0,
  };
};

export const advanceAfterTxt = (
  advAfter: number,
  initialAdvFromBattleVideo: number,
) => {
  let afterTxt = `${formatLargeInteger(advAfter)}`;
  if (initialAdvFromBattleVideo > 0) {
    afterTxt += ` (${formatLargeIntegerWithSign(advAfter - initialAdvFromBattleVideo)} from Battle Video)`;
  }
  return afterTxt;
};

type CalibTargetSetup = {
  targetMethod: React.ReactNode;
  targetPaintingAdvs: { before: number; after: number };
};

export const getGen3CalibPreviousStepRows = ({
  targetSetup,
  battleVideoInfo,
  initialAdv,
  showTargetMethod = true,
}: {
  targetSetup: CalibTargetSetup;
  battleVideoInfo: BattleVideoInfo;
  initialAdv: number;
  showTargetMethod?: boolean;
}): SummaryRow[] => {
  return [
    {
      label: "Target method",
      value: targetSetup.targetMethod,
      show: showTargetMethod,
    },
    targetFrameBeforePaintingLabel(battleVideoInfo.targetPaintingAdvs.before),
    {
      label: "Battle Video advance",
      value: formatLargeInteger(battleVideoInfo.battleVideoAdvAfterPainting),
      show: battleVideoInfo.battleVideoAdvAfterPainting > 0,
    },
    targetAdvanceLabel(
      targetSetup.targetPaintingAdvs.after,
      targetSetup.targetPaintingAdvs.before === 0,
      initialAdv,
    ),
    targetAdvanceAfterPaintingLabel(targetSetup.targetPaintingAdvs, initialAdv),
  ];
};

// For non-painting cases
export const targetAdvanceLabel = (
  advAfter: number,
  show: boolean,
  initialAdvFromBattleVideo = 0,
): SummaryRow => {
  const seed = pokerng_with_jump(0, advAfter);
  const seedTxt = `Seed: ${formatHex(seed, 4)}`;

  return {
    label: "Target advance",
    value: (
      <Tooltip title={seedTxt}>
        {advanceAfterTxt(advAfter, initialAdvFromBattleVideo)}
      </Tooltip>
    ),
    show,
  };
};
