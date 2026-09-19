import React from "react";
import {
  Flex,
  ResultColumn,
  Field,
  RngToolForm,
  FormikSelect,
  RngToolSubmit,
  Typography,
  FormikNumberInput,
  Icon,
  Tag,
  FormikRadio,
  FormFieldTable,
} from "~/components";
import { CalibrateTimerButton } from "~/components/calibrateTimerButton";
import {
  HeldEggState,
  initialCalibrationState,
  useHeldEggCalibrationState,
  useHeldEggState,
  useRegisteredTrainers,
} from "../state";
import { pokeNavTrainers } from "../constants";
import { rngTools, Gen3HeldEgg, PokeNavTrainer, Species } from "~/rngTools";
import { sortBy, uniqueId } from "lodash-es";
import {
  getNatureInputProps,
  getPkmFilterFields,
  getPkmFilterInitialValues,
} from "~/components/pkmFilter";
import { toOptions } from "~/utils/options";
import { useHydrate } from "~/hooks/useHydrate";
import { Skeleton } from "antd";
import { Gen3Timer } from "~/components/gen3Timer";
import { formatOffset } from "~/utils/offsetSymbol";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useWatch } from "~/hooks/form";
import { Translations, usePokeNavTranslations } from "~/translations";
import {
  PokeNavTrainerTranslationPair,
  PokeNavTrainerTranslations,
} from "~/translations/en/pokeNav";
import { sortLocale } from "~/utils/sortLocale";
import { createGen3TimerAtom } from "~/rngToolsUi/timer/atoms";
import { Validator, HeldEggCalibrationFilters as FormState } from "./validator";
import { HeldEggCalibrationResult as Result } from "./result";

const timerAtom = createGen3TimerAtom();

const getColumns = ({
  t,
  target,
  translatedTrainers,
}: {
  t: Translations;
  target: Gen3HeldEgg | null;
  translatedTrainers: PokeNavTrainerTranslations;
}): ResultColumn<Result>[] => [
  {
    title: t["Calibrate"],
    dataIndex: "advance",
    disableVerticalPadding: true,
    render: (_, result) => {
      if (result.redraws != null && result.redraws !== target?.redraws) {
        return <Tag color="Error">{t["Wrong Pokedex Count"]}</Tag>;
      }

      if (result.calibration !== target?.calibration) {
        return <Tag color="Error">{t["Wrong Calibration"]}</Tag>;
      }

      return (
        <CalibrateTimerButton
          type="gen3"
          hitAdvance={result.advance}
          timer={timerAtom}
          trackerId="calibrate_retail_emerald_held_egg"
        />
      );
    },
  },
  {
    key: "isTarget",
    title: t["Is Target"],
    dataIndex: "advance",
    render: (_, result) =>
      result.calibration === target?.calibration &&
      result.advance === target?.advance &&
      result.match_call === target?.match_call &&
      result.redraws === target?.redraws ? (
        <Icon name="CheckCircle" color="Success" size={30} />
      ) : null,
  },
  {
    title: t["Advance Offset"],
    dataIndex: "advanceOffset",
    render: formatOffset,
  },
  {
    title: t["Pokedex Offset"],
    dataIndex: "redrawOffset",
    render: (offset) => (offset == null ? t["None"] : formatOffset(offset)),
  },
  {
    title: t["Pokedex"],
    dataIndex: "redraws",
    render: (redraws) => (redraws == null ? "?" : redraws),
  },
  {
    title: t["Advance"],
    dataIndex: "advance",
  },
  {
    title: t["Nature"],
    dataIndex: "nature",
    render: (nature) => (nature == null ? t["No Egg"] : t[nature]),
  },
  {
    title: t["Match call"],
    dataIndex: "match_call",
    render: (matchCall) => translatedTrainers[matchCall],
  },
];

const initialValues: FormState = {
  nature: "Adamant",
  hasEgg: "true",
  pokeNavCall: "None",
  advanceRange: 1000,
  redrawRange: 0,
  calibration: null,
  ...getPkmFilterInitialValues(),
};

type FieldProps = {
  t: Translations;
  eggSpecies: Species;
  translatedTrainers: PokeNavTrainerTranslationPair;
};

const Fields = ({ t, translatedTrainers, eggSpecies }: FieldProps) => {
  const { hasEgg: hasEggString } = useWatch({
    validationSchema: Validator,
    names: { hasEgg: true },
  });
  const unsortedTrainerOptions = toOptions(
    pokeNavTrainers,
    (name) => translatedTrainers.withoutTitle[name],
  );
  const sortedOptions = sortLocale(unsortedTrainerOptions, "label");
  const trainerOptions = [
    { label: t["None"], value: "None" },
    ...sortedOptions,
  ] satisfies { value: PokeNavTrainer; label: string }[];

  const hasEgg = hasEggString === "true";

  const filterFields = getPkmFilterFields<FormState>({
    species: eggSpecies,
    displayHiddenAbility: false,
    displayHiddenPower: false,
    displayIvs: false,
    displayShiny: false,
    displayNature: false,
  });

  const fields: Field[] = [
    {
      label: t["PokeNav Call"],
      input: (
        <FormikSelect<FormState, "pokeNavCall">
          name="pokeNavCall"
          options={trainerOptions}
        />
      ),
    },
    {
      label: t["Has Egg"],
      input: (
        <FormikRadio<FormState>
          name="hasEgg"
          options={[
            { label: t["Yes"], value: "true" },
            { label: t["No"], value: "false" },
          ]}
        />
      ),
    },
    ...filterFields.map((field) => ({
      ...field,
      show: hasEgg,
      label:
        field.id === "ability" ? t["Hatched Ability"] : t["Hatched Gender"],
    })),
    {
      label: t["Hatched Nature"],
      show: hasEgg,
      input: (
        <FormikSelect<FormState, "nature">
          name="nature"
          {...getNatureInputProps(t)}
          placeholder={t["None"]}
        />
      ),
    },
    {
      label: t["Advance Range ±"],
      input: (
        <FormikNumberInput<FormState> name="advanceRange" numType="decimal" />
      ),
    },
    {
      label: t["Pokedex Range ±"],
      input: (
        <FormikNumberInput<FormState> name="redrawRange" numType="decimal" />
      ),
    },
    {
      label: t["Calibration Override"],
      input: (
        <FormikNumberInput<FormState>
          name="calibration"
          numType="decimal"
          placeholder={t["Do not touch unless you know what you're doing"]}
        />
      ),
    },
  ];

  return <FormFieldTable fields={fields} />;
};

const calcNoEggs = async ({
  filters,
  maxAdvances,
  initialAdvances,
  target,
  state,
  registeredTrainers,
}: {
  filters: FormState;
  maxAdvances: number;
  initialAdvances: number;
  target: Gen3HeldEgg;
  state: HeldEggState;
  registeredTrainers: PokeNavTrainer[];
}) => {
  const calibration = filters.calibration ?? target.calibration;
  const callResults = await rngTools.generate_no_egg_match_calls({
    has_roamer: target.has_roamer,
    calibration,
    has_lightning_rod: state.eggSettings.has_lightning_rod,
    max_advances: maxAdvances,
    registered_trainers: registeredTrainers,
    seed: state.seed,
    initial_advances: initialAdvances,
    match_call_filter: filters.pokeNavCall,
  });

  return callResults.map((result) => ({
    ...result,
    calibration,
    redraws: null,
    offset: result.advance - target.advance,
  }));
};

type InnerProps = {
  registeredTrainers: PokeNavTrainer[];
};

const InnerCalibrateHeldEgg = ({ registeredTrainers }: InnerProps) => {
  const [state] = useHeldEggState();
  const t = useActiveRouteTranslations();
  const translatedTrainers = usePokeNavTranslations(t.language);
  const [{ results, previousOffsets }, setCalibration] =
    useHeldEggCalibrationState();

  // The form always starts from its default values,
  // so previous results and filters shouldn't outlive a remount.
  React.useEffect(() => {
    setCalibration(initialCalibrationState);
  }, [setCalibration]);

  const onSubmit: RngToolSubmit<FormState> = async (filters) => {
    const target = state.target;

    if (target == null) {
      setCalibration(initialCalibrationState);
      return;
    }

    const maxAdvances = filters.advanceRange * 2;
    const initialAdvances = Math.max(target.advance - filters.advanceRange, 0);
    const hasEgg = filters.hasEgg === "true";
    const calibration = filters.calibration ?? target.calibration;
    const minRedraw = Math.max(target.redraws - filters.redrawRange, 0);
    const maxRedraw = target.redraws + filters.redrawRange;

    const eggResults = hasEgg
      ? await rngTools.emerald_egg_held_states({
          ...state.eggSettings,
          has_roamer: target.has_roamer,
          // preset
          tid: 0,
          sid: 0,
          delay: 0,
          registered_trainers: registeredTrainers,
          lua_adjustment: true,
          min_redraw: minRedraw,
          max_redraw: maxRedraw,
          calibration,
          initial_advances: initialAdvances,
          max_advances: maxAdvances,
          filter_impossible_to_hit: false,
          filters: {
            shiny: false,
            nature: [filters.nature],
            ability: filters.filter_ability,
            gender: filters.filter_gender,
            match_call: filters.pokeNavCall,
          },
        })
      : await calcNoEggs({
          filters,
          maxAdvances,
          initialAdvances,
          target,
          state,
          registeredTrainers,
        });

    const offsetResults = eggResults.map((result) => ({
      ...result,
      redrawOffset:
        result.redraws != null ? result.redraws - target.redraws : null,
      advanceOffset: result.advance - target.advance,
      id: uniqueId(),
    }));
    const sortedResults: Result[] = sortBy(offsetResults, [
      (res) => Math.abs(res.advanceOffset),
      (res) => Math.abs(res.redrawOffset ?? 0),
    ]);

    setCalibration({
      debug: {
        filters,
        search: {
          calibration,
          initialAdvances,
          maxAdvances,
          minRedraw: hasEgg ? minRedraw : null,
          maxRedraw: hasEgg ? maxRedraw : null,
        },
      },
      results: sortedResults,
      previousOffsets:
        results?.map((egg) => egg.advanceOffset).slice(0, 20) ?? [],
    });
  };

  const columns = getColumns({
    t,
    target: state.target,
    translatedTrainers: translatedTrainers.withoutTitle,
  });

  return (
    <Flex vertical gap={16} width="100%">
      <Typography.Text mv={0}>
        {t["Previous offsets"]}:{" "}
        {previousOffsets == null || previousOffsets.length === 0
          ? t["None"]
          : previousOffsets.join(", ")}
      </Typography.Text>

      <RngToolForm<FormState, Result>
        columns={columns}
        results={results ?? []}
        initialValues={initialValues}
        validationSchema={Validator}
        disableGenerate={state.target == null}
        onSubmit={onSubmit}
        submitTrackerId="filter_retail_emerald_held_egg"
        submitButtonLabel="Find advances matching eggs"
        rowKey="id"
      >
        <Fields
          t={t}
          translatedTrainers={translatedTrainers}
          eggSpecies={state.eggSettings.egg_species}
        />
      </RngToolForm>
    </Flex>
  );
};

export const CalibrateHeldEgg = () => {
  const [lockedState] = useRegisteredTrainers();
  const { hydrated, client } = useHydrate(lockedState);

  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <InnerCalibrateHeldEgg registeredTrainers={client.registeredTrainers} />
  );
};

export const CalibrateHeldEggTimer = () => {
  const [state] = useHeldEggState();
  const targetAdvance = state.target?.advance ?? 0;

  return (
    <Gen3Timer
      trackerId="retail_emerald_held_egg"
      targetAdvance={targetAdvance}
      timer={timerAtom}
    />
  );
};
