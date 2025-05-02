import { MainLayout } from "~/layouts/main";
import { GuideMeta } from "~/guides";
import { Typography } from "~/components";

type Props = {
  guideMeta: GuideMeta;
  children: React.ReactNode;
};

export const TitledLayout = ({ guideMeta, children }: Props) => {
  return (
    <MainLayout>
      <Typography.Title level={1}>{guideMeta.title}</Typography.Title>
      {children}
    </MainLayout>
  );
};
