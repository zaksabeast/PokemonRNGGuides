import React from "react";

export const useAudio = (url: string) => {
  const audioContextRef = React.useRef<AudioContext>(null);
  const audioBufferRef = React.useRef<AudioBuffer>(null);
  const activeSourcesRef = React.useRef<AudioBufferSourceNode[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

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

  const playBeep = React.useCallback((startTime: number) => {
    if (audioBufferRef.current == null || audioContextRef.current == null) {
      return;
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.start(startTime);

    activeSourcesRef.current.push(source);

    source.onended = () => {
      activeSourcesRef.current = activeSourcesRef.current.filter(
        (s) => s !== source,
      );
    };
  }, []);

  const playBeeps = React.useCallback(
    (count: number) => {
      if (audioContextRef.current == null || audioBufferRef.current == null) {
        return;
      }

      const now = audioContextRef.current.currentTime;
      for (let i = 0; i < count; i++) {
        playBeep(now + i * 0.5);
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
