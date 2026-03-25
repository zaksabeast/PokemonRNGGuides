import React from "react";

export const CANVAS_SIZE = 200;
export const FLASH_DURATION = 150; // milliseconds to show flash color
export const COUNTDOWN_INTERVAL_MS = 500; // Beep every 500ms during countdown
const UPDATE_INTERVAL_MS = 50; // Millisecond display updates every 50ms for smooth appearance

// Color scheme for timer visualization
const RING_COLOR_ACTIVE = "#1677ff"; // Blue for active countdown
const RING_COLOR_FLASH = "#FFD700"; // Gold for flash feedback
const BACKGROUND_COLOR = "#f0f0f0"; // Light gray background ring
const TEXT_COLOR = "#000"; // Black text

type CanvasTimerConfig = {
  expirationMs: number;
  countdownMs?: number;
  onExpire?: () => void;
  startTimeMs?: number | null;
  timerStartOffset?: number;
};

export const useCanvasTimer = ({
  expirationMs,
  countdownMs = 0,
  onExpire,
  startTimeMs,
  timerStartOffset = 0,
}: CanvasTimerConfig) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const contextRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const startTime = React.useRef<number | null>(null);
  const [isRunning, setIsRunning] = React.useState(false);
  const frameId = React.useRef<number | null>(null);
  const beepTimeouts = React.useRef<number[]>([]); // Store scheduled beep timeouts
  const msRemaining = React.useRef(expirationMs);
  const lastRenderedMs = React.useRef(-1);
  const lastFlashTime = React.useRef(0);

  // Store callback as ref to avoid stale closures
  const onExpireRef = React.useRef(onExpire);

  // Update ref when callback changes
  React.useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  // Draw progress ring every frame for smooth animation
  const drawRing = React.useCallback(
    (remaining: number, currentTime: number) => {
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
        contextRef.current = ctx;
      }

      const CENTER = CANVAS_SIZE / 2;
      const RADIUS = 85;
      const LINE_WIDTH = 8;

      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // Draw background circle
      ctx.beginPath();
      ctx.arc(CENTER, CENTER, RADIUS, 0, Math.PI * 2);
      ctx.strokeStyle = BACKGROUND_COLOR;
      ctx.lineWidth = LINE_WIDTH;
      ctx.stroke();

      // Draw progress ring - use bright color if recently flashed
      const isFlashing = currentTime - lastFlashTime.current < FLASH_DURATION;
      const ringColor = isFlashing ? RING_COLOR_FLASH : RING_COLOR_ACTIVE;

      const percent = Math.max(0, remaining / expirationMs);
      const endAngle = -Math.PI / 2 + percent * Math.PI * 2;

      ctx.beginPath();
      ctx.arc(CENTER, CENTER, RADIUS, -Math.PI / 2, endAngle);
      ctx.strokeStyle = ringColor;
      ctx.lineWidth = LINE_WIDTH;
      ctx.lineCap = "round";
      ctx.stroke();
    },
    [expirationMs],
  );

  // Draw text (only called when milliseconds value changes noticeably)
  const drawText = React.useCallback((remaining: number) => {
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
      contextRef.current = ctx;
    }

    const CENTER = CANVAS_SIZE / 2;
    const flooredRemaining = Math.floor(remaining);
    const seconds = Math.floor(flooredRemaining / 1000);
    const milliseconds = flooredRemaining % 1000;
    const text = `${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;

    ctx.font = "700 24px Menlo, Monaco, 'Courier New', monospace";
    ctx.fillStyle = TEXT_COLOR;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, CENTER, CENTER);
  }, []);

  const tick = React.useCallback(
    (now: number) => {
      if (startTime.current == null) {
        return;
      }

      // Calculate elapsed time, accounting for this timer's offset in the sequence
      const elapsed = now - startTime.current - timerStartOffset;
      const remaining = Math.max(expirationMs - elapsed, 0);
      msRemaining.current = remaining;

      // Always draw ring for smooth animation
      drawRing(remaining, now);

      // Redraw text only if milliseconds changed by 50ms or more
      const flooredRemaining = Math.floor(remaining);
      if (
        lastRenderedMs.current === -1 ||
        Math.abs(flooredRemaining - lastRenderedMs.current) >=
          UPDATE_INTERVAL_MS
      ) {
        lastRenderedMs.current = flooredRemaining;
      }

      // Always redraw text after checking if it changed (prevents flicker)
      drawText(remaining);

      if (remaining <= 0) {
        return;
      }

      frameId.current = requestAnimationFrame(tick);
    },
    [expirationMs, drawRing, drawText, timerStartOffset],
  );

  const start = React.useCallback(() => {
    // Stop any existing animation
    if (frameId.current != null) {
      cancelAnimationFrame(frameId.current);
    }

    // Clear any existing timeouts
    beepTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    beepTimeouts.current = [];

    setIsRunning(true);
    // Use provided startTimeMs if available, otherwise use current time
    const now = startTimeMs ?? performance.now();
    startTime.current = now;
    lastRenderedMs.current = -1;
    msRemaining.current = expirationMs;
    lastFlashTime.current = 0; // Reset flash so ring starts blue

    // Schedule countdown flashes (visual feedback for beeps)
    if (countdownMs != null && countdownMs > 0) {
      for (
        let beepTimeMs = countdownMs;
        beepTimeMs > 0;
        beepTimeMs -= COUNTDOWN_INTERVAL_MS
      ) {
        const delayMs = expirationMs - beepTimeMs;
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
    }, expirationMs);
    beepTimeouts.current.push(expiryTimeout);

    frameId.current = requestAnimationFrame(tick);
  }, [tick, expirationMs, countdownMs, startTimeMs]);

  const stop = React.useCallback(() => {
    if (frameId.current != null) {
      cancelAnimationFrame(frameId.current);
    }

    // Clear all scheduled beeps
    beepTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    beepTimeouts.current = [];

    frameId.current = null;
    setIsRunning(false);
    startTime.current = null;
    msRemaining.current = expirationMs;
    lastFlashTime.current = 0; // Reset flash so ring is blue
    contextRef.current = null; // Clear cached context on stop

    // Draw final state
    drawRing(expirationMs, performance.now());
    drawText(expirationMs);
  }, [expirationMs, drawRing, drawText]);

  React.useEffect(() => {
    return () => {
      if (frameId.current != null) {
        cancelAnimationFrame(frameId.current);
      }
      // Clean up all scheduled beep timeouts to prevent memory leaks
      beepTimeouts.current.forEach((timeout) => clearTimeout(timeout));
      beepTimeouts.current = [];
    };
  }, []);

  // Set up canvas at display resolution for crisp rendering
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) {
      return;
    }

    // Set canvas resolution to match display size
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    // Initial render
    drawRing(expirationMs, performance.now());
    drawText(expirationMs);
  }, [expirationMs, drawRing, drawText]);

  return {
    canvasRef,
    isRunning,
    msRemaining: msRemaining.current,
    start,
    stop,
  };
};
