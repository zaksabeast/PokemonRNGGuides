import React from "react";
import { formatTimerReadout } from "~/rngToolsUi/timer/format";

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

export type TimerFrame = {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  remaining: number;
  expirationMs: number;
  currentTime: number;
  isFlashing: boolean;
  colors: TimerColors;
};

export type TimerRenderer = (frame: TimerFrame) => void;

const syncCanvasResolution = (
  canvas: HTMLCanvasElement,
  logicalWidth: number,
  logicalHeight: number,
) => {
  const dpr = window.devicePixelRatio ?? 1;
  const width = Math.round(logicalWidth * dpr);
  const height = Math.round(logicalHeight * dpr);

  if (canvas.width !== width || canvas.height !== height) {
    // eslint-disable-next-line no-param-reassign
    canvas.width = width;
    // eslint-disable-next-line no-param-reassign
    canvas.height = height;
  }

  return dpr;
};

// Draw text (only changes when the milliseconds value changes noticeably)
const drawText = ({
  ctx,
  width,
  height,
  remaining,
  textColor,
}: {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  remaining: number;
  textColor: string;
}) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const text = formatTimerReadout(remaining);

  // eslint-disable-next-line no-param-reassign
  ctx.font = "700 24px Menlo, Monaco, 'Courier New', monospace";
  // eslint-disable-next-line no-param-reassign
  ctx.textAlign = "center";
  // eslint-disable-next-line no-param-reassign
  ctx.textBaseline = "middle";

  const metrics = ctx.measureText(text);
  const maxTextWidth = ctx.measureText("00000:000").width;
  const textHeight =
    (metrics.actualBoundingBoxAscent ?? 18) +
    (metrics.actualBoundingBoxDescent ?? 8);
  ctx.clearRect(
    centerX - maxTextWidth / 2 - TEXT_CLEAR_PADDING,
    centerY - textHeight / 2 - TEXT_CLEAR_PADDING,
    maxTextWidth + TEXT_CLEAR_PADDING * 2,
    textHeight + TEXT_CLEAR_PADDING * 2,
  );

  // eslint-disable-next-line no-param-reassign
  ctx.fillStyle = textColor;
  ctx.fillText(text, centerX, centerY);
};

// Draw progress ring every frame for smooth animation
const drawRing = ({
  ctx,
  width,
  height,
  remaining,
  expirationMs,
  isFlashing,
  backgroundColor,
  ringFlashColor,
  ringActiveColor,
}: {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  remaining: number;
  expirationMs: number;
  isFlashing: boolean;
  backgroundColor: string;
  ringFlashColor: string;
  ringActiveColor: string;
}) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const RADIUS = 85;
  const LINE_WIDTH = 8;
  const RING_CLEAR_PADDING = LINE_WIDTH + 2;

  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, RADIUS + RING_CLEAR_PADDING, 0, Math.PI * 2);
  ctx.arc(
    centerX,
    centerY,
    Math.max(RADIUS - RING_CLEAR_PADDING, 0),
    0,
    Math.PI * 2,
    true,
  );
  ctx.clip();
  ctx.clearRect(0, 0, width, height);
  ctx.restore();

  // Draw background circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, RADIUS, 0, Math.PI * 2);
  // eslint-disable-next-line no-param-reassign
  ctx.strokeStyle = backgroundColor;
  // eslint-disable-next-line no-param-reassign
  ctx.lineWidth = LINE_WIDTH;
  ctx.stroke();

  // Draw progress ring - use bright color if recently flashed
  const ringColor = isFlashing ? ringFlashColor : ringActiveColor;

  const percent = expirationMs > 0 ? Math.max(0, remaining / expirationMs) : 0;
  const endAngle = -Math.PI / 2 + percent * Math.PI * 2;

  ctx.beginPath();
  ctx.arc(centerX, centerY, RADIUS, -Math.PI / 2, endAngle);
  // eslint-disable-next-line no-param-reassign
  ctx.strokeStyle = ringColor;
  // eslint-disable-next-line no-param-reassign
  ctx.lineWidth = LINE_WIDTH;
  // eslint-disable-next-line no-param-reassign
  ctx.lineCap = "round";
  ctx.stroke();
};

export const defaultTimerRenderer: TimerRenderer = ({
  ctx,
  width,
  height,
  remaining,
  expirationMs,
  isFlashing,
  colors,
}) => {
  drawRing({
    ctx,
    width,
    height,
    remaining,
    expirationMs,
    isFlashing,
    backgroundColor: colors.background,
    ringFlashColor: colors.ringFlash,
    ringActiveColor: colors.ringActive,
  });

  drawText({
    ctx,
    width,
    height,
    remaining,
    textColor: colors.text,
  });
};

type CanvasTimerConfig = {
  expirationMs: number;
  countdownMs?: number;
  onExpire?: () => void;
  startTimeMs?: number | null;
  timerStartOffset?: number;
  colors: TimerColors;
  /**
   * Draws a single frame. Held in a ref, so its identity is irrelevant and it
   * must never be added to a dependency array in this file - doing so would
   * restart the timer and reschedule its beeps.
   */
  render?: TimerRenderer;
  /** Logical canvas size in CSS pixels. */
  width?: number;
  height?: number;
};

export const useCanvasTimer = ({
  expirationMs,
  countdownMs = 0,
  onExpire,
  startTimeMs,
  timerStartOffset = 0,
  colors,
  render,
  width = CANVAS_SIZE,
  height = CANVAS_SIZE,
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
  const renderRef = React.useRef(render);
  const widthRef = React.useRef(width);
  const heightRef = React.useRef(height);

  expirationMsRef.current = expirationMs;
  countdownMsRef.current = countdownMs;
  startTimeMsRef.current = startTimeMs;
  timerStartOffsetRef.current = timerStartOffset;
  colorsRef.current = colors;
  renderRef.current = render;
  widthRef.current = width;
  heightRef.current = height;

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

  const drawFrame = React.useCallback(
    ({
      remaining,
      currentTime,
      expirationMs: frameExpirationMs,
    }: {
      remaining: number;
      currentTime: number;
      expirationMs: number;
    }) => {
      const canvas = canvasRef.current;
      if (canvas == null) {
        return;
      }

      let ctx = contextRef.current;
      if (ctx == null) {
        ctx = canvas.getContext("2d");
        if (ctx == null) {
          return;
        }

        contextRef.current = ctx;
      }

      const canvasWidth = widthRef.current;
      const canvasHeight = heightRef.current;
      const dpr = syncCanvasResolution(canvas, canvasWidth, canvasHeight);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const renderFrame = renderRef.current ?? defaultTimerRenderer;
      renderFrame({
        ctx,
        width: canvasWidth,
        height: canvasHeight,
        remaining,
        expirationMs: frameExpirationMs,
        currentTime,
        isFlashing: currentTime - lastFlashTime.current < FLASH_DURATION,
        colors: colorsRef.current,
      });
    },
    [],
  );

  const tick = React.useCallback(
    function tick(now: number) {
      if (startTime.current == null) {
        return;
      }

      const currentExpirationMs = expirationMsRef.current;
      const currentTimerStartOffset = timerStartOffsetRef.current;

      // Calculate elapsed time, accounting for this timer's offset in the sequence
      const elapsed = now - startTime.current - currentTimerStartOffset;
      const remaining = Math.max(currentExpirationMs - elapsed, 0);
      msRemaining.current = remaining;

      // Always draw for smooth animation
      drawFrame({
        remaining,
        currentTime: now,
        expirationMs: currentExpirationMs,
      });

      if (remaining <= 0) {
        frameId.current = null;
        return;
      }

      frameId.current = requestAnimationFrame(tick);
    },
    [drawFrame],
  );

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
    drawFrame({
      remaining: currentExpirationMs,
      currentTime: performance.now(),
      expirationMs: currentExpirationMs,
    });
  }, [clearScheduledBeeps, drawFrame]);

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
    if (canvas == null) {
      return;
    }

    syncCanvasResolution(canvas, widthRef.current, heightRef.current);

    // Initial render
    drawFrame({
      remaining: expirationMs,
      currentTime: performance.now(),
      expirationMs,
    });
  }, [
    expirationMs,
    colors.background,
    colors.ringFlash,
    colors.ringActive,
    colors.text,
    drawFrame,
  ]);

  return {
    canvasRef,
    isRunning,
    start,
    stop,
  };
};
