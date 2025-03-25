import React from "react";
import {
  FormikInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikSwitch,
  Typography,
} from "~/components";
import {
  rngTools,
  PokeRadarNoChainState,
  PokeRadarChainState,
  PokeRadarPatch,
} from "~/rngTools";
import {
  DecimalString,
  fromDecimalString,
  fromHexString,
  HexString,
  toDecimalString,
  toHexString,
} from "~/utils/number";
import { PokeRadarPatches } from "./patch";

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

const withChainColumns: ResultColumn<LooseColumns>[] = [
  {
    title: "Advance",
    dataIndex: "advance",
    key: "advance",
  },
  {
    title: "Shiny",
    dataIndex: "shiny",
    key: "shiny",
    render: (shiny) => (shiny ? "Yes" : "No"),
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
    render: (state) => (
      <Typography.Text whiteSpace="nowrap">
        {state
          ?.map((num) => num.toString(16).padStart(8, "0").toUpperCase())
          .reverse()
          .join(", ")}
      </Typography.Text>
    ),
  },
];

const noChainColumns: ResultColumn<LooseColumns>[] = [
  {
    title: "Advance",
    dataIndex: "advance",
    key: "advance",
  },
  {
    title: "Shiny",
    dataIndex: "shiny",
    key: "shiny",
    render: (shiny) => (shiny ? "Yes" : "No"),
  },
  {
    title: "Sync",
    dataIndex: "sync",
    key: "sync",
    render: (sync) => (sync ? "true" : "false"),
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
    render: (state) => (
      <Typography.Text whiteSpace="nowrap">
        {state
          ?.map((num) => num.toString(16).padStart(8, "0").toUpperCase())
          .reverse()
          .join(", ")}
      </Typography.Text>
    ),
  },
];

type FormState = {
  state3: HexString;
  state2: HexString;
  state1: HexString;
  state0: HexString;
  partyCount: DecimalString;
  initialAdvances: DecimalString;
  maxAdvances: DecimalString;
  chain: DecimalString;
  bonusMusic: boolean;
  filterShiny: boolean;
};

const initialValues: FormState = {
  state3: toHexString(0),
  state2: toHexString(0),
  state1: toHexString(0),
  state0: toHexString(0),
  partyCount: toDecimalString(1),
  initialAdvances: toDecimalString(0),
  maxAdvances: toDecimalString(0),
  chain: toDecimalString(0),
  bonusMusic: false,
  filterShiny: false,
};

const fields: Field[] = [
  {
    label: "State[3]",
    input: <FormikInput<FormState> name="state3" />,
  },
  {
    label: "State[2]",
    input: <FormikInput<FormState> name="state2" />,
  },
  {
    label: "State[1]",
    input: <FormikInput<FormState> name="state1" />,
  },
  {
    label: "State[0]",
    input: <FormikInput<FormState> name="state0" />,
  },
  {
    label: "Initial Advances",
    input: <FormikInput<FormState> name="initialAdvances" />,
  },
  {
    label: "Max Advances",
    input: <FormikInput<FormState> name="maxAdvances" />,
  },
  {
    label: "Party Count",
    input: <FormikInput<FormState> name="partyCount" />,
  },
  {
    label: "Chain",
    input: <FormikInput<FormState> name="chain" />,
  },
  {
    label: "Bonus Music",
    input: <FormikSwitch<FormState, "bonusMusic"> name="bonusMusic" />,
  },
  {
    label: "Filter Shiny",
    input: <FormikSwitch<FormState, "filterShiny"> name="filterShiny" />,
  },
];

export const XyPokeRadar = () => {
  const [results, setResults] = React.useState<Result>({
    NoChain: [],
  });
  const [selectedPatches, setSelectedPatches] = React.useState<
    PokeRadarPatch[]
  >([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const state3 = fromHexString(opts.state3);
    const state2 = fromHexString(opts.state2);
    const state1 = fromHexString(opts.state1);
    const state0 = fromHexString(opts.state0);
    const initialAdvances = fromDecimalString(opts.initialAdvances);
    const maxAdvances = fromDecimalString(opts.maxAdvances);
    const partyCount = fromDecimalString(opts.partyCount);
    const chain = fromDecimalString(opts.chain);

    if (
      state3 == null ||
      state2 == null ||
      state1 == null ||
      state0 == null ||
      initialAdvances == null ||
      maxAdvances == null ||
      partyCount == null ||
      chain == null
    ) {
      return;
    }

    const results = await rngTools.generate_poke_radar_states({
      state: [state0, state1, state2, state3],
      initial_advances: initialAdvances,
      max_advances: maxAdvances,
      party_count: partyCount,
      chain,
      bonus_music: opts.bonusMusic,
      filter_shiny: opts.filterShiny,
      filter_slot: undefined,
    });

    setResults(results);
  }, []);

  return (
    <>
      <RngToolForm<FormState, LooseColumns>
        fields={fields}
        columns={results.NoChain == null ? withChainColumns : noChainColumns}
        results={results.NoChain == null ? results.WithChain : results.NoChain}
        initialValues={initialValues}
        onSubmit={onSubmit}
        onClickResultRow={(row) => setSelectedPatches(row.patches ?? [])}
        rowKey="advance"
        submitTrackerId="generate_xy_poke_radar"
      />
      {results.WithChain != null && (
        <PokeRadarPatches patches={selectedPatches} />
      )}
    </>
  );
};
