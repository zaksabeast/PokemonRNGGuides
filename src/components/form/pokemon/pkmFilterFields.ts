import { shinyFilterSchema } from "~/rngTools/shiny";
import type {
  AbilityType,
  Gender,
  Ivs,
  Nature,
  PkmFilter,
  ShinyFilter,
} from "~/rngTools";
import { nature } from "~/types/nature";
import { IvsSchema } from "~/components/form/pokemon/ivFields";
import { ability12H } from "~/types/ability";
import { gender } from "~/types/gender";
import { maxIvs, minIvs } from "~/types/ivs";
import { z } from "zod";
import {
  defaultHiddenPowerFilter,
  HiddenPowerSchema,
} from "~/components/form/pokemon/hiddenPowerFilter";

export type PkmFilterFields = {
  filter_shiny: ShinyFilter;
  filter_nature: Nature[];
  filter_gender: Gender | null;
  filter_min_ivs: Ivs;
  filter_max_ivs: Ivs;
  filter_ability: AbilityType | null;
  filter_hidden_power: z.infer<typeof HiddenPowerSchema>;
};

export const pkmFilterSchema = z.object({
  filter_shiny: shinyFilterSchema,
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

export const getPkmFilterInitialValues = (): PkmFilterFields => ({
  filter_shiny: "Any",
  filter_min_ivs: minIvs,
  filter_max_ivs: maxIvs,
  filter_nature: [],
  filter_gender: null,
  filter_ability: null,
  filter_hidden_power: defaultHiddenPowerFilter,
});
