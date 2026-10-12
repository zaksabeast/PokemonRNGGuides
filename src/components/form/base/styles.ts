import { type CSSObject, type Theme } from "@emotion/react";

export const focusRing = (color: string) => ({
  borderColor: color,
  // Thickens the 1px border to 2px without moving the text
  boxShadow: `inset 0 0 0 1px ${color}`,
});

export const textFieldStyles = (theme: Theme): CSSObject => ({
  font: "inherit",
  ...theme.typography.bodyLarge,
  display: "block",
  width: "100%",
  minWidth: 0,
  minHeight: theme.size.field,
  [theme.mediaQueries.dense]: {
    minHeight: theme.size.dense.field,
  },
  boxSizing: "border-box",
  margin: 0,
  paddingBlock: 0,
  paddingInline: 16,
  border: `1px solid ${theme.token.colorBorder}`,
  borderRadius: theme.shape.medium,
  outline: "none",
  backgroundColor: theme.token.colorBgContainer,
  color: theme.token.colorText,
  transition: "border-color 150ms ease, box-shadow 150ms ease",
  "::placeholder": {
    color: theme.token.colorTextTertiary,
    opacity: 1,
  },
  ":hover": {
    borderColor: theme.token.colorText,
  },
  ":focus": focusRing(theme.token.colorPrimary),
  "&[aria-invalid='true']": {
    borderColor: theme.token.colorError,
    ":focus": focusRing(theme.token.colorError),
  },
  ":disabled": {
    borderColor: theme.token.colorBorderSecondary,
    color: theme.token.colorTextTertiary,
    cursor: "not-allowed",
  },
});
