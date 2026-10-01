import React from "react";
import { ResultColumn } from "~/components";
import {
  FieldRow,
  FormNumberField,
  FormSection,
  FormSwitchField,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import {
  rngTools,
  PokeRadarNoChainState,
  PokeRadarChainState,
  PokeRadarPatch,
} from "~/rngTools";
import { PokeRadarPatches } from "./patch";
import { z } from "zod";
import { HexSchema } from "~/utils/number";
import { Translations } from "~/translations";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";

type ChainResult = {
  WithChain: PokeRadarChainState[];
  NoChain?: never;
};

type NoChainResult = {
  WithChain?: never;
  NoChain: PokeRadarNoChainState[];
};

type Result = ChainResult | NoChainResult;

type LooseColumns = Partial<PokeRadarChainState & PokeRadarNoChainState>;

const getWithChainColumns = (t: Translations): ResultColumn<LooseColumns>[] => [
  {
    title: t["Advance"],
    dataIndex: "advance",
  },
  {
    title: t["Shiny"],
    dataIndex: "shiny",
    render: (shiny) => (shiny ? "Yes" : "No"),
  },
  {
    title: t["State"],
    dataIndex: "state",
    monospace: true,
    render: (state) =>
      state
        ?.map((num) => num.toString(16).padStart(8, "0").toUpperCase())
        .reverse()
        .join(", "),
  },
];

const getNoChainColumns = (t: Translations): ResultColumn<LooseColumns>[] => [
  {
    title: t["Advance"],
    dataIndex: "advance",
  },
  {
    title: t["Shiny"],
    dataIndex: "shiny",
    render: (shiny) => (shiny ? "Yes" : "No"),
  },
  {
    title: t["Sync"],
    dataIndex: "sync",
    render: (sync) => (sync ? "Yes" : "No"),
  },
  {
    title: t["State"],
    dataIndex: "state",
    render: (state) =>
      state
        ?.map((num) => num.toString(16).padStart(8, "0").toUpperCase())
        .reverse()
        .join(", "),
  },
];

const Validator = z.object({
  seed: HexSchema(0xffffffff),
  party_count: z.number().int().min(1).max(6),
  initial_advances: z.number().int().min(0),
  max_advances: z.number().int().min(0),
  chain: z.number().int().min(0),
  bonus_music: z.boolean(),
  filter_shiny: z.boolean(),
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  seed: 0,
  party_count: 1,
  initial_advances: 0,
  max_advances: 0,
  chain: 0,
  bonus_music: false,
  filter_shiny: false,
};

const Fields = () => {
  const t = useActiveRouteTranslations();

  return (
    <>
      <FormSection title={t["Your game"]}>
        <FormNumberField<FormState>
          name="seed"
          label={t["TinyMT u32 Seed"]}
          numType="hex"
        />
        <FieldRow>
          <FormNumberField<FormState>
            name="party_count"
            label={t["Party Count"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="chain"
            label={t["Chain"]}
            numType="decimal"
          />
        </FieldRow>
        <FormSwitchField<FormState>
          name="bonus_music"
          label={t["Bonus Music"]}
        />
      </FormSection>

      <FormSection title={t["Search"]}>
        <FieldRow>
          <FormNumberField<FormState>
            name="initial_advances"
            label={t["Initial Advances"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="max_advances"
            label={t["Max Advances"]}
            numType="decimal"
          />
        </FieldRow>
      </FormSection>

      <FormSection title={t["Filters"]}>
        <FormSwitchField<FormState> name="filter_shiny" label={t["Shiny"]} />
      </FormSection>
    </>
  );
};

export const XyPokeRadar = () => {
  const t = useActiveRouteTranslations();
  const [results, setResults] = React.useState<Result>({
    NoChain: [],
  });
  const [selectedPatches, setSelectedPatches] = React.useState<
    PokeRadarPatch[]
  >([]);

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    const results = await rngTools.generate_poke_radar_states({
      seed: opts.seed,
      initial_advances: opts.initial_advances,
      max_advances: opts.max_advances,
      party_count: opts.party_count,
      chain: opts.chain,
      bonus_music: opts.bonus_music,
      filter_shiny: opts.filter_shiny,
      filter_slot: null,
    });

    setResults(results);
  };

  return (
    <>
      <ToolForm<FormState, LooseColumns>
        columns={
          results.NoChain == null
            ? getWithChainColumns(t)
            : getNoChainColumns(t)
        }
        results={results.NoChain == null ? results.WithChain : results.NoChain}
        initialValues={initialValues}
        validationSchema={Validator}
        onSubmit={onSubmit}
        onClickResultRow={
          results.NoChain == null
            ? (row) => setSelectedPatches(row?.patches ?? [])
            : undefined
        }
        rowKey="advance"
        submitTrackerId="generate_xy_poke_radar"
      >
        <Fields />
      </ToolForm>
      {results.WithChain != null && (
        <PokeRadarPatches patches={selectedPatches} />
      )}
    </>
  );
};
