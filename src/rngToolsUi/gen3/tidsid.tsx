import {
  Gen3TidSidResult,
  rngTools,
  Gen3TidSidVersionOptions,
} from "~/rngTools";
import {
  Field,
  FormikIdFilter,
  FormikInput,
  FormikSelect,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import {
  DecimalString,
  fromDecimalString,
  toDecimalString,
} from "~/utils/number";
import dayjs, { Dayjs } from "dayjs";
import { match } from "ts-pattern";
import { FormikDatePicker, FormikTimePicker } from "~/components/datePicker";
import React from "react";
import { toRngDateTime } from "~/utils/time";
import { denormalizeIdFilter, IdFilter } from "~/types/id";

const columns: ResultColumn<Gen3TidSidResult>[] = [
  { title: "Advance", dataIndex: "advance", key: "advance" },
  { title: "TID", dataIndex: "tid", key: "tid" },
  { title: "SID", dataIndex: "sid", key: "sid" },
  { title: "TSV", dataIndex: "tsv", key: "tsv" },
];

type Game = "rs" | "frlge" | "xdcolo";

export type FormState = {
  offset: DecimalString;
  initial_advances: DecimalString;
  max_advances: DecimalString;
  rs_input_type: "Dead Battery" | "DateTime" | "Seed";
  seed: DecimalString;
  date: Dayjs;
  time: Dayjs;
  tid: DecimalString;
  filter: IdFilter;
};

const initialValues: FormState = {
  offset: toDecimalString(0),
  initial_advances: toDecimalString(0),
  max_advances: toDecimalString(1000),
  rs_input_type: "Dead Battery",
  seed: toDecimalString(0),
  date: dayjs(),
  time: dayjs(),
  tid: toDecimalString(0),
  filter: {
    type: "tid",
    value0: toDecimalString(0),
    value1: "",
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
        input: <FormikInput<FormState> name="seed" />,
      },
    ])
    .with("frlge", (): Field[] => [
      {
        label: "TID",
        input: <FormikInput<FormState> name="tid" />,
      },
    ])
    .with("xdcolo", (): Field[] => [
      {
        label: "Seed",
        input: <FormikInput<FormState> name="seed" />,
      },
    ])
    .exhaustive();

  return [
    {
      label: "Offset",
      input: <FormikInput<FormState> name="offset" />,
    },
    {
      label: "Initial Advances",
      input: <FormikInput<FormState> name="initial_advances" />,
    },
    {
      label: "Max Advances",
      input: <FormikInput<FormState> name="max_advances" />,
    },
    ...dynamic,
    {
      label: "Filter",
      input: <FormikIdFilter<FormState> name="filter" optional={true} />,
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
      const offset = fromDecimalString(opts.offset);
      const initialAdvances = fromDecimalString(opts.initial_advances);
      const maxAdvances = fromDecimalString(opts.max_advances);

      if (offset == null || initialAdvances == null || maxAdvances == null) {
        return;
      }

      const versionOpts: Gen3TidSidVersionOptions = match(game)
        .with("rs", () => ({
          Rs: match(opts.rs_input_type)
            .with("Dead Battery", (): "DeadBattery" => "DeadBattery")
            .with("DateTime", () => {
              const dateTime = dayjs(opts.date)
                .set("hour", opts.time.hour())
                .set("minute", opts.time.minute())
                .set("second", opts.time.second());
              return {
                DateTime: toRngDateTime(dateTime),
              };
            })
            .with("Seed", () => ({
              Seed: fromDecimalString(opts.seed) ?? 0,
            }))
            .exhaustive(),
        }))
        .with("frlge", () => ({
          Frlge: {
            tid: fromDecimalString(opts.tid) ?? 0,
          },
        }))
        .with("xdcolo", () => ({
          XdColo: {
            seed: fromDecimalString(opts.seed) ?? 0,
          },
        }))
        .exhaustive();

      const results = await rngTools.gen3_tidsid_states({
        offset,
        initial_advances: initialAdvances,
        max_advances: maxAdvances,
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
