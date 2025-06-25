import React from "react";
import { match, P } from "ts-pattern";
import { OneOf } from "~/types";

const silentNoise = (audioContext: AudioContext) => {
  const source = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  source.type = "sine";
  source.frequency.value = 30;
  gainNode.gain.value = 0.005;

  return source;
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
  return source;
};

type AudioId = "silentNoise";

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
      const audioBuffer = audioBufferRef.current;

      if (audioBuffer == null || audioContext == null) {
        return;
      }

      const source = match({ id: opts.id, url: opts.url })
        .with({ id: "silentNoise" }, () => silentNoise(audioContext))
        .with({ url: P.string }, () =>
          makeAudioSource(audioContext, audioBuffer, gain),
        )
        .with({ id: P.nullish, url: P.nullish }, () =>
          silentNoise(audioContext),
        )
        .exhaustive();

      source.start(startTime);

      activeSourcesRef.current.push(source);

      source.onended = () => {
        activeSourcesRef.current = activeSourcesRef.current.filter(
          (src) => src !== source,
        );
      };
    },
    [opts.url, opts.id],
  );

  const playBeeps = React.useCallback(
    ({
      count,
      offsetMs = 0,
      gain,
    }: {
      count: number;
      offsetMs?: number;
      gain?: number;
    }) => {
      if (audioContextRef.current == null) {
        return;
      }

      const offsetSeconds = offsetMs / 1000;
      const now = audioContextRef.current.currentTime;
      for (let i = 0; i < count; i++) {
        playBeep(offsetSeconds + now + i * 0.5, gain);
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
