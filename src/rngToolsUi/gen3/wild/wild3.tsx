import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { TargetSetupSchema, TargetSetup } from "./wild3CalibTarget";
import { useHydrate } from "~/hooks/useHydrate";
import { Skeleton } from "antd";
import { EmeraldPaintingReseeding, BattleVideoInfo } from "../paintingReseeding/paintingReseeding";
import { Wild3SearcherFindTarget } from "./wild3FindTarget";
import { hydrationLock, HydrationLock } from "~/utils/hydration";
import z from "zod";
import { Flex } from "~/components/flex";
import { FormFieldTable } from "~/components";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { useCurrentStep } from "~/components/stepper/state";
import { Wild3Calib } from "./wild3Calib";
import { Gen3Console, gen3Consoles } from "~/types/console";

/*
Possible user flows: 
 - Step 1: Low target advance without painting. (Too low to create battle video)
 - Step 1: Target advance without painting. Skip creating battle video.
 - Step 1: Target advance without painting. Create battle video.
 - Step 1: Target advance with painting. Can't update battle video because too close to target.
 - Step 1: Target advance with painting. Can update battle video.
 - Skip Step 1. Step 2: Battle video no painting.
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

/** This component has 2 modes:
 * 1) Step 1 (targetSetup) is completed. The target adv is provided to the component, and the fields are read-only.
 * 2) Step 1 is not completed. The user must input the target adv in the fields of the component.
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

  const targetPaintingAdvs = targetSetup == null ? undefined : {
    before: targetSetup.targetFrameBeforePainting,
    after: targetSetup.targetAdvance,
  };

  const infoPrevStep = (() => {
    if (!targetPaintingAdvs)
      return null;

    const isUsingPainting = targetPaintingAdvs.before !== 0;
    return <Flex vertical>
      <h3>Info from previous step</h3>
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
          label: "Target Advance",
          input: formatLargeInteger(targetPaintingAdvs.after),
        },
      ]} />
    </Flex>;
  })();

  const [step, setStep] = useCurrentStep();
  const onBattleVideoCreated = (battleVideoInfo: BattleVideoInfo) => {
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
      onBattleVideoCreated={onBattleVideoCreated}
      targetAction={targetSetup?.action} />
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

  // console.log('wild3', targetSetup, battleVideoInfo);

  return <Wild3Calib
    key={JSON.stringify(targetSetup ?? null) + JSON.stringify(battleVideoInfo ?? null)}
    targetSetup={targetSetup ?? undefined}
    battleVideoInfo={battleVideoInfo ?? undefined}
  />;
}

//NO_PROD no hook when battle video is created without painting.