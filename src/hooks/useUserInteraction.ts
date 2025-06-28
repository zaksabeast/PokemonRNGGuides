import React from "react";
import { throttle } from "lodash-es";

const interactions: (keyof WindowEventMap)[] = [
  "click",
  "touchstart",
  "mousemove",
  "keydown",
];

export const useUserInteraction = (callback: () => void) => {
  const callbackRef = React.useRef(callback);

  // Always keep ref up to date
  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const handler = throttle(() => {
      callbackRef.current();
    }, 1000);

    interactions.forEach((event) => {
      window.addEventListener(event, handler);
    });

    return () => {
      interactions.forEach((event) => {
        window.removeEventListener(event, handler);
      });
    };
  }, []);
};
