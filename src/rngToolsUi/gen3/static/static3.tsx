import { match } from "ts-pattern";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { Static3TargetSetupSearcher } from "./static3TargetSetupSearcher";
import { gen3StaticMethods, Static3Game, static3Games } from "./constants";
import z from "zod";
import { species } from "~/types/species";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { Gen3StaticMethod, Species } from "~/rngTools";
import { gen3Consoles } from "~/types/console";
import { useHydrate } from "~/hooks/useHydrate";

// Limitation: Multi-step components only support Emerald.

const targetSetupAtom = atomWithPersistence(
  "emerald_static_targetSetup",
  z.object({
    targetSetup: z
      .object({
        game: z.enum(["emerald"]),
        species: z.enum(species),
        roaming: z.boolean(),
        targetPaintingAdvs: z.object({
          before: z.number().int().min(0).max(0xffffffff),
          after: z.number().int().min(0).max(0xffffffff),
        }),
        targetMethod: z.enum(gen3StaticMethods),
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
  }),
  { targetSetup: null },
);

const battleVideoInfoAtom = atomWithPersistence(
  "emerald_static_battleVideoInfo",
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

export const Static3TargetSetupSearcher_WithSetTargetSetup = () => {
  const route = useActiveRoute();
  const game = match(route)
    .with("/emerald-static/", () => "emerald" as const)
    .with("/rs-static/", () => "rs" as const)
    .with("/frlg-static/", () => "frlg" as const)
    .otherwise(() => "emerald" as const);

  if (game !== "emerald") {
  }

  const setTargetSetup = () => {
    // Limitation: Multi-step components only support Emerald.
    if (game !== "emerald") {
      return;
    }
    // TODO: Forward the targetSetup to calibration step.
  };

  const [targetSetup, setTargetSetup] = useTargetSetup();
  const { hydrated } = useHydrate(targetSetup);

  const [, setBattleVideoInfo] = useBattleVideoInfo();

  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <Static3TargetSetupSearcher game={game} setTargetSetup={setTargetSetup} />
  );
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
        targetPaintingAdvs={targetSetup.targetPaintingAdvs}
        onBattleVideoCreatedOrSkipped={onBattleVideoCreatedOrSkipped}
        targetAction={targetSetup.action}
        clearAll={clearAll}
      />
    </Flex>
  );
};
