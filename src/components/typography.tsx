import { Typography as AntdTypography } from "antd";
import styled from "@emotion/styled";
import { withCss } from "./withCss";

export { type TypographyProps } from "antd";

const _Typography = withCss(AntdTypography);
const Title = withCss(AntdTypography.Title);
const Text = withCss(AntdTypography.Text);
const Paragraph = withCss(AntdTypography.Paragraph);

const PageTitle = styled(Title)(({ theme }) => ({
  "&&": {
    margin: "12px 0 0",
    color: theme.token.colorText,
    fontSize: 36,
    fontWeight: 400,
    lineHeight: "44px",
    [theme.containerQueries.mobile]: {
      marginTop: 8,
      fontSize: 28,
      lineHeight: "36px",
    },
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
  PageTitle: typeof PageTitle;
  SectionHeading: typeof SectionHeading;
  ItemTitle: typeof ItemTitle;
  Meta: typeof Meta;
  Label: typeof Label;
};

export const Typography = _Typography as TypographyComponent;
Typography.Title = Title;
Typography.Text = Text;
Typography.Paragraph = Paragraph;
Typography.PageTitle = PageTitle;
Typography.SectionHeading = SectionHeading;
Typography.ItemTitle = ItemTitle;
Typography.Meta = Meta;
Typography.Label = Label;
