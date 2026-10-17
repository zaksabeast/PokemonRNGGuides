import { ShinyIcon } from "~/components/shiny";
import type { ShinyType } from "~/rngTools";
import { Link, ResultColumn, Flex } from "~/components";
import { advanceFromSeed0Txt } from "../pokemonRng/labels";
import { PidPathResult as Wild3PidPathResult } from "../wild/wild3TargetSetupSearcher";
import { PidPathResult as Static3PidPathResult } from "../static/static3TargetSetupSearcher";
import z from "zod";
import { species } from "~/types/species";
import {
  getPkmFilterInitialValues,
  pkmFilterSchema,
} from "~/components/pkmFilter";
import {
  gen3PkmFilterSchema,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";
import { Static3Game } from "../static/constants.tsx";
import { Tooltip } from "antd";
import { ivColumns } from "~/rngToolsUi/shared/ivColumns";
import { GBA_FPS } from "~/utils/consts";
import { formatDuration } from "~/utils/formatDuration";
import { formatHex } from "~/utils/formatHex";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { AbilityName } from "~/components/abilityName";

// This file contains the code shared by Static3 and Wild3 targetSetupSearcher webtools.

type PidPathResult = Wild3PidPathResult | Static3PidPathResult;

export const targetSetupSearcherSchema = z
  .object({
    species: z.enum(species),
    tid: z.number().int().min(0).max(0xffff),
    usingAceForSid: z.boolean(),
    usingDeadBattery: z.boolean(),
    sid: z.number().int().min(0).max(0xffff),
    usingPaintingReseeding: z.boolean(),
    letSearcherFindPaintingSeed: z.boolean(),
    showAdvancedPaintingSettings: z.boolean(),
    initial_seed: z.number().int().min(0).max(0xffffffff),
    initial_advances: z.number().int().min(0).max(0xffffffff),
    min_frame_before_painting: z.number().int().min(0).max(0xffffffff),
    min_adv_after_painting: z.number().int().min(0).max(0xffffffff),
    max_advances: z.number().int().min(0).max(0xffffffff),
    max_result_count: z.number().int().min(1),
  })
  .extend(pkmFilterSchema.shape)
  .extend(gen3PkmFilterSchema.shape);

export const getTargetSetupSearcherInitialValues = (game: Static3Game) => {
  return {
    tid: 0,
    usingAceForSid: false,
    sid: 0,
    usingPaintingReseeding: false,
    usingDeadBattery: true,
    letSearcherFindPaintingSeed: true,
    showAdvancedPaintingSettings: false,
    initial_seed: game === "rs" ? 0x5a0 : 0,
    initial_advances: 1000,
    min_frame_before_painting: 800,
    min_adv_after_painting: 7000,
    max_advances: 10_000_000,
    max_result_count: 20,
    ...getPkmFilterInitialValues(),
    ...getGen3PkmFilterInitialValues(),
  };
};

export const getTargetResultColumns = (
  game: Static3Game,
  isApproxAdv: boolean,
  aceShiny: ShinyType | null,
): ResultColumn<PidPathResult>[] => {
  return [
    {
      title: "Advances",
      dataIndex: "advs",
      monospace: true,
      render: (advs, { wait_dur, seed }) => {
        const { frame_before_painting: before, adv_after_painting: after } =
          advs;

        const usingPainting = before !== 0 && game === "emerald";

        const beforeTxt = usingPainting
          ? `${formatLargeInteger(before)} | `
          : "";

        const afterTxt = `${isApproxAdv ? "~" : ""}${formatLargeInteger(after)}`;
        const text = `${beforeTxt}${afterTxt}`;
        const durTxt = `${formatDuration(wait_dur / GBA_FPS)} wait`;

        if (isApproxAdv) {
          return <Tooltip title={durTxt}>{text}</Tooltip>;
        }

        const title = (
          <Flex vertical>
            <div>{durTxt}</div>
            <div>Seed: {formatHex(seed, 4)}</div>
            {usingPainting && <div>{advanceFromSeed0Txt(seed)}</div>}
          </Flex>
        );
        return <Tooltip title={title}>{text}</Tooltip>;
      },
    },
    { title: "Nature", dataIndex: "nature" },
    {
      title: "Shiny",
      dataIndex: "shiny",
      render: (shiny) => <ShinyIcon shiny={aceShiny ?? shiny} />,
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
    {
      title: "Ability",
      dataIndex: "ability",
      render: (abilityType, values) => (
        <AbilityName species={values.species} abilityType={abilityType} />
      ),
    },
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
