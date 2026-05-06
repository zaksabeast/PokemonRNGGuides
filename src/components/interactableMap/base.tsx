import React from "react";
import { noop } from "lodash-es";
import styled from "@emotion/styled";
import { Flex } from "~/components";
import type { Point, MapFeature } from "./types";

const ImageContainer = styled(Flex)({
  imageRendering: "pixelated",
  position: "relative",
});

const Image = styled.img({
  width: "100%",
  position: "relative",
});

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

export type BaseMapProps = {
  src: string;
  alt: string;
  features?: MapFeature[];
  debug?: boolean;
};

export const BaseMap = ({
  src,
  alt,
  features = [],
  debug = false,
}: BaseMapProps) => {
  const [points, setPoints] = React.useState<Point[]>([]);

  // Press the 'c' key to copy the current mouse position to the clipboard in the format { x: number, y: number }
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!debug) {
        return;
      }

      if (event.key === "c") {
        setPoints([]);
      }

      if (event.key === "p") {
        const [head, ...tail] = points;
        setPoints(tail);
        navigator.clipboard.writeText(JSON.stringify(head));
      }

      if (event.key === "v") {
        setPoints([]);
        const copied = `<Polygon $points={${JSON.stringify(points)}} />`;
        navigator.clipboard.writeText(copied);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [debug, setPoints, points]);

  const handleClick = debug
    ? (event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const mouseX = ((event.clientX - rect.left) / rect.width) * 100;
        const mouseY = ((event.clientY - rect.top) / rect.height) * 100;
        setPoints((prev) => [...prev, { x: round(mouseX), y: round(mouseY) }]);
      }
    : noop;

  return (
    <>
      <Flex justify="center">
        <ImageContainer onClick={handleClick}>
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
        </ImageContainer>
      </Flex>
      {debug && (
        <Flex>
          {points.map((coord, index) => (
            <div key={index}>{`{ x: ${coord.x}, y: ${coord.y} },`}</div>
          ))}
        </Flex>
      )}
    </>
  );
};
