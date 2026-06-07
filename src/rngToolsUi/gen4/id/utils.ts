import { SeedTime4 } from "~/rngTools";
import { fromRngDateTime } from "~/utils/time";
import { Gen4GameVersion } from "../gen4types";

export const getSecondOffset = (game: Gen4GameVersion) => {
  const isHgss = game === "HeartGold" || game === "SoulSilver";
  return isHgss ? 3 : 0;
};

/**
 * Returns the game date and time adjusted for HGSS if applicable.
 */
export const getGameDateTime = ({
  seedTime,
  game,
}: {
  seedTime: SeedTime4 | null;
  game: Gen4GameVersion;
}) => {
  const targetDatetime = seedTime?.datetime;
  const datetime =
    targetDatetime == null ? null : fromRngDateTime(targetDatetime);

  if (datetime == null) {
    return null;
  }

  const hgssOffset = getSecondOffset(game);
  return datetime.subtract(hgssOffset, "seconds");
};
