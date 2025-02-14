import * as tst from "ts-toolbelt";
import { type Route } from "./defs";
import { Route as WRoute, Link as WLink, LinkProps, RouteProps } from "wouter";

export const NavRoute: React.FC<RouteProps<never, Route>> = WRoute;

export const Link: React.FC<
  tst.O.Overwrite<tst.U.Exclude<LinkProps, { href?: never }>, { href: Route }>
> = WLink;
