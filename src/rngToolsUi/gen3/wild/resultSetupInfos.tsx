import { Wild3SearcherCycleData, Gen3Method } from "~/rngTools";
import { ResultColumn, ResultTable, Icon, Link, Button } from "~/components";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { formatProbability } from "~/utils/formatProbability";
import React from "react";
import { match, P } from "ts-pattern";

import { Tooltip } from "antd";

import { formatLeadName, formatMassOutbreakStateName } from "./utils";
import { formatDuration } from "~/utils/formatDuration";
import { formatHex } from "~/utils/formatHex";
import { PidPathResult, ResultSetupInfo } from "./wild3FindTarget";
import {
  Props as DistributionProps,
  Wild3MethodDistribution,
} from "./wild3MethodDistribution";

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
      : `Method ${method} is triggered if the cycle counter is between ${cycleData.pre_sweet_scent_cycle_range.start} and ${end}.`;
  return (
    <Tooltip title={rangeAsTxt}>
      <div>{probAsTxt}</div>
    </Tooltip>
  );
};

const getResultSetupInfoColumns = ({
  rngManipulatedLeadPid,
  showMassOutbreak,
  usesPainting,
  onBreakdownClick,
}: {
  rngManipulatedLeadPid: boolean;
  showMassOutbreak: boolean;
  usesPainting: boolean;
  onBreakdownClick: (record: ResultSetupInfo) => void;
}): ResultColumn<ResultSetupInfo>[] => {
  const columns: ResultColumn<ResultSetupInfo>[] = [];
  if (!usesPainting) {
    columns.push({
      title: "Advances",
      dataIndex: "advance",
      monospace: true,
      render: (adv, { seed }) => {
        const painting_seed = formatHex(seed);
        const durInMinutes = formatDuration(adv / 59.7275);
        return (
          <Tooltip
            title={`Seed when performing the player action: ${painting_seed}. (~${durInMinutes} min)`}
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
          dataIndex: "painting_advs",
          monospace: true,
          render: (painting_advs) => {
            if (painting_advs == null) {
              return "";
            }

            const adv = painting_advs.adv_before_painting;
            return (
              <Tooltip title={`Painting Seed: ${formatHex(adv, 2)}`}>
                {formatLargeInteger(adv)}
              </Tooltip>
            );
          },
        },
        {
          title: "After Reseed",
          dataIndex: "painting_advs",
          monospace: true,
          render: (painting_advs, { seed, actionName }) => {
            if (painting_advs == null) {
              return "";
            }

            return (
              <Tooltip
                title={`Seed at start of ${actionName}: ${formatHex(seed)}`}
              >
                {formatLargeInteger(painting_advs.adv_after_painting)}
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
    ...(showMassOutbreak
      ? ([
          {
            title: "Mass outbreak",
            dataIndex: "mass_outbreak_state",
            render: formatMassOutbreakStateName,
          },
        ] as const)
      : []),
  );

  const breakdownClickCol = (btnName: string) =>
    ({
      key: "detailed_lead",
      dataIndex: "cycle_data_by_lead",
      render: (_cycle_data_by_lead: unknown, values: ResultSetupInfo) => {
        return (
          <Button
            type="text"
            color="PrimaryText"
            trackerId="wild3_likelihood_breakdown"
            onClick={() => {
              onBreakdownClick(values);
            }}
          >
            {btnName}
          </Button>
        );
      },
    }) as const;

  if (!rngManipulatedLeadPid) {
    columns.push({
      title: (
        <>
          Method <br />
          Likelihood
        </>
      ),
      key: "<>Method <br />Likelihood</>",
      dataIndex: "cycle_data_by_lead",
      render: (cycle_data_by_lead, values) => {
        const text = (() => {
          if (cycle_data_by_lead == undefined) {
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

        return (
          <Tooltip title={`Method ${values.method}`}>
            <div>{text}</div>
          </Tooltip>
        );
      },
    });

    columns.push({
      ...breakdownClickCol("Open Breakdown"),
      title: (
        <>
          Method Likelihood
          <br />
          By Lead Speed
        </>
      ),
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
          if (cycle_data_by_lead == undefined) {
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
            ...breakdownClickCol("Open"),
            title: "Breakdown",
          },
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
            title: (
              <Tooltip title="Lead PID speed equal to 18 cycles">
                <div>
                  Fastest <Icon name="InformationCircle" size={16} />
                </div>
              </Tooltip>
            ),
            key: "methodLikelihoodFastest",
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
            title: (
              <Tooltip title="Lead PID speed between 608 and 868 cycles (99.9% of all PIDs)">
                <div>
                  Common <Icon name="InformationCircle" size={16} />
                </div>
              </Tooltip>
            ),
            key: "methodLikelihoodCommon",
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
            title: (
              <Tooltip title="Lead PID speed equal to 900 cycles">
                <div>
                  Slowest <Icon name="InformationCircle" size={16} />
                </div>
              </Tooltip>
            ),
            key: "methodLikelihoodSlowest",
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
  return columns;
};

const resultSetupInfoToDistributionProps = (
  setup: ResultSetupInfo,
  rngManipulatedLeadPid: boolean,
): DistributionProps => {
  const leadCycleSpeed =
    setup.cycle_data_by_lead?.ideal_lead.lead_pid_cycle_count ?? 0;

  return {
    fixedData: {
      map: setup.mapId,
      action: setup.action,
      advance: setup.advance,
      tid: 0,
      sid: 0,
      lead: setup.lead,
      roamerState: setup.roamer_state,
      feebasState: setup.feebas_state,
      massOutbreakState: setup.mass_outbreak_state,
      initial_seed: setup.initial_seed,
      painting_advs: setup.painting_advs ?? null,
      wantedMethod: setup.method,
      wantedPID: setup.pid,
      idealLeadCycleSpeed: leadCycleSpeed,
      usingIdealLeadCycleSpeed: rngManipulatedLeadPid,
    },
  };
};

export const Wild3ResultSetupInfos = ({
  selectedPidPathResult,
  rngManipulatedLeadPid,
}: {
  selectedPidPathResult: PidPathResult | null;
  rngManipulatedLeadPid: boolean;
}) => {
  const resultSetupInfoColumns = React.useMemo(() => {
    const showMassOutbreak =
      selectedPidPathResult != null &&
      selectedPidPathResult.resultSetupInfos.some(
        (setup) => setup.mass_outbreak_state !== "Inactive",
      );
    const usesPainting =
      selectedPidPathResult?.resultSetupInfos.some(
        (res) => res.painting_advs != null,
      ) ?? false;

    return getResultSetupInfoColumns({
      rngManipulatedLeadPid,
      showMassOutbreak,
      usesPainting,
      onBreakdownClick: (record) => {
        setDistributionProps(
          resultSetupInfoToDistributionProps(record, rngManipulatedLeadPid),
        );
      },
    });
  }, [rngManipulatedLeadPid, selectedPidPathResult]);

  const [distributionProps, setDistributionProps] =
    React.useState<DistributionProps | null>(null);

  React.useEffect(() => {
    setDistributionProps(null);
  }, [selectedPidPathResult]);

  if (selectedPidPathResult == null) {
    return null;
  }

  return (
    <>
      <ResultTable<ResultSetupInfo>
        columns={resultSetupInfoColumns}
        rowKey="uid"
        dataSource={selectedPidPathResult.resultSetupInfos}
      />
      {distributionProps != null && (
        <Wild3MethodDistribution {...distributionProps} />
      )}
    </>
  );
};
