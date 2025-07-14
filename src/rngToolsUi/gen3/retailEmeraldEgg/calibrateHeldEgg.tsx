import React from "react";
import {
  Flex,
  ResultColumn,
  Field,
  RngToolForm,
  FormikSelect,
  RngToolSubmit,
  Typography,
  CalibrateTimerButton,
} from "~/components";
import {
  pokeNavTrainers,
  useHeldEggState,
  useRegisteredTrainers,
} from "./state";
import {
  rngTools,
  Gen3HeldEgg,
  PokeNavTrainer,
  Nature,
  NoEggMatchCall,
  Gender,
} from "~/rngTools";
import { uniqBy, sortBy } from "lodash-es";
import { genderOptions, natureOptions } from "~/components/pkmFilter";
import { toOptions } from "~/utils/options";
import { useHydrate } from "~/hooks/useHydrate";
import { Skeleton } from "antd";
import * as tst from "ts-toolbelt";
import { createGen3TimerAtom } from "~/hooks/useGen3Timer";
import { Gen3Timer } from "~/components/gen3Timer";
import { formatOffset } from "~/utils/offsetSymbol";
import {
  useActiveRouteLanguage,
  useActiveRouteTranslations,
} from "~/hooks/useActiveRoute";
import { Translations, usePokeNavTranslations } from "~/translations";
import { PokeNavTrainerTranslations } from "~/translations/en/pokeNav";
import { LanguageKey } from "~/guides";

const timerAtom = createGen3TimerAtom();

type Result = tst.O.Merge<
  tst.O.Required<Partial<Gen3HeldEgg>, "advance" | "match_call">,
  { offset: number }
>;

const getColumns = ({
  t,
  translatedTrainers,
}: {
  t: Translations;
  translatedTrainers: PokeNavTrainerTranslations;
}): ResultColumn<Result>[] => [
  {
    title: t["Calibrate"],
    dataIndex: "advance",
    render: (_, result) => (
      <CalibrateTimerButton
        type="gen3"
        hitAdvance={result.advance}
        timer={timerAtom}
        trackerId="calibrate_retail_emerald_held_egg"
      />
    ),
  },
  {
    title: t["Offset"],
    dataIndex: "offset",
    render: formatOffset,
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

type FormState = {
  nature: Nature | null;
  gender: Gender | null;
  pokeNavCall: PokeNavTrainer;
};

const initialValues: FormState = {
  nature: null,
  gender: null,
  pokeNavCall: "None",
};

const getFields = ({
  t,
  translatedTrainers,
  language,
}: {
  t: Translations;
  translatedTrainers: PokeNavTrainerTranslations;
  language: LanguageKey;
}): Field[] => {
  const hatchedNatureOptions = natureOptions.optional.map((option) => ({
    label: option.value === null ? t["No Egg"] : t[option.label],
    value: option.value,
  }));

  const hatchedGenderOptions = genderOptions.map((option) => ({
    label: option.value === null ? t["No Egg"] : t[option.label],
    value: option.value,
  }));

  const unsortedTrainerOptions = toOptions(
    pokeNavTrainers,
    (name) => translatedTrainers[name],
  );
  const sortedOptions = unsortedTrainerOptions.sort((first, second) =>
    first.label.localeCompare(second.label, language),
  );
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
      label: t["Hatched Nature"],
      input: (
        <FormikSelect<FormState, "nature">
          name="nature"
          options={hatchedNatureOptions}
        />
      ),
    },
    {
      label: t["Hatched Gender"],
      input: (
        <FormikSelect<FormState, "gender">
          name="gender"
          options={hatchedGenderOptions}
        />
      ),
    },
  ];
};

type InnerProps = {
  registeredTrainers: PokeNavTrainer[];
};

const InnerCalibrateHeldEgg = ({ registeredTrainers }: InnerProps) => {
  const [state] = useHeldEggState();
  const firstFilter = React.useRef(true);
  const language = useActiveRouteLanguage();
  const translatedTrainers = usePokeNavTranslations(language);
  const t = useActiveRouteTranslations();
  const [previousOffsets, setPreviousOffsets] = React.useState<number[]>([]);
  const [potentialEggs, setPotentialEggs] = React.useState<Result[]>([]);
  const [filters, setFilters] = React.useState<FormState>(initialValues);

  const targetAdvance = state.target?.advance ?? 0;
  const targetRedraws = state.target?.redraws ?? 0;
  const targetCalibration = state.target?.calibration ?? 0;

  React.useEffect(() => {
    const runAsync = async () => {
      const maxAdvances = 200;
      const initialAdvances = Math.max(targetAdvance - 100, 0);

      const eggResults = await rngTools.emerald_egg_held_states({
        ...state.eggSettings,
        // preset
        // Target calibration takes roamer into consideration
        has_roamer: false,
        tid: 0,
        sid: 0,
        delay: 0,
        registered_trainers: registeredTrainers,
        lua_adjustment: true,
        min_redraw: targetRedraws,
        max_redraw: targetRedraws,
        calibration: targetCalibration,
        initial_advances: initialAdvances,
        max_advances: maxAdvances,
        filter_impossible_to_hit: false,
        filters: {
          shiny: false,
          nature: null,
          gender: null,
        },
      });

      const callResults = await rngTools.generate_no_egg_match_calls({
        // Target calibration takes roamer into consideration
        has_roamer: false,
        calibration: targetCalibration,
        has_lightning_rod: state.eggSettings.has_lightning_rod,
        max_advances: maxAdvances,
        redraws: targetRedraws,
        registered_trainers: registeredTrainers,
        seed: state.seed,
        initial_advances: initialAdvances,
      });

      // uniqBy keeps the first of two duplicates
      // So merging egg results first ensures call results are only kept if they do not have an egg
      const merged: (Gen3HeldEgg | NoEggMatchCall)[] = [
        ...eggResults,
        ...callResults,
      ];
      const results = sortBy(
        uniqBy(merged, (res) => res.advance),
        (res) => res.advance,
      );

      setPotentialEggs(
        results.map((result) => ({
          ...result,
          offset: result.advance - targetAdvance,
        })),
      );
    };

    runAsync();
  }, [
    targetAdvance,
    registeredTrainers,
    state.seed,
    state.eggSettings,
    targetRedraws,
    targetCalibration,
  ]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const filteredEggs = potentialEggs.filter(
        (egg) =>
          egg.match_call === filters.pokeNavCall &&
          // Intentionally using `==` to compare undefined and null
          egg.nature == filters.nature &&
          egg.gender == filters.gender,
      );

      if (!firstFilter.current) {
        setPreviousOffsets(filteredEggs.map((egg) => egg.offset));
      }

      setFilters(opts);
      firstFilter.current = false;
    },
    [filters, potentialEggs],
  );

  const dataSource = React.useMemo(() => {
    return potentialEggs.filter(
      (egg) =>
        egg.match_call === filters.pokeNavCall &&
        // Intentionally using `==` to compare undefined and null
        egg.nature == filters.nature &&
        egg.gender == filters.gender,
    );
  }, [potentialEggs, filters]);

  const matchCall = state.target?.match_call;
  const targetCall =
    matchCall === "None" || matchCall == null
      ? "No Call"
      : `Target: ${translatedTrainers.withoutTitle[matchCall]}`;

  const { fields, columns } = React.useMemo(() => {
    const fields = getFields({
      t,
      language,
      translatedTrainers: translatedTrainers.withoutTitle,
    });
    const columns = getColumns({
      t,
      translatedTrainers: translatedTrainers.withoutTitle,
    });
    return { fields, columns };
  }, [t, language, translatedTrainers.withoutTitle]);

  return (
    <Flex vertical gap={16} width="100%">
      <Flex vertical gap={8}>
        <Typography.Title level={5} mv={0}>
          {t["Target Call"]}: {targetCall}
        </Typography.Title>
        <Typography.Title level={5} mv={0}>
          {t["Target Nature"]}: {state.target?.nature}
        </Typography.Title>
      </Flex>

      <Typography.Text mv={0}>
        {t["Previous offsets"]}: {previousOffsets.join(", ")}
      </Typography.Text>

      <RngToolForm<FormState, Result>
        fields={fields}
        columns={columns}
        results={dataSource}
        initialValues={initialValues}
        onSubmit={onSubmit}
        submitTrackerId="filter_retail_emerald_held_egg"
        submitButtonLabel="Find advances matching eggs"
        rowKey="advance"
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
  const language = useActiveRouteLanguage();
  const translatedTrainers = usePokeNavTranslations(language);
  const t = useActiveRouteTranslations();
  const targetAdvance = state.target?.advance ?? 0;
  const redraws = state.target?.redraws ?? 0;
  const matchCall = state.target?.match_call;
  const targetCall =
    matchCall === "None" || matchCall == null
      ? "None"
      : translatedTrainers.withoutTitle[matchCall];

  return (
    <Flex vertical gap={16} width="100%">
      <Flex vertical gap={8}>
        <Typography.Title level={5} mv={0}>
          {t["Number of times to open the PokeDex"]}: {redraws}
        </Typography.Title>
        <Typography.Title level={5} mv={0}>
          {t["Target caller"]}: {targetCall}
        </Typography.Title>
      </Flex>

      <Gen3Timer
        trackerId="retail_emerald_held_egg"
        targetAdvance={targetAdvance}
        timer={timerAtom}
      />
    </Flex>
  );
};
