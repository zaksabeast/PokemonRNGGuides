// Re-export all types so input and output types can be passively used
// eslint-disable-next-line no-restricted-imports -- ~/rngTools is the only place where using the rng_tools lib is okay
export type * from "rng_tools";
// eslint-disable-next-line no-restricted-imports -- ~/rngTools is the only place where using the rng_tools lib is okay
import type * as RngTools from "rng_tools";

import RngToolsWorker from "./worker?worker";
import { wrap } from "comlink";

import { z } from "zod";

export const rngTools = wrap<typeof RngTools>(new RngToolsWorker());

export const ZodConsole = z.union([
  z.literal("NdsSlot1"),
  z.literal("Dsi"),
  z.literal("ThreeDs"),
  z.literal("Gba"),
  z.literal("NdsSlot2"),
]);
