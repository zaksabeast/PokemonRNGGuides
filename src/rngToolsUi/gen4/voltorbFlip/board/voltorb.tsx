import { colors } from "./colors";
import { Pixel } from "./pixel";

type VoltorbProps = {
  x: number;
  y: number;
};

export const Voltorb = ({ x, y }: VoltorbProps) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <Pixel x={4} y={0} fill={colors.gray} />
      <Pixel x={5} y={0} fill={colors.white2} />
      <Pixel x={6} y={0} fill={colors.white2} />
      <Pixel x={7} y={0} fill={colors.white2} />
      <Pixel x={8} y={0} fill={colors.white2} />
      <Pixel x={9} y={0} fill={colors.white2} />
      <Pixel x={10} y={0} fill={colors.white2} />
      <Pixel x={11} y={0} fill={colors.gray} />

      <Pixel x={2} y={1} fill={colors.gray} />
      <Pixel x={3} y={1} fill={colors.white2} />
      <Pixel x={4} y={1} fill={colors.white2} />
      <Pixel x={5} y={1} fill={colors.black1} />
      <Pixel x={6} y={1} fill={colors.black1} />
      <Pixel x={7} y={1} fill={colors.black1} />
      <Pixel x={8} y={1} fill={colors.black1} />
      <Pixel x={9} y={1} fill={colors.black1} />
      <Pixel x={10} y={1} fill={colors.black1} />
      <Pixel x={11} y={1} fill={colors.white2} />
      <Pixel x={12} y={1} fill={colors.white2} />
      <Pixel x={13} y={1} fill={colors.gray} />

      <Pixel x={1} y={2} fill={colors.gray} />
      <Pixel x={2} y={2} fill={colors.white2} />
      <Pixel x={3} y={2} fill={colors.black1} />
      <Pixel x={4} y={2} fill={colors.black1} />
      <Pixel x={5} y={2} fill={colors.darkRed} />
      <Pixel x={6} y={2} fill={colors.orange} />
      <Pixel x={7} y={2} fill={colors.orange} />
      <Pixel x={8} y={2} fill={colors.orange} />
      <Pixel x={9} y={2} fill={colors.orange} />
      <Pixel x={10} y={2} fill={colors.darkRed} />
      <Pixel x={11} y={2} fill={colors.black1} />
      <Pixel x={12} y={2} fill={colors.black1} />
      <Pixel x={13} y={2} fill={colors.white2} />
      <Pixel x={14} y={2} fill={colors.gray} />

      <Pixel x={1} y={3} fill={colors.white2} />
      <Pixel x={2} y={3} fill={colors.black1} />
      <Pixel x={3} y={3} fill={colors.black1} />
      <Pixel x={4} y={3} fill={colors.orange} />
      <Pixel x={5} y={3} fill={colors.orange} />
      <Pixel x={6} y={3} fill={colors.orange} />
      <Pixel x={7} y={3} fill={colors.orange} />
      <Pixel x={8} y={3} fill={colors.orange} />
      <Pixel x={9} y={3} fill={colors.orange} />
      <Pixel x={10} y={3} fill={colors.orange} />
      <Pixel x={11} y={3} fill={colors.orange} />
      <Pixel x={12} y={3} fill={colors.black1} />
      <Pixel x={13} y={3} fill={colors.black1} />
      <Pixel x={14} y={3} fill={colors.white2} />

      <Pixel x={0} y={4} fill={colors.gray} />
      <Pixel x={1} y={4} fill={colors.white2} />
      <Pixel x={2} y={4} fill={colors.black1} />
      <Pixel x={3} y={4} fill={colors.orange} />
      <Pixel x={4} y={4} fill={colors.orange} />
      <Pixel x={5} y={4} fill={colors.orange} />
      <Pixel x={6} y={4} fill={colors.orange} />
      <Pixel x={7} y={4} fill={colors.orange} />
      <Pixel x={8} y={4} fill={colors.orange} />
      <Pixel x={9} y={4} fill={colors.orange} />
      <Pixel x={10} y={4} fill={colors.orange} />
      <Pixel x={11} y={4} fill={colors.orange} />
      <Pixel x={12} y={4} fill={colors.orange} />
      <Pixel x={13} y={4} fill={colors.black1} />
      <Pixel x={14} y={4} fill={colors.white2} />
      <Pixel x={15} y={4} fill={colors.gray} />

      <Pixel x={0} y={5} fill={colors.white2} />
      <Pixel x={1} y={5} fill={colors.black1} />
      <Pixel x={2} y={5} fill={colors.darkRed} />
      <Pixel x={3} y={5} fill={colors.black1} />
      <Pixel x={4} y={5} fill={colors.orange} />
      <Pixel x={5} y={5} fill={colors.orange} />
      <Pixel x={6} y={5} fill={colors.orange} />
      <Pixel x={7} y={5} fill={colors.orange} />
      <Pixel x={8} y={5} fill={colors.orange} />
      <Pixel x={9} y={5} fill={colors.orange} />
      <Pixel x={10} y={5} fill={colors.orange} />
      <Pixel x={11} y={5} fill={colors.orange} />
      <Pixel x={12} y={5} fill={colors.black1} />
      <Pixel x={13} y={5} fill={colors.darkRed} />
      <Pixel x={14} y={5} fill={colors.black1} />
      <Pixel x={15} y={5} fill={colors.white2} />

      <Pixel x={0} y={6} fill={colors.white2} />
      <Pixel x={1} y={6} fill={colors.black1} />
      <Pixel x={2} y={6} fill={colors.orange} />
      <Pixel x={3} y={6} fill={colors.white2} />
      <Pixel x={4} y={6} fill={colors.black1} />
      <Pixel x={5} y={6} fill={colors.orange} />
      <Pixel x={6} y={6} fill={colors.black1} />
      <Pixel x={7} y={6} fill={colors.orange} />
      <Pixel x={8} y={6} fill={colors.orange} />
      <Pixel x={9} y={6} fill={colors.black1} />
      <Pixel x={10} y={6} fill={colors.orange} />
      <Pixel x={11} y={6} fill={colors.black1} />
      <Pixel x={12} y={6} fill={colors.white2} />
      <Pixel x={13} y={6} fill={colors.orange} />
      <Pixel x={14} y={6} fill={colors.black1} />
      <Pixel x={15} y={6} fill={colors.white2} />

      <Pixel x={0} y={7} fill={colors.white2} />
      <Pixel x={1} y={7} fill={colors.black1} />
      <Pixel x={2} y={7} fill={colors.orange} />
      <Pixel x={3} y={7} fill={colors.white2} />
      <Pixel x={4} y={7} fill={colors.white2} />
      <Pixel x={5} y={7} fill={colors.black1} />
      <Pixel x={6} y={7} fill={colors.black1} />
      <Pixel x={7} y={7} fill={colors.orange} />
      <Pixel x={8} y={7} fill={colors.orange} />
      <Pixel x={9} y={7} fill={colors.black1} />
      <Pixel x={10} y={7} fill={colors.black1} />
      <Pixel x={11} y={7} fill={colors.white2} />
      <Pixel x={12} y={7} fill={colors.white2} />
      <Pixel x={13} y={7} fill={colors.orange} />
      <Pixel x={14} y={7} fill={colors.black1} />
      <Pixel x={15} y={7} fill={colors.white2} />

      <Pixel x={0} y={8} fill={colors.white2} />
      <Pixel x={1} y={8} fill={colors.black1} />
      <Pixel x={2} y={8} fill={colors.orange} />
      <Pixel x={3} y={8} fill={colors.white2} />
      <Pixel x={4} y={8} fill={colors.white2} />
      <Pixel x={5} y={8} fill={colors.black1} />
      <Pixel x={6} y={8} fill={colors.white2} />
      <Pixel x={7} y={8} fill={colors.orange} />
      <Pixel x={8} y={8} fill={colors.orange} />
      <Pixel x={9} y={8} fill={colors.white2} />
      <Pixel x={10} y={8} fill={colors.black1} />
      <Pixel x={11} y={8} fill={colors.white2} />
      <Pixel x={12} y={8} fill={colors.white2} />
      <Pixel x={13} y={8} fill={colors.orange} />
      <Pixel x={14} y={8} fill={colors.black1} />
      <Pixel x={15} y={8} fill={colors.white2} />

      <Pixel x={0} y={9} fill={colors.white2} />
      <Pixel x={1} y={9} fill={colors.black1} />
      <Pixel x={2} y={9} fill={colors.white2} />
      <Pixel x={3} y={9} fill={colors.orange} />
      <Pixel x={4} y={9} fill={colors.orange} />
      <Pixel x={5} y={9} fill={colors.orange} />
      <Pixel x={6} y={9} fill={colors.orange} />
      <Pixel x={7} y={9} fill={colors.orange} />
      <Pixel x={8} y={9} fill={colors.orange} />
      <Pixel x={9} y={9} fill={colors.orange} />
      <Pixel x={10} y={9} fill={colors.orange} />
      <Pixel x={11} y={9} fill={colors.orange} />
      <Pixel x={12} y={9} fill={colors.orange} />
      <Pixel x={13} y={9} fill={colors.white2} />
      <Pixel x={14} y={9} fill={colors.black1} />
      <Pixel x={15} y={9} fill={colors.white2} />

      <Pixel x={0} y={10} fill={colors.white2} />
      <Pixel x={1} y={10} fill={colors.black1} />
      <Pixel x={2} y={10} fill={colors.gray} />
      <Pixel x={3} y={10} fill={colors.white2} />
      <Pixel x={4} y={10} fill={colors.white2} />
      <Pixel x={5} y={10} fill={colors.orange} />
      <Pixel x={6} y={10} fill={colors.orange} />
      <Pixel x={7} y={10} fill={colors.orange} />
      <Pixel x={8} y={10} fill={colors.orange} />
      <Pixel x={9} y={10} fill={colors.orange} />
      <Pixel x={10} y={10} fill={colors.orange} />
      <Pixel x={11} y={10} fill={colors.white2} />
      <Pixel x={12} y={10} fill={colors.white2} />
      <Pixel x={13} y={10} fill={colors.gray} />
      <Pixel x={14} y={10} fill={colors.black1} />
      <Pixel x={15} y={10} fill={colors.white2} />

      <Pixel x={0} y={11} fill={colors.gray} />
      <Pixel x={1} y={11} fill={colors.white2} />
      <Pixel x={2} y={11} fill={colors.black1} />
      <Pixel x={3} y={11} fill={colors.white2} />
      <Pixel x={4} y={11} fill={colors.white2} />
      <Pixel x={5} y={11} fill={colors.white2} />
      <Pixel x={6} y={11} fill={colors.white2} />
      <Pixel x={7} y={11} fill={colors.white2} />
      <Pixel x={8} y={11} fill={colors.white2} />
      <Pixel x={9} y={11} fill={colors.white2} />
      <Pixel x={10} y={11} fill={colors.white2} />
      <Pixel x={11} y={11} fill={colors.white2} />
      <Pixel x={12} y={11} fill={colors.white2} />
      <Pixel x={13} y={11} fill={colors.black1} />
      <Pixel x={14} y={11} fill={colors.white2} />
      <Pixel x={15} y={11} fill={colors.gray} />

      <Pixel x={1} y={12} fill={colors.white2} />
      <Pixel x={2} y={12} fill={colors.black1} />
      <Pixel x={3} y={12} fill={colors.black1} />
      <Pixel x={4} y={12} fill={colors.white2} />
      <Pixel x={5} y={12} fill={colors.white2} />
      <Pixel x={6} y={12} fill={colors.white2} />
      <Pixel x={7} y={12} fill={colors.white2} />
      <Pixel x={8} y={12} fill={colors.white2} />
      <Pixel x={9} y={12} fill={colors.white2} />
      <Pixel x={10} y={12} fill={colors.white2} />
      <Pixel x={11} y={12} fill={colors.white2} />
      <Pixel x={12} y={12} fill={colors.black1} />
      <Pixel x={13} y={12} fill={colors.black1} />
      <Pixel x={14} y={12} fill={colors.white2} />

      <Pixel x={1} y={13} fill={colors.gray} />
      <Pixel x={2} y={13} fill={colors.white2} />
      <Pixel x={3} y={13} fill={colors.black1} />
      <Pixel x={4} y={13} fill={colors.black1} />
      <Pixel x={5} y={13} fill={colors.gray} />
      <Pixel x={6} y={13} fill={colors.white2} />
      <Pixel x={7} y={13} fill={colors.white2} />
      <Pixel x={8} y={13} fill={colors.white2} />
      <Pixel x={9} y={13} fill={colors.white2} />
      <Pixel x={10} y={13} fill={colors.gray} />
      <Pixel x={11} y={13} fill={colors.black1} />
      <Pixel x={12} y={13} fill={colors.black1} />
      <Pixel x={13} y={13} fill={colors.white2} />
      <Pixel x={14} y={13} fill={colors.gray} />

      <Pixel x={2} y={14} fill={colors.gray} />
      <Pixel x={3} y={14} fill={colors.white2} />
      <Pixel x={4} y={14} fill={colors.white2} />
      <Pixel x={5} y={14} fill={colors.black1} />
      <Pixel x={6} y={14} fill={colors.black1} />
      <Pixel x={7} y={14} fill={colors.black1} />
      <Pixel x={8} y={14} fill={colors.black1} />
      <Pixel x={9} y={14} fill={colors.black1} />
      <Pixel x={10} y={14} fill={colors.black1} />
      <Pixel x={11} y={14} fill={colors.white2} />
      <Pixel x={12} y={14} fill={colors.white2} />
      <Pixel x={13} y={14} fill={colors.gray} />

      <Pixel x={4} y={15} fill={colors.gray} />
      <Pixel x={5} y={15} fill={colors.white2} />
      <Pixel x={6} y={15} fill={colors.white2} />
      <Pixel x={7} y={15} fill={colors.white2} />
      <Pixel x={8} y={15} fill={colors.white2} />
      <Pixel x={9} y={15} fill={colors.white2} />
      <Pixel x={10} y={15} fill={colors.white2} />
      <Pixel x={11} y={15} fill={colors.gray} />
    </g>
  );
};
