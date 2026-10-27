import type { AceSidConfig } from "../pokemonRng/shared";
import {
  type ShinyType,
  Wild3PaintingAdvsAndDur,
  Wild3SearcherResultMon,
  Wild3SearcherCycleData,
} from "~/rngTools";
import { Flex, Icon, Link, ResultColumn, TooltipWithIcon } from "~/components";
import { ToolForm, type ToolFormSubmit } from "~/components/form";
import { formatProbability } from "~/utils/formatProbability";
import React from "react";
import { z } from "zod";
import { gen3Methods } from "~/types";
import { sortBy } from "lodash-es";
import { FlattenIvs } from "~/rngToolsUi/shared/ivColumns";
import { Tooltip } from "antd";

import {
  gen3Leads,
  wild3RoamerStates,
  wild3MassOutbreakStates,
  wild3FeebasStates,
  wild3Actions,
} from "./utils";
import { Wild3TargetMon } from "./wild3TargetMon.component";
import { searchWild3Target } from "./searchWild3Target";
import { Wild3SetupFilter } from "./wild3SetupFilter.component";
import { Wild3ResultSetupInfos } from "./wild3ResultSetupInfos";
import { TargetSetup } from "./wild3TargetSetupInput";
import { Pokeblock, wild3SafariPokeblockSearchOpt } from "~/types/pokeblock";
import { Wild3LeadCycleSpeedSelectorWithBtn } from "./wild3LeadCycleSpeedSelector";
import { type Wild3AudioInfluences } from "./wild3AudioInfluences";
import {
  targetSetupSearcherSchema,
  getTargetSetupSearcherInitialValues,
  getTargetResultColumns,
} from "../pokemonRng/targetSetupSearcher";

const Validator = z
  .object({
    maps: z.array(z.string()).min(1),
    recommendedSetups: z.boolean(),
    considerWeather: z.boolean(),
    hasUnlockedBike: z.boolean(),
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
    feebasCycles: z.array(z.int().min(0).max(0xffffffff)),
    methods: z.array(z.enum(gen3Methods)).min(1),
    rngManipulatedLeadPid: z.boolean(),
    mergeSimilarResults: z.boolean(),
    generate_even_if_impossible: z.boolean(),
    using_white_flute: z.boolean(),
    considered_safari_pokeblocks: z.enum(wild3SafariPokeblockSearchOpt),
  })
  .extend(targetSetupSearcherSchema.shape)
  .refine(
    ({ species, feebasCycles }) =>
      species !== "Feebas" || feebasCycles.length > 0,
    {
      message: "Select at least one Feebas fishing spot.",
      path: ["feebasCycles"],
    },
  );

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
    primaryCycleData: Wild3SearcherCycleData | null;
    showLikelihoodAudioInfluences: boolean;
    targetAudioInfluences: Wild3AudioInfluences;
    initial_seed: number;
    requiresWhiteFlute: boolean;
    requiredPokeblock: Pokeblock | null;
  };

const getInitialValues = (): FormState => {
  return {
    species: "Abra",
    maps: [],
    leadIdxs: gen3Leads.map((_, i) => i),
    recommendedSetups: true,
    considerWeather: true,
    hasUnlockedBike: true,
    methods: ["Wild1", "Wild2", "Wild4"], // Wild5 is not supported by the reverse searcher. Wild3 has too low probability.
    actions: [...wild3Actions],
    roamerStates: [...wild3RoamerStates],
    feebasStates: ["NotInMap", "OnFeebasTile"], // InMapButNotOnFeebasTile is not supported by the reverse searcher
    feebasCycles: [],
    massOutbreakStates: [...wild3MassOutbreakStates],
    rngManipulatedLeadPid: false,
    mergeSimilarResults: true,
    generate_even_if_impossible: false,
    using_white_flute: true,
    considered_safari_pokeblocks: "SoloOnly",
    ...getTargetSetupSearcherInitialValues("emerald"),
  };
};

const getPidPathColumns = (
  aceShiny: ShinyType | null,
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
        const isUnstable = resultSetupInfos.every(
          (setup) => setup.cycle_instability === 1,
        );
        if (isUnstable) {
          return (
            <TooltipWithIcon title="On these fishing tiles, vblanks can cause extra RNG advances before the Pokemon is generated. These variations are not  supported, so hitting the target advance may produce a different Pokemon and the likelihood cannot be reliably predicted.">
              Unstable
            </TooltipWithIcon>
          );
        }

        // results are sorted by primaryLikelihood
        const best = resultSetupInfos[0];
        const text = formatProbability(best?.primaryLikelihood ?? 0);
        const isVeryReliableSetup = resultSetupInfos.some(
          (res) =>
            res.lead === "Egg" &&
            res.method === "Wild1" &&
            res.primaryLikelihood === 1 &&
            res.cycle_instability === 0,
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
    ...getTargetResultColumns("emerald", true, aceShiny),
  ];
};

type Props = {
  setTargetSetup: (targetSetup: TargetSetup | null) => void;
  setLeadCycleSpeed: (leadCycleSpeed: number) => void;
};

export const Wild3TargetSetupSearcher = ({
  setTargetSetup: setTargetSetupProp,
  setLeadCycleSpeed: setLeadCycleSpeedProp,
}: Props) => {
  const [pidPathResults, setPidPathResults] = React.useState<PidPathResult[]>(
    [],
  );
  const [selectedPidPathResult, setSelectedPidPathResult] =
    React.useState<PidPathResult | null>(null);

  const [rngManipulatedLeadPid, setRngManipulatedLeadPid] =
    React.useState<boolean>(false);

  const [tidForAceSid, setTidForAceSid] = React.useState<AceSidConfig | null>(
    null,
  );

  const [targetSetup, setTargetSetup] = React.useState<TargetSetup | null>(
    null,
  );

  const onSubmit: ToolFormSubmit<FormState> = async (values) => {
    const pidPathResults = await searchWild3Target(values);

    setRngManipulatedLeadPid(values.rngManipulatedLeadPid);

    if (values.filter_shiny !== "Any" && values.usingAceForSid) {
      setTidForAceSid({
        tid: values.tid,
        shiny:
          values.filter_shiny === "StarShiny" ? "StarShiny" : "SquareShiny",
      });
    } else {
      setTidForAceSid(null);
    }

    setPidPathResults(
      sortBy(
        pidPathResults.filter((el) => el != null),
        "wait_dur",
      ),
    );
    setSelectedPidPathResult(null);
  };

  const initialValues = getInitialValues();

  const pidPathColumns = getPidPathColumns(tidForAceSid?.shiny ?? null);

  const [leadCycleSpeed, setLeadCycleSpeed] = React.useState<number | null>(0);

  const setTargetSetupBoth = (targetSetup: TargetSetup | null) => {
    setTargetSetup(targetSetup);
    setTargetSetupProp?.(targetSetup);
  };

  const setLeadCycleSpeedBoth = (spd: number) => {
    setLeadCycleSpeed(spd);
    setLeadCycleSpeedProp?.(spd);
  };

  return (
    <>
      <ToolForm<FormState, PidPathResult>
        columns={pidPathColumns}
        results={pidPathResults}
        validationSchema={Validator}
        initialValues={initialValues}
        onSubmit={onSubmit}
        submitTrackerId="wild3_find_target"
        rowKey="uid"
        onClickResultRow={setSelectedPidPathResult}
      >
        <Wild3TargetMon />
        <Wild3SetupFilter />
      </ToolForm>

      {selectedPidPathResult != null && (
        <Wild3ResultSetupInfos
          selectedPidPathResult={selectedPidPathResult}
          rngManipulatedLeadPid={rngManipulatedLeadPid}
          tidForAceSid={tidForAceSid}
          setTargetSetup={setTargetSetupBoth}
        />
      )}

      {targetSetup != null && (
        <Wild3LeadCycleSpeedSelectorWithBtn
          targetSetup={targetSetup}
          setWeather={(weather) =>
            setTargetSetupBoth({ ...targetSetup, weather })
          }
          setPlayingSong={(playing_song) =>
            setTargetSetupBoth({ ...targetSetup, playing_song })
          }
          permitEnablingDebugOptions={false}
          setLeadCycleSpeed={setLeadCycleSpeedBoth}
          leadCycleSpeed={leadCycleSpeed}
          initialDisplayLeadCycleSpdButton={!rngManipulatedLeadPid}
        />
      )}
    </>
  );
};
