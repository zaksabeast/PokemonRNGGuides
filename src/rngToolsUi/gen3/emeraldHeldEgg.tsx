import { ShinyIcon } from "~/components/shiny";
import {
  shinyFilterSchema,
  shinyFilterOptions,
  shinyFilterGen3To7Tooltip,
} from "~/rngTools/shiny";
import React from "react";
import { ResultColumn } from "~/components";
import {
  FieldRow,
  FormNumberField,
  FormSection,
  FormSelectField,
  GenderFilterField,
  NatureFilterField,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { rngTools, Gen3HeldEgg } from "~/rngTools";
import { getGen3SpeciesOptions, species } from "~/types/species";
import { nature } from "~/types/nature";
import { gender } from "~/types/gender";
import { z } from "zod";
import { Translations } from "~/translations";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";

const getColumns = (t: Translations): ResultColumn<Gen3HeldEgg>[] => {
  return [
    { title: t["Advance"], dataIndex: "advance" },
    { title: t["Redraws"], dataIndex: "redraws" },
    {
      title: t["PID"],
      dataIndex: "pid",
      monospace: true,
      render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
    },
    { title: t["Gender"], dataIndex: "gender" },
    {
      title: t["Shiny"],
      dataIndex: "shiny",
      render: (shiny) => <ShinyIcon shiny={shiny} translations={t} />,
    },
    { title: t["Nature"], dataIndex: "nature" },
    { title: t["Ability"], dataIndex: "ability" },
  ];
};

const Validator = z.object({
  delay: z.number().int(),
  initial_advances: z.number().int().min(0),
  max_advances: z.number().int().min(0),
  calibration: z.number().int().min(0),
  min_redraw: z.number().int().min(0),
  max_redraw: z.number().int().min(0),
  compatability: z.enum(["DontLikeEachOther", "GetAlong", "GetAlongVeryWell"]),
  tid: z.number().int().min(0).max(65535),
  sid: z.number().int().min(0).max(65535),
  egg_species: z.enum(species),
  filter_shiny: shinyFilterSchema,
  filter_nature: z.array(z.enum(nature)),
  filter_gender: z.enum(gender).nullable(),
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  delay: 0,
  initial_advances: 100,
  max_advances: 1000,
  calibration: 18,
  min_redraw: 0,
  max_redraw: 5,
  compatability: "GetAlong",
  tid: 0,
  sid: 0,
  egg_species: "Bulbasaur",
  filter_shiny: "Any",
  filter_nature: [],
  filter_gender: null,
};

const Fields = () => {
  const t = useActiveRouteTranslations();

  return (
    <>
      <FormSection title={t["Your game"]}>
        <FieldRow>
          <FormNumberField<FormState>
            name="tid"
            label={t["TID"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="sid"
            label={t["SID"]}
            numType="decimal"
          />
        </FieldRow>
        <FormSelectField<FormState>
          name="egg_species"
          label={t["Egg species"]}
          options={getGen3SpeciesOptions().byName}
        />
        <FormSelectField<FormState>
          name="compatability"
          label={t["Compatability"]}
          options={[
            {
              label: t["The two seem to get along"],
              value: "GetAlong",
            },
            {
              label: t["The two seem to get along very well"],
              value: "GetAlongVeryWell",
            },
            {
              label: t["The two don't seem to like each other"],
              value: "DontLikeEachOther",
            },
          ]}
        />
      </FormSection>

      <FormSection title={t["Search"]}>
        <FieldRow>
          <FormNumberField<FormState>
            name="initial_advances"
            label={t["Initial advances"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="max_advances"
            label={t["Max advances"]}
            numType="decimal"
          />
        </FieldRow>
        <FieldRow>
          <FormNumberField<FormState>
            name="min_redraw"
            label={t["Min redraw"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="max_redraw"
            label={t["Max redraw"]}
            numType="decimal"
          />
        </FieldRow>
      </FormSection>

      <FormSection title={t["Filters"]}>
        <NatureFilterField<FormState> name="filter_nature" />
        <GenderFilterField<FormState> name="filter_gender" />
        <FormSelectField<FormState>
          name="filter_shiny"
          label={t["Shiny"]}
          options={shinyFilterOptions}
          tooltip={{
            title: t["Shiny"],
            description: shinyFilterGen3To7Tooltip,
          }}
        />
      </FormSection>

      <FormSection title={t["Advanced"]}>
        <FieldRow>
          <FormNumberField<FormState>
            name="calibration"
            label={t["Calibration"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="delay"
            label={t["Delay"]}
            numType="decimal"
          />
        </FieldRow>
      </FormSection>
    </>
  );
};

type Props = {
  lua?: boolean;
};

export const EmeraldHeldEgg = ({ lua = false }: Props) => {
  const [results, setResults] = React.useState<Gen3HeldEgg[]>([]);

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    const results = await rngTools.emerald_egg_held_states({
      ...opts,
      has_lightning_rod: false,
      has_roamer: false,
      registered_trainers: [],
      lua_adjustment: lua,
      filter_impossible_to_hit: false,
      filters: {
        shiny: opts.filter_shiny,
        nature: opts.filter_nature,
        ability: null,
        gender: opts.filter_gender,
        match_call: null,
      },
    });

    setResults(results);
  };

  return (
    <ToolForm<FormState, Gen3HeldEgg>
      getColumns={getColumns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      formContainerId="emerald_held_egg_form"
      submitTrackerId="generate_emerald_held_egg"
    >
      <Fields />
    </ToolForm>
  );
};
