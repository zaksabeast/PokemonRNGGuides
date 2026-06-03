import React from "react";

export const CANVAS_SIZE = 200;
export const FLASH_DURATION = 150; // milliseconds to show flash color
export const COUNTDOWN_INTERVAL_MS = 500; // Beep every 500ms during countdown
const TEXT_CLEAR_PADDING = 12;

export type TimerColors = {
  ringActive: string;
  ringFlash: string;
  background: string;
  text: string;
};

const syncCanvasResolution = (canvas: HTMLCanvasElement) => {
  const dpr = window.devicePixelRatio ?? 1;
  const width = CANVAS_SIZE * dpr;
  const height = CANVAS_SIZE * dpr;

  if (canvas.width !== width || canvas.height !== height) {
    // eslint-disable-next-line no-param-reassign
    canvas.width = width;
    // eslint-disable-next-line no-param-reassign
    canvas.height = height;
  }

  return dpr;
};

// Draw text (only called when milliseconds value changes noticeably)
const drawText = ({
  remaining,
  canvasRef,
  contextRef,
  textColor,
}: {
  remaining: number;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  contextRef: React.RefObject<CanvasRenderingContext2D | null>;
  textColor: string;
}) => {
  const canvas = canvasRef.current;
  if (canvas === null) {
    return;
  }

  let ctx = contextRef.current;
  if (ctx === null) {
    ctx = canvas.getContext("2d");
    if (ctx === null) {
      return;
    }

    // eslint-disable-next-line -- We expect react refs to be mutable
    contextRef.current = ctx;
  }

  const CENTER = CANVAS_SIZE / 2;
  const flooredRemaining = Math.floor(remaining);
  const seconds = Math.floor(flooredRemaining / 1000);
  const milliseconds = flooredRemaining % 1000;
  const text = `${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;

  ctx.font = "700 24px Menlo, Monaco, 'Courier New', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const metrics = ctx.measureText(text);
  const maxTextWidth = ctx.measureText("00000:000").width;
  const textHeight =
    (metrics.actualBoundingBoxAscent ?? 18) +
    (metrics.actualBoundingBoxDescent ?? 8);
  ctx.clearRect(
    CENTER - maxTextWidth / 2 - TEXT_CLEAR_PADDING,
    CENTER - textHeight / 2 - TEXT_CLEAR_PADDING,
    maxTextWidth + TEXT_CLEAR_PADDING * 2,
    textHeight + TEXT_CLEAR_PADDING * 2,
  );

  ctx.fillStyle = textColor;
  ctx.fillText(text, CENTER, CENTER);
};

// Draw progress ring every frame for smooth animation
const drawRing = ({
  remaining,
  currentTime,
  expirationMs,
  canvasRef,
  contextRef,
  lastFlashTimeRef,
  backgroundColor,
  ringFlashColor,
  ringActiveColor,
}: {
  remaining: number;
  currentTime: number;
  expirationMs: number;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  contextRef: React.RefObject<CanvasRenderingContext2D | null>;
  lastFlashTimeRef: React.RefObject<number>;
  backgroundColor: string;
  ringFlashColor: string;
  ringActiveColor: string;
}) => {
  const canvas = canvasRef.current;
  if (canvas === null) {
    return;
  }

  let ctx = contextRef.current;
  if (ctx === null) {
    ctx = canvas.getContext("2d");
    if (ctx === null) {
      return;
    }

    // eslint-disable-next-line -- We expect react refs to be mutable
    contextRef.current = ctx;
  }

  const CENTER = CANVAS_SIZE / 2;
  const RADIUS = 85;
  const LINE_WIDTH = 8;
  const RING_CLEAR_PADDING = LINE_WIDTH + 2;

  const dpr = syncCanvasResolution(canvas);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  ctx.save();
  ctx.beginPath();
  ctx.arc(CENTER, CENTER, RADIUS + RING_CLEAR_PADDING, 0, Math.PI * 2);
  ctx.arc(
    CENTER,
    CENTER,
    Math.max(RADIUS - RING_CLEAR_PADDING, 0),
    0,
    Math.PI * 2,
    true,
  );
  ctx.clip();
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.restore();

  // Draw background circle
  ctx.beginPath();
  ctx.arc(CENTER, CENTER, RADIUS, 0, Math.PI * 2);
  ctx.strokeStyle = backgroundColor;
  ctx.lineWidth = LINE_WIDTH;
  ctx.stroke();

  // Draw progress ring - use bright color if recently flashed
  const isFlashing = currentTime - lastFlashTimeRef.current < FLASH_DURATION;
  const ringColor = isFlashing ? ringFlashColor : ringActiveColor;

  const percent = expirationMs > 0 ? Math.max(0, remaining / expirationMs) : 0;
  const endAngle = -Math.PI / 2 + percent * Math.PI * 2;

  ctx.beginPath();
  ctx.arc(CENTER, CENTER, RADIUS, -Math.PI / 2, endAngle);
  ctx.strokeStyle = ringColor;
  ctx.lineWidth = LINE_WIDTH;
  ctx.lineCap = "round";
  ctx.stroke();
};

type CanvasTimerConfig = {
  expirationMs: number;
  countdownMs?: number;
  onExpire?: () => void;
  startTimeMs?: number | null;
  timerStartOffset?: number;
  colors: TimerColors;
};

export const useCanvasTimer = ({
  expirationMs,
  countdownMs = 0,
  onExpire,
  startTimeMs,
  timerStartOffset = 0,
  colors,
}: CanvasTimerConfig) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const contextRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const startTime = React.useRef<number | null>(null);
  const [isRunning, setIsRunning] = React.useState(false);
  const frameId = React.useRef<number | null>(null);
  const beepTimeouts = React.useRef<number[]>([]); // Store scheduled beep timeouts
  const msRemaining = React.useRef(expirationMs);
  const lastFlashTime = React.useRef(0);
  const expirationMsRef = React.useRef(expirationMs);
  const countdownMsRef = React.useRef(countdownMs);
  const startTimeMsRef = React.useRef(startTimeMs);
  const timerStartOffsetRef = React.useRef(timerStartOffset);
  const colorsRef = React.useRef(colors);

  expirationMsRef.current = expirationMs;
  countdownMsRef.current = countdownMs;
  startTimeMsRef.current = startTimeMs;
  timerStartOffsetRef.current = timerStartOffset;
  colorsRef.current = colors;

  // Store callback as ref to avoid stale closures
  const onExpireRef = React.useRef(onExpire);

  // Update ref when callback changes
  React.useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  const clearScheduledBeeps = React.useCallback(() => {
    beepTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    beepTimeouts.current = [];
  }, []);

  const tick = React.useCallback(function tick(now: number) {
    if (startTime.current == null) {
      return;
    }

    const currentExpirationMs = expirationMsRef.current;
    const currentTimerStartOffset = timerStartOffsetRef.current;
    const currentColors = colorsRef.current;

    // Calculate elapsed time, accounting for this timer's offset in the sequence
    const elapsed = now - startTime.current - currentTimerStartOffset;
    const remaining = Math.max(currentExpirationMs - elapsed, 0);
    msRemaining.current = remaining;

    // Always draw ring for smooth animation
    drawRing({
      remaining,
      currentTime: now,
      expirationMs: currentExpirationMs,
      canvasRef,
      contextRef,
      lastFlashTimeRef: lastFlashTime,
      backgroundColor: currentColors.background,
      ringFlashColor: currentColors.ringFlash,
      ringActiveColor: currentColors.ringActive,
    });

    drawText({
      remaining,
      canvasRef,
      contextRef,
      textColor: currentColors.text,
    });

    if (remaining <= 0) {
      frameId.current = null;
      return;
    }

    frameId.current = requestAnimationFrame(tick);
  }, []);

  const start = React.useCallback(() => {
    // Stop any existing animation
    if (frameId.current != null) {
      cancelAnimationFrame(frameId.current);
    }

    // Clear any existing timeouts
    clearScheduledBeeps();

    const now = performance.now();
    const currentExpirationMs = expirationMsRef.current;
    const currentCountdownMs = countdownMsRef.current;
    const currentTimerStartOffset = timerStartOffsetRef.current;
    const configuredStartTimeMs = startTimeMsRef.current;

    setIsRunning(true);
    // Use provided startTimeMs if available, otherwise use current time
    const effectiveStartTimeMs = configuredStartTimeMs ?? now;
    startTime.current = effectiveStartTimeMs;
    lastFlashTime.current = 0; // Reset flash so ring starts blue

    const elapsed = Math.max(
      0,
      now - effectiveStartTimeMs - currentTimerStartOffset,
    );
    const remainingAtStart = Math.max(currentExpirationMs - elapsed, 0);
    msRemaining.current = remainingAtStart;

    // Schedule countdown flashes (visual feedback for beeps)
    if (currentCountdownMs > 0) {
      for (
        let beepTimeMs = currentCountdownMs;
        beepTimeMs > 0;
        beepTimeMs -= COUNTDOWN_INTERVAL_MS
      ) {
        const delayMs = remainingAtStart - beepTimeMs;
        if (delayMs < 0) {
          continue;
        }

        const timeout = window.setTimeout(() => {
          lastFlashTime.current = performance.now();
        }, delayMs);
        beepTimeouts.current.push(timeout);
      }
    }

    // Schedule expiry beep
    const expiryTimeout = window.setTimeout(() => {
      lastFlashTime.current = performance.now();
      onExpireRef.current?.();
    }, remainingAtStart);
    beepTimeouts.current.push(expiryTimeout);

    frameId.current = requestAnimationFrame(tick);
  }, [clearScheduledBeeps, tick]);

  const stop = React.useCallback(() => {
    const currentExpirationMs = expirationMsRef.current;
    const currentColors = colorsRef.current;

    if (frameId.current != null) {
      cancelAnimationFrame(frameId.current);
    }

    // Clear all scheduled beeps
    clearScheduledBeeps();

    frameId.current = null;
    setIsRunning(false);
    startTime.current = null;
    msRemaining.current = currentExpirationMs;
    lastFlashTime.current = 0; // Reset flash so ring is blue
    contextRef.current = null; // Clear cached context on stop

    // Draw final state
    drawRing({
      remaining: currentExpirationMs,
      currentTime: performance.now(),
      expirationMs: currentExpirationMs,
      canvasRef,
      contextRef,
      lastFlashTimeRef: lastFlashTime,
      backgroundColor: currentColors.background,
      ringFlashColor: currentColors.ringFlash,
      ringActiveColor: currentColors.ringActive,
    });
    drawText({
      remaining: currentExpirationMs,
      canvasRef,
      contextRef,
      textColor: currentColors.text,
    });
  }, [clearScheduledBeeps]);

  React.useEffect(() => {
    return () => {
      if (frameId.current != null) {
        cancelAnimationFrame(frameId.current);
      }
      // Clean up all scheduled beep timeouts to prevent memory leaks
      clearScheduledBeeps();
    };
  }, [clearScheduledBeeps]);

  // Set up canvas at display resolution for crisp rendering
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) {
      return;
    }

    syncCanvasResolution(canvas);

    // Initial render
    drawRing({
      remaining: expirationMs,
      currentTime: performance.now(),
      expirationMs,
      canvasRef,
      contextRef,
      lastFlashTimeRef: lastFlashTime,
      backgroundColor: colors.background,
      ringFlashColor: colors.ringFlash,
      ringActiveColor: colors.ringActive,
    });
    drawText({
      remaining: expirationMs,
      canvasRef,
      contextRef,
      textColor: colors.text,
    });
  }, [
    expirationMs,
    colors.background,
    colors.ringFlash,
    colors.ringActive,
    colors.text,
  ]);

  return {
    canvasRef,
    isRunning,
    start,
    stop,
  };
};
