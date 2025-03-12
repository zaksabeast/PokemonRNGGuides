import React from "react";
import {
  FormikInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikSelect,
} from "~/components";
import { generate_mirage_spots, MirageSpot, RngDate, Species } from "rng_tools";
import {
  DecimalString,
  fromDecimalString,
  fromHexString,
  HexString,
  toDecimalString,
  toHexString,
} from "~/utils/number";
import dayjs, { Dayjs } from "dayjs";
import { fromRngDate, toRngDate } from "~/utils/time";
import { FormikDatePicker } from "~/components/datePicker";

const columns: ResultColumn<MirageSpot>[] = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date: RngDate) => fromRngDate(date).toDate().toLocaleDateString(),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Pokemon",
    dataIndex: "pokemon",
    key: "pokemon",
    render: (pokemon: Species[]) => pokemon.join(", "),
  },
];

type FormState = {
  seed: HexString;
  tid: DecimalString;
  startDate: Dayjs;
  maxAdvances: DecimalString;
  filterSpecies: Species;
};

const initialValues: FormState = {
  seed: toHexString(0),
  tid: toDecimalString(0),
  startDate: dayjs(),
  maxAdvances: toDecimalString(1000),
  filterSpecies: "None",
};

const fields: Field[] = [
  {
    label: "Seed",
    input: <FormikInput<FormState> name="seed" />,
  },
  {
    label: "TID",
    input: <FormikInput<FormState> name="tid" />,
  },
  {
    label: "Save Date",
    input: <FormikDatePicker<FormState> name="startDate" />,
  },
  {
    label: "Species",
    input: (
      <FormikSelect<FormState, "filterSpecies">
        name="filterSpecies"
        options={[
          "None",
          "Audino",
          "Boldore",
          "Cherrim",
          "Cofagrigus",
          "Cresselia",
          "Darmanitan",
          "Ditto",
          "Donphan",
          "Elekid",
          "Excadrill",
          "Forretress",
          "Girafarig",
          "Glameow",
          "Graveler",
          "Happiny",
          "Klink",
          "Kricketune",
          "Larvesta",
          "Magby",
          "Maractus",
          "Minccino",
          "Munna",
          "Onix",
          "Persian",
          "Petilil",
          "Porygon",
          "Purugly",
          "Rufflet",
          "Slowpoke",
          "Stantler",
          "Sunkern",
          "Tangela",
          "Tynamo",
          "Unown",
          "Venomoth",
          "Vullaby",
          "Vulpix",
          "Xatu",
          "Zebstrika",
        ].map((species) => ({ label: species, value: species }))}
      />
    ),
  },
  {
    label: "Max Advances",
    input: <FormikInput<FormState> name="maxAdvances" disabled />,
  },
];

export const OrAsMirageSpot = () => {
  const [results, setResults] = React.useState<MirageSpot[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>((opts) => {
    const seed = fromHexString(opts.seed);
    const tid = fromDecimalString(opts.tid);
    const startDate = toRngDate(opts.startDate);
    const maxAdvances = fromDecimalString(opts.maxAdvances);

    if (
      seed == null ||
      tid == null ||
      startDate == null ||
      maxAdvances == null
    ) {
      return;
    }

    const results = generate_mirage_spots({
      seed,
      tid,
      start_date: startDate,
      max_advances: maxAdvances,
      filter_species:
        opts.filterSpecies === "None" ? undefined : opts.filterSpecies,
    });

    setResults(results);
  }, []);

  return (
    <RngToolForm<FormState, MirageSpot>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="generate_gen3_sid"
    />
  );
};
