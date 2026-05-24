import type {
  AbilityType,
  Gender,
  HiddenPowerFilter,
  Ivs,
  Nature,
  PkmFilter,
  Species,
} from "~/rngTools";
import { Field } from "~/components/formFieldTable";
import { FormikSwitch } from "~/components/switch";
import { nature } from "~/types/nature";
import { IvInput, IvsSchema } from "~/components/ivInput";
import { ability12H } from "~/types/ability";
import { gender, getGenderFilterOptions } from "~/types/gender";
import { maxIvs, minIvs } from "~/types/ivs";
import { z } from "zod";
import { optOut } from "~/utils/options";
import {
  defaultHiddenPowerFilter,
  HiddenPowerSchema,
} from "./hiddenPowerInput";
import {
  HiddenPowerInput,
  HiddenPowerSwitch,
} from "./hiddenPowerInput.component";
import { Translations } from "~/translations";
import { FormikAbilityFilter } from "./abilityFilter";
import { FormikRadio } from "./radio";
import { NatureFilterInput } from "./natureFilterInput";
import { Flex } from "./flex";
import { Icon } from "./icons";

const toNatureLabel = (nat: string, up: string, down: string) => {
  return (
    <Flex>
      <Flex width={100}>{nat}</Flex>{" "}
      <Flex width={60}>
        <Icon name="ArrowUp" /> {up}
      </Flex>{" "}
      <Flex>
        <Icon name="ArrowDown" /> {down}
      </Flex>
    </Flex>
  );
};

export const natureOptions = [
  { value: "Adamant", label: toNatureLabel("Adamant", "ATK", "SPA") },
  { value: "Bashful", label: "Bashful" },
  { value: "Bold", label: toNatureLabel("Bold", "DEF", "ATK") },
  { value: "Brave", label: toNatureLabel("Brave", "ATK", "SPE") },
  { value: "Calm", label: toNatureLabel("Calm", "SPD", "ATK") },
  { value: "Careful", label: toNatureLabel("Careful", "SPD", "SPA") },
  { value: "Docile", label: "Docile" },
  { value: "Gentle", label: toNatureLabel("Gentle", "SPD", "DEF") },
  { value: "Hardy", label: "Hardy" },
  { value: "Hasty", label: toNatureLabel("Hasty", "SPE", "DEF") },
  { value: "Impish", label: toNatureLabel("Impish", "DEF", "SPA") },
  { value: "Jolly", label: toNatureLabel("Jolly", "SPE", "SPA") },
  { value: "Lax", label: toNatureLabel("Lax", "DEF", "SPD") },
  { value: "Lonely", label: toNatureLabel("Lonely", "ATK", "DEF") },
  { value: "Mild", label: toNatureLabel("Mild", "SPA", "DEF") },
  { value: "Modest", label: toNatureLabel("Modest", "SPA", "ATK") },
  { value: "Naive", label: toNatureLabel("Naive", "SPE", "SPD") },
  { value: "Naughty", label: toNatureLabel("Naughty", "ATK", "SPD") },
  { value: "Quiet", label: toNatureLabel("Quiet", "SPA", "SPE") },
  { value: "Quirky", label: "Quirky" },
  { value: "Rash", label: toNatureLabel("Rash", "SPA", "SPD") },
  { value: "Relaxed", label: toNatureLabel("Relaxed", "DEF", "SPE") },
  { value: "Sassy", label: toNatureLabel("Sassy", "SPD", "SPE") },
  { value: "Serious", label: "Serious" },
  { value: "Timid", label: toNatureLabel("Timid", "SPE", "ATK") },
] as const;

export type PkmFilterFields = {
  filter_shiny: boolean;
  filter_nature: Nature[];
  filter_gender: Gender | null;
  filter_min_ivs: Ivs;
  filter_max_ivs: Ivs;
  filter_ability: AbilityType | null;
  filter_hidden_power: HiddenPowerFilter;
};

export const pkmFilterSchema = z.object({
  filter_shiny: z.boolean(),
  filter_nature: z.array(z.enum(nature)),
  filter_ability: z.enum(ability12H).nullable(),
  filter_gender: z.enum(gender).nullable(),
  filter_min_ivs: IvsSchema,
  filter_max_ivs: IvsSchema,
  filter_hidden_power: HiddenPowerSchema,
});

export const pkmFilterNatureFieldToRustInput = (
  natures: Nature[],
): PkmFilter["nature"] => {
  if (natures.length === 0) {
    return null;
  }

  return nature.map((nat) => {
    return natures.includes(nat);
  });
};

export const pkmFilterFieldsToRustInput = (
  fields: PkmFilterFields,
): PkmFilter => {
  return {
    shiny: fields.filter_shiny,
    nature: pkmFilterNatureFieldToRustInput(fields.filter_nature),
    gender: fields.filter_gender,
    min_ivs: fields.filter_min_ivs,
    max_ivs: fields.filter_max_ivs,
    ability: fields.filter_ability,
    hidden_power: fields.filter_hidden_power,
  };
};

type Props = {
  displayShiny?: boolean;
  displayNature?: boolean;
  displayAbility?: boolean;
  displayHiddenAbility?: boolean;
  displayGender?: boolean;
  displayIvs?: boolean;
  displayHiddenPower?: boolean;
  species?: Species;
};

export const getPkmFilterInitialValues = (): PkmFilterFields => ({
  filter_shiny: false,
  filter_min_ivs: minIvs,
  filter_max_ivs: maxIvs,
  filter_nature: [],
  filter_gender: null,
  filter_ability: null,
  filter_hidden_power: defaultHiddenPowerFilter,
});

const _getPkmFilterFields = (props: Props = {}, t?: Translations): Field[] =>
  [
    optOut(props?.displayShiny, {
      label: t?.["Shiny"] ?? "Shiny",
      input: <FormikSwitch<PkmFilterFields> name="filter_shiny" />,
    }),
    optOut(props?.displayNature, {
      label: t?.["Nature"] ?? "Nature",
      input: <NatureFilterInput />,
    }),
    optOut(props?.displayAbility, {
      label: t?.["Ability"] ?? "Ability",
      input: (
        <FormikAbilityFilter<PkmFilterFields>
          name="filter_ability"
          species={props?.species}
          permitAny
          displayHiddenAbility={props?.displayHiddenAbility}
        />
      ),
    }),
    optOut(props?.displayGender, {
      label: t?.["Gender"] ?? "Gender",
      input: (
        <FormikRadio
          name="filter_gender"
          options={getGenderFilterOptions(props.species)}
        />
      ),
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
      showWhen: {
        fieldName: "filter_hidden_power.active",
        when: (active: unknown) => active === true,
      },
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
