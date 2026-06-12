import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { TargetSetup } from "./wild3TargetSetupInput";
import { useHydrate } from "~/hooks/useHydrate";
import { Skeleton } from "antd";
import { EmeraldPaintingReseeding } from "../paintingReseeding/paintingReseeding";
import { Wild3TargetSetupSearcher } from "./wild3TargetSetupSearcher";
import { hydrationLock } from "~/utils/hydration";
import z from "zod";
import { Flex } from "~/components/flex";
import { useCurrentStep } from "~/components/stepper/state";
import { Wild3Calib } from "./wild3Calib";
import { BattleVideoInfo } from "../battleVideo/battleVideo";
import {
  gen3LeadSchema,
  wild3Actions,
  wild3FeebasStates,
  wild3MassOutbreakStates,
  wild3RoamerStates,
} from "./utils";
import { gen3Methods } from "~/types";
import { pokeblockSchema } from "~/types/pokeblock";
import { AVERAGE_LEAD_CYCLE_SPEED } from "./wild3LeadCycleSpeedInput";
import { EmeraldAceChangeSid } from "../ace/emeraldAceChangeSid";
import { createBattleVideoInfoAtom } from "../pokemonRng/shared";

/*
Possible user flows (documentation for testing):
 - Case 1) Step 1: Low target advance without painting. Step 2: Too low to create battle video, so must skip.
      Step1: Abra, no filter, adv 1005, Wild1. (Abra, Lvl 7, Male, InnerFocus, Lonely, HP 21, ATK 8, DEF 7, SPA 20, SPD 14, SPE 18)
      Step2: Skip.
      Step3: Wild1 bad adv: Whismur, Lvl 6, Female, Hasty, Soundproof, 24/12/7/11/9/9, adv 1027
             Wild2 target adv: Abra, Lvl 7, Male, InnerFocus, Lonely, HP 21, ATK 8, DEF 8, SPA 20, SPD 14, SPE 17
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
 - Case 12) Calibrate lead cycle speed with default value from step 1
      Step1: Abra, no filter, adv 1005, Wild4, vanilla lead. (Abra, Lvl 7, Male, InnerFocus, Lonely, HP 21, ATK 8, DEF 7, SPA 20, SPD 14, SPE 17)
        Don't select a particular lead cycle speed.
      Step2: Skip.
      Step3: Expected: Displayed "Lead cycle speed" is Average. Likelihood is ~50.8%.
             Wild2 target adv: Abra, Lvl 7, Male, InnerFocus, Lonely, HP 21, ATK 8, DEF 8, SPA 20, SPD 14, SPE 17
             Change lead cycle speed for ideal.
 - Case 13) Calibrate lead with specified lead cycle speed from step 1
      Same as case 12, but select the ideal lead cycle speed in step 1.
      In step 3: the Lead cycle speed displayed is ~603. Likelihood is ~96.6%.
 - Case 14) Skip step 1 & 2.
      Same as case 12, but select the ideal lead cycle speed in step 1.
      In step 3: the Lead cycle speed displayed is ~603. Likelihood is ~96.6%.
 - Case 15) Skip step 1 & 2.
      Same as case 12, but select the egg lead setup (target method wild1) in step 1.
      Lead cycle speed is unchangeable.
*/

/*
 ===Components overview ===

Utilities:
  - Wild3TargetSetupInput
      display: fields to manually indicate setup
      output = TargetSetup
  - Wild3LeadCycleSpeedSelector
      input = target setup
      display likelihood by lead cycle speed
      output = lead cycle speed
  - Wild3TargetSetupAndLeadInput
      Wild3TargetSetupInput + Wild3LeadCycleSpeedSelector
  - EmeraldPaintingReseeding
      input = target advance
      output = battle video
  - Wild3CalibCaughtMon
      input = target setup
      displays fields to specify caught pokemon
      output = hit advance

All-in-one Wild webtool:
  Wild3: Root for steps 1,2,3

  Step-1: Wild3TargetSetupSearcher
      display: fields to search for target pokemon
      output = TargetSetup + LeadCycleSpeed
      equivalent to Wild3TargetSetupAndLeadInput

  Step-2: EmeraldPaintingReseeding

  Step-3: Wild3Calib
    display: Wild3CalibCaughtMon + Wild3LeadCycleSpeedSelector
             if target setup was skipped, displays Wild3TargetSetupInput

*/

const targetSetupAtomSchema = z.object({
  targetSetup: z
    .object({
      map: z.string(),
      feebasState: z.enum(wild3FeebasStates),
      roamerState: z.enum(wild3RoamerStates),
      massOutbreakState: z.enum(wild3MassOutbreakStates),
      action: z.enum(wild3Actions),
      lead: gen3LeadSchema,
      targetPaintingAdvs: z.object({
        before: z.number().int().min(0).max(0xffffffff),
        after: z.number().int().min(0).max(0xffffffff),
      }),
      targetMethod: z.enum(gen3Methods),
      requiresWhiteFlute: z.boolean().optional().default(false),
      safariPokeblock: pokeblockSchema.optional().default(null),
      aceSid: z
        .number()
        .int()
        .min(0)
        .max(0xffff)
        .optional()
        .nullable()
        .default(null),
    })
    .nullable(),
});

const targetSetupAtom = atomWithPersistence(
  "emerald_wild_targetSetup",
  targetSetupAtomSchema,
  { targetSetup: null },
);

const leadCycleSpeedAtomSchema = z.object({
  leadCycleSpeed: z.number().int().min(0).max(900),
});

const leadCycleSpeedAtom = atomWithPersistence(
  "emerald_wild_leadCycleSpeed",
  leadCycleSpeedAtomSchema,
  { leadCycleSpeed: AVERAGE_LEAD_CYCLE_SPEED },
);

const battleVideoInfoAtom = createBattleVideoInfoAtom(
  "emerald_wild_battleVideoInfo",
);

export const useTargetSetup = () => useAtom(targetSetupAtom);
export const useLeadCycleSpeed = () => useAtom(leadCycleSpeedAtom);
export const useBattleVideoInfo = () => useAtom(battleVideoInfoAtom);

// Step 1: Vanilla Wild3TargetSetupSearcher
export const Wild3TargetSetupSearcher_WithSetTargetSetup = () => {
  const [targetSetup, setTargetSetup] = useTargetSetup();
  const { hydrated } = useHydrate(targetSetup);

  const [, setLeadCycleSpeed] = useLeadCycleSpeed();
  const [, setBattleVideoInfo] = useBattleVideoInfo();

  if (!hydrated) {
    return <Skeleton />;
  }

  const handleSetTargetSetup = (targetSetup: TargetSetup | null) => {
    setTargetSetup(
      hydrationLock({
        targetSetup,
      }),
    );
    setLeadCycleSpeed(
      hydrationLock({
        leadCycleSpeed: AVERAGE_LEAD_CYCLE_SPEED,
      }),
    );
    setBattleVideoInfo(
      hydrationLock({
        battleVideoInfo: null,
      }),
    );
  };

  const handleSetLeadCycleSpeed = (leadCycleSpeed: number) => {
    setLeadCycleSpeed(
      hydrationLock({
        leadCycleSpeed,
      }),
    );
    setBattleVideoInfo(
      hydrationLock({
        battleVideoInfo: null,
      }),
    );
  };

  return (
    <Wild3TargetSetupSearcher
      setTargetSetup={handleSetTargetSetup}
      setLeadCycleSpeed={handleSetLeadCycleSpeed}
    />
  );
};

export const EmeraldWildAceChangeSid_WithTargetSetup = () => {
  const [targetSetupLock] = useTargetSetup();
  const targetSetupHydrate = useHydrate(targetSetupLock);

  if (!targetSetupHydrate.hydrated) {
    return <Skeleton />;
  }

  const { targetSetup } = targetSetupHydrate.client;

  const { aceSid } = targetSetup ?? {};
  if (aceSid == null) {
    // No ACE setup
    return null;
  }

  return <EmeraldAceChangeSid sid={aceSid} />;
};

/** Step 2: Painting + Battle Video
 * This component has 2 modes:
 * 1) Step 1 (targetSetup) is not completed. The user must input the target advs in the fields of the component.
 * 2) Step 1 (targetSetup) is completed. The target advs are provided to the component, and the fields are read-only.
 **/
export const EmeraldWildPaintingReseeding_WithTargetSetup = () => {
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

  const [leadCycleSpeedLock, setLeadCycleSpeed] = useLeadCycleSpeed();
  const leadCycleSpeedHydrate = useHydrate(leadCycleSpeedLock);

  const [battleVideoInfoLock, setBattleVideoInfo] = useBattleVideoInfo();
  const battleVideoHydrate = useHydrate(battleVideoInfoLock);

  if (
    !targetSetupHydrate.hydrated ||
    !leadCycleSpeedHydrate.hydrated ||
    !battleVideoHydrate.hydrated
  ) {
    return <Skeleton />;
  }
  const { targetSetup } = targetSetupHydrate.client;
  const { leadCycleSpeed } = leadCycleSpeedHydrate.client;
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
    setLeadCycleSpeed(
      hydrationLock({
        leadCycleSpeed: AVERAGE_LEAD_CYCLE_SPEED,
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
      targetSetup={targetSetup}
      leadCycleSpeed={leadCycleSpeed}
      battleVideoInfo={battleVideoInfoWithFallback}
      clearAll={clearAll}
      displayInstructions
    />
  );
};
