import { atom } from "jotai";

export type WorkbenchRoute = "profile" | "static4";

export const routeAtom = atom<WorkbenchRoute>("static4");
