import { Button, Typography, Icon } from "~/components";
import { Modal, Skeleton } from "antd";
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
  const { cohort } = useAbCohort("duoForCodingModal");
  const { isOpen, closeModal: closeModal } = useSurveyModal();

  const pitchText = match(cohort)
    .with(null, () => <Skeleton.Input active />)
    .with(
      "imBuildingDuolingoButForCodingWannaUseIt",
      () => "I'm building Duolingo, but for coding.",
    )
    .with(
      "duolingoForCodingWantEarlyAccess",
      () => "Duolingo for coding — want early access?",
    )
    .with(
      "wouldYouUseADuolingoForCodingJoinIfYes",
      () => "Would you use a Duolingo for coding?",
    )
    .exhaustive();

  const buttonText = match(cohort)
    .with(null, () => <Skeleton.Button size="small" active />)
    .with("imBuildingDuolingoButForCodingWannaUseIt", () => "Wanna use it?")
    .with("duolingoForCodingWantEarlyAccess", () => "Join the Waitlist")
    .with("wouldYouUseADuolingoForCodingJoinIfYes", () => "Join if yes")
    .exhaustive();

  return (
    <StyledModal
      open={isOpen}
      title="New start for Zak"
      onCancel={() => {
        closeModal();
        track("Survey modal cancelled", {});
      }}
    >
      <Typography.Paragraph>{pitchText}</Typography.Paragraph>

      <Button
        type="primary"
        trackerId="budget_app_survey_join_discord"
        icon={<Icon name="Discord" />}
        size="middle"
        href="https://discord.gg/nwMcqyf8Xs"
        mb={16}
      >
        {buttonText}
      </Button>
    </StyledModal>
  );
};
