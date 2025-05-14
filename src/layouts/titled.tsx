import { MainLayout } from "~/layouts/main";
import { GuideMeta } from "~/guides";
import { NavBreadcrumbs, Typography } from "~/components";

type Props = {
  guideMeta: GuideMeta;
  children: React.ReactNode;
};

export const TitledLayout = ({ guideMeta, children }: Props) => {
  return (
    <MainLayout>
      <NavBreadcrumbs route={guideMeta.slug} />
      <Typography.Title level={1} mt={0}>
        {guideMeta.title}
      </Typography.Title>
      {children}
    </MainLayout>
  );
};
