import { ResultColumn } from "~/components/resultTable";
import { formatDuration } from "~/utils/formatDuration";
import { formatLargeInteger } from "~/utils/formatLargeInteger";

export const getGeneratorPokemonResultColumns = <T extends {
    advs:number,
    //TODO
}, >() : ResultColumn<T>[] => {
    return [{
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
    ]
};