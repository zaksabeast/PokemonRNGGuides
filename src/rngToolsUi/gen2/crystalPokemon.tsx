import React from "react";
import { ResultColumn, Icon } from "~/components";
import {
  FieldRow,
  FormNumberField,
  FormRadioField,
  FormSection,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { rngTools, type Gen2Spread, type DivParams } from "~/rngTools";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { Translations } from "~/translations";
import { z } from "zod";
import { HexSchema } from "~/utils/number";

const YesIcon = () => <Icon name="CheckCircle" color="Success" size={20} />;

const getColumns = (t: Translations): ResultColumn<Gen2Spread>[] => {
  return [
    {
      title: t["Advance"],
      dataIndex: "advance",
    },
    {
      title: t["State"],
      dataIndex: "state",
      monospace: true,
      render: (state) => state.toString(16).padStart(4, "0"),
    },
    {
      title: t["Shiny"],
      dataIndex: "shiny",
      render: (shiny) => (shiny ? <YesIcon /> : null),
    },
    {
      title: t["Max DV"],
      dataIndex: "max_dv",
      render: (max_dv) => (max_dv ? <YesIcon /> : null),
    },
  ];
};

const Validator = z.object({
  div: HexSchema(0xffff),
  adivIndex: z.number().int().min(0).max(0x4000),
  sdivIndex: z.number().int().min(0).max(0x4000),
  state: HexSchema(0xffff),
  startAdvance: z.number().int().min(0),
  advanceCount: z.number().int().min(0),
  filter: z.enum(["Any", "Shiny", "MaxDv"]),
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  div: 0,
  adivIndex: 0,
  sdivIndex: 0,
  state: 0,
  startAdvance: 0,
  advanceCount: 10000,
  filter: "Shiny",
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

      <FormSection title={t["Filters"]}>
        <FormRadioField<FormState>
          name="filter"
          label={t["Filter"]}
          cellSize="word"
          options={[
            { label: t["Any"], value: "Any" },
            { label: t["Shiny"], value: "Shiny" },
            { label: t["Max DV"], value: "MaxDv" },
          ]}
        />
      </FormSection>
    </>
  );
};

type Props = {
  type: "starter" | "celebi";
};

export const Gen2PokemonRng = ({ type }: Props) => {
  const [results, setResults] = React.useState<Gen2Spread[]>([]);
  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    const generator =
      type === "starter"
        ? rngTools.crystal_generate_starters
        : rngTools.crystal_generate_celebi;

    const config: DivParams = {
      adiv: opts.div >>> 8,
      sdiv: opts.div & 0xff,
      adiv_index: opts.adivIndex,
      sdiv_index: opts.sdivIndex,
      state: opts.state,
    };
    const results = await generator(
      config,
      opts.startAdvance,
      opts.startAdvance + opts.advanceCount,
      opts.filter,
    );
    setResults(results);
  };

  return (
    <ToolForm<FormState, Gen2Spread>
      getColumns={getColumns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId={
        type === "starter" ? "generate_gen2_starter" : "generate_gen2_celebi"
      }
    >
      <Fields />
    </ToolForm>
  );
};
