import React from "react";
import { Color } from "@emotion/react";
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
  borderColor?: Color;
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
// Fits the target values, so the warning doesn't change the card's height.
const TARGET_CONTENT_MIN_HEIGHT = 78;
const PLACEHOLDER = "-";

type SafeAdvancesCardProps = {
  safeAdvances: number[] | null;
  selected: number | null;
  disabled: boolean;
  onSelect: (safeAdvance: number) => void;
  onShowMore: () => void;
};

const SafeAdvancesCard = ({
  safeAdvances,
  selected,
  disabled,
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
            disabled={!hasResults || disabled}
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

type TargetValuesProps = {
  target: number | null;
  stepsToTarget: number | null;
};

const TargetValues = ({ target, stepsToTarget }: TargetValuesProps) => {
  const t = useActiveRouteTranslations();
  // Each step is 2/60 of a second, the same as 3DSRNGTool's timeline.
  const time =
    stepsToTarget == null
      ? PLACEHOLDER
      : `~${((stepsToTarget * 2) / 60).toFixed(1)} s`;

  return (
    <Flex gap={32} wrap align="flex-end">
      <Flex vertical>
        <Typography.Text color="Success">{t["Press A at"]}</Typography.Text>
        <Typography.Text fontSize={36} strong>
          {target ?? PLACEHOLDER}
        </Typography.Text>
      </Flex>
      <Flex vertical>
        <Typography.Text color="TextSecondary">{t["Time"]}</Typography.Text>
        <Typography.Text fontSize={24}>{time}</Typography.Text>
      </Flex>
    </Flex>
  );
};

type TargetCardProps = {
  target: number | null;
  selection: Selection | null;
};

const TargetCard = ({ target, selection }: TargetCardProps) => {
  const t = useActiveRouteTranslations();
  const stepsToTarget = selection?.targetTimeline.steps_to_target;
  const notOnTimeline =
    selection != null && target != null && stepsToTarget == null;

  const borderColor = (() => {
    if (selection == null) {
      return undefined;
    }
    return notOnTimeline ? "Warning" : "Success";
  })();

  return (
    <SectionCard title={t["Target Advance"]} borderColor={borderColor}>
      <Flex vertical justify="center" minHeight={TARGET_CONTENT_MIN_HEIGHT}>
        {notOnTimeline ? (
          <Alert
            type="warning"
            title={t[
              "{target} isn't on this timeline. Pick another target in 3DSRNGTool."
            ].replace("{target}", target.toString())}
          />
        ) : (
          <TargetValues
            target={selection == null ? null : target}
            stepsToTarget={stepsToTarget ?? null}
          />
        )}
      </Flex>
    </SectionCard>
  );
};

export const Gen7TimelineFinder = () => {
  const t = useActiveRouteTranslations();
  const [submitted, setSubmitted] = React.useState<FormState | null>(null);
  const [safeAdvances, setSafeAdvances] = React.useState<number[] | null>(null);
  const [selection, setSelection] = React.useState<Selection | null>(null);
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
    if (more != null) {
      setSafeAdvances([...(safeAdvances ?? []), ...more]);
    }
  };

  const onSelectSafeAdvance = async (safeAdvance: number) => {
    if (submitted == null) {
      return;
    }
    setSelection(null);
    const results = await waitFor(
      multiWorkerRngTools.gen7_is_target_timeline({
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
        onSelect={onSelectSafeAdvance}
        onShowMore={onShowMore}
      />
      <NextAdvancesCard selection={selection} />
      <TargetCard
        target={submitted?.target_advance ?? null}
        selection={selection}
      />
    </Flex>
  );
};
