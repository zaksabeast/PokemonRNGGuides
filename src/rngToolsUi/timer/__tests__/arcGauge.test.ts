import { describe, expect, test } from "bun:test";
import { ARC_GEOMETRY, ARC_HEIGHT, ARC_WIDTH } from "../arcGauge";

const START = { x: 30, y: 178 };
const END = { x: 250, y: 178 };

const pointAt = (angle: number) => ({
  x: ARC_GEOMETRY.centerX + ARC_GEOMETRY.radius * Math.cos(angle),
  y: ARC_GEOMETRY.centerY + ARC_GEOMETRY.radius * Math.sin(angle),
});

describe("arc geometry", () => {
  test("resolves the center of the design's arc", () => {
    expect(ARC_GEOMETRY.centerX).toBeCloseTo(140, 5);
    expect(ARC_GEOMETRY.centerY).toBeCloseTo(135.29169, 4);
    expect(ARC_GEOMETRY.radius).toBe(118);
  });

  test("starts at the arc's left endpoint", () => {
    const start = pointAt(ARC_GEOMETRY.startAngle);
    expect(start.x).toBeCloseTo(START.x, 4);
    expect(start.y).toBeCloseTo(START.y, 4);
  });

  test("sweeps clockwise to the arc's right endpoint", () => {
    const end = pointAt(ARC_GEOMETRY.startAngle + ARC_GEOMETRY.sweep);
    expect(end.x).toBeCloseTo(END.x, 4);
    expect(end.y).toBeCloseTo(END.y, 4);
  });

  test("sweeps 222.44 degrees, so the gap sits at the bottom", () => {
    expect((ARC_GEOMETRY.sweep * 180) / Math.PI).toBeCloseTo(222.44, 2);
  });

  test("stays inside the box once round caps overhang", () => {
    const overhang = ARC_GEOMETRY.lineWidth / 2;
    const { centerX, centerY, radius } = ARC_GEOMETRY;
    expect(centerX - radius - overhang).toBeGreaterThan(0);
    expect(centerX + radius + overhang).toBeLessThan(ARC_WIDTH);
    expect(centerY - radius - overhang).toBeGreaterThan(0);
    expect(START.y + overhang).toBeLessThan(ARC_HEIGHT);
  });
});
