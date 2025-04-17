import {
  Gen3TidSidResult,
  rngTools,
  Gen3TidSidVersionOptions,
  RngDate,
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
import { addRngTime, rngDate, rngTime, RngTime } from "~/utils/time";
import { denormalizeIdFilter, IdFilter } from "~/types/id";

const columns: ResultColumn<Gen3TidSidResult>[] = [
  { title: "Advance", dataIndex: "advance", key: "advance" },
  { title: "TID", dataIndex: "tid", key: "tid" },
  { title: "SID", dataIndex: "sid", key: "sid" },
  { title: "TSV", dataIndex: "tsv", key: "tsv" },
];

type Game = "rs" | "frlge" | "xdcolo";

export type FormState = {
  offset: number;
  initial_advances: number;
  max_advances: number;
  rs_input_type: "Dead Battery" | "DateTime" | "Seed";
  seed: number;
  date: RngDate;
  time: RngTime;
  tid: number;
  filter: IdFilter;
};

const initialValues: FormState = {
  offset: 0,
  initial_advances: 0,
  max_advances: 1000,
  rs_input_type: "Dead Battery",
  seed: 0,
  date: rngDate(),
  time: rngTime(),
  tid: 0,
  filter: {
    type: "tid",
    value0: 0,
    value1: undefined,
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
      label: "Offset",
      input: <FormikNumberInput<FormState> name="offset" numType="decimal" />,
    },
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
        filter: denormalizeIdFilter(opts.filter) ?? undefined,
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
      onSubmit={onSubmit}
      submitTrackerId="generate_gen3_tidsid"
    />
  );
};
