import React from "react";
import { USER_GESTURE_EVENTS } from "~/hooks/useUserInteraction";

/**
 * Keeps the screen awake while `enabled` is true. The browser releases the
 * lock whenever the page is hidden, so it is requested again when the page
 * becomes visible or the user interacts with it.
 */
export const useWakeLock = (enabled: boolean) => {
  React.useEffect(() => {
    if (!enabled || !("wakeLock" in navigator)) {
      return;
    }

    let sentinel: WakeLockSentinel | null = null;
    let requesting = false;
    let retryAfterRequest = false;
    let hasLoggedError = false;
    let cancelled = false;

    const request = async () => {
      const hasLock = sentinel != null && !sentinel.released;
      if (cancelled || hasLock || document.visibilityState !== "visible") {
        return;
      }

      // The in-flight request may resolve to a lock that was already released,
      // e.g. if the page was hidden and shown again in the meantime
      if (requesting) {
        retryAfterRequest = true;
        return;
      }

      requesting = true;
      try {
        const nextSentinel = await navigator.wakeLock.request("screen");
        if (cancelled) {
          nextSentinel.release().catch(() => {});
        } else {
          sentinel = nextSentinel;
        }
      } catch (error) {
        // Denied (e.g. low battery, no user gesture) or unsupported
        if (!hasLoggedError) {
          hasLoggedError = true;
          // eslint-disable-next-line no-console
          console.warn("Failed to acquire screen wake lock:", error);
        }
      } finally {
        requesting = false;
      }

      if (retryAfterRequest) {
        retryAfterRequest = false;
        request();
      }
    };

    request();
    document.addEventListener("visibilitychange", request);
    // Some browsers only grant the lock during a user gesture, so gestures retry it.
    // Capture so handlers that stop propagation can't block the retry.
    USER_GESTURE_EVENTS.forEach((event) => {
      window.addEventListener(event, request, { capture: true });
    });

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", request);
      USER_GESTURE_EVENTS.forEach((event) => {
        window.removeEventListener(event, request, { capture: true });
      });
      sentinel?.release().catch(() => {});
      sentinel = null;
    };
  }, [enabled]);
};
