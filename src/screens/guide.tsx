import React from "react";
import { Alert } from "antd";
import { MainLayout } from "~/layouts/main";
import { getGuide } from "~/guides";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { Flex, Typography, Loading, Button, Icon } from "~/components";
import { settings } from "~/settings";
import { useAbCohort } from "~/hooks/useAbTest";
import { match } from "ts-pattern";

export const GuideScreen = () => {
  const [route] = useActiveRoute();
  const cohort = useAbCohort("discordButton");

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
            trackerId={cohort}
            icon={<Icon name="Discord" />}
            type="primary"
            size="middle"
            href={settings.discordUrl}
          >
            {match(cohort)
              .with("get_help_on_discord", () => "Get Help on Discord")
              .with(
                "trade_chat_and_rng_on_discord",
                () => "Trade, Chat, and RNG on Discord",
              )
              .with(
                "stream_play_and_rng_with_us",
                () => "Stream, Play, and RNG with Us",
              )
              .exhaustive()}
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
