import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { TargetSetupSchema, TargetSetup } from "./wild3CalibTarget";
import { useHydrate } from "~/hooks/useHydrate";
import { Skeleton } from "antd";
import { EmeraldPaintingReseeding } from "../paintingReseeding/paintingReseeding";
import { Wild3SearcherFindTarget } from "./wild3FindTarget";
import { hydrationLock, HydrationLock } from "~/utils/hydration";
import z from "zod";
import { Flex } from "~/components/flex";
import { FormFieldTable } from "~/components";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { useCurrentStep } from "~/components/stepper/state";
import { Wild3Calib } from "./wild3Calib";
import { Gen3Console, gen3Consoles } from "~/types/console";
import { BattleVideoInfo } from "../battleVideo/battleVideo";

/*
Possible user flows: 
 - Step 1: Low target advance without painting. (Too low to create battle video)
 - Step 1: Target advance without painting. Skip creating battle video.
 - Step 1: Target advance without painting. Create battle video.
 - Step 1: Target advance with painting. Can't update battle video because too close to target.
 - Step 1: Target advance with painting. Can update battle video.
 - Skip Step 1. Step 2: Battle video without painting.
 - Skip Step 1. Step 2: Painting. Can't update battle video because too close to target.
 - Skip Step 1. Step 2: Painting. Can update battle video.
 - Skip Step 1 & 2.

 - Note: "Skip Step 1. Step 2: No battle video." Is not directly supported. User must start with Step 3 instead.
*/

const TargetSetupNullableSchema = z.object({
  targetSetup: z.object().extend(TargetSetupSchema.shape).nullable(),
});

const targetSetup = atomWithPersistence(
  "emerald_wild_targetSetup",
  TargetSetupNullableSchema,
  { targetSetup: null },
);

const battleVideoInfo = atomWithPersistence(
  "emerald_wild_battleVideoInfo",
  z.object({
    battleVideoInfo: z.object({
      targetPaintingAdvs: z.object({
        before: z.number().int().min(0),
        after: z.number().int().min(0),
      }),
      battleVideoAdvAfterPainting: z.number().int().min(0),
      consoleType: z.enum(gen3Consoles).nullable(),
    }).nullable(),
  }),
  {
    battleVideoInfo: null,
  },
);


export const useTargetSetup = () => useAtom(targetSetup);
export const useBattleVideoInfo = () => useAtom(battleVideoInfo);

// Step 1: Vanilla Wild3SearcherFindTarget
export const Wild3SearcherFindTarget_WithSetTargetSetup = () => {
  const [step, setStep] = useCurrentStep();
  const [targetSetup, setTargetSetup] = useTargetSetup();
  const { hydrated } = useHydrate(targetSetup);

  const [_, setBattleVideoInfo] = useBattleVideoInfo();

  if (!hydrated) {
    return <Skeleton />;
  }

  const handleSetTargetSetup = (targetSetup: TargetSetup) => {
    setTargetSetup(
      hydrationLock({
        targetSetup,
      }),
    );
    setBattleVideoInfo(
      hydrationLock({
        battleVideoInfo: null,
      }),
    );
    setStep(step + 1);
  }

  return <Wild3SearcherFindTarget setTargetSetup={handleSetTargetSetup} />;
};

/** Step 2: Painting + Battle Video
 * This component has 2 modes:
 * 1) Step 1 (targetSetup) is not completed. The user must input the target advs in the fields of the component. 
 * 2) Step 1 (targetSetup) is completed. The target advs are provided to the component, and the fields are read-only.
 **/
export const EmeraldPaintingReseeding_WithTargetSetup = () => {
  const [targetSetupLock] = useTargetSetup();
  const targetSetupHydrate = useHydrate(targetSetupLock);

  const [battleVideoAdvAfterPainting, setBattleVideoInfo] = useBattleVideoInfo();
  const battleVideoHydrate = useHydrate(battleVideoAdvAfterPainting);

  if (!targetSetupHydrate.hydrated || !battleVideoHydrate.hydrated) {
    return <Skeleton />;
  }

  const { targetSetup } = targetSetupHydrate.client;

  if (targetSetup == null) {
    return <EmeraldPaintingReseeding />
  }

  const targetPaintingAdvs = {
    before: targetSetup.targetFrameBeforePainting,
    after: targetSetup.targetAdvance,
  };

  const infoPrevStep = (() => {
    const isUsingPainting = targetPaintingAdvs.before !== 0;
    return <Flex vertical>
      <h3>Info from the previous step</h3>
      <FormFieldTable fields={isUsingPainting ? [
        {
          label: "Target frame before painting",
          input: formatLargeInteger(targetPaintingAdvs.before),
        },
        {
          label: "Target advance after painting",
          input: formatLargeInteger(targetPaintingAdvs.after),
        },
      ] : [
        {
          label: "Target advance",
          input: formatLargeInteger(targetPaintingAdvs.after),
        },
      ]} />
    </Flex>;
  })();

  const [step, setStep] = useCurrentStep();

  const onBattleVideoCreatedOrSkipped = (battleVideoInfo: BattleVideoInfo) => {
    setBattleVideoInfo(hydrationLock({
      battleVideoInfo,
    }));
    setStep(step + 1);
  };

  return (<Flex vertical gap={40}>
    {infoPrevStep}
    <EmeraldPaintingReseeding
      key={JSON.stringify(targetPaintingAdvs)}
      targetPaintingAdvs={targetPaintingAdvs}
      onBattleVideoCreatedOrSkipped={onBattleVideoCreatedOrSkipped}
      targetAction={targetSetup.action} />
  </Flex>);
};

export const Wild3Calib_WithTargetSetupAndBattleVideo = () => {
  const [targetSetupLock] = useTargetSetup();
  const targetSetupHydrate = useHydrate(targetSetupLock);

  const [battleVideoAdvAfterPainting] = useBattleVideoInfo();
  const battleVideoHydrate = useHydrate(battleVideoAdvAfterPainting);

  if (!targetSetupHydrate.hydrated || !battleVideoHydrate.hydrated) {
    return <Skeleton />;
  }
  const { targetSetup } = targetSetupHydrate.client;
  const { battleVideoInfo } = battleVideoHydrate.client;

  // To simplify the code, Wild3Calib is not adapted to support battle video info without target setup.
  // The downside is that it forces the user to input twice their battle video advances.
  if (targetSetup == null) {
    return <Wild3Calib />
  }

  // If painting is required, step 2 (creating battle video) can't be skipped.
  if (battleVideoInfo == null && targetSetup.targetFrameBeforePainting !== 0) {
    return "You must complete the previous step.";
  }

  // If step 2 is skipped, we assume that battle video was not created.
  const battleVideoInfoWithFallback: BattleVideoInfo = battleVideoInfo || {
    targetPaintingAdvs: {
      before: targetSetup.targetFrameBeforePainting,
      after: targetSetup.targetAdvance,
    },
    battleVideoAdvAfterPainting: 0,
    consoleType: null,
  };

  return <Wild3Calib
    key={JSON.stringify(targetSetup) + JSON.stringify(battleVideoInfoWithFallback)}
    targetSetup={targetSetup}
    battleVideoInfo={battleVideoInfoWithFallback}
  />;
}
