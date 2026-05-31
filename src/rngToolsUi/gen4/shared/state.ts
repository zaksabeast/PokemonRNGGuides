import React from "react";
import { merge } from "lodash-es";
import type { Gen4Timer, Gen4TimerSettings, SeedTime4 } from "~/rngTools";
import { atom, useAtom } from "jotai";
import {
  initialGen4Timer,
  createGen4TimerAtom,
  Gen4TimerUpdates,
} from "~/rngToolsUi/timer/atoms";
import { Gen4Console, Gen4GameVersion } from "../gen4types";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { sanitizeFlips } from "./coinFlipUtils";

type Gen4Target = {
  seedTime: SeedTime4 | null;
  mtAdvance: number | null;
  lcrngAdvance: number | null;
};

const initialGen4Target: Gen4Target = {
  seedTime: null,
  mtAdvance: null,
  lcrngAdvance: null,
};

const gen4TargetAtom = atom<Gen4Target>(initialGen4Target);

type Gen4ToolConfig = {
  console: Gen4Console;
  game: Gen4GameVersion;
};

const initialGen4ToolConfig: Gen4ToolConfig = {
  console: "NdsDsi",
  game: "Diamond",
};

const gen4ConfigAtom = atom<Gen4ToolConfig>(initialGen4ToolConfig);

const initialCoinFlipString = "";
const gen4CoinFlipStringAtom = atom<string>(initialCoinFlipString);

export const gen4TimerAtom = createGen4TimerAtom();

export type Gen4State = {
  config: Gen4ToolConfig;
  timer: Gen4Timer;
  target: Gen4Target;
  coinFlipFilter: string;
};

type Gen4StateUpdate = {
  config: Partial<Gen4ToolConfig>;
  timer: Pick<
    Partial<Gen4TimerSettings>,
    "calibratedDelay" | "calibratedSecond"
  > & {
    hitDelay?: number;
  };
  target: Partial<Gen4Target>;
  coinFlipFilter: string;
};

export const gen4StateAtom = atom(
  (get): Gen4State => {
    return {
      timer: get(gen4TimerAtom),
      config: get(gen4ConfigAtom),
      target: get(gen4TargetAtom),
      coinFlipFilter: get(gen4CoinFlipStringAtom),
    };
  },
  (
    get,
    set,
    { timer, target, config, coinFlipFilter }: Partial<Gen4StateUpdate>,
  ) => {
    const currentTarget = get(gen4TargetAtom);
    const nextTarget =
      target == null ? currentTarget : merge({}, currentTarget, target);

    if (target != null) {
      set(gen4TargetAtom, nextTarget);
    }

    const currentConfig = get(gen4ConfigAtom);
    const nextConfig =
      config == null ? currentConfig : merge({}, currentConfig, config);

    if (config != null) {
      set(gen4ConfigAtom, nextConfig);
    }

    const coinFlipFilterUpdate = target != null ? "" : coinFlipFilter;

    if (coinFlipFilterUpdate != null) {
      set(gen4CoinFlipStringAtom, sanitizeFlips(coinFlipFilterUpdate));
    }

    const seedTime = nextTarget.seedTime;
    const timerUpdates: Partial<Gen4TimerUpdates> = {
      ...timer,
      delayHit: timer?.hitDelay,
      targetDelay: seedTime?.delay ?? 0,
      targetSecond: seedTime?.datetime.second ?? 0,
      minTimeMs: nextConfig.console === "3dsNormalSettings" ? 55_000 : 14_000,
      console:
        nextConfig.console === "3dsNormalSettings" ? "ThreeDs" : "NdsSlot1",
    };
    set(gen4TimerAtom, timerUpdates);
  },
);

export const useResetGen4State = () => {
  const route = useActiveRoute();
  const [, setGen4State] = useAtom(gen4StateAtom);
  React.useEffect(() => {
    setGen4State({
      config: initialGen4ToolConfig,
      timer: initialGen4Timer.settings,
      target: initialGen4Target,
      coinFlipFilter: initialCoinFlipString,
    });
  }, [route, setGen4State]);
};
