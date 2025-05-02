import React from "react";
import { MainLayout } from "~/layouts/main";
import { getGuide } from "~/guides";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import {
  Flex,
  Typography,
  Loading,
  Button,
  Icon,
  Alert,
  LanguageButton,
} from "~/components";
import { settings } from "~/settings";
import { useAbCohort } from "~/hooks/useAbTest";
import { match } from "ts-pattern";

export const GuideScreen = () => {
  const [route] = useActiveRoute();
  const supportIconCohort = useAbCohort("supportUsIcon");

  const supportUsIcon = match(supportIconCohort)
    .with("heart", () => "Heart" as const)
    .with("coffee", () => "Coffee" as const)
    .exhaustive();

  const Guide = getGuide(route);
  const category = Guide.meta.category;
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

        {category !== "User Settings" && (
          <>
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
                backgroundColor="BrandSecondary"
                backgroundHoverColor="BrandSecondaryHover"
                size="middle"
                href={settings.supportUsUrl}
              >
                Keep Pokémon RNG Free & Growing
              </Button>
            </Flex>
          </>
        )}

        {Guide.meta.isRoughDraft && (
          <Alert
            type="warning"
            showIcon
            message="This is a rough draft!"
            description="Everything on this page is a work in progress!"
          />
        )}

        {Guide.meta.translations != null && (
          <LanguageButton {...Guide.meta.translations} />
        )}

        <Guide.Guide />

        {!["Home", "User Settings"].includes(category) && (
          <Alert
            mt={16}
            backgroundColor="BrandSecondaryBg"
            borderColor="BrandSecondaryBorder"
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
                    backgroundColor="BrandSecondary"
                    backgroundHoverColor="BrandSecondaryHover"
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
