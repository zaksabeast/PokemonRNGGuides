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
import { rngTools, type Gen2Spread, type DivParams } from "~/rngTools";
import { t } from "~/translations";
import { z } from "zod";
import { HexSchema } from "~/utils/number";
import { useActiveRouteLanguage } from "~/hooks/useActiveRoute";
import { LanguageKey } from "~/guides";

const YesIcon = () => <Icon name="CheckCircle" color="Success" size={20} />;

const getColumns = (language: LanguageKey): ResultColumn<Gen2Spread>[] => {
  return [
    {
      title: t("Advance", language),
      dataIndex: "advance",
    },
    {
      title: t("State", language),
      dataIndex: "state",
      monospace: true,
      render: (state) => state.toString(16).padStart(4, "0"),
    },
    {
      title: t("Shiny", language),
      dataIndex: "shiny",
      render: (shiny) => (shiny ? <YesIcon /> : null),
    },
    {
      title: t("Max DV", language),
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

const getFields = (language: LanguageKey): Field[] => {
  return [
    {
      label: t("ADiv Index", language),
      input: (
        <FormikNumberInput<FormState> name="adivIndex" numType="decimal" />
      ),
    },
    {
      label: t("SDiv Index", language),
      input: (
        <FormikNumberInput<FormState> name="sdivIndex" numType="decimal" />
      ),
    },
    {
      label: t("Div", language),
      input: <FormikNumberInput<FormState> name="div" numType="hex" />,
    },
    {
      label: t("State", language),
      input: <FormikNumberInput<FormState> name="state" numType="hex" />,
    },
    {
      label: t("Start Advance", language),
      input: (
        <FormikNumberInput<FormState> name="startAdvance" numType="decimal" />
      ),
    },
    {
      label: t("Advance Count", language),
      input: (
        <FormikNumberInput<FormState>
          name="advanceCount"
          disabled
          numType="decimal"
        />
      ),
    },
    {
      label: t("Filter", language),
      input: (
        <FormikSelect<FormState, "filter">
          name="filter"
          options={[
            {
              label: t("Any", language),
              value: "Any",
            },
            {
              label: t("Shiny", language),
              value: "Shiny",
            },
            {
              label: t("Max DV", language),
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
};

export const Gen2PokemonRng = ({ type }: Props) => {
  const language = useActiveRouteLanguage();
  const fields = React.useMemo(() => getFields(language), [language]);
  const columns = React.useMemo(() => getColumns(language), [language]);
  const [results, setResults] = React.useState<Gen2Spread[]>([]);
  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
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
      submitButtonLabel={t("Generate", language)}
      submitTrackerId={
        type === "starter" ? "generate_gen2_starter" : "generate_gen2_celebi"
      }
    />
  );
};
