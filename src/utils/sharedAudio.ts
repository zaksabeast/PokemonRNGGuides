const setPlaybackAudioSession = () => {
  if (!("audioSession" in navigator)) {
    return;
  }

  try {
    // @ts-expect-error - there’s no official TypeScript DOM typing yet for navigator.audioSession
    navigator.audioSession.type = "playback";
  } catch {
    // ignore unsupported or restricted environments
  }
};

let sharedAudioContext: AudioContext | null = null;

export const getSharedAudioContext = (): AudioContext => {
  if (sharedAudioContext !== null) {
    return sharedAudioContext;
  }

  setPlaybackAudioSession();

  const AudioContextConstructor =
    window.AudioContext ?? window.webkitAudioContext;

  sharedAudioContext = new AudioContextConstructor({
    latencyHint: "interactive",
  });

  return sharedAudioContext;
};

export const resumeSharedAudioContext =
  async (): Promise<AudioContext | null> => {
    const ctx = getSharedAudioContext();

    if (ctx.state === "suspended") {
      try {
        await ctx.resume();
      } catch {
        return null;
      }
    }

    return ctx;
  };
