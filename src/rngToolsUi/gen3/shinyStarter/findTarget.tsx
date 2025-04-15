import React from "react";
import { FormikInput, RngToolForm, Field } from "~/components";
import { RadioGroup } from "~/components/radio";
import { RngToolUpdate } from "~/components/rngToolForm";
import {
  DecimalString,
  fromDecimalString,
  fromHexString,
  HexString,
  toDecimalString,
  toHexString,
} from "~/utils/number";

type Starter = "Mudkip" | "Torchic" | "Treecko";

const getTargetAdvance = ({
  tid,
  starter,
}: {
  tid: number;
  sid: number;
  starter: Starter;
}) => {
  // stubbed
  return tid + starter.length * 10;
};

type FormState = {
  tid: DecimalString;
  sid: HexString;
};

const initialValues: FormState = {
  tid: toDecimalString(0),
  sid: toHexString(0),
};

type Props = {
  setTargetAdvance: (targetAdvance: number) => void;
  setPokemonSpecies: (starter: Starter) => void;
  pokemonSpecies: Starter;
};

export const FindTargetAdvance = ({ 
  pokemonSpecies,
  setPokemonSpecies,
  setTargetAdvance,
}: Props) => {
    
  const fields: Field[] = [
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
  ];

  const onUpdate = React.useCallback<RngToolUpdate<FormState>>(
    async (opts) => {
      const tid = fromDecimalString(opts.tid);
      const sid = fromHexString(opts.sid);

      if (tid == null || sid == null) {
        return;
      }

      const targetAdvance = getTargetAdvance({
        tid,
        sid,
        starter: pokemonSpecies,
      });
      setTargetAdvance(targetAdvance);
    },
    [setTargetAdvance],
  );

  return (
    <RngToolForm<FormState, unknown[]>
      fields={fields}
      initialValues={initialValues}
      onUpdate={onUpdate}
    />
  );
};
