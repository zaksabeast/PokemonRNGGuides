import React from "react";

const TOTAL_BEEPS = 11;
const COUNTDOWN_INTERVAL_MS = 500;

// Singleton AudioContext instance shared across all useCountdownBeeps hooks
let sharedAudioContext: AudioContext | null = null;

const getOrCreateAudioContext = (): AudioContext | null => {
  if (sharedAudioContext !== null) {
    return sharedAudioContext;
  }
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (typeof AudioContext !== "undefined") {
    sharedAudioContext = new AudioContext();
  }
  return sharedAudioContext;
};

type UseCountdownBeepsConfig = {
  audioUrl: string;
  countdownBeeps: number;
};

export const useCountdownBeeps = ({
  audioUrl,
  countdownBeeps,
}: UseCountdownBeepsConfig) => {
  const beepsSource = React.useRef<AudioBufferSourceNode | null>(null);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const audioBufferRef = React.useRef<AudioBuffer | null>(null);
  const audioBufferLoadingRef = React.useRef<Promise<AudioBuffer> | null>(null);

  // Initialize AudioContext (using singleton) and load audio buffer once on component mount
  React.useEffect(() => {
    if (audioContextRef.current === null) {
      audioContextRef.current = getOrCreateAudioContext();
    }

    // Load and decode audio buffer once
    if (
      audioBufferRef.current === null &&
      audioBufferLoadingRef.current === null &&
      audioContextRef.current !== null
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

  // Play countdown beeps with Web Audio API trimming using cached buffer
  const playTrimmedBeeps = React.useCallback(async () => {
    const audioContext = audioContextRef.current;
    if (audioContext === null) {
      return;
    }

    // Resume AudioContext if suspended (user interaction requirement)
    if (audioContext.state === "suspended") {
      try {
        await audioContext.resume();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to resume AudioContext:", error);
        return;
      }
    }

    // Stop any existing source before playing new one
    if (beepsSource.current !== null) {
      try {
        beepsSource.current.stop();
      } catch {
        // Source may already be stopped, ignore error
      }
      beepsSource.current = null;
    }

    try {
      // Wait for audio buffer to be loaded if not ready
      let audioBuffer = audioBufferRef.current;
      if (audioBuffer === null && audioBufferLoadingRef.current !== null) {
        audioBuffer = await audioBufferLoadingRef.current;
      }

      if (audioBuffer === null) {
        // eslint-disable-next-line no-console
        console.error("Audio buffer not available");
        return;
      }

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      beepsSource.current = source;

      // Create a gain node to control volume
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 1;

      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Extract a trimmed portion of the audio buffer containing only the required beeps
      // The 11-beep file contains beeps at 500ms intervals: 0ms, 500ms, 1000ms, ..., 5000ms
      // We calculate which beeps to skip from the beginning and how long to play
      // For countdownBeeps=3: skip 7 beeps (3500ms), play 4 beeps duration (2000ms) + 1s buffer
      // We skip (TOTAL_BEEPS - countdownBeeps - 1) to account for the final expiration beep
      const beepsToSkip = Math.max(0, TOTAL_BEEPS - countdownBeeps - 1);
      const offsetSeconds = (beepsToSkip * COUNTDOWN_INTERVAL_MS) / 1000;
      // Play (countdownBeeps + 1) intervals to cover all required beeps, plus 1 extra second buffer
      // for the extended tail of the final beep in the audio file
      const durationSeconds =
        ((countdownBeeps + 1) * COUNTDOWN_INTERVAL_MS) / 1000 + 1;

      source.start(0, offsetSeconds, durationSeconds);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to play countdown beeps:", error);
    }
  }, [countdownBeeps]);

  const stopBeeps = React.useCallback(() => {
    if (beepsSource.current !== null) {
      try {
        beepsSource.current.stop();
      } catch {
        // Source may already be stopped, ignore error
      }
      beepsSource.current = null;
    }
  }, []);

  return {
    playTrimmedBeeps,
    stopBeeps,
  };
};
