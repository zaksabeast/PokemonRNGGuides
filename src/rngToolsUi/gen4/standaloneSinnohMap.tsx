import React from "react";
import { Alert, Flex } from "~/components";
import { FormCard, SwitchField, SwitchGroup } from "~/components/form";
import { SinnohMap } from "./shared/sinnohMap";

export const StandaloneSinnohMap = () => {
  const [showHoneyTrees, setShowHoneyTrees] = React.useState(false);
  const [showDpChatot, setShowDpChatot] = React.useState(false);
  const [showPtChatot, setShowPtChatot] = React.useState(false);
  const [showMarkerSubmission, setShowMarkerSubmission] = React.useState(false);

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

      <FormCard>
        <SwitchGroup>
          <SwitchField
            label="Honey Trees"
            value={showHoneyTrees}
            onChange={setShowHoneyTrees}
          />
          <SwitchField
            label="DP Chatot Locations"
            value={showDpChatot}
            onChange={setShowDpChatot}
          />
          <SwitchField
            label="PT Chatot Locations"
            value={showPtChatot}
            onChange={setShowPtChatot}
          />
          <SwitchField
            label="Draw mode"
            value={showMarkerSubmission}
            onChange={setShowMarkerSubmission}
          />
        </SwitchGroup>
      </FormCard>
    </Flex>
  );
};
