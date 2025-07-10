import React from "react";
import {
  CalibrateTimerButton,
  Field,
  FormikSelect,
  Icon,
  ResultColumn,
  RngToolForm,
} from "~/components";
import {
  Gen4StaticPokemon,
  RngDateTime,
  rngTools,
  StatsValue,
} from "~/rngTools";
import { z } from "zod";
import { natureOptions } from "~/components/pkmFilter";
import { toOptions } from "~/utils/options";
import { Gen4Starter, starterTimer, useStarterState } from "./state";
import {
  getStrictBaseStats,
  maxIvs,
  minIvs,
  nature,
  StatFieldsSchema,
} from "~/types";
import { getStatFields } from "~/rngToolsUi/shared/statFields";
import { FormikRadio } from "~/components/radio";
import { formatOffset } from "~/utils/offsetSymbol";
import { sortBy } from "lodash-es";
import pMap from "p-map";
import { match } from "ts-pattern";
import { characteristics, Characteristic4Options } from "../gen4types";
import { fromRngDateTime, toRngDateTime } from "~/utils/time";
import { useActiveRouteLanguage } from "~/hooks/useActiveRoute";
import { t } from "~/translations";
import { LanguageKey } from "~/guides";

type Result = Gen4StaticPokemon & {
  key: string;
  flipDelay: boolean;
  delayOffset: number;
  advanceOffset: number;
  secondOffset: number;
  seed: number;
  second: number;
  delay: number;
};

const starterGenders = ["Male", "Female"] as const;

const Validator = z
  .object({
    level: z.number().int().min(1).max(100),
    nature: z.enum(nature),
    gender: z.enum(starterGenders),
    filter_characteristic: z.enum(characteristics),
  })
  .merge(StatFieldsSchema);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  level: 5,
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

const getColumns = (language: LanguageKey): ResultColumn<Result>[] => [
  {
    title: t("Calibrate", language),
    dataIndex: "key",
    render: (_, target) => (
      <CalibrateTimerButton
        type="gen4"
        hitDelay={target.delay}
        timer={starterTimer}
        trackerId="calibrate_gen4_starter"
        previousStepOnClick
      />
    ),
  },
  {
    title: t("Delay Offset", language),
    dataIndex: "delayOffset",
    render: formatOffset,
  },
  {
    title: t("Advance Offset", language),
    dataIndex: "advanceOffset",
    render: formatOffset,
  },
  {
    title: t("Second Offset", language),
    dataIndex: "secondOffset",
    render: formatOffset,
  },
  {
    title: t("Flip Delay", language),
    dataIndex: "flipDelay",
    render: (flipDelay) =>
      flipDelay ? <Icon name="CheckCircle" color="Success" size={30} /> : null,
  },
  {
    title: t("Seed", language),
    dataIndex: "seed",
    monospace: true,
    render: (val) => val.toString(16).padStart(8, "0").toUpperCase(),
  },
  {
    title: t("Second", language),
    dataIndex: "second",
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
  const language = useActiveRouteLanguage();
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
        label: t("Gender", language),
        input: (
          <FormikRadio<FormState, "gender">
            name="gender"
            options={toOptions(starterGenders)}
          />
        ),
      },
      {
        label: t("Nature", language),
        input: (
          <FormikSelect<FormState, "nature">
            name="nature"
            options={natureOptions.required}
          />
        ),
      },
      {
        label: t("Characteristic", language),
        input: (
          <FormikSelect<FormState, "filter_characteristic">
            name="filter_characteristic"
            options={Characteristic4Options}
          />
        ),
      },
      {
        label: t("Level", language),
        input: (
          <FormikRadio<FormState, "level">
            name="level"
            options={toOptions([5, 6])}
          />
        ),
      },
      ...getStatFields<FormState>(minMaxStats, language),
    ];
  }, [minMaxStats, language]);

  const columns = React.useMemo(() => getColumns(language), [language]);

  const onSubmit = React.useCallback(
    async (opts: FormState) => {
      const minDelay = Math.max(targetDelay - 500, 0);
      const maxDelay = targetDelay + 500;

      const baseStats = getStrictBaseStats(targetSpecies);

      const caughtStats: StatsValue = {
        hp: opts.hpStat,
        atk: opts.atkStat,
        def: opts.defStat,
        spa: opts.spaStat,
        spd: opts.spdStat,
        spe: opts.speStat,
      };

      const datetime = toRngDateTime(
        fromRngDateTime(targetDateTime).subtract(1, "seconds"),
      );

      const seedTimes = await rngTools.calc_gen4_seeds({
        datetime,
        seconds_increment: 2,
        min_delay: minDelay,
        max_delay: maxDelay,
      });

      const maxAdvances = state.game === "Platinum" ? 40 : 20;

      const results = await pMap(seedTimes, async (seedTime) => {
        const states = await rngTools.generate_static4_states({
          tid: 0,
          sid: 0,
          initial_advances: Math.max(targetAdvance - maxAdvances / 2, 0),
          max_advances: maxAdvances,
          game: getStarterGame(targetSpecies),
          encounter: targetSpecies,
          lead: "None",
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
              lvl: opts.level,
              base_stats: baseStats,
              min_stats: caughtStats,
              max_stats: caughtStats,
            },
          },
        });
        return states.map((state): Result => {
          const secondOffset = seedTime.datetime.second - targetDateTime.second;
          return {
            ...state,
            seed: seedTime.seed,
            delay: seedTime.delay,
            advanceOffset: state.advance - targetAdvance,
            flipDelay:
              secondOffset % 2 === 0 && targetDelay % 2 !== seedTime.delay % 2,
            key: `${seedTime.seed}-${state.pid}`,
            delayOffset: seedTime.delay - targetDelay,
            second: seedTime.datetime.second,
            secondOffset,
          };
        });
      });

      const sortedResults = sortBy(results.flat(), [
        (res) => Math.abs(res.advanceOffset),
        (res) => Math.abs(res.delayOffset),
      ]);
      setResults(sortedResults);
    },
    [targetAdvance, targetDelay, targetDateTime, targetSpecies, state.game],
  );

  return (
    <RngToolForm<FormState, Result>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitButtonLabel={t("Generate", language)}
      rowKey="key"
      submitTrackerId="calibrate_gen4_starter"
    />
  );
};
