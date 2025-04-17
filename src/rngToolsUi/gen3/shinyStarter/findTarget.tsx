import React from "react";
import { FormikInput, RngToolForm, Field } from "~/components";
import { RadioGroup } from "~/components/radio";
import { RngToolUpdate } from "~/components/rngToolForm";
import {Starter,Game} from "./index";
import {findTargetAdvanceForShinyPokemon} from "./calc";

import {
  DecimalString,
  fromDecimalString,
  fromHexString,
  HexString,
  toDecimalString,
  toHexString,
} from "~/utils/number";


type FormState = {
  tid: DecimalString;
  sid: HexString;
};

const initialValues: FormState = {
  tid: toDecimalString(0),
  sid: toHexString(0),
};

type Props = {
  game:Game;
  setTargetAdvance: (targetAdvance: number) => void;
  setPokemonSpecies: (starter: Starter) => void;
  pokemonSpecies: Starter;
};

export const FindTargetAdvance = ({ 
  game,
  pokemonSpecies,
  setPokemonSpecies,
  setTargetAdvance,
}: Props) => {
    
  const fields: Field[] = React.useMemo(() => ([
    {
      label: "Starter",
      input: (
        <RadioGroup
          optionType="button"
          onChange={e => setPokemonSpecies(e.target.value)}
          options={["Mudkip", "Torchic", "Treecko"]}
          value={pokemonSpecies}
        />
      ),
    },
    {
      label: "TID",
      input: <FormikInput<FormState> name="tid" />,
    },
    {
      label: "SID",
      input: <FormikInput<FormState> name="sid" />,
    },
  ]), [pokemonSpecies, setPokemonSpecies]);

  const onUpdate = React.useCallback<RngToolUpdate<FormState>>(
    async (opts) => {
      const tid = fromDecimalString(opts.tid);
      const sid = fromHexString(opts.sid);

      if (tid == null || tid < 0 || tid > 0xFFFF ||
          sid == null || sid < 0 || sid > 0xFFFF){
        return;
      }

      const targetAdvance = await findTargetAdvanceForShinyPokemon(game, tid, sid); 
      if (targetAdvance !== null)
          setTargetAdvance(targetAdvance);
    },
    [setTargetAdvance, game],
  );

  return (
    <RngToolForm<FormState, never[]>
      fields={fields}
      initialValues={initialValues}
      onUpdate={onUpdate}
    />
  );
};
