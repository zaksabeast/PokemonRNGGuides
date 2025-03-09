import React from "react";
import {
  Flex,
  Button,
  Input,
  Form,
  ResultTable,
  FormFieldTable,
  FormikSelect,
  Field,
  FormikSwitch,
} from "~/components";
import { TableProps } from "antd";
import {
  emerald_egg_held_states,
  Gen3HeldEgg,
  Nature,
  Compatability,
  Species,
  Gender,
} from "rng_tools";
import { Formik, useFormikContext } from "formik";
import {
  DecimalString,
  fromDecimalString,
  toDecimalString,
} from "~/utils/number";
import { species } from "~/types/species";
import { nature } from "~/types/nature";
import { gender } from "~/types/gender";

const columns: TableProps<unknown>["columns"] = [
  { title: "Advance", dataIndex: "advance", key: "advance" },
  { title: "Redraws", dataIndex: "redraws", key: "redraws" },
  {
    title: "Pid",
    dataIndex: "pid",
    key: "pid",
    render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
  },
  { title: "Gender", dataIndex: "gender", key: "gender" },
  {
    title: "Shiny",
    dataIndex: "shiny",
    key: "shiny",
    render: (shiny) => (shiny ? "Yes" : "No"),
  },
  { title: "Nature", dataIndex: "nature", key: "nature" },
  { title: "Ability", dataIndex: "ability", key: "ability" },
];

type FormState = {
  delay: DecimalString;
  initial_advances: DecimalString;
  max_advances: DecimalString;
  female_has_everstone: boolean;
  female_nature: Nature;
  calibration: DecimalString;
  min_redraw: DecimalString;
  max_redraw: DecimalString;
  compatability: Compatability;
  tid: DecimalString;
  sid: DecimalString;
  egg_species: Species;
  filter_shiny: boolean;
  filter_nature: Nature | "None";
  filter_gender: Gender | "None";
};

const initialState: FormState = {
  delay: toDecimalString(0),
  initial_advances: toDecimalString(1000),
  max_advances: toDecimalString(100),
  female_has_everstone: false,
  female_nature: "Adamant",
  calibration: toDecimalString(18),
  min_redraw: toDecimalString(0),
  max_redraw: toDecimalString(5),
  compatability: "GetAlong",
  tid: toDecimalString(0),
  sid: toDecimalString(0),
  egg_species: "Bulbasaur",
  filter_shiny: false,
  filter_nature: "None",
  filter_gender: "None",
};

const OptionsForm = () => {
  const formik = useFormikContext<FormState>();
  const fields: Field[] = [
    {
      label: "Initial advances",
      input: (
        <Input
          name="initial_advances"
          placeholder={initialState.initial_advances}
          onChange={formik.handleChange}
        />
      ),
    },
    {
      label: "Max advances",
      input: (
        <Input
          name="max_advances"
          placeholder={initialState.max_advances}
          onChange={formik.handleChange}
        />
      ),
    },
    {
      label: "Delay",
      input: (
        <Input
          name="delay"
          placeholder={initialState.delay}
          onChange={formik.handleChange}
        />
      ),
    },
    {
      label: "Female has everstone",
      input: (
        <FormikSwitch<
          FormState,
          "female_has_everstone"
        > name="female_has_everstone" />
      ),
    },
    {
      label: "Female nature",
      input: (
        <FormikSelect<FormState, "female_nature">
          name="female_nature"
          options={nature.map((nat) => ({ label: nat, value: nat }))}
        />
      ),
    },
    {
      label: "Calibration",
      input: (
        <Input
          name="calibration"
          placeholder={initialState.calibration}
          onChange={formik.handleChange}
        />
      ),
    },
    {
      label: "Min redraw",
      input: (
        <Input
          name="min_redraw"
          placeholder={initialState.min_redraw}
          onChange={formik.handleChange}
        />
      ),
    },
    {
      label: "Max redraw",
      input: (
        <Input
          name="max_redraw"
          placeholder={initialState.max_redraw}
          onChange={formik.handleChange}
        />
      ),
    },
    {
      label: "Compatability",
      input: (
        <FormikSelect<FormState, "compatability">
          name="compatability"
          options={[
            {
              label: "The two seem to get along",
              value: "GetAlong",
            },
            {
              label: "The two seem to get along very well",
              value: "GetAlongVeryWell",
            },
            {
              label: "The two don't seem to like each other",
              value: "DontLikeEachOther",
            },
          ]}
        />
      ),
    },
    {
      label: "TID",
      input: (
        <Input name="tid" placeholder="100" onChange={formik.handleChange} />
      ),
    },
    {
      label: "SID",
      input: (
        <Input name="sid" placeholder="100" onChange={formik.handleChange} />
      ),
    },
    {
      label: "Egg species",
      input: (
        <FormikSelect<FormState, "egg_species">
          name="egg_species"
          options={species.map((spec) => ({ label: spec, value: spec }))}
        />
      ),
    },
    {
      label: "Filter shiny",
      input: <FormikSwitch<FormState, "filter_shiny"> name="filter_shiny" />,
    },
    {
      label: "Filter nature",
      input: (
        <FormikSelect<FormState, "filter_nature">
          name="filter_nature"
          options={["None", ...nature].map((nat) => ({
            label: nat,
            value: nat,
          }))}
        />
      ),
    },
    {
      label: "Filter gender",
      input: (
        <FormikSelect<FormState, "filter_gender">
          name="filter_gender"
          options={["None", ...gender].map((gen) => ({
            label: gen,
            value: gen,
          }))}
        />
      ),
    },
  ];

  return (
    <Form>
      <Flex vertical gap={8}>
        <FormFieldTable fields={fields} />
        <Button trackerId="generate_emerald_held_egg" htmlType="submit">
          Generate
        </Button>
      </Flex>
    </Form>
  );
};

type Props = {
  lua?: boolean;
};

export const EmeraldHeldEgg = ({ lua = false }: Props) => {
  const [results, setResults] = React.useState<Gen3HeldEgg[]>([]);

  return (
    <Flex vertical gap={16}>
      <Formik
        initialValues={initialState}
        onSubmit={(opts) => {
          const initialAdvances = fromDecimalString(opts.initial_advances);
          const maxAdvances = fromDecimalString(opts.max_advances);
          const calibration = fromDecimalString(opts.calibration);
          const minRedraw = fromDecimalString(opts.min_redraw);
          const maxRedraw = fromDecimalString(opts.max_redraw);
          const tid = fromDecimalString(opts.tid);
          const sid = fromDecimalString(opts.sid);
          const delay = fromDecimalString(opts.delay);

          if (
            initialAdvances == null ||
            maxAdvances == null ||
            calibration == null ||
            minRedraw == null ||
            maxRedraw == null ||
            tid == null ||
            sid == null ||
            delay == null
          ) {
            return;
          }

          const results = emerald_egg_held_states({
            ...opts,
            initial_advances: initialAdvances,
            max_advances: maxAdvances,
            calibration: calibration,
            min_redraw: minRedraw,
            max_redraw: maxRedraw,
            tid,
            sid,
            delay,
            lua_adjustment: lua,
            filters: {
              shiny: opts.filter_shiny,
              nature:
                opts.filter_nature === "None" ? undefined : opts.filter_nature,
              gender:
                opts.filter_gender === "None" ? undefined : opts.filter_gender,
            },
          });

          setResults(results);
        }}
      >
        <OptionsForm />
      </Formik>
      <ResultTable columns={columns} dataSource={results} />
    </Flex>
  );
};
