import { Flex as AntdFlex } from "antd";
import { withCss } from "./withCss";
import { Typography } from "antd";

type Props = {
  children: React.ReactNode;
};

export const Gist = ({ children }: Props) => {
  return <Typography.Text strong>{children}</Typography.Text>;
};

export const Flex = withCss(AntdFlex);
