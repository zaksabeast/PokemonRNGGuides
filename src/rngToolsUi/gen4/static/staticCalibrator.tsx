import { uniqueId, range } from "lodash-es";
import { match } from "ts-pattern";
import { z } from "zod";
import {
  Gen4StaticOpts,
  Gen4StaticPokemon,
  multiWorkerRngTools,
  rngTools,
  SeedTime4,
  StatsValue,
} from "~/rngTools";
import { characteristics, Characteristic4Options } from "../gen4types";
import {
  defaultMinMaxStats,
  gender,
  maleFemale,
  nature,
  StatFieldsSchema,
  RustOption,
} from "~/types";
import { Translations } from "~/translations";
import { message } from "antd";
import {
  Button,
  Field,
  FormFieldTable,
  FormikNumberInput,
  FormikRadio,
  FormikSelect,
  Icon,
  ResultColumn,
  RngToolForm,
  Typography,
} from "~/components";
import { formatOffset } from "~/utils/offsetSymbol";
import { getStatFields } from "~/rngToolsUi/shared/statFields";
import {
  getNatureInputProps,
  pkmFilterNatureFieldToRustInput,
} from "~/components/pkmFilter";
import { toOptions } from "~/utils/options";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { Static4Target, useStatic4State } from "./state";
import { useAtom } from "jotai";
import { gen4StateAtom } from "../shared/state";
import { CalibrateTimerButton } from "../shared/calibrateTimerButton";
import { defaultHiddenPowerFilter } from "~/components/hiddenPowerInput";
import { getIvRangeFromStats } from "~/types/statRange";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import { fromRngDateTime, toRngDateTime } from "~/utils/time";
import { formatHex } from "~/utils/formatHex";
import { useCurrentStep } from "~/components/stepper/state";

type Result = Gen4StaticPokemon & {
  key: string;
  seedDelay: number;
  isTarget: boolean;
  isCorrectSeed: boolean;
  advanceOffset: number;
  secondOffset: number;
  delayOffset: number;
  seed: number;
  delay: number;
};

const Validator = z
  .object({
    nature: z.enum(nature),
    gender: z.enum(gender),
    filter_level: z.number().int().min(1).max(100),
    filter_characteristic: z.enum(characteristics),
    delayRange: z.number().min(0),
    secondsRange: z.number().min(0),
    advanceRange: z.number().min(0),
  })
  .extend(StatFieldsSchema.shape);

export type FormState = z.infer<typeof Validator>;

type CalibrateStatic4AdvanceProps = {
  result: Result;
};

const CalibrateStatic4Advance = ({ result }: CalibrateStatic4AdvanceProps) => {
  const [state, setState] = useStatic4State();
  const [messageApi, contextHolder] = message.useMessage();
  const [, setCurrentStep] = useCurrentStep();

  if (state.chatotSummaryCount == null) {
    return null;
  }

  if (state.chatotSummaryCount < result.advanceOffset) {
    return (
      <Typography.Text type="danger">
        Impossible target: Not enough advances to calibrate
      </Typography.Text>
    );
  }

  return (
    <>
      {contextHolder}
      <Button
        trackerId="calibrate_static4_advance"
        onClick={() => {
          setState((prev) => ({
            ...prev,
            chatotSummaryCount: Math.max(
              (prev.chatotSummaryCount ?? 0) - result.advanceOffset,
              0,
            ),
          }));
          messageApi.success("Calibrated");
          setCurrentStep((step) => step - 2);
        }}
      >
        Calibrate Advance
      </Button>
    </>
  );
};

const getColumns = (t: Translations): ResultColumn<Result>[] => [
  {
    title: t["Calibrate"],
    dataIndex: "key",
    disableVerticalPadding: true,
    render: (_, res) =>
      match(res)
        .with({ isCorrectSeed: true, isTarget: true }, () => null)
        .with({ isCorrectSeed: true, isTarget: false }, () => (
          <CalibrateStatic4Advance result={res} />
        ))
        .with({ isCorrectSeed: false }, () => (
          <CalibrateTimerButton
            hitDelay={res.delay}
            lastStepOnClick={2}
            trackerId="calibrate_gen4_static_calibrator"
          />
        ))
        .otherwise(() => null),
  },
  {
    title: t["Is Target"],
    dataIndex: "isTarget",
    key: "isTarget",
    render: (isTarget: boolean) =>
      isTarget ? <Icon name="CheckCircle" color="Success" size={30} /> : null,
  },
  {
    title: t["Advance Offset"],
    dataIndex: "advanceOffset",
    render: formatOffset,
  },
  {
    title: t["Advance"],
    dataIndex: "advance",
  },
  {
    title: t["Delay Offset"],
    dataIndex: "delayOffset",
    render: formatOffset,
  },
  {
    title: t["Second Offset"],
    dataIndex: "secondOffset",
    render: formatOffset,
  },
  {
    title: t["Seed"],
    dataIndex: "seed",
    render: (seed) => formatHex(seed, 4),
    monospace: true,
  },
];

type FieldProps = {
  t: Translations;
  target: Static4Target | null;
};

const Fields = ({ t, target }: FieldProps) => {
  const isFixedGender = target?.isFixedGender ?? false;
  const minMaxStats = target?.minMaxStats ?? defaultMinMaxStats;
  const minLevel = target?.encounterMinLevel ?? 1;
  const maxLevel = target?.encounterMaxLevel ?? 1;

  const fields: Field[] = [
    {
      label: t["Gender"],
      show: !isFixedGender,
      input: (
        <FormikRadio<FormState> name="gender" options={toOptions(maleFemale)} />
      ),
    },
    {
      label: t["Nature"],
      input: (
        <FormikSelect<FormState, "nature">
          name="nature"
          {...getNatureInputProps(t)}
        />
      ),
    },
    {
      label: t["Characteristic"],
      input: (
        <FormikSelect<FormState, "filter_characteristic">
          name="filter_characteristic"
          options={Characteristic4Options}
        />
      ),
    },
    {
      label: t["Level"],
      show: minLevel !== maxLevel,
      input: (
        <FormikRadio<FormState>
          name="filter_level"
          options={toOptions(range(minLevel, maxLevel + 1))}
        />
      ),
    },
    ...getStatFields<FormState>(minMaxStats, t),
    {
      label: t["Delay Range ±"],
      input: (
        <FormikNumberInput<FormState> name="delayRange" numType="decimal" />
      ),
    },
    {
      label: t["Seconds Range ±"],
      input: (
        <FormikNumberInput<FormState> name="secondsRange" numType="decimal" />
      ),
    },
    {
      label: t["Advance Range ±"],
      input: (
        <FormikNumberInput<FormState> name="advanceRange" numType="decimal" />
      ),
    },
  ];

  return <FormFieldTable fields={fields} />;
};

const sortBy = [
  (result: Result) => result.advanceOffset,
  (result: Result) => Math.abs(result.secondOffset),
  (result: Result) => Math.abs(result.delayOffset),
];

const mapResult = (
  result: Gen4StaticPokemon,
  {
    resultSeedTime,
    targetSeedTime,
    targetLcrngAdvance,
  }: RustOption<Gen4StaticOpts> & {
    resultSeedTime: SeedTime4;
    targetSeedTime: SeedTime4;
    targetLcrngAdvance: number;
  },
): Result => {
  const secondOffset =
    resultSeedTime.datetime.second - targetSeedTime.datetime.second;
  const delayOffset = resultSeedTime.delay - targetSeedTime.delay;
  const advanceOffset = result.advance - targetLcrngAdvance;

  const isCorrectSeed = resultSeedTime.seed === targetSeedTime.seed;

  return {
    ...result,
    key: uniqueId(),
    seed: resultSeedTime.seed,
    seedDelay: targetSeedTime.delay,
    delay: resultSeedTime.delay,
    secondOffset,
    delayOffset,
    advanceOffset,
    isCorrectSeed,
    isTarget:
      isCorrectSeed &&
      secondOffset === 0 &&
      delayOffset === 0 &&
      advanceOffset === 0,
  };
};

export const Static4Calibrator = () => {
  const t = useActiveRouteTranslations();
  const [static4State] = useStatic4State();
  const [state] = useAtom(gen4StateAtom);

  const {
    run: generateStatic4States,
    data: results,
    progressPercent,
    cancel,
    reset,
  } = useBatchedTool(multiWorkerRngTools.generate_static4_states, {
    sortBy,
    map: mapResult,
  });

  const onSubmit = async (opts: FormState) => {
    const staticTarget = static4State.target;
    const targetSeedTime = state.target?.seedTime;
    const targetLcrngAdvance = state.target?.lcrngAdvance;
    if (
      staticTarget == null ||
      targetSeedTime == null ||
      targetLcrngAdvance == null
    ) {
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

    const minMaxIvs = await getIvRangeFromStats({
      species: staticTarget.species,
      lvl: opts.filter_level,
      nature: opts.nature,
      stats: caughtStats,
    });

    if (minMaxIvs == null) {
      reset();
      return;
    }

    const { datetime: targetDateTime, delay: targetDelay } = targetSeedTime;

    const datetime = toRngDateTime(
      fromRngDateTime(targetDateTime).subtract(opts.secondsRange, "seconds"),
    );

    const minDelay = Math.max(targetDelay - opts.delayRange, 0);
    const maxDelay = targetDelay + opts.delayRange;

    const seedTimes = await rngTools.calc_gen4_seeds({
      datetime,
      seconds_increment: 2 * opts.secondsRange,
      min_delay: minDelay,
      max_delay: maxDelay,
    });

    const batchedOpts = seedTimes.map(
      (
        seedTime,
      ): RustOption<Gen4StaticOpts> & {
        resultSeedTime: SeedTime4;
        targetSeedTime: SeedTime4;
        targetLcrngAdvance: number;
      } => ({
        // Additional info for mapping results
        resultSeedTime: seedTime,
        targetSeedTime,
        targetLcrngAdvance,

        // Used by generate_static4_states
        seed: seedTime.seed,
        species: staticTarget.species,
        game: state.config.game,
        initial_advances: Math.max(targetLcrngAdvance - opts.advanceRange, 0),
        max_advances: 2 * opts.advanceRange,
        offset: staticTarget.advanceOffset,
        lead: staticTarget.lead,
        encounter_min_level: staticTarget.encounterMinLevel,
        encounter_max_level: staticTarget.encounterMaxLevel,
        filter_level: opts.filter_level,
        filter: {
          shiny: false,
          ability: null,
          nature: pkmFilterNatureFieldToRustInput([opts.nature]),
          gender: staticTarget.isFixedGender
            ? staticTarget.gender
            : opts.gender,
          hidden_power: defaultHiddenPowerFilter,
          ...minMaxIvs,
        },
        filter_characteristic: opts.filter_characteristic,
        // Doesn't matter for calibration
        tid: 0,
        sid: 0,
      }),
    );

    await generateStatic4States(batchedOpts);
  };

  const initialValues: FormState = {
    hpStat: 0,
    atkStat: 0,
    defStat: 0,
    spaStat: 0,
    spdStat: 0,
    speStat: 0,
    nature: "Adamant",
    gender: "Male",
    filter_level: static4State.target?.level ?? 1,
    filter_characteristic: "AlertToSounds",
    delayRange: 50,
    secondsRange: 1,
    advanceRange: 20,
  };

  return (
    <RngToolForm<FormState, Result>
      allowCancel
      getColumns={getColumns}
      results={results}
      initialValues={initialValues}
      values={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      onCancel={cancel}
      rowKey="key"
      submitTrackerId="calibrate_static4"
      cancelTrackerId="cancel_calibrate_static4"
      progressPercent={progressPercent}
    >
      <Fields t={t} target={static4State.target} />
    </RngToolForm>
  );
};
