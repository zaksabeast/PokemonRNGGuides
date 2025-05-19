import React from "react";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { isEqual } from "lodash-es";
import { formatRelativeUrl } from "~/utils/formatRelativeUrl";

type Props = {
  slug?: string;
  slugs?: string[];
  children: React.ReactNode;
};

const ShowIfInner = ({ slug, slugs, children }: Props) => {
  const route = useActiveRoute();
  const allSlugs = [slug, ...(slugs ?? [])]
    .filter((item) => item != null)
    .map(formatRelativeUrl);

  if (allSlugs.includes(route)) {
    return <>{children}</>;
  }
  return null;
};

export const ShowIf = React.memo(ShowIfInner, isEqual);
