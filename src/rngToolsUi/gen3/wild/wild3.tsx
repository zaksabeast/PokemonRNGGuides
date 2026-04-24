import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { Validator, TargetSetup } from "./wild3CalibTargetSetupInput";
import { useHydrate } from "~/hooks/useHydrate";
import { Skeleton } from "antd";
import { EmeraldPaintingReseeding } from "../paintingReseeding/paintingReseeding";
import { Wild3SearcherFindTarget } from "./wild3FindTarget";
import { hydrationLock } from "~/utils/hydration";
import z from "zod";
import { Flex } from "~/components/flex";
import { useCurrentStep } from "~/components/stepper/state";
import { Wild3Calib } from "./wild3Calib";
import { gen3Consoles } from "~/types/console";
import { BattleVideoInfo } from "../battleVideo/battleVideo";
import {
  gen3LeadSchema,
  wild3Actions,
  wild3FeebasStates,
  wild3MassOutbreakStates,
  wild3RoamerStates,
} from "./utils";
import { gen3Methods } from "~/types";

/*
Possible user flows: 
 - Step 1: Low target advance without painting. Step 2: Too low to create battle video, so must skip.
 - Step 1: Target advance without painting. Step 2: Press "Skip creating battle video".
 - Step 1: Target advance without painting. Step 2: Skip the step without confirming. Step 3: Assumes no battle video was created.
 - Step 1: Target advance without painting. Step 2: Create battle video.
 - Step 1: Target advance with painting. Step 2: Create battle video but can't update battle video because too close to target.
 - Step 1: Target advance with painting. Step 2: Can create and update battle video.
 - Step 1: Target advance with painting. Step 2: Skip battle video (either with or without button). Step 3: Blocked.
 - Skip Step 1. Step 2: Battle video without painting. Step 3: Must provide target and battle video info.
 - Skip Step 1. Step 2: Painting. Can create but can't update battle video because too close to target. Step 3: Must provide target and battle video info.
 - Skip Step 1. Step 2: Painting. Can create and update battle video. Step 3: Must provide target and battle video info.
 - Skip Step 1 & 2. Step 3: Must provide target and battle video info.
*/

const TargetSetupAtomSchema = z.object({
  targetSetup: z
    .object({
      map: z.string(),
      feebasState: z.enum(wild3FeebasStates),
      roamerState: z.enum(wild3RoamerStates),
      massOutbreakState: z.enum(wild3MassOutbreakStates),
      action: z.enum(wild3Actions),
      // Limitation: value in Select must be a primitive, so we use the index instead of Gen3Lead.
      lead: gen3LeadSchema,
      targetPaintingAdvs: z.object({
        before: z.number().int().min(0).max(0xffffffff),
        after: z.number().int().min(0).max(0xffffffff),
      }),
      targetMethod: z.enum(gen3Methods),
      usingAverageLeadCycleSpeed: z.boolean(),
      leadCycleSpeed: z.number().int().min(0).max(900),
    })
    .nullable(),
});

const targetSetupAtom = atomWithPersistence(
  "emerald_wild_targetSetup",
  TargetSetupAtomSchema,
  { targetSetup: null },
);

const battleVideoInfoAtom = atomWithPersistence(
  "emerald_wild_battleVideoInfo",
  z.object({
    battleVideoInfo: z
      .object({
        targetPaintingAdvs: z.object({
          before: z.number().int().min(0),
          after: z.number().int().min(0),
        }),
        battleVideoAdvAfterPainting: z.number().int().min(0),
        consoleType: z.enum(gen3Consoles).nullable(),
      })
      .nullable(),
  }),
  {
    battleVideoInfo: null,
  },
);

export const useTargetSetup = () => useAtom(targetSetupAtom);
export const useBattleVideoInfo = () => useAtom(battleVideoInfoAtom);

// Step 1: Vanilla Wild3SearcherFindTarget
export const Wild3SearcherFindTarget_WithSetTargetSetup = () => {
  const [step, setStep] = useCurrentStep();
  const [targetSetup, setTargetSetup] = useTargetSetup();
  const { hydrated } = useHydrate(targetSetup);

  const [, setBattleVideoInfo] = useBattleVideoInfo();

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
  };

  return <Wild3SearcherFindTarget setTargetSetup={handleSetTargetSetup} />;
};

/** Step 2: Painting + Battle Video
 * This component has 2 modes:
 * 1) Step 1 (targetSetup) is not completed. The user must input the target advs in the fields of the component.
 * 2) Step 1 (targetSetup) is completed. The target advs are provided to the component, and the fields are read-only.
 **/
export const EmeraldPaintingReseeding_WithTargetSetup = () => {
  const [step, setStep] = useCurrentStep();

  const [targetSetupLock] = useTargetSetup();
  const targetSetupHydrate = useHydrate(targetSetupLock);

  const [battleVideoInfo, setBattleVideoInfo] = useBattleVideoInfo();
  const battleVideoInfoHydrate = useHydrate(battleVideoInfo);

  if (!targetSetupHydrate.hydrated || !battleVideoInfoHydrate.hydrated) {
    return <Skeleton />;
  }

  const { targetSetup } = targetSetupHydrate.client;

  if (targetSetup == null) {
    // If step 1 isn't completed, step 2 info isn't forwarded to step 3, to simplify the code.
    return <EmeraldPaintingReseeding />;
  }

  const onBattleVideoCreatedOrSkipped = (battleVideoInfo: BattleVideoInfo) => {
    setBattleVideoInfo(
      hydrationLock({
        battleVideoInfo,
      }),
    );
    setStep(step + 1);
  };

  return (
    <Flex vertical gap={40}>
      <EmeraldPaintingReseeding
        key={JSON.stringify(targetSetup.targetPaintingAdvs)}
        targetPaintingAdvs={targetSetup.targetPaintingAdvs}
        onBattleVideoCreatedOrSkipped={onBattleVideoCreatedOrSkipped}
        targetAction={targetSetup.action}
      />
    </Flex>
  );
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
    return <Wild3Calib />;
  }

  // If painting is required, step 2 (creating battle video) can't be skipped.
  if (battleVideoInfo == null && targetSetup.targetPaintingAdvs.before !== 0) {
    return "You must complete the previous step.";
  }

  // If step 2 is skipped, we assume that battle video was not created.
  const battleVideoInfoWithFallback: BattleVideoInfo = battleVideoInfo ?? {
    targetPaintingAdvs: targetSetup.targetPaintingAdvs,
    battleVideoAdvAfterPainting: 0,
    consoleType: null,
  };

  return (
    <Wild3Calib
      key={
        JSON.stringify(targetSetup) +
        JSON.stringify(battleVideoInfoWithFallback)
      }
      targetSetup={targetSetup}
      battleVideoInfo={battleVideoInfoWithFallback}
    />
  );
};
