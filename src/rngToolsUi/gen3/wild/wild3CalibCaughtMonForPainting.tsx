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
  FormikSwitch,
  FormikNumberInput,
} from "~/components";
import { FormikSelect } from "~/components/select";
import { RngToolSubmit } from "~/components/rngToolForm";
import { Typography } from "~/components/typography";
import { nature } from "~/types/nature";
import { Button } from "~/components/button";
import { toOptions } from "~/utils/options";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import {
  getPkmFilterInitialValues,
  natureOptions,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import { getStatFields } from "~/rngToolsUi/shared/statFields";
import {
  createAllStats0,
  gen3Methods,
  gender,
  StatFieldsSchema,
} from "~/types";
import {
  Gen3Method,
  Ivs,
  Nature,
  rngTools,
  Species,
  StatsValue,
  Wild3EncounterGameData,
  Wild3MapSetups,
  Wild3SearcherOptions,
} from "~/rngTools";
import { getWild3EmeraldGameData } from "./data/wild3GameData";
import type { TargetSetup } from "./wild3CalibTargetSetupInput";
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
import { Gen3IvRating, getGen3IvRating } from "../ivRater";
import { ability } from "~/types/ability";
import { FormikAbilityFilter } from "~/components/abilityFilter";
import { useFormContext } from "~/hooks/form";
import { match, P } from "ts-pattern";
import { formatEmeraldTargetFromPainting } from "~/utils/formatEmeraldTargetFromPainting";

import {
  emeraldWildGameData,
  Validator,
  FormState,
  initialValues,
  CaughtMonResult,
  BATTLE_VIDEO_CONFIDENCE_RANGE,
} from "./wild3CalibCaughtMon";

type Props = {
  setLatestHitAdv?: (hitAdv: {
    frame_before_painting: number;
    adv_after_painting: number;
  }) => void;
};

const PAINTING_CONFIDENCE_RANGE = 600; // We assume the player hits its target advance by more or less 10s

let nextUid = 0;

const searchCaughtMon = async (values: FormState, targetSetup: TargetSetup) => {
  const initial_seed = targetSetup.usingPaintingReseeding
    ? targetSetup.targetFrameBeforePainting
    : 0;

  const initial_advances = Math.max(
    targetSetup.targetAdvance - BATTLE_VIDEO_CONFIDENCE_RANGE,
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

  const max_advances = BATTLE_VIDEO_CONFIDENCE_RANGE * 2;
  const opts: Wild3SearcherOptions = {
    initial_seed,
    tid: 0, // doesn't matter
    sid: 0, // doesn't matter
    initial_advances,
    max_advances,
    max_result_count: 2 ** 32 - 1, // No limit
    filter: {
      ...pkmFilterFieldsToRustInput({
        ...getPkmFilterInitialValues(),
        filter_nature: values.nature,
        filter_gender: values.gender,
        filter_ability: values.ability,
      }),
      ...minMaxIvs,
    },
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
    consider_rng_manipulated_lead_pid: false,
    generate_even_if_impossible: values.generate_even_if_impossible,
    painting_opts: null,
    lead_cycle_speed: targetSetup.leadCycleSpeed,
  };

  const [min_initial_seed, max_initial_seed] =
    !targetSetup.usingPaintingReseeding || targetSetup.isPaintingSeedConfirmed
      ? [initial_seed, initial_seed]
      : [
          Math.max(0, initial_seed - PAINTING_CONFIDENCE_RANGE),
          Math.min(0xffff, initial_seed + PAINTING_CONFIDENCE_RANGE),
        ];

  const wrappedResultsBySeed =
    await rngTools.search_wild3_with_initial_advances_range(
      opts,
      min_initial_seed,
      max_initial_seed,
    );
  const resultsBySeed = wrappedResultsBySeed.map(
    (wrappedRes) => wrappedRes.vec,
  );

  const list = resultsBySeed
    .map((results, seedIncr) => {
      const seed = seedIncr + min_initial_seed;
      return results
        .filter((result) => {
          return result.advance <= max_advances;
        })
        .map((result) => {
          const probabilityHitMethodsAtAdvance =
            result.cycle_data_by_lead?.specified_lead?.method_probability ?? 0;
          const scoreHitMethodsAtAdvance = clamp(
            probabilityHitMethodsAtAdvance,
            0.01,
            1,
          );

          const distanceFromTargetAfter = Math.abs(
            targetSetup.targetAdvance - result.advance,
          );
          const distanceFromTargetBefore = Math.abs(
            targetSetup.targetFrameBeforePainting - seed,
          );
          const distanceFromTargetScore =
            distanceFromTargetAfter + distanceFromTargetBefore ** 1.5;
          // after has more chance to fluctuate than before.
          // distance = 100 => scoreBefore = 1000

          const score = distanceFromTargetScore / scoreHitMethodsAtAdvance;

          return {
            advance: {
              frame_before_painting: seed,
              adv_after_painting: result.advance,
            },
            targetAdvance: {
              frame_before_painting: targetSetup.targetFrameBeforePainting,
              adv_after_painting: targetSetup.targetAdvance,
            },
            method: result.method,
            score,
            probabilityHitMethodsAtAdvance,
            distanceFromTargetAfter,
            distanceFromTargetBefore,
            uid: nextUid++,
            ...getGen3IvRating(result.ivs),
            statsWithRareCandy: createAllStats0(),
            ivs: result.ivs,
          };
        });
    })
    .flat();

  list.sort((res1, res2) => {
    return res1.score - res2.score;
  });

  return updateResultsForRareCandy(
    list,
    values.species,
    values.lvl,
    values.nature,
    values.rareCandy,
  );
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

const Fields = ({
  targetSetup,
  onRareCandyChange,
}: {
  targetSetup: TargetSetup;
  onRareCandyChange: (
    species: Species,
    lvl: number,
    nature: Nature,
    rareCandy: number,
  ) => void;
}) => {
  const { setFieldValue } = useFormContext<FormState>();

  const selectedSpecies = useWatch<FormState, "species">({ name: "species" });
  const selectedLvl = useWatch<FormState, "lvl">({ name: "lvl" });
  const selectedNature = useWatch<FormState, "nature">({ name: "nature" });
  const rareCandy = useWatch<FormState, "rareCandy">({ name: "rareCandy" });

  const [fields, setFields] = React.useState<Field[]>([]);

  React.useEffect(() => {
    onRareCandyChange(selectedSpecies, selectedLvl, selectedNature, rareCandy);
  }, [
    onRareCandyChange,
    rareCandy,
    selectedLvl,
    selectedNature,
    selectedSpecies,
  ]);

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
    ]).then(([minMaxStats]) => {
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
              species={selectedSpecies}
              permitAny={false}
            />
          ),
        },
        {
          label: "Ability",
          input: (
            <FormikAbilityFilter<FormState>
              name="ability"
              species={selectedSpecies}
              permitAny={false}
              displayHiddenAbility={false}
              mergeFirstSecondIfSameAbility
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
        {
          label: "Rare Candy",
          input: (
            <Flex dir="row">
              <Button
                trackerId="wild3_calib_set_rare_candy_to_1"
                onClick={() => {
                  setFieldValue("rareCandy", 1);
                }}
              >
                {" =1 "}
              </Button>
              <FormikNumberInput<FormState>
                name="rareCandy"
                numType="decimal"
              />
              <Button
                trackerId="wild3_calib_add_rare_candy"
                onClick={() => {
                  setFieldValue("rareCandy", Math.min(rareCandy + 1, 99));
                }}
              >
                {" +1 "}
              </Button>
            </Flex>
          ),
        },
        {
          label: "Display results with 0% likelihood",
          input: <FormikSwitch<FormState> name="generate_even_if_impossible" />,
        },
      ]);
    });
  }, [
    targetSetup,
    selectedSpecies,
    selectedLvl,
    selectedNature,
    setFieldValue,
    rareCandy,
  ]);

  return <FormFieldTable fields={fields} />;
};

const updateResultsForRareCandy = async (
  results: CaughtMonResult[],
  species: Species,
  initialLvl: number,
  nature: Nature,
  rareCandy: number,
) => {
  return Promise.all(
    results.map(async (res) => {
      return {
        ...res,
        statsWithRareCandy: await rngTools.calculate_stats(
          species,
          Math.min(initialLvl + rareCandy, 100),
          nature,
          res.ivs,
          createAllStats0(),
        ),
      };
    }),
  );
};

export const Wild3CalibCaughtMonForPainting = ({
  targetSetup,
  setLatestHitAdv,
}: PropsForPainting) => {};

export const Wild3CalibCaughtMon = ({
  targetSetup,
  setLatestHitAdv,
}: Props) => {
  const [lastRareCandyValue, setLastRareCandyValue] = React.useState(1);
  const [results, setResults] = React.useState<CaughtMonResult[]>([]);
  const {
    targetMethod,
    targetAdvance,
    targetFrameBeforePainting: targetFrameBeforePaintingInput,
    usingPaintingReseeding,
    isPaintingSeedConfirmed,
  } = targetSetup;

  const targetFrameBeforePainting = usingPaintingReseeding
    ? targetFrameBeforePaintingInput
    : 0;

  const onSubmit: RngToolSubmit<FormState> = async (values) => {
    setResults(await searchCaughtMon(values, targetSetup));
  };

  const getAdvDiffTxt = (
    result: CaughtMonResult,
    prop: "adv_after_painting" | "frame_before_painting",
  ) => {
    const diffWithTarget = result.advance[prop] - result.targetAdvance[prop];
    const valStr = formatLargeInteger(result.advance[prop]);

    if (diffWithTarget === 0) {
      const suffix =
        prop === "frame_before_painting" && !isPaintingSeedConfirmed
          ? " (Target)"
          : "";
      return `${valStr}${suffix}`;
    }
    const sign = diffWithTarget > 0 ? "+" : "";

    return `${valStr} (${sign}${formatLargeInteger(diffWithTarget)})`;
  };

  const columns: ResultColumn<CaughtMonResult>[] = [
    {
      title: (
        <span>
          Update <br /> Calibration
        </span>
      ),
      key: "Update Calibration",
      dataIndex: "advance",
      show: setLatestHitAdv != null,
      render: (advance, values) => {
        const isTryingToGetATargetPokemon =
          !usingPaintingReseeding || isPaintingSeedConfirmed;

        if (
          isTryingToGetATargetPokemon &&
          values.advance.adv_after_painting === targetAdvance &&
          values.advance.frame_before_painting === targetFrameBeforePainting &&
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
              setLatestHitAdv?.(advance);
              setResults([]);
            }}
          >
            <Icon name="Update" size={20} />
          </Button>
        );
      },
    },
    {
      title: (
        <span>
          Frame before <br /> painting
        </span>
      ),
      key: "frame_before_painting",
      dataIndex: "advance",
      show: usingPaintingReseeding,
      render: (_, values) => {
        return getAdvDiffTxt(values, "frame_before_painting");
      },
    },
    {
      title: usingPaintingReseeding ? (
        <span>
          Advance after <br /> painting
        </span>
      ) : (
        "Advance"
      ),
      key: "frame_after_painting",
      dataIndex: "advance",
      render: (_, values) => {
        const diffTxt = getAdvDiffTxt(values, "adv_after_painting");
        const title = formatEmeraldTargetFromPainting(
          values.advance.frame_before_painting,
          values.advance.adv_after_painting,
        );
        return <Tooltip title={title}>{diffTxt}</Tooltip>;
      },
    },
    {
      title: (
        <span>
          Confidence <br /> Rating
        </span>
      ),
      key: "Confidence Rating",
      dataIndex: "score",
      render: (score, values) => {
        const ratingTxt = match(score)
          .with(P.number.between(0, 500), () => "Very High")
          .with(P.number.between(500, 1000), () => "High")
          .with(P.number.between(1000, 2000), () => "Medium")
          .with(P.number.between(2000, 10000), () => "Low")
          .otherwise(() => "Very Low");

        const { method } = values;
        const prob = formatProbability(values.probabilityHitMethodsAtAdvance);

        const dist =
          values.distanceFromTargetBefore + values.distanceFromTargetAfter;

        const title = `Distance from target: ${dist} advances. Method ${method} (${prob} likelihood)`;
        return <Tooltip title={title}>{ratingTxt}</Tooltip>;
      },
    },
    {
      title: "Remove",
      dataIndex: "advance",
      render: (_, values) => {
        return (
          <Button
            type="text"
            color="PrimaryText"
            trackerId="Wild3CalibCaughtMon_remove"
            onClick={() => {
              setResults(results.filter((res) => res !== values));
            }}
          >
            <Icon name="Close" />
          </Button>
        );
      },
    },
    {
      title: `Stats with x${lastRareCandyValue ?? 0} Rare Candy`,
      type: "group",
      columns: [
        {
          title: "HP",
          dataIndex: "statsWithRareCandy",
          render: (statsWithRareCandy) => {
            return statsWithRareCandy.hp;
          },
        },
        {
          title: "Atk",
          dataIndex: "statsWithRareCandy",
          render: (statsWithRareCandy) => {
            return statsWithRareCandy.atk;
          },
        },
        {
          title: "Def",
          dataIndex: "statsWithRareCandy",
          render: (statsWithRareCandy) => {
            return statsWithRareCandy.def;
          },
        },
        {
          title: "SpA",
          dataIndex: "statsWithRareCandy",
          render: (statsWithRareCandy) => {
            return statsWithRareCandy.spa;
          },
        },
        {
          title: "SpD",
          dataIndex: "statsWithRareCandy",
          render: (statsWithRareCandy) => {
            return statsWithRareCandy.spd;
          },
        },
        {
          title: "Spe",
          dataIndex: "statsWithRareCandy",
          render: (statsWithRareCandy) => {
            return statsWithRareCandy.spe;
          },
        },
      ],
    },
    {
      title: (
        <Tooltip title="Rating from the stat judge in the building behind the Pokémon Center at the Battle Frontier.">
          <div>
            IV Rating <Icon name="InformationCircle" size={16} />
          </div>
        </Tooltip>
      ),
      key: "ivRating",
      type: "group",
      columns: [
        {
          title: "Sum IVs",
          dataIndex: "sumIvsMsg",
        },
        {
          title: "Highest IV",
          dataIndex: "highestStatIds",
          render: (highestStatIds, values) => {
            return `${values.highestIvMsg} (${highestStatIds.map((statId) => statId.toUpperCase()).join(", ")})`;
          },
        },
      ],
    },
  ];

  const onRareCandyChange = async (
    species: Species,
    lvl: number,
    nature: Nature,
    rareCandy: number,
  ) => {
    if (lastRareCandyValue === rareCandy) {
      return;
    }
    setLastRareCandyValue(rareCandy);

    setResults(
      await updateResultsForRareCandy(results, species, lvl, nature, rareCandy),
    );
  };

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
          <Fields
            targetSetup={targetSetup}
            onRareCandyChange={onRareCandyChange}
          />
        </Flex>
      </RngToolForm>
    </Flex>
  );
};
