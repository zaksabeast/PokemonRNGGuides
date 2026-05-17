import React from "react";
import { FixedData, Wild3MethodDistribution } from "./wild3MethodDistribution";
import { Wild3CalibTargetSetupInput } from "./wild3CalibTargetSetupInput";

type Props = {
  permitEnablingDebugOptions: boolean;
};

export const Wild3MethodDistributionStandalone = ({
  permitEnablingDebugOptions,
}: Props) => {
  const [fixedData, setFixedData] = React.useState<FixedData | null>(null);

  return (
    <>
      <Wild3CalibTargetSetupInput
        setTargetSetup={(targetSetup) => {
          if (targetSetup == null) {
            setFixedData(null);
          } else {
            setFixedData({
              targetSetup,
              idealLeadCycleSpeed: null,
            });
          }
        }}
      />

      {fixedData != null && (
        <Wild3MethodDistribution
          fixedData={fixedData}
          permitEnablingDebugOptions={permitEnablingDebugOptions}
        />
      )}
    </>
  );
};
