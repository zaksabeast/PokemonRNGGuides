import React from "react";

import {
  // This is the only file where using the antd Button is okay
  // eslint-disable-next-line no-restricted-imports
  Button as AntdButton,
} from "antd";
import { Color } from "@emotion/react";
import styled from "@emotion/styled";
import { withCss } from "./withCss";
import * as tst from "ts-toolbelt";
import { track } from "~/analytics";
import { useSize } from "~/theme/size";

const _StyledButton = withCss(AntdButton);

const StyledButton = styled(_StyledButton)(({ theme }) => ({
  "&&&.ant-btn-primary": {
    // colorPrimaryActive is used as resting text because it has
    // enough contrast on colorPrimaryBg in both light and dark mode.
    color: theme.token.colorPrimaryActive,
    backgroundColor: theme.token.colorPrimaryBg,
    ":hover": {
      backgroundColor: theme.token.colorPrimaryBgHover,
    },
    // Must come after :hover so disabled buttons don't change on hover.
    "&:disabled, &.ant-btn-disabled": {
      color: theme.token.colorTextDisabled,
      backgroundColor: theme.token.colorBgContainerDisabled,
    },
  },
  ".ant-btn-icon": {
    display: "flex",
  },
}));

export type ButtonProps = tst.O.Overwrite<
  { trackerId: string } & React.ComponentProps<typeof StyledButton>,
  { color: Color }
>;

export const Button = ({
  trackerId,
  id: _id,
  onClick,
  color,
  shape: _shape,
  icon,
  children,
  ...props
}: ButtonProps) => {
  const id = _id ?? trackerId;
  const size = useSize();
  const trackedClick: tst.U.NonNullable<typeof onClick> = (event) => {
    track("Button clicked", { id: trackerId });
    onClick?.(event);
  };

  const shape =
    _shape == null && icon != null && children == null ? "circle" : _shape;

  return (
    <StyledButton
      id={id}
      onClick={trackedClick}
      size={size}
      // @ts-expect-error styled doesn't overwrite prop types correctly when shouldForwardProp prevents a passthrough
      color={color}
      icon={icon}
      shape={shape}
      {...props}
    >
      {children}
    </StyledButton>
  );
};
