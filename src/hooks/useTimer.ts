import React from "react";

export const useTimer = ({
  expirationMs,
  countdownMs,
  updateMs = 20,
  onExpire,
  onCountdown,
}: {
  expirationMs: number;
  countdownMs?: number;
  updateMs?: number;
  onExpire?: () => void;
  onCountdown?: () => void;
}) => {
  const startDate = React.useRef<number | null>(null);
  const lastTickRef = React.useRef<number>(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [msRemaining, setMsRemaining] = React.useState(0);

  const start = React.useCallback(() => {
    setMsRemaining(expirationMs);
    setIsRunning(true);
    startDate.current = Date.now();
  }, [expirationMs]);

  const stop = React.useCallback(() => {
    startDate.current = null;
    setIsRunning(false);
    setMsRemaining(expirationMs);
  }, [expirationMs]);

  React.useEffect(() => {
    if (isRunning) {
      startDate.current = Date.now();
    } else {
      startDate.current = null;
    }
  }, [expirationMs, isRunning]);

  React.useEffect(() => {
    const timer = isRunning
      ? setInterval(() => {
          if (!isRunning || startDate.current == null) {
            return;
          }

          const now = Date.now();
          // Check if we've passed the throttle interval.
          if (now - lastTickRef.current >= updateMs) {
            lastTickRef.current = now;
            if (startDate.current != null) {
              const remainingMs = Math.max(
                expirationMs - (Date.now() - startDate.current),
                0,
              );
              setMsRemaining(remainingMs);
            }
          }
        }, updateMs)
      : undefined;
    return () => clearInterval(timer);
  }, [isRunning, expirationMs, updateMs]);

  React.useEffect(() => {
    const timer = isRunning
      ? setTimeout(() => {
          if (startDate.current != null) {
            onExpire?.();
            stop();
          }
        }, expirationMs)
      : undefined;

    return () => clearTimeout(timer);
  }, [isRunning, expirationMs, onExpire, stop]);

  React.useEffect(() => {
    const timer = isRunning
      ? setTimeout(() => {
          if (startDate.current != null) {
            onCountdown?.();
          }
        }, countdownMs)
      : undefined;

    return () => clearTimeout(timer);
  }, [isRunning, countdownMs, onCountdown]);

  return {
    msRemaining,
    isRunning,
    start,
    stop,
  };
};
