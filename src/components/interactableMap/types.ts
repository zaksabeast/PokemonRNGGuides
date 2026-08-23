export type Point = {
  x: number;
  y: number;
};

export type MapCaptureMode = "point" | "polygon";

export type MapCapturedGeometry =
  | {
      type: "point";
      point: Point;
    }
  | {
      type: "polygon";
      points: Point[];
    };

export type MapCaptureConfig = {
  defaultMode?: MapCaptureMode;
};

export type MapCaptureState = {
  mode: MapCaptureMode;
  pointDraft: Point | null;
  polygonPoints: Point[];
  isPolygonClosed: boolean;
};

export type MapCaptureRenderProps = MapCaptureState & {
  onCapturePoint: (point: Point) => void;
};

export type MapFeature =
  | {
      type: "polygon";
      points: Point[];
      node: React.ReactNode;
    }
  | {
      type: "point";
      point: Point;
      node: React.ReactNode;
    };
