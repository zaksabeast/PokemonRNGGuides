import React from "react";
import styled from "@emotion/styled";
import { Icon } from "~/components/icons";
import { styledPropGuard } from "~/utils/styled";

export type InfoTooltipContent = {
  title: React.ReactNode;
  description: React.ReactNode;
};

const INFO_ICON_SIZE = 18;
const INFO_OPEN_INDICATOR_SIZE = 28;
const CLOSE_ICON_SIZE = 20;
const CLOSE_HIT_AREA = 32;

// Takes up only the icon's width, and stretches to the row's height without adding to it,
// so a larger button can be centered over it without changing the layout
const IconSlot = styled(
  "span",
  styledPropGuard,
)<{ $size: number }>(({ $size }) => ({
  position: "relative",
  flex: "none",
  alignSelf: "stretch",
  width: $size,
  fontSize: $size,
}));

const CenteredIconButton = styled.button(({ theme }) => ({
  ...theme.interactive,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "grid",
  placeItems: "center",
  padding: 0,
  border: "none",
  borderRadius: theme.shape.full,
  background: "none",
  color: "inherit",
  fontSize: "inherit",
}));

const InfoButton = styled(
  CenteredIconButton,
  styledPropGuard,
)<{ $open: boolean }>(({ theme, $open }) => ({
  width: theme.size.touchTarget,
  height: theme.size.touchTarget,
  color: theme.token.colorPrimary,
  ":focus-visible": {
    outline: "none",
    "& > span": theme.interactive[":focus-visible"],
  },
  "& > span": {
    display: "grid",
    placeItems: "center",
    width: INFO_OPEN_INDICATOR_SIZE,
    height: INFO_OPEN_INDICATOR_SIZE,
    borderRadius: theme.shape.full,
    backgroundColor: $open
      ? `rgb(from ${theme.token.colorPrimary} r g b / 0.16)`
      : "transparent",
  },
}));

type InfoTooltipButtonProps = {
  open: boolean;
  cardId: string;
  onClick: () => void;
};

export const InfoTooltipButton = ({
  open,
  cardId,
  onClick,
}: InfoTooltipButtonProps) => (
  <IconSlot $size={INFO_ICON_SIZE}>
    <InfoButton
      type="button"
      $open={open}
      aria-label="More info"
      aria-expanded={open}
      aria-controls={cardId}
      onClick={(event) => {
        // Rows that toggle on click (like switches) shouldn't toggle too
        event.stopPropagation();
        onClick();
      }}
    >
      <span>
        <Icon name="InfoOutline" />
      </span>
    </InfoButton>
  </IconSlot>
);

const Card = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  paddingTop: 12,
  paddingInline: 16,
  paddingBottom: 14,
  borderRadius: theme.shape.medium,
  backgroundColor: theme.token.colorBgSpotlight,
  boxShadow: "0 4px 12px rgb(0 0 0 / 0.4)",
}));

const CardHeader = styled.div(({ theme }) => ({
  ...theme.typography.titleSmall,
  display: "flex",
  gap: 8,
  color: theme.token.colorText,
}));

const CardTitle = styled.div({
  flex: 1,
  minWidth: 0,
});

const CloseButton = styled(CenteredIconButton)(({ theme }) => ({
  width: CLOSE_HIT_AREA,
  height: CLOSE_HIT_AREA,
  color: theme.token.colorTextSecondary,
  ":hover": {
    backgroundColor: theme.token.colorStateLayerHover,
  },
}));

const CardBody = styled.div(({ theme }) => ({
  ...theme.typography.bodyMedium,
  color: theme.token.colorTextSecondary,
  textWrap: "pretty",
}));

type InfoTooltipCardProps = InfoTooltipContent & {
  id: string;
  onClose: () => void;
};

export const InfoTooltipCard = ({
  id,
  title,
  description,
  onClose,
}: InfoTooltipCardProps) => (
  <Card id={id} role="note">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <IconSlot $size={CLOSE_ICON_SIZE}>
        <CloseButton type="button" aria-label="Close" onClick={onClose}>
          <Icon name="Close" />
        </CloseButton>
      </IconSlot>
    </CardHeader>
    <CardBody>{description}</CardBody>
  </Card>
);
