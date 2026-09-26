import React from "react";

// Events browsers treat as user activation, e.g. for unlocking audio or wake locks
export const USER_GESTURE_EVENTS: (keyof WindowEventMap)[] = [
  "click",
  "touchend",
  "keydown",
];

export const useUserInteraction = (callback: () => void) => {
  const callbackRef = React.useRef(callback);

  // Always keep ref up to date
  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const handler = (event: Event) => {
      if (event instanceof KeyboardEvent && event.repeat) {
        return;
      }
      callbackRef.current();
    };

    // Capture so handlers that stop propagation can't block unlocking audio
    USER_GESTURE_EVENTS.forEach((event) => {
      window.addEventListener(event, handler, { capture: true });
    });

    return () => {
      USER_GESTURE_EVENTS.forEach((event) => {
        window.removeEventListener(event, handler, { capture: true });
      });
    };
  }, []);
};
