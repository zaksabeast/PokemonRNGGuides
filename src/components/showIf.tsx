type Props = {
  slug: string;
  children: React.ReactNode;
};

export const ShowIf = ({ slug, children }: Props) => {
  if (window.location.pathname === slug) {
    return <>{children}</>;
  }
  return null;
};
