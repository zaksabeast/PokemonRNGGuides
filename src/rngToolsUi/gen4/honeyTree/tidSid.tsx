import React from "react";
import * as tst from "ts-toolbelt";
import { z } from "zod";
import {
  Field,
  FormFieldTable,
  FormikNumberInput,
  FormikSelect,
  RngToolForm,
} from "~/components";
import { Translations } from "~/translations";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useWatch } from "~/hooks/form";
import { honeyTreeAtom, INITIAL_GAME } from "./state";
import { gen4StateAtom } from "../shared/state";
import { useAtom } from "jotai";
import { rngTools } from "~/rngTools";
import { toOptions } from "~/utils/options";
import { DpPt } from "../gen4types";

const Validator = z.object({
  game: z.enum(DpPt),
  tid: z.number().int().min(0).max(65535),
  sid: z.number().int().min(0).max(65535),
});

type FormState = z.infer<typeof Validator>;
type LooseFormState = tst.O.Nullable<FormState, "tid" | "sid">;

const initialValues: LooseFormState = {
  game: INITIAL_GAME,
  tid: null,
  sid: null,
};

const getFields = (t: Translations): Field[] => [
  {
    label: t["Game"],
    input: (
      <FormikSelect<FormState, "game"> name="game" options={toOptions(DpPt)} />
    ),
  },
  {
    label: t["TID"],
    input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
  },
  {
    label: t["SID"],
    input: <FormikNumberInput<FormState> name="sid" numType="decimal" />,
  },
];

const Fields = () => {
  const t = useActiveRouteTranslations();
  const [, setState] = useAtom(gen4StateAtom);
  const [, setHoneyTreeState] = useAtom(honeyTreeAtom);
  const { tid, sid, game } = useWatch({
    validationSchema: Validator,
    names: {
      game: true,
      tid: true,
      sid: true,
    },
  });

  React.useEffect(() => {
    const submitForm = async () => {
      const trees =
        tid != null && sid != null
          ? await rngTools.get_muchlax_trees(tid, sid)
          : null;

      setState({
        target: { seedTime: null, lcrngAdvance: null, mtAdvance: null },
      });
      setHoneyTreeState((prev) => ({
        ...prev,
        game: game ?? prev.game,
        munchlaxLocations: trees?.reverse() ?? null,
      }));
    };

    submitForm();
  }, [tid, sid, game, setState, setHoneyTreeState]);

  return <FormFieldTable fields={getFields(t)} />;
};

export const HoneyTreeTidSid = () => {
  return (
    <RngToolForm<LooseFormState, Record<string, unknown>>
      initialValues={initialValues}
    >
      <Fields />
    </RngToolForm>
  );
};
