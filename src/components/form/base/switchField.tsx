import React from "react";
import styled from "@emotion/styled";
import * as tst from "ts-toolbelt";
import { useField } from "~/hooks/form";
import { FormFieldProps, GenericForm } from "~/types/form";
import { Icon } from "~/components/icons";
import { styledPropGuard } from "~/utils/styled";
import {
  InfoTooltipButton,
  InfoTooltipCard,
  type InfoTooltipContent,
} from "./infoTooltip";
import { useFieldIds, useInfoTooltip } from "./hooks";
import { SWITCH_ROW_INSET, SwitchGroupContext } from "./switchContext";
import { SwitchGroup } from "./switchGroup";

const TRACK_WIDTH = 52;
const TRACK_HEIGHT = 32;
const TRACK_BORDER_WIDTH = 2;
const HANDLE_ON_SIZE = 24;
const HANDLE_OFF_SIZE = 16;
const CHECK_ICON_SIZE = 16;
const OWNED_FIELDS_INSET = 16;

const Item = styled.div({
  display: "flex",
  flexDirection: "column",
});

const Row = styled(
  "div",
  styledPropGuard,
)<{ $twoLine: boolean; $disabled: boolean }>(
  ({ theme, $twoLine, $disabled }) => ({
    display: "flex",
    alignItems: "center",
    gap: 16,
    minHeight: theme.size.listItem,
    [theme.mediaQueries.dense]: {
      minHeight: theme.size.dense.listItem,
    },
    boxSizing: "border-box",
    paddingInlineStart: SWITCH_ROW_INSET,
    paddingInlineEnd: 16,
    paddingBlock: $twoLine ? 8 : 0,
    cursor: $disabled ? "not-allowed" : "pointer",
    opacity: $disabled ? 0.38 : 1,
    color: theme.token.colorText,
  }),
);

const Text = styled.div({
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
});

const LabelLine = styled.div({
  display: "flex",
  alignItems: "center",
  gap: 4,
});

const Label = styled.span(({ theme }) => ({
  ...theme.typography.bodyLarge,
  minWidth: 0,
}));

const SupportingText = styled.span(({ theme }) => ({
  ...theme.typography.bodyMedium,
  color: theme.token.colorTextSecondary,
}));

const Track = styled(
  "button",
  styledPropGuard,
)<{ $checked: boolean }>(({ theme, $checked }) => ({
  ...theme.interactive,
  flex: "none",
  display: "flex",
  justifyContent: $checked ? "flex-end" : "flex-start",
  width: TRACK_WIDTH,
  height: TRACK_HEIGHT,
  boxSizing: "border-box",
  padding: 0,
  borderWidth: TRACK_BORDER_WIDTH,
  borderStyle: "solid",
  borderColor: $checked ? theme.token.colorPrimary : theme.token.colorBorder,
  borderRadius: theme.shape.full,
  backgroundColor: $checked
    ? theme.token.colorPrimary
    : theme.token.colorFillQuaternary,
  ":disabled": {
    cursor: "not-allowed",
  },
}));

// A square the height of the track, so the handle stays centered at either end
const HandleSlot = styled.span({
  display: "grid",
  placeItems: "center",
  height: "100%",
  aspectRatio: 1,
});

const Handle = styled(
  "span",
  styledPropGuard,
)<{ $checked: boolean }>(({ theme, $checked }) => ({
  display: "grid",
  placeItems: "center",
  width: $checked ? HANDLE_ON_SIZE : HANDLE_OFF_SIZE,
  height: $checked ? HANDLE_ON_SIZE : HANDLE_OFF_SIZE,
  borderRadius: theme.shape.full,
  backgroundColor: $checked
    ? theme.token.colorOnPrimary
    : theme.token.colorBorder,
  color: theme.token.colorPrimaryActive,
  fontSize: CHECK_ICON_SIZE,
  transition: "width 150ms ease, height 150ms ease",
}));

const TooltipSlot = styled.div({
  paddingInline: OWNED_FIELDS_INSET,
  ":last-child": {
    paddingBottom: OWNED_FIELDS_INSET,
  },
});

const OwnedFields = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  paddingTop: 8,
  paddingInline: OWNED_FIELDS_INSET,
  paddingBottom: OWNED_FIELDS_INSET,
});

export type SwitchFieldProps = {
  label: React.ReactNode;
  tooltip?: InfoTooltipContent;
  supportingText?: React.ReactNode;
  value: boolean;
  onChange?: (value: boolean) => void;
  name?: string;
  disabled?: boolean;
  /** Fields owned by the switch, only rendered while it's on */
  children?: React.ReactNode;
};

const SwitchItem = ({
  label,
  tooltip,
  supportingText,
  value,
  onChange,
  name,
  disabled = false,
  children,
}: SwitchFieldProps) => {
  const ids = useFieldIds();
  const infoTooltip = useInfoTooltip();
  const showSupportingText = supportingText != null && !value;
  // Drops empty nodes, so an empty list or a false condition doesn't render an empty block
  const hasOwnedFields = React.Children.toArray(children).length > 0;

  return (
    <Item>
      <Row
        $twoLine={showSupportingText}
        $disabled={disabled}
        // The switch button handles keyboard input, this makes the whole row clickable
        onClick={() => {
          if (!disabled) {
            onChange?.(!value);
          }
        }}
      >
        <Text>
          <LabelLine>
            <Label id={ids.labelId}>{label}</Label>
            {tooltip != null && (
              <InfoTooltipButton
                open={infoTooltip.open}
                cardId={infoTooltip.cardId}
                onClick={infoTooltip.toggle}
              />
            )}
          </LabelLine>
          {showSupportingText && (
            <SupportingText id={ids.helperId}>{supportingText}</SupportingText>
          )}
        </Text>
        <Track
          type="button"
          role="switch"
          name={name}
          aria-checked={value}
          aria-labelledby={ids.labelId}
          aria-describedby={ids.helperId}
          disabled={disabled}
          $checked={value}
        >
          <HandleSlot>
            <Handle $checked={value}>{value && <Icon name="Check" />}</Handle>
          </HandleSlot>
        </Track>
      </Row>
      {tooltip != null && infoTooltip.open && (
        <TooltipSlot>
          <InfoTooltipCard
            id={infoTooltip.cardId}
            title={tooltip.title}
            description={tooltip.description}
            onClose={infoTooltip.close}
          />
        </TooltipSlot>
      )}
      {value && hasOwnedFields && <OwnedFields>{children}</OwnedFields>}
    </Item>
  );
};

export const SwitchField = (props: SwitchFieldProps) => {
  const inGroup = React.useContext(SwitchGroupContext);

  if (inGroup) {
    return <SwitchItem {...props} />;
  }

  return (
    <SwitchGroup>
      <SwitchItem {...props} />
    </SwitchGroup>
  );
};

type FormSwitchFieldProps<FormState extends GenericForm> = tst.O.Merge<
  { onChange?: (value: boolean) => void },
  FormFieldProps<FormState, boolean, SwitchFieldProps>
>;

export const FormSwitchField = <FormState extends GenericForm>({
  name,
  onChange,
  ...props
}: FormSwitchFieldProps<FormState>) => {
  const [{ value }, , { setValue }] = useField<boolean>(name);

  return (
    <SwitchField
      {...props}
      name={name}
      value={value}
      onChange={(updatedValue) => {
        setValue(updatedValue);
        onChange?.(updatedValue);
      }}
    />
  );
};
