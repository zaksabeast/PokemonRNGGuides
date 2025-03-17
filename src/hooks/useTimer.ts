import React from "react";

const countdownInterval = 500;

export const useTimer = ({
  delayMs,
  updateMs,
  onExpire,
  onCountdown,
}: {
  delayMs: number;
  updateMs: number;
  onExpire?: () => void;
  onCountdown?: () => void;
}) => {
  // isRunning and startDate will always be updated together.
  // isRunning is responsible for hook/visual updates.
  // If only isRunning is used, the timeout might not clear before it's fired, even if isRunning is set to false.
  // This is a startDate to ensure timers are immediately aware of changes,
  // and we avoid a race condition as a result.
  const startDate = React.useRef<Date | null>(null);

  const countdownStart =
    countdownInterval *
    Math.min(Math.floor(delayMs / countdownInterval) - 1, 4);
  const countdownRef = React.useRef(countdownStart);

  const [isRunning, setIsRunning] = React.useState(false);
  const [msRemaining, setMsRemaining] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (startDate.current != null) {
        onExpire?.();
      }
    }, delayMs);

    return () => {
      clearTimeout(timer);
    };
  }, [delayMs, onExpire]);

  React.useEffect(() => {
    const updateRemaining = (ms: number): number => {
      if (startDate.current == null) {
        return ms;
      }
      return Math.max(
        delayMs - (new Date().getTime() - startDate.current.getTime()),
        0,
      );
    };

    const timer = setInterval(() => setMsRemaining(updateRemaining), updateMs);
    return () => clearInterval(timer);
  }, [updateMs, isRunning, delayMs]);

  React.useEffect(() => {
    if (msRemaining < countdownRef.current && msRemaining !== 0) {
      const nextCountdownMs = countdownRef.current - countdownInterval;
      countdownRef.current = Math.max(nextCountdownMs, 0);
      onCountdown?.();
    }
  }, [msRemaining, onCountdown]);

  const start = React.useCallback(() => {
    setMsRemaining(delayMs);
    setIsRunning(true);
    startDate.current = new Date();
    countdownRef.current = countdownStart;
  }, [delayMs, countdownStart]);

  const stop = React.useCallback(() => {
    startDate.current = null;
    setIsRunning(false);
    setMsRemaining(delayMs);
    countdownRef.current = countdownStart;
  }, [delayMs, countdownStart]);

  return {
    msRemaining,
    isRunning,
    start,
    stop,
  };
};
