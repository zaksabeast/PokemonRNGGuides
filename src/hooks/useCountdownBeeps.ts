import React from "react";
import { COUNTDOWN_INTERVAL_MS } from "~/hooks/useCanvasTimer";
import {
  getSharedAudioContext,
  getSharedAudioContextRunningSinceMs,
} from "~/utils/sharedAudio";

const TOTAL_BEEPS = 11;
// Extra time for the extended tail of the final beep in the audio file
const FINAL_BEEP_TAIL_MS = 1000;
// Starting at currentTime races the audio thread, so late starts are pushed
// ahead by at least this (or a couple of render buffers on slower devices)
// and the offset into the audio is adjusted to match
const MIN_START_LEAD_SECONDS = 0.01;
// The audio clock drifts from performance.now(), so countdowns that haven't
// started are rescheduled once they drift further than this from their target.
// Estimated anchors jitter by up to an output buffer, so they need more slack.
const DRIFT_TOLERANCE_SECONDS = 0.002;
const ESTIMATED_DRIFT_TOLERANCE_SECONDS = 0.025;
// Countdowns about to start are left alone so rescheduling can't race their start
const RESCHEDULE_CUTOFF_SECONDS = 0.1;
// Output timestamps further than this from now have stopped updating or are on
// the wrong time origin
const MAX_TIMESTAMP_AGE_MS = 500;
const CLOCK_RESTART_POLL_MS = 4;
const CLOCK_RESTART_SLOW_POLL_MS = 50;
const CLOCK_RESTART_TIMEOUT_MS = 250;

export type Countdown = {
  /** performance.now() time the first beep should be heard */
  firstBeepTimeMs: number;
  countdownBeeps: number;
};

type CountdownPlayback = {
  source: AudioBufferSourceNode;
  startTime: number;
  /** Whether it was scheduled with an estimated clock anchor */
  isEstimated: boolean;
};

type ScheduledCountdown = Countdown & {
  endTimeMs: number;
  playback: CountdownPlayback | null;
};

/** A context time paired with the performance.now() time it is heard */
type OutputTimestamp = {
  contextTime: number;
  performanceTime: number;
};

type ClockAnchor = OutputTimestamp & {
  /**
   * Estimated anchors are off by up to an output buffer, plus any output
   * latency the browser doesn't report (large with Bluetooth)
   */
  isEstimated: boolean;
};

const stopSource = (source: AudioBufferSourceNode, when?: number) => {
  try {
    source.stop(when);
  } catch {
    // Source may already be stopped, ignore error
  }
};

/** Sources stopped before they start may never fire "ended", so they're untracked here */
const discardSource = (
  activeSources: Set<AudioBufferSourceNode>,
  source: AudioBufferSourceNode,
) => {
  stopSource(source);
  activeSources.delete(source);
};

const getStartLeadSeconds = (audioContext: AudioContext) => {
  const leadSeconds = (audioContext.baseLatency ?? 0) * 2;
  return Math.max(MIN_START_LEAD_SECONDS, leadSeconds);
};

const readOutputTimestamp = (
  audioContext: AudioContext,
): OutputTimestamp | null => {
  if (!("getOutputTimestamp" in audioContext)) {
    return null;
  }

  const { contextTime = 0, performanceTime = 0 } =
    audioContext.getOutputTimestamp();
  // Both are 0 until the output has rendered audio
  if (contextTime <= 0 || performanceTime <= 0) {
    return null;
  }
  return { contextTime, performanceTime };
};

/**
 * Timestamps from before the clock last started pair it with times from before
 * it froze, so they're off by however long it was stopped
 */
const isFreshTimestamp = ({ performanceTime }: OutputTimestamp) => {
  const runningSinceMs = getSharedAudioContextRunningSinceMs();
  const timestampAgeMs = Math.abs(performance.now() - performanceTime);
  return (
    performanceTime >= runningSinceMs && timestampAgeMs < MAX_TIMESTAMP_AGE_MS
  );
};

/**
 * Reading currentTime and performance.now() separately is off by up to an
 * output buffer, and currentTime is ahead of what is heard by the output latency
 * (large with Bluetooth). The output timestamp pairs the two clocks at the output.
 */
const getClockAnchor = (audioContext: AudioContext): ClockAnchor => {
  const timestamp = readOutputTimestamp(audioContext);
  if (timestamp != null && isFreshTimestamp(timestamp)) {
    return { ...timestamp, isEstimated: false };
  }

  // Older Safari lacks output timestamps, so estimate from the output latency
  const outputLatency = audioContext.outputLatency ?? 0;
  const latencySeconds =
    outputLatency > 0 ? outputLatency : (audioContext.baseLatency ?? 0);
  return {
    contextTime: audioContext.currentTime,
    performanceTime: performance.now() + latencySeconds * 1000,
    isEstimated: true,
  };
};

const toContextTime = (anchor: ClockAnchor, timeMs: number) => {
  return anchor.contextTime + (timeMs - anchor.performanceTime) / 1000;
};

/**
 * Safari reports "running" before the audio clock restarts after a resume, so
 * this waits for the output to render new audio before anchoring times to it.
 * Nothing plays while the clock is frozen, so it never anchors to a frozen clock,
 * e.g. while Bluetooth output reconnects after unlocking.
 */
const waitForClockRestart = (
  audioContext: AudioContext,
  onRestart: () => void,
) => {
  const resumedAtMs = performance.now();
  const frozenContextTime = audioContext.currentTime;
  const hasOutputTimestamp = readOutputTimestamp(audioContext) != null;
  let timeout = 0;

  const check = () => {
    if (audioContext.state !== "running") {
      return;
    }

    const timestamp = readOutputTimestamp(audioContext);
    const hasFreshTimestamp =
      !hasOutputTimestamp || (timestamp != null && isFreshTimestamp(timestamp));
    // Some engines may never refresh output timestamps, so after the timeout
    // a moving clock is enough
    const hasTimedOut =
      performance.now() - resumedAtMs >= CLOCK_RESTART_TIMEOUT_MS;
    const isClockMoving = audioContext.currentTime > frozenContextTime;

    if (isClockMoving && (hasFreshTimestamp || hasTimedOut)) {
      onRestart();
      return;
    }
    timeout = window.setTimeout(
      check,
      hasTimedOut ? CLOCK_RESTART_SLOW_POLL_MS : CLOCK_RESTART_POLL_MS,
    );
  };

  check();
  return () => window.clearTimeout(timeout);
};

/**
 * Starts the trimmed countdown on the audio clock, which is sample accurate and
 * isn't throttled like main thread timers. If the first beep time already passed,
 * playback starts partway in so the remaining beeps stay aligned with the target.
 */
const startCountdown = (
  audioContext: AudioContext,
  audioBuffer: AudioBuffer,
  activeSources: Set<AudioBufferSourceNode>,
  anchor: ClockAnchor,
  { firstBeepTimeMs, countdownBeeps, endTimeMs }: ScheduledCountdown,
): CountdownPlayback | null => {
  // The clock is stopped, so this is started once it runs again
  if (audioContext.state !== "running") {
    return null;
  }

  // Extract a trimmed portion of the audio buffer containing only the required beeps
  // The 11-beep file contains beeps at 500ms intervals: 0ms, 500ms, 1000ms, ..., 5000ms
  // We skip (TOTAL_BEEPS - countdownBeeps - 1) to account for the final expiration beep
  // For countdownBeeps=3: skip 7 beeps (3500ms) and play until endTimeMs
  const beepsToSkip = Math.max(0, TOTAL_BEEPS - countdownBeeps - 1);
  const offsetSeconds = (beepsToSkip * COUNTDOWN_INTERVAL_MS) / 1000;

  const leadSeconds = getStartLeadSeconds(audioContext);
  const firstBeepTime = toContextTime(anchor, firstBeepTimeMs);
  const startTime = Math.max(
    firstBeepTime,
    audioContext.currentTime + leadSeconds,
  );
  const lateSeconds = startTime - firstBeepTime;
  const finalBeepLateSeconds =
    lateSeconds - (countdownBeeps * COUNTDOWN_INTERVAL_MS) / 1000;
  const durationSeconds = toContextTime(anchor, endTimeMs) - startTime;
  // Past the final beep (beyond what the start lead added), so only its tail
  // would be left
  if (finalBeepLateSeconds > leadSeconds || durationSeconds <= 0) {
    return null;
  }

  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);

  source.start(startTime, offsetSeconds + lateSeconds, durationSeconds);

  // Tracked until it ends so stopping can reach sources no longer in the schedule
  activeSources.add(source);
  source.onended = () => {
    activeSources.delete(source);
  };

  return { source, startTime, isEstimated: anchor.isEstimated };
};

/**
 * Restarts countdowns against a fresh clock anchor. Without `restartAll`, only
 * countdowns that haven't started and have drifted too far are rescheduled.
 */
const rescheduleCountdowns = (
  audioContext: AudioContext,
  audioBuffer: AudioBuffer,
  activeSources: Set<AudioBufferSourceNode>,
  countdowns: ScheduledCountdown[],
  restartAll: boolean,
) => {
  if (audioContext.state !== "running") {
    return;
  }

  const anchor = getClockAnchor(audioContext);
  const { currentTime } = audioContext;
  const driftToleranceSeconds = anchor.isEstimated
    ? ESTIMATED_DRIFT_TOLERANCE_SECONDS
    : DRIFT_TOLERANCE_SECONDS;

  // An estimated anchor never replaces a schedule from an output timestamp,
  // since it's less accurate
  const hasDrifted = ({ playback, firstBeepTimeMs }: ScheduledCountdown) => {
    return (
      playback != null &&
      (playback.isEstimated || !anchor.isEstimated) &&
      playback.startTime - currentTime >= RESCHEDULE_CUTOFF_SECONDS &&
      Math.abs(playback.startTime - toContextTime(anchor, firstBeepTimeMs)) >
        driftToleranceSeconds
    );
  };

  for (const countdown of countdowns) {
    if (!restartAll && !hasDrifted(countdown)) {
      continue;
    }

    if (countdown.playback != null) {
      discardSource(activeSources, countdown.playback.source);
    }
    countdown.playback = startCountdown(
      audioContext,
      audioBuffer,
      activeSources,
      anchor,
      countdown,
    );
  }
};

type UseCountdownBeepsConfig = {
  audioUrl: string;
};

export const useCountdownBeeps = ({ audioUrl }: UseCountdownBeepsConfig) => {
  const scheduledRef = React.useRef<ScheduledCountdown[]>([]);
  const activeSourcesRef = React.useRef(new Set<AudioBufferSourceNode>());
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const audioBufferRef = React.useRef<AudioBuffer | null>(null);
  const audioBufferLoadingRef = React.useRef<Promise<AudioBuffer> | null>(null);

  // Initialize AudioContext (using singleton) and load audio buffer once on component mount
  React.useEffect(() => {
    if (audioContextRef.current == null) {
      audioContextRef.current = getSharedAudioContext();
    }

    // Load and decode audio buffer once
    if (
      audioBufferRef.current == null &&
      audioBufferLoadingRef.current == null &&
      audioContextRef.current != null
    ) {
      const loadAudioBuffer = async (): Promise<AudioBuffer> => {
        try {
          const response = await fetch(audioUrl);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer =
            await audioContextRef.current?.decodeAudioData(arrayBuffer);
          if (audioBuffer === undefined) {
            throw new Error("Failed to decode audio data");
          }
          audioBufferRef.current = audioBuffer;
          return audioBuffer;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Failed to load audio buffer:", error);
          throw error;
        }
      };

      audioBufferLoadingRef.current = loadAudioBuffer();
    }

    // No cleanup needed - singleton AudioContext is shared across all component instances
    return () => {};
  }, [audioUrl]);

  // The audio clock stops while the context is suspended or interrupted (e.g. iOS
  // screen lock), so realign the countdowns with wall-clock time on resume
  React.useEffect(() => {
    const audioContext = getSharedAudioContext();
    let cancelClockWait = () => {};

    const onStateChange = () => {
      cancelClockWait();

      if (audioContext.state !== "running") {
        // Anything still scheduled, including earlier countdowns' tails, would
        // play late once the clock restarts
        activeSourcesRef.current.forEach((source) => stopSource(source));
        activeSourcesRef.current.clear();
        for (const countdown of scheduledRef.current) {
          countdown.playback = null;
        }
        return;
      }

      cancelClockWait = waitForClockRestart(audioContext, () => {
        const audioBuffer = audioBufferRef.current;
        if (audioBuffer != null) {
          rescheduleCountdowns(
            audioContext,
            audioBuffer,
            activeSourcesRef.current,
            scheduledRef.current,
            true,
          );
        }
      });
    };

    audioContext.addEventListener("statechange", onStateChange);
    return () => {
      cancelClockWait();
      audioContext.removeEventListener("statechange", onStateChange);
    };
  }, []);

  // Schedules every countdown up front on the audio clock. Each one plays until the
  // next one starts. Returns a function that cancels the countdowns that haven't
  // started playing yet.
  const scheduleBeeps = React.useCallback((countdowns: Countdown[]) => {
    const audioContext = getSharedAudioContext();

    const scheduled = countdowns.map((countdown, index): ScheduledCountdown => {
      const naturalEndMs =
        countdown.firstBeepTimeMs +
        (countdown.countdownBeeps + 1) * COUNTDOWN_INTERVAL_MS +
        FINAL_BEEP_TAIL_MS;
      const nextFirstBeepMs =
        countdowns[index + 1]?.firstBeepTimeMs ?? Infinity;
      return {
        ...countdown,
        endTimeMs: Math.min(naturalEndMs, nextFirstBeepMs),
        playback: null,
      };
    });
    let cancelled = false;

    const start = async () => {
      // Wait for audio buffer to be loaded if not ready
      let audioBuffer = audioBufferRef.current;
      if (audioBuffer == null && audioBufferLoadingRef.current != null) {
        audioBuffer = await audioBufferLoadingRef.current;
      }

      if (audioBuffer == null) {
        // eslint-disable-next-line no-console
        console.error("Audio buffer not available");
        return;
      }

      if (cancelled) {
        return;
      }

      rescheduleCountdowns(
        audioContext,
        audioBuffer,
        activeSourcesRef.current,
        scheduled,
        true,
      );

      // Cut off the previous countdowns' tails once these start
      const firstStartTime = scheduled.find(({ playback }) => playback != null)
        ?.playback?.startTime;
      if (firstStartTime !== undefined) {
        scheduledRef.current.forEach(({ playback }) => {
          if (playback != null) {
            stopSource(playback.source, firstStartTime);
          }
        });
      }
      scheduledRef.current = scheduled;
    };

    start().catch((error) => {
      // eslint-disable-next-line no-console
      console.error("Failed to play countdown beeps:", error);
    });

    return () => {
      cancelled = true;
      const { currentTime } = audioContext;
      // Countdowns that already started are left to finish their final beep
      const started = scheduled.filter(({ playback }) => {
        if (playback == null) {
          return false;
        }
        if (currentTime >= playback.startTime) {
          return true;
        }
        discardSource(activeSourcesRef.current, playback.source);
        return false;
      });
      if (scheduledRef.current === scheduled) {
        scheduledRef.current = started;
      }
    };
  }, []);

  // Corrects drift between the audio clock and performance.now() for countdowns
  // scheduled far ahead. Call periodically while countdowns are scheduled.
  const realignBeeps = React.useCallback(() => {
    const audioBuffer = audioBufferRef.current;
    if (audioBuffer != null) {
      rescheduleCountdowns(
        getSharedAudioContext(),
        audioBuffer,
        activeSourcesRef.current,
        scheduledRef.current,
        false,
      );
    }
  }, []);

  // Stops every countdown, including earlier ones left to finish their final beep
  const stopBeeps = React.useCallback(() => {
    activeSourcesRef.current.forEach((source) => stopSource(source));
    activeSourcesRef.current.clear();
    scheduledRef.current = [];
  }, []);

  // Countdowns left to finish their final beep would keep playing after unmount
  React.useEffect(() => {
    return () => stopBeeps();
  }, [stopBeeps]);

  return {
    scheduleBeeps,
    realignBeeps,
    stopBeeps,
  };
};
