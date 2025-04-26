import React from "react";
import { FormikInput, RngToolForm, Field } from "~/components";
import { RadioGroup } from "~/components/radio";
import { RngToolUpdate } from "~/components/rngToolForm";
import { Starter, Game } from "./index";
import { findTargetAdvanceForShinyPokemon } from "./calc";

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
  sid: DecimalString;
};

const initialValues: FormState = {
  tid: toDecimalString(0),
  sid: toDecimalString(0),
};

type Props = {
  game: Game;
  setTargetAdvance: (targetAdvance: number) => void;
};

export const FindTargetAdvance = ({ game, setTargetAdvance }: Props) => {
  const fields: Field[] = React.useMemo(
    () => [
      {
        label: "TID",
        input: <FormikInput<FormState> name="tid" />,
      },
      {
        label: "SID",
        input: <FormikInput<FormState> name="sid" />,
      },
    ],
    [],
  );

  const onSubmit = React.useCallback<RngToolUpdate<FormState>>(
    async (opts) => {
      const tid = fromDecimalString(opts.tid);
      const sid = fromDecimalString(opts.sid);

      if (tid == null || sid == null) {
        return;
      }

      const targetAdvance = await findTargetAdvanceForShinyPokemon(
        game,
        tid,
        sid,
      );
      if (targetAdvance !== null) setTargetAdvance(targetAdvance);
    },
    [setTargetAdvance, game],
  );

  return (
    <RngToolForm<FormState, never[]>
      fields={fields}
      initialValues={initialValues}
      submitTrackerId="findTarget"
      submitButtonLabel="Update Target advance of timer"
      onSubmit={onSubmit}
    />
  );
};
