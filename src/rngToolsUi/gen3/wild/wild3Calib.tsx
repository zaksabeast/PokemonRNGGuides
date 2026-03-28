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

  const [calibrationAndOffset, setCalibrationAndOffset] = React.useState(0);

  const targetAdvance = targetSetup?.targetAdvance ?? 0;

  const advFromTimer = targetAdvance - calibrationAndOffset;
  const milliseconds = [5000, Math.round(advFromTimer * MS_PER_GBA_FRAME)];

  const fields: Field[] = [
    {
      label: "Target advance",
      input: <>{targetAdvance}</>,
    },
    {
      label: "Calibration + Offset",
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

  const setLatestHitAdv = (val: number) => {
    setCalibrationAndOffset(calibrationAndOffset + val - targetAdvance);
  };

  return (
    <Flex gap={32} vertical>
      <Wild3CalibTarget setTargetSetup={setTargetSetup} />

      {targetSetup !== null && (
        <>
          <FormFieldTable fields={fields} />
          <MultiTimer
            milliseconds={milliseconds}
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
