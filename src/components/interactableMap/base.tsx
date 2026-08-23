import React from "react";
import styled from "@emotion/styled";
import { Flex } from "../flex";
import type { Point, MapFeature, MapCaptureRenderProps } from "./types";
import { styledPropGuard } from "~/utils/styled";

const ImageContainer = styled(
  Flex,
  styledPropGuard,
)<{ $cursor?: string }>(({ $cursor }) => ({
  imageRendering: "pixelated",
  position: "relative",
  cursor: $cursor,
}));

const Image = styled.img({
  width: "100%",
  position: "relative",
});

const DraftOverlay = styled.svg({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  overflow: "visible",
});

const DraftPoint = styled(
  "circle",
  styledPropGuard,
)<{ $first?: boolean }>(({ theme, $first }) => ({
  fill: $first ? theme.token.colorSuccess : theme.token.colorWarning,
  stroke: theme.token.colorWhite,
  strokeWidth: 0.35,
}));

const DraftPolyline = styled.polyline(({ theme }) => ({
  fill: "none",
  stroke: theme.token.colorPrimary,
  strokeWidth: 0.5,
  strokeLinejoin: "round",
  strokeLinecap: "round",
}));

const DraftPolygon = styled.polygon(({ theme }) => ({
  fill: theme.token.colorPrimaryBg,
  fillOpacity: 0.75,
  stroke: theme.token.colorPrimary,
  strokeWidth: 0.5,
  strokeLinejoin: "round",
}));

const Polygon = styled.div<{
  $points: Point[] | Readonly<Point[]>;
}>(({ $points }) => {
  const minX = Math.min(...$points.map((coord) => coord.x));
  const minY = Math.min(...$points.map((coord) => coord.y));
  const maxX = Math.max(...$points.map((coord) => coord.x));
  const maxY = Math.max(...$points.map((coord) => coord.y));
  const width = maxX - minX;
  const height = maxY - minY;

  // Adjust coordinates to be relative to the element's own coordinate system (0-100%)
  const adjustedPoints = $points.map((point) => ({
    x: ((point.x - minX) / width) * 100,
    y: ((point.y - minY) / height) * 100,
  }));
  const pointsString = adjustedPoints.map((point) => `${point.x}% ${point.y}%`);

  return {
    position: "absolute",
    left: `${minX}%`,
    top: `${minY}%`,
    width: `${width}%`,
    height: `${height}%`,
    clipPath: `polygon(${pointsString.join(",")})`,
    overflow: "hidden",
  };
});

const MountPoint = styled.div<{ $point: Point }>(({ $point }) => ({
  position: "absolute",
  left: `${$point.x}%`,
  top: `${$point.y}%`,
  transform: "translate(-50%, -50%)",
  width: 0,
  display: "flex",
  justifyContent: "center",
}));

const round = (num: number) => Math.round(num * 10) / 10;

const formatSvgPoints = (points: Point[]) =>
  points.map((point) => `${point.x},${point.y}`).join(" ");

export type BaseMapProps = {
  src: string;
  alt: string;
  features?: MapFeature[];
  capture?: MapCaptureRenderProps | null;
};

export const BaseMap = ({ src, alt, features = [], capture }: BaseMapProps) => {
  const captureEnabled = capture != null;

  const handleClick = (event: React.MouseEvent) => {
    if (!captureEnabled) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((event.clientY - rect.top) / rect.height) * 100;
    const nextPoint = { x: round(mouseX), y: round(mouseY) };

    capture.onCapturePoint(nextPoint);
  };
  const draftPoints =
    capture?.mode === "point"
      ? capture.pointDraft == null
        ? []
        : [capture.pointDraft]
      : (capture?.polygonPoints ?? []);

  return (
    <Flex justify="center">
      <ImageContainer
        onClick={handleClick}
        $cursor={captureEnabled ? "crosshair" : undefined}
      >
        <Image src={src} alt={alt} />

        {features.map((feature) => {
          if (feature.type === "point") {
            return (
              <MountPoint
                key={`${feature.point.x}-${feature.point.y}`}
                $point={feature.point}
              >
                {feature.node}
              </MountPoint>
            );
          }

          const key = feature.points
            .map((point) => `${point.x}-${point.y}`)
            .join(",");
          return (
            <Polygon key={key} $points={feature.points}>
              {feature.node}
            </Polygon>
          );
        })}

        {captureEnabled && draftPoints.length > 0 && (
          <DraftOverlay viewBox="0 0 100 100" preserveAspectRatio="none">
            {capture.mode === "polygon" &&
              draftPoints.length >= 2 &&
              !capture.isPolygonClosed && (
                <DraftPolyline points={formatSvgPoints(draftPoints)} />
              )}
            {capture.mode === "polygon" &&
              draftPoints.length >= 3 &&
              capture.isPolygonClosed && (
                <DraftPolygon points={formatSvgPoints(draftPoints)} />
              )}
            {draftPoints.map((point, index) => (
              <DraftPoint
                $first={index === 0}
                key={`${point.x}-${point.y}-${index}`}
                cx={point.x}
                cy={point.y}
                r={capture.mode === "point" ? 1.3 : 0.9}
              />
            ))}
          </DraftOverlay>
        )}
      </ImageContainer>
    </Flex>
  );
};
