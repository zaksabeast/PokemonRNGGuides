import {
  FormCard,
  FormSection,
  FormSummary,
  NumberField,
  SelectField,
  type SummaryRow,
} from "~/components/form";
import { Gen3Console, gen3ConsoleOptions } from "~/types/console";
import { BattleVideoInfo } from "../battleVideo/battleVideo";

export type CalibOffset = {
  offset: number; // between pressing A and reaching RNG manip start function.
  calibNoBattleVideo: number; // non-vblank advances between booting and triggering RNG manip start function. exact number depends on map encounter table and dynamic actors.
  calibBattleVideo: number; // non-vblank advances between watching battle video and triggering RNG manip start function.
};

type Gen3CalibFieldsProps = {
  battleVideoInfoProp: BattleVideoInfo | null | undefined;
  consoleTypeFromInput: Gen3Console;
  setConsoleTypeFromInput: (consoleType: Gen3Console) => void;
  calibration: number;
  offset: number;
  humanInputDelay: number | null;
  setHumanInputDelay: (delay: number | null) => void;
  extraRows?: SummaryRow[];
};

export const Gen3CalibFields = ({
  battleVideoInfoProp,
  consoleTypeFromInput,
  setConsoleTypeFromInput,
  calibration,
  offset,
  humanInputDelay,
  setHumanInputDelay,
  extraRows = [],
}: Gen3CalibFieldsProps) => {
  const consoleProp = battleVideoInfoProp?.consoleType;

  // consoleType has 3 possible sources:
  //  - battleVideoInfoProp.consoleType
  //  - battleVideoInfoInput (if battleVideoInfoProp == null)
  //  - here if (battleVideoInfoProp != null but battleVideoInfoProp.consoleType is null)

  // Don't show Console field if battleVideoInfoProp == null because it's already shown in battleVideoInfoInput
  const canPickConsole =
    battleVideoInfoProp != null && battleVideoInfoProp.consoleType == null;

  return (
    <FormCard>
      <FormSection title="Timer calibration">
        {canPickConsole && (
          <SelectField<Gen3Console>
            name="console"
            label="Console"
            value={consoleTypeFromInput}
            options={gen3ConsoleOptions}
            onChange={setConsoleTypeFromInput}
          />
        )}
        <FormSummary
          rows={[
            {
              label: "Console",
              value:
                gen3ConsoleOptions.find((opt) => opt.value === consoleProp)
                  ?.label ?? "",
              show: battleVideoInfoProp != null && !canPickConsole,
            },
            {
              label: "Calibration",
              value: `~${calibration} advances`,
              tooltip: {
                title: "Calibration",
                description:
                  "Number of RNG advances not caused by frames. (Ex: NPC moving)",
              },
            },
            {
              label: "Offset",
              value: `~${offset} advances`,
              tooltip: {
                title: "Offset",
                description:
                  "Number of RNG advances between the last player input and when the Pokémon generation occurs.",
              },
            },
            ...extraRows,
          ]}
        />
        <NumberField
          label="Human input delay (advance)"
          tooltip={{
            title: "Human input delay",
            description:
              "Number of RNG advances caused by human reaction time between the timer ending and pressing the input.",
          }}
          numType="decimal"
          onChange={setHumanInputDelay}
          value={humanInputDelay}
        />
      </FormSection>
    </FormCard>
  );
};
