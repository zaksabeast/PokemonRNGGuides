import { useSetAtom } from "jotai";
import { type SeedTime4 } from "~/rngTools";
import { Button } from "~/components";
import { useCurrentStep } from "~/components/stepper/state";
import { selectGen4SeedKeepingMarkersAtom } from "../state/markers";

export type SelectGen4SeedOpts = {
  trackerId: string;
  coinFlipCount?: number;
};

type Props = SelectGen4SeedOpts & {
  seedTime: SeedTime4;
};

export const SelectGen4SeedButton = ({ trackerId, ...input }: Props) => {
  const selectTarget = useSetAtom(selectGen4SeedKeepingMarkersAtom);
  const [, setCurrentStep] = useCurrentStep();

  return (
    <Button
      trackerId={trackerId}
      onClick={() => {
        selectTarget(input);
        setCurrentStep((step) => step + 1);
      }}
    >
      Select
    </Button>
  );
};
