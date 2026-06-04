import { SeedTime4 } from "~/rngTools";
import { fromRngDateTime } from "~/utils/time";
import { Gen4GameVersion } from "../gen4types";

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

  const isHgss = game === "HeartGold" || game === "SoulSilver";
  const hgssOffset = isHgss ? 3 : 0;
  return datetime.subtract(hgssOffset, "seconds");
};
