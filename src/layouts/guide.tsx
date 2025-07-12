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
import { useAbCohort } from "~/hooks/useAbTest";
import { Skeleton } from "antd";
import { match } from "ts-pattern";

type Props = {
  guideMeta: GuideMeta;
  children: React.ReactNode;
};

const AppIdeaButton = () => {
  const { openModal } = useSurveyModal();
  const abTest = useAbCohort("appIdeaButton");

  const text = match(abTest.cohort)
    .with(null, () => <Skeleton.Button size="small" active />)
    .with("budgetByForce", () => "I’m building a money app — want to try it?")
    .with("buildingAnApp", () => "Budget-by-force: A new app I’m making")
    .with("needThoughts", () => "Building a money tool — need your thoughts")
    .exhaustive();

  return (
    <Button
      trackerId="app_idea_button"
      icon={<Icon size={20} name="OutlineCampaign" />}
      type="primary"
      size="middle"
      backgroundColor="SuccessActive"
      backgroundHoverColor="Success"
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
        <AppIdeaButton />
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
