import React from "react";
import {
  type CancellablePromise,
  isCancellationError,
} from "~/utils/cancellablePromise";

export const useCancellablePromise = () => {
  const [pending, setPending] =
    React.useState<CancellablePromise<unknown> | null>(null);

  const waitFor = async <T>(promise: CancellablePromise<T>) => {
    setPending(promise);
    try {
      return await promise;
    } catch (error) {
      if (isCancellationError(error)) {
        return null;
      }
      throw error;
    } finally {
      setPending((current) => (current === promise ? null : current));
    }
  };

  const cancel = () => {
    pending?.terminate?.();
  };

  return { loading: pending != null, waitFor, cancel };
};
