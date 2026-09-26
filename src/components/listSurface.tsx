import React from "react";
import styled from "@emotion/styled";
import { type Theme } from "@emotion/react";
import { type Route } from "~/routes/defs";
import { styledPropGuard } from "~/utils/styled";
import { Link } from "./link";

// `--list-inset` is the rows' leading padding, so headers and dividers can line up with the row content.
export const ListSurface = styled(
  "div",
  styledPropGuard,
)<{ $dividers?: boolean }>(({ theme, $dividers = false }) => ({
  "--list-inset": "20px",
  display: "flex",
  flexDirection: "column",
  padding: "8px 0",
  borderRadius: 20,
  // Keeps row hover layers inside the rounded corners
  overflow: "hidden",
  backgroundColor: theme.token.colorBgLayout,
  [theme.containerQueries.mobile]: {
    "--list-inset": "16px",
    padding: "4px 0",
  },
  ...($dividers && {
    // Positioned so the divider doesn't take a slot in the row's flex or grid layout
    "& > * + *::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: "var(--list-inset)",
      right: "var(--list-inset)",
      height: 1,
      backgroundColor: theme.token.colorBorderSecondary,
    },
  }),
}));

const rowStyles = (theme: Theme) => ({
  ...theme.interactive,
  position: "relative" as const,
  display: "flex",
  alignItems: "center",
  gap: 12,
  minHeight: 48,
  padding: "8px 12px 8px var(--list-inset)",
  boxSizing: "border-box" as const,
  color: theme.token.colorText,
  fontWeight: 400,
  ":hover": {
    color: theme.token.colorText,
    backgroundColor: theme.token.colorStateLayerHover,
  },
  ":active": {
    backgroundColor: theme.token.colorStateLayerPressed,
  },
  // The surface clips anything outside it, so the focus ring sits inside the row
  ":focus-visible": {
    ...theme.interactive[":focus-visible"],
    outlineOffset: -2,
  },
  [theme.containerQueries.mobile]: {
    paddingRight: 8,
  },
});

const InternalRow = styled(Link)(({ theme }) => rowStyles(theme));

const ExternalRow = styled.a(({ theme }) => rowStyles(theme));

// One prop rather than a union of props, since styled() doesn't keep union props intact
type ListRowProps = {
  href: Route | { external: string };
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

export const ListRow = ({
  href,
  onClick,
  className,
  children,
}: ListRowProps) => {
  if (typeof href !== "string") {
    return (
      <ExternalRow
        href={href.external}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={className}
      >
        {children}
      </ExternalRow>
    );
  }

  return (
    <InternalRow href={href} onClick={onClick} className={className}>
      {children}
    </InternalRow>
  );
};
