import React from "react";
import { z } from "zod";
import {
  Alert,
  Button,
  Card,
  Field,
  Flex,
  FormFieldTable,
  FormikNumberInput,
  Grid,
  Icon,
  RngToolForm,
  RngToolSubmit,
  Tag,
  Typography,
} from "~/components";
import { multiWorkerRngTools, Gen7TargetTimeline } from "~/rngTools";
import { HexSchema } from "~/utils/number";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useCancellablePromise } from "~/hooks/useCancellablePromise";

const SAFE_ADVANCE_COUNT = 10;
// Advances are usize in wasm (32 bits). This leaves room to scan past the
// target and keep pressing "Show More" without overflowing.
const MAX_ADVANCE = 4_000_000_000;
const MAX_TARGET_DISTANCE = 1_000_000_000;

const Validator = z
  .object({
    seed: HexSchema(0xffffffff),
    npc_count: z.number().int().min(1).max(100),
    current_advance: z.number().int().min(0).max(MAX_ADVANCE),
    target_advance: z.number().int().min(0).max(MAX_ADVANCE),
  })
  .refine((values) => values.target_advance > values.current_advance, {
    path: ["target_advance"],
    message: "Must be greater than the current advance",
  })
  .refine(
    (values) =>
      values.target_advance - values.current_advance <= MAX_TARGET_DISTANCE,
    {
      path: ["target_advance"],
      message: "Must be at most 1,000,000,000 past the current advance",
    },
  );

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  seed: 0,
  npc_count: 1,
  current_advance: 0,
  target_advance: 0,
};

const Fields = () => {
  const t = useActiveRouteTranslations();

  const fields = [
    {
      label: t["Initial Seed"],
      direction: "column",
      input: <FormikNumberInput<FormState> name="seed" numType="hex" />,
    },
    {
      label: t["NPC Count"],
      direction: "column",
      input: (
        <FormikNumberInput<FormState> name="npc_count" numType="decimal" />
      ),
    },
    {
      label: t["Current Advance"],
      direction: "column",
      input: (
        <FormikNumberInput<FormState>
          name="current_advance"
          numType="decimal"
        />
      ),
    },
    {
      label: t["Target Advance"],
      direction: "column",
      input: (
        <FormikNumberInput<FormState> name="target_advance" numType="decimal" />
      ),
    },
  ] as const satisfies Field[];

  return (
    <Grid mobile={1} smallTablet={2} gap="0 16px">
      {fields.map((field) => (
        <FormFieldTable key={field.label} fields={[field]} />
      ))}
    </Grid>
  );
};

type SectionCardProps = {
  title: string;
  borderColor?: React.ComponentProps<typeof Card>["borderColor"];
  children: React.ReactNode;
};

// The title is in the body instead of the card header so it can wrap on phones.
const SectionCard = ({ title, borderColor, children }: SectionCardProps) => (
  <Card borderColor={borderColor}>
    <Flex vertical gap={16}>
      <Typography.Text strong fontSize={16}>
        {title}
      </Typography.Text>
      {children}
    </Flex>
  </Card>
);

// Placeholders keep the same size as real results, so nothing shifts when results load.
const NEXT_ADVANCE_COUNT = 5;
const ADVANCE_BUTTON_MIN_WIDTH = 80;
const ADVANCE_TAG_MIN_WIDTH = 64;
// Fits the "Press A at" values, so the other states don't change a card's height.
const TARGET_CONTENT_MIN_HEIGHT = 78;
const PLACEHOLDER = "-";

type SafeAdvancesCardProps = {
  safeAdvances: number[] | null;
  selected: number | null;
  disabled: boolean;
  canShowMore: boolean;
  onSelect: (safeAdvance: number) => void;
  onShowMore: () => void;
};

const SafeAdvancesCard = ({
  safeAdvances,
  selected,
  disabled,
  canShowMore,
  onSelect,
  onShowMore,
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

type Selection = {
  safeAdvance: number;
  targetTimeline: Gen7TargetTimeline;
};

const NextAdvancesCard = ({ selection }: { selection: Selection | null }) => {
  const t = useActiveRouteTranslations();
  const nextAdvances =
    selection?.targetTimeline.next_advances ??
    Array.from({ length: NEXT_ADVANCE_COUNT }, () => null);

  return (
    <SectionCard title={t["Keep stepping and compare"]}>
      <Flex gap={8} wrap align="center">
        <Tag
          backgroundColor={selection == null ? undefined : "Primary"}
          color={selection == null ? undefined : "TextLightSolid"}
          border={0}
          fontSize={16}
          minWidth={ADVANCE_TAG_MIN_WIDTH}
          textAlign="center"
        >
          {selection?.safeAdvance ?? PLACEHOLDER}
        </Tag>
        <Icon name="ArrowRightAlt" />
        {nextAdvances.map((advance, index) => (
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

// Each step is 2/60 of a second, the same as 3DSRNGTool's timeline.
const formatStepsTime = (steps: number) => {
  const seconds = (steps * 2) / 60;
  if (seconds < 60) {
    return `~${seconds.toFixed(1)} s`;
  }
  const totalSeconds = Math.round(seconds);
  return `~${Math.floor(totalSeconds / 60)} min ${totalSeconds % 60} s`;
};

type PressAValuesProps = {
  labelColor: React.ComponentProps<typeof Typography.Text>["color"];
  advance: number | null;
  timeLabel: string;
  steps: number | null;
};

const PressAValues = ({
  labelColor,
  advance,
  timeLabel,
  steps,
}: PressAValuesProps) => {
  const t = useActiveRouteTranslations();

  return (
    <Flex gap={32} wrap align="flex-end">
      <Flex vertical>
        <Typography.Text color={labelColor}>{t["Press A at"]}</Typography.Text>
        <Typography.Text fontSize={36} strong>
          {advance ?? PLACEHOLDER}
        </Typography.Text>
      </Flex>
      <Flex vertical>
        <Typography.Text color="TextSecondary">{timeLabel}</Typography.Text>
        <Typography.Text fontSize={24}>
          {steps == null ? PLACEHOLDER : formatStepsTime(steps)}
        </Typography.Text>
      </Flex>
    </Flex>
  );
};

type ResultCardProps = {
  target: number | null;
  selection: Selection | null;
};

const LeapCard = ({ target, selection }: ResultCardProps) => {
  const t = useActiveRouteTranslations();
  const targetTimeline = selection?.targetTimeline ?? null;
  const leap = targetTimeline?.leap ?? null;
  // The guide always starts the dialogue, so the target needs a leap even
  // when it's on the timeline.
  const unreachable = targetTimeline != null && target != null && leap == null;

  const borderColor = (() => {
    if (unreachable) {
      return "Warning";
    }
    return leap == null ? undefined : "Primary";
  })();

  const content = (() => {
    if (unreachable) {
      return (
        <Alert
          type="warning"
          title={t[
            "{target} can't be reached from this timeline. Pick another target in 3DSRNGTool."
          ].replace("{target}", target.toString())}
        />
      );
    }
    return (
      <PressAValues
        labelColor="Primary"
        advance={leap?.leap_advance ?? null}
        timeLabel={t["Time"]}
        steps={leap?.steps_to_leap ?? null}
      />
    );
  })();

  return (
    <SectionCard title={t["Timeline Leap"]} borderColor={borderColor}>
      <Flex vertical justify="center" minHeight={TARGET_CONTENT_MIN_HEIGHT}>
        {content}
      </Flex>
    </SectionCard>
  );
};

const TargetCard = ({ target, selection }: ResultCardProps) => {
  const t = useActiveRouteTranslations();
  const targetTimeline = selection?.targetTimeline ?? null;
  const leap = targetTimeline?.leap ?? null;

  return (
    <SectionCard
      title={t["Target Advance"]}
      borderColor={leap == null ? undefined : "Success"}
    >
      <Flex vertical justify="center" minHeight={TARGET_CONTENT_MIN_HEIGHT}>
        <PressAValues
          labelColor="Success"
          advance={leap == null ? null : target}
          timeLabel={t["Time after leap"]}
          steps={leap?.steps_from_leap_to_target ?? null}
        />
      </Flex>
    </SectionCard>
  );
};

export const Gen7TimelineFinder = () => {
  const t = useActiveRouteTranslations();
  const [submitted, setSubmitted] = React.useState<FormState | null>(null);
  const [safeAdvances, setSafeAdvances] = React.useState<number[] | null>(null);
  const [selection, setSelection] = React.useState<Selection | null>(null);
  const [canShowMore, setCanShowMore] = React.useState(true);
  const { loading, waitFor, cancel } = useCancellablePromise();

  const findSafeAdvances = async (
    opts: FormState & { from_advance: number },
  ) => {
    const results = await waitFor(
      multiWorkerRngTools.gen7_next_safe_advances({
        seed: opts.seed,
        npc_count: opts.npc_count,
        current_advance: opts.current_advance,
        from_advance: opts.from_advance,
        safe_advance_count: SAFE_ADVANCE_COUNT,
      }),
    );
    if (results == null) {
      return null;
    }
    return results.map((safeAdvance) => safeAdvance.advance);
  };

  const onSubmit: RngToolSubmit<FormState> = async (opts) => {
    setSubmitted(opts);
    setSelection(null);
    setSafeAdvances(null);
    setCanShowMore(true);
    const results = await findSafeAdvances({
      ...opts,
      from_advance: opts.current_advance,
    });
    setSafeAdvances(results);
  };

  const onShowMore = async () => {
    const last = safeAdvances?.at(-1);
    if (submitted == null || last == null) {
      return;
    }
    const more = await findSafeAdvances({
      ...submitted,
      from_advance: last + 1,
    });
    if (more == null) {
      return;
    }
    // Searching again from the same advance would find nothing again.
    if (more.length === 0) {
      setCanShowMore(false);
      return;
    }
    setSafeAdvances([...(safeAdvances ?? []), ...more]);
  };

  const onSelectSafeAdvance = async (safeAdvance: number) => {
    if (submitted == null) {
      return;
    }
    setSelection(null);
    const results = await waitFor(
      multiWorkerRngTools.gen7_target_timeline({
        seed: submitted.seed,
        npc_count: submitted.npc_count,
        safe_advance: safeAdvance,
        target_advance: submitted.target_advance,
      }),
    );
    const targetTimeline = results?.[0];
    if (targetTimeline != null) {
      setSelection({ safeAdvance, targetTimeline });
    }
  };

  return (
    <Flex vertical gap={16}>
      <Card>
        <RngToolForm<FormState, never>
          initialValues={initialValues}
          validationSchema={Validator}
          onSubmit={onSubmit}
          submitTrackerId="gen7_find_safe_advances"
          submitButtonLabel={t["Find Safe Advances"]}
          disableGenerate={loading}
          allowCancel
          cancelTrackerId="gen7_cancel_timeline_finder"
          onCancel={cancel}
        >
          <Fields />
        </RngToolForm>
      </Card>
      <SafeAdvancesCard
        safeAdvances={safeAdvances}
        selected={selection?.safeAdvance ?? null}
        disabled={loading}
        canShowMore={canShowMore}
        onSelect={onSelectSafeAdvance}
        onShowMore={onShowMore}
      />
      <NextAdvancesCard selection={selection} />
      <LeapCard
        target={submitted?.target_advance ?? null}
        selection={selection}
      />
      <TargetCard
        target={submitted?.target_advance ?? null}
        selection={selection}
      />
    </Flex>
  );
};
