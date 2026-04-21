import React from "react";
import { isEqual } from "lodash-es";

export type StateHistory<T> = {
  history: T[];
  current: T | undefined;
  previous: T | undefined;
  addIfNew: (state: T) => void;
  undo: () => Promise<void>;
  canUndo: boolean;
};

export const useStateHistory = <T>({
  initialSettings,
  updateTimerSettings,
}: {
  initialSettings: T;
  updateTimerSettings: (state: T) => Promise<unknown>;
}): StateHistory<T> => {
  const [history, setHistory] = React.useState<T[]>([initialSettings]);

  const current = history[history.length - 1];
  const previous = history[history.length - 2];

  const add = (state: T) => {
    setHistory((prev) => [...prev, state]);
  };

  const addIfNew = (state: T) => {
    if (!isEqual(current, state)) {
      add(state);
    }
  };

  const canUndo = history.length > 1;

  const undo = async () => {
    if (!canUndo) {
      return;
    }

    setHistory((prev) => {
      if (prev.length <= 1) {
        return prev;
      }
      return prev.slice(0, -1);
    });
    await updateTimerSettings(previous);
  };

  return {
    history,
    current,
    previous,
    addIfNew,
    undo,
    canUndo,
  };
};
