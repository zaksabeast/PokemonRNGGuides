import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikSelect,
} from "~/components";
import { rngTools, MirageSpot, Species, RngDate } from "~/rngTools";
import { formatRngDate, rngDate } from "~/utils/time";
import { FormikDatePicker } from "~/components/datePicker";

const columns: ResultColumn<MirageSpot>[] = [
  {
    title: "Date",
    dataIndex: "date",
    render: (date) => formatRngDate(date),
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Pokemon",
    dataIndex: "pokemon",
    render: (pokemon) => pokemon.join(", "),
  },
];

export type FormState = {
  seed: number;
  tid: number;
  start_date: RngDate;
  max_advances: number;
  filter_species: Species;
};

const initialValues: FormState = {
  seed: 0,
  tid: 0,
  start_date: rngDate(),
  max_advances: 1000,
  filter_species: "None",
};

const fields: Field[] = [
  {
    label: "Seed",
    input: <FormikNumberInput<FormState> name="seed" numType="hex" />,
  },
  {
    label: "TID",
    input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
  },
  {
    label: "Save Date",
    input: <FormikDatePicker<FormState> name="start_date" />,
  },
  {
    label: "Species",
    input: (
      <FormikSelect<FormState, "filter_species">
        name="filter_species"
        options={(
          [
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
          ] as const
        ).map((species) => ({ label: species, value: species }))}
      />
    ),
  },
  {
    label: "Max Advances",
    input: (
      <FormikNumberInput<FormState>
        name="max_advances"
        disabled
        numType="decimal"
      />
    ),
  },
];

export const OrAsMirageSpot = () => {
  const [results, setResults] = React.useState<MirageSpot[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const results = await rngTools.generate_mirage_spots({
      ...opts,
      filter_species:
        opts.filter_species === "None" ? undefined : opts.filter_species,
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
      submitTrackerId="generate_mirage_spot"
    />
  );
};
