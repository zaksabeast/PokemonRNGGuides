import React from "react";
import { Flex, MultiTimer, Field, Input, Select, Button } from "~/components";
import { FormFieldTable } from "~/components/formFieldTable";
import {
  TargetSetup,
  Wild3CalibTargetSetupInput,
} from "./wild3CalibTargetSetupInput";
import { Wild3CalibCaughtMon } from "./wild3CalibCaughtMon";
import {
  Gen3Console,
  gen3ConsoleFpsMap,
  gen3ConsoleOptions,
} from "~/types/console";
import {
  formatLargeInteger,
  formatLargeIntegerWithSign,
} from "~/utils/formatLargeInteger";
import { formatActionName, formatLeadName, formatMapName } from "./utils";
import { BattleVideoInfo } from "../battleVideo/battleVideo";
import { AllOrNone } from "~/types";
import { BattleVideoInfoInput } from "./wild3CalibBattleVideoInfoInput";
import { calculateTargetSetupResult } from "./calculateTargetSetupResult";
import { formatHex } from "~/utils/formatHex";

type Props = AllOrNone<{
  targetSetup: TargetSetup;
  battleVideoInfo: BattleVideoInfo;
  clearAll?: () => void;
}>;

export const Wild3Calib = ({
  targetSetup: targetSetupProp,
  battleVideoInfo: battleVideoInfoProp,
  clearAll,
}: Props) => {
  const [targetSetup, setTargetSetup] = React.useState<TargetSetup | null>(
    targetSetupProp ?? null,
  );

  const [targetSetupResult, setTargetSetupResult] =
    React.useState<React.ReactNode>(null);

  React.useEffect(() => {
    if (targetSetup == null) {
      return setTargetSetupResult(null);
    }

    calculateTargetSetupResult(targetSetup).then(setTargetSetupResult);
  }, [targetSetup]);

  const [battleVideoInfo, setBattleVideoInfo] =
    React.useState<BattleVideoInfo | null>(battleVideoInfoProp ?? null);

  const [consoleTypeFromInput, setConsoleTypeFromInput] =
    React.useState<Gen3Console>("GBA");
  const [calibrationAndOffset, setCalibrationAndOffset] = React.useState(0);

  const targetSetupInputForm = () => (
    <Flex vertical gap={10}>
      <Wild3CalibTargetSetupInput setTargetSetup={setTargetSetup} />
      {targetSetupResult != null && (
        <FormFieldTable
          fields={[
            {
              label: "Target Pokémon",
              input: targetSetupResult,
            },
          ]}
        />
      )}
    </Flex>
  );

  if (targetSetup == null) {
    return targetSetupInputForm();
  }

  const setLatestHitAdv = (hitAdv: {
    frame_before_painting: number;
    adv_after_painting: number;
  }) => {
    setCalibrationAndOffset(
      calibrationAndOffset + hitAdv.adv_after_painting - targetForTimer,
    );
  };

  const targetForTimer = targetSetup?.targetPaintingAdvs.after ?? 0;

  const initialAdv = battleVideoInfo?.battleVideoAdvAfterPainting ?? 0;

  const advFromTimer = targetForTimer - initialAdv - calibrationAndOffset;

  const consoleType = battleVideoInfo?.consoleType ?? consoleTypeFromInput;

  const milliseconds = [
    5000,
    Math.round((advFromTimer / gen3ConsoleFpsMap[consoleType]) * 1000),
  ];
  const labels = [
    initialAdv > 0 ? "Close the Battle Video" : "Soft reset START+SELECT+A+B",
    "Trigger Sweet Scent",
  ];

  const battleVideoInfoInputForm = () => {
    if (targetSetup == null) {
      return null;
    }

    return (
      <BattleVideoInfoInput
        targetPaintingAdvs={targetSetup.targetPaintingAdvs}
        setBattleVideoInfo={setBattleVideoInfo}
      />
    );
  };

  const consoleProp = battleVideoInfoProp?.consoleType;
  const calibFields: Field[] = [
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
      label: "Calibration + Offset (advance)",
      input: (
        <Input
          name="offset"
          onChange={(event) => {
            const num = Number(event.target.value);
            setCalibrationAndOffset(Number.isFinite(num) ? num : 0);
          }}
          value={calibrationAndOffset}
        />
      ),
    },
  ];

  const canDoCalib =
    battleVideoInfo != null || targetSetup.targetPaintingAdvs.before === 0;

  const infoFromPrevSteps = () => {
    if (targetSetupProp == null) {
      return null;
    }

    const usingPaintingReseeding =
      battleVideoInfoProp.targetPaintingAdvs.before > 0;

    const fields: Field[] = [
      {
        label: "Map",
        input: formatMapName(targetSetupProp.map),
      },
      {
        label: "Player action",
        input: formatActionName(targetSetupProp.action),
      },
      {
        label: "Lead",
        input: formatLeadName(targetSetupProp.lead),
      },
      {
        label: "Lead Cycle Speed",
        input: targetSetupProp.usingAverageLeadCycleSpeed
          ? "Average"
          : targetSetupProp.leadCycleSpeed,
        show: targetSetupProp.lead !== "Egg",
      },
      {
        label: "Target Method",
        input: targetSetupProp.targetMethod,
      },
      {
        label: "Target frame before painting",
        input: `${formatLargeInteger(battleVideoInfoProp.targetPaintingAdvs.before)} (Seed: ${formatHex(battleVideoInfoProp.targetPaintingAdvs.before, 2)})`,
        show: usingPaintingReseeding,
      },
      {
        label: "Battle Video advance",
        input: formatLargeInteger(
          battleVideoInfoProp.battleVideoAdvAfterPainting,
        ),
        show: battleVideoInfoProp.battleVideoAdvAfterPainting > 0,
      },
      {
        label: "Target advance",
        input:
          formatLargeInteger(targetSetup.targetPaintingAdvs.after) +
          (initialAdv > 0
            ? ` (${formatLargeIntegerWithSign(targetSetup.targetPaintingAdvs.after - initialAdv)} from Battle Video)`
            : ``),
        show: !usingPaintingReseeding,
      },
      {
        label: "Target advance after painting",
        input: `${formatLargeInteger(targetSetup.targetPaintingAdvs.after)} (${formatLargeIntegerWithSign(targetSetup.targetPaintingAdvs.after - initialAdv)} from Battle Video)`,
        show: usingPaintingReseeding,
      },
      {
        label: "Target Pokémon",
        input: targetSetupResult,
      },
    ];

    return (
      <Flex vertical>
        <h3>Info from previous steps</h3>
        <Flex ml={20} vertical>
          <FormFieldTable fields={fields} />
          {clearAll != null && (
            <Button
              trackerId="wild3Calib_clearAll"
              danger
              maxWidth={150}
              size="small"
              onClick={clearAll}
            >
              Clear All
            </Button>
          )}
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex gap={32} vertical>
      {targetSetupProp == null && targetSetupInputForm()}
      {battleVideoInfoProp == null && battleVideoInfoInputForm()}
      {infoFromPrevSteps()}

      {canDoCalib && (
        <>
          <FormFieldTable fields={calibFields} />
          <MultiTimer
            milliseconds={milliseconds}
            labels={labels}
            startButtonTrackerId="start_wild3_calib_timer"
            stopButtonTrackerId="stop_wild3_calib_timer"
          />
          <Wild3CalibCaughtMon
            targetSetup={targetSetup}
            setLatestHitAdv={setLatestHitAdv}
          />
        </>
      )}
    </Flex>
  );
};
