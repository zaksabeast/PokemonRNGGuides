import React from "react";
import firstBeepMp3 from "~/assets/first-beep.mp3";
import countdownBeepsAudio from "~/assets/timer-11-beeps.mp3";
import { useAudio } from "~/hooks/useAudio";
import { useCountdownBeeps } from "~/hooks/useCountdownBeeps";
import { COUNTDOWN_INTERVAL_MS } from "~/hooks/useCanvasTimer";

export const calculateOffset = (timers: number[], index: number) =>
  timers.slice(0, index).reduce((sum, ms) => sum + ms, 0);

export const getMinutesBeforeTarget = (milliseconds: number[]) => {
  const summedMs = milliseconds.reduce((acc, ms) => acc + ms, 0);
  return Math.floor(summedMs / 60000);
};

type TimerSequenceConfig = {
  milliseconds: number[];
  maxBeepCount: number;
};

/**
 * Owns the phase sequencing for a list of timers: when the sequence started,
 * which phase is active, how far into the overall timeline that phase begins,
 * and the countdown beeps.
 *
 * `onExpire` must stay a plain function that reads `currentTimerIndex` from
 * the render scope, because `useCanvasTimer` syncs it into a ref on every
 * commit. Memoizing it freezes the index at 0 and the sequence never stops.
 */
export const useTimerSequence = ({
  milliseconds,
  maxBeepCount,
}: TimerSequenceConfig) => {
  const [startTimeMs, setStartTimeMs] = React.useState<number | null>(null);
  const [currentTimerIndex, setCurrentTimerIndex] = React.useState(0);
  const { playBeeps: playKeepAlive, stopBeeps: stopKeepAlive } = useAudio({
    url: firstBeepMp3,
  });

  const countdownBeeps = Math.min(
    Math.floor((milliseconds[currentTimerIndex] ?? 0) / COUNTDOWN_INTERVAL_MS),
    maxBeepCount,
  );

  const { playTrimmedBeeps, stopBeeps } = useCountdownBeeps({
    audioUrl: countdownBeepsAudio,
    countdownBeeps,
  });

  const currentMs = milliseconds[currentTimerIndex] ?? 0;
  const nextMs = milliseconds[currentTimerIndex + 1] ?? 0;
  const displayTimerMs = milliseconds.length === 0 ? [0] : milliseconds;
  const countdownMs = countdownBeeps * COUNTDOWN_INTERVAL_MS;

  // Calculate when this timer starts in the global timeline (sum of all previous timers)
  const timerStartOffset = calculateOffset(displayTimerMs, currentTimerIndex);

  // Keep audio system alive with quiet beeps
  React.useEffect(() => {
    if (startTimeMs == null) {
      return () => {};
    }
    const timer = setInterval(
      () => playKeepAlive({ count: 1, gain: 0.001 }),
      1000,
    );
    return () => clearInterval(timer);
  }, [startTimeMs, playKeepAlive]);

  // Play countdown beeps once at first countdown beep time
  React.useEffect(() => {
    if (startTimeMs == null) {
      return;
    }

    // First beep fires at: expirationMs - countdownMs
    const delayUntilFirstBeep = currentMs - countdownMs;
    const timeout = window.setTimeout(() => {
      playTrimmedBeeps();
    }, delayUntilFirstBeep);

    return () => clearTimeout(timeout);
  }, [startTimeMs, playTrimmedBeeps, currentMs, countdownMs]);

  const onExpire = () => {
    setCurrentTimerIndex((prev) => prev + 1);

    if (currentTimerIndex + 1 >= milliseconds.length) {
      setStartTimeMs(null);
      setCurrentTimerIndex(0);
    }
  };

  const toggle = () => {
    const newStartTimeMs = startTimeMs == null ? performance.now() : null;
    setStartTimeMs(newStartTimeMs);
    setCurrentTimerIndex(0);
    // Stop audio when timer is stopped
    if (newStartTimeMs == null) {
      stopBeeps();
      stopKeepAlive();
    }
  };

  return {
    startTimeMs,
    currentTimerIndex,
    currentMs,
    nextMs,
    displayTimerMs,
    countdownMs,
    timerStartOffset,
    isRunning: startTimeMs != null,
    onExpire,
    toggle,
  };
};
