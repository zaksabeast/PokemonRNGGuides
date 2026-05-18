import { Wild3SearcherCycleData, Gen3Method } from "~/rngTools";
import {
  ResultColumn,
  ResultTable,
  Icon,
  Link,
  Flex,
  FormFieldTable,
  Switch,
} from "~/components";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { formatProbability } from "~/utils/formatProbability";
import React from "react";
import { match, P } from "ts-pattern";

import { Tooltip } from "antd";

import { formatLeadName, formatMassOutbreakStateName } from "./utils";
import { formatDuration } from "~/utils/formatDuration";
import { formatHex } from "~/utils/formatHex";
import { PidPathResult, ResultSetupInfo } from "./wild3FindTarget";
import { Wild3MethodDistribution } from "./wild3MethodDistribution";
import { GBA_FPS } from "~/utils/consts";
import { TargetSetup } from "./wild3CalibTargetSetupInput";
import { Wild3PokeblockDescription } from "~/components/wild3Pokeblock";

const getMethodLikelihoodColumValue = (
  cycleData: Wild3SearcherCycleData,
  method: Gen3Method,
) => {
  const content = formatProbability(cycleData.method_probability);
  const end =
    cycleData.pre_sweet_scent_cycle_range.start +
    cycleData.pre_sweet_scent_cycle_range.len;
  const tooltip =
    end === 0
      ? `Method ${method} can't be triggered.`
      : `Method ${method} is triggered if the cycle counter is between ${cycleData.pre_sweet_scent_cycle_range.start} and ${end}.`;
  return {
    tooltip: tooltip,
    content,
  };
};

const getResultSetupInfoColumns = ({
  rngManipulatedLeadPid,
  showMassOutbreak,
  showRequiredPokeblock,
  showRequiresWhiteFlute,
  usesPainting,
}: {
  rngManipulatedLeadPid: boolean;
  showMassOutbreak: boolean;
  showRequiredPokeblock: boolean;
  showRequiresWhiteFlute: boolean;
  usesPainting: boolean;
}): ResultColumn<ResultSetupInfo>[] => {
  const columns: ResultColumn<ResultSetupInfo>[] = [];
  if (!usesPainting) {
    columns.push({
      title: "Advances",
      dataIndex: "advance",
      monospace: true,
      render: (adv, { seed }) => {
        const painting_seed = formatHex(seed);
        const durInMinutes = formatDuration(adv / GBA_FPS);
        return (
          <Tooltip
            title={`Seed when performing the player action: ${painting_seed}. (${durInMinutes})`}
          >
            {formatLargeInteger(adv)}
          </Tooltip>
        );
      },
    });
  } else {
    columns.push({
      title: "Advances",
      type: "group",
      columns: [
        {
          title: "Before Reseed",
          dataIndex: "advs",
          monospace: true,
          render: (advs) => {
            const adv = advs.frame_before_painting;
            return (
              <Tooltip title={`Painting Seed: ${formatHex(adv, 2)}`}>
                {formatLargeInteger(adv)}
              </Tooltip>
            );
          },
        },
        {
          title: "After Reseed",
          dataIndex: "advs",
          monospace: true,
          render: (advs, { seed, actionName }) => {
            return (
              <Tooltip
                title={`Seed at start of ${actionName}: ${formatHex(seed)}`}
              >
                {formatLargeInteger(advs.adv_after_painting)}
              </Tooltip>
            );
          },
        },
      ],
    });
  }

  columns.push(
    { title: "Map", dataIndex: "mapName" },
    { title: "Player action", dataIndex: "actionName" },
    {
      title: (
        <span>
          Requires
          <br />
          White Flute?
        </span>
      ),
      key: "requiresWhiteFlute",
      dataIndex: "action",
      render: (action, setupInfo) =>
        action === "RockSmash"
          ? setupInfo.requiresWhiteFlute
            ? "Yes"
            : "No"
          : "N/A",
      show: showRequiresWhiteFlute,
    },
    {
      title: "Pokéblock",
      dataIndex: "requiredPokeblock",
      render: (requiredPokeblock) => (
        <Wild3PokeblockDescription pokeblock={requiredPokeblock} />
      ),
      show: showRequiredPokeblock,
    },
    /*
    TODO: Support roamer and fishing in Feebas tile to catch non-Feebas Pokémon.
    {
      title: "Roamer",
      dataIndex: "roamer_state",
      render: (roamerState) => {
        return match(roamerState)
          .with("Inactive", () => "Inactive")
          .with("ActiveNotInMap", () => "Roaming in another map")
          .with("ActiveInMapLatios", () => "Latios in map")
          .with("ActiveInMapLatias", () => "Latias in map")
          .exhaustive();
      },
    },
    {
      title: "Feebas Tile?",
      dataIndex: "feebas_state",
      render: (feebasState) => {
        return match(feebasState)
          .with("NotInMap", () => "N/A")
          .with("OnFeebasTile", () => "Yes")
          .with("InMapButNotOnFeebasTile", () => "No")
          .exhaustive();
      },
    },*/
    {
      title: "Mass outbreak",
      dataIndex: "mass_outbreak_state",
      render: formatMassOutbreakStateName,
      show: showMassOutbreak,
    },
  );

  const tooltipHelper = (btnContent: {
    content: React.ReactNode;
    tooltip: string;
  }) => <Tooltip title={btnContent.tooltip}>{btnContent.content}</Tooltip>;

  if (!rngManipulatedLeadPid) {
    columns.push({
      title: (
        <span>
          Method <br />
          Likelihood
        </span>
      ),
      key: "<>Method <br />Likelihood</>",
      dataIndex: "cycle_data_by_lead",
      render: (cycle_data_by_lead, values) => {
        const text = (() => {
          if (cycle_data_by_lead === undefined) {
            return "";
          }
          const [least_likely, most_likely] =
            cycle_data_by_lead.common_lower_lead.method_probability <
            cycle_data_by_lead.common_upper_lead.method_probability
              ? [
                  cycle_data_by_lead.common_lower_lead,
                  cycle_data_by_lead.common_upper_lead,
                ]
              : [
                  cycle_data_by_lead.common_upper_lead,
                  cycle_data_by_lead.common_lower_lead,
                ];

          const leastFormat = formatProbability(
            least_likely.method_probability,
          );
          const mostFormat = formatProbability(most_likely.method_probability);

          if (leastFormat === mostFormat) {
            return leastFormat;
          }

          if (
            least_likely.method_probability === 0 ||
            most_likely.method_probability - least_likely.method_probability >
              0.1
          ) {
            return `${leastFormat} - ${mostFormat}`;
          }

          return leastFormat;
        })();
        const isVeryReliableSetup =
          text === "100%" && values.lead === "Egg" && values.method === "Wild1";
        const title = `Method ${values.method}${isVeryReliableSetup ? " (Very reliable setup)" : ""}`;

        return tooltipHelper({
          content: (
            <Flex align="center" gap={4}>
              {text}
              {isVeryReliableSetup && <Icon name="Star" />}
            </Flex>
          ),
          tooltip: title,
        });
      },
    });
  }

  columns.push({
    title: "Lead",
    dataIndex: "lead",
    render: formatLeadName,
  });

  if (rngManipulatedLeadPid) {
    columns.push(
      {
        title: "Ideal Lead Speed",
        dataIndex: "cycle_data_by_lead",
        render: (cycle_data_by_lead, values) => {
          if (cycle_data_by_lead === undefined) {
            return "";
          }
          if (values.lead === "Egg") {
            return "";
          }
          if (
            cycle_data_by_lead.ideal_lead.method_probability ===
              cycle_data_by_lead.slowest_lead.method_probability &&
            cycle_data_by_lead.ideal_lead.method_probability ===
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
        title: (
          <div>
            {"Method Likelihood by "}
            <Link href="/gba-methods-lead-impact/" newTab>
              Lead Speed
            </Link>
          </div>
        ),
        key: "methodLikelihoodByLeadSpeed",
        type: "group",
        columns: [
          {
            title: "Ideal",
            dataIndex: "cycle_data_by_lead",
            render: (cycle_data_by_lead, values) => {
              if (cycle_data_by_lead === undefined) {
                return "";
              }
              return tooltipHelper(
                getMethodLikelihoodColumValue(
                  cycle_data_by_lead.ideal_lead,
                  values.method,
                ),
              );
            },
          },
          {
            title: "Fastest",
            tooltip: "Lead PID speed equal to 18 cycles",
            dataIndex: "cycle_data_by_lead",
            render: (cycle_data_by_lead, values) => {
              if (cycle_data_by_lead === undefined) {
                return "";
              }
              return tooltipHelper(
                getMethodLikelihoodColumValue(
                  cycle_data_by_lead.fastest_lead,
                  values.method,
                ),
              );
            },
          },
          {
            title: "Common",
            tooltip:
              "Lead PID speed between 608 and 868 cycles (99.9% of all PIDs)",
            dataIndex: "cycle_data_by_lead",
            render: (cycle_data_by_lead, values) => {
              if (cycle_data_by_lead === undefined) {
                return "";
              }
              const least_likely_common =
                cycle_data_by_lead.common_lower_lead.method_probability <
                cycle_data_by_lead.common_upper_lead.method_probability
                  ? cycle_data_by_lead.common_lower_lead
                  : cycle_data_by_lead.common_upper_lead;
              return tooltipHelper(
                getMethodLikelihoodColumValue(
                  least_likely_common,
                  values.method,
                ),
              );
            },
          },
          {
            title: "Slowest",
            tooltip: "Lead PID speed equal to 900 cycles",
            dataIndex: "cycle_data_by_lead",
            render: (cycle_data_by_lead, values) => {
              if (cycle_data_by_lead === undefined) {
                return "";
              }
              return tooltipHelper(
                getMethodLikelihoodColumValue(
                  cycle_data_by_lead.slowest_lead,
                  values.method,
                ),
              );
            },
          },
        ],
      },
    );
  }
  return columns;
};

type Props = {
  selectedPidPathResult: PidPathResult | null;
  rngManipulatedLeadPid: boolean;
  setTargetSetup: (targetSetup: TargetSetup) => void;
  setLeadCycleSpeed: (leadCycleSpeed: number) => void;
};

const setupInfoToTargetSetup = (setupInfo: ResultSetupInfo): TargetSetup => {
  return {
    map: setupInfo.mapId,
    action: setupInfo.action,
    feebasState: setupInfo.feebas_state,
    roamerState: setupInfo.roamer_state,
    massOutbreakState: setupInfo.mass_outbreak_state,
    targetPaintingAdvs: {
      before: setupInfo.advs.frame_before_painting,
      after: setupInfo.advs.adv_after_painting,
    },
    targetMethod: setupInfo.method,
    lead: setupInfo.lead,
    requiresWhiteFlute: setupInfo.requiresWhiteFlute,
    safariPokeblock: setupInfo.used_safari_pokeblock ?? null,
  };
};

export const Wild3ResultSetupInfos = ({
  setTargetSetup,
  selectedPidPathResult,
  rngManipulatedLeadPid,
  setLeadCycleSpeed: setLeadCycleSpeedProp,
}: Props) => {
  const showMassOutbreak =
    selectedPidPathResult != null &&
    selectedPidPathResult.resultSetupInfos.some(
      (setup) => setup.mass_outbreak_state !== "Inactive",
    );
  const showRequiresWhiteFlute =
    selectedPidPathResult?.resultSetupInfos.some(
      (setup) => setup.action === "RockSmash",
    ) ?? false;
  const showRequiredPokeblock =
    selectedPidPathResult?.resultSetupInfos.some(
      (setup) => setup.requiredPokeblock != null,
    ) ?? false;
  const usesPainting =
    selectedPidPathResult?.resultSetupInfos.some(
      (res) => res.advs.frame_before_painting !== 0,
    ) ?? false;
  const resultSetupInfoColumns = getResultSetupInfoColumns({
    rngManipulatedLeadPid,
    showMassOutbreak,
    showRequiredPokeblock,
    showRequiresWhiteFlute,
    usesPainting,
  });

  const [displayBreakdown, setDisplayBreakdown] = React.useState(false);

  const [selectedResultSetupInfo, setSelectedResultSetupInfo] =
    React.useState<ResultSetupInfo | null>(null);

  React.useEffect(() => {
    setSelectedResultSetupInfo(null);
  }, [selectedPidPathResult, setSelectedResultSetupInfo]);

  const [leadCycleSpeed, setLeadCycleSpeed] = React.useState<number | null>(0);

  if (selectedPidPathResult == null) {
    return null;
  }

  const onClickResultRow = (setupInfo: ResultSetupInfo) => {
    setSelectedResultSetupInfo(setupInfo);

    const targetSetup = setupInfoToTargetSetup(setupInfo);
    setTargetSetup(targetSetup);
  };

  const selectedTargetSetup =
    selectedResultSetupInfo == null
      ? null
      : setupInfoToTargetSetup(selectedResultSetupInfo);

  const setLeadCycleSpeedBoth = (spd: number) => {
    setLeadCycleSpeed(spd);
    setLeadCycleSpeedProp(spd);
  };

  return (
    <>
      <ResultTable<ResultSetupInfo>
        columns={resultSetupInfoColumns}
        rowKey="uid"
        dataSource={selectedPidPathResult.resultSetupInfos}
        rowSelection={{
          type: "radio",
          onSelect: onClickResultRow,
        }}
      />
      {selectedTargetSetup != null && (
        <Flex vertical>
          {!rngManipulatedLeadPid && (
            <FormFieldTable
              fields={[
                {
                  label: "Display lead cycle speed calibration?",
                  input: (
                    <Switch
                      onChange={setDisplayBreakdown}
                      value={displayBreakdown}
                    />
                  ),
                },
              ]}
            />
          )}
          {(rngManipulatedLeadPid || displayBreakdown) && (
            <Wild3MethodDistribution
              targetSetup={selectedTargetSetup}
              permitEnablingDebugOptions={false}
              setLeadCycleSpeed={setLeadCycleSpeedBoth}
              leadCycleSpeed={leadCycleSpeed}
            />
          )}
        </Flex>
      )}
    </>
  );
};
