import { atom, useAtom } from "jotai";
import { createGen4TimerAtom } from "~/hooks/useGen4Timer";
import { Id4 } from "~/rngTools";

export const games = [
  "Diamond",
  "Pearl",
  "Platinum",
  "HeartGold",
  "SoulSilver",
] as const;

export type Game = (typeof games)[number];

export type Id4State = {
  is3ds: boolean;
  game: Game;
  target: Id4 | null;
};

const initialHeldState: Id4State = {
  is3ds: false,
  game: "Diamond",
  target: null,
};

const id4Atom = atom(initialHeldState);

export const useId4State = () => useAtom(id4Atom);

export const idTimerAtom = createGen4TimerAtom();
