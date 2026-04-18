import React from "react";
import { Subscription, finalize, from, mergeMap } from "rxjs";
import { identity, sortBy } from "lodash-es";
import * as tst from "ts-toolbelt";
import {
  attachTerminateToPromise,
  type CancellablePromise,
  isCancellationError,
} from "~/utils/cancellablePromise";

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

type UseBatchedToolOptions<Arg, Ret, MappedRet> = {
  map?: (value: Ret, arg: Arg) => MappedRet;
  sortBy?: ((value: MappedRet) => number) | ((value: MappedRet) => number)[];
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
  func: (arg: Arg) => CancellablePromise<Ret[]>,
  {
    map = identity,
    sortBy: sortWith,
  }: UseBatchedToolOptions<Arg, Ret, MappedRet> = {},
): UseBatchToolResults<Arg, MappedRet> => {
  const [progress, setProgress] = React.useState<{
    data: MappedRet[];
    finishedChunks: number;
    totalChunks: number;
  }>({ data: [], finishedChunks: 0, totalChunks: 0 });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<unknown>(null);
  const subRef = React.useRef<Subscription | null>(null);
  // Set of promises that may have a terminate method (for cancellation)
  const activePromisesRef = React.useRef<
    Set<Promise<unknown> & { terminate?: () => void }>
  >(new Set());

  const cancelActiveRun = () => {
    const activePromises = activePromisesRef.current;
    activePromisesRef.current = new Set();

    const sub = subRef.current;
    subRef.current = null;

    activePromises.forEach((promise) => {
      promise.terminate?.();
    });

    sub?.unsubscribe();
  };

  const run = (args: Arg[]) => {
    return new Promise<MappedRet[]>((resolve) => {
      // Cancel any previous run before starting a new one
      cancelActiveRun();

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
        .pipe(
          mergeMap((arg) => {
            const originalPromise = func(arg);

            // Wrap with error handling while preserving the terminate method
            const wrappedPromise = originalPromise
              .then((results) => ({ arg, results }))
              .catch((err) => {
                if (!isCancellationError(err)) {
                  setError(err);
                }
                return { arg, results: [] };
              });

            // Transfer the terminate method to the wrapped promise
            const terminatablePromise = attachTerminateToPromise({
              promise: wrappedPromise,
              terminate: originalPromise.terminate,
            });

            // Track the promise so we can terminate it if needed
            activePromisesRef.current.add(terminatablePromise);
            terminatablePromise.finally(() =>
              activePromisesRef.current.delete(terminatablePromise),
            );

            return terminatablePromise;
          }, concurrency),
        )
        .pipe(
          // Called when the observable completes
          finalize(() => {
            setLoading(false);
            resolve(results);
          }),
        )
        .subscribe({
          // Called when each chunk is received
          next: ({ arg, results: values }) => {
            const mappedValues = values.map((val) => map(val, arg));
            const unsorted = [...results, ...mappedValues];
            results = sortWith == null ? unsorted : sortBy(unsorted, sortWith);
            setProgress((prev) => ({
              data: results,
              finishedChunks: prev.finishedChunks + 1,
              totalChunks: prev.totalChunks,
            }));
          },
        });

      subRef.current = sub;
    });
  };

  const cancel = () => {
    // Cancel the active run and stop loading
    cancelActiveRun();
    setLoading(false);
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      // Cancel any active run on unmount
      cancelActiveRun();
    };
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
