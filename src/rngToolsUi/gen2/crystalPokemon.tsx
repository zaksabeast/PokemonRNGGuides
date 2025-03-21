import React from "react";
import {
  FormikInput,
  ResultColumn,
  Icon,
  FormikSelect,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import { rngTools, Gen2PokeFilter, type Gen2Spread } from "~/rngTools";
import {
  DecimalString,
  fromDecimalString,
  fromHexString,
  HexString,
  toDecimalString,
  toHexString,
} from "~/utils/number";
import { useTranslator, Translations, Translator } from "~/utils/siteLanguage";

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
} as const satisfies Translations<typeof englishTranslations>;

const YesIcon = () => <Icon name="CheckCircle" color="Success" size={20} />;

const getColumns = (
  t: Translator<typeof translations>,
): ResultColumn<Gen2Spread>[] => {
  return [
    {
      title: t("Advance"),
      dataIndex: "advance",
      key: "advance",
    },
    {
      title: t("State"),
      dataIndex: "state",
      key: "state",
      render: (state) => state.toString(16).padStart(4, "0"),
    },
    {
      title: t("Shiny"),
      dataIndex: "shiny",
      key: "shiny",
      render: (shiny) => (shiny ? <YesIcon /> : null),
    },
    {
      title: t("Max DV"),
      dataIndex: "max_dv",
      key: "max_dv",
      render: (max_dv) => (max_dv ? <YesIcon /> : null),
    },
  ];
};

type Field = {
  label: string;
  input: React.ReactNode;
};

type FormState = {
  div: HexString;
  adivIndex: DecimalString;
  sdivIndex: DecimalString;
  state: HexString;
  startAdvance: DecimalString;
  advanceCount: DecimalString;
  filter: Gen2PokeFilter;
};

const initialValues: FormState = {
  div: toHexString(0),
  adivIndex: toDecimalString(0),
  sdivIndex: toDecimalString(0),
  state: toHexString(0),
  startAdvance: toDecimalString(0),
  advanceCount: toDecimalString(10000),
  filter: "Shiny",
};

const getFields = (t: Translator<typeof translations>): Field[] => {
  return [
    {
      label: t("ADiv Index"),
      input: <FormikInput<FormState> name="adivIndex" />,
    },
    {
      label: t("SDiv Index"),
      input: <FormikInput<FormState> name="sdivIndex" />,
    },
    {
      label: t("Div"),
      input: <FormikInput<FormState> name="div" />,
    },
    {
      label: t("State"),
      input: <FormikInput<FormState> name="state" />,
    },
    {
      label: t("Start Advance"),
      input: <FormikInput<FormState> name="startAdvance" />,
    },
    {
      label: t("Advance Count"),
      input: <FormikInput<FormState> name="advanceCount" disabled />,
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

export const Gen2PokemonRng = ({ type, language }: Props) => {
  const t = useTranslator(translations, language);
  const fields = React.useMemo(() => getFields(t), [t]);
  const columns = React.useMemo(() => getColumns(t), [t]);
  const [results, setResults] = React.useState<Gen2Spread[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const div = fromHexString(opts.div) ?? 0;
      const startAdvance = fromDecimalString(opts.startAdvance) ?? 0;
      const advanceCount = fromDecimalString(opts.advanceCount) ?? 0;

      const generator =
        type === "starter"
          ? rngTools.crystal_generate_starters
          : rngTools.crystal_generate_celebi;

      const results = await generator(
        div >>> 8,
        div & 0xff,
        fromDecimalString(opts.adivIndex) ?? 0,
        fromDecimalString(opts.sdivIndex) ?? 0,
        fromHexString(opts.state) ?? 0,
        fromDecimalString(opts.startAdvance) ?? 0,
        startAdvance + advanceCount,
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
      onSubmit={onSubmit}
      submitTrackerId={
        type === "starter" ? "generate_gen2_starter" : "generate_gen2_celebi"
      }
    />
  );
};
