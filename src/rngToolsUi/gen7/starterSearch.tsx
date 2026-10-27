import React from "react";
import { z } from "zod";
import { useAtom } from "jotai";
import {
  FieldRow,
  FormNumberField,
  FormSection,
  PkmFilter,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { Gen7UsumGiftSearchOpts, multiWorkerRngTools } from "~/rngTools";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
  pkmFilterSchema,
} from "~/components/pkmFilter";
import { HexSchema } from "~/utils/number";
import { chunkRange } from "~/utils/chunkRange";
import { RustOption } from "~/types/utils";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import { useCurrentStep } from "~/components/stepper/state";
import { gen7StarterTargetAtom } from "./starterState";
import { GiftResult, getGiftColumns, mapGiftResult } from "./giftResults";

const MAX_RESULTS = 10_000;
const TARGET_ADVANCES_PER_CHUNK = 3_000;

const Validator = z
  .object({
    seed: HexSchema(0xffffffff),
    tsv: z.number().int().min(0).max(4095),
    trv: HexSchema(0xf),
    current_advance: z.number().int().min(0),
    max_advances: z.number().int().min(0),
  })
  .extend(pkmFilterSchema.shape);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  seed: 0,
  tsv: 0,
  trv: 0,
  current_advance: 478,
  max_advances: 10000,
  ...getPkmFilterInitialValues(),
};

const Fields = () => {
  const t = useActiveRouteTranslations();

  return (
    <>
      <FormSection title={t["Your game"]}>
        <FormNumberField<FormState>
          name="seed"
          label={t["Seed"]}
          numType="hex"
        />
        <FieldRow>
          <FormNumberField<FormState>
            name="tsv"
            label={t["TSV"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="trv"
            label={t["TRV"]}
            numType="hex"
          />
        </FieldRow>
      </FormSection>

      <FormSection title={t["Search"]}>
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
        <PkmFilter<FormState>
          generation={7}
          species="Rowlet"
          displayAbility={false}
        />
      </FormSection>
    </>
  );
};

export const Gen7StarterSearch = () => {
  const t = useActiveRouteTranslations();
  const [target, setTarget] = useAtom(gen7StarterTargetAtom);
  const [, setCurrentStep] = useCurrentStep();
  const [submitted, setSubmitted] = React.useState<FormState | null>(null);
  const {
    run: searchStarters,
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

  const onSelect = (result: GiftResult) => {
    if (submitted == null) {
      return;
    }
    setTarget({
      seed: submitted.seed,
      tsv: submitted.tsv,
      trv: submitted.trv,
      currentAdvance: submitted.current_advance,
      starter: result.gift,
    });
    setCurrentStep((step) => step + 1);
  };

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    setSubmitted(opts);
    setTarget(null);
    const chunks = chunkRange(
      [opts.current_advance, opts.current_advance + opts.max_advances],
      TARGET_ADVANCES_PER_CHUNK,
    );
    await searchStarters(
      chunks.map(
        ([
          first_target_advance,
          last_target_advance,
        ]): RustOption<Gen7UsumGiftSearchOpts> => ({
          method: "Starter",
          seed: opts.seed,
          tsv: opts.tsv,
          trv: opts.trv,
          sync_nature: null,
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
        selectTrackerId: "gen7_select_usum_starter",
        selectedGift: target?.starter ?? null,
        onSelect,
      })}
      results={results}
      rowKey="key"
      submitTrackerId="gen7_search_usum_starters"
      allowCancel
      cancelTrackerId="gen7_cancel_search_usum_starters"
      onCancel={cancel}
      progressPercent={progressPercent}
    >
      <Fields />
    </ToolForm>
  );
};
