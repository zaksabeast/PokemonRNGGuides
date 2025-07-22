import React from "react";
import { Button, Icon, Flex } from "~/components";
import { Modal } from "antd";
import { track } from "~/analytics";
import styled from "@emotion/styled";
import { useSurveyModal } from "./state";

const StyledModal = styled(Modal)({
  ".ant-modal-body": {
    paddingTop: 16,
  },
});

type AppType = "budgeting" | "sideHustles" | "investing" | "other";

export const SurveyModal = () => {
  const { isOpen, closeModal: closeModal } = useSurveyModal();
  const [clicked, setClicked] = React.useState<Record<AppType, boolean>>({
    budgeting: false,
    sideHustles: false,
    investing: false,
    other: false,
  });

  return (
    <StyledModal
      open={isOpen}
      title="Vote: Best money app?"
      onCancel={() => {
        closeModal();
        track("Survey modal cancelled", {});
      }}
      footer={[
        <Button
          mt={8}
          key="joinDiscord"
          type="primary"
          trackerId="budget_app_survey_join_discord"
          icon={<Icon name="Discord" />}
          size="middle"
          href="https://discord.gg/nwMcqyf8Xs"
        >
          My Side Projects Discord
        </Button>,
      ]}
    >
      <Flex gap={16} vertical>
        <Button
          disabled={clicked.budgeting}
          icon={
            clicked.budgeting ? <Icon name="Check" color="Success" /> : null
          }
          trackerId="money-app-idea-budgeting"
          onClick={() => setClicked((prev) => ({ ...prev, budgeting: true }))}
        >
          Budgeting
        </Button>

        <Button
          disabled={clicked.sideHustles}
          icon={
            clicked.sideHustles ? <Icon name="Check" color="Success" /> : null
          }
          trackerId="money-app-idea-sideHustles"
          onClick={() => setClicked((prev) => ({ ...prev, sideHustles: true }))}
        >
          Side hustles
        </Button>

        <Button
          disabled={clicked.investing}
          icon={
            clicked.investing ? <Icon name="Check" color="Success" /> : null
          }
          trackerId="money-app-idea-investing"
          onClick={() => setClicked((prev) => ({ ...prev, investing: true }))}
        >
          Growing money
        </Button>

        <Button
          disabled={clicked.other}
          icon={clicked.other ? <Icon name="Check" color="Success" /> : null}
          trackerId="money-app-idea-other"
          onClick={() => setClicked((prev) => ({ ...prev, other: true }))}
        >
          Something else
        </Button>
      </Flex>
    </StyledModal>
  );
};
