import { List, Divider } from "antd";
import { Typography, Flex, Image, Link } from "~/components";
import styled from "@emotion/styled";
import { formatRelativeUrl } from "~/utils/formatRelativeUrl";
import { RouteSchema } from "~/routes/defs";

type Props = { children: React.ReactNode };

export const MarkdownH1 = (props: Props) => {
  return <Typography.Title level={1} m={0} {...props} />;
};

export const MarkdownH2 = (props: Props) => (
  <Typography.Title level={2} m={0} {...props} />
);

export const MarkdownH3 = (props: Props) => (
  <Typography.Title level={3} m={0} {...props} />
);

const _MarkdownParagraph = styled(Typography.Text)({
  display: "block",
  color: "inherit",
});

export const MarkdownParagraph = (props: Props) => (
  <_MarkdownParagraph {...props} />
);

export const MarkdownH4 = (props: Props) => (
  <Typography.Title level={4} m={0} {...props} />
);

export const MarkdownH5 = (props: Props) => (
  <Typography.Title level={5} m={0} {...props} />
);

export const MarkdownH6 = MarkdownParagraph;

const Ol = styled.ol({
  margin: 0,
  marginBlock: 0,
  "& > .ant-list-item": {
    display: "list-item",
    listStyleType: "decimal",
    listStylePosition: "outside",
  },
});

export const MarkdownOList = ({ children }: Props) => (
  <List>
    <Ol>{children}</Ol>
  </List>
);

export const MarkdownListItem = ({ children }: Props) => (
  <List.Item>{children}</List.Item>
);

export const MarkdownBreak = () => <div />;

export const MarkdownDivider = (props: Props) => <Divider {...props} />;

const _Pre = styled(Typography.Text)({
  whiteSpace: "pre-wrap",
  "&&& span": {
    color: "unset",
    backgroundColor: "unset",
    border: "unset",
    fontFamily: "inherit",
    padding: 0,
  },
});

export const MarkdownPre = ({ children }: Props) => (
  <Flex border="1px solid" p={16} borderColor="Border" borderRadius={4}>
    <_Pre>{children}</_Pre>
  </Flex>
);

const _Code = styled(Typography.Text)(({ theme }) => ({
  fontFamily: "monospace",
  border: `1px solid ${theme.token.colorBorder}`,
  borderRadius: 4,
  paddingLeft: 4,
  paddingRight: 4,
}));

export const MarkdownCode = ({ children }: Props) => {
  return <_Code>{children}</_Code>;
};

export const MarkdownImage = ({ src, alt }: { src: string; alt: string }) => (
  <Flex justify="center">
    <Image src={src} alt={alt} />
  </Flex>
);

export const MarkdownA = ({ href, children }: { href: string } & Props) => {
  const internalHref = RouteSchema.safeParse(
    formatRelativeUrl({ url: href, leadingSlash: true, trailingSlash: true }),
  );
  if (internalHref.success) {
    return <Link href={internalHref.data}>{children}</Link>;
  }

  return <a href={href}>{children}</a>;
};
