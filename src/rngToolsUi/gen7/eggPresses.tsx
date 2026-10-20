import React from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Button, Divider, Flex, SectionCard, Typography } from "~/components";
import { type Gen7EggPath as EggPath } from "~/rngTools";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useCurrentStep } from "~/components/stepper/state";
import { formatHex } from "~/utils/formatHex";
import { formatGen7EggAbility, withGen7EggSeed } from "./eggForm";
import {
  gen7EggFormValuesAtom,
  gen7EggPathAtom,
  gen7EggTargetAtom,
} from "./eggState";
import { GiftTags, PRESS_TIMING_MIN_HEIGHT } from "./sectionCards";

const PLACEHOLDER = "-";
const FIND_TARGET_STEP = 0;
const GET_EGG_STEP = 2;
const CURRENT_EGG_MIN_HEIGHT = 120;
// Smaller than the current egg's action, which matters more.
const LEFT_COUNT_FONT_SIZE = 24;

type EggSeed = EggPath["seed_after_target"];

// Same order as the search's egg seed fields.
const formatEggSeed = (seed: EggSeed) =>
  [seed[3], seed[2], seed[1], seed[0]]
    .map((value) => formatHex(value))
    .join(" ");

const EggSeedText = ({ seed }: { seed: EggSeed | null }) => (
  <Typography.Text code={seed != null} color="TextSecondary">
    {seed == null ? PLACEHOLDER : formatEggSeed(seed)}
  </Typography.Text>
);

/** The path for the selected target, once it has loaded. */
const useTargetPath = () => {
  const target = useAtomValue(gen7EggTargetAtom);
  const targetPath = useAtomValue(gen7EggPathAtom);
  return {
    target,
    path: targetPath?.target === target ? targetPath.path : null,
  };
};

type CountProps = {
  label: string;
  count: number | null;
  fontSize?: number;
};

const Count = ({ label, count, fontSize = 36 }: CountProps) => (
  <Flex vertical>
    <Typography.Text color="TextSecondary">{label}</Typography.Text>
    <Typography.Text fontSize={fontSize} strong>
      {count ?? PLACEHOLDER}
    </Typography.Text>
  </Flex>
);

type Progress = {
  // Eggs accepted or rejected so far.
  done: number;
  // The egg shown, which can be an earlier one.
  viewing: number;
};

const NO_PROGRESS: Progress = { done: 0, viewing: 0 };

type CurrentEggProps = {
  path: EggPath;
  progress: Progress;
  setProgress: (progress: Progress) => void;
};

const CurrentEgg = ({ path, progress, setProgress }: CurrentEggProps) => {
  const t = useActiveRouteTranslations();
  const [, setCurrentStep] = useCurrentStep();
  const { done, viewing } = progress;
  const total = path.steps.length;
  const step = path.steps[viewing];
  const isPast = viewing < done;

  const previousButton = (
    <Button
      trackerId="gen7_egg_step_previous"
      disabled={viewing === 0}
      onClick={() => setProgress({ done, viewing: viewing - 1 })}
    >
      {t["Previous"]}
    </Button>
  );

  // Every egg is done, or there were none to begin with.
  if (step == null) {
    return (
      <Flex vertical gap={16}>
        <Flex
          vertical
          gap={8}
          justify="center"
          minHeight={CURRENT_EGG_MIN_HEIGHT}
        >
          <Typography.Text fontSize={36} strong color="Success">
            {t["All done"]}
          </Typography.Text>
          <Typography.Text color="TextSecondary">
            {total === 0
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
  }

  const isAccept = step.action === "Accept";

  return (
    <Flex vertical gap={16}>
      <Flex
        vertical
        gap={8}
        justify="center"
        minHeight={CURRENT_EGG_MIN_HEIGHT}
      >
        <Typography.Text color="TextSecondary">
          {t["Egg {current} of {total}"]
            .replace("{current}", (viewing + 1).toString())
            .replace("{total}", total.toString())}
          {isPast && ` (${t["already done"]})`}
        </Typography.Text>
        <Typography.Text
          fontSize={36}
          strong
          color={isAccept ? "Success" : "Error"}
        >
          {isAccept ? t["Accept"] : t["Reject"]}
        </Typography.Text>
        <Flex gap={8} wrap>
          <Typography.Text color="TextSecondary">
            {t["Egg seeds before"]}
          </Typography.Text>
          <EggSeedText seed={step.seed_before} />
        </Flex>
      </Flex>
      <Flex gap={8} wrap>
        {previousButton}
        {isPast ? (
          <>
            <Button
              trackerId="gen7_egg_step_next"
              onClick={() => setProgress({ done, viewing: viewing + 1 })}
            >
              {t["Next"]}
            </Button>
            <Button
              trackerId="gen7_egg_step_current"
              type="primary"
              onClick={() => setProgress({ done, viewing: done })}
            >
              {t["Back to current egg"]}
            </Button>
            <Button
              trackerId="gen7_egg_step_undo"
              type="link"
              onClick={() => setProgress({ done: viewing, viewing })}
            >
              {t["Redo from this egg"]}
            </Button>
          </>
        ) : (
          <Button
            trackerId="gen7_egg_step_done"
            type="primary"
            onClick={() => setProgress({ done: done + 1, viewing: done + 1 })}
          >
            {isAccept ? t["Accepted, next egg"] : t["Rejected, next egg"]}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

/** Accepts and rejects in the eggs not done yet. */
const countLeft = (path: EggPath, done: number) => {
  const left = path.steps.slice(done);
  return {
    accepts: left.filter((step) => step.action === "Accept").length,
    rejects: left.filter((step) => step.action === "Reject").length,
  };
};

export const Gen7EggPath = () => {
  const t = useActiveRouteTranslations();
  const { target, path } = useTargetPath();
  const [savedProgress, setSavedProgress] = React.useState<{
    path: EggPath;
    progress: Progress;
  } | null>(null);
  // A new path starts from its first egg.
  const progress =
    path != null && savedProgress?.path === path
      ? savedProgress.progress
      : NO_PROGRESS;
  const left = path == null ? null : countLeft(path, progress.done);
  const allDone = left != null && left.accepts === 0 && left.rejects === 0;

  const currentEgg = (() => {
    if (target == null) {
      return (
        <Typography.Text color="TextSecondary">
          {t["Select a target in the search above"]}
        </Typography.Text>
      );
    }
    if (path == null) {
      return (
        <Typography.Text color="TextSecondary">{PLACEHOLDER}</Typography.Text>
      );
    }
    return (
      <CurrentEgg
        path={path}
        progress={progress}
        setProgress={(newProgress) =>
          setSavedProgress({ path, progress: newProgress })
        }
      />
    );
  })();

  return (
    <SectionCard
      title={t["Eggs to accept and reject"]}
      borderColor={(() => {
        if (left == null) {
          return undefined;
        }
        return allDone ? "Success" : "Primary";
      })()}
    >
      <Flex gap={32} wrap>
        <Count
          label={t["Accepts left"]}
          count={left?.accepts ?? null}
          fontSize={LEFT_COUNT_FONT_SIZE}
        />
        <Count
          label={t["Rejects left"]}
          count={left?.rejects ?? null}
          fontSize={LEFT_COUNT_FONT_SIZE}
        />
      </Flex>
      <Divider m={0} />
      {currentEgg}
    </SectionCard>
  );
};

export const Gen7EggTarget = () => {
  const t = useActiveRouteTranslations();
  const { target, path } = useTargetPath();
  const [, setTarget] = useAtom(gen7EggTargetAtom);
  const setPath = useSetAtom(gen7EggPathAtom);
  const setFormValues = useSetAtom(gen7EggFormValuesAtom);
  const [, setCurrentStep] = useCurrentStep();
  const egg = target?.egg ?? null;

  const onUseSeeds = () => {
    if (target == null || path == null) {
      return;
    }
    setFormValues(withGen7EggSeed(target.formValues, path.seed_after_target));
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
          <Count label={t["Advance"]} count={egg?.advance ?? null} />
        </Flex>
        <GiftTags
          gift={egg}
          abilityName={
            egg == null ? null : formatGen7EggAbility(t, egg.ability)
          }
        />
        <Flex gap={8} wrap>
          <Typography.Text color="TextSecondary">
            {t["Egg seeds before accepting"]}
          </Typography.Text>
          <EggSeedText seed={egg?.seed ?? null} />
        </Flex>
      </SectionCard>
      <SectionCard title={t["Egg seeds after accepting"]}>
        <EggSeedText seed={path?.seed_after_target ?? null} />
        <Flex>
          <Button
            trackerId="gen7_use_egg_seeds_after_target"
            type="primary"
            disabled={path == null}
            onClick={onUseSeeds}
          >
            {t["Use as current egg seeds"]}
          </Button>
        </Flex>
      </SectionCard>
    </Flex>
  );
};
