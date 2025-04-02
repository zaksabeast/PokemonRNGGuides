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
  const cohort = useAbCohort("supportUsButton");

  const supportUsText = match(cohort)
    .with("back_new_tools_and_videos", () => "Back New Tools & Videos!")
    .with(
      "fuel_rng_join_our_supporters",
      () => "Fuel RNG - Join Our Supporters!",
    )
    .with("support_rng_and_unlock_perks", () => "Support RNG & Unlock Perks!")
    .otherwise(() => "Support RNG & Unlock Perks!");

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
            Hunt, Trade, and RNG with Us!
          </Button>
        </Flex>

        <Flex>
          <Button
            trackerId="support_us_on_discord"
            icon={<Icon name="Heart" />}
            type="primary"
            backgroundColor="FillSecondary"
            backgroundHoverColor="FillSecondaryHover"
            size="middle"
            href={settings.supportUsUrl}
          >
            {supportUsText}
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
