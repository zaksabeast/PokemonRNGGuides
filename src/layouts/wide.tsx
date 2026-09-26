import { MainLayout } from "~/layouts/main";

type Props = {
  children: React.ReactNode;
  trackerName?: string;
};

export const WideLayout = ({ children, trackerName }: Props) => {
  return (
    <MainLayout fullWidth trackerName={trackerName}>
      {children}
    </MainLayout>
  );
};
