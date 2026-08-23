import styled from "@emotion/styled";
import { colors } from "./colors";
import { Connector } from "./connector";
import { Card } from "./card";
import { type VoltorbFlipCard } from "~/rngTools";

const BoardContainer = styled.svg({
  // This prevents clicking on the board to select nearby text in the page
  userSelect: "none",
});

type BaseBoardProps = {
  cards: (VoltorbFlipCard | null)[];
  onClickCard?: (index: number) => void;
};

export const VoltorbFlipBoard = ({ cards, onClickCard }: BaseBoardProps) => {
  return (
    <BoardContainer
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 168 169"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ userSelect: "none" }}
    >
      <g shape-rendering="crispEdges">
        {/* Background */}
        <rect width="168" height="169" fill={colors.boardBackground} />

        <g fill={colors.shadow}>
          {/* Border */}
          <rect width="168" height="3" />
          <rect y="166" width="168" height="3" />
          <rect y="3" width="3" height="163" />
          <rect x="165" y="3" width="3" height="163" />

          {/* Top left inset */}
          <rect x="3" y="3" width="1" height="1" />
          <rect x="4" y="3" width="2" height="1" />
          <rect x="3" y="4" width="1" height="2" />

          {/* Top right inset */}
          <rect x="164" y="3" width="1" height="1" />
          <rect x="162" y="3" width="2" height="1" />
          <rect x="164" y="4" width="1" height="2" />

          {/* Bottom left inset */}
          <rect x="3" y="165" width="1" height="1" />
          <rect x="4" y="165" width="2" height="1" />
          <rect x="3" y="163" width="1" height="2" />

          {/* Bottom right inset */}
          <rect x="164" y="165" width="1" height="1" />
          <rect x="162" y="165" width="2" height="1" />
          <rect x="164" y="163" width="1" height="2" />
        </g>

        <g>
          {cards.map((variant, index) => {
            const row = Math.floor(index / 5);
            const col = index % 5;
            const x = 6 + col * 32;
            const y = 6 + row * 32;
            const onClick =
              onClickCard != null ? () => onClickCard(index) : undefined;
            return (
              <Card
                key={index}
                x={x}
                y={y}
                variant={variant}
                onClick={onClick}
              />
            );
          })}
        </g>

        <g>
          <Connector vertical fill={colors.line.orange} x={16} y={33} />
          <Connector vertical fill={colors.line.green} x={48} y={33} />
          <Connector vertical fill={colors.line.yellow} x={80} y={33} />
          <Connector vertical fill={colors.line.blue} x={112} y={33} />
          <Connector vertical fill={colors.line.purple} x={144} y={33} />

          <Connector vertical fill={colors.line.orange} x={16} y={65} />
          <Connector vertical fill={colors.line.green} x={48} y={65} />
          <Connector vertical fill={colors.line.yellow} x={80} y={65} />
          <Connector vertical fill={colors.line.blue} x={112} y={65} />
          <Connector vertical fill={colors.line.purple} x={144} y={65} />

          <Connector vertical fill={colors.line.orange} x={16} y={97} />
          <Connector vertical fill={colors.line.green} x={48} y={97} />
          <Connector vertical fill={colors.line.yellow} x={80} y={97} />
          <Connector vertical fill={colors.line.blue} x={112} y={97} />
          <Connector vertical fill={colors.line.purple} x={144} y={97} />

          <Connector vertical fill={colors.line.orange} x={16} y={129} />
          <Connector vertical fill={colors.line.green} x={48} y={129} />
          <Connector vertical fill={colors.line.yellow} x={80} y={129} />
          <Connector vertical fill={colors.line.blue} x={112} y={129} />
          <Connector vertical fill={colors.line.purple} x={144} y={129} />
        </g>

        <g>
          <Connector fill={colors.line.orange} x={33} y={16} />
          <Connector fill={colors.line.orange} x={65} y={16} />
          <Connector fill={colors.line.orange} x={97} y={16} />
          <Connector fill={colors.line.orange} x={129} y={16} />

          <Connector fill={colors.line.green} x={33} y={48} />
          <Connector fill={colors.line.green} x={65} y={48} />
          <Connector fill={colors.line.green} x={97} y={48} />
          <Connector fill={colors.line.green} x={129} y={48} />

          <Connector fill={colors.line.yellow} x={33} y={80} />
          <Connector fill={colors.line.yellow} x={65} y={80} />
          <Connector fill={colors.line.yellow} x={97} y={80} />
          <Connector fill={colors.line.yellow} x={129} y={80} />

          <Connector fill={colors.line.blue} x={33} y={112} />
          <Connector fill={colors.line.blue} x={65} y={112} />
          <Connector fill={colors.line.blue} x={97} y={112} />
          <Connector fill={colors.line.blue} x={129} y={112} />

          <Connector fill={colors.line.purple} x={33} y={144} />
          <Connector fill={colors.line.purple} x={65} y={144} />
          <Connector fill={colors.line.purple} x={97} y={144} />
          <Connector fill={colors.line.purple} x={129} y={144} />
        </g>
      </g>
    </BoardContainer>
  );
};
