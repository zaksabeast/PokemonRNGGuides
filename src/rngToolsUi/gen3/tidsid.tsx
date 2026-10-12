import {
  Gen3TidSidResult,
  rngTools,
  Gen3TidSidVersionOptions,
} from "~/rngTools";
import { ResultColumn } from "~/components";
import {
  FieldRow,
  FormDateField,
  FormNumberField,
  FormRadioField,
  FormSection,
  FormTimeField,
  IdFilterField,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { toOptions } from "~/utils/options";
import { match } from "ts-pattern";
import React from "react";
import {
  addRngTime,
  rngDate,
  RngDateSchema,
  rngTime,
  RngTimeSchema,
} from "~/utils/time";
import { denormalizeIdFilter, IdFilterSchema } from "~/types/id";
import { z } from "zod";
import { HexSchema } from "~/utils/number";

const columns: ResultColumn<Gen3TidSidResult>[] = [
  { title: "Advance", dataIndex: "advance" },
  { title: "TID", dataIndex: "tid" },
  { title: "SID", dataIndex: "sid" },
  { title: "TSV", dataIndex: "tsv" },
];

type Game = "rs" | "frlge" | "xdcolo";

const Validator = z.object({
  offset: z.number().int().min(0),
  initial_advances: z.number().int().min(0),
  max_advances: z.number().int().min(0),
  rs_input_type: z.enum(["Dead Battery", "DateTime", "Seed"]),
  seed: HexSchema(0xffffffff),
  date: RngDateSchema,
  time: RngTimeSchema,
  tid: z.number().int().min(0).max(65535),
  filter: IdFilterSchema,
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  initial_advances: 0,
  max_advances: 1000,
  offset: 0,
  rs_input_type: "Dead Battery",
  seed: 0,
  date: rngDate(),
  time: rngTime(),
  tid: 0,
  filter: {
    type: "tid",
    value0: 0,
    value1: null,
  },
};

const rsInputTypes = ["Dead Battery", "DateTime", "Seed"] as const;

type FieldsProps = {
  game: Game;
};

const Fields = ({ game }: FieldsProps) => {
  const t = useActiveRouteTranslations();

  const seedField = (
    <FormNumberField<FormState> name="seed" label={t["Seed"]} numType="hex" />
  );

  const gameFields = match(game)
    .with("rs", () => (
      <>
        <FormRadioField<FormState>
          name="rs_input_type"
          label="Input Type"
          cellSize="word"
          options={toOptions(rsInputTypes)}
        />
        <FieldRow>
          <FormDateField<FormState> name="date" label={t["Date"]} />
          <FormTimeField<FormState> name="time" label={t["Time"]} />
        </FieldRow>
        {seedField}
      </>
    ))
    .with("frlge", () => (
      <FormNumberField<FormState>
        name="tid"
        label={t["TID"]}
        numType="decimal"
      />
    ))
    .with("xdcolo", () => seedField)
    .exhaustive();

  return (
    <>
      <FormSection title={t["Your game"]}>{gameFields}</FormSection>

      <FormSection title={t["Search"]}>
        <FieldRow>
          <FormNumberField<FormState>
            name="initial_advances"
            label={t["Initial Advances"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="max_advances"
            label={t["Max Advances"]}
            numType="decimal"
          />
        </FieldRow>
        <FormNumberField<FormState>
          name="offset"
          label={t["Offset"]}
          numType="decimal"
        />
      </FormSection>

      <FormSection title={t["Filters"]}>
        <IdFilterField<FormState> name="filter" optional />
      </FormSection>
    </>
  );
};

type Props = {
  game?: Game;
};

export const Gen3TidSidGenerator = ({ game = "rs" }: Props) => {
  const [results, setResults] = React.useState<Gen3TidSidResult[]>([]);

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    const versionOpts: Gen3TidSidVersionOptions = match(game)
      .with("rs", () => ({
        Rs: match(opts.rs_input_type)
          .with("Dead Battery", (): "DeadBattery" => "DeadBattery")
          .with("DateTime", () => {
            return {
              DateTime: addRngTime(opts.date, opts.time),
            };
          })
          .with("Seed", () => ({
            Seed: opts.seed,
          }))
          .exhaustive(),
      }))
      .with("frlge", () => ({
        Frlge: {
          tid: opts.tid,
        },
      }))
      .with("xdcolo", () => ({
        XdColo: {
          seed: opts.seed,
        },
      }))
      .exhaustive();

    const results = await rngTools.gen3_tidsid_states({
      offset: opts.offset,
      initial_advances: opts.initial_advances,
      max_advances: opts.max_advances,
      version_options: versionOpts,
      filter: denormalizeIdFilter(opts.filter),
    });

    setResults(results);
  };

  return (
    <ToolForm<FormState, Gen3TidSidResult>
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="generate_gen3_tidsid"
    >
      <Fields game={game} />
    </ToolForm>
  );
};
