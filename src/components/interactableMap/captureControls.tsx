import { Button } from "../button";
import { Card } from "../card";
import { CopyToClipboardButton } from "../copyToClipboardButton";
import { Flex } from "../flex";
import { RadioGroup } from "../radio";
import { TextArea } from "../textArea";
import { Typography } from "../typography";
import type { MapCapturedGeometry, MapCaptureMode, Point } from "./types";
import { isPolygonValid } from "./utils";

const getPreviewText = (geometry: MapCapturedGeometry | null) => {
  return geometry == null ? "" : JSON.stringify(geometry, null, 2);
};

const getDraftGeometry = ({
  pointDraft,
  polygonPoints,
  isPolygonClosed,
  mode,
}: {
  pointDraft: Point | null;
  polygonPoints: Point[];
  isPolygonClosed: boolean;
  mode: MapCaptureMode;
}): MapCapturedGeometry | null => {
  if (mode === "point") {
    return pointDraft == null ? null : { type: "point", point: pointDraft };
  }

  if (isPolygonClosed && isPolygonValid(polygonPoints)) {
    return { type: "polygon", points: polygonPoints };
  }

  return null;
};

const CAPTURE_MODE_OPTIONS = [
  { label: "Point", value: "point" },
  { label: "Polygon", value: "polygon" },
] as const;

export const CaptureControls = ({
  mode,
  pointDraft,
  polygonPoints,
  isPolygonClosed,
  onSelectMode,
  onUndo,
  onClear,
  onCompletePolygon,
}: {
  mode: MapCaptureMode;
  pointDraft: Point | null;
  polygonPoints: Point[];
  isPolygonClosed: boolean;
  onSelectMode: (nextMode: MapCaptureMode) => void;
  onUndo: () => void;
  onClear: () => void;
  onCompletePolygon: () => void;
}) => {
  const draftGeometry = getDraftGeometry({
    pointDraft,
    polygonPoints,
    isPolygonClosed,
    mode,
  });
  const draftPoints =
    mode === "point" ? (pointDraft == null ? [] : [pointDraft]) : polygonPoints;
  const previewText = getPreviewText(draftGeometry);

  return (
    <Card id="map_marker_submission_panel" width="100%">
      <Flex vertical gap={16}>
        <Flex vertical gap={4}>
          <Typography.Title level={4} mb={0} mt={0}>
            Map Marker Submission
          </Typography.Title>
          <Typography.Paragraph mb={0}>
            Choose a point or polygon, click the map to place coordinates, then
            copy the JSON output.
          </Typography.Paragraph>
        </Flex>

        <Flex vertical gap={12}>
          <RadioGroup<MapCaptureMode>
            value={mode}
            options={CAPTURE_MODE_OPTIONS}
            onChange={(event) => onSelectMode(event.target.value)}
          />

          <Flex wrap gap={8}>
            <Button
              trackerId="map-capture-undo"
              onClick={onUndo}
              disabled={draftPoints.length === 0}
            >
              Undo
            </Button>
            <Button
              trackerId="map-capture-clear"
              onClick={onClear}
              disabled={draftPoints.length === 0}
            >
              Clear
            </Button>
            {mode === "polygon" && (
              <Button
                trackerId="map-capture-complete-polygon"
                type={isPolygonClosed ? "primary" : "default"}
                onClick={onCompletePolygon}
                disabled={isPolygonClosed || !isPolygonValid(polygonPoints)}
              >
                Complete Polygon
              </Button>
            )}
          </Flex>
        </Flex>

        <Flex vertical gap={4}>
          {mode === "polygon" && !isPolygonClosed && (
            <Typography.Text type="secondary">
              Add at least three vertices, then use Complete Polygon before
              copying.
            </Typography.Text>
          )}
        </Flex>

        <TextArea
          readOnly
          fontFamily="monospace"
          autoSize={{ minRows: 6, maxRows: 12 }}
          value={previewText}
        />

        <Flex>
          <CopyToClipboardButton
            text={previewText}
            disabled={draftGeometry == null}
            trackerId="copy_map_marker_json"
            successMessage="Map marker JSON copied to clipboard"
          >
            Copy JSON
          </CopyToClipboardButton>
        </Flex>
      </Flex>
    </Card>
  );
};
