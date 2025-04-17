import React from "react";
import { MainLayout } from "~/layouts/main";
import { getGuide } from "~/guides";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { Flex, Typography, Loading, Button, Icon, Alert } from "~/components";
import { settings } from "~/settings";
import { useAbCohort } from "~/hooks/useAbTest";
import { match } from "ts-pattern";

export const GuideScreen = () => {
  const [route] = useActiveRoute();
  const supportTextCohort = useAbCohort("supportUsButton2");
  const supportIconCohort = useAbCohort("supportUsIcon");

  const supportUsText = match(supportTextCohort)
    .with(
      "keep_pokemon_rng_free_growing",
      () => "Keep Pokémon RNG Free & Growing",
    )
    .with("love_our_tools_support_us", () => "Sponsor RNG Dev Work")
    .with("sponsor_rng_dev_work", () => "Love Our Tools? Support Us!")
    .exhaustive();

  const supportUsIcon = match(supportIconCohort)
    .with("heart", () => "Heart" as const)
    .with("coffee", () => "Coffee" as const)
    .exhaustive();

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
            icon={<Icon name={supportUsIcon} />}
            type="primary"
            backgroundColor="FillSecondary"
            backgroundHoverColor="FillSupportHover"
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

        {Guide.meta.category !== "Home" && (
          <Alert
            mt={16}
            backgroundColor="BgSupport"
            borderColor="BorderSupport"
            message="Got the Pokemon you wanted?"
            description={
              <Flex vertical gap={16}>
                If everyone who used this site donated just $3/month, it could
                be a full time job for multiple people!
                <Flex>
                  <Button
                    trackerId="support_us_footer"
                    icon={<Icon name="Heart" />}
                    type="primary"
                    backgroundColor="FillSecondary"
                    backgroundHoverColor="FillSupportHover"
                    size="middle"
                    href={settings.supportUsUrl}
                  >
                    Help make this a reality!
                  </Button>
                </Flex>
              </Flex>
            }
          />
        )}
      </React.Suspense>
    </MainLayout>
  );
};
