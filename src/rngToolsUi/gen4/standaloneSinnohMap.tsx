import React from "react";
import { Alert, Field, Flex, FormFieldTable, Switch } from "~/components";
import { SinnohMap } from "./shared/sinnohMap";

export const StandaloneSinnohMap = () => {
  const [showHoneyTrees, setShowHoneyTrees] = React.useState(false);
  const [showDpChatot, setShowDpChatot] = React.useState(false);
  const [showPtChatot, setShowPtChatot] = React.useState(false);
  const [showMarkerSubmission, setShowMarkerSubmission] = React.useState(false);

  const fields: Field[] = [
    {
      label: "Honey Trees",
      input: <Switch value={showHoneyTrees} onChange={setShowHoneyTrees} />,
    },
    {
      label: "DP Chatot Locations",
      input: <Switch value={showDpChatot} onChange={setShowDpChatot} />,
    },
    {
      label: "PT Chatot Locations",
      input: <Switch value={showPtChatot} onChange={setShowPtChatot} />,
    },
    {
      label: "Draw mode",
      input: (
        <Switch
          value={showMarkerSubmission}
          onChange={setShowMarkerSubmission}
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
        dpChatot={showDpChatot}
        ptChatot={showPtChatot}
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
