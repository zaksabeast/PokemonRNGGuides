import { List, Divider } from "antd";
import {
  Typography,
  Flex,
  Image,
  type ImageProps,
  Link,
  Alert,
  type AlertProps,
} from "~/components";
import styled from "@emotion/styled";
import { formatRelativeUrl } from "~/utils/formatRelativeUrl";
import { RouteSchema } from "~/routes/defs";
import { get } from "lodash-es";
import { guides } from "~/guides";
import { usePageLanguage } from "~/markdownExports/languageContext";
import type React from "react";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";

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

export const MarkdownImage = (props: Partial<ImageProps>) => (
  <Flex justify="center">
    <Image {...props} />
  </Flex>
);

export const MarkdownA = ({ href, children }: { href: string } & Props) => {
  const currentLanguage = usePageLanguage();

  const internalHref = RouteSchema.safeParse(
    formatRelativeUrl({ url: href, leadingSlash: true, trailingSlash: true }),
  );
  if (internalHref.success) {
    const linkedGuide = guides[internalHref.data];
    const translations = linkedGuide?.meta?.translations;
    const translatedSlug = get(translations, currentLanguage);
    const finalHref =
      translatedSlug != null ? translatedSlug : internalHref.data;
    return <Link href={finalHref}>{children}</Link>;
  }

  if (href.startsWith("/downloads/")) {
    return <a href={href}>{children}</a>;
  }

  let parsedHref: URL | null = null;
  try {
    parsedHref = new URL(href);
  } catch {
    // not a valid URL
  }

  if (parsedHref?.protocol === "https:") {
    return <a href={href}>{children}</a>;
  }

  return <>{children}</>;
};

export const MarkdownSummary = styled.summary({
  cursor: "pointer",
  listStyle: "none",
  fontWeight: 800,
  position: "relative",
  paddingLeft: "1.5em",
  "::-webkit-details-marker": { display: "none" },
  "::marker": { content: '""' },
  "&::before": {
    content: '"▶"',
    position: "absolute",
    left: 0,
    transition: "transform 0.2s ease",
  },
  "details[open] &::before": {
    transform: "rotate(90deg)",
  },
});

const Blockquote = styled.blockquote(({ theme }) => ({
  borderLeft: "4px solid",
  borderColor: theme.token.colorBorder,
  paddingLeft: 16,
  margin: 0,
}));

const ALERT_CONFIG = {
  NOTE: { type: "info", message: "Note" },
  WARNING: { type: "warning", message: "Warning" },
  TIP: { type: "tip", message: "Tip" },
  CAUTION: { type: "error", message: "Caution" },
  IMPORTANT: { type: "important", message: "Important" },
} as const satisfies Record<string, Pick<AlertProps, "type" | "message">>;

const isAlertType = (
  alertType?: string,
): alertType is keyof typeof ALERT_CONFIG => {
  if (alertType == null) {
    return false;
  }

  return alertType in ALERT_CONFIG;
};

const getAlertProps = (alertType?: string) => {
  if (isAlertType(alertType)) {
    return ALERT_CONFIG[alertType];
  }

  return null;
};

export const MarkdownBlockquote = ({
  children,
  "alert-type": alertType,
}: { "alert-type"?: string } & Props) => {
  const t = useActiveRouteTranslations();
  const alertProps = getAlertProps(alertType);

  if (alertProps != null) {
    return (
      <Alert
        showIcon
        description={children}
        type={alertProps.type}
        title={t[alertProps.message]}
      />
    );
  }

  return <Blockquote>{children}</Blockquote>;
};
