import * as tst from "ts-toolbelt";
import { type Route } from "~/routes/defs";
// This is the only file where using the wouter Link is okay
// eslint-disable-next-line no-restricted-imports
import { Link as WLink, LinkProps } from "wouter";
import { withCss } from "~/components/withCss";
import styled from "@emotion/styled";

const UnstyledLink: React.FC<
  tst.O.Overwrite<tst.U.Exclude<LinkProps, { href?: never }>, { href: Route }>
> = WLink;

export const Link = styled(withCss(UnstyledLink))({
  cursor: "pointer",
});
