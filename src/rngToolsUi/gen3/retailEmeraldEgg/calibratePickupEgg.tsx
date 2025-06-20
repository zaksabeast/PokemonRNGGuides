import React from "react";
import {
  CalibrateTimerButton,
  Field,
  Flex,
  ResultColumn,
  RngToolForm,
  Select,
  Typography,
} from "~/components";
import { PickupEggState, useHeldEggState, usePickupEggState } from "./state";
import {
  rngTools,
  StatsValue,
  Gen3PickupMethod,
  InheritedIv,
  InheritedIvs,
  Ivs,
  Species,
  Nature,
} from "~/rngTools";
import { maxIvs, minIvs } from "~/types/ivs";
import { nullableIvColumns } from "~/rngToolsUi/shared/ivColumns";
import { getLooseBaseStats } from "~/types/baseStats";
import { getStatFields } from "~/rngToolsUi/shared/statFields";
import { defaultMinMaxStats, MinMaxStats } from "~/types/stat";
import { getStatRange } from "~/types/statRange";
import { StatFields } from "~/components/statInput";
import pmap from "p-map";
import { sortBy, startCase, mapValues } from "lodash-es";
import { createGen3TimerAtom } from "~/hooks/useGen3Timer";
import { ivMethods } from "./constants";
import { Gen3Timer } from "~/components/gen3Timer";
import { match, P } from "ts-pattern";
import { Nullable } from "~/types/utils";
import { gen3SpeciesOptions } from "~/types/species";
import { natureOptions } from "~/components/pkmFilter";
import { atom, useAtom } from "jotai";
import { formatOffset } from "~/utils/offsetSymbol";

type HeldEgg = {
  species: Species;
  nature: Nature;
};

const currentlyHeldEggAtom = atom<HeldEgg>({
  species: "Bulbasaur",
  nature: "Hardy",
});

// We use this separate from useHeldEggState
// because some users will RNG IVs without shininess,
// and need to manually set the species and nature.
const useCurrentlyHeldEgg = () => useAtom(currentlyHeldEggAtom);

const HeldEggSpeciesSelect = () => {
  const [heldEgg, setHeldEgg] = useCurrentlyHeldEgg();

  return (
    <Select<Species>
      name="species"
      options={gen3SpeciesOptions.byName}
      value={heldEgg.species}
      onChange={(value) => setHeldEgg((prev) => ({ ...prev, species: value }))}
    />
  );
};

const HeldEggNatureSelect = () => {
  const [heldEgg, setHeldEgg] = useCurrentlyHeldEgg();

  return (
    <Select<Nature>
      name="nature"
      options={natureOptions.required}
      value={heldEgg.nature}
      onChange={(value) => setHeldEgg((prev) => ({ ...prev, nature: value }))}
    />
  );
};

const hasKnownIv = (iv: InheritedIv): boolean => {
  return match(iv)
    .with({ Random: P.number }, () => true)
    .with({ Parent1: P.number }, () => true)
    .with({ Parent2: P.number }, () => true)
    .with({ Parent1: undefined }, () => false)
    .with({ Parent2: undefined }, () => false)
    .exhaustive();
};

const normalizeInheritedIv = <T,>({
  iv,
  ivDefault,
}: {
  iv: InheritedIv;
  ivDefault: T;
}): number | T => {
  return (
    match(iv)
      .with({ Random: P.number }, (matched) => matched.Random)
      .with({ Parent1: P.number }, (matched) => matched.Parent1)
      .with({ Parent2: P.number }, (matched) => matched.Parent2)
      // Assume 31 if we don't know the parent ivs.
      .with({ Parent1: undefined }, () => ivDefault)
      .with({ Parent2: undefined }, () => ivDefault)
      .exhaustive()
  );
};

const normalizeInheritedIvs = (ivs: InheritedIvs): Ivs => {
  return mapValues(ivs, (iv) => normalizeInheritedIv({ iv, ivDefault: 31 }));
};

const timerAtom = createGen3TimerAtom();

type Result = {
  advance: number;
  offset: number;
  method: Gen3PickupMethod;
  key: string;
  ivs: InheritedIvs;
} & Nullable<StatsValue>;

const columns: ResultColumn<Result>[] = [
  {
    title: "Calibrate",
    dataIndex: "advance",
    render: (_, result) => (
      <CalibrateTimerButton
        type="gen3"
        hitAdvance={result.advance}
        timer={timerAtom}
        trackerId="calibrate_retail_emerald_pickup_egg"
      />
    ),
  },
  {
    title: "Offset",
    dataIndex: "offset",
    render: formatOffset,
  },
  {
    title: "Method",
    dataIndex: "method",
    render: (method) => startCase(method),
  },
  ...nullableIvColumns,
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
  const [previouslyRngdEgg] = useHeldEggState();
  const [heldEgg, setHeldEgg] = useCurrentlyHeldEgg();
  const [state] = usePickupEggState();
  const [potentialEggs, setPotentialEggs] = React.useState<Result[]>([]);
  const [filters, setFilters] = React.useState<FormState>(initialValues);

  // If the user previously RNGd an egg, use those values.
  const previouslyRngdSpecies = previouslyRngdEgg.eggSettings.egg_species;
  const previouslyRngdNature = previouslyRngdEgg.target?.nature ?? "Hardy";
  React.useEffect(() => {
    setHeldEgg({
      species: previouslyRngdSpecies,
      nature: previouslyRngdNature,
    });
  }, [previouslyRngdSpecies, previouslyRngdNature, setHeldEgg]);

  const [minMaxStats, setMinMaxStats] =
    React.useState<MinMaxStats>(defaultMinMaxStats);

  const targetSpecies = heldEgg.species;
  const targetNature = heldEgg.nature;
  const targetAdvance = state.targetAdvance;

  React.useEffect(() => {
    const runAsync = async () => {
      const stats = await getStatRange(targetSpecies);
      setMinMaxStats(stats);
    };
    runAsync();
  }, [targetSpecies]);

  React.useEffect(() => {
    const runAsync = async () => {
      const baseStats = getLooseBaseStats(targetSpecies);

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
          normalizeInheritedIvs(result.ivs),
          { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
        );
        return {
          key: `${result.advance}-${result.method}`,
          advance: result.advance,
          offset: result.advance - targetAdvance,
          method: result.method,
          ivs: result.ivs,
          hp: hasKnownIv(result.ivs.hp) ? stats.hp : null,
          atk: hasKnownIv(result.ivs.atk) ? stats.atk : null,
          def: hasKnownIv(result.ivs.def) ? stats.def : null,
          spa: hasKnownIv(result.ivs.spa) ? stats.spa : null,
          spd: hasKnownIv(result.ivs.spd) ? stats.spd : null,
          spe: hasKnownIv(result.ivs.spe) ? stats.spe : null,
        };
      });

      const results = sortBy(formattedResults, (result) => result.advance);
      setPotentialEggs(results);
    };

    runAsync();
  }, [state, targetAdvance, targetSpecies, targetNature]);

  const fields = React.useMemo((): Field[] => {
    return [
      {
        label: "Species",
        input: <HeldEggSpeciesSelect />,
      },
      {
        label: "Nature",
        input: <HeldEggNatureSelect />,
      },
      ...getStatFields<StatFields>(minMaxStats),
    ];
  }, [minMaxStats]);

  const dataSource = React.useMemo(() => {
    return potentialEggs.filter((result) => {
      return (
        (result.hp === filters.hpStat || !hasKnownIv(result.ivs.hp)) &&
        (result.atk === filters.atkStat || !hasKnownIv(result.ivs.atk)) &&
        (result.def === filters.defStat || !hasKnownIv(result.ivs.def)) &&
        (result.spa === filters.spaStat || !hasKnownIv(result.ivs.spa)) &&
        (result.spd === filters.spdStat || !hasKnownIv(result.ivs.spd)) &&
        (result.spe === filters.speStat || !hasKnownIv(result.ivs.spe))
      );
    });
  }, [potentialEggs, filters]);

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
          target.hp ?? "?",
          target.atk ?? "?",
          target.def ?? "?",
          target.spa ?? "?",
          target.spd ?? "?",
          target.spe ?? "?",
        ].join(" / ");

  const targetIvs =
    target == null
      ? null
      : [
          target.ivs.hp,
          target.ivs.atk,
          target.ivs.def,
          target.ivs.spa,
          target.ivs.spd,
          target.ivs.spe,
        ]
          .map((iv) => normalizeInheritedIv({ iv, ivDefault: "?" }))
          .join(" / ");

  return (
    <Flex vertical gap={16} width="100%">
      <Flex vertical gap={8}>
        <Typography.Title level={5} mv={0}>
          Target Method: {startCase(target?.method)}
        </Typography.Title>
        <Typography.Title level={5} mv={0}>
          Target Stats: {targetStats}
        </Typography.Title>
        <Typography.Title level={5} mv={0}>
          Target IVs: {targetIvs}
        </Typography.Title>
      </Flex>

      <RngToolForm<FormState, Result>
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
