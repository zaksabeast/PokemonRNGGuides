import React from "react";
import { ResultColumn } from "~/components";
import {
  FormDateField,
  FormNumberField,
  FormSection,
  FormSelectField,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { rngTools, MirageSpot } from "~/rngTools";
import { formatRngDate, rngDate, RngDateSchema } from "~/utils/time";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { z } from "zod";
import { HexSchema } from "~/utils/number";
import { species } from "~/types/species";
import { Translations } from "~/translations";

const getColumns = (t: Translations): ResultColumn<MirageSpot>[] => [
  {
    title: t["Date"],
    dataIndex: "date",
    render: (date) => formatRngDate(date),
  },
  {
    title: t["Name"],
    dataIndex: "name",
  },
  {
    title: t["Pokemon"],
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

const mirageSpotSpecies = [
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
] as const;

const Fields = () => {
  const t = useActiveRouteTranslations();

  return (
    <>
      <FormSection title={t["Your game"]}>
        <FormNumberField<FormState>
          name="seed"
          label={t["Seed"]}
          numType="hex"
        />
        <FormNumberField<FormState>
          name="tid"
          label={t["TID"]}
          numType="decimal"
        />
        <FormDateField<FormState> name="start_date" label={t["Save Date"]} />
      </FormSection>

      <FormSection title={t["Search"]}>
        <FormNumberField<FormState>
          name="max_advances"
          label={t["Max Advances"]}
          numType="decimal"
          disabled
        />
      </FormSection>

      <FormSection title={t["Filters"]}>
        <FormSelectField<FormState>
          name="filter_species"
          label={t["Species"]}
          options={[
            { label: t["None"], value: null },
            ...mirageSpotSpecies.map((species) => ({
              label: species,
              value: species,
            })),
          ]}
        />
      </FormSection>
    </>
  );
};

export const OrAsMirageSpot = () => {
  const [results, setResults] = React.useState<MirageSpot[]>([]);

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    const results = await rngTools.generate_mirage_spots(opts);
    setResults(results);
  };

  return (
    <ToolForm<FormState, MirageSpot>
      getColumns={getColumns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="generate_mirage_spot"
    >
      <Fields />
    </ToolForm>
  );
};
