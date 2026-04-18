// Re-export all types so input and output types can be passively used
// eslint-disable-next-line no-restricted-imports -- ~/rngTools is the only place where using the rng_tools lib is okay
export type * from "rng_tools";
// eslint-disable-next-line no-restricted-imports -- ~/rngTools is the only place where using the rng_tools lib is okay
import type * as RngTools from "rng_tools";

import { Remote, wrap } from "comlink";

import { z } from "zod";
import * as tst from "ts-toolbelt";
import { UndefinedToNull, UndefinedToNullForList } from "~/types/utils";
import {
  attachTerminateToPromise,
  CancellationError,
  type CancellablePromise,
} from "~/utils/cancellablePromise";
import {
  BatchableFunctionNamesOf,
  BatchableFunctionsOf,
} from "~/hooks/useBatchedTool";
import { memoize } from "lodash-es";

type RngToolsModules = typeof RngTools;

type FunctionNamesOf<T> = {
  [K in keyof T]: T[K] extends tst.F.Function ? K : never;
}[keyof T];

type FunctionsOf<T> = {
  [K in FunctionNamesOf<T>]: T[K];
};

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

const getMaxWorkerCount = () => {
  const isFirefox = /firefox/i.test(navigator.userAgent);
  if (isFirefox) {
    return 2; // Firefox seems to over report hardwareConcurrency and has a stricter worker limit
  }

  return Math.max(1, Math.min(window.navigator.hardwareConcurrency, 8));
};

let workerCount = 0;

const throwIfCancelled = (signal?: AbortSignal): void => {
  if (signal?.aborted) {
    throw new CancellationError("Worker request was cancelled");
  }
};

const waitUntilAvailable = async (signal?: AbortSignal): Promise<void> => {
  const maxWorkers = getMaxWorkerCount();
  while (workerCount >= maxWorkers) {
    throwIfCancelled(signal);
    await new Promise<void>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        signal?.removeEventListener("abort", handleAbort);
        resolve();
      }, 100);

      const handleAbort = () => {
        clearTimeout(timeoutId);
        signal?.removeEventListener("abort", handleAbort);
        reject(new CancellationError("Worker request was cancelled"));
      };

      signal?.addEventListener("abort", handleAbort, { once: true });
    });
  }
};

/**
 * Spawns a new worker for rng_tools and waits for it to be ready.
 */
const spawnRngToolWorker = async (
  signal?: AbortSignal,
): Promise<RngToolWorker> => {
  await waitUntilAvailable(signal);
  throwIfCancelled(signal);

  workerCount += 1;
  const worker = new Worker(new URL("./worker", import.meta.url), {
    type: "module",
  });

  try {
    await new Promise<void>((resolve, reject) => {
      const controller = new AbortController();
      let isSettled = false;

      const settle = (callback: () => void) => {
        if (isSettled) {
          return;
        }

        isSettled = true;
        controller.abort();
        signal?.removeEventListener("abort", handleAbort);
        callback();
      };

      // Handle worker startup errors
      const handleWorkerError = () => {
        settle(() => {
          reject(new Error("Worker initialization failed"));
        });
      };

      const handleAbort = () => {
        settle(() => {
          reject(new CancellationError("Worker request was cancelled"));
        });
      };

      signal?.addEventListener("abort", handleAbort, { once: true });

      worker.addEventListener(
        "message",
        (message) => {
          if (message?.data?.ready === true) {
            settle(() => {
              resolve();
            });
          }
        },
        { signal: controller.signal },
      );

      worker.addEventListener("error", handleWorkerError, {
        signal: controller.signal,
      });
    });
  } catch (error) {
    worker.terminate();
    workerCount -= 1;
    throw error;
  }

  let isTerminated = false;

  return {
    tools: wrap<AdjustedRngTools>(worker),
    terminate: () => {
      if (!isTerminated) {
        isTerminated = true;
        worker.terminate();
        workerCount -= 1;
      }
    },
  };
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
 * Returns a promise with a terminate() method that kills the worker.
 *
 * @example
 * const promise = callRngToolInTempWorker("search_dppt_ids", opts);
 * // Later, if needed: promise.terminate?.();
 */
const callRngToolInTempWorker = <
  FuncName extends BatchableFunctionNamesOf<AdjustedRngTools>,
>(
  functionName: FuncName,
  ...args: unknown[]
): CancellablePromise<tst.F.Return<AdjustedRngTools[FuncName]>> => {
  const controller = new AbortController();
  let rngToolWorker: RngToolWorker | null = null;

  const promise = (async () => {
    rngToolWorker = await spawnRngToolWorker(controller.signal);
    throwIfCancelled(controller.signal);

    try {
      const tool = rngToolWorker.tools[functionName];
      // @ts-expect-error -- Distributed union type from comlink makes this complex to type correctly
      const result = await tool(...(args as Parameters<typeof tool>));
      return result as tst.F.Return<AdjustedRngTools[FuncName]>;
    } catch (error) {
      if (controller.signal.aborted) {
        throw new CancellationError("Worker request was cancelled");
      }

      throw error;
    } finally {
      rngToolWorker?.terminate();
    }
  })();

  return attachTerminateToPromise({
    promise,
    terminate: () => {
      controller.abort();
      rngToolWorker?.terminate();
    },
  });
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
        return callRngToolInTempWorker(functionName, ...args);
      };
    },
  },
) as Remote<BatchableFunctionsOf<AdjustedRngTools>>;

const getRngTools = memoize(async () => {
  const { tools } = await spawnRngToolWorker();
  return tools;
});

export const rngTools = new Proxy(
  {},
  {
    get: (_, functionName: keyof FunctionsOf<AdjustedRngTools>) => {
      return async (
        ...args: tst.F.Parameters<AdjustedRngTools[typeof functionName]>
      ) => {
        const tools = await getRngTools();
        const func = tools[functionName];
        return func(...args);
      };
    },
  },
) as Remote<AdjustedRngTools>;

export type PkmFilter = UndefinedToNull<RngTools.PkmFilter>;

export type Wild3MapSetups = UndefinedToNull<RngTools.Wild3MapSetups>;

export type Wild3MapGameData = UndefinedToNull<RngTools.Wild3MapGameData>;

export type Wild3SearcherOptions =
  UndefinedToNull<RngTools.Wild3SearcherOptions>;

export type Gen3PkmFilter = UndefinedToNull<RngTools.Gen3PkmFilter>;

export type Wild3GeneratorOptions =
  UndefinedToNull<RngTools.Wild3GeneratorOptions>;
