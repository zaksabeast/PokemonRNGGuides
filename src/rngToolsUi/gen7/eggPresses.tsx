import React from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { match } from "ts-pattern";
import { Color } from "@emotion/react";
import { Button, Divider, Flex, SectionCard, Typography } from "~/components";
import { type Gen7EggPath as EggPath } from "~/rngTools";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useCurrentStep } from "~/components/stepper/state";
import { formatHex } from "~/utils/formatHex";
import { formatGen7EggAbility } from "./eggForm";
import {
  gen7EggPathAtom,
  gen7EggSeedsAfterTargetAtom,
  gen7EggTargetAtom,
} from "./eggState";
import {
  LabeledCount,
  PokemonTags,
  PRESS_TIMING_MIN_HEIGHT,
} from "./sectionCards";

const FIND_TARGET_STEP = 0;
const GET_EGG_STEP = 2;

const SHOWN_STEP_MIN_HEIGHT = 120;
// Smaller than the shown step's action, which matters more.
const REMAINING_COUNT_FONT_SIZE = 24;

type EggSeeds = EggPath["egg_seeds_after_target"];

// Same order as the search's egg seed fields.
const formatEggSeeds = (eggSeeds: EggSeeds) =>
  [eggSeeds[3], eggSeeds[2], eggSeeds[1], eggSeeds[0]]
    .map((value) => formatHex(value))
    .join(" ");

const EggSeedsText = ({ eggSeeds }: { eggSeeds: EggSeeds | null }) => (
  <Typography.Text code={eggSeeds != null} color="TextSecondary">
    {eggSeeds == null ? "-" : formatEggSeeds(eggSeeds)}
  </Typography.Text>
);

const useTargetPath = () => {
  const target = useAtomValue(gen7EggTargetAtom);
  const targetPath = useAtomValue(gen7EggPathAtom);

  return {
    target,
    path: targetPath?.target === target ? targetPath.path : null,
  };
};

type StepProgress = {
  completedStepCount: number;
  shownStepIndex: number;
};

const PATH_START_PROGRESS: StepProgress = {
  completedStepCount: 0,
  shownStepIndex: 0,
};

type PathStepProgress = { path: EggPath; stepProgress: StepProgress };

type AllStepsDoneProps = {
  stepCount: number;
  previousButton: React.ReactNode;
};

const AllStepsDone = ({ stepCount, previousButton }: AllStepsDoneProps) => {
  const t = useActiveRouteTranslations();
  const [, setCurrentStep] = useCurrentStep();

  return (
    <Flex vertical gap={16}>
      <Flex vertical gap={8} justify="center" minHeight={SHOWN_STEP_MIN_HEIGHT}>
        <Typography.Text fontSize={36} strong color="Success">
          {t["All done"]}
        </Typography.Text>
        <Typography.Text color="TextSecondary">
          {stepCount === 0
            ? t[
                "The next egg is your target, so there's nothing to accept or reject."
              ]
            : t["The next egg is your target. Don't accept it yet."]}
        </Typography.Text>
      </Flex>
      <Flex gap={8} wrap>
        {previousButton}
        <Button
          trackerId="gen7_egg_steps_continue"
          type="primary"
          onClick={() => setCurrentStep(GET_EGG_STEP)}
        >
          {t["Continue"]}
        </Button>
      </Flex>
    </Flex>
  );
};

type ShownStepProps = {
  path: EggPath;
  stepProgress: StepProgress;
  setStepProgress: (stepProgress: StepProgress) => void;
};

const ShownStep = ({ path, stepProgress, setStepProgress }: ShownStepProps) => {
  const t = useActiveRouteTranslations();
  const { completedStepCount, shownStepIndex } = stepProgress;
  const stepCount = path.steps_before_target.length;
  const shownStep = path.steps_before_target[shownStepIndex];
  const isShownStepCompleted = shownStepIndex < completedStepCount;

  const previousButton = (
    <Button
      trackerId="gen7_egg_step_previous"
      disabled={shownStepIndex === 0}
      onClick={() =>
        setStepProgress({
          completedStepCount,
          shownStepIndex: shownStepIndex - 1,
        })
      }
    >
      {t["Previous"]}
    </Button>
  );

  if (shownStep == null) {
    return (
      <AllStepsDone stepCount={stepCount} previousButton={previousButton} />
    );
  }

  const shouldAccept = shownStep.action === "Accept";

  return (
    <Flex vertical gap={16}>
      <Flex vertical gap={8} justify="center" minHeight={SHOWN_STEP_MIN_HEIGHT}>
        <Typography.Text color="TextSecondary">
          {t["Egg {current} of {total}"]
            .replace("{current}", (shownStepIndex + 1).toString())
            .replace("{total}", stepCount.toString())}
          {isShownStepCompleted && ` (${t["already done"]})`}
        </Typography.Text>
        <Typography.Text
          fontSize={36}
          strong
          color={shouldAccept ? "Success" : "Error"}
        >
          {shouldAccept ? t["Accept"] : t["Reject"]}
        </Typography.Text>
        <Flex gap={8} wrap>
          <Typography.Text color="TextSecondary">
            {t["Egg seeds before"]}
          </Typography.Text>
          <EggSeedsText eggSeeds={shownStep.egg_seeds_before} />
        </Flex>
      </Flex>
      <Flex gap={8} wrap>
        {previousButton}
        {isShownStepCompleted ? (
          <>
            <Button
              trackerId="gen7_egg_step_next"
              onClick={() =>
                setStepProgress({
                  completedStepCount,
                  shownStepIndex: shownStepIndex + 1,
                })
              }
            >
              {t["Next"]}
            </Button>
            <Button
              trackerId="gen7_egg_step_current"
              type="primary"
              onClick={() =>
                setStepProgress({
                  completedStepCount,
                  shownStepIndex: completedStepCount,
                })
              }
            >
              {t["Back to current egg"]}
            </Button>
            <Button
              trackerId="gen7_egg_step_undo"
              type="link"
              onClick={() =>
                setStepProgress({
                  completedStepCount: shownStepIndex,
                  shownStepIndex,
                })
              }
            >
              {t["Redo from this egg"]}
            </Button>
          </>
        ) : (
          <Button
            trackerId="gen7_egg_step_done"
            type="primary"
            onClick={() =>
              setStepProgress({
                completedStepCount: completedStepCount + 1,
                shownStepIndex: completedStepCount + 1,
              })
            }
          >
            {shouldAccept ? t["Accepted, next egg"] : t["Rejected, next egg"]}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

type ShownStepContentProps = {
  hasTarget: boolean;
  path: EggPath | null;
  stepProgress: StepProgress;
  setPathStepProgress: (pathStepProgress: PathStepProgress) => void;
};

const ShownStepContent = ({
  hasTarget,
  path,
  stepProgress,
  setPathStepProgress,
}: ShownStepContentProps) => {
  const t = useActiveRouteTranslations();

  if (!hasTarget) {
    return (
      <Typography.Text color="TextSecondary">
        {t["Select a target in the search above"]}
      </Typography.Text>
    );
  }

  if (path == null) {
    return <Typography.Text color="TextSecondary">-</Typography.Text>;
  }

  return (
    <ShownStep
      path={path}
      stepProgress={stepProgress}
      setStepProgress={(newStepProgress) =>
        setPathStepProgress({ path, stepProgress: newStepProgress })
      }
    />
  );
};

const countRemainingActions = (path: EggPath, completedStepCount: number) => {
  const remainingSteps = path.steps_before_target.slice(completedStepCount);

  return {
    accepts: remainingSteps.filter((step) => step.action === "Accept").length,
    rejects: remainingSteps.filter((step) => step.action === "Reject").length,
  };
};

export const Gen7EggActions = () => {
  const t = useActiveRouteTranslations();
  const { target, path } = useTargetPath();
  const [savedPathStepProgress, setSavedPathStepProgress] =
    React.useState<PathStepProgress | null>(null);

  const stepProgress =
    path != null && savedPathStepProgress?.path === path
      ? savedPathStepProgress.stepProgress
      : PATH_START_PROGRESS;

  const remainingActions =
    path == null
      ? null
      : countRemainingActions(path, stepProgress.completedStepCount);

  const borderColor: Color | undefined = match(remainingActions)
    .with(null, () => undefined)
    .with({ accepts: 0, rejects: 0 }, () => "Success" as const)
    .otherwise(() => "Primary" as const);

  return (
    <SectionCard
      title={t["Eggs to accept and reject"]}
      borderColor={borderColor}
    >
      <Flex gap={32} wrap>
        <LabeledCount
          label={t["Accepts left"]}
          count={remainingActions?.accepts ?? null}
          fontSize={REMAINING_COUNT_FONT_SIZE}
        />
        <LabeledCount
          label={t["Rejects left"]}
          count={remainingActions?.rejects ?? null}
          fontSize={REMAINING_COUNT_FONT_SIZE}
        />
      </Flex>
      <Divider m={0} />
      <ShownStepContent
        hasTarget={target != null}
        path={path}
        stepProgress={stepProgress}
        setPathStepProgress={setSavedPathStepProgress}
      />
    </SectionCard>
  );
};

export const Gen7EggTargetSummary = () => {
  const t = useActiveRouteTranslations();
  const { target, path } = useTargetPath();
  const [, setTarget] = useAtom(gen7EggTargetAtom);
  const setPath = useSetAtom(gen7EggPathAtom);
  const setSeedsAfterTarget = useSetAtom(gen7EggSeedsAfterTargetAtom);
  const [, setCurrentStep] = useCurrentStep();
  const egg = target?.egg ?? null;

  const onUseSeedsAfterTarget = () => {
    if (path == null) {
      return;
    }

    setSeedsAfterTarget(path.egg_seeds_after_target);
    setTarget(null);
    setPath(null);
    setCurrentStep(FIND_TARGET_STEP);
  };

  return (
    <Flex vertical gap={16}>
      <SectionCard
        title={t["Target Egg"]}
        borderColor={egg == null ? undefined : "Success"}
      >
        <Flex
          vertical
          gap={8}
          justify="center"
          minHeight={PRESS_TIMING_MIN_HEIGHT}
        >
          <LabeledCount label={t["Advance"]} count={egg?.advance ?? null} />
        </Flex>
        <PokemonTags
          pokemon={egg}
          abilityName={
            egg == null ? null : formatGen7EggAbility(t, egg.ability)
          }
        />
        <Flex gap={8} wrap>
          <Typography.Text color="TextSecondary">
            {t["Egg seeds before accepting"]}
          </Typography.Text>
          <EggSeedsText eggSeeds={egg?.egg_seeds ?? null} />
        </Flex>
      </SectionCard>
      <SectionCard title={t["Egg seeds after accepting"]}>
        <EggSeedsText eggSeeds={path?.egg_seeds_after_target ?? null} />
        <Flex>
          <Button
            trackerId="gen7_use_egg_seeds_after_target"
            type="primary"
            disabled={path == null}
            onClick={onUseSeedsAfterTarget}
          >
            {t["Use as current egg seeds"]}
          </Button>
        </Flex>
      </SectionCard>
    </Flex>
  );
};
