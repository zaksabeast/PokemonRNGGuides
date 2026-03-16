import React from "react";
import { z } from "zod";
import {
  RngToolForm,
  Field,
  Flex,
  ResultColumn,
  Icon,
  FormFieldTable,
  FormikRadio,
} from "~/components";
import { FormikSelect } from "~/components/select";
import { RngToolSubmit } from "~/components/rngToolForm";
import { Typography } from "~/components/typography";
import { nature } from "~/types/nature";
import { Button } from "~/components/button";
import { toOptions } from "~/utils/options";
import {
  getPkmFilterInitialValues,
  natureOptions,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import { getStatFields } from "~/rngToolsUi/shared/statFields";
import { gen3Methods, gender, StatFieldsSchema } from "~/types";
import {
  Gen3Method,
  rngTools,
  Wild3EncounterGameData,
  Wild3MapSetups,
  Wild3SearcherOptions,
} from "~/rngTools";
import { getWild3EmeraldGameData } from "./data/wild3GameData";
import type { FormState as TargetSetup } from "./wild3CalibTarget";
import { gen3Leads, isFishingAction, wild3Actions } from "./utils";
import { useWatch } from "react-hook-form";
import { FormikGenderFilter } from "~/components/genderFilter";
import { getIvRangeFromStats, getStatRange } from "~/types/statRange";
import uniq from "lodash-es/uniq";
import {
  gen3PkmFilterFieldsToRustInput,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";
import clamp from "lodash-es/clamp";
import { Tooltip } from "antd";
import { formatProbability } from "~/utils/formatProbability";

const emeraldWildGameData = getWild3EmeraldGameData();

const Validator = z
  .object({
    nature: z.enum(nature),
    gender: z.enum(gender),
    species: z.enum(emeraldWildGameData.species),
    lvl: z.number().min(1).max(100),
    // TODO ability
  })
  .extend(StatFieldsSchema.shape);

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  hpStat: 0,
  atkStat: 0,
  defStat: 0,
  spaStat: 0,
  spdStat: 0,
  speStat: 0,
  nature: "Adamant",
  gender: "Male",
  species: "Shuckle",
  lvl: 1,
};

type Props = {
  targetSetup: TargetSetup;
  setLatestHitAdv: (hitAdv: number) => void;
};

export type CaughtMonResult = {
  advance: number;
  targetAdvance: number;
  method: Gen3Method;
  score: number;
  probabilityHitMethodsAtAdvance: number;
  uid: number;
};

const CONFIDENCE_RANGE = 3600; // We assume the player hits its target advance by more or less 1 minute

let nextUid = 0;

const searchCaughtMon = async (values: FormState, targetSetup: TargetSetup) => {
  const initial_seed = targetSetup.usingPaintingReseeding
    ? targetSetup.targetPaintingSeed
    : 0;

  const initial_advances = Math.max(
    targetSetup.targetAdvance - CONFIDENCE_RANGE,
    0,
  );

  const map_data = emeraldWildGameData.maps_data.find(
    (map) => map.map_id === targetSetup.map,
  );
  if (map_data == null) {
    return [];
  }
  const map_setup: Wild3MapSetups = {
    map_data,
    actions: [targetSetup.action],
    roamer_states: [targetSetup.roamerState],
    mass_outbreak_states: [targetSetup.massOutbreakState],
    feebas_states: [targetSetup.feebasState],
  };

  const minMaxIvs = await getIvRangeFromStats({
    species: values.species,
    lvl: values.lvl,
    nature: values.nature,
    stats: {
      hp: values.hpStat,
      atk: values.atkStat,
      def: values.defStat,
      spa: values.spaStat,
      spd: values.spdStat,
      spe: values.speStat,
    },
  });

  if (minMaxIvs == null) {
    return [];
  }

  const opts: Wild3SearcherOptions = {
    initial_seed,
    tid: 0, // doesn't matter
    sid: 0, // doesn't matter
    initial_advances,
    max_advances: CONFIDENCE_RANGE * 2,
    max_result_count: 2 ** 32 - 1, // No limit
    filter: pkmFilterFieldsToRustInput({
      ...getPkmFilterInitialValues(),
      filter_nature: values.nature,
      filter_gender: values.gender,
      ...minMaxIvs,
    }),
    gen3_filter: gen3PkmFilterFieldsToRustInput(
      {
        ...getGen3PkmFilterInitialValues(),
        filter_lvl: values.lvl,
      },
      values.species,
    ),
    leads: [gen3Leads[targetSetup.leadIdx]],
    map_setups: [map_setup],
    methods: gen3Methods,
    consider_cycles: true,
    consider_rng_manipulated_lead_pid: true,
    generate_even_if_impossible: true,
    painting_opts: null,
    lead_cycle_speed: targetSetup.leadCycleSpeed,
  };

  const resultsByPidPath =
    await rngTools.search_wild3_with_initial_advances_range(
      opts,
      initial_seed,
      initial_seed,
    );
  const results = resultsByPidPath.map((pidPath) => pidPath.vec).flat();

  const list = results.map((result) => {
    const probabilityHitMethodsAtAdvance =
      result.cycle_data_by_lead?.specified_lead?.method_probability ?? 0;
    const scoreHitMethodsAtAdvance = clamp(
      probabilityHitMethodsAtAdvance,
      0.01,
      1,
    );

    const distanceFromTarget = Math.abs(
      targetSetup.targetAdvance - result.advance,
    );

    const score = distanceFromTarget / scoreHitMethodsAtAdvance;

    return {
      advance: result.advance,
      targetAdvance: targetSetup.targetAdvance,
      method: result.method,
      score,
      probabilityHitMethodsAtAdvance,
      uid: nextUid++,
    };
  });

  return list.sort((res1, res2) => {
    return res1.score - res2.score;
  });
};

const getPossibleEncountersForMap = (targetSetup: TargetSetup) => {
  const map_data = emeraldWildGameData.maps_data.find(
    (map) => map.map_id === targetSetup.map,
  );
  if (map_data == null) {
    return [];
  }

  const list: Wild3EncounterGameData[] = [
    ...map_data.slots_by_action[wild3Actions.indexOf(targetSetup.action)],
  ];
  if (isFishingAction(targetSetup.action) && map_data.feebas != null) {
    list.push(map_data.feebas);
  }
  if (targetSetup.action === "SweetScentLand") {
    list.push(
      ...map_data.roamers
        .filter((roamer) => roamer.id === targetSetup.roamerState)
        .map((roamer) => roamer.encounter_data),
    );
  }
  if (
    targetSetup.action === "SweetScentLand" ||
    targetSetup.action === "SweetScentWater"
  ) {
    list.push(
      ...map_data.mass_outbreaks
        .filter(
          (mass_outbreak) => mass_outbreak.id === targetSetup.massOutbreakState,
        )
        .map((mass_outbreak) => mass_outbreak.encounter_data),
    );
  }
  return list;
};

const Fields = ({ targetSetup }: { targetSetup: TargetSetup }) => {
  const selectedSpecies = useWatch<FormState, "species">({ name: "species" });
  const selectedLvl = useWatch<FormState, "lvl">({ name: "lvl" });
  const selectedNature = useWatch<FormState, "nature">({ name: "nature" });

  const [fields, setFields] = React.useState<Field[]>([]);

  React.useEffect(() => {
    const encounters = getPossibleEncountersForMap(targetSetup);
    const speciesList = uniq(
      encounters.map((enc) => enc.species_data.species),
    ).toSorted();
    const selectedSpeciesInfos = encounters.filter(
      (enc) => enc.species_data.species === selectedSpecies,
    );

    const speciesField: Field = {
      label: "Species",
      input: (
        <FormikRadio<FormState>
          name="species"
          options={toOptions(speciesList)}
        />
      ),
    };

    if (selectedSpeciesInfos.length === 0) {
      setFields([speciesField]);
      return;
    }

    const lvls = new Set<number>();
    selectedSpeciesInfos.forEach((info) => {
      for (let lvl = info.min_level; lvl <= info.max_level; lvl++) {
        lvls.add(lvl);
      }
    });
    const sortedLvls = Array.from(lvls).sort((lvl1, lvl2) => lvl1 - lvl2);

    Promise.all([
      getStatRange({
        species: selectedSpecies,
        levelRange: [selectedLvl, selectedLvl],
        nature: selectedNature,
      }),
      rngTools.get_species_gender_ratio(
        selectedSpeciesInfos[0].species_data.species,
      ),
    ]).then(([minMaxStats, genderRatio]) => {
      setFields([
        speciesField,
        {
          label: "Level",
          input: (
            <FormikRadio<FormState>
              name="lvl"
              options={toOptions(sortedLvls)}
            />
          ),
        },
        {
          label: "Gender",
          input: (
            <FormikGenderFilter<FormState>
              name="gender"
              genderRatio={genderRatio}
              permitAny={false}
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
        ...getStatFields<FormState>(minMaxStats),
      ]);
    });
  }, [targetSetup, selectedSpecies, selectedLvl, selectedNature]);

  return <FormFieldTable fields={fields} />;
};

export const Wild3CalibCaughtMon = ({
  targetSetup,
  setLatestHitAdv,
}: Props) => {
  const [results, setResults] = React.useState<CaughtMonResult[]>([]);
  const { targetMethod, targetAdvance } = targetSetup;

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (values) => {
      setResults(await searchCaughtMon(values, targetSetup));
    },
    [setResults, targetSetup],
  );

  const columns = React.useMemo((): ResultColumn<CaughtMonResult>[] => {
    const columns: ResultColumn<CaughtMonResult>[] = [
      { title: "Target", dataIndex: "targetAdvance" },
      {
        title: "Advance",
        dataIndex: "advance",
        render: (val, values) => {
          const diffWithTarget = val - values.targetAdvance;
          if (diffWithTarget === 0) {
            return `${val}`;
          }
          if (diffWithTarget > 0) {
            return `${val} (+${diffWithTarget})`;
          }
          return `${val} (${diffWithTarget})`;
        },
      },
      {
        title: "Method",
        dataIndex: "method",
      },
      {
        title: (
          <>
            Method
            <br />
            Likelihood
          </>
        ),
        key: "methodLikelihood",
        dataIndex: "method",
        render(method, values) {
          const prob = formatProbability(values.probabilityHitMethodsAtAdvance);
          const title = `${prob} likelihood that the triggered method is ${method} if the hit advance is ${values.advance}`;
          return <Tooltip title={title}>{prob}</Tooltip>;
        },
      },
      {
        title: "",
        dataIndex: "advance",
        render(advance, values) {
          if (
            values.advance === targetAdvance &&
            values.method === targetMethod
          ) {
            return "Target Pokémon";
          }

          return (
            <Button
              type="text"
              color="PrimaryText"
              trackerId="wild3CalibCaughtMon_adv"
              onClick={() => {
                setLatestHitAdv(advance);
                setResults([]);
              }}
            >
              <Icon name="Update" size={20} /> Update Calibration
            </Button>
          );
        },
      },
    ];
    return columns;
  }, [setLatestHitAdv, setResults, targetMethod, targetAdvance]);

  return (
    <Flex vertical gap={8}>
      <Typography.Title level={5} p={0} m={0}>
        Caught Pokémon
      </Typography.Title>
      <RngToolForm<FormState, CaughtMonResult>
        formContainerId="generate-wild3-caught"
        columns={columns}
        results={results}
        initialValues={initialValues}
        validationSchema={Validator}
        onSubmit={onSubmit}
        submitTrackerId="generate_wild3_caught"
        submitButtonLabel="Find advances matching caught Pokémon"
        rowKey="uid"
      >
        <Flex vertical ml={20}>
          <Fields targetSetup={targetSetup} />
        </Flex>
      </RngToolForm>
    </Flex>
  );
};
