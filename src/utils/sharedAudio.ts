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
// Resuming a context that was never unlocked by a user gesture is rejected (or
// left pending on iOS), so visibility changes only resume once it has run
let hasSharedAudioContextRun = false;
// performance.now() time the context last started running. Its clock is frozen
// while it isn't running, so output timestamps from before then are stale.
let sharedAudioContextRunningSinceMs = 0;
// Number of callers holding the keep-alive, which also resumes audio as soon as
// it's interrupted
let keepAliveCount = 0;

export const getSharedAudioContextRunningSinceMs = () => {
  return sharedAudioContextRunningSinceMs;
};

export const resumeSharedAudioContext =
  async (): Promise<AudioContext | null> => {
    // Pages that play audio create the context on mount, so don't create one
    // here for pages that never use it
    const ctx = sharedAudioContext;
    if (ctx == null) {
      return null;
    }

    // Safari uses a non-standard "interrupted" state, which needs resuming too
    if (ctx.state !== "running" && ctx.state !== "closed") {
      try {
        await ctx.resume();
      } catch {
        return null;
      }
    }

    return ctx;
  };

// iOS interrupts audio when the page is hidden (screen lock, app switch, calls,
// etc.), and some browsers do while the window is unfocused
const resumeWhenActive = () => {
  if (hasSharedAudioContextRun && document.visibilityState === "visible") {
    resumeSharedAudioContext();
  }
};

export const getSharedAudioContext = (): AudioContext => {
  if (sharedAudioContext != null) {
    return sharedAudioContext;
  }

  setPlaybackAudioSession();

  const AudioContextConstructor =
    window.AudioContext ?? window.webkitAudioContext;

  const ctx = new AudioContextConstructor({
    latencyHint: "interactive",
  });
  sharedAudioContext = ctx;

  hasSharedAudioContextRun = ctx.state === "running";
  // The context lives for the whole page, so these are never removed
  ctx.addEventListener("statechange", () => {
    if (ctx.state === "running") {
      hasSharedAudioContextRun = true;
      sharedAudioContextRunningSinceMs = performance.now();
    } else if (keepAliveCount > 0) {
      // Waiting for focus would leave countdowns silent while the user is
      // in another window
      resumeWhenActive();
    }
  });
  document.addEventListener("visibilitychange", resumeWhenActive);
  window.addEventListener("pageshow", resumeWhenActive);
  // Some browsers interrupt audio while the window is unfocused, without
  // changing its visibility
  window.addEventListener("focus", resumeWhenActive);

  return sharedAudioContext;
};

// Quiet enough to be inaudible, but not silent, so browsers treat the page as
// playing audio. Low frequencies are also filtered out by most speakers.
const KEEP_ALIVE_GAIN = 0.001;
const KEEP_ALIVE_FREQUENCY = 30;

// Resuming during an interruption is rejected without another state change, so
// it's retried until the interruption ends
const KEEP_ALIVE_RESUME_INTERVAL_MS = 1000;

let stopKeepAliveTone: (() => void) | null = null;

const startKeepAliveTone = (audioContext: AudioContext) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.frequency.value = KEEP_ALIVE_FREQUENCY;
  gainNode.gain.value = KEEP_ALIVE_GAIN;
  oscillator.connect(gainNode).connect(audioContext.destination);
  oscillator.start();

  const resumeInterval = window.setInterval(
    resumeWhenActive,
    KEEP_ALIVE_RESUME_INTERVAL_MS,
  );

  return () => {
    window.clearInterval(resumeInterval);
    oscillator.stop();
    oscillator.disconnect();
    gainNode.disconnect();
  };
};

/**
 * Plays a continuous, inaudible tone on the shared context until the returned
 * function is called, and resumes the context whenever it's interrupted while
 * the page is visible. Every caller shares one tone, which stops once all of
 * them have released it.
 */
export const acquireAudioKeepAlive = () => {
  keepAliveCount++;
  if (stopKeepAliveTone == null) {
    stopKeepAliveTone = startKeepAliveTone(getSharedAudioContext());
  }

  let isReleased = false;
  return () => {
    // Releasing twice would stop the tone while another caller still needs it
    if (isReleased) {
      return;
    }
    isReleased = true;
    keepAliveCount--;
    if (keepAliveCount === 0) {
      stopKeepAliveTone?.();
      stopKeepAliveTone = null;
    }
  };
};
