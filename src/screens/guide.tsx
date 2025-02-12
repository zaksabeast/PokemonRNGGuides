import React from "react";
import { Alert } from "antd";
import { MainLayout } from "~/layouts/main";
import { getGuide } from "~/guides";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { Flex, Typography, Loading } from "~/components";

export const GuideScreen = () => {
  const [route] = useActiveRoute();

  const Guide = getGuide(route);
  return (
    <MainLayout trackerName={route}>
      <React.Suspense
        fallback={
          <Flex height="100%" width="100%" justify="center" align="center">
            <Loading />
          </Flex>
        }
      >
        <Typography.Title level={1}>{Guide.meta.title}</Typography.Title>
        {Guide.meta.isRoughDraft && (
          <Alert
            type="warning"
            showIcon
            message="This is a rough draft!"
            description="Everything on this page is a work in progress!"
          />
        )}
        <Guide.Guide />
      </React.Suspense>
    </MainLayout>
  );
};
