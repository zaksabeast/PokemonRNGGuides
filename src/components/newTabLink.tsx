import { type Route } from "~/routes/defs";
import { withCss } from "~/components/withCss";
import styled from "@emotion/styled";

const UnstyledNewTabLink = ({
  href,
  children,
}: {
  href: Route;
  children: React.ReactNode;
}) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export const NewTabLink = styled(withCss(UnstyledNewTabLink))({
  cursor: "pointer",
});
