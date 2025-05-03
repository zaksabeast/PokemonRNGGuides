import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  Icon,
  FormikSelect,
  RngToolForm,
  RngToolSubmit,
  Field,
} from "~/components";
import { rngTools, type Gen2Spread } from "~/rngTools";
import { useTranslator, Translations, Translator } from "~/utils/siteLanguage";
import { z } from "zod";
import { HexSchema } from "~/utils/number";

const englishTranslations = {
  Advance: "Advance",
  State: "State",
  Shiny: "Shiny",
  "Max DV": "Max DV",
  "ADiv Index": "ADiv Index",
  "SDiv Index": "SDiv Index",
  Div: "Div",
  "Start Advance": "Start Advance",
  "Advance Count": "Advance Count",
  Filter: "Filter",
  Any: "Any",
  Generate: "Generate",
} as const;

const translations = {
  en: englishTranslations,
  es: {
    "ADiv Index": "Índice ADiv",
    "SDiv Index": "Índice SDiv",
    Div: "Div",
    State: "Estado",
    "Start Advance": "Avance pausado",
    "Advance Count": "Conteo de avances",
    Filter: "Filtro",
    Any: "Cualquiera",
    Shiny: "Brillante",
    "Max DV": "DV Max",
    Generate: "Generar",
    Advance: "Avance",
  },
  zh: {
    Advance: "帧数",
    State: "State",
    Shiny: "异色",
    "Max DV": "Max DV",
    "ADiv Index": "ADiv Index",
    "SDiv Index": "SDiv Index",
    Div: "Div",
    "Start Advance": "起始帧数",
    "Advance Count": "最大帧数",
    Filter: "筛选",
    Any: "任意",
    Generate: "计算",
  },
} as const satisfies Translations<typeof englishTranslations>;

const YesIcon = () => <Icon name="CheckCircle" color="Success" size={20} />;

const getColumns = (
  t: Translator<typeof translations>,
): ResultColumn<Gen2Spread>[] => {
  return [
    {
      title: t("Advance"),
      dataIndex: "advance",
    },
    {
      title: t("State"),
      dataIndex: "state",
      monospace: true,
      render: (state) => state.toString(16).padStart(4, "0"),
    },
    {
      title: t("Shiny"),
      dataIndex: "shiny",
      render: (shiny) => (shiny ? <YesIcon /> : null),
    },
    {
      title: t("Max DV"),
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

const getFields = (t: Translator<typeof translations>): Field[] => {
  return [
    {
      label: t("ADiv Index"),
      input: (
        <FormikNumberInput<FormState> name="adivIndex" numType="decimal" />
      ),
    },
    {
      label: t("SDiv Index"),
      input: (
        <FormikNumberInput<FormState> name="sdivIndex" numType="decimal" />
      ),
    },
    {
      label: t("Div"),
      input: <FormikNumberInput<FormState> name="div" numType="hex" />,
    },
    {
      label: t("State"),
      input: <FormikNumberInput<FormState> name="state" numType="hex" />,
    },
    {
      label: t("Start Advance"),
      input: (
        <FormikNumberInput<FormState> name="startAdvance" numType="decimal" />
      ),
    },
    {
      label: t("Advance Count"),
      input: (
        <FormikNumberInput<FormState>
          name="advanceCount"
          disabled
          numType="decimal"
        />
      ),
    },
    {
      label: t("Filter"),
      input: (
        <FormikSelect<FormState, "filter">
          name="filter"
          options={[
            {
              label: t("Any"),
              value: "Any",
            },
            {
              label: t("Shiny"),
              value: "Shiny",
            },
            {
              label: t("Max DV"),
              value: "MaxDv",
            },
          ]}
        />
      ),
    },
  ];
};

type Props = {
  type: "starter" | "celebi";
  language: keyof typeof translations;
};

export interface DivParams {
  adiv: number;
  sdiv: number;
  adiv_index: number;
  sdiv_index: number;
  state: number;
}

export const Gen2PokemonRng = ({ type, language }: Props) => {
  const t = useTranslator(translations, language);
  const fields = React.useMemo(() => getFields(t), [t]);
  const columns = React.useMemo(() => getColumns(t), [t]);
  const [results, setResults] = React.useState<Gen2Spread[]>([]);
  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const generator =
        type === "starter"
          ? rngTools.crystal_generate_starters
          : rngTools.crystal_generate_celebi;

      const config = {
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
    },
    [type],
  );

  return (
    <RngToolForm<FormState, Gen2Spread>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId={
        type === "starter" ? "generate_gen2_starter" : "generate_gen2_celebi"
      }
    />
  );
};
