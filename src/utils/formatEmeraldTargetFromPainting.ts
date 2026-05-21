import { formatHex } from "./formatHex";
import { formatLargeInteger } from "./formatLargeInteger";
import { lcrng_distance, pokerng_with_jump } from "./lcrng";

export const formatEmeraldTargetFromPainting = (
  frame_before_painting: number,
  adv_after_painting: number,
) => {
  const adv =
    (lcrng_distance(0, frame_before_painting) + adv_after_painting) % 2 ** 32;
  const seed = pokerng_with_jump(0, adv);
  return `Advance: ${formatLargeInteger(adv)}. (Seed: ${formatHex(seed, 4)})`;
};
