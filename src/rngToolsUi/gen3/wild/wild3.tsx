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
import React from "react";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { useCurrentStep } from "~/components/stepper/state";

const TargetSetupNullableSchema = z.object({
  targetSetup: z.object().extend(TargetSetupSchema.shape).nullable(),
});

const targetSetup = atomWithPersistence(
  "emerald_wild_targetSetup",
  TargetSetupNullableSchema,
  { targetSetup: null },
);

export const useTargetSetup = () => useAtom(targetSetup);

export const Wild3SearcherFindTarget_WithSetTargetSetup = () => {
  const [step, setStep] = useCurrentStep();
  const [lockedState, setTargetSetup] = useTargetSetup();
  const { hydrated } = useHydrate(lockedState);

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
  const [lockedState] = useTargetSetup();
  const { hydrated, client } = useHydrate(lockedState);

  if (!hydrated) {
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

  return (<Flex vertical gap={40}>
    {infoPrevStep}
    <EmeraldPaintingReseeding
      key={JSON.stringify(targetPaintingAdvs)}
      targetPaintingAdvs={targetPaintingAdvs}
    />
  </Flex>);
};
