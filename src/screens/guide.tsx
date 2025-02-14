import React from "react";
import { Alert } from "antd";
import { MainLayout } from "~/layouts/main";
import { getGuide } from "~/guides";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { Flex, Typography, Loading, Button, Icon } from "~/components";
import { settings } from "~/settings";

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

        <Flex>
          <Button
            trackerId="get_help_on_discord"
            icon={<Icon name="Discord" />}
            type="primary"
            size="middle"
            href={settings.discordUrl}
          >
            Get help on Discord
          </Button>
        </Flex>

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
