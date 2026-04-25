import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { TargetSetup } from "./wild3CalibTargetSetupInput";
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
Possible user flows (for testing): 
 - Case 1) Step 1: Low target advance without painting. Step 2: Too low to create battle video, so must skip.
      Step1: Abra, no filter, adv 1005, Wild1. (Abra, Lvl 7, Male, InnerFocus, Lonely, HP 21, ATK 8, DEF 7, SPA 20, SPD 14, SPE 18)
      Step2: Skip.
      Step3: Whismur, Lvl 6, Female, Hasty, Soundproof, 24/12/7/11/9/9, adv 1027
 - Case 2) Step 1: Target advance without painting. Step 2: Press "Skip creating battle video".
      Step1: Abra, no filter, min adv 10000, select adv 10004, Wild1 (Abra, Lvl 8, Male, Careful, HP 22, ATK 10, DEF 9, SPA 19, SPD 16, SPE 21). 
      Step2: Skip. 
      Step3: Zubat, Lvl 7, Female, Serious, 23/12/11/9/12/14, adv 10008
 - Case 3) Step 1: Target advance without painting. Step 2: Skip the step without confirming. Step 3: Assumes no battle video was created.
      Same as Case 2)
 - Case 4) Step 1: Target advance without painting. Step 2: Create battle video.
      Same as Case 2)
 - Case 5) Step 1: Target advance with painting. Step 2: Can create and update battle video.
      Step 1: Abra, with painting, 31/31/31/31/31/31. select 2,582 | ~19,887.  (Abra, Lvl 7, Male, Synchronize, Modest, HP 22, ATK 8, DEF 9, SPA 23, SPD 14, SPE 19)
      Step 2:  1 painting frame early: Golbat, Lvl 38, Male, Inner Focus, Rash, 107/73/58/63/58/76, adv 5870
               On painting frame target: Makuhita, Lvl 36, Female, Guts, Modest, 100/51/32/30/26/30, adv 5919
      Step 3: Nincada, Lvl 6, Female, Compound Eyes, Naive, 19/10/17/8/8/12, adv 20000
 - Case 6) Step 1: Target advance with painting. Step 2: Create battle video but can't update battle video because too close to target.
       Same as Case 5, but manually specify a battle video safety buffer of 20,000.
 - Case 7) Step 1: Target advance with painting. Step 2: Skip battle video (either with or without button). Step 3: Blocked.
       Same as Case 6, but skip battle video.
 - Case 8) Skip Step 1. Step 2: Battle video without painting. Step 3: Must provide target and battle video info.
 - Case 9) Skip Step 1. Step 2: Painting. Can create but can't update battle video because too close to target. Step 3: Must provide target and battle video info.
 - Case 10) Skip Step 1. Step 2: Painting. Can create and update battle video. Step 3: Must provide target and battle video info.
 - Case 11) Skip Step 1 & 2. Step 3: Must provide target and battle video info.
      Route 116, Sweet Scent, Ordinary Lead, Custom speed 100, advs 2,582 | ~19,887, wild1 (Abra, Lvl 7, Male, Synchronize, Modest, HP 22, ATK 8, DEF 9, SPA 23, SPD 14, SPE 19)
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

  const [targetSetupLock, setTargetSetup] = useTargetSetup();
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

  const clearAll = () => {
    setTargetSetup(
      hydrationLock({
        targetSetup: null,
      }),
    );
    setBattleVideoInfo(
      hydrationLock({
        battleVideoInfo: null,
      }),
    );
  };

  return (
    <Flex vertical gap={40}>
      <EmeraldPaintingReseeding
        key={JSON.stringify(targetSetup.targetPaintingAdvs)}
        targetPaintingAdvs={targetSetup.targetPaintingAdvs}
        onBattleVideoCreatedOrSkipped={onBattleVideoCreatedOrSkipped}
        targetAction={targetSetup.action}
        clearAll={clearAll}
      />
    </Flex>
  );
};

export const Wild3Calib_WithTargetSetupAndBattleVideo = () => {
  const [targetSetupLock, setTargetSetup] = useTargetSetup();
  const targetSetupHydrate = useHydrate(targetSetupLock);

  const [battleVideoAdvAfterPainting, setBattleVideoInfo] =
    useBattleVideoInfo();
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
  if (targetSetup.targetPaintingAdvs.before !== 0) {
    if (
      battleVideoInfo == null ||
      battleVideoInfo.battleVideoAdvAfterPainting === 0
    ) {
      return "You must complete the previous step to create a Battle Video.";
    }
  }

  // If step 2 is skipped, we assume that battle video was not created.
  const battleVideoInfoWithFallback: BattleVideoInfo = battleVideoInfo ?? {
    targetPaintingAdvs: targetSetup.targetPaintingAdvs,
    battleVideoAdvAfterPainting: 0,
    consoleType: null,
  };

  const clearAll = () => {
    setTargetSetup(
      hydrationLock({
        targetSetup: null,
      }),
    );
    setBattleVideoInfo(
      hydrationLock({
        battleVideoInfo: null,
      }),
    );
  };

  return (
    <Wild3Calib
      key={
        JSON.stringify(targetSetup) +
        JSON.stringify(battleVideoInfoWithFallback)
      }
      targetSetup={targetSetup}
      battleVideoInfo={battleVideoInfoWithFallback}
      clearAll={clearAll}
    />
  );
};
