import { Typography as AntdTypography } from "antd";
import { withCss } from "./withCss";

export { type TypographyProps } from "antd";

const _Typography = withCss(AntdTypography);
const Title = withCss(AntdTypography.Title);
const Text = withCss(AntdTypography.Text);
const Paragraph = withCss(AntdTypography.Paragraph);

type TypographyComponent = typeof _Typography & {
  Title: typeof Title;
  Text: typeof Text;
  Paragraph: typeof Paragraph;
};

export const Typography = _Typography as TypographyComponent;
Typography.Title = Title;
Typography.Text = Text;
Typography.Paragraph = Paragraph;
