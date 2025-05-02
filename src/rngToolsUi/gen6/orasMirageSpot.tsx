import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikSelect,
} from "~/components";
import { rngTools, MirageSpot } from "~/rngTools";
import { formatRngDate, rngDate, RngDateSchema } from "~/utils/time";
import { FormikDatePicker } from "~/components/datePicker";
import { z } from "zod";
import { HexSchema } from "~/utils/number";
import { species } from "~/types/species";

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

const Validator = z.object({
  seed: HexSchema(0xffffffff),
  tid: z.number().int().min(0).max(65535),
  start_date: RngDateSchema,
  max_advances: z.number().int().min(0),
  filter_species: z.enum(species).nullable(),
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  seed: 0,
  tid: 0,
  start_date: rngDate(),
  max_advances: 1000,
  filter_species: null,
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
            null,
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
        ).map((species) => ({ label: species ?? "None", value: species }))}
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
    const results = await rngTools.generate_mirage_spots(opts);

    setResults(results);
  }, []);

  return (
    <RngToolForm<FormState, MirageSpot>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="generate_mirage_spot"
    />
  );
};
