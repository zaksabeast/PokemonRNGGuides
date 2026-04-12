import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { TargetSetupSchema, TargetSetup } from "./wild3CalibTarget";
import { useHydrate } from "~/hooks/useHydrate";
import { Skeleton } from "antd";
import { EmeraldPaintingReseeding } from "../paintingReseeding/paintingReseeding";
import { Wild3SearcherFindTarget } from "./wild3FindTarget";
import z from "zod";

const TargetSetupNullableSchema = z.object({
  value: z.object().extend(TargetSetupSchema).nullable(),
});

const targetSetup = atomWithPersistence(
  "emerald_wild_targetSetup",
  TargetSetupNullableSchema,
  { value: null },
);

export const useTargetSetup = () => useAtom(targetSetup);

export const EmeraldPaintingReseeding_WithTargetSetup = () => {
  const [lockedState] = useTargetSetup();
  const { hydrated, client } = useHydrate(lockedState);

  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <EmeraldPaintingReseeding
      targetPaintingAdvs={client.value?.targetSetup ?? undefined}
    />
  );
};

export const Wild3SearcherFindTarget_WithSetTargetSetup = () => {
  const [lockedState, setTargetSetup] = useTargetSetup();
  const { hydrated, client } = useHydrate(lockedState);

  if (!hydrated) {
    return <Skeleton />;
  }

  const handleSetTargetSetup = (targetSetup: TargetSetup) =>
    setTargetSetup(
      hydrationLock({
        targetSetup,
      }),
    );

  return <Wild3SearcherFindTarget setTargetSetup={handleSetTargetSetup} />;
};
