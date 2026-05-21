import { Typography } from "antd";

type Props = {
  children: React.ReactNode;
};

export const Gist = ({ children }: Props) => {
  return <Typography.Text strong>{children}</Typography.Text>;
};
