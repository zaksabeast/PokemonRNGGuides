import React from "react";
import styled from "@emotion/styled";
import {
  InfoTooltipButton,
  InfoTooltipCard,
  type InfoTooltipContent,
} from "./infoTooltip";
import { useInfoTooltip } from "./hooks";
import { SWITCH_ROW_INSET } from "./switchContext";

export type SummaryRow = {
  label: React.ReactNode;
  value: React.ReactNode;
  tooltip?: InfoTooltipContent;
  show?: boolean;
  key?: string;
};

const Container = styled.div(({ theme }) => ({
  paddingBlock: 4,
  borderRadius: theme.shape.largeIncreased,
  backgroundColor: theme.token.colorBgContainer,
  "& > * + *::before": {
    content: '""',
    display: "block",
    height: 1,
    marginInline: SWITCH_ROW_INSET,
    backgroundColor: theme.token.colorBorderSecondary,
  },
}));

const Item = styled.div({
  display: "flex",
  flexDirection: "column",
});

const Row = styled.div(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  columnGap: 16,
  rowGap: 4,
  minHeight: theme.size.listItem,
  [theme.mediaQueries.dense]: {
    minHeight: theme.size.dense.listItem,
  },
  boxSizing: "border-box",
  paddingInlineStart: SWITCH_ROW_INSET,
  paddingInlineEnd: 16,
  paddingBlock: 8,
  color: theme.token.colorText,
}));

const LabelLine = styled.div({
  display: "flex",
  alignItems: "center",
  gap: 4,
  minWidth: 0,
});

const Label = styled.span(({ theme }) => ({
  ...theme.typography.bodyMedium,
  minWidth: 0,
  color: theme.token.colorTextSecondary,
}));

const Value = styled.div(({ theme }) => ({
  ...theme.typography.bodyLarge,
  minWidth: 0,
  marginInlineStart: "auto",
  textAlign: "end",
  overflowWrap: "anywhere",
}));

const TooltipSlot = styled.div({
  paddingInline: 16,
  paddingBottom: 16,
});

const SummaryItem = ({ label, value, tooltip }: SummaryRow) => {
  const infoTooltip = useInfoTooltip();

  return (
    <Item>
      <Row>
        <LabelLine>
          <Label>{label}</Label>
          {tooltip != null && (
            <InfoTooltipButton
              open={infoTooltip.open}
              cardId={infoTooltip.cardId}
              onClick={infoTooltip.toggle}
            />
          )}
        </LabelLine>
        <Value>{value}</Value>
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
    </Item>
  );
};

type Props = {
  rows: readonly SummaryRow[];
};

export const FormSummary = ({ rows }: Props) => {
  const visibleRows = rows.filter((row) => row.show !== false);

  if (visibleRows.length === 0) {
    return null;
  }

  return (
    <Container>
      {visibleRows.map((row, index) => (
        <SummaryItem
          key={
            row.key ?? (typeof row.label === "string" ? row.label : `${index}`)
          }
          {...row}
        />
      ))}
    </Container>
  );
};
