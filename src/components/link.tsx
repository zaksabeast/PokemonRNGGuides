import { type Route } from "~/routes/defs";
// This is the only file where using the wouter Link is okay
// eslint-disable-next-line no-restricted-imports
import { Link as WLink } from "wouter";
import { withCss } from "~/components/withCss";
import styled from "@emotion/styled";

type Props = {
  href: Route;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  className?: string;
  children: React.ReactNode;
};

const TypedLink: React.FC<Props> = WLink;

const UnstyledLink = ({ newTab, ...props }: Props & { newTab?: boolean }) => {
  if (newTab) {
    return <a {...props} target="_blank" rel="noopener noreferrer" />;
  }

  return <TypedLink {...props} />;
};

export const Link = styled(withCss(UnstyledLink))({
  cursor: "pointer",
});
