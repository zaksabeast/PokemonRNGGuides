import {
  Gen3TidSidResult,
  rngTools,
  Gen3TidSidVersionOptions,
} from "~/rngTools";
import {
  Field,
  FormikIdFilter,
  FormikNumberInput,
  FormikSelect,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import { match } from "ts-pattern";
import { FormikDatePicker, FormikTimePicker } from "~/components/datePicker";
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

const getFields = (game: Game) => {
  const dynamic = match(game)
    .with("rs", (): Field[] => [
      {
        label: "Input Type",
        input: (
          <FormikSelect<FormState, "rs_input_type">
            name="rs_input_type"
            options={(["Dead Battery", "DateTime", "Seed"] as const).map(
              (ty) => ({
                label: ty,
                value: ty,
              }),
            )}
          />
        ),
      },
      {
        label: "Date",
        input: <FormikDatePicker<FormState> name="date" />,
      },
      {
        label: "Time",
        input: <FormikTimePicker<FormState> name="time" />,
      },
      {
        label: "Seed",
        input: <FormikNumberInput<FormState> name="seed" numType="hex" />,
      },
    ])
    .with("frlge", (): Field[] => [
      {
        label: "TID",
        input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
      },
    ])
    .with("xdcolo", (): Field[] => [
      {
        label: "Seed",
        input: <FormikNumberInput<FormState> name="seed" numType="hex" />,
      },
    ])
    .exhaustive();

  return [
    {
      label: "Initial Advances",
      input: (
        <FormikNumberInput<FormState>
          name="initial_advances"
          numType="decimal"
        />
      ),
    },
    {
      label: "Max Advances",
      input: (
        <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
      ),
    },
    {
      label: "Offset",
      input: <FormikNumberInput<FormState> name="offset" numType="decimal" />,
    },
    ...dynamic,
    {
      label: "Filter",
      input: <FormikIdFilter<FormState> name="filter" optional />,
    },
  ];
};

type Props = {
  game?: Game;
};

export const Gen3TidSidGenerator = ({ game = "rs" }: Props) => {
  const [results, setResults] = React.useState<Gen3TidSidResult[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
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
    },
    [game],
  );

  const fields = React.useMemo(() => getFields(game), [game]);

  return (
    <RngToolForm<FormState, Gen3TidSidResult>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="generate_gen3_tidsid"
    />
  );
};
