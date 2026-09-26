import React from "react";
import { acquireAudioKeepAlive } from "~/utils/sharedAudio";

/**
 * Plays a continuous, inaudible tone while `enabled` is true. Silent pages can
 * have their audio output closed and their process throttled while the browser
 * is in the background, which delays or drops scheduled beeps. The tone runs on
 * the audio thread, so throttled main thread timers can't leave gaps in it.
 */
export const useAudioKeepAlive = (enabled: boolean) => {
  React.useEffect(() => {
    if (!enabled) {
      return;
    }
    return acquireAudioKeepAlive();
  }, [enabled]);
};
