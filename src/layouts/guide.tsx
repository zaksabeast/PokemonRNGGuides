import React from "react";
import { MainLayout } from "~/layouts/main";
import { GuideMeta } from "~/guides";
import {
  Flex,
  Typography,
  Button,
  Icon,
  Alert,
  LanguageButton,
  NavBreadcrumbs,
} from "~/components";
import { settings } from "~/settings";
import { SurveyModal } from "~/components/surveyModal/modal";
import { useSurveyModal } from "~/components/surveyModal/state";
import styled from "@emotion/styled";

const DiscordButtonContainer = styled(Flex)(({ theme }) => ({
  gap: 10,
  flexDirection: "column",
  width: "fit-content",
  [theme.mediaQueries.up("mobile")]: {
    flexDirection: "row",
  },
}));

type Props = {
  guideMeta: GuideMeta;
  children: React.ReactNode;
};

const AppIdeaButton = () => {
  const { openModal } = useSurveyModal();

  return (
    <Button
      trackerId="app_idea_button"
      icon={<Icon size={20} name="StarSwirl" />}
      type="primary"
      size="middle"
      backgroundColor="ErrorActive"
      backgroundHoverColor="Error"
      onClick={openModal}
    >
      New side project — not Pokemon!
    </Button>
  );
};

export const GuideLayout = ({ guideMeta, children }: Props) => {
  return (
    <MainLayout>
      <NavBreadcrumbs route={guideMeta.slug} />
      <Typography.Title level={1} mt={0}>
        {guideMeta.title}
      </Typography.Title>

      <Flex vertical gap={10}>
        <Flex>
          <AppIdeaButton />
        </Flex>

        <DiscordButtonContainer>
          <Flex>
            <Button
              trackerId="get_help_on_discord"
              icon={<Icon name="Discord" />}
              type="primary"
              size="middle"
              href={settings.discordUrl}
            >
              Hunt and Trade on PokemonRNG
            </Button>
          </Flex>
          <Flex>
            <Button
              trackerId="join_lazy_discord"
              icon={<Icon name="Discord" />}
              type="primary"
              size="middle"
              href="https://discord.gg/rvY3SwJHMk"
            >
              LazyHunters
            </Button>
          </Flex>
        </DiscordButtonContainer>
      </Flex>

      {guideMeta.isRoughDraft && (
        <Alert
          type="warning"
          showIcon
          message="This is a rough draft!"
          description="Everything on this page is a work in progress!"
        />
      )}

      {guideMeta.translations != null && (
        <LanguageButton {...guideMeta.translations} />
      )}

      {children}
      <SurveyModal />
    </MainLayout>
  );
};
