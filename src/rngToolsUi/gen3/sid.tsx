import React from "react";
import { ResultColumn } from "~/components";
import {
  FieldRow,
  FormNumberField,
  FormSection,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { rngTools } from "~/rngTools";
import { z } from "zod";
import { HexSchema } from "~/utils/number";

type GeneratorResult = { sid: number };

const columns: ResultColumn<GeneratorResult>[] = [
  {
    title: "SID",
    dataIndex: "sid",
  },
];

const Validator = z.object({
  tid: z.number().int().min(0).max(65535),
  feebasSeed: HexSchema(0xffff),
  initialAdvances: z.number().int().min(0),
  maxAdvances: z.number().int().min(0),
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  tid: 0,
  feebasSeed: 0,
  initialAdvances: 0,
  maxAdvances: 10000,
};

const Fields = () => {
  const t = useActiveRouteTranslations();

  return (
    <>
      <FormSection title={t["Your game"]}>
        <FieldRow>
          <FormNumberField<FormState>
            name="tid"
            label={t["TID"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="feebasSeed"
            label="Feebas Seed"
            numType="hex"
          />
        </FieldRow>
      </FormSection>

      <FormSection title={t["Search"]}>
        <FieldRow>
          <FormNumberField<FormState>
            name="initialAdvances"
            label={t["Initial Advances"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="maxAdvances"
            label={t["Max Advances"]}
            numType="decimal"
          />
        </FieldRow>
      </FormSection>
    </>
  );
};

type Props = {
  game: "rs" | "emerald";
};

export const Gen3Sid = ({ game }: Props) => {
  const [results, setResults] = React.useState<GeneratorResult[]>([]);

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    const generate =
      game === "rs"
        ? rngTools.rs_sid_from_feebas_seed
        : rngTools.emerald_sid_from_feebas_seed;

    const results = await generate(
      opts.tid,
      opts.feebasSeed,
      opts.initialAdvances,
      opts.maxAdvances,
    );

    setResults([...results].map(({ sid }) => ({ sid })));
  };

  return (
    <ToolForm<FormState, GeneratorResult>
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="generate_gen3_sid"
    >
      <Fields />
    </ToolForm>
  );
};
