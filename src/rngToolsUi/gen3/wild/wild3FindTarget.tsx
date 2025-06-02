import {
  Gender,
  rngTools,
  Species,
  Nature,
  Wild3GeneratorResult,
  Gen3EncounterType,
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
import { useFormikContext } from "formik";
import {
  getPkmFilterFields,
  pkmFilterSchema,
  getPkmFilterInitialValues,
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
} from "~/types";

import { getWild3GameData } from "./wild3GameData";
import emerald_wild3_game_data from "./emerald_wild3_game_data";
import { startCase } from "lodash-es";
import { FlattenIvs, ivColumns } from "~/rngToolsUi/shared/ivColumns";

/*
Possible improvements:
 - Support multiple encounter types.
 - Support other leads in generator.
 - Display warning if no maps or no leads are selected.
 - Add Hidden Power filter.

 - Display map names instead of map IDs.
 - Disable gender field if only 1 possible gender, instead of hiding it.
 - Display ability names instead of First, Second, or Hidden.
 - If no nature filter, then Synchonize leads is <Nature> or Not <Nature>.
 - Min/Max IVs should display the stat name.
 - Rename "None" to "Any" in filters.
 - Add Max Size filter.
*/

const gen3EncounterTypes = [
  "Land",
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
  })
  .merge(pkmFilterSchema);

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
    methods: ["Wild2"],
    encounterTypes: [...gen3EncounterTypes],
    initial_advances: 1000,
    max_advances: 100_000,
    max_result_count: 10_000,
    ...getPkmFilterInitialValues(),
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
    .join(" ");
};

const getSetupFields = (species: Species, filter_shiny: boolean): Field[] => {
  const mapsWithSpecies = Array.from(
    emeraldWildGameData.speciesToEncounterSlots.get(species)?.keys() ?? [],
  );

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
          options={toOptions(mapsWithSpecies, formatMapName)}
          mode="multiple"
          fullWidth={true}
        />
      ),
    },
    {
      label: "Ordinary lead",
      input: <FormikSwitch<FormState, "vanillaLead"> name="vanillaLead" />,
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
  ];
  return fields;
};

export const TargetMon = () => {
  const { values, setValues } = useFormikContext<FormState>();

  const fields = React.useMemo((): Field[] => {
    return getTargetMonFields(values.species);
  }, [values.species]);

  React.useEffect(() => {
    const allMaps = emeraldWildGameData.speciesToEncounterSlots.get(
      values.species,
    );
    const newMaps = allMaps !== undefined ? Array.from(allMaps.keys()) : [];
    setValues((prev) => ({ ...prev, maps: newMaps }));
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

const columns: ResultColumn<Result>[] = [
  {
    title: "Advances",
    dataIndex: "advance",
    monospace: true,
    render: (adv) => {
      const durInMinutes = (adv / 59.7275 / 60).toFixed(1);
      return `${formatLargeInteger(adv)} (~${durInMinutes} min)`;
    },
  },
  { title: "Map", dataIndex: "mapName" },
  {
    title: "Lead",
    dataIndex: "lead",
    render: (lead) => {
      if (lead == null) {
        return "Ordinary lead";
      }
      if ("Synchronize" in lead) {
        return `Synchronize (${lead.Synchronize})`;
      }
      if ("CuteCharm" in lead) {
        return `CuteCharm (${lead.CuteCharm})`;
      }
      return "Unknown lead";
    },
  },
  { title: "Encounter", dataIndex: "encounter" },
  { title: "Method", dataIndex: "method" },
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
];

type Props = {
  game: Static3Game;
};

type Result = FlattenIvs<
  Wild3GeneratorResult & {
    species: Species;
    mapName: string;
    encounter: Gen3EncounterType;
  }
>;

const getLeads = (values: FormState) => {
  const leads: ({
    Synchronize: Nature;
  } | null)[] = [];

  if (values.vanillaLead) {
    leads.push(null);
  }
  for (const nature of values.synchronizeLeadNatures) {
    leads.push({
      Synchronize: nature,
    });
  }
  return leads;
};

const getEncounterSlotsByMap = (values: FormState) => {
  if (values.species === "None") {
    return [];
  }

  const allMaps = emeraldWildGameData.speciesToEncounterSlots.get(
    values.species,
  );
  if (allMaps === undefined) {
    return []; // error
  }

  const mapIdAndSlots = Array.from(allMaps.entries());
  return mapIdAndSlots.filter((val) => {
    return values.maps.includes(val[0]);
  });
};

export const Wild3SearcherFindTarget = ({ game }: Props) => {
  const [results, setResults] = React.useState<Result[]>([]);

  const initial_seed = game === "emerald" ? 0 : 0x5a0;

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (values) => {
      const ecounterSlotsByMap = getEncounterSlotsByMap(values);

      const results = await rngTools.search_wild3({
        initial_seed,
        tid: values.tid,
        sid: values.sid,
        gender_ratio: genderRatioBySpecies[values.species],
        initial_advances: values.initial_advances,
        max_advances: values.max_advances,
        max_result_count: values.max_result_count,
        filter: {
          shiny: values.filter_shiny,
          nature: values.filter_nature,
          gender: values.filter_gender,
          min_ivs: values.filter_min_ivs,
          max_ivs: values.filter_max_ivs,
          ability: values.filter_ability,
          stats: null,
        },
        leads: getLeads(values),
        encounter_slots_by_map: ecounterSlotsByMap.map((val) => val[1]),
        methods: values.methods,
      });

      setResults(
        results.map((res) => {
          return {
            ...res,
            ...res.ivs,
            mapName: ecounterSlotsByMap[res.map_idx][0],
            encounter: "Land",
            species: values.species,
          };
        }),
      );
    },
    [initial_seed],
  );

  const initialValues = React.useMemo(() => {
    return getInitialValues();
  }, []);

  return (
    <RngToolForm<FormState, Result>
      columns={columns}
      results={results}
      validationSchema={Validator}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="wild3_find_target"
    >
      <TargetMon />
      <br />
      <SetupFilter />
    </RngToolForm>
  );
};
