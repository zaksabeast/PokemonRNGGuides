import { useActiveRoute } from "~/hooks/useActiveRoute";

type Props = {
  slug: string;
  children: React.ReactNode;
};

export const ShowIf = ({ slug, children }: Props) => {
  const [route] = useActiveRoute();

  if (route === slug) {
    return <>{children}</>;
  }
  return null;
};
