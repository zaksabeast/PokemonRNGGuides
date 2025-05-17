import React from "react";
import { Flex, ResultColumn, RngToolForm, Typography } from "~/components";
import { PickupEggState, useHeldEggState, usePickupEggState } from "./state";
import { rngTools, StatsValue, Gen3PickupMethod } from "~/rngTools";
import { maxIvs, minIvs } from "~/types/ivs";
import { ivColumns } from "~/rngToolsUi/shared/ivColumns";
import { getGen3BaseStats } from "~/types/baseStats";
import { getStatFields } from "~/rngToolsUi/shared/statFields";
import { defaultMinMaxStats, MinMaxStats } from "~/types/stat";
import { getGen3StatRange } from "~/rngToolsUi/gen3/utils/statRange";
import { StatFields } from "~/components/statInput";
import pmap from "p-map";
import { sortBy, startCase } from "lodash-es";
import { createGen3TimerAtom } from "~/hooks/useGen3Timer";
import { ivMethods } from "./constants";
import { CalibrateButton } from "./calibrateButton";
import { Gen3Timer } from "~/components/gen3Timer";

const timerAtom = createGen3TimerAtom();

type Result = {
  advance: number;
  offset: number;
  method: Gen3PickupMethod;
  key: string;
} & StatsValue;

const getOffsetSymbol = (offset: number) => {
  if (offset > 0) {
    return "+";
  }
  if (offset < 0) {
    return "-";
  }
  return "";
};

const columns: ResultColumn<Result>[] = [
  {
    title: "Calibrate",
    dataIndex: "advance",
    render: (_, result) => (
      <CalibrateButton hitAdvance={result.advance} timer={timerAtom} />
    ),
  },
  {
    title: "Offset",
    dataIndex: "offset",
    render: (offset) => `${getOffsetSymbol(offset)}${Math.abs(offset)}`,
  },
  {
    title: "Method",
    dataIndex: "method",
    render: (method) => startCase(method),
  },
  ...ivColumns,
];

const getPotentialEggs = async (state: PickupEggState) => {
  const results = await pmap(
    ivMethods,
    async (method) => {
      const spreads = await rngTools.emerald_egg_pickup_states({
        method,
        seed: state.seed,
        parent_ivs: state.parentIvs,
        initial_advances: Math.max(state.targetAdvance - 100, 0),
        lua_adjustment: true,
        max_advances: 200,
        delay: 0,
        filter: {
          min_ivs: minIvs,
          max_ivs: maxIvs,
        },
      });
      return spreads.map((spread) => ({ ...spread, method }));
    },
    { concurrency: 3 },
  );
  return results.flat();
};

type FormState = StatFields;

const initialValues: FormState = {
  hpStat: 0,
  atkStat: 0,
  defStat: 0,
  spaStat: 0,
  spdStat: 0,
  speStat: 0,
};

export const CalibratePickupEgg = () => {
  const [heldState] = useHeldEggState();
  const [state] = usePickupEggState();
  const [potentialEggs, setPotentialEggs] = React.useState<Result[]>([]);
  const [filters, setFilters] = React.useState<StatFields>(initialValues);

  const targetAdvance = state.targetAdvance;
  const targetSpecies = heldState.eggSettings.egg_species;
  const targetNature = heldState.target?.nature ?? "Hardy";

  const [minMaxStats, setMinMaxStats] =
    React.useState<MinMaxStats>(defaultMinMaxStats);

  React.useEffect(() => {
    const runAsync = async () => {
      const stats = await getGen3StatRange(targetSpecies);
      setMinMaxStats(stats);
    };
    runAsync();
  }, [targetSpecies]);

  React.useEffect(() => {
    const runAsync = async () => {
      const baseStats = getGen3BaseStats(targetSpecies);

      if (baseStats == null) {
        setPotentialEggs([]);
        return;
      }

      const potentialEggs = await getPotentialEggs(state);
      const formattedResults = await pmap(potentialEggs, async (result) => {
        const stats = await rngTools.calculate_stats(
          baseStats,
          5,
          targetNature,
          result.ivs,
          { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
        );
        return {
          key: `${result.advance}-${result.method}`,
          advance: result.advance,
          offset: result.advance - targetAdvance,
          method: result.method,
          ...stats,
        };
      });

      const results = sortBy(formattedResults, (result) => result.advance);
      setPotentialEggs(results);
    };

    runAsync();
  }, [state, targetAdvance, targetSpecies, targetNature]);

  const fields = React.useMemo(
    () => getStatFields<StatFields>(minMaxStats),
    [minMaxStats],
  );

  const dataSource = React.useMemo(
    () =>
      potentialEggs.filter((result) => {
        return (
          result.hp === filters.hpStat &&
          result.atk === filters.atkStat &&
          result.def === filters.defStat &&
          result.spa === filters.spaStat &&
          result.spd === filters.spdStat &&
          result.spe === filters.speStat
        );
      }),
    [potentialEggs, filters],
  );

  const onSubmit = React.useCallback(
    async (opts: FormState) => setFilters(opts),
    [],
  );

  const target = potentialEggs.find(
    (egg) => egg.advance === targetAdvance && egg.method === state.targetMethod,
  );
  const targetStats =
    target == null
      ? "Unknown"
      : [
          target.hp,
          target.atk,
          target.def,
          target.spa,
          target.spd,
          target.spe,
        ].join(" / ");

  return (
    <Flex vertical gap={16} width="100%">
      <Flex vertical gap={8}>
        <Typography.Title level={5} mv={0}>
          Target Egg: {targetNature} {targetSpecies}
        </Typography.Title>
        <Typography.Title level={5} mv={0}>
          Target Method: {startCase(target?.method)}
        </Typography.Title>
        <Typography.Title level={5} mv={0}>
          Target Stats: {targetStats}
        </Typography.Title>
      </Flex>

      <RngToolForm<StatFields, Result>
        fields={fields}
        columns={columns}
        results={dataSource}
        initialValues={initialValues}
        onSubmit={onSubmit}
        submitTrackerId="generate_retail_emerald_pickup_egg"
        submitButtonLabel="Find advances matching hatched egg"
        rowKey="key"
      />
    </Flex>
  );
};

export const CalibratePickupEggTimer = () => {
  const [state] = usePickupEggState();
  const targetAdvance = state.targetAdvance;

  return (
    <Gen3Timer
      trackerId="retail_emerald_pickup_egg"
      targetAdvance={targetAdvance}
      timer={timerAtom}
    />
  );
};
