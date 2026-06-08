import { rngTools, Wild3PaintingAdvsAndDur } from "~/rngTools";

export type PaintingOpts =
  | {
      min_frame_before_painting: number;
      min_adv_after_painting: number;
    }
  | null
  | undefined;

export type FastestAdvsCache = Awaited<
  ReturnType<typeof createFastestAdvsCache>
>;

export const createFastestAdvsCache = async (
  opts: PaintingOpts,
  advs: number[],
  initial_seed: number,
) => {
  const fallbackFunc = (adv: number): Wild3PaintingAdvsAndDur => ({
    advs: {
      frame_before_painting: initial_seed,
      adv_after_painting: adv,
    },
    wait_dur: adv,
  });

  if (opts == null || advs.length === 0) {
    return fallbackFunc;
  }

  const advsWithoutDupe = new Uint32Array(new Set(advs));
  const fastestAdvs = await rngTools.find_fastest_advs_considering_painting(
    opts,
    advsWithoutDupe,
  );

  const fastestAdvsByAdvance = new Map<number, Wild3PaintingAdvsAndDur>();
  fastestAdvs.forEach((fastestAdv, i) => {
    fastestAdvsByAdvance.set(advsWithoutDupe[i], fastestAdv);
  });

  return (adv: number): Wild3PaintingAdvsAndDur =>
    fastestAdvsByAdvance.get(adv) ?? fallbackFunc(adv);
};
