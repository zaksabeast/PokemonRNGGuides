import {
  Field,
  FormikNumberInput,
  FormikSwitch,
  TooltipWithIcon,
} from "~/components";
import {
  minAdvsAfterPaintingLabel,
  minFramesBeforePaintingLabel,
  usingPaintingReseedingLabel,
} from "../wild/wild3Labels";
import { FormikEmeraldFrameBeforePaintingInput } from "~/components/emeraldFrameBeforePainting";

import { FormState as WildFormState } from "../wild/wild3TargetSetupSearcher";
import { FormState as StaticFormState } from "../static/static3TargetSetupSearcher";
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

type FormState = WildFormState | StaticFormState;

export const targetSetupSearcherSchema = z
  .object({
    species: z.enum(species),
    tid: z.number().int().min(0).max(0xffff),
    usingAceForSid: z.boolean(),
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

export const getTargetSetupSearcherInitialValues = () => {
  return {
    tid: 0,
    usingAceForSid: false,
    sid: 0,
    usingPaintingReseeding: false,
    letSearcherFindPaintingSeed: true,
    showAdvancedPaintingSettings: false,
    initial_seed: 0,
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
  usingPaintingReseeding,
  letSearcherFindPaintingSeed,
  showAdvancedPaintingSettings,
}: {
  usingPaintingReseeding: boolean;
  letSearcherFindPaintingSeed: boolean;
  showAdvancedPaintingSettings: boolean;
}): Field[] => {
  return [
    {
      ...usingPaintingReseedingLabel(),
      input: <FormikSwitch<FormState> name="usingPaintingReseeding" />,
    },

    {
      label: "Let searcher find painting seed?",
      input: <FormikSwitch<FormState> name="letSearcherFindPaintingSeed" />,
      show: usingPaintingReseeding,
      indent: 1,
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
        "To ensure there is enough time between booting the game and triggering the wild encounter.",
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
  filter_shiny,
  canUseAce,
  usingAceForSid,
}: {
  filter_shiny: boolean;
  canUseAce: boolean;
  usingAceForSid: boolean;
}) => {
  return [
    {
      label: "Using ACE to change SID?",
      tooltip:
        "Whether to use Arbitrary Code Execution glitch to change your SID so the target Pokémon is shiny.",
      show: filter_shiny && canUseAce,
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
