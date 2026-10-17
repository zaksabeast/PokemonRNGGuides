import React from "react";
import { shinyLabels } from "~/rngTools/shiny";
import { Button, Flex, Icon, SectionCard, Tag, Typography } from "~/components";
import { Gen7Starter } from "~/rngTools";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { formatMinutesAndSeconds } from "~/utils/formatDuration";
import { SAFE_ADVANCE_COUNT } from "./useSafeAdvances";

const ADVANCE_TAG_MIN_WIDTH = 64;
const ADVANCE_BUTTON_MIN_WIDTH = 80;
export const PRESS_TIMING_MIN_HEIGHT = 78;
const PLACEHOLDER = "-";
const NEXT_ADVANCE_PLACEHOLDER_COUNT = 5;
const SECONDS_PER_STEP = 2 / 60;

type PressTimingProps = {
  label: string;
  labelColor: React.ComponentProps<typeof Typography.Text>["color"];
  advance: number | null;
  waitLabel: string;
  waitSteps: number | null;
};

export const PressTiming = ({
  label,
  labelColor,
  advance,
  waitLabel,
  waitSteps,
}: PressTimingProps) => (
  <Flex gap={32} wrap align="flex-end">
    <Flex vertical>
      <Typography.Text color={labelColor}>{label}</Typography.Text>
      <Typography.Text fontSize={36} strong>
        {advance ?? PLACEHOLDER}
      </Typography.Text>
    </Flex>
    <Flex vertical>
      <Typography.Text color="TextSecondary">{waitLabel}</Typography.Text>
      <Typography.Text fontSize={24}>
        {waitSteps == null
          ? PLACEHOLDER
          : formatMinutesAndSeconds(waitSteps * SECONDS_PER_STEP)}
      </Typography.Text>
    </Flex>
  </Flex>
);

const formatIvs = ({ ivs }: Gen7Starter) =>
  [ivs.hp, ivs.atk, ivs.def, ivs.spa, ivs.spd, ivs.spe].join("/");

export const StarterTags = ({ starter }: { starter: Gen7Starter | null }) => {
  const t = useActiveRouteTranslations();

  return (
    <Flex gap={8} wrap>
      <Tag>{starter == null ? PLACEHOLDER : starter.nature}</Tag>
      <Tag>{starter == null ? PLACEHOLDER : starter.gender}</Tag>
      <Tag>{starter == null ? PLACEHOLDER : formatIvs(starter)}</Tag>
      <Tag>
        {starter == null
          ? PLACEHOLDER
          : `${t["Shiny"]}: ${shinyLabels[starter.shiny]}`}
      </Tag>
    </Flex>
  );
};

type SafeAdvancesCardProps = {
  safeAdvances: number[] | null;
  selected: number | null;
  disabled: boolean;
  canShowMore: boolean;
  onSelect: (safeAdvance: number) => void;
  onShowMore: () => void;
  action?: React.ReactNode;
};

export const SafeAdvancesCard = ({
  safeAdvances,
  selected,
  disabled,
  canShowMore,
  onSelect,
  onShowMore,
  action,
}: SafeAdvancesCardProps) => {
  const t = useActiveRouteTranslations();
  const hasResults = safeAdvances != null && safeAdvances.length > 0;

  const buttons =
    safeAdvances == null
      ? Array.from({ length: SAFE_ADVANCE_COUNT }, (_, index) => (
          <Button
            key={index}
            trackerId="gen7_select_safe_advance"
            minWidth={ADVANCE_BUTTON_MIN_WIDTH}
            disabled
          >
            {PLACEHOLDER}
          </Button>
        ))
      : safeAdvances.map((safeAdvance) => (
          <Button
            key={safeAdvance}
            trackerId="gen7_select_safe_advance"
            minWidth={ADVANCE_BUTTON_MIN_WIDTH}
            type={selected === safeAdvance ? "primary" : "default"}
            disabled={disabled}
            onClick={() => onSelect(safeAdvance)}
          >
            {safeAdvance}
          </Button>
        ));

  return (
    <SectionCard
      title={t["Step one frame at a time until you land on one of these"]}
    >
      {action}
      {safeAdvances?.length === 0 ? (
        <Typography.Text color="TextSecondary">
          {t["No safe advances found"]}
        </Typography.Text>
      ) : (
        <Flex gap={8} wrap align="center">
          {buttons}
          <Button
            trackerId="gen7_show_more_safe_advances"
            type="link"
            disabled={!hasResults || !canShowMore || disabled}
            onClick={onShowMore}
          >
            {t["Show More"]}
          </Button>
        </Flex>
      )}
    </SectionCard>
  );
};

type NextAdvancesCardProps = {
  safeAdvance: number | null;
  nextAdvances: number[] | null;
};

export const NextAdvancesCard = ({
  safeAdvance,
  nextAdvances,
}: NextAdvancesCardProps) => {
  const t = useActiveRouteTranslations();
  const shownAdvances =
    nextAdvances ??
    Array.from({ length: NEXT_ADVANCE_PLACEHOLDER_COUNT }, () => null);

  return (
    <SectionCard title={t["Keep stepping and compare"]}>
      <Flex gap={8} wrap align="center">
        <Tag
          backgroundColor={safeAdvance == null ? undefined : "Primary"}
          color={safeAdvance == null ? undefined : "TextLightSolid"}
          border={0}
          fontSize={16}
          minWidth={ADVANCE_TAG_MIN_WIDTH}
          textAlign="center"
        >
          {safeAdvance ?? PLACEHOLDER}
        </Tag>
        <Icon name="ArrowRightAlt" />
        {shownAdvances.map((advance, index) => (
          <Tag
            key={index}
            fontSize={16}
            minWidth={ADVANCE_TAG_MIN_WIDTH}
            textAlign="center"
          >
            {advance ?? PLACEHOLDER}
          </Tag>
        ))}
      </Flex>
    </SectionCard>
  );
};
