/**
 * A promise that can be terminated, killing its associated worker.
 */
export type CancellablePromise<T> = Promise<T> & { terminate?: () => void };

export class CancellationError extends Error {
  constructor(message = "Operation was cancelled") {
    super(message);
    this.name = "CancellationError";
  }
}

export const isCancellationError = (error: unknown): boolean => {
  return (
    error instanceof CancellationError ||
    (error instanceof DOMException && error.name === "AbortError")
  );
};

export const attachTerminateToPromise = <T>({
  promise,
  terminate,
}: {
  promise: Promise<T>;
  terminate?: () => void;
}): CancellablePromise<T> => {
  const cancellablePromise = promise as CancellablePromise<T>;
  cancellablePromise.terminate = terminate;
  return cancellablePromise;
};
