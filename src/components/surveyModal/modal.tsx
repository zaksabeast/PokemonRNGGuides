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
  const { cohort } = useAbCohort("appCommunityDiscord2");
  const { isOpen, closeModal: closeModal } = useSurveyModal();

  const pitchText = match(cohort)
    .with(null, () => <Skeleton.Input active />)
    .with(
      "imChasingNewFunAppIdeasWannaPeek",
      () => "I'm chasing new, fun app ideas.",
    )
    .with(
      "imSpinningUpSomethingNewTotallySeparateFromPokemonCurious",
      () => "I'm spinning up something new! Totally separate from Pokémon.",
    )
    .with(
      "imMakingSomethingNotSureWhatItIsYetThatsTheFunPartCurious",
      () =>
        "I'm making something. Not sure what it is yet. That’s the fun part.",
    )
    .exhaustive();

  const buttonText = match(cohort)
    .with(null, () => <Skeleton.Button size="small" active />)
    .with("imChasingNewFunAppIdeasWannaPeek", () => "Wanna peek?")
    .with(
      "imSpinningUpSomethingNewTotallySeparateFromPokemonCurious",
      () => "Curious?",
    )
    .with(
      "imMakingSomethingNotSureWhatItIsYetThatsTheFunPartCurious",
      () => "Curious?",
    )
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
