/* eslint-disable no-param-reassign -- the renderer intentionally mutates the context */
import type { TimerRenderer } from "~/hooks/useCanvasTimer";

export const ARC_WIDTH = 280;
export const ARC_HEIGHT = 200;

const RADIUS = 118;
const HALF_CHORD = 110;
const ENDPOINT_Y = 178;
const LINE_WIDTH = 12;

const CENTER_X = ARC_WIDTH / 2;
const CENTER_Y = ENDPOINT_Y - Math.sqrt(RADIUS ** 2 - HALF_CHORD ** 2);
const THETA = Math.acos(HALF_CHORD / RADIUS);
const START_ANGLE = Math.PI - THETA;
const SWEEP = Math.PI + 2 * THETA;

export const ARC_GEOMETRY = {
  centerX: CENTER_X,
  centerY: CENTER_Y,
  radius: RADIUS,
  lineWidth: LINE_WIDTH,
  startAngle: START_ANGLE,
  sweep: SWEEP,
} as const;

export const CONTENT_CENTER_Y = ARC_HEIGHT / 2 + 16;

const NUMERALS_FONT = "500 44px Menlo, Monaco, 'Courier New', monospace";

/** Mutates ctx */
export const arcTimerRenderer: TimerRenderer = ({
  ctx,
  width,
  height,
  remaining,
  expirationMs,
  isFlashing,
  colors,
}) => {
  ctx.clearRect(0, 0, width, height);

  ctx.lineCap = "round";
  ctx.lineWidth = LINE_WIDTH;

  ctx.beginPath();
  ctx.arc(CENTER_X, CENTER_Y, RADIUS, START_ANGLE, START_ANGLE + SWEEP);
  ctx.strokeStyle = colors.background;
  ctx.stroke();

  // Clamped at both ends: a start time in the future would otherwise sweep the
  // progress arc past its own end and wrap around.
  const progress =
    expirationMs > 0 ? Math.min(1, Math.max(0, remaining / expirationMs)) : 0;

  // A zero length round capped subpath renders inconsistently across browsers
  if (progress > 0) {
    // Anchored at the right cap so the arc drains from left to right
    ctx.beginPath();
    ctx.arc(
      CENTER_X,
      CENTER_Y,
      RADIUS,
      START_ANGLE + SWEEP * (1 - progress),
      START_ANGLE + SWEEP,
    );
    ctx.strokeStyle = isFlashing ? colors.ringFlash : colors.ringActive;
    ctx.stroke();
  }

  const flooredRemaining = Math.floor(remaining);
  const seconds = Math.floor(flooredRemaining / 1000);
  const milliseconds = flooredRemaining % 1000;
  const text = `${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;

  ctx.font = NUMERALS_FONT;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = colors.text;
  ctx.fillText(text, CENTER_X, CONTENT_CENTER_Y);
};
