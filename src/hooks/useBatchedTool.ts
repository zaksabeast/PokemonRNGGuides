import React from "react";
import { Subscription, finalize, from, mergeMap } from "rxjs";
import { identity, sortBy } from "lodash-es";
import * as tst from "ts-toolbelt";

/**
 * Gets a list of all batchable function name in an object.
 */
export type BatchableFunctionNamesOf<T> = {
  [K in keyof T]: T[K] extends tst.F.Function
    ? tst.F.Return<T[K]> extends tst.L.List
      ? tst.L.Length<tst.F.Parameters<T[K]>> extends 1
        ? K
        : never
      : never
    : never;
}[keyof T];

/**
 * Filters an object to only include batchable functions.
 */
export type BatchableFunctionsOf<T> = {
  [K in BatchableFunctionNamesOf<T>]: T[K];
};

type UseBatchedToolOptions<Ret, MappedRet> = {
  map?: (value: Ret) => MappedRet;
  sortBy?: (value: MappedRet) => number;
};

type UseBatchToolResults<Arg, Ret> = {
  /** Runs the function with the provided arguments. */
  run: (args: Arg[]) => Promise<Ret[]>;
  /** Cancel the current operation */
  cancel: () => void;
  /** The streamed data returned from the function, updated as new results are available. */
  data: Ret[];
  /** Whether the function is currently running. */
  loading: boolean;
  /** Any error that occurred while running the function. */
  error: unknown;
  /** The progress percentage of the operation, from 0 to 100. */
  progressPercent: number;
};

export const useBatchedTool = <Arg, Ret, MappedRet = Ret>(
  func: (arg: Arg) => Promise<Ret[]>,
  {
    map = identity,
    sortBy: sortWith,
  }: UseBatchedToolOptions<Ret, MappedRet> = {},
): UseBatchToolResults<Arg, MappedRet> => {
  const [progress, setProgress] = React.useState<{
    data: MappedRet[];
    finishedChunks: number;
    totalChunks: number;
  }>({ data: [], finishedChunks: 0, totalChunks: 0 });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<unknown>(null);
  const subRef = React.useRef<Subscription | null>(null);

  const run = React.useCallback(
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

        const concurrency = 8;

        const sub = from(args)
          // Process each argument in parallel with a concurrency limit
          .pipe(mergeMap(func, concurrency))
          .pipe(
            // Called when the observable completes
            finalize(() => {
              setLoading(false);
              resolve(results);
            }),
          )
          .subscribe({
            // Called when each chunk is received
            next: (val) => {
              const mappedValues = val.map(map);
              const unsorted = [...results, ...mappedValues];
              results =
                sortWith == null ? unsorted : sortBy(unsorted, sortWith);
              setProgress((prev) => ({
                data: results,
                finishedChunks: prev.finishedChunks + 1,
                totalChunks: prev.totalChunks,
              }));
            },
            // Called on error
            error: (err) => {
              setError(err);
              setLoading(false);
            },
          });

        subRef.current = sub;
      });
    },
    [func, map, sortWith],
  );

  const cancel = React.useCallback(() => {
    subRef.current?.unsubscribe();
    setLoading(false);
  }, []);

  return {
    run,
    cancel,
    data: progress.data,
    loading,
    error,
    progressPercent: Math.floor(
      (progress.finishedChunks / progress.totalChunks) * 100,
    ),
  };
};
