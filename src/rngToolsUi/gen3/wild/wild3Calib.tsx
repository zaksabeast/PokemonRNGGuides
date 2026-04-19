import React, { useState } from "react";
import { Flex, MultiTimer, Field, Input, Select } from "~/components";
import { FormFieldTable } from "~/components/formFieldTable";
import { TargetSetup as TargetSetup, Wild3CalibTarget } from "./wild3CalibTarget";
import { Wild3CalibCaughtMon } from "./wild3CalibCaughtMon";
import {
  Gen3Console,
  gen3ConsoleFpsMap,
  gen3ConsoleOptions,
} from "~/types/console";

type Props = {
  targetSetup?: TargetSetup;
};

export const Wild3Calib = ({ targetSetup: targetSetupProp }: Props) => {
  const [targetSetup, setTargetSetup] = React.useState<TargetSetup | null>(
    targetSetupProp ?? null,
  );

  const [consoleType, setConsoleType] = useState<Gen3Console>("GBA");

  /** calibration is always for target advance after painting.
      calibration is not used if the painting seed is not confirmed */
  const [calibrationAndOffset, setCalibrationAndOffset] = React.useState(0);

  const calibrationIsActive =
    targetSetup !== null &&
    (!targetSetup.usingPaintingReseeding ||
      targetSetup.isPaintingSeedConfirmed);

  const setLatestHitAdv = calibrationIsActive
    ? (hitAdv: {
      frame_before_painting: number;
      adv_after_painting: number;
    }) => {
      setCalibrationAndOffset(
        calibrationAndOffset + hitAdv.adv_after_painting - targetForTimer,
      );
    }
    : undefined;

  const targetForTimer = targetSetup?.targetAdvance ?? 0;

  const initialAdv = targetSetup?.existingBattleVideoAdv ?? 0;

  const advFromTimer = targetForTimer - initialAdv - calibrationAndOffset;

  const milliseconds = [
    5000,
    Math.round((advFromTimer / gen3ConsoleFpsMap[consoleType]) * 1000),
  ];
  const labels = [
    initialAdv > 0 ? "Close the Battle Video" : "Soft reset START+SELECT+A+B",
    "Trigger Sweet Scent",
  ];

  const fields: Field[] =
    targetSetup != null
      ? [
        {
          label: "Target advance",
          input: <>{targetSetup.targetAdvance}</>,
          show: !targetSetup.usingPaintingReseeding,
        },
        {
          label: "Target frame before painting",
          input: <>{targetSetup.targetFrameBeforePainting}</>,
          show: targetSetup.usingPaintingReseeding,
        },
        {
          label: "Target advance after painting",
          input: <>{targetSetup.targetAdvance}</>,
          show: targetSetup.usingPaintingReseeding,
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
        {
          label: "Console",
          input: (
            <Select<Gen3Console>
              name="console"
              value={consoleType}
              options={gen3ConsoleOptions}
              onSelect={(val) => {
                setConsoleType(val);
              }}
            />
          ),
        },
      ]
      : [];

  return (
    <Flex gap={32} vertical>
      {targetSetupProp == null && <Wild3CalibTarget setTargetSetup={setTargetSetup} />}

      {targetSetup !== null && (
        <>
          <FormFieldTable fields={fields} />
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
