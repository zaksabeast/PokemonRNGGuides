import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikSwitch,
} from "~/components";
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
  state3: HexSchema(0xffffffff),
  state2: HexSchema(0xffffffff),
  state1: HexSchema(0xffffffff),
  state0: HexSchema(0xffffffff),
  party_count: z.number().int().min(1).max(6),
  initial_advances: z.number().int().min(0),
  max_advances: z.number().int().min(0),
  chain: z.number().int().min(0),
  bonus_music: z.boolean(),
  filter_shiny: z.boolean(),
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  state3: 0,
  state2: 0,
  state1: 0,
  state0: 0,
  party_count: 1,
  initial_advances: 0,
  max_advances: 0,
  chain: 0,
  bonus_music: false,
  filter_shiny: false,
};

const fields: Field[] = [
  {
    label: "State[3]",
    input: <FormikNumberInput<FormState> name="state3" numType="hex" />,
  },
  {
    label: "State[2]",
    input: <FormikNumberInput<FormState> name="state2" numType="hex" />,
  },
  {
    label: "State[1]",
    input: <FormikNumberInput<FormState> name="state1" numType="hex" />,
  },
  {
    label: "State[0]",
    input: <FormikNumberInput<FormState> name="state0" numType="hex" />,
  },
  {
    label: "Initial Advances",
    input: (
      <FormikNumberInput<FormState> name="initial_advances" numType="decimal" />
    ),
  },
  {
    label: "Max Advances",
    input: (
      <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
    ),
  },
  {
    label: "Party Count",
    input: (
      <FormikNumberInput<FormState> name="party_count" numType="decimal" />
    ),
  },
  {
    label: "Chain",
    input: <FormikNumberInput<FormState> name="chain" numType="decimal" />,
  },
  {
    label: "Bonus Music",
    input: <FormikSwitch<FormState> name="bonus_music" />,
  },
  {
    label: "Filter Shiny",
    input: <FormikSwitch<FormState> name="filter_shiny" />,
  },
];

export const XyPokeRadar = () => {
  const t = useActiveRouteTranslations();
  const [results, setResults] = React.useState<Result>({
    NoChain: [],
  });
  const [selectedPatches, setSelectedPatches] = React.useState<
    PokeRadarPatch[]
  >([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const results = await rngTools.generate_poke_radar_states({
      state: [opts.state0, opts.state1, opts.state2, opts.state3],
      initial_advances: opts.initial_advances,
      max_advances: opts.max_advances,
      party_count: opts.party_count,
      chain: opts.chain,
      bonus_music: opts.bonus_music,
      filter_shiny: opts.filter_shiny,
      filter_slot: null,
    });

    setResults(results);
  }, []);

  return (
    <>
      <RngToolForm<FormState, LooseColumns>
        fields={fields}
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
            ? (row) => setSelectedPatches(row.patches ?? [])
            : undefined
        }
        rowKey="advance"
        submitTrackerId="generate_xy_poke_radar"
      />
      {results.WithChain != null && (
        <PokeRadarPatches patches={selectedPatches} />
      )}
    </>
  );
};
