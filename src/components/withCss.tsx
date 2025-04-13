import React from "react";
import styled from "@emotion/styled";
import { Theme, Color } from "@emotion/react";

type CustomStyles = {
  mb?: number;
  mt?: number;
  ml?: number;
  mr?: number;
  mv?: number;
  mh?: number;
  m?: number;

  pb?: number;
  pt?: number;
  pl?: number;
  pr?: number;
  pv?: number;
  ph?: number;
  p?: number;

  width?: number | string;
  maxWidth?: number | string;
  minWidth?: number | string;

  height?: number | string;
  maxHeight?: number | string;
  minHeight?: number | string;

  overflowX?: "auto" | "hidden" | "scroll" | "visible";
  overflowY?: "auto" | "hidden" | "scroll" | "visible";

  fontSize?: number | string;
  textAlign?: "left" | "right" | "center";

  flex?: number;
  flexShrink?: number;

  borderRadius?: number;
  border?: number | string;

  display?: React.CSSProperties["display"];

  color?: Color;
  backgroundColor?: Color;
  backgroundHoverColor?: Color;
  borderColor?: Color;
  strokeColor?: Color;

  boxSizing?: React.CSSProperties["boxSizing"];

  whiteSpace?: React.CSSProperties["whiteSpace"];
  aspectRatio?: React.CSSProperties["aspectRatio"];
};

const styleProps = [
  "mb",
  "mt",
  "ml",
  "mr",
  "mv",
  "mh",
  "m",
  "pb",
  "pt",
  "pl",
  "pr",
  "pv",
  "ph",
  "p",
  "width",
  "maxWidth",
  "minWidth",
  "height",
  "maxHeight",
  "minHeight",
  "overflowX",
  "overflowY",
  "fontSize",
  "textAlign",
  "flex",
  "flexShrink",
  "borderRadius",
  "border",
  "display",
  "color",
  "backgroundColor",
  "backgroundHoverColor",
  "borderColor",
  "strokeColor",
  "boxSizing",
  "whiteSpace",
  "aspectRatio",
];

const styleConverter = ({
  mb,
  mt,
  ml,
  mr,
  mv,
  mh,
  m,
  pb,
  pt,
  pl,
  pr,
  pv,
  ph,
  p,
  width,
  maxWidth,
  minWidth,
  height,
  maxHeight,
  minHeight,
  overflowX,
  overflowY,
  fontSize,
  textAlign,
  flex,
  flexShrink,
  borderRadius,
  border,
  display,
  color,
  backgroundColor,
  backgroundHoverColor,
  borderColor,
  strokeColor,
  boxSizing,
  whiteSpace,
  aspectRatio,
  theme,
}: CustomStyles & { theme: Theme }) => {
  return {
    "&&&": {
      margin: m,
      marginBottom: mv ?? mb,
      marginTop: mv ?? mt,
      marginLeft: mh ?? ml,
      marginRight: mh ?? mr,
      padding: p,
      paddingBottom: pv ?? pb,
      paddingTop: pv ?? pt,
      paddingLeft: ph ?? pl,
      paddingRight: ph ?? pr,
      width,
      maxWidth,
      minWidth,
      height,
      maxHeight,
      minHeight,
      overflowX,
      overflowY,
      fontSize,
      textAlign,
      flex,
      flexShrink,
      borderRadius,
      border,
      display,
      boxSizing,
      whiteSpace,
      aspectRatio,
      strokeColor:
        strokeColor == null ? undefined : theme.token[`color${strokeColor}`],
      color: color == null ? undefined : theme.token[`color${color}`],
      backgroundColor:
        backgroundColor == null
          ? undefined
          : theme.token[`color${backgroundColor}`],
      borderColor:
        borderColor == null ? undefined : theme.token[`color${borderColor}`],
      "&:hover": {
        backgroundColor:
          backgroundHoverColor == null
            ? undefined
            : theme.token[`color${backgroundHoverColor}`],
      },
    },
  };
};

export const withCss = <T extends object>(
  Component: React.ComponentType<T>,
) => {
  return styled(Component, {
    shouldForwardProp: (prop) => !styleProps.includes(prop),
  })<CustomStyles>(styleConverter);
};
