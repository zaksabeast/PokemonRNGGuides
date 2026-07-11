import { colors } from "./colors";
import { Pixel } from "./pixel";

type TwoProps = {
  x: number;
  y: number;
};

export const Two = ({ x, y }: TwoProps) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <Pixel x={1} y={0} fill={colors.gray} />
      <Pixel x={2} y={0} fill={colors.white2} />
      <Pixel x={3} y={0} fill={colors.white2} />
      <Pixel x={4} y={0} fill={colors.white2} />
      <Pixel x={5} y={0} fill={colors.white2} />
      <Pixel x={6} y={0} fill={colors.gray} />

      <Pixel x={0} y={1} fill={colors.gray} />
      <Pixel x={1} y={1} fill={colors.white2} />
      <Pixel x={2} y={1} fill={colors.black1} />
      <Pixel x={3} y={1} fill={colors.black1} />
      <Pixel x={4} y={1} fill={colors.black1} />
      <Pixel x={5} y={1} fill={colors.black1} />
      <Pixel x={6} y={1} fill={colors.white2} />
      <Pixel x={7} y={1} fill={colors.gray} />

      <Pixel x={0} y={2} fill={colors.white2} />
      <Pixel x={1} y={2} fill={colors.black1} />
      <Pixel x={2} y={2} fill={colors.black1} />
      <Pixel x={3} y={2} fill={colors.black1} />
      <Pixel x={4} y={2} fill={colors.black1} />
      <Pixel x={5} y={2} fill={colors.black1} />
      <Pixel x={6} y={2} fill={colors.black1} />
      <Pixel x={7} y={2} fill={colors.white2} />

      <Pixel x={0} y={3} fill={colors.white2} />
      <Pixel x={1} y={3} fill={colors.black1} />
      <Pixel x={2} y={3} fill={colors.black1} />
      <Pixel x={3} y={3} fill={colors.white2} />
      <Pixel x={4} y={3} fill={colors.white2} />
      <Pixel x={5} y={3} fill={colors.black1} />
      <Pixel x={6} y={3} fill={colors.black1} />
      <Pixel x={7} y={3} fill={colors.white2} />

      <Pixel x={0} y={4} fill={colors.gray} />
      <Pixel x={1} y={4} fill={colors.white2} />
      <Pixel x={2} y={4} fill={colors.white2} />
      <Pixel x={3} y={4} fill={colors.white2} />
      <Pixel x={4} y={4} fill={colors.black1} />
      <Pixel x={5} y={4} fill={colors.black1} />
      <Pixel x={6} y={4} fill={colors.black1} />
      <Pixel x={7} y={4} fill={colors.gray} />

      <Pixel x={1} y={5} fill={colors.gray} />
      <Pixel x={2} y={5} fill={colors.white2} />
      <Pixel x={3} y={5} fill={colors.black1} />
      <Pixel x={4} y={5} fill={colors.black1} />
      <Pixel x={5} y={5} fill={colors.black1} />
      <Pixel x={6} y={5} fill={colors.white2} />
      <Pixel x={7} y={5} fill={colors.gray} />

      <Pixel x={0} y={6} fill={colors.gray} />
      <Pixel x={1} y={6} fill={colors.white2} />
      <Pixel x={2} y={6} fill={colors.black1} />
      <Pixel x={3} y={6} fill={colors.black1} />
      <Pixel x={4} y={6} fill={colors.black1} />
      <Pixel x={5} y={6} fill={colors.white2} />
      <Pixel x={6} y={6} fill={colors.white2} />
      <Pixel x={7} y={6} fill={colors.gray} />

      <Pixel x={0} y={7} fill={colors.white2} />
      <Pixel x={1} y={7} fill={colors.black1} />
      <Pixel x={2} y={7} fill={colors.black1} />
      <Pixel x={3} y={7} fill={colors.black1} />
      <Pixel x={4} y={7} fill={colors.black1} />
      <Pixel x={5} y={7} fill={colors.black1} />
      <Pixel x={6} y={7} fill={colors.black1} />
      <Pixel x={7} y={7} fill={colors.white2} />

      <Pixel x={0} y={8} fill={colors.white2} />
      <Pixel x={1} y={8} fill={colors.black1} />
      <Pixel x={2} y={8} fill={colors.black1} />
      <Pixel x={3} y={8} fill={colors.black1} />
      <Pixel x={4} y={8} fill={colors.black1} />
      <Pixel x={5} y={8} fill={colors.black1} />
      <Pixel x={6} y={8} fill={colors.black1} />
      <Pixel x={7} y={8} fill={colors.white2} />

      <Pixel x={0} y={9} fill={colors.gray} />
      <Pixel x={1} y={9} fill={colors.white2} />
      <Pixel x={2} y={9} fill={colors.white2} />
      <Pixel x={3} y={9} fill={colors.white2} />
      <Pixel x={4} y={9} fill={colors.white2} />
      <Pixel x={5} y={9} fill={colors.white2} />
      <Pixel x={6} y={9} fill={colors.white2} />
      <Pixel x={7} y={9} fill={colors.gray} />
    </g>
  );
};
