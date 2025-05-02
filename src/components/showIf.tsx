import React from "react";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { isEqual } from "lodash-es";

type Props = {
  slug?: string;
  slugs?: string[];
  children: React.ReactNode;
};

const ShowIfInner = ({ slug, slugs, children }: Props) => {
  const [route] = useActiveRoute();

  if (route === slug || slugs?.includes(route)) {
    return <>{children}</>;
  }
  return null;
};

export const ShowIf = React.memo(ShowIfInner, isEqual);
