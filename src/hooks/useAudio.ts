import React from "react";

export const useAudio = (url: string) => {
  const audioContextRef = React.useRef<AudioContext>(null);
  const audioBufferRef = React.useRef<AudioBuffer>(null);
  const activeSourcesRef = React.useRef<AudioBufferSourceNode[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    audioContextRef.current = new AudioContext({ latencyHint: "interactive" });
    const audioContext = audioContextRef.current;

    const loadAudio = async () => {
      try {
        const response = await fetch(url);
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
  }, [url]);

  const playBeep = React.useCallback((startTime: number, gain: number = 1) => {
    if (audioBufferRef.current == null || audioContextRef.current == null) {
      return;
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;

    const gainNode = audioContextRef.current.createGain();
    gainNode.gain.value = gain;
    source.connect(gainNode).connect(audioContextRef.current.destination);

    source.start(startTime);

    activeSourcesRef.current.push(source);

    source.onended = () => {
      activeSourcesRef.current = activeSourcesRef.current.filter(
        (src) => src !== source,
      );
    };
  }, []);

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
