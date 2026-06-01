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
import { sanitizeFlips } from "./dpptCoinFlip/utils";
import { sanitizeElmCalls } from "./hgssElmCalls/utils";

type Gen4Target = {
  seedTime: SeedTime4 | null;
  mtAdvance: number | null;
  lcrngAdvance: number | null;
  coinFlipCount: number;
};

const initialGen4Target: Gen4Target = {
  seedTime: null,
  mtAdvance: null,
  lcrngAdvance: null,
  coinFlipCount: 0,
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

type Gen4GameState = {
  coinFlips: string;
  elmCalls: string;
};

const initialGen4GameState: Gen4GameState = {
  coinFlips: "",
  elmCalls: "",
};

const gen4GameStateAtom = atom<Gen4GameState>(initialGen4GameState);

export const gen4TimerAtom = createGen4TimerAtom();

export type Gen4State = {
  config: Gen4ToolConfig;
  timer: Gen4Timer;
  target: Gen4Target;
  gameState: Gen4GameState;
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
  gameState: Partial<Gen4GameState>;
};

export const gen4StateAtom = atom(
  (get): Gen4State => {
    return {
      timer: get(gen4TimerAtom),
      config: get(gen4ConfigAtom),
      target: get(gen4TargetAtom),
      gameState: get(gen4GameStateAtom),
    };
  },
  (
    get,
    set,
    { timer, target, config, gameState }: Partial<Gen4StateUpdate>,
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

    const coinFlipUpdate = target != null ? "" : gameState?.coinFlips;
    const elmCallFilterUpdate = target != null ? "" : gameState?.elmCalls;

    if (coinFlipUpdate != null || elmCallFilterUpdate != null) {
      set(gen4GameStateAtom, (prev) => {
        return {
          ...prev,
          coinFlips: sanitizeFlips(coinFlipUpdate ?? prev.coinFlips),
          elmCalls: sanitizeElmCalls(elmCallFilterUpdate ?? prev.elmCalls),
        };
      });
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
      gameState: initialGen4GameState,
    });
  }, [route, setGen4State]);
};
