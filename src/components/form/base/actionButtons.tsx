import styled from "@emotion/styled";
import { type Theme } from "@emotion/react";
import { Button, type ButtonProps } from "~/components/button";

const ICON_SIZE = 20;

const pillStyles = (theme: Theme) => ({
  ...theme.typography.titleMedium,
  height: theme.size.button,
  [theme.mediaQueries.dense]: {
    height: theme.size.dense.button,
  },
  paddingInline: 24,
  gap: 8,
  borderRadius: theme.shape.full,
  boxShadow: "none",
  ".ant-btn-icon": {
    fontSize: ICON_SIZE,
  },
  [theme.mediaQueries.down("mobile")]: {
    width: "100%",
  },
});

const StyledPrimaryButton = styled(Button)(({ theme }) => ({
  "&&&&.ant-btn-primary": pillStyles(theme),
}));

const StyledOutlinedButton = styled(Button)(({ theme }) => ({
  "&&&&.ant-btn-default": {
    ...pillStyles(theme),
    color: theme.token.colorText,
    backgroundColor: "transparent",
    borderColor: theme.token.colorBorder,
    ":hover": {
      backgroundColor: theme.token.colorStateLayerHover,
    },
    ":active": {
      backgroundColor: theme.token.colorStateLayerPressed,
    },
  },
}));

type ActionButtonProps = Omit<ButtonProps, "type">;

/** The one main action of a tool, like Generate */
export const PrimaryButton = (props: ActionButtonProps) => (
  <StyledPrimaryButton {...props} type="primary" />
);

/** Secondary actions next to the primary one, like Cancel or Reset */
export const OutlinedButton = (props: ActionButtonProps) => (
  <StyledOutlinedButton {...props} type="default" />
);
