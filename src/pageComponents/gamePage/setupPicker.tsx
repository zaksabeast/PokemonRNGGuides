import { RadioField, type RadioOption } from "~/components/form";
import { type GuideSetup } from "~/guides";
import { rngGuideVariants } from "~/guideSections";
import { getSetupLabel } from "./utils";

const setupOptions: RadioOption<GuideSetup>[] = rngGuideVariants.map(
  (setup) => ({
    value: setup,
    label: getSetupLabel(setup),
  }),
);

type Props = {
  value: GuideSetup;
  onChange: (setup: GuideSetup) => void;
};

export const SetupPicker = ({ value, onChange }: Props) => (
  <RadioField<GuideSetup>
    label="Your setup"
    cellSize="word"
    value={value}
    onChange={onChange}
    options={setupOptions}
  />
);
