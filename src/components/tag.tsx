import React from "react";
import styled from "@emotion/styled";
import { Tag as AntdTag } from "antd";
import { withCss } from "./withCss";
import { styledPropGuard } from "~/utils/styled";

const ChipTag = styled(
  AntdTag,
  styledPropGuard,
)<{ $hasIcon: boolean }>(({ theme, $hasIcon }) => ({
  "&&": {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 28,
    boxSizing: "border-box",
    padding: $hasIcon ? "0 10px 0 8px" : "0 10px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: 0.3,
  },
  "&&.ant-tag-outlined": {
    color: theme.token.colorText,
    backgroundColor: "transparent",
    borderColor: theme.token.colorBorderSecondary,
  },
}));

type TagProps = Omit<React.ComponentProps<typeof ChipTag>, "$hasIcon">;

const IconAwareTag = (props: TagProps) => {
  return <ChipTag $hasIcon={props.icon != null} {...props} />;
};

export const Tag = withCss(IconAwareTag);
