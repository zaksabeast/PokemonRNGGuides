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
import { Skeleton } from "antd";
import { match } from "ts-pattern";
import { useAbCohort } from "~/hooks/useAbTest";

const DiscordButtonContainer = styled(Flex)(({ theme }) => ({
  gap: 10,
  flexDirection: "column",
  width: "fit-content",
  [theme.mediaQueries.up("mobile")]: {
    flexDirection: "row",
  },
}));

const SpinOnceIcon = styled(Icon)({
  animation: "spin 5s linear",
  transform: "scaleX(0.7)",
  transformOrigin: "center",
  transition: "transform 0.3s ease",
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg) scaleX(0.7)" },
    "100%": { transform: "rotate(360deg) scaleX(0.7)" },
  },
});

type Props = {
  guideMeta: GuideMeta;
  children: React.ReactNode;
};

const AppIdeaButton = () => {
  const { openModal } = useSurveyModal();
  const abTest = useAbCohort("appCommunityButton");

  const text = match(abTest.cohort)
    .with(null, () => <Skeleton.Button size="small" active />)
    .with("curiousAboutApps", () => "New App Ideas — Vote & Shape")
    .with("youVoteIBuild", () => "Join the New Ideas Community")
    .with("shapeTheFuture", () => "New App Ideas Hub — Join Now")
    .exhaustive();

  return (
    <Button
      trackerId="app_idea_button"
      icon={<SpinOnceIcon size={20} name="StarSwirl" />}
      type="primary"
      size="middle"
      backgroundColor="ErrorActive"
      backgroundHoverColor="Error"
      onClick={openModal}
    >
      {text}
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
              trackerId="get_help_on_discord"
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
