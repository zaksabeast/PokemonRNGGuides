import React from "react";
import { useAudio } from "~/hooks/useAudio";
import { noop } from "lodash-es";

export type Metronome = {
  isRunning: boolean;
  justTicked: boolean;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  runMetronome: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useMetronome = ({
  enableAudio,
  tickStart,
  tickEnd,
}: {
  enableAudio?: boolean;
  tickStart?: () => void;
  tickEnd?: () => void;
}): Metronome => {
  const [offset, setOffset] = React.useState(0);
  const [justTicked, setJustTicked] = React.useState(false);
  const [isRunning, setIsRunning] = React.useState(false);
  const lastTriggerRef = React.useRef(-1);
  const { playBeeps } = useAudio({ id: "softBeep" });

  const beep = enableAudio ? playBeeps : noop;

  React.useEffect(() => {
    if (!isRunning) {
      lastTriggerRef.current = -1;
    }
  }, [isRunning]);

  React.useEffect(() => {
    let rafId: number | null = null;

    const loop = () => {
      const now = performance.timeOrigin + performance.now();
      const ms = Math.floor(now % 1000);

      const currentSecond = Math.floor(now / 1000);
      if (ms >= offset && currentSecond !== lastTriggerRef.current) {
        const isFirstTick = lastTriggerRef.current === -1;
        lastTriggerRef.current = currentSecond;

        if (!isFirstTick) {
          tickStart?.();
          setJustTicked(true);
          beep({ count: 1, gain: 0.5 });
          setTimeout(() => {
            tickEnd?.();
            setJustTicked(false);
          }, 200);
        }
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = isRunning ? requestAnimationFrame(loop) : null;
    return () => {
      if (rafId != null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [beep, offset, tickStart, tickEnd, isRunning]);

  return {
    offset,
    isRunning,
    justTicked,
    runMetronome: setIsRunning,
    setOffset,
  };
};
