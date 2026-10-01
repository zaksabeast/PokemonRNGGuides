import React from "react";
import { getSharedAudioContext } from "~/utils/sharedAudio";

const softBeep = (
  audioContext: AudioContext,
  startTime: number,
  gain: number,
) => {
  const duration = 0.2;
  const frequency = 880;
  const gainNode = audioContext.createGain();
  const source = audioContext.createOscillator();

  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  source.type = "sine";
  source.frequency.setValueAtTime(frequency, startTime);

  source.connect(gainNode).connect(audioContext.destination);

  return { source, duration };
};

export const useAudio = () => {
  const audioContextRef = React.useRef<AudioContext>(null);
  const activeSourcesRef = React.useRef<OscillatorNode[]>([]);

  React.useEffect(() => {
    audioContextRef.current = getSharedAudioContext();
  }, []);

  const playBeep = React.useCallback((startTime: number, gain: number = 1) => {
    const audioContext = audioContextRef.current;
    if (audioContext == null) {
      return;
    }

    const { source, duration } = softBeep(audioContext, startTime, gain);

    const safeStartTime = Math.max(audioContext.currentTime, startTime);
    source.start(safeStartTime);
    source.stop(safeStartTime + duration);

    activeSourcesRef.current.push(source);

    source.onended = () => {
      activeSourcesRef.current = activeSourcesRef.current.filter(
        (src) => src !== source,
      );
    };
  }, []);

  const playBeeps = React.useCallback(
    ({ count, gain }: { count: number; gain?: number }) => {
      if (audioContextRef.current == null) {
        return;
      }

      const now = audioContextRef.current.currentTime;
      for (let i = 0; i < count; i++) {
        playBeep(now + i * 0.5, gain);
      }
    },
    [playBeep],
  );

  const stopBeeps = React.useCallback(() => {
    activeSourcesRef.current.forEach((source) => source.stop());
    activeSourcesRef.current = [];
  }, []);

  return React.useMemo(
    () => ({ playBeeps, stopBeeps }),
    [playBeeps, stopBeeps],
  );
};
