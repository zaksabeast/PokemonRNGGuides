import React from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Button, Flex, SectionCard, Typography } from "~/components";
import { type Gen7EggPath as EggPath, type Gen7EggPathStep } from "~/rngTools";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useCurrentStep } from "~/components/stepper/state";
import { formatHex } from "~/utils/formatHex";
import { Translations } from "~/translations";
import { formatGen7EggAbility, withGen7EggSeed } from "./eggForm";
import {
  gen7EggFormValuesAtom,
  gen7EggPathAtom,
  gen7EggTargetAtom,
} from "./eggState";
import { GiftTags, PRESS_TIMING_MIN_HEIGHT } from "./sectionCards";

const PLACEHOLDER = "-";
const FIND_TARGET_STEP = 0;

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
};

const Count = ({ label, count }: CountProps) => (
  <Flex vertical>
    <Typography.Text color="TextSecondary">{label}</Typography.Text>
    <Typography.Text fontSize={36} strong>
      {count ?? PLACEHOLDER}
    </Typography.Text>
  </Flex>
);

const formatStep = (t: Translations, step: Gen7EggPathStep) => {
  if (step.action === "Accept") {
    return t["Accept 1 egg"];
  }
  return step.count === 1
    ? t["Reject 1 egg"]
    : t["Reject {count} eggs"].replace("{count}", step.count.toString());
};

type PathStepsProps = {
  path: EggPath;
};

const PathSteps = ({ path }: PathStepsProps) => {
  const t = useActiveRouteTranslations();
  const [done, setDone] = React.useState<{
    path: EggPath;
    steps: Set<number>;
  } | null>(null);
  // A new path starts with nothing done.
  const doneSteps = done?.path === path ? done.steps : new Set<number>();

  const toggle = (index: number) => {
    const steps = new Set(doneSteps);
    if (!steps.delete(index)) {
      steps.add(index);
    }
    setDone({ path, steps });
  };

  if (path.steps.length === 0) {
    return (
      <Typography.Text color="TextSecondary">
        {
          t[
            "The next egg is your target, so there's nothing to accept or reject."
          ]
        }
      </Typography.Text>
    );
  }

  return (
    <Flex vertical gap={12}>
      {path.steps.map((step, index) => {
        const isDone = doneSteps.has(index);
        return (
          <Flex
            key={index}
            gap={12}
            align="center"
            justify="space-between"
            wrap
          >
            <Flex vertical>
              <Typography.Text strong delete={isDone}>
                {`${index + 1}. ${formatStep(t, step)}`}
              </Typography.Text>
              <Flex gap={8} wrap>
                <Typography.Text color="TextSecondary">
                  {t["Egg seeds before"]}
                </Typography.Text>
                <EggSeedText seed={step.seed_before} />
              </Flex>
            </Flex>
            <Button
              trackerId="gen7_toggle_egg_step"
              type={isDone ? "primary" : "default"}
              onClick={() => toggle(index)}
            >
              {t["Done"]}
            </Button>
          </Flex>
        );
      })}
    </Flex>
  );
};

export const Gen7EggPath = () => {
  const t = useActiveRouteTranslations();
  const { target, path } = useTargetPath();

  const steps = (() => {
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
    return <PathSteps path={path} />;
  })();

  return (
    <Flex vertical gap={16}>
      <SectionCard
        title={t["Eggs to accept and reject"]}
        borderColor={path == null ? undefined : "Primary"}
      >
        <Flex
          gap={32}
          wrap
          minHeight={PRESS_TIMING_MIN_HEIGHT}
          align="flex-end"
        >
          <Count label={t["Accepts"]} count={path?.accepts ?? null} />
          <Count label={t["Rejects"]} count={path?.rejects ?? null} />
        </Flex>
      </SectionCard>
      <SectionCard title={t["Follow these steps in order"]}>
        {steps}
      </SectionCard>
    </Flex>
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
