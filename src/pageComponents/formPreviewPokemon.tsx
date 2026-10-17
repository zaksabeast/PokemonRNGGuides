import React from "react";
import { z } from "zod";
import { type Species } from "~/rngTools";
import {
  getPkmFilterInitialValues,
  pkmFilterSchema,
} from "~/components/pkmFilter";
import { NullableIvsSchema } from "~/components/ivInput";
import { nature } from "~/types/nature";
import { StatFieldsSchema, type MinMaxStats } from "~/types/stat";
import { toOptions } from "~/utils/options";
import {
  FormSection,
  NatureField,
  NullableIvFields,
  PkmFilter,
  SelectField,
  StatRadioFields,
  ToolForm,
} from "~/components/form";

const PokemonPreviewSchema = pkmFilterSchema
  .extend({
    parentIvs: NullableIvsSchema,
    nature: z.enum(nature),
  })
  .extend(StatFieldsSchema.shape);

type PokemonPreviewFormState = z.infer<typeof PokemonPreviewSchema>;

const initialValues: PokemonPreviewFormState = {
  ...getPkmFilterInitialValues(),
  parentIvs: { hp: 31, atk: null, def: 20, spa: 31, spd: null, spe: 14 },
  nature: "Adamant",
  hpStat: 0,
  atkStat: 0,
  defStat: 0,
  spaStat: 0,
  spdStat: 0,
  speStat: 0,
};

const exampleStats: MinMaxStats = {
  hp: { min: 19, max: 21 },
  atk: { min: 42, max: 58 },
  def: { min: 9, max: 11 },
  spa: { min: 10, max: 12 },
  spd: { min: 9, max: 12 },
  spe: { min: 12, max: 14 },
};

const speciesOptions = toOptions([
  "Pikachu",
  "Chikorita",
  "Turtwig",
  "Magnemite",
  "NidoranF",
] as const satisfies Species[]);

/** New Pokémon form components, shown on the experiments page for review */
export const PokemonFormPreview = () => {
  const [species, setSpecies] = React.useState<Species>("Pikachu");
  const [submitted, setSubmitted] = React.useState<string | null>(null);

  return (
    <>
      <SelectField
        label="Species (changes ability and gender options)"
        value={species}
        options={speciesOptions}
        onChange={setSpecies}
      />
      <ToolForm<PokemonPreviewFormState, never>
        initialValues={initialValues}
        validationSchema={PokemonPreviewSchema}
        submitTrackerId="form_preview_pokemon_generate"
        onSubmit={async (values) => {
          setSubmitted(JSON.stringify(values, null, 2));
        }}
      >
        <FormSection title="Filters">
          <PkmFilter<PokemonPreviewFormState>
            generation={8}
            species={species}
          />
        </FormSection>
        <FormSection title="Parent">
          <NullableIvFields<PokemonPreviewFormState>
            name="parentIvs"
            title="Parent 1 IVs"
          />
          <NatureField<PokemonPreviewFormState> name="nature" />
        </FormSection>
        <FormSection title="Caught stats">
          <StatRadioFields<PokemonPreviewFormState>
            minMaxStats={exampleStats}
          />
        </FormSection>
      </ToolForm>
      {submitted != null && <pre>{submitted}</pre>}
    </>
  );
};
