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

const TargetSetupNullableSchema = z.object({
  targetSetup: z.object().extend(TargetSetupSchema.shape).nullable(),
});

const targetSetup = atomWithPersistence(
  "emerald_wild_targetSetup",
  TargetSetupNullableSchema,
  { targetSetup: null },
);

const battleVideoAdvAfterPainting = atomWithPersistence(
  "emerald_wild_battleVideoAdvAfterPainting",
  z.object({
    battleVideoAdvAfterPainting: z.number().int().min(0),
  }),
  { battleVideoAdvAfterPainting: 0 },
);


export const useTargetSetup = () => useAtom(targetSetup);
export const useBattleVideoAdvAfterPainting = () => useAtom(battleVideoAdvAfterPainting);

export const Wild3SearcherFindTarget_WithSetTargetSetup = () => {
  const [step, setStep] = useCurrentStep();
  const [targetSetup, setTargetSetup] = useTargetSetup();
  const { hydrated } = useHydrate(targetSetup);

  if (!hydrated) {
    return <Skeleton />;
  }

  const handleSetTargetSetup = (targetSetup: TargetSetup) => {
    setTargetSetup(
      hydrationLock({
        targetSetup,
      }),
    );
    setStep(step + 1);
  }

  return <Wild3SearcherFindTarget setTargetSetup={handleSetTargetSetup} />;
};

export const EmeraldPaintingReseeding_WithTargetSetup = () => {
  const [targetSetup] = useTargetSetup();
  const { hydrated, client } = useHydrate(targetSetup);

  if (!hydrated) {
    return <Skeleton />;
  }

  const [battleVideoAdvAfterPainting, setBattleVideoAdvAfterPainting] = useBattleVideoAdvAfterPainting();
  const { hydrated: battleVideoHydrated } = useHydrate(battleVideoAdvAfterPainting);

  if (!battleVideoHydrated) {
    return <Skeleton />;
  }

  const targetPaintingAdvs = client.targetSetup == null ? undefined : {
    before: client.targetSetup.targetFrameBeforePainting,
    after: client.targetSetup.targetAdvance,
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

  //NO_PROD add prop setBattleVideoAdvAfterPainting to EmeraldPaintingReseeding.
  // create Wild3Calib_WithTargetSetupAndBattleVideo
  //use battleVideoAdvAfterPainting in Wild3Calib_WithTargetSetupAndBattleVideo

  const setBattleVideoAdvAfterPaintingWrapped = (adv: number) => {
    setBattleVideoAdvAfterPainting(
      hydrationLock({
        battleVideoAdvAfterPainting: adv,
      }),
    );
  }
  return (<Flex vertical gap={40}>
    {infoPrevStep}
    <EmeraldPaintingReseeding
      key={JSON.stringify(targetPaintingAdvs)}
      targetPaintingAdvs={targetPaintingAdvs}
      setBattleVideoAdvAfterPainting={setBattleVideoAdvAfterPaintingWrapped}
    />
  </Flex>);
};


const Wild3Calib_WithTargetSetupAndBattleVideo = () => {
  const [targetSetup] = useTargetSetup();
  const { hydrated: targetSetupHydrated, client: targetSetupClient } = useHydrate(targetSetup);

  const [battleVideoAdvAfterPainting] = useBattleVideoAdvAfterPainting();
  const { hydrated: battleVideoHydrated, client: battleVideoClient } = useHydrate(battleVideoAdvAfterPainting);

  if (!targetSetupHydrated || !battleVideoHydrated) {
    return <Skeleton />;
  }

  if (targetSetupClient.targetSetup == null) { //NO_PROD
    return <>No target setup found. Please complete the previous steps.</>;
  }

  return <Wild3Calib
    targetSetup={targetSetupClient.targetSetup}
    battleVideoAdvAfterPainting={battleVideoClient.battleVideoAdvAfterPainting}
  />;
}
