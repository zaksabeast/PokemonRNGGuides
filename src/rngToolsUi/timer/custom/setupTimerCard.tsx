import styled from "@emotion/styled";
import {
  Button,
  Flex,
  Icon,
  NumberInput,
  Select,
  Typography,
} from "~/components";
import { formatSeconds } from "../format";
import { getNumType, getTimerLabel, type SingleTimerSettings } from "./state";
import { styledPropGuard } from "~/utils/styled";

const CardShell = styled(
  Flex,
  styledPropGuard,
)<{ $expanded: boolean }>(({ theme, $expanded }) => ({
  backgroundColor: theme.token.colorBgContainer,
  border: `1px solid ${
    $expanded ? theme.token.colorPrimary : theme.token.colorBorderSecondary
  }`,
  borderRadius: 8,
}));

const HeaderRow = styled.button(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%",
  padding: "11px 12px",
  border: "none",
  background: "none",
  textAlign: "left",
  cursor: "pointer",
  color: theme.token.colorText,
}));

const RowIndex = styled(
  "span",
  styledPropGuard,
)<{ $expanded: boolean }>(({ theme, $expanded }) => ({
  flex: "none",
  width: 16,
  fontFamily: "monospace",
  fontSize: 11,
  color: $expanded ? theme.token.colorPrimary : theme.token.colorTextQuaternary,
}));

const Chevron = styled(
  "span",
  styledPropGuard,
)<{ $expanded: boolean }>(({ $expanded }) => ({
  flex: "none",
  display: "inline-flex",
  transition: "transform 150ms",
  transform: $expanded ? "rotate(90deg)" : "none",
}));

const FieldRow = styled(Flex)({
  alignItems: "center",
  gap: 12,
});

const FieldLabel = styled.div({
  flex: "none",
  width: 106,
  fontSize: 13,
  fontWeight: 600,
  lineHeight: 1.4,
});

const Body = styled(Flex)(({ theme }) => ({
  padding: "0 12px 12px",
  borderTop: `1px solid ${theme.token.colorBorderSecondary}`,
  paddingTop: 12,
}));

type Props = {
  timer: SingleTimerSettings;
  index: number;
  durationMs: number;
  expanded: boolean;
  onToggle: () => void;
  onChange: (timer: SingleTimerSettings) => void;
  onDuplicate: () => void;
  onRemove: () => void;
};

export const SetupTimerCard = ({
  timer,
  index,
  durationMs,
  expanded,
  onToggle,
  onChange,
  onDuplicate,
  onRemove,
}: Props) => {
  const numType = getNumType(timer);

  return (
    <CardShell vertical $expanded={expanded}>
      <HeaderRow type="button" onClick={onToggle}>
        <RowIndex $expanded={expanded}>{index + 1}</RowIndex>
        <Typography.Text fontSize={13} flex={1}>
          {getTimerLabel(timer)}
        </Typography.Text>
        <Typography.Text
          fontSize={13}
          fontFamily="monospace"
          color="TextTertiary"
        >
          {formatSeconds(durationMs)}
        </Typography.Text>
        <Chevron $expanded={expanded}>
          <Icon
            name="ChevronRight"
            size={10}
            color={expanded ? "Primary" : "TextQuaternary"}
          />
        </Chevron>
      </HeaderRow>

      {expanded && (
        <Body vertical gap={10}>
          <FieldRow>
            <FieldLabel>Target Type</FieldLabel>
            <Select<SingleTimerSettings["target_type"]>
              name={`target_type_${timer.timer_id}`}
              value={timer.target_type}
              onChange={(target_type) => onChange({ ...timer, target_type })}
              fullFlex
              options={[
                { label: "Milliseconds", value: "ms" },
                { label: "Advances", value: "advances" },
                { label: "Seed Hex", value: "seed_hex" },
              ]}
            />
          </FieldRow>
          <FieldRow>
            <FieldLabel>Target</FieldLabel>
            <NumberInput
              name={`target_${timer.timer_id}`}
              numType={numType}
              value={timer.target}
              onChange={(target) => onChange({ ...timer, target: target ?? 0 })}
              fullFlex
            />
          </FieldRow>
          <FieldRow>
            <FieldLabel>Calibration</FieldLabel>
            <NumberInput
              name={`calibration_${timer.timer_id}`}
              numType="float"
              value={timer.calibration}
              onChange={(calibration) =>
                onChange({ ...timer, calibration: calibration ?? 0 })
              }
              fullFlex
            />
          </FieldRow>
          <Flex gap={8} mt={2}>
            <Button
              trackerId="duplicate_custom_timer"
              onClick={onDuplicate}
              height={34}
              flex={1}
            >
              Duplicate
            </Button>
            <Button
              trackerId="remove_custom_timer"
              onClick={onRemove}
              height={34}
              flex={1}
              danger
            >
              Remove
            </Button>
          </Flex>
        </Body>
      )}
    </CardShell>
  );
};
