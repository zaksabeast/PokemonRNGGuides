import React from "react";
import { ResultColumn, Button } from "~/components";
import {
  FieldRow,
  FormNumberField,
  FormSection,
  FormSelectField,
  FormSwitchField,
  PkmFilter,
  SwitchField,
  SwitchGroup,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { useCurrentStep } from "~/components/stepper/state";
import { rngTools, Gen3HeldEgg, PokeNavTrainer } from "~/rngTools";
import { getGen3SpeciesOptions, species } from "~/types/species";
import {
  getPkmFilterInitialValues,
  pkmFilterSchema,
  getSpeciesOptions,
} from "~/components/pkmFilter";
import { z } from "zod";
import { useHeldEggState, useRegisteredTrainers } from "./state";
import { useHydrate } from "~/hooks/useHydrate";
import { Skeleton } from "antd";
import { approximateGen3FrameTime } from "~/utils/approximateGen3FrameTime";
import { Translations, usePokeNavTranslations } from "~/translations";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { PokeNavTrainerTranslations } from "~/translations/en/pokeNav";
import { useField, useWatch } from "~/hooks/form";
import { compatability, getCompatabilityOptions } from "./constants";

const DEFAULT_CALIBRATION = 19;

const Calibration = () => {
  const t = useActiveRouteTranslations();
  const [enabled, setEnabled] = React.useState(false);
  const [, , { setValue }] = useField<number | null>("calibration");

  return (
    <SwitchField
      name="enable-calibration"
      label={t["Calibration Override"]}
      supportingText={t["Do not change. Only for advanced users."]}
      value={enabled}
      onChange={(nextEnabled) => {
        setEnabled(nextEnabled);
        // A hidden override shouldn't keep applying
        if (!nextEnabled) {
          setValue(DEFAULT_CALIBRATION);
        }
      }}
    >
      <FormNumberField<FormState>
        name="calibration"
        label={t["Calibration"]}
        numType="decimal"
        helperText={t["Do not change. Only for advanced users."]}
      />
    </SwitchField>
  );
};

type Result = Gen3HeldEgg & { key: string; time: string };

type SelectButtonProps = {
  result: Result;
};

const SelectButton = ({ result }: SelectButtonProps) => {
  const t = useActiveRouteTranslations();
  const [, setCurrentStep] = useCurrentStep();
  const [, setState] = useHeldEggState();

  const onClick = () => {
    setState((prev) => ({
      ...prev,
      target: {
        ...result,
        redraws: result.redraws,
        calibration: result.calibration,
        advance: result.advance,
      },
    }));
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <Button trackerId="select_retail_emerald_held_egg" onClick={onClick}>
      {t["Select"]}
    </Button>
  );
};

const getColumns = ({
  t,
  translatedTrainers,
}: {
  t: Translations;
  translatedTrainers: PokeNavTrainerTranslations;
}): ResultColumn<Result>[] => [
  {
    title: t["Select"],
    dataIndex: "advance",
    disableVerticalPadding: true,
    render: (_, result) => <SelectButton result={result} />,
  },
  {
    title: t["Time"],
    dataIndex: "time",
  },
  {
    title: t["Shiny"],
    dataIndex: "shiny",
    render: (shiny) => (shiny ? "Yes" : "No"),
  },
  {
    title: t["Pokedex"],
    dataIndex: "redraws",
    render: (redraws) => `${t["Pokedex"]} x${redraws}`,
  },
  {
    title: t["Match call"],
    dataIndex: "match_call",
    render: (match_call) => translatedTrainers[match_call],
  },
  {
    title: t["PID"],
    dataIndex: "pid",
    monospace: true,
    render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
  },
  { title: t["Gender"], dataIndex: "gender" },
  { title: t["Nature"], dataIndex: "nature" },
  { title: t["Ability"], dataIndex: "ability" },
  {
    title: t["Advance"],
    dataIndex: "advance",
  },
];

const Validator = z
  .object({
    max_advances: z.number().int().min(0),
    calibration: z.number().int().min(0),
    has_roamer: z.boolean(),
    has_lightning_rod: z.boolean(),
    compatability: z.enum(compatability),
    tid: z.number().int().min(0).max(65535),
    sid: z.number().int().min(0).max(65535),
    egg_species: z.enum(species),
  })
  .extend(pkmFilterSchema.shape);

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  max_advances: 10000,
  calibration: DEFAULT_CALIBRATION,
  has_roamer: false,
  has_lightning_rod: true,
  compatability: "GetAlong",
  tid: 0,
  sid: 0,
  egg_species: "Bulbasaur",
  ...getPkmFilterInitialValues(),
};

type FieldsProps = {
  t: Translations;
};

const Fields = ({ t }: FieldsProps) => {
  const { egg_species } = useWatch({
    validationSchema: Validator,
    names: { egg_species: true },
  });

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
          options={getSpeciesOptions(getGen3SpeciesOptions().byName)}
        />
        <FormSelectField<FormState>
          name="compatability"
          label={t["Compatability"]}
          options={getCompatabilityOptions(t)}
        />
        <SwitchGroup>
          <FormSwitchField<FormState>
            name="has_lightning_rod"
            label={t["Has lightning rod"]}
          />
          <FormSwitchField<FormState>
            name="has_roamer"
            label={t["Roamer is active"]}
          />
        </SwitchGroup>
      </FormSection>

      <FormSection title={t["Search"]}>
        <FormNumberField<FormState>
          name="max_advances"
          label={t["Max advances"]}
          numType="decimal"
        />
      </FormSection>

      <FormSection title={t["Filters"]}>
        <PkmFilter<FormState>
          displayIvs={false}
          displayHiddenPower={false}
          species={egg_species ?? undefined}
        />
      </FormSection>

      <FormSection title={t["Advanced"]}>
        <Calibration />
      </FormSection>
    </>
  );
};

type InnerProps = {
  registeredTrainers: PokeNavTrainer[];
};

const InnerRetailEmeraldHeldEgg = ({ registeredTrainers }: InnerProps) => {
  const t = useActiveRouteTranslations();
  const translatedTrainers = usePokeNavTranslations(t.language);
  const [, setState] = useHeldEggState();
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    const results = await rngTools.emerald_egg_held_states({
      ...opts,
      delay: 0,
      registered_trainers: registeredTrainers,
      lua_adjustment: true,
      min_redraw: 0,
      max_redraw: 100,
      initial_advances: 2000,
      filter_impossible_to_hit: true,
      filters: {
        shiny: opts.filter_shiny,
        nature: opts.filter_nature,
        ability: opts.filter_ability,
        gender: opts.filter_gender,
        match_call: null,
      },
    });

    setResults(
      results.map((result) => ({
        ...result,
        time: approximateGen3FrameTime(result.advance),
        key: `${result.advance}-${result.pid}`,
      })),
    );

    setState((prev) => ({ ...prev, eggSettings: opts }));
  };

  const columns = getColumns({
    t,
    translatedTrainers: translatedTrainers.withoutTitle,
  });

  return (
    <ToolForm<FormState, Result>
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      formContainerId="retail_emerald_held_egg_form"
      submitTrackerId="generate_retail_emerald_held_egg"
      rowKey="key"
    >
      <Fields t={t} />
    </ToolForm>
  );
};

export const RetailEmeraldHeldEgg = () => {
  const [lockedState] = useRegisteredTrainers();
  const { hydrated, client } = useHydrate(lockedState);

  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <InnerRetailEmeraldHeldEgg registeredTrainers={client.registeredTrainers} />
  );
};
