// Re-export all types so input and output types can be passively used
// eslint-disable-next-line no-restricted-imports -- ~/rngTools is the only place where using the rng_tools lib is okay
export type * from "rng_tools";
// eslint-disable-next-line no-restricted-imports -- ~/rngTools is the only place where using the rng_tools lib is okay
import type * as RngTools from "rng_tools";

import { Remote, wrap } from "comlink";

import { z } from "zod";
import * as tst from "ts-toolbelt";
import { UndefinedToNullForList } from "~/types/utils";
import pMap from "p-map";
import React from "react";
import { Observable, Subscription, finalize, from, mergeMap } from "rxjs";
import { identity } from "lodash-es";

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

export const spawnRngToolWorker = async (): Promise<RngToolWorker> => {
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

export const initRngTools = () => {
  spawnRngToolWorker().then((worker) => {
    rngTools = worker.tools;
  });
};

export const ZodConsole = z.enum([
  "NdsSlot1",
  "Dsi",
  "ThreeDs",
  "Gba",
  "NdsSlot2",
]) satisfies z.Schema<RngTools.Console>;

type FunctionsNamesOf<T> = {
  [K in keyof T]: T[K] extends tst.F.Function
    ? tst.F.Return<T[K]> extends tst.L.List
      ? tst.L.Length<tst.F.Parameters<T[K]>> extends 1
        ? K
        : never
      : never
    : never;
}[keyof T];

type FunctionsOf<T> = {
  [K in FunctionsNamesOf<T>]: T[K];
};

/**
 * Calls a function from rng_tools in a temporary worker.
 *
 * @example
 * const res = await callRngToolInTempWorker("search_dppt_ids", opts);
 */
const callRngToolInTempWorker = async <
  FuncName extends FunctionsNamesOf<AdjustedRngTools>,
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
 * Warning!  Browsers have worker limits.  Use with `batchFn` for safety.
 *
 * @example
 * const res = await multiWorkerRngTools.search_dppt_ids(opts);
 */
export const multiWorkerRngTools = new Proxy(
  {},
  {
    get: (_, functionName: FunctionsNamesOf<AdjustedRngTools>) => {
      return (
        ...args: tst.F.Parameters<AdjustedRngTools[typeof functionName]>
      ) => {
        return callRngToolInTempWorker(
          functionName as FunctionsNamesOf<AdjustedRngTools>,
          ...args,
        );
      };
    },
  },
) as Remote<FunctionsOf<AdjustedRngTools>>;

/**
 * Takes a batchable function (accepts one argument and returns a list of results)
 * and returns a function that accepts an array of arguments to run concurrently.
 *
 * Note for web workers: cancelling will prevent new tasks from starting,
 * but will not stop tasks that are already running.
 *
 * Returns an empty array if cancelled.
 *
 * @example
 * const batchableAdd = async ([first, second]: [number, number]) => [first + second];
 * const batchedAdd = batchFn(batchableAdd);
 *
 * const { results } = batchedAdd([[1,2], [3,4]]);
 * console.log(await results); // [3, 7]
 *
 * const { results, cancel } = batchedAdd([[1,2], [3,4]]);
 * cancel();
 * console.log(await results); // []
 */
export const batchFn = <Args, Ret extends tst.L.List>(
  func: (arg: Args) => Promise<Ret>,
) => {
  return (args: Args[]) => {
    const controller = new AbortController();

    const run = async () => {
      try {
        const res = await pMap(args, func, {
          concurrency: 4,
          signal: controller.signal,
        });
        return res.flat();
      } catch {
        // Todo: rethrow if not an abort error
        return [];
      }
    };

    return {
      results: run(),
      cancel: () => controller.abort(),
    };
  };
};

type LazyObservableResult<T> = {
  data: T[];
  loading: boolean;
  error: unknown;
  progressPercent: number;
};

type UseLazyObservableReturn<Arg, Ret> = [
  (args: Arg[]) => Promise<Ret[]>,
  LazyObservableResult<Ret>,
  () => void,
];

export const useLazyObservable = <Arg, Ret, MappedRet = Ret>(
  create$: (args: Arg[]) => Observable<Ret[]>,
  mapFn: (value: Ret) => MappedRet = identity,
): UseLazyObservableReturn<Arg, MappedRet> => {
  const [progress, setProgress] = React.useState<{
    data: MappedRet[];
    finishedChunks: number;
    totalChunks: number;
  }>({ data: [], finishedChunks: 0, totalChunks: 0 });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<unknown>(null);
  const subRef = React.useRef<Subscription | null>(null);

  const start = React.useCallback(
    (args: Arg[]) => {
      return new Promise<MappedRet[]>((resolve) => {
        subRef.current?.unsubscribe(); // Cancel an active observable
        setLoading(true);
        setError(null);
        setProgress({
          data: [],
          finishedChunks: 0,
          totalChunks: args.length,
        });
        let results: MappedRet[] = [];

        const sub = create$(args)
          .pipe(
            finalize(() => {
              setLoading(false);
              resolve(results);
            }),
          )
          .subscribe({
            next: (val) => {
              const mappedValues = val.map(mapFn);
              setProgress((prev) => ({
                data: [...prev.data, ...mappedValues],
                finishedChunks: prev.finishedChunks + 1,
                totalChunks: prev.totalChunks,
              }));
              results = [...results, ...mappedValues];
            },
            error: (err) => {
              setError(err);
              setLoading(false);
            },
          });

        subRef.current = sub;
      });
    },
    [create$, mapFn],
  );

  const cancel = React.useCallback(() => {
    subRef.current?.unsubscribe();
    setLoading(false);
  }, []);

  return [
    start,
    {
      data: progress.data,
      loading,
      error,
      progressPercent: Math.floor(
        (progress.finishedChunks / progress.totalChunks) * 100,
      ),
    },
    cancel,
  ];
};

export const createObservableFactory = <Arg, Ret>(
  func: (arg: Arg) => Promise<Ret[]>,
) => {
  return (args: Arg[]) => {
    return from(args).pipe(mergeMap(func, 4 /* concurrency */));
  };
};

export const useBatchedTool = <Arg, Ret, MappedRet = Ret>(
  tool: (arg: Arg) => Promise<Ret[]>,
  mapFn: (value: Ret) => MappedRet = identity,
) => {
  const create$ = React.useMemo(() => createObservableFactory(tool), [tool]);
  return useLazyObservable(create$, mapFn);
};
