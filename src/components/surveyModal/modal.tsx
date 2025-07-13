import { Button, Typography, Icon, List, ListItem } from "~/components";
import { Modal } from "antd";
import { track } from "~/analytics";
import styled from "@emotion/styled";
import { useSurveyModal } from "./state";
import { useAbCohort } from "~/hooks/useAbTest";
import { match } from "ts-pattern";

const StyledModal = styled(Modal)({
  ".ant-modal-body": {
    paddingTop: 16,
  },
  ".ant-modal-footer": {
    display: "none",
  },
});

export const SurveyModal = () => {
  const { cohort } = useAbCohort("appCommunityDiscord");
  const { isOpen, closeModal: closeModal } = useSurveyModal();

  const discordName = match(cohort)
    .with(null, () => "App Ideas")
    .with("testZone", () => "Test Zone")
    .with("launchPad", () => "Launch Pad")
    .with("ideaReactor", () => "Idea Reactor")
    .with("buildLab", () => "Build Lab")
    .exhaustive();

  return (
    <StyledModal
      open={isOpen}
      title={`${discordName} Discord`}
      onCancel={() => {
        closeModal();
        track("Survey modal cancelled", {});
      }}
    >
      <Typography.Paragraph>
        I'm working on something new — and if you know me, you know it won't be
        boring.
      </Typography.Paragraph>

      <Button
        type="primary"
        trackerId="budget_app_survey_join_discord"
        icon={<Icon name="Discord" />}
        size="middle"
        href="https://discord.gg/nwMcqyf8Xs"
        mb={16}
      >
        Join the {discordName} Discord
      </Button>

      <Typography.Paragraph>
        This is where I'm thinking out loud, testing ideas, and building in
        public.
      </Typography.Paragraph>

      <List
        header={<Typography.Text strong>Inside the Discord:</Typography.Text>}
        mb={10}
      >
        <ListItem>See what I'm building before anyone else</ListItem>
        <ListItem>Watch ideas go from nothing to launch</ListItem>
        <ListItem>Give feedback and help shape apps</ListItem>
      </List>

      <Typography.Paragraph>
        If you're curious what I'm working on — or just like watching weird,
        smart ideas come to life — jump in.
      </Typography.Paragraph>
    </StyledModal>
  );
};
