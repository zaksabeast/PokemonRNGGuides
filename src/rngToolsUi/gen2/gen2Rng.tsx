import React from "react";
import { ResultColumn } from "~/components";
import {
  FieldRow,
  FormNumberField,
  FormSection,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { rngTools } from "~/rngTools";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { HexSchema } from "~/utils/number";
import { z } from "zod";
import { Translations } from "~/translations";

type Result = {
  advance: number;
  rand: number;
  div: number;
};

const getColumns = (t: Translations): ResultColumn<Result>[] => [
  {
    title: t["Advance"],
    dataIndex: "advance",
  },
  {
    title: t["State"],
    dataIndex: "rand",
    monospace: true,
    render: (rand) => rand.toString(16).padStart(4, "0"),
  },
  {
    title: t["Div"],
    dataIndex: "div",
    monospace: true,
    render: (div) => div.toString(16).padStart(4, "0"),
  },
];

const Validator = z.object({
  div: HexSchema(0xffff),
  adivIndex: z.number().int().min(0).max(0x4000),
  sdivIndex: z.number().int().min(0).max(0x4000),
  state: HexSchema(0xffff),
  startAdvance: z.number().int().min(0),
  advanceCount: z.number().int().min(0),
});

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  div: 0,
  adivIndex: 0,
  sdivIndex: 0,
  state: 0,
  startAdvance: 0,
  advanceCount: 10000,
};

const Fields = () => {
  const t = useActiveRouteTranslations();

  return (
    <>
      <FormSection title={t["Your game"]}>
        <FieldRow>
          <FormNumberField<FormState>
            name="adivIndex"
            label={t["ADiv Index"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="sdivIndex"
            label={t["SDiv Index"]}
            numType="decimal"
          />
        </FieldRow>
        <FieldRow>
          <FormNumberField<FormState>
            name="div"
            label={t["Div"]}
            numType="hex"
          />
          <FormNumberField<FormState>
            name="state"
            label={t["State"]}
            numType="hex"
          />
        </FieldRow>
      </FormSection>

      <FormSection title={t["Search"]}>
        <FieldRow>
          <FormNumberField<FormState>
            name="startAdvance"
            label={t["Start Advance"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="advanceCount"
            label={t["Advance Count"]}
            numType="decimal"
            disabled
          />
        </FieldRow>
      </FormSection>
    </>
  );
};

export const Gen2Rng = () => {
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    const results = await rngTools.gen2_generate_rng_states(
      opts.div >>> 8,
      opts.div & 0xff,
      opts.adivIndex,
      opts.sdivIndex,
      opts.state,
      opts.startAdvance,
      opts.startAdvance + opts.advanceCount,
    );
    setResults(
      results.map(({ add_div, sub_div, advance, rand }) => ({
        advance,
        rand,
        div: (add_div << 8) | sub_div,
      })),
    );
  };

  return (
    <ToolForm<FormState, Result>
      getColumns={getColumns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="generate_gen2_rng"
    >
      <Fields />
    </ToolForm>
  );
};
