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
  const startTime = React.useRef<number | null>(null);
  const lastUpdateTime = React.useRef<number>(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [msRemaining, setMsRemaining] = React.useState(expirationMs);
  const frameId = React.useRef<number | null>(null);
  const countdownTriggered = React.useRef(false);

  const stop = React.useCallback(() => {
    if (frameId.current != null) {
      cancelAnimationFrame(frameId.current);
    }
    frameId.current = null;
    setIsRunning(false);
    startTime.current = null;
    setMsRemaining(expirationMs);
    countdownTriggered.current = false;
  }, [expirationMs]);

  const tick = React.useCallback(
    (now: number) => {
      if (startTime.current == null) {
        return;
      }

      const elapsed = now - startTime.current;
      const remaining = Math.max(expirationMs - elapsed, 0);

      if (now - lastUpdateTime.current >= updateMs) {
        setMsRemaining(remaining);
        lastUpdateTime.current = now;
      }

      if (
        countdownMs != null &&
        !countdownTriggered.current &&
        remaining <= countdownMs
      ) {
        countdownTriggered.current = true;
        onCountdown?.();
      }

      if (remaining <= 0) {
        onExpire?.();
        stop();
        return;
      }

      frameId.current = requestAnimationFrame(tick);
    },
    [expirationMs, updateMs, countdownMs, onCountdown, onExpire, stop],
  );

  const start = React.useCallback(() => {
    setIsRunning(true);
    const now = performance.now();
    startTime.current = now;
    lastUpdateTime.current = now;
    countdownTriggered.current = false;
    frameId.current = requestAnimationFrame(tick);
  }, [tick]);

  React.useEffect(() => {
    return () => {
      if (frameId.current != null) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, []);

  return {
    msRemaining,
    isRunning,
    start,
    stop,
  };
};
