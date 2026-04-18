import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { TargetSetupSchema, TargetSetup } from "./wild3CalibTarget";
import { useHydrate } from "~/hooks/useHydrate";
import { Skeleton } from "antd";
import { EmeraldPaintingReseeding } from "../paintingReseeding/paintingReseeding";
import { Wild3SearcherFindTarget } from "./wild3FindTarget";
import { hydrationLock, HydrationLock } from "~/utils/hydration";
import z from "zod";

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
  const [lockedState, setTargetSetup] = useTargetSetup();
  const { hydrated, client } = useHydrate(lockedState);

  if (!hydrated) {
    return <Skeleton />;
  }

  const handleSetTargetSetup = (targetSetup: TargetSetup) => {

    console.log('targetSetup', targetSetup);
    setTargetSetup(
      hydrationLock({
        targetSetup,
      }),
    );
  }

  return <Wild3SearcherFindTarget setTargetSetup={handleSetTargetSetup} />;
};

export const EmeraldPaintingReseeding_WithTargetSetup = () => {
  const [lockedState] = useTargetSetup();
  const { hydrated, client } = useHydrate(lockedState);

  if (!hydrated) {
    return <Skeleton />;
  }

  console.log('client', client);

  const targetPaintingAdvs = client.targetSetup == null ? undefined : {
    before: client.targetSetup.targetFrameBeforePainting,
    after: client.targetSetup.targetAdvance,
  };

  return (
    <EmeraldPaintingReseeding
      targetPaintingAdvs={targetPaintingAdvs}
    />
  );
};
