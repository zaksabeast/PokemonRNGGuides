import React from "react";
import { match } from "ts-pattern";
import { shinyLabels } from "~/rngTools/shiny";
import {
  Alert,
  Button,
  Flex,
  Icon,
  SectionCard,
  Tag,
  Typography,
} from "~/components";
import { Gen7Gift, Gen7Press } from "~/rngTools";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { formatMinutesAndSeconds } from "~/utils/formatDuration";
import { SAFE_ADVANCE_COUNT } from "./useSafeAdvances";
import { Color } from "@emotion/react";

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

const formatIvs = ({ ivs }: Gen7Gift) =>
  [ivs.hp, ivs.atk, ivs.def, ivs.spa, ivs.spd, ivs.spe].join("/");

type GiftTagsProps = {
  gift: Gen7Gift | null;
  // Undefined hides the tag.
  abilityName?: string | null;
};

export const GiftTags = ({ gift, abilityName }: GiftTagsProps) => {
  const t = useActiveRouteTranslations();

  return (
    <Flex gap={8} wrap>
      <Tag>{gift == null ? PLACEHOLDER : gift.nature}</Tag>
      <Tag>{gift == null ? PLACEHOLDER : gift.gender}</Tag>
      {abilityName !== undefined && <Tag>{abilityName ?? PLACEHOLDER}</Tag>}
      <Tag>{gift == null ? PLACEHOLDER : formatIvs(gift)}</Tag>
      <Tag>{gift == null ? PLACEHOLDER : t[shinyLabels[gift.shiny]]}</Tag>
    </Flex>
  );
};

type PressCardProps = {
  title: string;
  label: string;
  waitLabel: string;
  targetAdvance: number | null;
  hasPlan: boolean;
  press: Gen7Press | null;
};

const PressCardContent = ({
  label,
  waitLabel,
  targetAdvance,
  hasPlan,
  press,
}: Omit<PressCardProps, "title">) => {
  const t = useActiveRouteTranslations();

  if (targetAdvance == null) {
    return (
      <Typography.Text color="TextSecondary">
        {t["Select a target in the search above"]}
      </Typography.Text>
    );
  }

  if (hasPlan && press == null) {
    return (
      <Alert
        type="warning"
        title={t[
          "{target} can't be reached from this timeline. Pick another target."
        ].replace("{target}", targetAdvance.toString())}
      />
    );
  }

  return (
    <PressTiming
      label={label}
      labelColor="Primary"
      advance={press?.advance ?? null}
      waitLabel={waitLabel}
      waitSteps={press?.wait_steps ?? null}
    />
  );
};

export const PressCard = ({
  title,
  hasPlan,
  press,
  ...props
}: PressCardProps) => {
  const borderColor: Color | undefined = match({ hasPlan, press })
    .with({ hasPlan: false }, () => undefined)
    .with({ press: null }, () => "Warning" as const)
    .otherwise(() => "Primary" as const);

  return (
    <SectionCard title={title} borderColor={borderColor}>
      <Flex vertical justify="center" minHeight={PRESS_TIMING_MIN_HEIGHT}>
        <PressCardContent hasPlan={hasPlan} press={press} {...props} />
      </Flex>
    </SectionCard>
  );
};

type TargetAdvanceCardProps = {
  gift: Gen7Gift | null;
  waitSteps: number | null;
  abilityName?: string | null;
};

export const TargetAdvanceCard = ({
  gift,
  waitSteps,
  abilityName,
}: TargetAdvanceCardProps) => {
  const t = useActiveRouteTranslations();

  return (
    <SectionCard
      title={t["Target Advance"]}
      borderColor={waitSteps == null ? undefined : "Success"}
    >
      <Flex vertical justify="center" minHeight={PRESS_TIMING_MIN_HEIGHT}>
        <PressTiming
          label={t["Press A at"]}
          labelColor="Success"
          advance={gift?.advance ?? null}
          waitLabel={t["Time until A press"]}
          waitSteps={waitSteps}
        />
      </Flex>
      <GiftTags gift={gift} abilityName={abilityName} />
    </SectionCard>
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
