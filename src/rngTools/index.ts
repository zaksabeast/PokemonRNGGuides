// Re-export all types so input and output types can be passively used
// eslint-disable-next-line no-restricted-imports -- ~/rngTools is the only place where using the rng_tools lib is okay
export type * from "rng_tools";
// eslint-disable-next-line no-restricted-imports -- ~/rngTools is the only place where using the rng_tools lib is okay
import type * as RngTools from "rng_tools";

import { Remote, wrap } from "comlink";

import { z } from "zod";
import * as tst from "ts-toolbelt";
import { UndefinedToNullForList } from "~/types/utils";
import {
  BatchableFunctionNamesOf,
  BatchableFunctionsOf,
} from "~/hooks/useBatchedTool";

type RngToolsModules = typeof RngTools;

type AdjustFunctionArgs<Fn extends tst.F.Function> = Fn extends (
  ...args: infer Args
) => infer Ret
  ? (...args: UndefinedToNullForList<Args>) => Ret
  : never;

type AdjustAllFunctionArgs<T> = {
  [K in keyof T]: T[K] extends tst.F.Function ? AdjustFunctionArgs<T[K]> : T[K];
};

type AdjustedRngTools = AdjustAllFunctionArgs<RngToolsModules>;

type RngToolWorker = {
  tools: Remote<AdjustedRngTools>;
  terminate: () => void;
};

/**
 * Spawns a new worker for rng_tools and waits for it to be ready.
 */
const spawnRngToolWorker = async (): Promise<RngToolWorker> => {
  const worker = new Worker(new URL("./worker", import.meta.url), {
    type: "module",
  });

  await new Promise((resolve) => {
    const controller = new AbortController();
    worker.addEventListener(
      "message",
      (message) => {
        if (message?.data?.ready == true) {
          controller.abort();
          resolve(void 0);
        }
      },
      { signal: controller.signal },
    );
  });

  return {
    tools: wrap<AdjustedRngTools>(worker),
    terminate: () => worker.terminate(),
  };
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- This isn't great, but it's a workaround for server side rendering.  RngTools will be initialized immediately in the browser.
export let rngTools: Remote<AdjustedRngTools> = null!;

export const initRngTools = async () => {
  const worker = await spawnRngToolWorker();
  rngTools = worker.tools;
};

export const ZodConsole = z.enum([
  "NdsSlot1",
  "Dsi",
  "ThreeDs",
  "Gba",
  "NdsSlot2",
]) satisfies z.Schema<RngTools.Console>;

/**
 * Calls a function from rng_tools in a temporary worker.
 *
 * @example
 * const res = await callRngToolInTempWorker("search_dppt_ids", opts);
 */
const callRngToolInTempWorker = async <
  FuncName extends BatchableFunctionNamesOf<AdjustedRngTools>,
>(
  functionName: FuncName,
  ...args: tst.F.Parameters<AdjustedRngTools[FuncName]>
): Promise<tst.F.Return<AdjustedRngTools[FuncName]>> => {
  const rngToolWorker = await spawnRngToolWorker();
  const tool = rngToolWorker.tools[functionName];
  // @ts-expect-error -- Function signature makes sure this is correct
  const result = await tool(...args);
  rngToolWorker.terminate();
  // @ts-expect-error -- Function signature makes sure this is correct
  return result;
};

/**
 * Same as rngTools, but each function is called in a new temporary worker.
 * Warning!  Browsers have worker limits.
 *
 * @example
 * const res = await multiWorkerRngTools.search_dppt_ids(opts);
 */
export const multiWorkerRngTools = new Proxy(
  {},
  {
    get: (_, functionName: BatchableFunctionNamesOf<AdjustedRngTools>) => {
      return (
        ...args: tst.F.Parameters<AdjustedRngTools[typeof functionName]>
      ) => {
        return callRngToolInTempWorker(
          functionName as BatchableFunctionNamesOf<AdjustedRngTools>,
          ...args,
        );
      };
    },
  },
) as Remote<BatchableFunctionsOf<AdjustedRngTools>>;
