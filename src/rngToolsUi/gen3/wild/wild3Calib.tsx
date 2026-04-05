import React from "react";
import { Flex, MultiTimer, Field, Input } from "~/components";
import { FormFieldTable } from "~/components/formFieldTable";
import { MS_PER_GBA_FRAME } from "~/utils/consts";

import { FormState as TargetSetup, Wild3CalibTarget } from "./wild3CalibTarget";
import { Wild3CalibCaughtMon } from "./wild3CalibCaughtMon";

export const Wild3Calib = () => {
  const [targetSetup, setTargetSetup] = React.useState<TargetSetup | null>(
    null,
  );

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

  const milliseconds = [5000, Math.round(advFromTimer * MS_PER_GBA_FRAME)]; //NO_PROD console
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
        ]
      : [];

  return (
    <Flex gap={32} vertical>
      <Wild3CalibTarget setTargetSetup={setTargetSetup} />

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
