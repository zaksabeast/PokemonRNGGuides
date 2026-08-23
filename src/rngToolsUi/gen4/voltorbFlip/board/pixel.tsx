type PixelProps = {
  x: number;
  y: number;
  fill: string;
};

export const Pixel = ({ x, y, fill }: PixelProps) => {
  return <rect x={x} y={y} width="1" height="1" fill={fill} />;
};
