import React from "react";
import { Card as AntdCard, CardProps as AntdCardProps } from "antd";
import { withCss } from "./withCss";
import styled from "@emotion/styled";
import { Route } from "~/routes/defs";
import { Link } from "~/routes";
import { track } from "~/analytics";
import * as tst from "ts-toolbelt";

type ExtraProps = {
  href?: Route;
  fullBody?: boolean;
};

type LinkCardProps = tst.O.Merge<
  tst.O.Required<AntdCardProps, "id">,
  ExtraProps
>;

const LinkCard = ({
  href,
  fullBody,
  id,
  onClick: _onClick,
  ...props
}: LinkCardProps) => {
  const onClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    (event) => {
      if (_onClick == null && href == null) {
        return;
      }

      _onClick?.(event);

      track("Card Clicked", { id });
    },
    [href, id, _onClick],
  );

  if (href == null) {
    return <AntdCard onClick={onClick} {...props} />;
  }

  return (
    <Link
      href={href}
      height={fullBody ? "100%" : undefined}
      width={fullBody ? "100%" : undefined}
    >
      <AntdCard onClick={onClick} {...props} />
    </Link>
  );
};

export const Card = styled(withCss(LinkCard))<ExtraProps>(({
  href,
  fullBody,
  onClick,
  theme,
}) => {
  const isClickable = href != null || onClick != null;

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
