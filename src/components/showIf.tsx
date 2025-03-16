import { useLocation } from "wouter";

type Props = {
  slug: string;
  children: React.ReactNode;
};

export const ShowIf = ({ slug, children }: Props) => {
  const [location] = useLocation();
  const trimmedLocation =
    location.endsWith("/") && location !== "/"
      ? location.slice(0, -1)
      : location;

  if (trimmedLocation === slug) {
    return <>{children}</>;
  }
  return null;
};
