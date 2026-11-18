import { atom } from "jotai";
import type { Gen4GameVersion } from "~/types/games";
import { resetGen4SetupAtom } from "./setup";
import { clearGen4TargetAtom } from "./target";
import { clearGen4MarkersAtom } from "./markers";
import { resetGen4TimerAtom } from "./timer";

export const resetGen4Atom = atom(
  null,
  (_get, set, games: readonly Gen4GameVersion[]) => {
    set(resetGen4SetupAtom, games);
    set(clearGen4TargetAtom);
    set(clearGen4MarkersAtom);
    set(resetGen4TimerAtom);
  },
);
