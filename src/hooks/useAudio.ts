import React from "react";
import { match, P } from "ts-pattern";
import { OneOf } from "~/types";

const silentNoise = (audioContext: AudioContext) => {
  const source = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  source.type = "sine";
  source.frequency.value = 30;
  gainNode.gain.value = 0.005;

  return { source, duration: null };
};

const makeAudioSource = (
  audioContext: AudioContext,
  audioBuffer: AudioBuffer,
  gain: number,
) => {
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;

  const gainNode = audioContext.createGain();
  gainNode.gain.value = gain;
  source.connect(gainNode).connect(audioContext.destination);
  return { source, duration: audioBuffer.duration };
};

const softBeep = (audioContext: AudioContext, startTime: number) => {
  const duration = 0.2;
  const frequency = 880;
  const gainNode = audioContext.createGain();
  const source = audioContext.createOscillator();

  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(0.4, startTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  source.type = "sine";
  source.frequency.setValueAtTime(frequency, startTime);

  source.connect(gainNode).connect(audioContext.destination);

  return { source, duration };
};

type AudioId = "silentNoise" | "softBeep";

type AudioOptions = OneOf<{
  url: string;
  id: AudioId;
}>;

export const useAudio = (opts: AudioOptions) => {
  const audioContextRef = React.useRef<AudioContext>(null);
  const audioBufferRef = React.useRef<AudioBuffer>(null);
  const activeSourcesRef = React.useRef<
    (AudioBufferSourceNode | OscillatorNode)[]
  >([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    audioContextRef.current = new AudioContext({ latencyHint: "interactive" });
    const audioContext = audioContextRef.current;

    const loadAudio = async () => {
      if (opts.url == null) {
        return;
      }
      try {
        const response = await fetch(opts.url);
        const arrayBuffer = await response.arrayBuffer();
        audioBufferRef.current =
          await audioContext.decodeAudioData(arrayBuffer);
        setIsLoaded(true);
      } catch {
        // swallow error
      }
    };

    loadAudio();

    return () => {
      audioContext.close();
    };
  }, [opts.url]);

  const playBeep = React.useCallback(
    (startTime: number, gain: number = 1) => {
      const audioContext = audioContextRef.current;
      if (audioContext == null) {
        return;
      }

      const { source, duration } = match({
        id: opts.id,
        buffer: audioBufferRef.current,
      })
        .with({ id: "silentNoise" }, () => silentNoise(audioContext))
        .with({ id: "softBeep" }, () => softBeep(audioContext, startTime))
        .with({ buffer: P.nullish }, () => silentNoise(audioContext))
        .with({ buffer: P.not(P.nullish) }, (matched) =>
          makeAudioSource(audioContext, matched.buffer, gain),
        )
        .exhaustive();

      const safeStartTime = Math.max(audioContext.currentTime, startTime);
      source.start(safeStartTime);
      if (duration != null) {
        source.stop(safeStartTime + duration);
      }

      activeSourcesRef.current.push(source);

      source.onended = () => {
        activeSourcesRef.current = activeSourcesRef.current.filter(
          (src) => src !== source,
        );
      };
    },
    [opts.id],
  );

  const playBeeps = React.useCallback(
    ({ count, gain }: { count: number; gain?: number }) => {
      if (audioContextRef.current == null || audioBufferRef.current == null) {
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
    () => ({ isLoaded, playBeeps, stopBeeps }),
    [isLoaded, playBeeps, stopBeeps],
  );
};
