import React from "react";
import { z } from "zod";
import { uniqueId } from "lodash-es";
import { useAtom } from "jotai";
import { Button, ResultColumn } from "~/components";
import {
  FieldRow,
  FormNumberField,
  FormSection,
  PkmFilter,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import {
  Gen7Starter,
  Gen7UsumStarterSearchOpts,
  multiWorkerRngTools,
} from "~/rngTools";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
  pkmFilterSchema,
} from "~/components/pkmFilter";
import {
  FlattenIvs,
  flattenIvs,
  getIvColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { HexSchema } from "~/utils/number";
import { formatHex } from "~/utils/formatHex";
import { chunkRange } from "~/utils/chunkRange";
import { RustOption } from "~/types/utils";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import { useCurrentStep } from "~/components/stepper/state";
import { Translations } from "~/translations";
import { gen7StarterTargetAtom } from "./starterState";

const MAX_RESULTS = 10_000;
const TARGET_ADVANCES_PER_CHUNK = 3_000;

const Validator = z
  .object({
    seed: HexSchema(0xffffffff),
    tsv: z.number().int().min(0).max(4095),
    current_advance: z.number().int().min(0),
    max_advances: z.number().int().min(0),
  })
  .extend(pkmFilterSchema.shape);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  seed: 0,
  tsv: 0,
  current_advance: 478,
  max_advances: 10000,
  ...getPkmFilterInitialValues(),
};

type Result = FlattenIvs<Gen7Starter> & {
  key: string;
  starter: Gen7Starter;
};

const mapResult = (starter: Gen7Starter): Result => ({
  ...flattenIvs(starter),
  key: uniqueId(),
  starter,
});

const getColumns = (
  t: Translations,
  selectedStarter: Gen7Starter | null,
  onSelect: (result: Result) => void,
): ResultColumn<Result>[] => [
  {
    title: t["Select"],
    dataIndex: "key",
    disableVerticalPadding: true,
    render: (_, result) => (
      <Button
        trackerId="gen7_select_usum_starter"
        type={result.starter === selectedStarter ? "primary" : "default"}
        onClick={() => onSelect(result)}
      >
        {t["Select"]}
      </Button>
    ),
  },
  { title: t["Target Advance"], dataIndex: "advance" },
  {
    title: t["Shiny"],
    dataIndex: "shiny",
    render: (shiny: boolean) => (shiny ? t["Yes"] : t["No"]),
  },
  { title: t["Nature"], dataIndex: "nature" },
  { title: t["Gender"], dataIndex: "gender" },
  ...getIvColumns(t),
  { title: t["PSV"], dataIndex: "psv" },
  {
    title: t["PID"],
    dataIndex: "pid",
    monospace: true,
    render: (pid: number) => formatHex(pid),
  },
  {
    title: t["EC"],
    dataIndex: "ec",
    monospace: true,
    render: (ec: number) => formatHex(ec),
  },
];

const Fields = () => {
  const t = useActiveRouteTranslations();

  return (
    <>
      <FormSection title={t["Your game"]}>
        <FieldRow>
          <FormNumberField<FormState>
            name="seed"
            label={t["Seed"]}
            numType="hex"
          />
          <FormNumberField<FormState>
            name="tsv"
            label={t["TSV"]}
            numType="decimal"
          />
        </FieldRow>
      </FormSection>

      <FormSection title={t["Search"]}>
        <FieldRow>
          <FormNumberField<FormState>
            name="current_advance"
            label={t["Current Advance"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="max_advances"
            label={t["Max Advances"]}
            numType="decimal"
          />
        </FieldRow>
      </FormSection>

      <FormSection title={t["Filters"]}>
        <PkmFilter<FormState> species="Rowlet" displayAbility={false} />
      </FormSection>
    </>
  );
};

export const Gen7StarterSearch = () => {
  const t = useActiveRouteTranslations();
  const [target, setTarget] = useAtom(gen7StarterTargetAtom);
  const [, setCurrentStep] = useCurrentStep();
  const [submitted, setSubmitted] = React.useState<FormState | null>(null);
  const {
    run: searchStarters,
    data: results,
    progressPercent,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.gen7_search_usum_starters, {
    map: mapResult,
    sortBy: [
      (result) => result.advance,
      (result) => result.starter.delay_advances,
    ],
    limit: MAX_RESULTS,
  });

  const onSelect = (result: Result) => {
    if (submitted == null) {
      return;
    }
    setTarget({
      seed: submitted.seed,
      tsv: submitted.tsv,
      currentAdvance: submitted.current_advance,
      starter: result.starter,
    });
    setCurrentStep((step) => step + 1);
  };

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    setSubmitted(opts);
    setTarget(null);
    const chunks = chunkRange(
      [opts.current_advance, opts.current_advance + opts.max_advances],
      TARGET_ADVANCES_PER_CHUNK,
    );
    await searchStarters(
      chunks.map(
        ([
          first_target_advance,
          last_target_advance,
        ]): RustOption<Gen7UsumStarterSearchOpts> => ({
          seed: opts.seed,
          tsv: opts.tsv,
          current_advance: opts.current_advance,
          first_target_advance,
          last_target_advance,
          filter: pkmFilterFieldsToRustInput(opts),
        }),
      ),
    );
  };

  return (
    <ToolForm<FormState, Result>
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      columns={getColumns(t, target?.starter ?? null, onSelect)}
      results={results}
      rowKey="key"
      submitTrackerId="gen7_search_usum_starters"
      allowCancel
      cancelTrackerId="gen7_cancel_search_usum_starters"
      onCancel={cancel}
      progressPercent={progressPercent}
    >
      <Fields />
    </ToolForm>
  );
};
