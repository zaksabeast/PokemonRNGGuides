import { atom } from "jotai";
import { Gen7Egg, Gen7EggPath, Gen7EggSearchOpts, rngTools } from "~/rngTools";
import { RustOption } from "~/types/utils";

export type Gen7EggTarget = {
  opts: RustOption<Gen7EggSearchOpts>;
  egg: Gen7Egg;
};

export type Gen7EggTargetPath = {
  target: Gen7EggTarget;
  path: Gen7EggPath;
};

export const gen7EggTargetAtom = atom<Gen7EggTarget | null>(null);
export const gen7EggPathAtom = atom<Gen7EggTargetPath | null>(null);
export const gen7EggSeedsAfterTargetAtom = atom<
  Gen7EggSearchOpts["egg_seeds"] | null
>(null);

export const fetchGen7EggPathAtom = atom(
  null,
  async (get, set, target: Gen7EggTarget) => {
    const path = await rngTools.gen7_egg_path(target.opts, target.egg.advance);

    if (get(gen7EggTargetAtom) === target) {
      set(gen7EggPathAtom, { target, path });
    }
  },
);
