import { atom } from "jotai";

export type WorkbenchRoute = "profile" | "iv-calc" | "static4";

export const routeAtom = atom<WorkbenchRoute>("static4");
