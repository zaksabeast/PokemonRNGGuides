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
} from "~/components";
import { z } from "zod";
import { CalibrateTimerButton } from "~/components/calibrateTimerButton";
import {
  HeldEggState,
  pokeNavTrainers,
  useHeldEggState,
  useRegisteredTrainers,
} from "./state";
import { rngTools, Gen3HeldEgg, PokeNavTrainer } from "~/rngTools";
import { sortBy, uniqueId } from "lodash-es";
import { natureOptions } from "~/components/pkmFilter";
import { toOptions } from "~/utils/options";
import { useHydrate } from "~/hooks/useHydrate";
import { Skeleton } from "antd";
import * as tst from "ts-toolbelt";
import { createGen3TimerAtom } from "~/hooks/useGen3Timer";
import { Gen3Timer } from "~/components/gen3Timer";
import { formatOffset } from "~/utils/offsetSymbol";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useWatch } from "~/hooks/form";
import { Translations, usePokeNavTranslations } from "~/translations";
import { PokeNavTrainerTranslations } from "~/translations/en/pokeNav";
import { sortLocale } from "~/utils/sortLocale";
import { gender, nature } from "~/types";

const timerAtom = createGen3TimerAtom();

type Result = tst.O.Nullable<
  tst.O.Merge<
    tst.O.Required<Partial<Gen3HeldEgg>, "advance" | "match_call">,
    { id: string; advanceOffset: number; redrawOffset: number | null }
  >,
  "redraws"
>;

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

const Validator = z.object({
  pokeNavCall: z.enum([...pokeNavTrainers, "None"]),
  hasEgg: z.enum(["true", "false"]),
  gender: z.enum(gender),
  nature: z.enum(nature),
  advanceRange: z.number().min(0),
  redrawRange: z.number().min(0),
  calibration: z.number().nullable(),
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  nature: "Adamant",
  gender: "Male",
  hasEgg: "true",
  pokeNavCall: "None",
  advanceRange: 1000,
  redrawRange: 0,
  calibration: null,
};

const HatchedGenderField = ({ t }: { t: Translations }) => {
  const { hasEgg } = useWatch({
    names: { hasEgg: true },
    validationSchema: Validator,
  });
  const hatchedGenderOptions = gender.map((option) => ({
    label: t[option],
    value: option,
  }));

  return (
    <FormikSelect<FormState, "gender">
      name="gender"
      disabled={hasEgg !== "true"}
      options={hatchedGenderOptions}
    />
  );
};

const HatchedNatureField = ({ t }: { t: Translations }) => {
  const { hasEgg } = useWatch({
    names: { hasEgg: true },
    validationSchema: Validator,
  });
  const hatchedNatureOptions = natureOptions.required.map((option) => ({
    label: t[option.label],
    value: option.value,
  }));

  return (
    <FormikSelect<FormState, "nature">
      name="nature"
      disabled={hasEgg !== "true"}
      options={hatchedNatureOptions}
    />
  );
};

const getFields = ({
  t,
  translatedTrainers,
}: {
  t: Translations;
  translatedTrainers: PokeNavTrainerTranslations;
}): Field[] => {
  const unsortedTrainerOptions = toOptions(
    pokeNavTrainers,
    (name) => translatedTrainers[name],
  );
  const sortedOptions = sortLocale(unsortedTrainerOptions, "label");
  const trainerOptions = [
    { label: t["None"], value: "None" },
    ...sortedOptions,
  ] satisfies { value: PokeNavTrainer; label: string }[];

  return [
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
    {
      label: t["Hatched Nature"],
      input: <HatchedNatureField t={t} />,
    },
    {
      label: t["Hatched Gender"],
      input: <HatchedGenderField t={t} />,
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
  const [{ results, previousOffsets }, setResults] = React.useState<{
    results: Result[] | null;
    previousOffsets: number[] | null;
  }>({ results: null, previousOffsets: null });

  const onSubmit: RngToolSubmit<FormState> = async (filters) => {
    const target = state.target;

    if (target == null) {
      setResults({
        results: [],
        previousOffsets:
          results?.map((egg) => egg.advanceOffset).slice(0, 20) ?? [],
      });
      return;
    }

    const maxAdvances = filters.advanceRange * 2;
    const initialAdvances = Math.max(target.advance - filters.advanceRange, 0);

    const eggResults =
      filters.hasEgg === "true"
        ? await rngTools.emerald_egg_held_states({
            ...state.eggSettings,
            has_roamer: target.has_roamer,
            // preset
            tid: 0,
            sid: 0,
            delay: 0,
            registered_trainers: registeredTrainers,
            lua_adjustment: true,
            min_redraw: Math.max(target.redraws - filters.redrawRange, 0),
            max_redraw: target.redraws + filters.redrawRange,
            calibration: filters.calibration ?? target.calibration,
            initial_advances: initialAdvances,
            max_advances: maxAdvances,
            filter_impossible_to_hit: false,
            filters: {
              shiny: false,
              nature: filters.nature,
              gender: filters.gender,
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

    setResults({
      results: sortedResults,
      previousOffsets:
        results?.map((egg) => egg.advanceOffset).slice(0, 20) ?? [],
    });
  };

  const fields = getFields({
    t,
    translatedTrainers: translatedTrainers.withoutTitle,
  });
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
        fields={fields}
        columns={columns}
        results={results ?? []}
        initialValues={initialValues}
        validationSchema={Validator}
        disableGenerate={state.target == null}
        onSubmit={onSubmit}
        submitTrackerId="filter_retail_emerald_held_egg"
        submitButtonLabel="Find advances matching eggs"
        rowKey="id"
      />
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
