import React from "react";
import { Card as AntdCard, CardProps as AntdCardProps } from "antd";
import { withCss } from "./withCss";
import styled from "@emotion/styled";
import { Route } from "~/routes/defs";
import { Link } from "./link";
import { track } from "~/analytics";
import * as tst from "ts-toolbelt";
import { BaseButton } from "./button";

type ExtraProps = {
  slug?: Route;
  externalHref?: string;
  fullBody?: boolean;
};

type LinkCardProps = tst.O.Merge<
  tst.O.Required<AntdCardProps, "id">,
  ExtraProps
>;

const LinkCard = ({
  slug,
  externalHref,
  fullBody,
  id,
  onClick: _onClick,
  ...props
}: LinkCardProps) => {
  const onClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    (event) => {
      if (_onClick == null && slug == null && externalHref == null) {
        return;
      }

      _onClick?.(event);

      track("Card Clicked", { id });
    },
    [slug, externalHref, id, _onClick],
  );

  if (externalHref != null) {
    return (
      <BaseButton trackerId={`${id}-card-button`} href={externalHref}>
        <AntdCard onClick={onClick} {...props} />
      </BaseButton>
    );
  }

  if (slug != null) {
    return (
      <Link
        href={slug}
        height={fullBody ? "100%" : undefined}
        width={fullBody ? "100%" : undefined}
      >
        <AntdCard onClick={onClick} {...props} />
      </Link>
    );
  }

  return <AntdCard onClick={onClick} {...props} />;
};

export const Card = styled(withCss(LinkCard))<ExtraProps>(({
  slug,
  externalHref,
  fullBody,
  onClick,
  theme,
}) => {
  const isClickable = slug != null || externalHref != null || onClick != null;

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
