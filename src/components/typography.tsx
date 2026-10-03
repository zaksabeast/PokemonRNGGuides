import React from "react";
import { Typography as AntdTypography } from "antd";
import styled from "@emotion/styled";
import { withCss } from "./withCss";

export { type TypographyProps } from "antd";

const _Typography = withCss(AntdTypography);
const Title = withCss(AntdTypography.Title);
const Text = withCss(AntdTypography.Text);
const Paragraph = withCss(AntdTypography.Paragraph);

const H1 = styled(Title)(({ theme }) => ({
  "&&&": {
    margin: 0,
    color: theme.token.colorText,
    fontSize: 45,
    fontWeight: 400,
    lineHeight: "52px",
  },
}));

const StyledH2 = styled(Title)(({ theme }) => ({
  "&&&": {
    margin: 0,
    color: theme.token.colorText,
    fontSize: 32,
    fontWeight: 400,
    lineHeight: "40px",
  },
}));

const H2 = (props: Omit<React.ComponentProps<typeof StyledH2>, "level">) => (
  <StyledH2 {...props} level={2} />
);

const StyledH3 = styled(Title)(({ theme }) => ({
  "&&&": {
    margin: 0,
    color: theme.token.colorText,
    fontSize: 22,
    fontWeight: 500,
    lineHeight: "28px",
  },
}));

const H3 = (props: Omit<React.ComponentProps<typeof StyledH3>, "level">) => (
  <StyledH3 {...props} level={3} />
);

const Body = styled(Text)(({ theme }) => ({
  "&&": {
    color: theme.token.colorTextSecondary,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: 0.25,
  },
}));

const SectionHeading = styled(Title)(({ theme }) => ({
  "&&": {
    margin: 0,
    color: theme.token.colorText,
    fontSize: 28,
    fontWeight: 400,
    lineHeight: "36px",
    [theme.containerQueries.mobile]: {
      fontSize: 22,
      lineHeight: "28px",
    },
  },
}));

const ItemTitle = styled(Text)({
  "&&": {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: 0.15,
  },
});

const Meta = styled(Text)(({ theme }) => ({
  "&&": {
    color: theme.token.colorTextTertiary,
    fontSize: 13,
    lineHeight: "18px",
    letterSpacing: 0.2,
  },
}));

const Label = styled(Text)(({ theme }) => ({
  "&&": {
    color: theme.token.colorTextSecondary,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: 0.1,
  },
}));

type TypographyComponent = typeof _Typography & {
  Title: typeof Title;
  Text: typeof Text;
  Paragraph: typeof Paragraph;
  H1: typeof H1;
  H2: typeof H2;
  H3: typeof H3;
  Body: typeof Body;
  SectionHeading: typeof SectionHeading;
  ItemTitle: typeof ItemTitle;
  Meta: typeof Meta;
  Label: typeof Label;
};

export const Typography = _Typography as TypographyComponent;
Typography.Title = Title;
Typography.Text = Text;
Typography.Paragraph = Paragraph;
Typography.H1 = H1;
Typography.H2 = H2;
Typography.H3 = H3;
Typography.Body = Body;
Typography.SectionHeading = SectionHeading;
Typography.ItemTitle = ItemTitle;
Typography.Meta = Meta;
Typography.Label = Label;
