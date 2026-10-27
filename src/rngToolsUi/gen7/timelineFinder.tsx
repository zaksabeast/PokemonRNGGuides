import React from "react";
import { match } from "ts-pattern";
import { z } from "zod";
import {
  Alert,
  Card,
  Field,
  Flex,
  FormFieldTable,
  FormikNumberInput,
  Grid,
  RngToolForm,
  RngToolSubmit,
  SectionCard,
} from "~/components";
import {
  multiWorkerRngTools,
  Gen7TargetTimeline,
  Gen7TimelineLeap,
} from "~/rngTools";
import { HexSchema } from "~/utils/number";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useCancellablePromise } from "~/hooks/useCancellablePromise";
import {
  NextAdvancesCard,
  PressTiming,
  SafeAdvancesCard,
  PRESS_TIMING_MIN_HEIGHT,
} from "./sectionCards";
import { useSafeAdvances } from "./useSafeAdvances";
import { Color } from "@emotion/react";

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

type Selection = {
  safeAdvance: number;
  targetTimeline: Gen7TargetTimeline;
};

type ResultCardProps = {
  target: number | null;
  selection: Selection | null;
};

type LeapCardContentProps = {
  target: number | null;
  leap: Gen7TimelineLeap | null;
  unreachable: boolean;
};

const LeapCardContent = ({
  target,
  leap,
  unreachable,
}: LeapCardContentProps) => {
  const t = useActiveRouteTranslations();

  if (unreachable && target != null) {
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
    <PressTiming
      label={t["Press A at"]}
      labelColor="Primary"
      advance={leap?.leap_advance ?? null}
      waitLabel={t["Time"]}
      waitSteps={leap?.steps_to_leap ?? null}
    />
  );
};

const LeapCard = ({ target, selection }: ResultCardProps) => {
  const t = useActiveRouteTranslations();
  const targetTimeline = selection?.targetTimeline ?? null;
  const leap = targetTimeline?.leap ?? null;
  // The guide always starts the dialogue, so the target needs a leap even
  // when it's on the timeline.
  const unreachable = targetTimeline != null && target != null && leap == null;

  const borderColor: Color | undefined = match({ unreachable, leap })
    .with({ unreachable: true }, () => "Warning" as const)
    .with({ leap: null }, () => undefined)
    .otherwise(() => "Primary" as const);

  return (
    <SectionCard title={t["Timeline Leap"]} borderColor={borderColor}>
      <Flex vertical justify="center" minHeight={PRESS_TIMING_MIN_HEIGHT}>
        <LeapCardContent
          target={target}
          leap={leap}
          unreachable={unreachable}
        />
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
      <Flex vertical justify="center" minHeight={PRESS_TIMING_MIN_HEIGHT}>
        <PressTiming
          label={t["Press A at"]}
          labelColor="Success"
          advance={leap == null ? null : target}
          waitLabel={t["Time after leap"]}
          waitSteps={leap?.steps_from_leap_to_target ?? null}
        />
      </Flex>
    </SectionCard>
  );
};

const fetchSafeAdvances = (
  opts: FormState,
  fromAdvance: number,
  count: number,
) =>
  multiWorkerRngTools.gen7_next_safe_advances({
    npc_count: opts.npc_count,
    scene: {
      seed: opts.seed,
      current_advance: opts.current_advance,
      from_advance: fromAdvance,
      safe_advance_count: count,
    },
  });

export const Gen7TimelineFinder = () => {
  const t = useActiveRouteTranslations();
  const [submitted, setSubmitted] = React.useState<FormState | null>(null);
  const [selection, setSelection] = React.useState<Selection | null>(null);
  const { loading, waitFor, cancel } = useCancellablePromise();
  const { safeAdvances, canShowMore, findSafeAdvances, showMore } =
    useSafeAdvances(fetchSafeAdvances, waitFor);

  const onSubmit: RngToolSubmit<FormState> = async (opts) => {
    setSubmitted(opts);
    setSelection(null);
    await findSafeAdvances(opts, opts.current_advance);
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
        onShowMore={showMore}
      />
      <NextAdvancesCard
        safeAdvance={selection?.safeAdvance ?? null}
        nextAdvances={selection?.targetTimeline.next_advances ?? null}
      />
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
