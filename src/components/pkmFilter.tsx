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
    <Flex mr={8}>
      <Flex width={100}>{nat}</Flex>{" "}
      <Flex width={80}>
        <Icon name="ArrowUp" /> {up.toUpperCase()}
      </Flex>{" "}
      <Flex>
        <Icon name="ArrowDown" /> {down.toUpperCase()}
      </Flex>
    </Flex>
  );
};

export const getNatureInputProps = (translations?: Translations) => {
  const t = (text: keyof Translations) => {
    return translations?.[text] ?? text;
  };

  const options = [
    {
      value: "Adamant",
      labelWhenSelected: t("Adamant"),
      label: toNatureLabel(t("Adamant"), t("Atk"), t("SpA")),
    },
    { value: "Bashful", labelWhenSelected: t("Bashful"), label: t("Bashful") },
    {
      value: "Bold",
      labelWhenSelected: t("Bold"),
      label: toNatureLabel(t("Bold"), t("Def"), t("Atk")),
    },
    {
      value: "Brave",
      labelWhenSelected: t("Brave"),
      label: toNatureLabel(t("Brave"), t("Atk"), t("Spe")),
    },
    {
      value: "Calm",
      labelWhenSelected: t("Calm"),
      label: toNatureLabel(t("Calm"), t("SpD"), t("Atk")),
    },
    {
      value: "Careful",
      labelWhenSelected: t("Careful"),
      label: toNatureLabel(t("Careful"), t("SpD"), t("SpA")),
    },
    { value: "Docile", labelWhenSelected: t("Docile"), label: t("Docile") },
    {
      value: "Gentle",
      labelWhenSelected: t("Gentle"),
      label: toNatureLabel(t("Gentle"), t("SpD"), t("Def")),
    },
    { value: "Hardy", labelWhenSelected: t("Hardy"), label: t("Hardy") },
    {
      value: "Hasty",
      labelWhenSelected: t("Hasty"),
      label: toNatureLabel(t("Hasty"), t("Spe"), t("Def")),
    },
    {
      value: "Impish",
      labelWhenSelected: t("Impish"),
      label: toNatureLabel(t("Impish"), t("Def"), t("SpA")),
    },
    {
      value: "Jolly",
      labelWhenSelected: t("Jolly"),
      label: toNatureLabel(t("Jolly"), t("Spe"), t("SpA")),
    },
    {
      value: "Lax",
      labelWhenSelected: t("Lax"),
      label: toNatureLabel(t("Lax"), t("Def"), t("SpD")),
    },
    {
      value: "Lonely",
      labelWhenSelected: t("Lonely"),
      label: toNatureLabel(t("Lonely"), t("Atk"), t("Def")),
    },
    {
      value: "Mild",
      labelWhenSelected: t("Mild"),
      label: toNatureLabel(t("Mild"), t("SpA"), t("Def")),
    },
    {
      value: "Modest",
      labelWhenSelected: t("Modest"),
      label: toNatureLabel(t("Modest"), t("SpA"), t("Atk")),
    },
    {
      value: "Naive",
      labelWhenSelected: t("Naive"),
      label: toNatureLabel(t("Naive"), t("Spe"), t("SpD")),
    },
    {
      value: "Naughty",
      labelWhenSelected: t("Naughty"),
      label: toNatureLabel(t("Naughty"), t("Atk"), t("SpD")),
    },
    {
      value: "Quiet",
      labelWhenSelected: t("Quiet"),
      label: toNatureLabel(t("Quiet"), t("SpA"), t("Spe")),
    },
    { value: "Quirky", labelWhenSelected: t("Quirky"), label: t("Quirky") },
    {
      value: "Rash",
      labelWhenSelected: t("Rash"),
      label: toNatureLabel(t("Rash"), t("SpA"), t("SpD")),
    },
    {
      value: "Relaxed",
      labelWhenSelected: t("Relaxed"),
      label: toNatureLabel(t("Relaxed"), t("Def"), t("Spe")),
    },
    {
      value: "Sassy",
      labelWhenSelected: t("Sassy"),
      label: toNatureLabel(t("Sassy"), t("SpD"), t("Spe")),
    },
    { value: "Serious", labelWhenSelected: t("Serious"), label: t("Serious") },
    {
      value: "Timid",
      labelWhenSelected: t("Timid"),
      label: toNatureLabel(t("Timid"), t("Spe"), t("Atk")),
    },
  ] satisfies {
    value: Nature;
    labelWhenSelected: string;
    label: React.ReactNode;
  }[];

  return {
    options,
    optionLabelProp: "labelWhenSelected",
    showSearch: { optionFilterProp: "labelWhenSelected" },
  };
};

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

export type PkmFilterProps = {
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

const _getPkmFilterFields = (
  props: PkmFilterProps = {},
  t?: Translations,
): Field[] =>
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
  props?: PkmFilterProps,
  t?: Translations,
): FormField extends PkmFilterFields ? Field[] : never => {
  return _getPkmFilterFields(props, t) as FormField extends PkmFilterFields
    ? Field[]
    : never;
};
