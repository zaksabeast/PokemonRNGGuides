import * as tst from "ts-toolbelt";
import { type Route } from "./defs";
import { Route as WRoute, Link as WLink, LinkProps, RouteProps } from "wouter";
import { withCss } from "~/components/withCss";
import styled from "@emotion/styled";

export const NavRoute: React.FC<RouteProps<never, Route>> = WRoute;

const UnstyledLink: React.FC<
  tst.O.Overwrite<tst.U.Exclude<LinkProps, { href?: never }>, { href: Route }>
> = WLink;

export const Link = styled(withCss(UnstyledLink))({
  display: "flex",
  cursor: "pointer",
});
