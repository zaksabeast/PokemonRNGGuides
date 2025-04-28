import React from "react";
import { z } from "zod";
import {
  RngToolForm,
  Field,
  RngToolSubmit,
  FormikNumberInput,
} from "~/components";
import { Game } from "./index";
import { findTargetAdvanceForShinyPokemon } from "./calc";

const Validator = z.object({
  tid: z.number().int().min(0).max(65535),
  sid: z.number().int().min(0).max(65535),
});

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  tid: 0,
  sid: 0,
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
        input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
      },
      {
        label: "SID",
        input: <FormikNumberInput<FormState> name="sid" numType="decimal" />,
      },
    ],
    [],
  );

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const targetAdvance = await findTargetAdvanceForShinyPokemon(
        game,
        opts.tid,
        opts.sid,
      );
      if (targetAdvance !== null) setTargetAdvance(targetAdvance);
    },
    [setTargetAdvance, game],
  );

  return (
    <RngToolForm<FormState, never[]>
      fields={fields}
      initialValues={initialValues}
      validationSchema={Validator}
      submitTrackerId="findTarget"
      submitButtonLabel="Calculate Target advance"
      onSubmit={onSubmit}
    />
  );
};
