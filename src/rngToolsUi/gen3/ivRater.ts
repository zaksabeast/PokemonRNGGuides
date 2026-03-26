import { match } from "ts-pattern";
import { Ivs } from "~/rngTools";
import { stats } from "~/types/stat";

const SUM_IVS_MSG_0_90 = "Average";
const SUM_IVS_MSG_91_120 = "Better-than-average";
const SUM_IVS_MSG_121_150 = "Quite impressive";
const SUM_IVS_MSG_151_186 = "Wonderfully outstanding";

const HIGHEST_IV_MSG_0_15 = "Relatively good.";
const HIGHEST_IV_MSG_16_25 = "Quite impressive";
const HIGHEST_IV_MSG_26_30 = "Outstanding";
const HIGHEST_IV_MSG_31 = "Flawless";

export type Gen3IvRating = ReturnType<typeof getGen3IvRating>;

export const getGen3IvRating = (ivs: Ivs) => {
  const ivSum = ivs.hp + ivs.atk + ivs.def + ivs.spa + ivs.spd + ivs.spe;
  const sumIvsMsg = match(ivSum)
    .when(
      (sum) => sum <= 90,
      () => SUM_IVS_MSG_0_90,
    )
    .when(
      (sum) => sum <= 120,
      () => SUM_IVS_MSG_91_120,
    )
    .when(
      (sum) => sum <= 150,
      () => SUM_IVS_MSG_121_150,
    )
    .otherwise(() => SUM_IVS_MSG_151_186);

  const statVals = stats.map((statId) => ivs[statId]);
  const highestStatVal = Math.max(...statVals);
  const highestStatIds = stats.filter(
    (statId) => ivs[statId] === highestStatVal,
  );

  const highestIvMsg = match(highestStatVal)
    .when(
      (val) => val <= 15,
      () => HIGHEST_IV_MSG_0_15,
    )
    .when(
      (val) => val <= 25,
      () => HIGHEST_IV_MSG_16_25,
    )
    .when(
      (val) => val <= 30,
      () => HIGHEST_IV_MSG_26_30,
    )
    .otherwise(() => HIGHEST_IV_MSG_31);

  return {
    sumIvsMsg,
    highestStatIds,
    highestIvMsg,
  };
};
