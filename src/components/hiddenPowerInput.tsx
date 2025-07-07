import { GenericForm,GuaranteeFormNameType } from "~/types/form";
import { Flex } from "./flex";
import { z } from "zod";
import {pokemonTypes} from "../types/pokemonTypes";
import {PokemonType} from "~/rngTools";

type UiHiddenPowerFilter = {
  active:boolean,
  pokemon_types:PokemonType[],
  min_bp:number;
  max_bp:number; 
}

export const defaultHiddenPowerFilter:UiHiddenPowerFilter = {
  active:false,
  pokemon_types:[],
  min_bp:15,
  max_bp:70,
};

export const HiddenPowerSchema = z.object({
  active:z.boolean(),
  pokemon_types: z.array(z.enum(pokemonTypes)),
  min_bp: z.number().min(15).max(70),
  max_bp: z.number().min(15).max(70),
});

type Props<FormState extends GenericForm> = {
  name: GuaranteeFormNameType<
    FormState,
    UiHiddenPowerFilter
  >;
};

export const HiddenPowerInput = <
  FormState extends GenericForm,
>({
  name
}:Props<FormState>) => {
  return (
    <Flex gap={16}>
      HiddenPower {name} NO_PROD
    </Flex>
  );
};
