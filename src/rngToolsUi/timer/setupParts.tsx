import styled from "@emotion/styled";
import { Flex, Select } from "~/components";
import { type GameConsole } from "~/rngTools";

export const GroupLabel = styled(Flex)(({ theme }) => ({
  alignItems: "center",
  gap: 8,
  fontSize: 11,
  lineHeight: 1,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: theme.token.colorTextTertiary,
}));

export const GroupRule = styled.div(({ theme }) => ({
  flex: 1,
  height: 1,
  backgroundColor: theme.token.colorFillQuaternary,
}));

export const FieldRow = styled(Flex)({
  alignItems: "center",
  gap: 12,
});

export const FieldLabel = styled.div({
  flex: "none",
  width: 118,
  fontSize: 13,
  fontWeight: 600,
  lineHeight: 1.4,
});

type BeepsRowProps = {
  value: number;
  onChange: (maxBeepCount: number) => void;
};

export const BeepsRow = ({ value, onChange }: BeepsRowProps) => (
  <FieldRow>
    <FieldLabel>Beeps</FieldLabel>
    <Select<number>
      name="countdownBeeps"
      value={value}
      onChange={onChange}
      fullFlex
      options={new Array(11).fill(0).map((_, index) => ({
        label: (index + 1).toString(),
        value: index,
      }))}
    />
  </FieldRow>
);

type DsConsoleRowProps = {
  value: GameConsole;
  onChange: (console: GameConsole) => void;
};

/** The consoles supported by gen 4 and gen 5, which both run on a DS. */
export const DsConsoleRow = ({ value, onChange }: DsConsoleRowProps) => (
  <FieldRow>
    <FieldLabel>Console</FieldLabel>
    <Select<GameConsole>
      name="console"
      value={value}
      onChange={onChange}
      fullFlex
      options={[
        { label: "NDS - Slot 1", value: "NdsSlot1" },
        { label: "DSI", value: "Dsi" },
        { label: "3DS", value: "ThreeDs" },
      ]}
    />
  </FieldRow>
);
