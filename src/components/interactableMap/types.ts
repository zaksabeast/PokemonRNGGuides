export type Point = {
  x: number;
  y: number;
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
