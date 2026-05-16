import { Wild3PaintingAdvsAndDur, Wild3SearcherResultMon } from "~/rngTools";
import {
  Flex,
  Icon,
  Link,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { formatProbability } from "~/utils/formatProbability";
import {
  pkmFilterSchema,
  getPkmFilterInitialValues,
} from "~/components/pkmFilter";
import React from "react";
import { z } from "zod";
import { gen3Methods } from "~/types";

import { sortBy } from "lodash-es";
import { FlattenIvs, ivColumns } from "~/rngToolsUi/shared/ivColumns";
import { Tooltip } from "antd";
import {
  gen3PkmFilterSchema,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";

import {
  gen3Leads,
  wild3RoamerStates,
  wild3MassOutbreakStates,
  wild3FeebasStates,
  wild3Actions,
} from "./utils";
import { formatDuration } from "~/utils/formatDuration";
import { formatHex } from "~/utils/formatHex";
import { TargetMon } from "./wild3TargetMon.component";
import { searchWild3Target } from "./searchWild3Target";
import { SetupFilter } from "./wild3SetupFilter.component";
import { Wild3ResultSetupInfos } from "./resultSetupInfos";
import { getWild3EmeraldGameData } from "./data/wild3GameData";

const emeraldWildGameData = getWild3EmeraldGameData();
import { GBA_FPS } from "~/utils/consts";
import { TargetSetup } from "./wild3CalibTargetSetupInput";
import { Pokeblock, wild3SafariPokeblockSearchOpt } from "~/types/pokeblock";

/*
Possible UI improvements:
 - Display filter restrictiveness
 - Min/Max IVs should have a tooltip displaying the stat name.
*/

const Validator = z
  .object({
    species: z.enum(emeraldWildGameData.species),
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
    showAdvancedPaintingSettings: z.boolean(),
    initial_seed: z.number().int().min(0).max(0xffffffff),
    initial_advances: z.number().int().min(0).max(0xffffffff),
    min_frame_before_painting: z.number().int().min(0).max(0xffffffff),
    min_adv_after_painting: z.number().int().min(0).max(0xffffffff),
    max_advances: z.number().int().min(0).max(0xffffffff),
    max_result_count: z.number().int().min(1),
    rngManipulatedLeadPid: z.boolean(),
    mergeSimilarResults: z.boolean(),
    generate_even_if_impossible: z.boolean(),
    using_white_flute: z.boolean(),
    considered_safari_pokeblocks: z.enum(wild3SafariPokeblockSearchOpt),
  })
  .extend(pkmFilterSchema.shape)
  .extend(gen3PkmFilterSchema.shape);

export type FormState = z.infer<typeof Validator>;

export type PidPathResult = FlattenIvs<
  Wild3SearcherResultMon &
    Wild3PaintingAdvsAndDur & {
      uid: number;
      pidCycleCount: number;
      earliestAdvance: number;
      resultSetupInfos: ResultSetupInfo[];
    }
>;

export type ResultSetupInfo = Wild3SearcherResultMon &
  Wild3PaintingAdvsAndDur & {
    uid: number;
    mapId: string;
    mapName: string;
    actionName: string;
    primaryLikelihood: number;
    initial_seed: number;
    requiresWhiteFlute: boolean;
    requiredPokeblock: Pokeblock | null;
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
    showAdvancedPaintingSettings: false,
    initial_seed: 0,
    initial_advances: 1000,
    min_frame_before_painting: 800,
    min_adv_after_painting: 7000,
    max_advances: 10_000_000,
    max_result_count: 20,
    rngManipulatedLeadPid: false,
    mergeSimilarResults: true,
    generate_even_if_impossible: false,
    using_white_flute: true,
    considered_safari_pokeblocks: "SoloOnly",
    ...getPkmFilterInitialValues(),
    ...getGen3PkmFilterInitialValues(),
  };
};

const getPidPathColumns = (): ResultColumn<PidPathResult>[] => {
  return [
    {
      title: "",
      dataIndex: "resultSetupInfos",
      render: (resultSetupInfos) =>
        `${resultSetupInfos.length} setup${resultSetupInfos.length > 1 ? "s" : ""}`,
    },
    {
      title: "Likelihood",
      tooltip: (
        <>
          Likelihood that you will obtain the target Pokemon if you hit the
          target advance. (Likelihood that the triggered{" "}
          <Link newTab href="/gba-methods/">
            method
          </Link>{" "}
          at the target advance is the right one).
        </>
      ),
      dataIndex: "resultSetupInfos",
      key: "best_likelihood",
      render: (resultSetupInfos) => {
        const text = formatProbability(
          resultSetupInfos[0]?.primaryLikelihood ?? 0,
        );
        const isVeryReliableSetup = resultSetupInfos.some(
          (res) =>
            res.lead === "Egg" &&
            res.method === "Wild1" &&
            res.primaryLikelihood === 1,
        );

        if (!isVeryReliableSetup) {
          return text;
        }

        return (
          <Tooltip title="Very reliable setup">
            <Flex align="center" gap={4}>
              {text}
              <Icon name="Star" />
            </Flex>
          </Tooltip>
        );
      },
    },
    {
      title: "Advances",
      dataIndex: "advs",
      monospace: true,
      render: (advs, { wait_dur }) => {
        const { frame_before_painting: before, adv_after_painting: after } =
          advs;

        const text =
          (before !== 0 ? `${formatLargeInteger(before)} | ` : "") +
          `~${formatLargeInteger(after)}`;
        const title = formatDuration(wait_dur / GBA_FPS);
        return <Tooltip title={title}>{text}</Tooltip>;
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
      tooltip: (
        <>
          For advanced users. Number of cycles for the processor to perform the
          operation (PID modulo 25). Learn more about{" "}
          <Link newTab href="/gba-methods-lead-impact/">
            Methods & Leads
          </Link>
          .
        </>
      ),
      dataIndex: "pidCycleCount",
      render: (pidCycleCount) => `${pidCycleCount} cycles`,
    },
    {
      title: "Method",
      dataIndex: "method",
    },
  ];
};

type Props = {
  setTargetSetup: (targetSetup: TargetSetup, goNextStep: boolean) => void;
};

export const Wild3SearcherFindTarget = ({ setTargetSetup }: Props) => {
  const [pidPathResults, setPidPathResults] = React.useState<PidPathResult[]>(
    [],
  );
  const [selectedPidPathResult, setSelectedPidPathResult] =
    React.useState<PidPathResult | null>(null);

  const [rngManipulatedLeadPid, setRngManipulatedLeadPid] =
    React.useState<boolean>(false);

  const onSubmit: RngToolSubmit<FormState> = async (values) => {
    const pidPathResults = await searchWild3Target(values);

    setRngManipulatedLeadPid(values.rngManipulatedLeadPid);

    setPidPathResults(
      sortBy(
        pidPathResults.filter((el) => el != null),
        "wait_dur",
      ),
    );
    setSelectedPidPathResult(null);
  };

  const initialValues = getInitialValues();

  const pidPathColumns = getPidPathColumns();

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
        setTargetSetup={setTargetSetup}
      />
    </>
  );
};
