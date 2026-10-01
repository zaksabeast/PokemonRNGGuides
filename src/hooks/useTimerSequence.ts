import React from "react";
import { isEqual } from "lodash-es";
import countdownBeepsAudio from "~/assets/timer-11-beeps.mp3";
import { useAudioKeepAlive } from "~/hooks/useAudioKeepAlive";
import { useCountdownBeeps } from "~/hooks/useCountdownBeeps";
import { useWakeLock } from "~/hooks/useWakeLock";
import { COUNTDOWN_INTERVAL_MS } from "~/hooks/useCanvasTimer";

export const calculateOffset = (timers: number[], index: number) => {
  return timers.slice(0, index).reduce((sum, ms) => sum + ms, 0);
};

export const getMinutesBeforeTarget = (milliseconds: number[]) => {
  const summedMs = milliseconds.reduce((acc, ms) => acc + ms, 0);
  return Math.floor(summedMs / 60000);
};

const getCountdownBeeps = (ms: number, maxBeepCount: number) => {
  return Math.min(Math.floor(ms / COUNTDOWN_INTERVAL_MS), maxBeepCount);
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
  // Rescheduling restarts the playing countdown, so only a change in values
  // (not a new array with the same values) should reschedule
  const [scheduledMilliseconds, setScheduledMilliseconds] =
    React.useState(milliseconds);

  if (!isEqual(scheduledMilliseconds, milliseconds)) {
    setScheduledMilliseconds(milliseconds);
  }

  const { scheduleBeeps, realignBeeps, stopBeeps } = useCountdownBeeps({
    audioUrl: countdownBeepsAudio,
  });

  const currentMs = milliseconds[currentTimerIndex] ?? 0;
  const nextMs = milliseconds[currentTimerIndex + 1] ?? 0;
  const displayTimerMs = milliseconds.length === 0 ? [0] : milliseconds;
  const countdownMs =
    getCountdownBeeps(currentMs, maxBeepCount) * COUNTDOWN_INTERVAL_MS;

  // Calculate when this timer starts in the global timeline (sum of all previous timers)
  const timerStartOffset = calculateOffset(displayTimerMs, currentTimerIndex);

  // Screen locking suspends timers and interrupts audio on mobile
  useWakeLock(startTimeMs != null);

  // Keeps the audio output open and the page treated as playing audio while
  // the browser is in the background
  useAudioKeepAlive(startTimeMs != null);

  React.useEffect(() => {
    if (startTimeMs == null) {
      return () => {};
    }
    const timer = setInterval(realignBeeps, 1000);
    return () => clearInterval(timer);
  }, [startTimeMs, realignBeeps]);

  // Schedule every phase's countdown up front so each first beep plays at
  // expirationMs - countdownMs, without waiting on the canvas to advance phases
  // (which is late on slow devices and paused while the page is hidden)
  React.useEffect(() => {
    if (startTimeMs == null) {
      return;
    }

    const countdowns = scheduledMilliseconds.map((ms, index) => {
      const countdownBeeps = getCountdownBeeps(ms, maxBeepCount);
      return {
        firstBeepTimeMs:
          startTimeMs +
          calculateOffset(scheduledMilliseconds, index) +
          ms -
          countdownBeeps * COUNTDOWN_INTERVAL_MS,
        countdownBeeps,
      };
    });
    return scheduleBeeps(countdowns);
  }, [startTimeMs, scheduledMilliseconds, maxBeepCount, scheduleBeeps]);

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
