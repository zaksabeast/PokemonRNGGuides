import React from "react";
import { Alert, Field, Flex, FormFieldTable, Switch } from "~/components";
import { SinnohMap } from "./shared/sinnohMap";

export const StandaloneSinnohMap = () => {
  const [showHoneyTrees, setShowHoneyTrees] = React.useState(true);
  const [showMarkerSubmission, setShowMarkerSubmission] = React.useState(false);

  const fields: Field[] = [
    {
      label: "Show Honey Trees",
      input: (
        <Switch
          value={showHoneyTrees}
          onChange={(nextValue) => setShowHoneyTrees(nextValue)}
        />
      ),
    },
    {
      label: "Enable Marker Submission",
      input: (
        <Switch
          value={showMarkerSubmission}
          onChange={(nextValue) => setShowMarkerSubmission(nextValue)}
        />
      ),
    },
  ];

  return (
    <Flex vertical gap={16}>
      {showMarkerSubmission && (
        <Alert
          showIcon
          type="tip"
          title="Click directly on the map to draft a point or polygon, then copy the generated JSON."
        />
      )}

      <SinnohMap
        capture={showMarkerSubmission ? { defaultMode: "point" } : undefined}
        honeyTree={
          showHoneyTrees
            ? {
                show: true,
                recommendedTrees: [],
                munchlaxTrees: [],
              }
            : undefined
        }
      />

      <FormFieldTable fields={fields} />
    </Flex>
  );
};
