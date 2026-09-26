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
      <Flex vertical>
        <NavBreadcrumbs route={guideMeta.slug} />
        <Typography.PageTitle level={1}>
          {guideMeta.navDrawerTitle}
        </Typography.PageTitle>
      </Flex>
      {children}
    </MainLayout>
  );
};
