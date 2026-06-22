import {
  Field,
  FormikNumberInput,
  FormikSwitch,
  TooltipWithIcon,
  Link,
  ResultColumn,
  Flex,
} from "~/components";
import {
  minAdvsAfterPaintingLabel,
  minFramesBeforePaintingLabel,
  usingPaintingReseedingLabel,
} from "../wild/wild3Labels";
import { FormikEmeraldFrameBeforePaintingInput } from "~/components/emeraldFrameBeforePainting";
import {
  FormState as WildFormState,
  PidPathResult as Wild3PidPathResult,
} from "../wild/wild3TargetSetupSearcher";
import {
  FormState as StaticFormState,
  PidPathResult as Static3PidPathResult,
} from "../static/static3TargetSetupSearcher";
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
import { Static3Game } from "../static/constants";
import { Tooltip } from "antd";
import { ivColumns } from "~/rngToolsUi/shared/ivColumns";
import { GBA_FPS } from "~/utils/consts";
import { formatDuration } from "~/utils/formatDuration";
import { formatHex } from "~/utils/formatHex";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { match } from "ts-pattern";
import { AbilityName } from "~/components/abilityName";
import { lcrng_distance } from "~/utils/lcrng";

// This file contains the code shared by Static3 and Wild3 targetSetupSearcher webtools.

type FormState = WildFormState | StaticFormState;
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

export const getPaintingSetupFilterFields = ({
  game,
  usingPaintingReseeding,
  letSearcherFindPaintingSeed,
  showAdvancedPaintingSettings,
  usingDeadBattery,
}: {
  game: Static3Game;
  usingPaintingReseeding: boolean;
  letSearcherFindPaintingSeed: boolean;
  showAdvancedPaintingSettings: boolean;
  usingDeadBattery: boolean;
}): Field[] => {
  return [
    {
      ...usingPaintingReseedingLabel(),
      input: <FormikSwitch<FormState> name="usingPaintingReseeding" />,
      show: game === "emerald",
    },

    {
      label: "Let searcher find painting seed?",
      input: <FormikSwitch<FormState> name="letSearcherFindPaintingSeed" />,
      show: usingPaintingReseeding,
      indent: 1,
    },
    {
      label: "Dead Battery?",
      input: <FormikSwitch<FormState> name="usingDeadBattery" />,
      show: game === "rs" && !usingPaintingReseeding,
    },
    {
      label: "Initial seed",
      input: <FormikNumberInput<FormState> name="initial_seed" numType="hex" />,
      show: match(game)
        .with("emerald", () => false)
        .with("rs", () => !usingPaintingReseeding && !usingDeadBattery)
        .with("frlg", () => true)
        .exhaustive(),
    },
    {
      label: "Frame before painting (Painting seed)",
      input: (
        <FormikEmeraldFrameBeforePaintingInput<FormState> name="initial_seed" />
      ),
      show: usingPaintingReseeding && !letSearcherFindPaintingSeed,
      indent: 1,
    },
    {
      label: "Show advanced painting settings?",
      input: <FormikSwitch<FormState> name="showAdvancedPaintingSettings" />,
      show: usingPaintingReseeding,
      indent: 1,
    },
    {
      ...minFramesBeforePaintingLabel(),
      input: (
        <FormikNumberInput<FormState>
          name="min_frame_before_painting"
          numType="decimal"
        />
      ),
      show:
        usingPaintingReseeding &&
        letSearcherFindPaintingSeed &&
        showAdvancedPaintingSettings,
      indent: 2,
    },
    {
      ...minAdvsAfterPaintingLabel(),
      input: (
        <FormikNumberInput<FormState>
          name="min_adv_after_painting"
          numType="decimal"
        />
      ),
      show: usingPaintingReseeding && showAdvancedPaintingSettings,
      indent: 2,
    },
    {
      label: "Min advances",
      tooltip:
        "To ensure there is enough time between booting the game and triggering the encounter.",
      input: (
        <FormikNumberInput<FormState>
          name="initial_advances"
          numType="decimal"
        />
      ),
      show: !usingPaintingReseeding,
    },
    {
      label: usingPaintingReseeding
        ? "Max advances after painting"
        : "Max advances",
      input: (
        <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
      ),
      show: usingPaintingReseeding && !letSearcherFindPaintingSeed,
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
};

export const getTidSidSetupFilterFields = ({
  game,
  filter_shiny,
  usingAceForSid,
}: {
  game: Static3Game;
  filter_shiny: boolean;
  usingAceForSid: boolean;
}) => {
  return [
    {
      label: "Using ACE to change SID?",
      tooltip:
        "Whether to use Arbitrary Code Execution glitch to change your SID so the target Pokémon is shiny.",
      show: filter_shiny && game === "emerald",
      input: <FormikSwitch<FormState> name="usingAceForSid" />,
    },
    {
      label: "TID",
      input: filter_shiny ? (
        <FormikNumberInput<FormState> name="tid" numType="decimal" />
      ) : (
        <TooltipWithIcon title="The only impact of TID/SID is shininess and the target Pokemon is not shiny.">
          N/A
        </TooltipWithIcon>
      ),
    },
    {
      label: "SID",
      show: !usingAceForSid,
      input: filter_shiny ? (
        <FormikNumberInput<FormState> name="sid" numType="decimal" />
      ) : (
        <TooltipWithIcon title="The only impact of TID/SID is shininess and the target Pokemon is not shiny.">
          N/A
        </TooltipWithIcon>
      ),
    },
  ];
};

export const getTargetResultColumns = (
  game: Static3Game,
  isApproxAdv: boolean,
  usingAceForSid: boolean,
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
        const durTxt = formatDuration(wait_dur / GBA_FPS);

        if (isApproxAdv) {
          return <Tooltip title={durTxt}>{text}</Tooltip>;
        }

        const advFromSeed0 = `Equivalent to ${formatLargeInteger(lcrng_distance(0, seed))} advances without painting reseeding`;

        const title = (
          <Flex vertical>
            <div>{durTxt}</div>
            <div>Seed: {formatHex(seed, 4)}</div>
            {usingPainting && <div>{advFromSeed0}</div>}
          </Flex>
        );
        return <Tooltip title={title}>{text}</Tooltip>;
      },
    },
    { title: "Nature", dataIndex: "nature" },
    {
      title: "Shiny",
      dataIndex: "shiny",
      render: (shiny: boolean) => (shiny || usingAceForSid ? "Yes" : "No"),
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
      render: (abilityType, values) => {
        return (
          <AbilityName species={values.species} abilityType={abilityType} />
        );
      },
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
