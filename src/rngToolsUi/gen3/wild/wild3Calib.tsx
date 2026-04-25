import React from "react";
import { Flex, MultiTimer, Field, Input } from "~/components";
import { FormFieldTable } from "~/components/formFieldTable";
import {
  TargetSetup,
  Wild3CalibTargetSetupInput,
} from "./wild3CalibTargetSetupInput";
import { Wild3CalibCaughtMon } from "./wild3CalibCaughtMon";
import { gen3ConsoleFpsMap } from "~/types/console";
import {
  formatLargeInteger,
  formatLargeIntegerWithSign,
} from "~/utils/formatLargeInteger";
import { formatActionName, formatLeadName, formatMapName } from "./utils";
import { BattleVideoInfo } from "../battleVideo/battleVideo";
import { AllOrNone } from "~/types";
import { BattleVideoInfoInput } from "./wild3CalibBattleVideoInfoInput";
import { calculateTargetSetupResult } from "./calculateTargetSetupResult";

type Props = AllOrNone<{
  targetSetup: TargetSetup;
  battleVideoInfo: BattleVideoInfo;
}>;

export const Wild3Calib = ({
  targetSetup: targetSetupProp,
  battleVideoInfo: battleVideoInfoProp,
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

  const [calibrationAndOffset, setCalibrationAndOffset] = React.useState(0);

  const targetSetupInputForm = () => (
    <Wild3CalibTargetSetupInput setTargetSetup={setTargetSetup} />
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

  const initialAdv = battleVideoInfoProp?.battleVideoAdvAfterPainting ?? 0;

  const advFromTimer = targetForTimer - initialAdv - calibrationAndOffset;

  const milliseconds = [
    5000,
    Math.round(
      (advFromTimer /
        gen3ConsoleFpsMap[battleVideoInfo?.consoleType ?? "GBA"]) *
        1000,
    ),
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

  const calibFields: Field[] = [
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
    const usingBattleVideoWithoutPainting =
      !usingPaintingReseeding &&
      battleVideoInfoProp.battleVideoAdvAfterPainting > 0;

    const fields: Field[] = [
      {
        label: "Map",
        input: formatMapName(targetSetupProp.map),
        indent: 1,
      },
      {
        label: "Player action",
        input: formatActionName(targetSetupProp.action),
        indent: 1,
      },
      {
        label: "Lead",
        input: formatLeadName(targetSetupProp.lead),
        indent: 1,
      },
      {
        label: "Lead Cycle Speed",
        input: targetSetupProp.usingAverageLeadCycleSpeed
          ? "Average"
          : targetSetupProp.leadCycleSpeed,
        indent: 1,
      },
      {
        label: "Target Method",
        input: targetSetupProp.targetMethod,
        indent: 1,
      },
      {
        label: "Target frame before painting (decimal)",
        input: formatLargeInteger(
          battleVideoInfoProp.targetPaintingAdvs.before,
        ),
        indent: 1,
        show: usingPaintingReseeding,
      },
      {
        label: "Advances between painting and existing Battle Video",
        input: formatLargeInteger(
          battleVideoInfoProp.battleVideoAdvAfterPainting,
        ),
        indent: 1,
        show: usingPaintingReseeding,
      },

      {
        label: "Battle Video advance",
        input: formatLargeInteger(
          battleVideoInfoProp.battleVideoAdvAfterPainting,
        ),
        show: usingBattleVideoWithoutPainting,
        indent: 1,
      },
      {
        label: "Target advance",
        input:
          formatLargeInteger(targetSetup.targetPaintingAdvs.after) +
          (initialAdv > 0
            ? ` (${formatLargeIntegerWithSign(targetSetup.targetPaintingAdvs.after - initialAdv)} from Battle Video)`
            : ``),
        show: !usingPaintingReseeding,
        indent: 1,
      },
      {
        label: "Target advance after painting",
        input: `${formatLargeInteger(targetSetup.targetPaintingAdvs.after)} (${formatLargeIntegerWithSign(targetSetup.targetPaintingAdvs.after - initialAdv)} from Battle Video)`,
        show: usingPaintingReseeding,
        indent: 1,
      },
      {
        label: "Target Pokémon",
        input: targetSetupResult, //NO_PROD indent.
      },
    ];

    return (
      <div>
        <h3>Info from previous steps</h3>
        <FormFieldTable fields={fields} />
      </div>
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
