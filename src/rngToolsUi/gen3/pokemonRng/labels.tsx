import { Tooltip } from "antd";
import { Flex, Link } from "~/components";
import { formatHex } from "~/utils/formatHex";
import {
  formatLargeInteger,
  formatLargeIntegerWithSign,
} from "~/utils/formatLargeInteger";
import { lcrng_distance, pokerng_with_jump } from "~/utils/lcrng";

export const minFramesBeforePaintingLabel = () => ({
  label: "Min frames before painting",
  tooltip:
    "For advanced users. Those frames ensure there is enough time between booting the game and interacting with the painting.",
});

export const minAdvsAfterPaintingLabel = () => ({
  label: "Min advances after painting",
  tooltip:
    "To ensure there is enough time between interacting with the painting, and creating a Battle Video.",
});

export const usingPaintingReseedingLabel = () => ({
  label: "Using Painting Reseeding?",
  tooltip: (
    <>
      <Link href="/emerald-painting-reseeding/" newTab>
        Painting Reseeding
      </Link>{" "}
      is a RNG technique to make the RNG state jump by millions of advances
      instantly, giving access to RNG states that would normally not be
      reachable realistically.
    </>
  ),
});

export const advanceFromSeed0Txt = (seed: number) => {
  return `Equivalent to ${formatLargeInteger(lcrng_distance(0, seed))} advances without painting reseeding`;
};

export const targetFrameBeforePaintingLabel = (advBefore: number) => {
  return {
    label: "Target frame before painting",
    input: (
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
) => {
  let afterTxt = `${formatLargeInteger(targetPaintingAdvs.after)}`;
  if (initialAdvFromBattleVideo > 0) {
    afterTxt += ` (${formatLargeIntegerWithSign(targetPaintingAdvs.after - initialAdvFromBattleVideo)} from Battle Video)`;
  }

  return {
    label: "Target advance after painting",
    input: (
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

// For non-painting cases
export const targetAdvanceLabel = (
  advAfter: number,
  show: boolean,
  initialAdvFromBattleVideo = 0,
) => {
  const seed = pokerng_with_jump(0, advAfter);
  const seedTxt = `Seed: ${formatHex(seed, 4)}`;

  return {
    label: "Target advance",
    input: (
      <Tooltip title={seedTxt}>
        {advanceAfterTxt(advAfter, initialAdvFromBattleVideo)}
      </Tooltip>
    ),
    show,
  };
};
