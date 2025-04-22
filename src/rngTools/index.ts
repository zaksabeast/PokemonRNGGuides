// Re-export all types so input and output types can be passively used
// eslint-disable-next-line no-restricted-imports -- ~/rngTools is the only place where using the rng_tools lib is okay
export type * from "rng_tools";
// eslint-disable-next-line no-restricted-imports -- ~/rngTools is the only place where using the rng_tools lib is okay
import type * as RngTools from "rng_tools";

import RngToolsWorker from "./worker?worker";
import { wrap } from "comlink";

import { z } from "zod";
import * as tst from "ts-toolbelt";

type RngToolsModules = typeof RngTools;

type AddNullToType<T> = undefined extends T
  ? tst.U.Exclude<T, undefined> | null
  : T;

type AddNull<T> = T extends tst.O.Object
  ? {
      [K in keyof T]: AddNull<T[K]>;
    }
  : AddNullToType<T>;

type AddNullToList<T extends tst.L.List> = {
  [K in keyof T]: AddNull<T[K]>;
};

type AdjustFunctionArgs<Fn extends tst.F.Function> = Fn extends (
  ...args: infer Args
) => infer Ret
  ? (...args: AddNullToList<Args>) => Ret
  : never;

type AdjustAllFunctionArgs<T> = {
  [K in keyof T]: T[K] extends tst.F.Function ? AdjustFunctionArgs<T[K]> : T[K];
};

type AdjustedRngTools = AdjustAllFunctionArgs<RngToolsModules>;

export const rngTools = wrap<AdjustedRngTools>(new RngToolsWorker());

export const ZodConsole = z.union([
  z.literal("NdsSlot1"),
  z.literal("Dsi"),
  z.literal("ThreeDs"),
  z.literal("Gba"),
  z.literal("NdsSlot2"),
]);
