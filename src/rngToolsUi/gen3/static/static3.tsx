import {
  Static3TargetSetupSearcher,
  TargetSetup,
} from "./static3TargetSetupSearcher";
import { gen3StaticMethods } from "./constants";
import z from "zod";
import { species } from "~/types/species";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { useHydrate } from "~/hooks/useHydrate";
import {
  aceSidSchema,
  createBattleVideoInfoAtom,
  targetPaintingAdvsSchema,
} from "../pokemonRng/mainComponent";
import { hydrationLock } from "~/utils/hydration";
import { Skeleton } from "antd";
import { useCurrentStep } from "~/components/stepper/state";
import { EmeraldPaintingReseeding } from "../paintingReseeding/paintingReseeding";
import { BattleVideoInfo } from "../battleVideo/battleVideo";
import { Flex } from "~/components/flex";
import { EmeraldAceChangeSid } from "../ace/emeraldAceChangeSid";
import { Static3Calib } from "./static3Calib";

// Limitation: Multi-step components only support Emerald.

/*
static3 and wild3 share the same structure pattern.
The main difference is that static3 don't have the concept of lead cycle speed, and multiple target method.

Possible user flows (documentation for testing):
  1- Search for a shiny Latios with TID 11568 and SID 15096. Select advance 1011. PID=E601F1CD, IVS=14/31/17/18/29/28
      Find a Hardy 140/103/97/150/123/122 Latios. Hit advance is -1.

For more advanced user flows, check wild3.
*/

const targetSetupAtom = atomWithPersistence(
  "emerald_static_targetSetup",
  z.object({
    targetSetup: z
      .object({
        game: z.enum(["emerald"]),
        species: z.enum(species),
        roaming: z.boolean(),
        targetPaintingAdvs: targetPaintingAdvsSchema,
        targetMethod: z.enum(gen3StaticMethods),
        aceSid: aceSidSchema,
      })
      .nullable(),
  }),
  { targetSetup: null },
);

const battleVideoInfoAtom = createBattleVideoInfoAtom(
  "emerald_static_battleVideoInfo",
);

export const useTargetSetup = () => useAtom(targetSetupAtom);
export const useBattleVideoInfo = () => useAtom(battleVideoInfoAtom);

export const Static3TargetSetupSearcher_WithSetTargetSetup = () => {
  const [targetSetup, setTargetSetup] = useTargetSetup();
  const { hydrated } = useHydrate(targetSetup);

  const [, setBattleVideoInfo] = useBattleVideoInfo();

  if (!hydrated) {
    return <Skeleton />;
  }

  const handleSetTargetSetup = (targetSetup: TargetSetup | null) => {
    setTargetSetup(
      hydrationLock({
        targetSetup:
          targetSetup == null ? null : { ...targetSetup, game: "emerald" },
      }),
    );
    setBattleVideoInfo(
      hydrationLock({
        battleVideoInfo: null,
      }),
    );
  };

  return (
    <Static3TargetSetupSearcher
      game="emerald"
      setTargetSetup={handleSetTargetSetup}
    />
  );
};

export const EmeraldStaticAceChangeSid_WithTargetSetup = () => {
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
export const EmeraldStaticPaintingReseeding_WithTargetSetup = () => {
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

  const targetAction = "SweetScentLand"; // Only impacts the buffer for battle video
  return (
    <Flex vertical gap={40}>
      <EmeraldPaintingReseeding
        targetPaintingAdvs={targetSetup.targetPaintingAdvs}
        onBattleVideoCreatedOrSkipped={onBattleVideoCreatedOrSkipped}
        targetAction={targetAction}
        clearAll={clearAll}
      />
    </Flex>
  );
};

export const Static3Calib_WithTargetSetupAndBattleVideo = () => {
  const [targetSetupLock, setTargetSetup] = useTargetSetup();
  const targetSetupHydrate = useHydrate(targetSetupLock);

  const [battleVideoInfoLock, setBattleVideoInfo] = useBattleVideoInfo();
  const battleVideoHydrate = useHydrate(battleVideoInfoLock);

  if (!targetSetupHydrate.hydrated || !battleVideoHydrate.hydrated) {
    return <Skeleton />;
  }
  const { targetSetup } = targetSetupHydrate.client;
  const { battleVideoInfo } = battleVideoHydrate.client;

  // To simplify the code, Static3Calib is not adapted to support battle video info without target setup.
  // The downside is that it forces the user to input twice their battle video advances.
  if (targetSetup == null) {
    return <Static3Calib />;
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
    <Static3Calib
      targetSetup={targetSetup}
      battleVideoInfo={battleVideoInfoWithFallback}
      clearAll={clearAll}
      displayInstructions
    />
  );
};
