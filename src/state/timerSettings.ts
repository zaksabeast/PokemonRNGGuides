import React from "react";
import { useAtom, WritableAtom } from "jotai";

export const useTimerSettings = <Value, Args extends unknown[], Result>(
  atom: WritableAtom<Value, Args, Result>,
) => {
  const [timerSettings, setTimerSettings] = useAtom(atom);
  const initialSettings = React.useRef(timerSettings);

  return {
    initialSettings: initialSettings.current,
    onUpdate: setTimerSettings,
  };
};
