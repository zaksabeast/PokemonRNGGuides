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

const _StyledButton = withCss(AntdButton);

const StyledButton = styled(_StyledButton)({
  ".ant-btn-icon": {
    display: "flex",
  },
});

type ButtonProps = tst.O.Overwrite<
  { trackerId: string } & React.ComponentProps<typeof StyledButton>,
  { color: Color }
>;

export const Button = ({
  trackerId,
  id: _id,
  onClick,
  color,
  ...props
}: ButtonProps) => {
  const id = _id ?? trackerId;
  const trackedClick = React.useCallback<tst.U.NonNullable<typeof onClick>>(
    (event) => {
      track("Button clicked", { id: trackerId });
      onClick?.(event);
    },
    [trackerId, onClick],
  );
  return (
    <StyledButton
      id={id}
      onClick={trackedClick}
      size="large"
      // @ts-expect-error styled doesn't overwrite prop types correctly when shouldForwardProp prevents a passthrough
      color={color}
      {...props}
    />
  );
};

const _BaseButton = withCss(
  styled(AntdButton)({
    whiteSpace: "unset",
    padding: "unset",
    border: "unset",
    background: "unset",
    textAlign: "unset",
    width: "unset",
    height: "unset",
    boxShadow: "unset",
  }),
);

type BaseButtonProps = { trackerId: string } & React.ComponentProps<
  typeof _BaseButton
>;

export const BaseButton = ({
  trackerId,
  id: _id,
  onClick,
  ...props
}: BaseButtonProps) => {
  const id = _id ?? trackerId;
  const trackedClick = React.useCallback<tst.U.NonNullable<typeof onClick>>(
    (event) => {
      track("Button clicked", { id: trackerId });
      onClick?.(event);
    },
    [trackerId, onClick],
  );
  return <_BaseButton {...props} id={id} onClick={trackedClick} />;
};
