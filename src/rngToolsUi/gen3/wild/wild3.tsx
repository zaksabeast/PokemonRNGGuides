import { atomWithPersistence, useAtom } from "~/state/localStorage";
import {TargetSetupSchema, TargetSetup, getInitialValues as getInitialValuesForTargetSetup} from "./wild3CalibTarget";
import { useHydrate } from "~/hooks/useHydrate";
import { Skeleton } from "antd";
import { EmeraldPaintingReseeding } from "../paintingReseeding/paintingReseeding";
import { Wild3SearcherFindTarget } from "./wild3FindTarget";

const targetSetup = atomWithPersistence(
  "emerald_wild_targetSetup",
  TargetSetupSchema, //NO_PROD extend with nullable()
  null,
);

export const useTargetSetup = () => useAtom(targetSetup);

export const EmeraldPaintingReseeding_WithTargetSetup = () => {
  const [lockedState] = useTargetSetup();
  const { hydrated, client } = useHydrate(lockedState);

  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <EmeraldPaintingReseeding targetPaintingAdvs={client.targetSetup ?? undefined} />
  );
};


export const Wild3SearcherFindTarget_WithSetTargetSetup = () => {
  const [lockedState, setTargetSetup] = useTargetSetup();
  const { hydrated, client } = useHydrate(lockedState);

  if (!hydrated) {
    return <Skeleton />;
  }

  const handleSetTargetSetup = (targetSetup:TargetSetup) =>
    setTargetSetup(
      hydrationLock({
        targetSetup,
      }),
    );

  return (
    <Wild3SearcherFindTarget setTargetSetup={handleSetTargetSetup} />
  );
};