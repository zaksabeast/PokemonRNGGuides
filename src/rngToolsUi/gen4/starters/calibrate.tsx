import React from "react";
import {
  Button,
  Field,
  FormikSelect,
  Icon,
  ResultColumn,
  RngToolForm,
} from "~/components";
import {
  Characteristic,
  Gen4StaticPokemon,
  RngDateTime,
  rngTools,
  StatsValue,
} from "~/rngTools";
import { z } from "zod";
import { natureOptions } from "~/components/pkmFilter";
import { toOptions } from "~/utils/options";
import { useCurrentStep } from "~/components/stepper/state";
import { Gen4Starter, starterTimer, useStarterState } from "./state";
import {
  getGen3BaseStats,
  maxIvs,
  minIvs,
  nature,
  StatFieldsSchema,
} from "~/types";
import { getStatFields } from "~/rngToolsUi/shared/statFields";
import { FormikRadio } from "~/components/radio";
import { useGen4Timer } from "~/hooks/useGen4Timer";
import { formatOffset } from "~/utils/offsetSymbol";
import { sortBy, startCase } from "lodash-es";
import pMap from "p-map";
import { match } from "ts-pattern";

type Result = Gen4StaticPokemon & {
  key: string;
  delay: number;
  flipDelay: boolean;
  delayOffset: number;
  advanceOffset: number;
  seed: number;
};

type CalibrateButtonProps = {
  target: Result;
};

const CalibrateButton = ({ target }: CalibrateButtonProps) => {
  const [, setCurrentStep] = useCurrentStep();
  const { calibrate } = useGen4Timer(starterTimer);
  return (
    <Button
      trackerId="calibrate_gen4_starter"
      onClick={() => {
        calibrate(target.delay);
        setCurrentStep((prev) => prev - 1);
      }}
    >
      Calibrate
    </Button>
  );
};

const starterGenders = ["Male", "Female"] as const;
const characteristics = [
  "AlertToSounds",
  "ALittleQuickTempered",
  "CapableOfTakingHits",
  "GoodEndurance",
  "GoodPerseverance",
  "HatesToLose",
  "HighlyCurious",
  "HighlyPersistent",
  "ImpetuousAndSilly",
  "LikesToFight",
  "LikesToRelax",
  "LikesToRun",
  "LikesToThrashAbout",
  "LovesToEat",
  "Mischievous",
  "NodsOffALot",
  "OftenLostInThought",
  "ProudOfItsPower",
  "QuickTempered",
  "QuickToFlee",
  "ScattersThingsOften",
  "SomewhatOfAClown",
  "SomewhatStubborn",
  "SomewhatVain",
  "StronglyDefiant",
  "StrongWilled",
  "SturdyBody",
  "TakesPlentyOfSiestas",
  "ThoroughlyCunning",
  "VeryFinicky",
] as const satisfies Characteristic[];

const Validator = z
  .object({
    nature: z.enum(nature),
    gender: z.enum(starterGenders),
    filter_characteristic: z.enum(characteristics),
  })
  .merge(StatFieldsSchema);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  hpStat: 0,
  atkStat: 0,
  defStat: 0,
  spaStat: 0,
  spdStat: 0,
  speStat: 0,
  nature: "Adamant",
  gender: "Male",
  filter_characteristic: "AlertToSounds",
};

const columns: ResultColumn<Result>[] = [
  {
    title: "Calibrate",
    dataIndex: "key",
    render: (_, target) => <CalibrateButton target={target} />,
  },
  {
    title: "Delay Offset",
    dataIndex: "delayOffset",
    render: formatOffset,
  },
  {
    title: "Advance Offset",
    dataIndex: "advanceOffset",
  },
  {
    title: "Flip Delay",
    dataIndex: "flipDelay",
    render: (flipDelay) =>
      flipDelay ? <Icon name="CheckCircle" color="Success" size={30} /> : null,
  },
  {
    title: "Seed",
    dataIndex: "seed",
    monospace: true,
    render: (val) => val.toString(16).padStart(8, "0").toUpperCase(),
  },
];

const defaultDateTime: RngDateTime = {
  day: 1,
  month: 1,
  year: 2000,
  hour: 0,
  minute: 0,
  second: 0,
};

const getStarterGame = (starter: Gen4Starter) => {
  return match<Gen4Starter, "Diamond" | "HeartGold">(starter)
    .with("Turtwig", () => "Diamond")
    .with("Chimchar", () => "Diamond")
    .with("Piplup", () => "Diamond")
    .with("Chikorita", () => "HeartGold")
    .with("Cyndaquil", () => "HeartGold")
    .with("Totodile", () => "HeartGold")
    .exhaustive();
};

export const CalibrateStarter4 = () => {
  const [state] = useStarterState();
  const [results, setResults] = React.useState<Result[]>([]);

  const targetDateTime = state.target?.seed_time.datetime ?? defaultDateTime;
  const targetDelay = state.target?.seed_time.delay ?? 0;
  const targetAdvance = state.target?.advance ?? 0;
  const targetSpecies = state.species;
  const minMaxStats = state.minMaxStats;

  const fields = React.useMemo((): Field[] => {
    return [
      {
        label: "Gender",
        input: (
          <FormikRadio<FormState, "gender">
            name="gender"
            options={toOptions(starterGenders)}
          />
        ),
      },
      {
        label: "Nature",
        input: (
          <FormikSelect<FormState, "nature">
            name="nature"
            options={natureOptions.required}
          />
        ),
      },
      {
        label: "Characteristic",
        input: (
          <FormikSelect<FormState, "filter_characteristic">
            name="filter_characteristic"
            options={toOptions(characteristics, startCase)}
          />
        ),
      },
      ...getStatFields<FormState>(minMaxStats),
    ];
  }, [minMaxStats]);

  const onSubmit = React.useCallback(
    async (opts: FormState) => {
      const minDelay = Math.max(targetDelay - 500, 0);
      const maxDelay = targetDelay + 500;

      const baseStats = getGen3BaseStats(targetSpecies);

      if (baseStats == null) {
        return;
      }

      const caughtStats: StatsValue = {
        hp: opts.hpStat,
        atk: opts.atkStat,
        def: opts.defStat,
        spa: opts.spaStat,
        spd: opts.spdStat,
        spe: opts.speStat,
      };

      const seedTimes = await rngTools.calc_gen4_seeds(
        targetDateTime,
        minDelay,
        maxDelay,
      );

      const results = await pMap(seedTimes, async (seedTime) => {
        const states = await rngTools.generate_static4_states({
          tid: 0,
          sid: 0,
          initial_advances: Math.max(targetAdvance - 10, 0),
          max_advances: 20,
          game: getStarterGame(targetSpecies),
          encounter: targetSpecies,
          lead: null,
          seed: seedTime.seed,
          filter_characteristic: opts.filter_characteristic,
          filter: {
            shiny: false,
            ability: null,
            min_ivs: minIvs,
            max_ivs: maxIvs,
            nature: opts.nature,
            gender: opts.gender,
            stats: {
              lvl: 5,
              base_stats: baseStats,
              min_stats: caughtStats,
              max_stats: caughtStats,
            },
          },
        });
        return states.map(
          (state): Result => ({
            ...state,
            seed: seedTime.seed,
            delay: seedTime.delay,
            advanceOffset: state.advance - targetAdvance,
            flipDelay: targetDelay % 2 !== seedTime.delay % 2,
            key: `${seedTime.seed}-${state.pid}`,
            delayOffset: seedTime.delay - targetDelay,
          }),
        );
      });

      const sortedResults = sortBy(results.flat(), (res) =>
        Math.abs(res.delayOffset),
      );
      setResults(sortedResults);
    },
    [targetAdvance, targetDelay, targetDateTime, targetSpecies],
  );

  return (
    <RngToolForm<FormState, Result>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      rowKey="key"
      submitTrackerId="search_hit_gen4_starter"
    />
  );
};
