import { GenderRatio, PkmFilter } from "~/rngTools";
import { Field } from "~/components/formFieldTable";
import { FormikSwitch } from "~/components/switch";
import { FormikSelect } from "~/components/select";
import { nature } from "~/types/nature";
import { IvInput, IvsSchema } from "~/components/ivInput";
import { ability } from "~/types/ability";
import { gender } from "~/types/gender";
import { maxIvs, minIvs } from "~/types/ivs";
import { z } from "zod";
import * as tst from "ts-toolbelt";
import { toOptions, optOut } from "~/utils/options";
import {
  defaultHiddenPowerFilter,
  HiddenPowerSchema,
} from "./hiddenPowerInput";
import {
  HiddenPowerInput,
  HiddenPowerSwitch,
} from "./hiddenPowerInput.component";
import { StatsFilterSchema } from "../types/stat";
import { Translations } from "~/translations";
import { GenderFilter } from "./genderFilter";

const sortedNatures = nature.toSorted();

const requiredNatureOptions = toOptions(sortedNatures);
const optionalNatureOptions = [
  {
    label: "Any" as const,
    value: null,
  },
  ...requiredNatureOptions,
];

export const natureOptions = {
  required: requiredNatureOptions,
  optional: optionalNatureOptions,
};

export const abilityOptions = ([null, ...ability] as const).map((abil) => ({
  label: abil ?? ("Any" as const),
  value: abil,
}));

export type PkmFilterFields = {
  [Key in keyof PkmFilter as `filter_${Key}`]: undefined extends PkmFilter[Key]
    ? tst.U.Exclude<PkmFilter[Key], undefined> | null
    : PkmFilter[Key];
};

export const pkmFilterSchema = z.object({
  filter_shiny: z.boolean(),
  filter_nature: z.enum(nature).nullable(),
  filter_ability: z.enum(ability).nullable(),
  filter_gender: z.enum(gender).nullable(),
  filter_min_ivs: IvsSchema,
  filter_max_ivs: IvsSchema,
  filter_hidden_power: HiddenPowerSchema,
  filter_stats: StatsFilterSchema.nullable(),
});

export const pkmFilterFieldsToRustInput = (
  fields: PkmFilterFields,
): PkmFilter => {
  return {
    shiny: fields.filter_shiny,
    nature: fields.filter_nature,
    gender: fields.filter_gender,
    min_ivs: fields.filter_min_ivs,
    max_ivs: fields.filter_max_ivs,
    ability: fields.filter_ability,
    hidden_power: fields.filter_hidden_power,
    stats: null,
  };
};

type Props = {
  displayShiny?: boolean;
  displayNature?: boolean;
  displayAbility?: boolean;
  displayGender?: boolean;
  displayIvs?: boolean;
  displayHiddenPower?: boolean;
  genderRatio?: GenderRatio;
};

export const getPkmFilterInitialValues = (): PkmFilterFields => ({
  filter_shiny: false,
  filter_min_ivs: minIvs,
  filter_max_ivs: maxIvs,
  filter_nature: null,
  filter_gender: null,
  filter_ability: null,
  filter_hidden_power: defaultHiddenPowerFilter,
  filter_stats: null,
});

const _getPkmFilterFields = (props: Props = {}, t?: Translations): Field[] =>
  [
    optOut(props?.displayShiny, {
      label: t?.["Shiny"] ?? "Shiny",
      input: <FormikSwitch<PkmFilterFields> name="filter_shiny" />,
    }),
    optOut(props?.displayNature, {
      label: t?.["Nature"] ?? "Nature",
      input: (
        <FormikSelect<PkmFilterFields, "filter_nature">
          name="filter_nature"
          options={natureOptions.optional}
        />
      ),
    }),
    optOut(props?.displayAbility, {
      label: t?.["Ability"] ?? "Ability",
      input: (
        <FormikSelect<PkmFilterFields, "filter_ability">
          name="filter_ability"
          options={abilityOptions}
        />
      ),
    }),
    optOut(props?.displayGender, {
      label: t?.["Gender"] ?? "Gender",
      input: <GenderFilter genderRatio={props.genderRatio} />,
    }),
    optOut(props?.displayIvs, {
      label: t?.["Min IVs"] ?? "Min IVs",
      input: <IvInput<PkmFilterFields> name="filter_min_ivs" />,
    }),
    optOut(props?.displayIvs, {
      label: t?.["Max IVs"] ?? "Max IVs",
      input: <IvInput<PkmFilterFields> name="filter_max_ivs" />,
    }),
    optOut(props?.displayHiddenPower, {
      label: "Hidden Power",
      input: <HiddenPowerSwitch />,
    }),
    optOut(props?.displayHiddenPower, {
      label: "",
      key: "_getPkmFilterFields.hidden_power",
      direction: "column",
      input: <HiddenPowerInput<PkmFilterFields> name="filter_hidden_power" />,
      indent: 1,
    }),
  ].filter((field) => field !== null);

export const getPkmFilterFields = <FormField,>(
  props?: Props,
  t?: Translations,
): FormField extends PkmFilterFields ? Field[] : never => {
  return _getPkmFilterFields(props, t) as FormField extends PkmFilterFields
    ? Field[]
    : never;
};
