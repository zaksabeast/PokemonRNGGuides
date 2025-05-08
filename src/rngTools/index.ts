// Re-export all types so input and output types can be passively used
// eslint-disable-next-line no-restricted-imports -- ~/rngTools is the only place where using the rng_tools lib is okay
export type * from "rng_tools";
// eslint-disable-next-line no-restricted-imports -- ~/rngTools is the only place where using the rng_tools lib is okay
import type * as RngTools from "rng_tools";

import { Remote, wrap } from "comlink";

import { z } from "zod";
import * as tst from "ts-toolbelt";
import { AddNullToList } from "~/types/utils";

type RngToolsModules = typeof RngTools;

type AdjustFunctionArgs<Fn extends tst.F.Function> = Fn extends (
  ...args: infer Args
) => infer Ret
  ? (...args: AddNullToList<Args>) => Ret
  : never;

type AdjustAllFunctionArgs<T> = {
  [K in keyof T]: T[K] extends tst.F.Function ? AdjustFunctionArgs<T[K]> : T[K];
};

type AdjustedRngTools = AdjustAllFunctionArgs<RngToolsModules>;

export let rngTools: Remote<AdjustedRngTools> = null!;

export const initRngTools = () => {
  rngTools = wrap<AdjustedRngTools>(
    new Worker(new URL("./worker", import.meta.url), {
      type: "module",
    }),
  );
};

export const ZodConsole = z.enum([
  "NdsSlot1",
  "Dsi",
  "ThreeDs",
  "Gba",
  "NdsSlot2",
]) satisfies z.Schema<RngTools.Console>;
