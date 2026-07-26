import { atom } from "jotai";

export type WorkbenchRoute =
  | "profile"
  | "iv-calc"
  | "advance-finder4"
  | "static4";

export const routeAtom = atom<WorkbenchRoute>("static4");
