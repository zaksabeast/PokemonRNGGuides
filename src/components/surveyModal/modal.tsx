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
        I want to expand beyond Pokemon and explore new ideas.
      </Typography.Paragraph>

      <List
        header={<Typography.Text strong>Inside the Discord:</Typography.Text>}
        mb={16}
      >
        <ListItem>Suggest app ideas</ListItem>
        <ListItem>Vote on new app ideas</ListItem>
        <ListItem>Watch ideas built in realtime</ListItem>
      </List>

      <Button
        type="primary"
        trackerId="budget_app_survey_join_discord"
        icon={<Icon name="Discord" />}
        size="middle"
        href="https://discord.gg/nwMcqyf8Xs"
      >
        Join the App Ideas Discord
      </Button>

      <Typography.Paragraph mt={20}>
        If you're curious in how apps get made, or have ideas, come join.
      </Typography.Paragraph>
    </StyledModal>
  );
};
