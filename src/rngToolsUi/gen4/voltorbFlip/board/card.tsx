import styled from "@emotion/styled";
import { colors } from "./colors";
import { One } from "./one";
import { Two } from "./two";
import { Three } from "./three";
import { Voltorb } from "./voltorb";
import { type VoltorbFlipCard } from "~/rngTools";

type CardProps = {
  x: number;
  y: number;
  variant: VoltorbFlipCard | null;
  onClick?: () => void;
};

const CardContainer = styled.g<{ onClick?: () => void }>(({ onClick }) => ({
  cursor: onClick != null ? "pointer" : "default",
}));

export const Card = ({ x, y, variant, onClick }: CardProps) => {
  return (
    <CardContainer transform={`translate(${x}, ${y})`} onClick={onClick}>
      {/* Bottom shadow */}
      <path fill={colors.shadow} d="M0 27H28V28H27V29H1V28H0Z" />

      {/* Outer border */}
      <path fill={colors.white1} d="M1 0H27 V1H28 V27H27 V28H1 V27H0 V1H1Z" />

      {/* Middle border */}
      <rect x="2" y="2" width="24" height="24" fill={colors.black2} />

      {/* Inner border */}
      <rect x="3" y="3" width="22" height="22" fill={colors.darkRed} />

      {/* Background color of the card */}
      <rect x="4" y="4" width="20" height="20" fill={colors.cardBackground} />

      {variant === "One" && <One x={11} y={9} />}
      {variant === "Two" && <Two x={10} y={9} />}
      {variant === "Three" && <Three x={10} y={9} />}
      {variant === "Voltorb" && <Voltorb x={6} y={6} />}
    </CardContainer>
  );
};
