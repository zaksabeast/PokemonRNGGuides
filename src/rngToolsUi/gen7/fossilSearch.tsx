import React from "react";
import { z } from "zod";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  AbilityFilterField,
  FieldRow,
  FormNumberField,
  FormSection,
  FormSelectField,
  NatureFilterField,
  PkmFilter,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import {
  Ability,
  Gen7UsumGiftSearchOpts,
  multiWorkerRngTools,
  rngTools,
} from "~/rngTools";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
  pkmFilterSchema,
} from "~/components/pkmFilter";
import { HexSchema } from "~/utils/number";
import { chunkRange } from "~/utils/chunkRange";
import { toOptions } from "~/utils/options";
import { RustOption } from "~/types/utils";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import { useWatch } from "~/hooks/form";
import { useCurrentStep } from "~/components/stepper/state";
import { abilities } from "~/translations/en/abilities";
import {
  Gen7FossilTarget,
  fetchGen7FossilPlan,
  gen7FossilPlanAtom,
  gen7FossilTargetAtom,
  gen7FossilTimelineAtom,
  gen7FossilTimelineQueryAtom,
  setGen7FossilPlanAtom,
} from "./fossilState";
import {
  GEN7_GIFT_LEAD_COUNT,
  ORDINARY_LEAD_IDX,
  getGen7GiftLeadOptions,
  getSyncNature,
} from "./giftLeads";
import {
  GiftAbilityNames,
  GiftResult,
  getGiftColumns,
  mapGiftResult,
} from "./giftResults";

const MAX_RESULTS = 10_000;
// Each chunk also walks the ~3,600 dialogue A advances before its first
// target. Small chunks repeat that work, but spread the search across
// workers and show progress.
const TARGET_ADVANCES_PER_CHUNK = 3_000;
const CREATE_TIMELINE_STEP = 1;
const FOSSIL_DIALOGUE_STEP = 2;

const fossilSpecies = [
  "Cranidos",
  "Shieldon",
  "Tirtouga",
  "Archen",
  "Omanyte",
  "Kabuto",
  "Aerodactyl",
  "Lileep",
  "Anorith",
  "Tyrunt",
  "Amaura",
] as const;

type FossilSpecies = (typeof fossilSpecies)[number];

// Limitation: the species data ends at Gen 5, so Gen 6 fossils list their
// ability slots here.
const gen6FossilAbilities: Partial<Record<FossilSpecies, [Ability, Ability]>> =
  {
    Tyrunt: ["StrongJaw", "StrongJaw"],
    Amaura: ["Refrigerate", "Refrigerate"],
  };

const Validator = z
  .object({
    seed: HexSchema(0xffffffff),
    tsv: z.number().int().min(0).max(4095),
    species: z.enum(fossilSpecies),
    current_advance: z.number().int().min(0),
    max_advances: z.number().int().min(0),
    // Limitation: a Select value must be a primitive, so this is an index into the leads.
    lead_idx: z
      .number()
      .int()
      .min(0)
      .max(GEN7_GIFT_LEAD_COUNT - 1),
  })
  .extend(pkmFilterSchema.shape);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  seed: 0,
  tsv: 0,
  species: "Cranidos",
  current_advance: 1300,
  max_advances: 10000,
  lead_idx: ORDINARY_LEAD_IDX,
  ...getPkmFilterInitialValues(),
};

const getGiftAbilityNames = async (
  species: FossilSpecies,
): Promise<GiftAbilityNames> => {
  const [first, second] =
    gen6FossilAbilities[species] ??
    (await rngTools.get_species_abilities(species));
  return {
    First: first == null ? null : abilities[first],
    Second: second == null ? null : abilities[second],
    Hidden: null,
  };
};

const Fields = () => {
  const t = useActiveRouteTranslations();
  const { species } = useWatch({
    names: { species: true },
    validationSchema: Validator,
  });

  return (
    <>
      <FormSection title={t["Your game"]}>
        <FieldRow>
          <FormNumberField<FormState>
            name="seed"
            label={t["Seed"]}
            numType="hex"
          />
          <FormNumberField<FormState>
            name="tsv"
            label={t["TSV"]}
            numType="decimal"
          />
        </FieldRow>
      </FormSection>

      <FormSection title={t["Search"]}>
        <FormSelectField<FormState>
          name="species"
          label={t["Fossil"]}
          options={toOptions(fossilSpecies)}
        />
        <FieldRow>
          <FormNumberField<FormState>
            name="current_advance"
            label={t["Current Advance"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="max_advances"
            label={t["Max Advances"]}
            numType="decimal"
          />
        </FieldRow>
      </FormSection>

      <FormSection title={t["Filters"]}>
        <FieldRow>
          <FormSelectField<FormState>
            name="lead_idx"
            label={t["Lead"]}
            options={getGen7GiftLeadOptions(t)}
          />
          <NatureFilterField<FormState> name="filter_nature" />
        </FieldRow>
        <AbilityFilterField<FormState>
          name="filter_ability"
          // Gen 6 fossils filter by ability slot, since their species data is missing.
          species={
            species == null || species in gen6FossilAbilities
              ? undefined
              : species
          }
        />
        <PkmFilter<FormState>
          species={species ?? undefined}
          displayNature={false}
          displayAbility={false}
        />
      </FormSection>
    </>
  );
};

type Submitted = {
  opts: FormState;
  abilityNames: GiftAbilityNames;
};

export const Gen7FossilSearch = () => {
  const t = useActiveRouteTranslations();
  const [target, setTarget] = useAtom(gen7FossilTargetAtom);
  const [timelineQuery, setTimelineQuery] = useAtom(
    gen7FossilTimelineQueryAtom,
  );
  const timeline = useAtomValue(gen7FossilTimelineAtom);
  const setTimeline = useSetAtom(gen7FossilTimelineAtom);
  const setPlan = useSetAtom(gen7FossilPlanAtom);
  const storePlan = useSetAtom(setGen7FossilPlanAtom);
  const [, setCurrentStep] = useCurrentStep();
  const [submitted, setSubmitted] = React.useState<Submitted | null>(null);
  const {
    run: searchFossils,
    data: results,
    progressPercent,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.gen7_search_usum_gifts, {
    map: mapGiftResult,
    sortBy: [
      (result) => result.advance,
      (result) => result.gift.delay_advances,
    ],
    limit: MAX_RESULTS,
  });

  const onSelect = async (result: GiftResult) => {
    if (submitted == null) {
      return;
    }
    const { opts, abilityNames } = submitted;
    const newTarget: Gen7FossilTarget = {
      seed: opts.seed,
      abilityName: abilityNames[result.gift.ability],
      fossil: result.gift,
    };
    setTarget(newTarget);
    setPlan(null);

    if (timeline == null || timeline.query !== timelineQuery) {
      setCurrentStep(CREATE_TIMELINE_STEP);
      return;
    }

    // The user is already on a timeline, so plan from where they are.
    setCurrentStep(FOSSIL_DIALOGUE_STEP);
    const plans = await fetchGen7FossilPlan(
      newTarget.seed,
      timeline.safeAdvance,
      newTarget.fossil,
      timeline.minDialogueAAdvance,
    );
    const plan = plans[0];
    if (plan != null) {
      storePlan({
        timeline,
        isNewTimeline: false,
        target: newTarget,
        presses: plan.presses ?? null,
      });
    }
  };

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    const abilityNames = await getGiftAbilityNames(opts.species);
    setSubmitted({ opts, abilityNames });
    setTarget(null);
    setPlan(null);
    if (
      timelineQuery?.seed !== opts.seed ||
      timelineQuery.currentAdvance !== opts.current_advance
    ) {
      setTimelineQuery({
        seed: opts.seed,
        currentAdvance: opts.current_advance,
      });
      setTimeline(null);
    }

    const chunks = chunkRange(
      [opts.current_advance, opts.current_advance + opts.max_advances],
      TARGET_ADVANCES_PER_CHUNK,
    );
    await searchFossils(
      chunks.map(
        ([
          first_target_advance,
          last_target_advance,
        ]): RustOption<Gen7UsumGiftSearchOpts> => ({
          method: "Fossil",
          seed: opts.seed,
          tsv: opts.tsv,
          sync_nature: getSyncNature(opts.lead_idx) ?? undefined,
          current_advance: opts.current_advance,
          first_target_advance,
          last_target_advance,
          filter: pkmFilterFieldsToRustInput(opts),
        }),
      ),
    );
  };

  return (
    <ToolForm<FormState, GiftResult>
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      columns={getGiftColumns(t, {
        selectTrackerId: "gen7_select_usum_fossil",
        selectedGift: target?.fossil ?? null,
        onSelect,
        abilityNames: submitted?.abilityNames ?? null,
      })}
      results={results}
      rowKey="key"
      submitTrackerId="gen7_search_usum_fossils"
      allowCancel
      cancelTrackerId="gen7_cancel_search_usum_fossils"
      onCancel={cancel}
      progressPercent={progressPercent}
    >
      <Fields />
    </ToolForm>
  );
};
