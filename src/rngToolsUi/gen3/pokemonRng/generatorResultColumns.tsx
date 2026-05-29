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


export const usingTargetSetupInputs = <T, >(usingPaintingReseeding:boolean,) => {
    return [

        {
          ...usingPaintingReseedingLabel(),
          input: <FormikSwitch<FormState> name="usingPaintingReseeding" />,
        },
        {
          label: "Target frame before painting (Painting seed)",
          input: (
            <FormikEmeraldFrameBeforePaintingInput<FormState> name="targetFrameBeforePainting" />
          ),
          indent: 1,
          show: usingPaintingReseeding,
        },
        {
          label: usingPaintingReseeding
            ? "Target advances after painting"
            : "Target advances",
          input: (
            <FormikNumberInput<FormState> name="targetAdvance" numType="decimal" />
          ),
        },
        {
          label: "",
          key: "Equivalent to Advances",
          show: usingPaintingReseeding,
          input: (
            <>
              Equivalent to Advances = {formatLargeInteger(equivalentInitialAdvs)}{" "}
              without painting reseeding
            </>
          ),
          indent: 1,
        },
    ]
}


/** Example of return values: Sturdy, Sturdy (1), Sturdy (2), First, Second */
export const getAbilityDisplayStr = async (species: Species, pid: number) => {
  const abilities = await rngTools.get_species_abilities(species);
  const abilityType = await rngTools.get_ability_type_from_gen3_pid(pid);

  const suffix =
    abilities[0] === abilities[1]
      ? ` (${abilityType === "First" ? 1 : 2})`
      : ``;
  if (abilityType === "First") {
    return abilities[0] == null ? abilityType : `${abilities[0]}${suffix}`;
  }
  if (abilityType === "Second") {
    return abilities[0] == null && abilities[1] == null
      ? abilityType
      : `${abilities[1] ?? abilities[0]}${suffix}`;
  }
  return "";
};
