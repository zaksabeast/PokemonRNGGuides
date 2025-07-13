import { Button, Typography, Icon, List, ListItem } from "~/components";
import { Modal } from "antd";
import { track } from "~/analytics";
import styled from "@emotion/styled";
import { useSurveyModal } from "./state";

const StyledModal = styled(Modal)({
  ".ant-modal-body": {
    paddingTop: 16,
  },
  ".ant-modal-footer": {
    display: "none",
  },
});

export const SurveyModal = () => {
  const { isOpen, closeModal: closeModal } = useSurveyModal();

  return (
    <StyledModal
      open={isOpen}
      title="New App Ideas Discord"
      onCancel={() => {
        closeModal();
        track("Survey modal cancelled", {});
      }}
    >
      <Typography.Paragraph>
        I'm exploring which app ideas are worth building — sharing the process
        and looking for people who want to help shape what gets made.
      </Typography.Paragraph>

      <List
        header={<Typography.Text strong>Inside the Discord:</Typography.Text>}
        mb={16}
      >
        <ListItem>Vote on new app ideas as they're shared</ListItem>
        <ListItem>Suggest problems you'd love to see solved</ListItem>
        <ListItem>Watch ideas go from concept to launch</ListItem>
      </List>

      <Typography.Paragraph>
        If you're curious about how apps get made, or have ideas of your own,
        come join.
      </Typography.Paragraph>

      <Button
        type="primary"
        trackerId="budget_app_survey_join_discord"
        icon={<Icon name="Discord" />}
        size="middle"
        href="https://discord.gg/nwMcqyf8Xs"
      >
        Join the App Ideas Discord
      </Button>

      <Typography.Paragraph italic mt={16}>
        (Only join if you're interested in voting, shaping, or sharing ideas —
        no passive lurkers please!)
      </Typography.Paragraph>
    </StyledModal>
  );
};
