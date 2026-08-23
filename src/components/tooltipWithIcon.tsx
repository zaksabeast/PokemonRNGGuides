import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip, TooltipProps } from "antd";
import React from "react";

type Props = {
  children: React.ReactNode;
  title: TooltipProps["title"];
};

export const TooltipWithIcon = ({ children, title }: Props) => {
  return (
    <Tooltip title={title}>
      {children} <QuestionCircleOutlined />
    </Tooltip>
  );
};
