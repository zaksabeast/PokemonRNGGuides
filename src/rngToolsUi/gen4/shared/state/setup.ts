import { atom } from "jotai";
import type { HgssRoamers } from "~/rngTools";
import {
  Gen4GameVersions,
  isHgSs,
  type DpPt,
  type Gen4GameVersion,
  type HgSs,
} from "~/types/games";
import type { Gen4Console } from "../../gen4types";

export type Gen4AdvanceMethod = "pokegearCall" | "chatot";

type HgssSetup = {
  roamers: HgssRoamers;
  advanceMethod: Gen4AdvanceMethod;
};

export type Gen4Setup =
  | { group: "dppt"; game: DpPt; console: Gen4Console }
  | ({ group: "hgss"; game: HgSs; console: Gen4Console } & HgssSetup);

export const noHgssRoamers: HgssRoamers = {
  raikou: undefined,
  entei: undefined,
  lati: undefined,
};

const defaultHgssSetup: HgssSetup = {
  roamers: noHgssRoamers,
  advanceMethod: "pokegearCall",
};

const createGen4Setup = (
  game: Gen4GameVersion,
  gameConsole: Gen4Console,
  hgssSetup: HgssSetup = defaultHgssSetup,
): Gen4Setup =>
  isHgSs(game)
    ? { group: "hgss", game, console: gameConsole, ...hgssSetup }
    : { group: "dppt", game, console: gameConsole };

const getHgssSetup = (setup: Gen4Setup): HgssSetup => {
  return setup.group === "hgss"
    ? { roamers: setup.roamers, advanceMethod: setup.advanceMethod }
    : defaultHgssSetup;
};

export const getGen4Roamers = (setup: Gen4Setup): HgssRoamers => {
  return getHgssSetup(setup).roamers;
};

// DPPt can only advance with Chatot
export const getGen4AdvanceMethod = (setup: Gen4Setup): Gen4AdvanceMethod => {
  return setup.group === "hgss" ? setup.advanceMethod : "chatot";
};

const setupAtom = atom(createGen4Setup(Gen4GameVersions[0], "NdsDsi"));

// Games the current guide supports
const guideGamesAtom = atom<readonly Gen4GameVersion[]>(Gen4GameVersions);

export const gen4SetupAtom = atom((get) => get(setupAtom));

export const gen4GuideGamesAtom = atom((get) => get(guideGamesAtom));

export const setGen4GameAtom = atom(null, (get, set, game: Gen4GameVersion) => {
  const prev = get(setupAtom);
  set(setupAtom, createGen4Setup(game, prev.console, getHgssSetup(prev)));
});

export const setGen4RoamersAtom = atom(
  null,
  (_get, set, roamers: Partial<HgssRoamers>) => {
    set(setupAtom, (prev) =>
      prev.group === "hgss"
        ? { ...prev, roamers: { ...prev.roamers, ...roamers } }
        : prev,
    );
  },
);

export const setHgssAdvanceMethodAtom = atom(
  null,
  (_get, set, advanceMethod: Gen4AdvanceMethod) => {
    set(setupAtom, (prev) =>
      prev.group === "hgss" ? { ...prev, advanceMethod } : prev,
    );
  },
);

export const setGen4ConsoleAtom = atom(
  null,
  (_get, set, gameConsole: Gen4Console) => {
    set(setupAtom, (prev) => ({ ...prev, console: gameConsole }));
  },
);

export const resetGen4SetupAtom = atom(
  null,
  (_get, set, games: readonly Gen4GameVersion[]) => {
    set(guideGamesAtom, games);
    set(setupAtom, createGen4Setup(games[0], "NdsDsi"));
  },
);
