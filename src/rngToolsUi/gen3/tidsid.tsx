import { Gen3TidSidResult, rngTools } from "~/rngTools";
import {
  Field,
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
import {
  FormikDatePicker,
  FormikTimePicker,
} from "~/components/datePicker.tsx";
import React from "react";
import {
  Gen3TidSidFilter,
  Gen3TidSidVersionOptions,
} from "../../../rng_tools/pkg";
import { toRngDateTime } from "~/utils/time.ts";

const columns: ResultColumn<Gen3TidSidResult>[] = [
  { title: "Advance", dataIndex: "advance", key: "advance" },
  { title: "TID", dataIndex: "tid", key: "tid" },
  { title: "SID", dataIndex: "sid", key: "sid" },
  { title: "TSV", dataIndex: "tsv", key: "tsv" },
];

type Game = "rs" | "frlge" | "xdcolo";

type FormState = {
  offset: DecimalString;
  initial_advances: DecimalString;
  max_advances: DecimalString;
  rs_input_type: "Dead Battery" | "DateTime" | "Seed";
  seed: DecimalString;
  date: Dayjs;
  time: Dayjs;
  tid: DecimalString;
  filter_val: DecimalString;
  filter_type: "None" | "TID" | "SID" | "TSV";
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
  filter_val: toDecimalString(0),
  filter_type: "None",
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
      label: "Filter By",
      input: (
        <FormikSelect<FormState, "filter_type">
          name="filter_type"
          options={(game !== "frlge"
            ? (["None", "TID", "SID", "TSV"] as const)
            : (["None", "SID", "TSV"] as const)
          ).map((ty) => ({
            label: ty,
            value: ty,
          }))}
        />
      ),
    },
    {
      label: "Filter Value",
      input: <FormikInput<FormState> name="filter_val" />,
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

      let filter: Gen3TidSidFilter = "None";
      if (opts.filter_type !== "None") {
        const filter_val = fromDecimalString(opts.filter_val);
        if (filter_val == null) {
          return;
        }
        filter = match(opts.filter_type)
          .with("TSV", () => ({ Tsv: filter_val }))
          .with("TID", () => ({ Tid: filter_val }))
          .with("SID", () => ({ Sid: filter_val }))
          .exhaustive();
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
        filter,
      });

      setResults(results);
    },
    [game],
  );

  return (
    <RngToolForm<FormState, Gen3TidSidResult>
      fields={getFields(game)}
      columns={columns}
      results={results}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="generate_gen3_tidsid"
    />
  );
};
