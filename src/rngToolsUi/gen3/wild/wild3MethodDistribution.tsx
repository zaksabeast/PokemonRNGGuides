import {
  rngTools,
  Species,
  Wild3SearcherResultMon,
  Wild3SearcherCycleData,
  Gen3Lead,
  Gen3Method,
  Wild3MethodDistributionResult,
  Wild3EncounterTable,
} from "~/rngTools";
import {
  Field,
  FormikNumberInput,
  FormikSelect,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  FormFieldTable,
  FormikRadio,
} from "~/components";
import { toOptions } from "~/utils/options";
import { formatProbability } from "~/utils/formatProbability";
import { useFormikContext } from "formik";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import { Static3Game } from "~/rngToolsUi/gen3/static/constants";
import React from "react";
import { z } from "zod";
import { match } from "ts-pattern";

import { FlattenIvs, ivColumns } from "~/rngToolsUi/shared/ivColumns";
import { Translations } from "~/translations";
import {
  gen3PkmFilterFieldsToRustInput,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";

import {
  formatMapName,
  formatEncounterTypeName,
  gen3EncounterTypes,
  emeraldWildGameData,
} from "./utils";
import { encounterSlots, nature } from "~/types";

type LeadSpeedType = "Fastest" | "Average" | "Slowest" | "From PID" | "Custom";

const leadSpeedTypes = [
  "Fastest",
  "Average",
  "Slowest",
  "From PID",
  "Custom",
] as const satisfies readonly LeadSpeedType[];

const Validator = z.object({
  map: z.string(),
  encounterType: z.enum(gen3EncounterTypes),
  advance: z.number().int().min(0),
  tid: z.number().int().min(0).max(0xffff),
  sid: z.number().int().min(0).max(0xffff),
  leadTypeIdx: z.number(),
  leadSpeedType: z.enum(leadSpeedTypes),
  leadPID: z.number().min(0).max(0xffffffff),
  leadCycleSpeed: z.number().min(18).max(900),
});

type FormState = z.infer<typeof Validator>;

const getInitialValues = (): FormState => {
  return {
    map: "MAP_ROUTE101",
    encounterType: "Land",
    tid: 0,
    sid: 0,
    advance: 0,
    leadTypeIdx: 0,
    leadSpeedType: "Average",
    leadPID: 0,
    leadCycleSpeed: 0,
  };
};

const leadTypeOptions: { value: Gen3Lead; label: string }[] = [
  {
    label: "Ordinary lead",
    value: "Vanilla",
  },
  {
    label: "Egg",
    value: "Egg",
  },
  ...nature.map((nat) => {
    return {
      label: `Synchronize (${nat})`,
      value: { Synchronize: nat },
    };
  }),
  {
    label: `Cute Charm (Male)`,
    value: { CuteCharm: "Male" },
  },
  {
    label: `Cute Charm (Female)`,
    value: { CuteCharm: "Female" },
  },
];

const getFields = (
  map_id: string,
  leadType: Gen3Lead,
  leadSpeedType: LeadSpeedType,
  leadCycleSpeed: number,
): Field[] => {
  const encounterTypes = emeraldWildGameData.encounter_tables
    .filter((table) => table.map_id === map_id)
    .map((table) => table.encounter_type);

  const fields: Field[] = [
    {
      label: "Map",
      input: (
        <FormikSelect<FormState, "map">
          name="map"
          options={toOptions(emeraldWildGameData.maps, formatMapName)}
        />
      ),
    },

    {
      label: "Encounter Type",
      input: (
        <FormikSelect<FormState, "encounterType">
          name="encounterType"
          options={toOptions(encounterTypes, formatEncounterTypeName)}
        />
      ),
    },
    {
      label: "TID",
      input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
    },
    {
      label: "SID",
      input: <FormikNumberInput<FormState> name="sid" numType="decimal" />,
    },
    {
      label: "Lead",
      input: (
        <FormikSelect<FormState, "leadTypeIdx">
          name="leadTypeIdx"
          // Limitation: value must be a primitive, so we use the index instead of Gen3Lead.
          options={leadTypeOptions.map((el, idx) => {
            return { label: el.label, value: idx };
          })}
        />
      ),
    },
  ];
  if (leadType !== "Egg") {
    fields.push({
      label: "Lead Speed",
      input: (
        <FormikRadio<FormState>
          name="leadSpeedType"
          options={leadSpeedTypes.slice(0)}
        />
      ),
    });

    if (leadSpeedType === "From PID") {
      fields.push({
        label: "",
        key: "From PID",
        input: (
          <FormFieldTable
            fields={[
              {
                label: "Lead PID:",
                input: (
                  <FormikNumberInput<FormState> name="leadPID" numType="hex" />
                ),
              },
            ]}
          />
        ),
      });
    } else if (leadSpeedType === "Custom") {
      fields.push({
        label: "",
        key: "Custom",
        input: (
          <FormFieldTable
            fields={[
              {
                label: "PID modulo cycle count:",
                input: (
                  <FormikNumberInput<FormState>
                    name="leadCycleSpeed"
                    numType="decimal"
                  />
                ),
              },
            ]}
          />
        ),
      });
    }
    fields.push({
      label: "",
      input: (
        <FormFieldTable
          fields={[
            {
              label: "Cycle Count:",
              input: `${leadCycleSpeed} cycles`,
            },
          ]}
        />
      ),
    });
  }

  fields.push({
    label: "Advance",
    input: <FormikNumberInput<FormState> name="advance" numType="decimal" />,
  });
  return fields;
};

export const Wild3MethodDistributionFields = () => {
  const { values, setFieldValue } = useFormikContext<FormState>();

  const fields = React.useMemo((): Field[] => {
    return getFields(
      values.map,
      leadTypeOptions[values.leadTypeIdx].value,
      values.leadSpeedType,
      values.leadCycleSpeed,
    );
  }, [
    values.map,
    values.leadTypeIdx,
    values.leadSpeedType,
    values.leadCycleSpeed,
  ]);

  React.useEffect(() => {
    calculateLeadCycleSpeed(
      values.leadSpeedType,
      values.leadCycleSpeed,
      values.leadPID,
    ).then((leadCycleSpeed) => {
      setFieldValue("leadCycleSpeed", leadCycleSpeed);
    });
  }, [
    setFieldValue,
    values.leadCycleSpeed,
    values.leadSpeedType,
    values.leadPID,
  ]);

  return <FormFieldTable fields={fields} />;
};

const getColumns = (_t: Translations): ResultColumn<UiResult>[] => {
  const columns: ResultColumn<UiResult>[] = [
    {
      title: (
        <>
          Cycle at start
          <br /> of Sweet Scent
        </>
      ),
      key: "Cycle at start",
      dataIndex: "cycle_data_for_lead",
      render: (cycle_data_for_lead) => {
        const range = cycle_data_for_lead.pre_sweet_scent_cycle_range;
        if (range.len === 0) {
          return "Less than 0";
        }
        return `${range.start} - ${range.start + range.len - 1}`;
      },
    },
    {
      title: "Likelihood",
      dataIndex: "cycle_data_for_lead",
      render: (cycle_data_for_lead) => {
        return formatProbability(cycle_data_for_lead.method_probability);
      },
    },
    { title: "Method", dataIndex: "method" },
    { title: "Species", dataIndex: "species" },
    {
      title: "PID",
      dataIndex: "pid",
      monospace: true,
      render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
    },
    {
      title: "Shiny",
      dataIndex: "shiny",
      render: (shiny: boolean) => (shiny ? "Yes" : "No"),
    },
    ...ivColumns,
  ];

  return columns;
};

const calculateLeadCycleSpeed = async (
  leadSpeedType: LeadSpeedType,
  leadCycleSpeed: number,
  leadPID: number,
) => {
  return match(leadSpeedType)
    .with("Fastest", () => 18)
    .with("Slowest", () => 900)
    .with("Average", () => 775)
    .with("Custom", () => leadCycleSpeed)
    .with("From PID", () => rngTools.calculate_pid_speed(leadPID))
    .exhaustive();
};

type UiResult = FlattenIvs<
  Wild3SearcherResultMon & {
    species: Species;
    uid: number;
    cycle_data_for_lead: Wild3SearcherCycleData;
  }
>;

let nextUid = 0;
const convertSearcherResultToUIResult = (
  res: Wild3MethodDistributionResult,
  encounterTable: Wild3EncounterTable,
): UiResult => {
  const slot_idx = encounterSlots.indexOf(res.searcher_res.encounter_slot);
  const species =
    slot_idx == -1 ? "None" : encounterTable.slots[slot_idx].species;
  return {
    ...res.searcher_res,
    ...res.searcher_res.ivs,
    cycle_data_for_lead: res.cycle_data_for_lead,
    species,
    uid: nextUid++,
  };
};

const convertSearcherResultsToUIResults = (
  results: Wild3MethodDistributionResult[],
  encounterTable: Wild3EncounterTable,
) => {
  return results
    .map((res) => convertSearcherResultToUIResult(res, encounterTable))
    .sort((lhs, rhs) => {
      const startDiff =
        lhs.cycle_data_for_lead.pre_sweet_scent_cycle_range.start -
        rhs.cycle_data_for_lead.pre_sweet_scent_cycle_range.start;

      if (startDiff !== 0) {
        return startDiff;
      }
      return (
        lhs.cycle_data_for_lead.pre_sweet_scent_cycle_range.len -
        rhs.cycle_data_for_lead.pre_sweet_scent_cycle_range.len
      );
    });
};

type Props = {
  game: Static3Game;
};

export const Wild3MethodDistribution = ({ game }: Props) => {
  const [results, setResults] = React.useState<UiResult[]>([]);

  const initial_seed = game === "emerald" ? 0 : 0x5a0;

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (values) => {
      const opts = {
        advance: values.advance,
        tid: values.tid,
        sid: values.sid,
        map_idx: 0,
        encounter_slot: null,
        methods: ["Wild1", "Wild2", "Wild3", "Wild4", "Wild5"] as Gen3Method[],
        lead: leadTypeOptions[values.leadTypeIdx].value,
        filter: pkmFilterFieldsToRustInput(getPkmFilterInitialValues()),
        gen3_filter: gen3PkmFilterFieldsToRustInput(
          getGen3PkmFilterInitialValues(),
        ),
        consider_cycles: true,
        consider_rng_manipulated_lead_pid: true,
        generate_even_if_impossible: true,
      };

      const encounterTable = emeraldWildGameData.encounter_tables.find(
        (table) =>
          table.map_id === values.map &&
          table.encounter_type === values.encounterType,
      );
      if (encounterTable == null) {
        return setResults([]);
      }

      const results = await rngTools.generate_gen3_wild_distribution(
        initial_seed,
        opts,
        encounterTable,
        values.leadCycleSpeed,
      );
      const uiResults = convertSearcherResultsToUIResults(
        results,
        encounterTable,
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
      <Wild3MethodDistributionFields />
    </RngToolForm>
  );
};
