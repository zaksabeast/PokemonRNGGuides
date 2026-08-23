import { colors } from "./colors";

type ConnectorProps = {
  x: number;
  y: number;
  fill: string;
  vertical?: boolean;
};

const VerticalConnector = ({ fill, x, y }: ConnectorProps) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width="8" height="6" fill={colors.white1} />
      <rect x="2" width="4" height="6" fill={fill} />
    </g>
  );
};

const HorizontalConnector = ({ fill, x, y }: ConnectorProps) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="1" y="8" width="4" height="1" fill={colors.shadow} />
      <rect width="6" height="8" fill={colors.white1} />
      <rect y="2" width="6" height="4" fill={fill} />
    </g>
  );
};

export const Connector = (props: ConnectorProps) => {
  if (props.vertical) {
    return <VerticalConnector {...props} />;
  }

  return <HorizontalConnector {...props} />;
};
