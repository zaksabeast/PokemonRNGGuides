import { atom } from "jotai";

export type WorkbenchRoute =
  | "profile"
  | "iv-calc"
  | "advance-finder4"
  | "static4"
  | "emerald-egg";

export const routeAtom = atom<WorkbenchRoute>("emerald-egg");
