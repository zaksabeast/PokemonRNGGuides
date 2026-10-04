import React from "react";
import styled from "@emotion/styled";
import * as tst from "ts-toolbelt";
import { type Theme } from "@emotion/react";
import { styledPropGuard } from "~/utils/styled";
import {
  InfoTooltipButton,
  InfoTooltipCard,
  type InfoTooltipContent,
} from "./infoTooltip";
import { type FieldIds, useInfoTooltip } from "./hooks";

export type LabeledFieldProps = {
  label: React.ReactNode;
  tooltip?: InfoTooltipContent;
  helperText?: React.ReactNode;
  errorMessage?: string;
  /** Shows the error styling without a message, e.g. when a group of fields shares one message */
  invalid?: boolean;
};

const LABEL_GAP = 6;

const Frame = styled(
  "div",
  styledPropGuard,
)<{ $invalid: boolean }>(({ theme, $invalid }) => ({
  display: "flex",
  flexDirection: "column",
  gap: LABEL_GAP,
  minWidth: 0,
  "[data-field-label]": {
    color: $invalid ? theme.token.colorError : undefined,
  },
  "&:has([data-field-control]:focus-within) [data-field-label]": {
    color: $invalid ? theme.token.colorError : theme.token.colorPrimary,
  },
}));

const Header = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: LABEL_GAP,
});

const LabelRow = styled.div({
  display: "flex",
  alignItems: "center",
  gap: 4,
});

const labelStyles = ({ theme }: { theme: Theme }) => ({
  ...theme.typography.labelMedium,
  minWidth: 0,
  color: theme.token.colorTextSecondary,
});

const InputLabel = styled.label(labelStyles);

const GroupLabel = styled.span(labelStyles);

const TooltipCardSlot = styled.div({
  marginBottom: LABEL_GAP,
});

const Control = styled.div({
  minWidth: 0,
});

const Helper = styled(
  "div",
  styledPropGuard,
)<{ $invalid: boolean }>(({ theme, $invalid }) => ({
  ...theme.typography.bodySmall,
  paddingInline: 16,
  color: $invalid ? theme.token.colorError : theme.token.colorTextTertiary,
}));

type FieldFrameProps = tst.O.Optional<LabeledFieldProps, "label"> & {
  ids: FieldIds;
  /** Use "group" for controls like radio grids that have no single input for the label to point at */
  labelTarget?: "input" | "group";
  children: React.ReactNode;
};

export const FieldFrame = ({
  ids,
  labelTarget = "input",
  label,
  tooltip,
  helperText,
  errorMessage,
  invalid: _invalid,
  children,
}: FieldFrameProps) => {
  const infoTooltip = useInfoTooltip();
  const invalid = _invalid === true || errorMessage != null;
  const message = errorMessage ?? helperText;

  return (
    <Frame $invalid={invalid}>
      {(label != null || tooltip != null) && (
        <Header>
          <LabelRow>
            {label != null &&
              (labelTarget === "input" ? (
                <InputLabel
                  id={ids.labelId}
                  htmlFor={ids.inputId}
                  data-field-label
                >
                  {label}
                </InputLabel>
              ) : (
                <GroupLabel id={ids.labelId} data-field-label>
                  {label}
                </GroupLabel>
              ))}
            {tooltip != null && (
              <InfoTooltipButton
                open={infoTooltip.open}
                cardId={infoTooltip.cardId}
                onClick={infoTooltip.toggle}
              />
            )}
          </LabelRow>
          {tooltip != null && infoTooltip.open && (
            <TooltipCardSlot>
              <InfoTooltipCard
                id={infoTooltip.cardId}
                title={tooltip.title}
                description={tooltip.description}
                onClose={infoTooltip.close}
              />
            </TooltipCardSlot>
          )}
        </Header>
      )}
      <Control data-field-control>{children}</Control>
      {message != null && (
        <Helper id={ids.helperId} $invalid={invalid}>
          {message}
        </Helper>
      )}
    </Frame>
  );
};
