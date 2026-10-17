import { ShinyIcon } from "~/components/shiny";
import React from "react";
import { ResultColumn } from "~/components";
import {
  FieldRow,
  FormNumberField,
  FormSection,
  FormSelectField,
  PkmFilter,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { rngTools, Stationary6State } from "~/rngTools";
import {
  flattenIvs,
  FlattenIvs,
  getIvColumns,
} from "~/rngToolsUi/shared/ivColumns";
import {
  pkmFilterSchema,
  getPkmFilterInitialValues,
} from "~/components/pkmFilter";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { z } from "zod";
import { HexSchema } from "~/utils/number";
import { toOptions } from "~/utils/options";
import { startCase } from "lodash-es";
import { Translations } from "~/translations";

const transporterGenders = ["NoGender", "RandomGender", "Mythical"] as const;
const transporterGenderOptions = toOptions(transporterGenders, startCase);
type Result = FlattenIvs<Stationary6State>;

const getColumns = (t: Translations): ResultColumn<Result>[] => [
  {
    title: t["Advance"],
    dataIndex: "advance",
  },
  {
    title: t["RNG State"],
    dataIndex: "rng_state",
    monospace: true,
    render: (seed) => seed.toString(16).toUpperCase().padStart(8, "0"),
  },
  {
    title: t["PSV"],
    dataIndex: "psv",
  },
  {
    title: t["Shiny"],
    dataIndex: "shiny",
    render: (shiny) => <ShinyIcon shiny={shiny} translations={t} />,
  },
  ...getIvColumns(t),
  {
    title: t["Ability"],
    dataIndex: "ability",
  },
  {
    title: t["Nature"],
    dataIndex: "nature",
  },
  {
    title: t["Gender"],
    dataIndex: "gender",
  },
];

const Validator = z
  .object({
    seed: HexSchema(0xffffffff),
    initial_advances: z.number().int().min(0),
    max_advances: z.number().int().min(0),
    delay: z.number().int(),
    tsv: z.number().int().min(0).max(4095),
    trv: z.number().int().min(0).max(15),
    only_current_seed: z.boolean(),
    transporter_genders: z.enum(transporterGenders),
  })
  .extend(pkmFilterSchema.shape);

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  seed: 0,
  initial_advances: 20,
  max_advances: 50,
  delay: 100,
  tsv: 0,
  trv: 0,
  only_current_seed: false,
  transporter_genders: "NoGender",
  ...getPkmFilterInitialValues(),
};

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
          name="tsv"
          label={t["TSV"]}
          numType="decimal"
        />
        <FormNumberField<FormState>
          name="trv"
          label={t["TRV"]}
          numType="decimal"
        />
        <FormSelectField<FormState>
          name="transporter_genders"
          label={t["Transporter Gender"]}
          options={transporterGenderOptions}
        />
      </FormSection>

      <FormSection title={t["Search"]}>
        <FieldRow>
          <FormNumberField<FormState>
            name="initial_advances"
            label={t["Initial Advance"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="max_advances"
            label={t["Max Advances"]}
            numType="decimal"
          />
        </FieldRow>
        <FormNumberField<FormState>
          name="delay"
          label={t["Delay"]}
          numType="decimal"
        />
      </FormSection>

      <FormSection title={t["Filters"]}>
        <PkmFilter<FormState>
          generation={6}
          displayIvs
          displayAbility={false}
          displayGender={false}
          displayNature={false}
          displayShiny={false}
          displayHiddenPower={false}
        />
      </FormSection>
    </>
  );
};

export const Transporter = () => {
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    const results = await rngTools.generate_transporter({
      seed: opts.seed,
      initial_advances: opts.initial_advances,
      max_advances: opts.max_advances,
      delay: opts.delay,
      target: 0,
      transporter_genders: [opts.transporter_genders],
      tsv: opts.tsv,
      trv: opts.trv,
      filter: {
        gender: null,
        ability: null,
        nature: null,
        ivs: {
          min_ivs: opts.filter_min_ivs,
          max_ivs: opts.filter_max_ivs,
        },
        shiny: "Any",
      },
    });

    setResults(results.map(flattenIvs));
  };

  return (
    <ToolForm<FormState, Result>
      getColumns={getColumns}
      results={results}
      validationSchema={Validator}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="generate_transporter"
    >
      <Fields />
    </ToolForm>
  );
};
