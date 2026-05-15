import React from "react";
import styled from "@emotion/styled";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { BaseMap, type BaseMapProps } from "./base";
import { Flex } from "../flex";
import { Controls } from "./controls";
import { MapContext } from "./context";
import type {
  MapCaptureConfig,
  MapCaptureMode,
  MapCaptureRenderProps,
  Point,
} from "./types";
import { isPolygonValid } from "./utils";
import { CaptureControls } from "./captureControls";

const MapContainer = styled.div({
  position: "relative",
});

type SharedMapProps = Omit<BaseMapProps, "capture">;

export type InteractableMapProps = SharedMapProps & {
  debug?: boolean;
  capture?: MapCaptureConfig;
};

export const InteractableMap = ({
  debug = false,
  capture,
  ...props
}: InteractableMapProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const captureConfig: MapCaptureConfig | undefined =
    capture ?? (debug ? {} : undefined);
  const captureEnabled = captureConfig != null;
  const [mode, setMode] = React.useState<MapCaptureMode>(
    captureConfig?.defaultMode ?? "point",
  );
  const [pointDraft, setPointDraft] = React.useState<Point | null>(null);
  const [polygonPoints, setPolygonPoints] = React.useState<Point[]>([]);
  const [isPolygonClosed, setIsPolygonClosed] = React.useState(false);

  React.useEffect(() => {
    if (captureConfig?.defaultMode != null) {
      setMode(captureConfig.defaultMode);
    }
  }, [captureConfig?.defaultMode]);

  const handleCapturePoint = (nextPoint: Point) => {
    if (mode === "point") {
      setPointDraft(nextPoint);
      return;
    }

    setPolygonPoints((prev) =>
      isPolygonClosed ? [nextPoint] : [...prev, nextPoint],
    );
    setIsPolygonClosed(false);
  };

  const handleUndo = () => {
    if (mode === "point") {
      setPointDraft(null);
      return;
    }

    setIsPolygonClosed(false);
    setPolygonPoints((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (mode === "point") {
      setPointDraft(null);
      return;
    }

    setPolygonPoints([]);
    setIsPolygonClosed(false);
  };

  const handleCompletePolygon = () => {
    if (isPolygonValid(polygonPoints)) {
      setIsPolygonClosed(true);
    }
  };

  const captureProps: MapCaptureRenderProps | null = captureEnabled
    ? {
        mode,
        pointDraft,
        polygonPoints,
        isPolygonClosed,
        onCapturePoint: handleCapturePoint,
      }
    : null;

  const captureControls = captureEnabled ? (
    <CaptureControls
      mode={mode}
      pointDraft={pointDraft}
      polygonPoints={polygonPoints}
      isPolygonClosed={isPolygonClosed}
      onSelectMode={setMode}
      onUndo={handleUndo}
      onClear={handleClear}
      onCompletePolygon={handleCompletePolygon}
    />
  ) : null;

  return (
    <Flex vertical gap={16}>
      <MapContainer ref={ref}>
        <MapContext.Provider value={{ ref }}>
          <TransformWrapper
            minScale={1}
            maxScale={8}
            doubleClick={{ disabled: true }}
            wheel={{ step: 0.1 }}
          >
            <Controls />
            <TransformComponent
              wrapperStyle={{ width: "100%", height: "100%" }}
              contentStyle={{ width: "100%" }}
            >
              <BaseMap {...props} capture={captureProps} />
            </TransformComponent>
          </TransformWrapper>
        </MapContext.Provider>
      </MapContainer>
      {captureControls}
    </Flex>
  );
};
