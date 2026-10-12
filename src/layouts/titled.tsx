import { MainLayout } from "~/layouts/main";
import { GuideMeta } from "~/guides";
import { Flex, NavBreadcrumbs, Typography } from "~/components";

type Props = {
  guideMeta: GuideMeta;
  children: React.ReactNode;
};

export const TitledLayout = ({ guideMeta, children }: Props) => {
  return (
    <MainLayout>
      <Flex vertical gap={12}>
        <NavBreadcrumbs route={guideMeta.slug} />
        <Typography.H1>{guideMeta.navDrawerTitle}</Typography.H1>
      </Flex>
      {children}
    </MainLayout>
  );
};
