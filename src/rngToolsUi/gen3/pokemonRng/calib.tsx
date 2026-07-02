import React from "react";
import { Field, NumberInput, Select } from "~/components";
import { Gen3Console, gen3ConsoleOptions } from "~/types/console";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { BattleVideoInfo } from "../battleVideo/battleVideo";
import {
  targetAdvanceAfterPaintingLabel,
  targetAdvanceLabel,
  targetFrameBeforePaintingLabel,
} from "./labels";

export type CalibOffset = {
  offset: number; // between pressing A and reaching RNG manip start function.
  calibNoBattleVideo: number; // non-vblank advances between booting and triggering RNG manip start function. exact number depends on map encounter table and dynamic actors.
  calibBattleVideo: number; // non-vblank advances between watching battle video and triggering RNG manip start function.
};

type TargetPaintingAdvs = {
  before: number;
  after: number;
};

type CalibTargetSetup = {
  targetMethod: React.ReactNode;
  targetPaintingAdvs: TargetPaintingAdvs;
};

export const buildGen3CalibFields = ({
  battleVideoInfoProp,
  consoleTypeFromInput,
  setConsoleTypeFromInput,
  calibration,
  offset,
  humanInputDelay,
  setHumanInputDelay,
}: {
  battleVideoInfoProp: BattleVideoInfo | null | undefined;
  consoleTypeFromInput: Gen3Console;
  setConsoleTypeFromInput: (consoleType: Gen3Console) => void;
  calibration: number;
  offset: number;
  humanInputDelay: number | null;
  setHumanInputDelay: (delay: number | null) => void;
}): Field[] => {
  const consoleProp = battleVideoInfoProp?.consoleType;

  return [
    // consoleType has 3 possible sources:
    //  - battleVideoInfoProp.consoleType
    //  - battleVideoInfoInput (if battleVideoInfoProp == null)
    //  - here if (battleVideoInfoProp != null but battleVideoInfoProp.consoleType is null)

    // Don't show Console field if battleVideoInfoProp == null because it's already shown in battleVideoInfoInput
    {
      label: "Console",
      show: battleVideoInfoProp != null,
      input:
        battleVideoInfoProp != null &&
        battleVideoInfoProp.consoleType == null ? (
          <Select<Gen3Console>
            name="console"
            value={consoleTypeFromInput}
            options={gen3ConsoleOptions}
            onSelect={(val) => {
              setConsoleTypeFromInput(val);
            }}
          />
        ) : (
          (gen3ConsoleOptions.find((opt) => opt.value === consoleProp)?.label ??
          "")
        ),
    },
    {
      label: "Calibration",
      input: `~${~calibration} advances`,
      tooltip: "Number of RNG advances not caused by frames. (Ex: NPC moving)",
    },
    {
      label: "Offset",
      input: `~${~offset} advances`,
      tooltip:
        "Number of RNG advances between the last player input and when the Pokémon generation occurs.",
    },
    {
      label: "Human input delay (advance)",
      tooltip:
        "Number of RNG advances caused by human reaction time between the timer ending and pressing the input.",
      input: (
        <NumberInput
          numType="decimal"
          onChange={setHumanInputDelay}
          value={humanInputDelay}
        />
      ),
    },
  ];
};

export const buildGen3CalibPreviousStepFields = ({
  targetSetup,
  battleVideoInfo,
  initialAdv,
}: {
  targetSetup: CalibTargetSetup;
  battleVideoInfo: BattleVideoInfo;
  initialAdv: number;
}): Field[] => {
  return [
    {
      label: "Target method",
      input: targetSetup.targetMethod,
    },
    targetFrameBeforePaintingLabel(battleVideoInfo.targetPaintingAdvs.before),
    {
      label: "Battle Video advance",
      input: formatLargeInteger(battleVideoInfo.battleVideoAdvAfterPainting),
      show: battleVideoInfo.battleVideoAdvAfterPainting > 0,
    },
    targetAdvanceLabel(
      targetSetup.targetPaintingAdvs.after,
      targetSetup.targetPaintingAdvs.before === 0,
      initialAdv,
    ),
    targetAdvanceAfterPaintingLabel(targetSetup.targetPaintingAdvs, initialAdv),
  ];
};
