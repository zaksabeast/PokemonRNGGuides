import { Wild3SearcherResultMon } from "~/rngTools";
import { ResultColumn, RngToolForm, RngToolSubmit } from "~/components";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { formatProbability } from "~/utils/formatProbability";
import {
  pkmFilterSchema,
  getPkmFilterInitialValues,
} from "~/components/pkmFilter";
import React from "react";
import { z } from "zod";
import { species, gen3Methods } from "~/types";

import { sortBy } from "lodash-es";
import { FlattenIvs, ivColumns } from "~/rngToolsUi/shared/ivColumns";
import { Tooltip } from "antd";
import {
  gen3PkmFilterSchema,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";

import {
  gen3Leads,
  wild3Actions,
  wild3RoamerStates,
  wild3MassOutbreakStates,
  wild3FeebasStates,
} from "./utils";
import { formatDuration } from "~/utils/formatDuration";
import { formatHex } from "~/utils/formatHex";
import { TargetMon } from "./wild3TargetMon.component";
import { searchWild3Target } from "./searchWild3Target";
import { SetupFilter } from "./wild3SetupFilter.component";
import { Wild3ResultSetupInfos } from "./resultSetupInfos";
import { GBA_FPS } from "~/utils/consts";
import { AVERAGE_LEAD_CYCLE_SPEED } from "./wild3MethodDistribution";

/*
Possible UI improvements:
 - Display filter restrictiveness
 - Display ability names instead of First, Second, or Hidden.
 - Min/Max IVs should have a tooltip displaying the stat name.
*/

const Validator = z
  .object({
    species: z.enum(species),
    tid: z.number().int().min(0).max(0xffff),
    sid: z.number().int().min(0).max(0xffff),
    maps: z.array(z.string()).min(1),
    recommendedSetups: z.boolean(),
    // Limitation: value in Select must be a primitive, so we use the index instead of Gen3Lead.
    leadIdxs: z
      .array(
        z
          .number()
          .int()
          .min(0)
          .max(gen3Leads.length - 1),
      )
      .min(1),
    actions: z.array(z.enum(wild3Actions)).min(1),
    roamerStates: z.array(z.enum(wild3RoamerStates)).min(1),
    massOutbreakStates: z.array(z.enum(wild3MassOutbreakStates)).min(1),
    feebasStates: z.array(z.enum(wild3FeebasStates)).min(1),
    methods: z.array(z.enum(gen3Methods)).min(1),
    usingPaintingReseeding: z.boolean(),
    letSearcherFindPaintingSeed: z.boolean(),
    initial_seed: z.number().int().min(0).max(0xffffffff),
    initial_advances: z.number().int().min(0).max(0xffffffff),
    min_adv_before_painting: z.number().int().min(0).max(0xffffffff),
    min_adv_after_painting: z.number().int().min(0).max(0xffffffff),
    max_advances: z.number().int().min(0).max(0xffffffff),
    max_result_count: z.number().int().min(1),
    rngManipulatedLeadPid: z.boolean(),
    mergeSimilarResults: z.boolean(),
    generate_even_if_impossible: z.boolean(),
    usingSpecificLeadCycleSpeed: z.boolean(),
    specificLeadCycleSpeed: z.number().int().min(0).max(900),
  })
  .extend(pkmFilterSchema.shape)
  .extend(gen3PkmFilterSchema.shape);

export type FormState = z.infer<typeof Validator>;

export type PidPathResult = FlattenIvs<
  Wild3SearcherResultMon & {
    uid: number;
    pidCycleCount: number;
    earliestAdvance: number;
    valueForSorting: number;
    paintingAdvs:
      | {
          adv_before_painting: number;
          adv_after_painting: number;
        }
      | undefined;
    resultSetupInfos: ResultSetupInfo[];
  }
>;

export type ResultSetupInfo = Wild3SearcherResultMon & {
  uid: number;
  mapId: string;
  mapName: string;
  actionName: string;
  primaryLikelihood: number;
  initial_seed: number;
  painting_advs?: {
    adv_before_painting: number;
    adv_after_painting: number;
  };
};

const getInitialValues = (): FormState => {
  return {
    species: "Abra",
    tid: 0,
    sid: 0,
    maps: [],
    leadIdxs: gen3Leads.map((_, i) => i),
    recommendedSetups: true,
    methods: ["Wild1", "Wild2", "Wild4"],
    actions: [...wild3Actions],
    roamerStates: [...wild3RoamerStates],
    feebasStates: [...wild3FeebasStates],
    massOutbreakStates: [...wild3MassOutbreakStates],
    usingPaintingReseeding: false,
    letSearcherFindPaintingSeed: true,
    initial_seed: 0,
    initial_advances: 1000,
    min_adv_before_painting: 1000,
    min_adv_after_painting: 10000,
    max_advances: 10_000_000,
    max_result_count: 20,
    rngManipulatedLeadPid: false,
    mergeSimilarResults: true,
    usingSpecificLeadCycleSpeed: false,
    specificLeadCycleSpeed: AVERAGE_LEAD_CYCLE_SPEED,
    generate_even_if_impossible: false,
    ...getPkmFilterInitialValues(),
    ...getGen3PkmFilterInitialValues(),
  };
};

const getPidPathColumns = (
  letSearcherFindPaintingSeed: boolean,
): ResultColumn<PidPathResult>[] => {
  return [
    {
      title: "",
      dataIndex: "resultSetupInfos",
      render: (resultSetupInfos) =>
        `${resultSetupInfos.length} setup${resultSetupInfos.length > 1 ? "s" : ""}`,
    },
    {
      title: "Likelihood",
      dataIndex: "resultSetupInfos",
      key: "best_likelihood",
      render: (resultSetupInfos) => {
        return formatProbability(resultSetupInfos[0]?.primaryLikelihood ?? 0);
      },
    },
    {
      title: "Painting?",
      dataIndex: "paintingAdvs",
      render: (paintingAdvs) => {
        return paintingAdvs != null ? "Yes" : "No";
      },
      show: letSearcherFindPaintingSeed,
    },
    {
      title: "Advances",
      dataIndex: "earliestAdvance",
      monospace: true,
      render: (earliestAdvance, { paintingAdvs }) => {
        if (paintingAdvs != null) {
          const { adv_before_painting: before, adv_after_painting: after } =
            paintingAdvs;
          const title = `${formatDuration(before / GBA_FPS)} | ${formatDuration(after / GBA_FPS)}`;

          return (
            <Tooltip title={title}>
              {formatLargeInteger(before)}
              {" | "}~{formatLargeInteger(after)}
            </Tooltip>
          );
        }

        return (
          <Tooltip title={formatDuration(earliestAdvance / GBA_FPS)}>
            <>~{formatLargeInteger(earliestAdvance)}</>
          </Tooltip>
        );
      },
    },
    { title: "Nature", dataIndex: "nature" },
    {
      title: "Shiny",
      dataIndex: "shiny",
      render: (shiny: boolean) => (shiny ? "Yes" : "No"),
    },
    {
      title: "IV",
      type: "group",
      columns: ivColumns,
    },
    {
      title: "PID",
      dataIndex: "pid",
      monospace: true,
      render: (pid) => formatHex(pid),
    },
    { title: "Ability", dataIndex: "ability" },
    { title: "Gender", dataIndex: "gender" },
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
    {
      title: "Method",
      dataIndex: "method",
    },
  ];
};

export const Wild3SearcherFindTarget = () => {
  const [pidPathResults, setPidPathResults] = React.useState<PidPathResult[]>(
    [],
  );
  const [selectedPidPathResult, setSelectedPidPathResult] =
    React.useState<PidPathResult | null>(null);

  const [letSearcherFindPaintingSeed, setLetSearcherFindPaintingSeed] =
    React.useState<boolean>(false);

  const [rngManipulatedLeadPid, setRngManipulatedLeadPid] =
    React.useState<boolean>(false);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (values) => {
      const pidPathResults = await searchWild3Target(values);

      setLetSearcherFindPaintingSeed(
        values.usingPaintingReseeding && values.letSearcherFindPaintingSeed,
      );

      setRngManipulatedLeadPid(values.rngManipulatedLeadPid);

      setPidPathResults(
        sortBy(
          pidPathResults.filter((el) => el != null),
          "valueForSorting",
        ),
      );
      setSelectedPidPathResult(null);
    },
    [],
  );

  const initialValues = React.useMemo(() => {
    return getInitialValues();
  }, []);

  const pidPathColumns = React.useMemo(() => {
    return getPidPathColumns(letSearcherFindPaintingSeed);
  }, [letSearcherFindPaintingSeed]);

  return (
    <>
      <RngToolForm<FormState, PidPathResult>
        columns={pidPathColumns}
        results={pidPathResults}
        validationSchema={Validator}
        initialValues={initialValues}
        onSubmit={onSubmit}
        submitTrackerId="wild3_find_target"
        rowKey="uid"
        onClickResultRow={setSelectedPidPathResult}
      >
        <TargetMon />
        <br />
        <SetupFilter />
      </RngToolForm>

      <Wild3ResultSetupInfos
        selectedPidPathResult={selectedPidPathResult}
        rngManipulatedLeadPid={rngManipulatedLeadPid}
      />
    </>
  );
};
