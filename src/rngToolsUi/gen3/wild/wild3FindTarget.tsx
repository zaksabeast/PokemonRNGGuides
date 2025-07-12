import {
  Gender,
  rngTools,
  Species,
  Gen3EncounterType,
  Wild3SearcherResultMon,
  Wild3SearcherCycleData,
  Gen3Lead,
  Gen3Method,
  Gen3EncounterInfo,
} from "~/rngTools";
import {
  Field,
  FormikNumberInput,
  FormikSelect,
  FormikSwitch,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  FormFieldTable,
  Flex,
  Typography,
} from "~/components";
import { toOptions } from "~/utils/options";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { formatProbability } from "~/utils/formatProbability";
import { useFormikContext } from "formik";
import {
  getPkmFilterFields,
  pkmFilterSchema,
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import { Static3Game } from "~/rngToolsUi/gen3/static/constants";
import React from "react";
import { z } from "zod";
import {
  species,
  nature,
  genderRatioBySpecies,
  hasMultiplePossibleGenders,
  gen3Methods,
  gen3SpeciesHasVariableSize,
} from "~/types";
import { match, P } from "ts-pattern";

import { getWild3GameData } from "./wild3GameData";
import emerald_wild3_game_data from "~/__generated__/emerald_wild3_game_data";
import { uniq, startCase, sortBy } from "lodash-es";
import { FlattenIvs, ivColumns } from "~/rngToolsUi/shared/ivColumns";
import { Tooltip } from "antd";
import {
  gen3PkmFilterFieldsToRustInput,
  getGen3PkmFilterInitialValues,
  gen3PkmFilterSchema,
  getGen3PkmFilterFields,
} from "~/components/gen3PkmFilter";

/*
Possible improvements:
 - Add Tooltip for Likelihood by lead speed columns.

 - Support multiple encounter types.
 - Support all leads in generator.
 - Display warning if no maps or no leads are selected.
 - Add lead PID speed filter.

 - Display map names instead of formatted map IDs.
 - Disable gender field if only 1 possible gender, instead of hiding it.
 - Display ability names instead of First, Second, or Hidden.
 - If no nature filter, then Synchonize leads is <Nature> or Not <Nature>.
 - Min/Max IVs should display the stat name.
 - Rename "None" to "Any" in filters.
 - Add Max Size filter.
*/

const gen3EncounterTypes = [
  "Land",
  "Water",
  "OldRod",
  "GoodRod",
  "SuperRod",
  "RockSmash",
] as const satisfies readonly Gen3EncounterType[];

const cuteCharmGenders = [
  "Male",
  "Female",
] as const satisfies readonly Gender[];

const emeraldWildGameData = getWild3GameData(emerald_wild3_game_data);

const Validator = z
  .object({
    species: z.enum(species),
    tid: z.number().int().min(0).max(0xffff),
    sid: z.number().int().min(0).max(0xffff),
    maps: z.array(z.string()),
    vanillaLead: z.boolean(),
    cuteCharmLeadGenders: z.array(z.enum(cuteCharmGenders)),
    synchronizeLeadNatures: z.array(z.enum(nature)),
    encounterTypes: z.array(z.enum(gen3EncounterTypes)),
    methods: z.array(z.enum(gen3Methods)),
    initial_advances: z.number().int().min(0).max(0xffffffff),
    max_advances: z.number().int().min(0).max(0xffffffff),
    max_result_count: z.number().int().min(1),
    rngManipulatedLeadPid: z.boolean(),
    mergeSimilarResults: z.boolean(),
  })
  .merge(pkmFilterSchema)
  .merge(gen3PkmFilterSchema);

type FormState = z.infer<typeof Validator>;

const getInitialValues = (): FormState => {
  return {
    species: "Abra",
    tid: 0,
    sid: 0,
    maps: [],
    vanillaLead: true,
    cuteCharmLeadGenders: [...cuteCharmGenders],
    synchronizeLeadNatures: [...nature],
    methods: ["Wild1", "Wild2", "Wild4"],
    encounterTypes: [...gen3EncounterTypes],
    initial_advances: 1000,
    max_advances: 100_000,
    max_result_count: 10_000,
    rngManipulatedLeadPid: false,
    mergeSimilarResults: true,
    ...getPkmFilterInitialValues(),
    ...getGen3PkmFilterInitialValues(),
  };
};

const getTargetMonFields = (species: Species): Field[] => {
  const multipleGenders = hasMultiplePossibleGenders(
    genderRatioBySpecies,
    species,
  );

  const targetMonFields: Field[] = [
    {
      label: "Species",
      input: (
        <FormikSelect<FormState, "species">
          name="species"
          options={toOptions(emeraldWildGameData.species)}
        />
      ),
    },
    ...getPkmFilterFields({ gender: multipleGenders }),
    ...getGen3PkmFilterFields({
      max_size: gen3SpeciesHasVariableSize(species),
    }),
  ];
  return targetMonFields;
};

const formatMapName = (label: string) => {
  return label
    .split("_")
    .map((piece) =>
      piece.match(/(?:B)?\d+F/) != null
        ? piece
        : startCase(piece.toLowerCase()),
    )
    .join(" ")
    .replace(/^Map /, "");
};

const formatEncounterTypeName = (encounterType: Gen3EncounterType) => {
  return match(encounterType)
    .with("OldRod", () => "Old Rod")
    .with("GoodRod", () => "Good Rod")
    .with("SuperRod", () => "Super Rod")
    .with("RockSmash", () => "Rock Smash")
    .otherwise(() => encounterType);
};

const getMapsWithSpecies = (species: Species) =>
  Array.from(
    emeraldWildGameData.speciesToEncounterInfo.get(species)?.keys() ?? [],
  );

const getEncounterTypesWithSpecies = (species: Species) =>
  uniq(
    getMapsWithSpecies(species).flatMap((mapId) => {
      const encounterInfos = emeraldWildGameData.speciesToEncounterInfo
        .get(species)
        ?.get(mapId);
      return encounterInfos?.map((info) => info.encounter_type) ?? [];
    }),
  );

const getSetupFields = (species: Species, filter_shiny: boolean): Field[] => {
  const fields: Field[] = [
    {
      label: "Species",
      input: (
        <FormikSelect<FormState, "species">
          name="species"
          options={toOptions(emeraldWildGameData.species)}
        />
      ),
    },
    {
      label: "TID",
      input: (
        <FormikNumberInput<FormState>
          name="tid"
          numType="decimal"
          disabled={!filter_shiny}
        />
      ),
    },
    {
      label: "SID",
      input: (
        <FormikNumberInput<FormState>
          name="sid"
          numType="decimal"
          disabled={!filter_shiny}
        />
      ),
    },
    {
      label: "Maps",
      input: (
        <FormikSelect<FormState, "maps">
          name="maps"
          options={toOptions(getMapsWithSpecies(species), formatMapName)}
          mode="multiple"
          fullWidth={true}
          selectAllNoneButtons={true}
        />
      ),
    },
    {
      label: "Encounters",
      input: (
        <FormikSelect<FormState, "encounterTypes">
          name="encounterTypes"
          options={toOptions(
            getEncounterTypesWithSpecies(species),
            formatEncounterTypeName,
          )}
          mode="multiple"
          fullWidth={true}
          selectAllNoneButtons={true}
        />
      ),
    },
    {
      label: "Ordinary lead",
      input: <FormikSwitch<FormState> name="vanillaLead" />,
    },
    {
      label: "Synchronize leads",
      input: (
        <FormikSelect<FormState, "synchronizeLeadNatures">
          name="synchronizeLeadNatures"
          options={toOptions(nature)}
          mode="multiple"
          selectAllNoneButtons={true}
        />
      ),
    },
    {
      label: "Cute Charm leads",
      input: (
        <FormikSelect<FormState, "cuteCharmLeadGenders">
          name="cuteCharmLeadGenders"
          options={toOptions(cuteCharmGenders)}
          mode="multiple"
        />
      ),
    },
    /*
    //TODO: support multiple encounter types
    {
      label: "Encounter types",
      input: (
        <FormikSelect<FormState, "encounterTypes">
          name="encounterTypes"
          options={toOptions(gen3EncounterTypes)}
          mode="multiple"
        />
      ),
    },
    */
    {
      label: "Methods",
      input: (
        <FormikSelect<FormState, "methods">
          name="methods"
          options={toOptions(gen3Methods)}
          mode="multiple"
        />
      ),
    },
    {
      label: "RNG-manipulated lead PID",
      input: <FormikSwitch<FormState> name="rngManipulatedLeadPid" />,
    },
    {
      label: "Initial advances",
      input: (
        <FormikNumberInput<FormState>
          name="initial_advances"
          numType="decimal"
        />
      ),
    },
    {
      label: "Max advances",
      input: (
        <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
      ),
    },
    {
      label: "Max result count",
      input: (
        <FormikNumberInput<FormState>
          name="max_result_count"
          numType="decimal"
        />
      ),
    },
    {
      label: "Merge similar results",
      input: <FormikSwitch<FormState> name="mergeSimilarResults" />,
    },
  ];
  return fields;
};

export const TargetMon = () => {
  const { values, setValues } = useFormikContext<FormState>();

  const fields = React.useMemo((): Field[] => {
    return getTargetMonFields(values.species);
  }, [values.species]);

  React.useEffect(() => {
    setValues((prev) => ({
      ...prev,
      maps: getMapsWithSpecies(values.species),
      encounterTypes: getEncounterTypesWithSpecies(values.species),
    }));
  }, [values.species, setValues]);

  return (
    <Flex vertical gap={8}>
      <Typography.Title level={5} p={0} m={0}>
        Target Pokémon
      </Typography.Title>
      <FormFieldTable fields={fields} />
    </Flex>
  );
};

export const SetupFilter = () => {
  const { values } = useFormikContext<FormState>();

  const fields = React.useMemo((): Field[] => {
    return getSetupFields(values.species, values.filter_shiny);
  }, [values.species, values.filter_shiny]);

  return (
    <Flex vertical gap={8}>
      <Typography.Title level={5} p={0} m={0}>
        Considered Setups
      </Typography.Title>
      <FormFieldTable fields={fields} />
    </Flex>
  );
};

const getMethodLikelihoodColumValue = (
  cycleData: Wild3SearcherCycleData,
  method: Gen3Method,
) => {
  const probAsTxt = formatProbability(cycleData.method_probability);
  const end =
    cycleData.pre_sweet_scent_cycle_range.start +
    cycleData.pre_sweet_scent_cycle_range.len;
  const rangeAsTxt =
    end === 0
      ? `Method ${method} can't be triggered.`
      : `Method ${method} is triggered if the cycle counter at Sweet Scent is between ${cycleData.pre_sweet_scent_cycle_range.start} and ${end}.`;
  return (
    <Tooltip title={rangeAsTxt}>
      <div>{probAsTxt}</div>
    </Tooltip>
  );
};

const getColumns = (values: FormState): ResultColumn<UiResult>[] => {
  const columns: ResultColumn<UiResult>[] = [];
  columns.push(
    {
      title: "Advances",
      dataIndex: "advance",
      monospace: true,
      render: (adv) => {
        const durInMinutes = (adv / 59.7275 / 60).toFixed(1);
        return (
          <Tooltip title={`~${durInMinutes} min`}>
            <div>{formatLargeInteger(adv)}</div>
          </Tooltip>
        );
      },
    },
    { title: "Map", dataIndex: "mapName" },
    { title: "Encounter", dataIndex: "encounterTypeName" },
    { title: "Method", dataIndex: "method" },
  );

  if (!values.rngManipulatedLeadPid) {
    columns.push({
      title: "Method Likelihood",
      dataIndex: "cycle_data_by_lead",
      render: (cycle_data_by_lead) => {
        if (cycle_data_by_lead == undefined) {
          return "";
        }
        const least_likely_common =
          cycle_data_by_lead.common_lower_lead.method_probability <
          cycle_data_by_lead.common_upper_lead.method_probability
            ? cycle_data_by_lead.common_lower_lead
            : cycle_data_by_lead.common_upper_lead;
        return formatProbability(least_likely_common.method_probability);
      },
    });
  }

  columns.push({
    title: "Lead",
    dataIndex: "lead",
    render: (lead) => {
      return match(lead)
        .with("Vanilla", () => "Ordinary lead")
        .with(
          { Synchronize: P.string },
          (matched) => `Synchronize (${matched.Synchronize})`,
        )
        .with(
          { CuteCharm: P.string },
          (matched) => `CuteCharm (${matched.CuteCharm})`,
        )
        .with("Egg", () => "Egg lead")
        .exhaustive();
    },
  });

  if (values.rngManipulatedLeadPid) {
    columns.push(
      {
        title: "Ideal Lead Speed",
        dataIndex: "cycle_data_by_lead",
        render: (cycle_data_by_lead, values) => {
          if (cycle_data_by_lead == undefined) {
            return "";
          }
          if (values.lead === "Egg") {
            return "";
          }
          if (
            cycle_data_by_lead.slowest_lead.method_probability ===
            cycle_data_by_lead.fastest_lead.method_probability
          ) {
            return "Any";
          }
          const cycle = cycle_data_by_lead.ideal_lead.lead_pid_cycle_count;
          const label = match(cycle)
            .with(18, () => "Fastest")
            .with(900, () => "Slowest")
            .with(P.number, () => {
              return cycle + " cycles";
            })
            .exhaustive();

          return label;
        },
      },
      {
        title: "Method Likelyhood by Lead Speed",
        type: "group",
        columns: [
          {
            title: "Ideal",
            dataIndex: "cycle_data_by_lead",
            render: (cycle_data_by_lead, values) => {
              if (cycle_data_by_lead == undefined) {
                return "";
              }
              return getMethodLikelihoodColumValue(
                cycle_data_by_lead.ideal_lead,
                values.method,
              );
            },
          },
          {
            title: "Fastest",
            dataIndex: "cycle_data_by_lead",
            render: (cycle_data_by_lead, values) => {
              if (cycle_data_by_lead == undefined) {
                return "";
              }
              return getMethodLikelihoodColumValue(
                cycle_data_by_lead.fastest_lead,
                values.method,
              );
            },
          },
          {
            title: "Common",
            dataIndex: "cycle_data_by_lead",
            render: (cycle_data_by_lead, values) => {
              if (cycle_data_by_lead == undefined) {
                return "";
              }
              const least_likely_common =
                cycle_data_by_lead.common_lower_lead.method_probability <
                cycle_data_by_lead.common_upper_lead.method_probability
                  ? cycle_data_by_lead.common_lower_lead
                  : cycle_data_by_lead.common_upper_lead;
              return getMethodLikelihoodColumValue(
                least_likely_common,
                values.method,
              );
            },
          },
          {
            title: "Slowest",
            dataIndex: "cycle_data_by_lead",
            render: (cycle_data_by_lead, values) => {
              if (cycle_data_by_lead == undefined) {
                return "";
              }
              return getMethodLikelihoodColumValue(
                cycle_data_by_lead.slowest_lead,
                values.method,
              );
            },
          },
        ],
      },
    );
  }

  columns.push(
    { title: "Species", dataIndex: "species" },
    {
      title: "PID",
      dataIndex: "pid",
      monospace: true,
      render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
    },
    { title: "Nature", dataIndex: "nature" },
    { title: "Ability", dataIndex: "ability" },
    {
      title: "Shiny",
      dataIndex: "shiny",
      render: (shiny: boolean) => (shiny ? "Yes" : "No"),
    },
    { title: "Gender", dataIndex: "gender" },
    ...ivColumns,
    {
      title: "Hidden Power",
      type: "group",
      columns: [
        {
          title: "Type",
          dataIndex: "hidden_power",
          render: (hidden_power) => hidden_power.pokemon_type,
        },
        {
          title: "Power",
          dataIndex: "hidden_power",
          render: (hidden_power) => hidden_power.bp,
        },
      ],
    },
    {
      title: "PID speed",
      dataIndex: "pidCycleCount",
      render: (pidCycleCount) => `${pidCycleCount} cycles`,
    },
  );
  return columns;
};

type Props = {
  game: Static3Game;
};

type UiResult = FlattenIvs<
  Wild3SearcherResultMon & {
    species: Species;
    mapName: string;
    encounterTypeName: string;
    uid: number;
    pidCycleCount: number;
  }
>;

const getLeads = (values: FormState): Gen3Lead[] => {
  const leads: Gen3Lead[] = [];

  if (values.vanillaLead) {
    leads.push("Vanilla");
  }
  for (const nature of values.synchronizeLeadNatures) {
    leads.push({
      Synchronize: nature,
    });
  }
  return leads;
};

const getEncounterInfoByMap = (
  values: FormState,
): [string, Gen3EncounterInfo][] => {
  if (values.species === "None") {
    return [];
  }
  const allowedMaps = values.maps;
  const allowedEncounterTypes = values.encounterTypes;

  const allMapsForSpecies = emeraldWildGameData.speciesToEncounterInfo.get(
    values.species,
  );
  if (allMapsForSpecies === undefined) {
    return []; // error
  }

  const res: [string, Gen3EncounterInfo][] = [];
  allMapsForSpecies.forEach((encounterInfos, mapId) => {
    if (!allowedMaps.includes(mapId)) {
      return;
    }
    encounterInfos.forEach((encounterInfo) => {
      if (!allowedEncounterTypes.includes(encounterInfo.encounter_type)) {
        return;
      }
      res.push([mapId, encounterInfo]);
    });
  });
  return res;
};

let nextUid = 0;
const convertSearcherResultToUIResult = async (
  res: Wild3SearcherResultMon,
  species: Species,
  mapName: string,
  encounterTypeName: string,
): Promise<UiResult> => {
  return {
    ...res,
    ...res.ivs,
    mapName,
    encounterTypeName,
    species,
    uid: nextUid++,
    pidCycleCount: await rngTools.calculate_pid_speed(res.pid),
  };
};

const filterResults = (results: Wild3SearcherResultMon[]) => {
  const resByMon = new Map<string, Wild3SearcherResultMon>();
  results.forEach((res) => {
    const key = `${res.pid},${res.ivs.hp},${res.ivs.atk},${res.ivs.def},${res.ivs.spa},${res.ivs.spd},${res.ivs.spe}`;
    const alreadyAddedRes = resByMon.get(key);

    // If possible, keep the vanilla lead because it's simpler to get.
    if (
      alreadyAddedRes === undefined ||
      (alreadyAddedRes.lead !== "Vanilla" && res.lead === "Vanilla")
    ) {
      resByMon.set(key, res);
    }
  });
  return Array.from(resByMon.values());
};

const sortResults = (results: Wild3SearcherResultMon[]) => {
  return sortBy(results, ["advance", "method", "map_idx"]);
};

export const Wild3SearcherFindTarget = ({ game }: Props) => {
  const [results, setResults] = React.useState<UiResult[]>([]);

  const initial_seed = game === "emerald" ? 0 : 0x5a0;

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (values) => {
      const encounterInfoByMap = getEncounterInfoByMap(values);

      const opts = {
        initial_seed,
        tid: values.tid,
        sid: values.sid,
        gender_ratio: genderRatioBySpecies[values.species],
        initial_advances: values.initial_advances,
        max_advances: values.max_advances,
        max_result_count: values.max_result_count,
        filter: pkmFilterFieldsToRustInput(values),
        gen3_filter: gen3PkmFilterFieldsToRustInput(values),
        leads: getLeads(values),
        encounter_info_by_map: encounterInfoByMap.map((val) => val[1]),
        methods: values.methods,
        consider_cycles: true,
        consider_rng_manipulated_lead_pid: values.rngManipulatedLeadPid,
      };

      let results = await rngTools.search_wild3(opts);
      if (values.mergeSimilarResults) {
        results = filterResults(results);
      }
      results = sortResults(results);

      const uiResults = await Promise.all(
        results.map((res) => {
          const [mapId, encounterInfo] = encounterInfoByMap[res.map_idx];
          return convertSearcherResultToUIResult(
            res,
            values.species,
            formatMapName(mapId),
            formatEncounterTypeName(encounterInfo.encounter_type),
          );
        }),
      );

      setResults(uiResults);
    },
    [initial_seed],
  );

  const initialValues = React.useMemo(() => {
    return getInitialValues();
  }, []);

  return (
    <RngToolForm<FormState, UiResult>
      getColumns={getColumns}
      results={results}
      validationSchema={Validator}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="wild3_find_target"
      rowKey="uid"
    >
      <TargetMon />
      <br />
      <SetupFilter />
    </RngToolForm>
  );
};
