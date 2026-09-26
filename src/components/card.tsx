import React from "react";
import { Card as AntdCard, CardProps as AntdCardProps } from "antd";
import { withCss } from "./withCss";
import styled from "@emotion/styled";
import { Route } from "~/routes/defs";
import { Link } from "./link";
import { trackCardClick } from "~/analytics";
import * as tst from "ts-toolbelt";
import { OneOf } from "~/types";
import { styledPropGuard } from "~/utils/styled";

const StyledCard = styled(AntdCard)(({ theme }) => ({
  // The theme can't override this for card specifically,
  // so we do it here.
  background: theme.token.colorBgElevated,
}));

// Matches the wrapper Link used for internal slugs, so external cards
// look the same as other cards. External links always open in a new tab.
const ExternalLink = styled(
  "a",
  styledPropGuard,
)<{ $fullBody?: boolean }>(({ $fullBody }) => ({
  display: "block",
  height: $fullBody ? "100%" : undefined,
  width: $fullBody ? "100%" : undefined,
  cursor: "pointer",
}));

type ActionProps = tst.O.Merge<
  {
    id: string;
  },
  OneOf<{
    slug: Route;
    externalHref: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
  }>
>;

type ExtraProps = {
  fullBody?: boolean;
  actionProps?: ActionProps;
};

type LinkCardProps = tst.O.Merge<
  tst.O.Omit<AntdCardProps, "id" | "onClick">,
  ExtraProps
>;

const LinkCard = ({ fullBody, actionProps, ...props }: LinkCardProps) => {
  const onClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (actionProps == null) {
      return;
    }

    actionProps.onClick?.(event);
    trackCardClick({ id: actionProps.id });
  };

  if (actionProps?.externalHref != null) {
    return (
      <ExternalLink
        href={actionProps.externalHref}
        target="_blank"
        rel="noopener noreferrer"
        $fullBody={fullBody}
      >
        <StyledCard onClick={onClick} {...props} />
      </ExternalLink>
    );
  }

  if (actionProps?.slug != null) {
    return (
      <Link
        href={actionProps.slug}
        height={fullBody ? "100%" : undefined}
        width={fullBody ? "100%" : undefined}
      >
        <StyledCard onClick={onClick} {...props} />
      </Link>
    );
  }

  return <StyledCard onClick={onClick} {...props} />;
};

export const Card = styled(withCss(LinkCard))<ExtraProps>(({
  actionProps,
  fullBody,
  theme,
}) => {
  const isClickable = actionProps != null;

  return {
    cursor: isClickable ? "pointer" : "default",
    boxShadow: theme.token.boxShadowTertiary,
    transition: "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out",
    ...(fullBody
      ? {
          width: "100%",
          height: "100%",
          "& .ant-card-body": {
            height: "100%",
          },
        }
      : {}),
    ...(isClickable
      ? {
          "&:hover": {
            boxShadow: theme.token.boxShadow,
            transform: "scale(1.03)",
          },
        }
      : {}),
  };
});
