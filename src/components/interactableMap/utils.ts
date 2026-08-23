import type { Point } from "./types";

export const isPolygonValid = (points: Point[]) => points.length >= 3;
