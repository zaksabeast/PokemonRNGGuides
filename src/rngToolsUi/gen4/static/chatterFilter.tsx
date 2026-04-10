import React from "react";
import { z } from "zod";
import { ChatterPitch, ChatterState, rngTools } from "~/rngTools";
import {
  Field,
  FormikNumberInput,
  Icon,
  ResultColumn,
  RngToolForm,
} from "~/components";
import { Translations } from "~/translations";
import { useStatic4State } from "./state";

type Result = ChatterState & { isTarget: boolean };

const Validator = z.object({
  advancesAfterTarget: z.number().int().min(0),
});

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  advancesAfterTarget: 10,
};

const getFields = (t: Translations): Field[] => [
  {
    label: t["Advances After Target"],
    input: (
      <FormikNumberInput<FormState>
        name="advancesAfterTarget"
        numType="decimal"
      />
    ),
  },
];

const ChatterLabel = {
  Low: "Low",
  MediumLow: "Medium-Low",
  Medium: "Medium",
  MediumHigh: "Medium-High",
  High: "High",
} as const satisfies Record<ChatterPitch, string>;

const getColumns = (t: Translations): ResultColumn<Result>[] => [
  {
    title: t["Is Target"],
    dataIndex: "isTarget",
    render: (isTarget: boolean) =>
      isTarget ? <Icon name="CheckCircle" color="Success" size={30} /> : null,
  },
  {
    title: t["Advance"],
    dataIndex: "advance",
  },
  {
    title: t["Pitch"],
    dataIndex: "pitch",
    render: (pitch: ChatterPitch) => t[ChatterLabel[pitch]],
  },
  {
    title: t["Pitch Value"],
    dataIndex: "pitch_value",
  },
];

export const ChatterFilter = () => {
  const [state] = useStatic4State();
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit = async (opts: FormState) => {
    const target = state.target;
    if (target == null) {
      return;
    }

    const chatters = await rngTools.get_chatters({
      initial_advances: 0,
      max_advances: target.advance + opts.advancesAfterTarget,
      seed: target.seed,
    });
    const chattersWithTarget = chatters.map((chatter) => ({
      ...chatter,
      isTarget: chatter.advance === target.advance,
    }));
    setResults(chattersWithTarget);
  };

  return (
    <RngToolForm<FormState, Result>
      getColumns={getColumns}
      getFields={getFields}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      rowKey="advance"
      disableGenerate={state.target == null}
      submitTrackerId="static4_chatter_filter"
    />
  );
};
