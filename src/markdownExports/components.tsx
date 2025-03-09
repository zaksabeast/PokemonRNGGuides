import { List, Divider } from "antd";
import { Typography, Flex, Image } from "~/components";
import styled from "@emotion/styled";
import { Link } from "wouter";
import { track } from "~/analytics";

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

const Ul = styled.ul({
  margin: 0,
  marginBlock: 0,
  "& > .ant-list-item": {
    display: "block",
    listStyleType: "none",
  },
});

export const MarkdownList = ({ children }: Props) => (
  <List>
    <Ul>{children}</Ul>
  </List>
);

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

export const MarkdownTable = ({ children }: Props) => (
  <table cellSpacing={0} cellPadding={0}>
    {children}
  </table>
);

const _Th = styled.th(({ theme }) => ({
  padding: 16,
  backgroundColor: theme.token.colorFillQuaternary,
  borderBottom: `1px solid ${theme.token.colorBorderSecondary}`,
}));

export const MarkdownTh = ({ children }: Props) => <_Th>{children}</_Th>;

const _Tr = styled.tr(({ theme }) => ({
  borderCollapse: "collapse",
  textAlign: "left",
  ":hover": {
    backgroundColor: theme.token.colorFillQuaternary,
  },
}));

export const MarkdownTr = ({ children }: Props) => <_Tr>{children}</_Tr>;

const _Td = styled.td({
  padding: 16,
});

export const MarkdownTd = ({ children }: Props) => <_Td>{children}</_Td>;

export const MarkdownA = ({ href, children }: { href: string } & Props) => {
  try {
    const url = new URL(href, window.location.origin);
    if (
      url.origin === window.location.origin &&
      !url.pathname.startsWith("/downloads")
    ) {
      // Internal url
      return <Link href={href}>{children}</Link>;
    }
    // External url
    return <a href={href}>{children}</a>;
  } catch {
    track("Invalid href", { href });
    // Not a valid url
    // We'll still attempt to render a link and assume its for internal use
    return <Link href={href}>{children}</Link>;
  }
};
