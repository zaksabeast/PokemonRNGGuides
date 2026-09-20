import React from "react";
import styled from "@emotion/styled";
import { Button, Flex, Icon, NumberInput, Typography } from "~/components";
import { Timer } from "~/components/timer";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import {
  getMinutesBeforeTarget,
  useTimerSequence,
} from "~/hooks/useTimerSequence";
import { ARC_HEIGHT, ARC_WIDTH, arcTimerRenderer } from "./arcGauge";
import { PRIMARY_BUTTON_HEIGHT } from "./constants";
import { formatDuration, formatSeconds } from "./format";
import { styledPropGuard } from "~/utils/styled";

const DigestCard = styled(Flex)(({ theme }) => ({
  backgroundColor: theme.token.colorBgContainer,
  border: `1px solid ${theme.token.colorBorderSecondary}`,
  borderRadius: 8,
  padding: 12,
}));

const EditAffordance = styled.button(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  padding: 0,
  border: "none",
  background: "none",
  fontSize: 12,
  lineHeight: 1,
  color: theme.token.colorPrimary,
  cursor: "pointer",
  ":disabled": {
    color: theme.token.colorTextDisabled,
    cursor: "default",
  },
}));

const DigestRow = styled(
  "div",
  styledPropGuard,
)<{
  $active: boolean;
  $selected: boolean;
  $selectable: boolean;
}>(({ theme, $active, $selected, $selectable }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  // The highlight bleeds to the card's edges
  margin: "0 -12px",
  padding: "7px 12px",
  backgroundColor: $active ? theme.token.colorInfoBg : "transparent",
  boxShadow: $selected ? `inset 3px 0 0 ${theme.token.colorPrimary}` : "none",
  cursor: $selectable ? "pointer" : "default",
}));

const RowIndex = styled(
  "span",
  styledPropGuard,
)<{ $active: boolean }>(({ theme, $active }) => ({
  flex: "none",
  width: 16,
  fontFamily: "monospace",
  fontSize: 11,
  color: $active ? theme.token.colorInfo : theme.token.colorTextQuaternary,
}));

const HitBlock = styled(Flex)(({ theme }) => ({
  border: `1px solid ${theme.token.colorPrimary}`,
  borderRadius: 8,
  padding: 12,
  backgroundColor: theme.token.colorBgContainer,
}));

const CaptionRow = styled(Flex)(({ theme }) => ({
  fontFamily: "monospace",
  fontSize: 11,
  lineHeight: 1,
  color: theme.token.colorTextTertiary,
}));

export type RunRow = {
  id: number;
  label: string;
  ms: number;
};

export type HitField<FieldId extends string> = {
  /** Keys this field's value in `onCalibrate`. Must be unique within a hit. */
  id: FieldId;
  label: string;
  numType: "hex" | "float";
};

type RunHitBase = {
  /** Changing this resets the hit inputs, e.g. when a different row is selected. */
  id: number;
  label: string;
  caption?: string;
  trackerId: string;
};

export type RunHit<FieldId extends string = string> =
  | (RunHitBase & {
      type: "single";
      numType: "hex" | "float";
      onCalibrate: (hit: number) => void;
    })
  | (RunHitBase & {
      type: "multi";
      fields: HitField<FieldId>[];
      onCalibrate: (hits: Record<FieldId, number>) => void;
    });

const SingleHitFields = ({
  hit,
}: {
  hit: Extract<RunHit, { type: "single" }>;
}) => {
  const [value, setValue] = React.useState<number | null>(null);

  return (
    <Flex gap={8} align="center">
      <NumberInput
        name="timerHit"
        numType={hit.numType}
        value={value}
        onChange={setValue}
        fullFlex
      />
      <Button
        trackerId={hit.trackerId}
        type="primary"
        disabled={value == null}
        onClick={() => {
          if (value == null) {
            return;
          }
          hit.onCalibrate(value);
          setValue(null);
        }}
      >
        Calibrate
      </Button>
    </Flex>
  );
};

const MultiHitFields = <FieldId extends string>({
  hit,
}: {
  hit: Extract<RunHit<FieldId>, { type: "multi" }>;
}) => {
  const [values, setValues] = React.useState<
    Partial<Record<FieldId, number | null>>
  >({});
  const isComplete = (
    partial: Partial<Record<FieldId, number | null>>,
  ): partial is Record<FieldId, number> =>
    hit.fields.every((field) => partial[field.id] != null);

  const calibrate = () => {
    if (!isComplete(values)) {
      return;
    }
    hit.onCalibrate(values);
    setValues({});
  };

  return (
    <>
      {hit.fields.map((field) => (
        <Flex key={field.id} gap={8} align="center">
          <Typography.Text fontSize={12} color="TextSecondary" flex={1}>
            {field.label}
          </Typography.Text>
          <NumberInput
            name={`timerHit-${field.id}`}
            numType={field.numType}
            value={values[field.id] ?? null}
            onChange={(value) => setValues({ ...values, [field.id]: value })}
            fullFlex
          />
        </Flex>
      ))}
      <Button
        trackerId={hit.trackerId}
        type="primary"
        disabled={!isComplete(values)}
        onClick={calibrate}
      >
        Calibrate
      </Button>
    </>
  );
};

type HitBoxProps<FieldId extends string> = {
  hit: RunHit<FieldId>;
};

const HitBox = <FieldId extends string>({ hit }: HitBoxProps<FieldId>) => (
  <HitBlock vertical gap={8}>
    <Flex vertical>
      <Typography.Text fontSize={13} strong>
        {hit.label}
      </Typography.Text>
      {hit.caption != null && (
        <Typography.Text fontSize={11} color="TextTertiary">
          {hit.caption}
        </Typography.Text>
      )}
    </Flex>
    {hit.type === "multi" ? (
      <MultiHitFields<FieldId> hit={hit} />
    ) : (
      <SingleHitFields hit={hit} />
    )}
  </HitBlock>
);

type Props<FieldId extends string> = {
  sequence: ReturnType<typeof useTimerSequence>;
  milliseconds: number[];
  startTrackerId: string;
  stopTrackerId: string;
  listTitle: string;
  rows: RunRow[];
  selectedRowIndex?: number;
  onSelectRow?: (index: number) => void;
  onEdit?: () => void;
  hit?: RunHit<FieldId>;
  disableStart?: boolean;
  belowStartButton?: React.ReactNode;
};

export const RunView = <FieldId extends string = string>({
  sequence,
  milliseconds,
  startTrackerId,
  stopTrackerId,
  listTitle,
  rows,
  selectedRowIndex,
  onSelectRow,
  onEdit,
  hit,
  disableStart = false,
  belowStartButton,
}: Props<FieldId>) => {
  const t = useActiveRouteTranslations();
  const {
    currentTimerIndex,
    currentMs,
    countdownMs,
    startTimeMs,
    timerStartOffset,
    isRunning,
    onExpire,
    toggle,
  } = sequence;

  const totalMs = milliseconds.reduce((sum, ms) => sum + ms, 0);

  return (
    <Flex vertical gap={16}>
      <Flex justify="center">
        <Timer
          render={arcTimerRenderer}
          canvasWidth={ARC_WIDTH}
          canvasHeight={ARC_HEIGHT}
          expirationMs={currentMs}
          countdownMs={countdownMs}
          startTimeMs={startTimeMs}
          timerStartOffset={timerStartOffset}
          run={isRunning && currentTimerIndex < milliseconds.length}
          onExpire={onExpire}
        />
      </Flex>

      <CaptionRow justify="space-between">
        <span>
          {`${t["Minutes Before Target"]}: ${getMinutesBeforeTarget(milliseconds)}`}
        </span>
        <span>{`${formatDuration(totalMs)} total`}</span>
      </CaptionRow>

      <Button
        trackerId={isRunning ? stopTrackerId : startTrackerId}
        type={isRunning ? "default" : "primary"}
        disabled={milliseconds.length === 0 || (disableStart && !isRunning)}
        onClick={toggle}
        height={PRIMARY_BUTTON_HEIGHT}
      >
        {isRunning ? t["Stop Timer"] : t["Start Timer"]}
      </Button>

      {belowStartButton}

      <DigestCard vertical gap={2}>
        <Flex justify="space-between" align="center" mb={2}>
          <Typography.Text fontSize={12} strong>
            {listTitle}
          </Typography.Text>
          {onEdit != null && (
            <EditAffordance type="button" onClick={onEdit} disabled={isRunning}>
              <Icon name="Edit" size={13} />
              Edit
            </EditAffordance>
          )}
        </Flex>

        {rows.map((row, index) => {
          const active = isRunning && index === currentTimerIndex;
          return (
            <DigestRow
              key={row.id}
              $active={active}
              $selected={onSelectRow != null && index === selectedRowIndex}
              $selectable={onSelectRow != null}
              role={onSelectRow == null ? undefined : "button"}
              onClick={
                onSelectRow == null ? undefined : () => onSelectRow(index)
              }
            >
              <RowIndex $active={active}>{index + 1}</RowIndex>
              <Typography.Text
                fontSize={13}
                strong={active}
                color={active ? "Text" : "TextSecondary"}
                flex={1}
              >
                {row.label}
              </Typography.Text>
              <Typography.Text fontSize={13} fontFamily="monospace">
                {formatSeconds(row.ms)}
              </Typography.Text>
            </DigestRow>
          );
        })}
      </DigestCard>

      <Flex flex={1} />

      {hit != null && <HitBox key={hit.id} hit={hit} />}
    </Flex>
  );
};
