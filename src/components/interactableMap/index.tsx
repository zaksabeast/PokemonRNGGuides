import React from "react";
import { Skeleton } from "antd";
import { type InteractableMapProps } from "./interactableMap";
import styled from "@emotion/styled";

export { MapTooltip } from "./tooltip";
export { MapGlow } from "./glow";
export { MapKeepScale } from "./keepScale";
export { MapMarker } from "./marker";
export type * from "./types";

const MapSkeleton = styled(Skeleton.Node)({
  "&&& .ant-skeleton-node": {
    width: "100%",
    height: 400,
  },
});

const LazyMap = React.lazy(() =>
  import("./interactableMap").then((mod) => ({
    default: mod.InteractableMap,
  })),
);

export const InteractableMap = (props: InteractableMapProps) => {
  return (
    <React.Suspense fallback={<MapSkeleton />}>
      <LazyMap {...props} />
    </React.Suspense>
  );
};
