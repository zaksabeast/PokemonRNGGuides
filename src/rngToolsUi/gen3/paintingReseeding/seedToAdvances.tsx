import {
  rngTools,
  Wild3PaintingAdvsAndDur,
  Wild3PaintingOpts,
} from "~/rngTools";
import { ResultColumn } from "~/components";
import {
  FieldRow,
  FormNumberField,
  FormRadioField,
  FormSection,
  FormSummary,
  FormSwitchField,
  FrameBeforePaintingField,
  TargetAdvanceField,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import React from "react";
import { formatHex } from "~/utils/formatHex";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { formatDuration } from "~/utils/formatDuration";
import { z } from "zod";
import { useWatch_UNSAFE } from "~/hooks/form";
import { GBA_FPS } from "~/utils/consts";
import { lcrng_distance, pokerng_with_jump } from "~/utils/lcrng";
import { match } from "ts-pattern";
import {
  minAdvsAfterPaintingLabel,
  minFramesBeforePaintingLabel,
  targetAdvanceAfterPaintingTitle,
} from "~/rngToolsUi/gen3/pokemonRng/labels";

type Result = Wild3PaintingAdvsAndDur & { uid: number };

const sortByList = [
  "time",
  "frameBeforePainting",
  "rngStateAfterPainting",
] as const;

const Validator = z.object({
  targetAdvance: z.number().int().min(0).max(0xffffffff),
  alreadyKnowPaintingFrameAndAdv: z.boolean(),
  // Permit over 0xFFFF even if not possible with painting. It's still useful to support for other type of reseeding or for emulator users.
  frameBeforePainting: z.number().int().min(0).max(0xffffffff),
  advAfterPainting: z.number().int().min(0).max(0xffffffff),
  min_frame_before_painting: z.number().int().min(0).max(0xffffffff),
  max_frame_before_painting: z.number().int().min(0).max(0xffffffff),
  min_adv_after_painting: z.number().int().min(0).max(0xffffffff),
  max_result_count: z.number().int(),
  showAdvancedSettings: z.boolean(),
  sortBy: z.enum(sortByList),
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  targetAdvance: 1_000_000,
  alreadyKnowPaintingFrameAndAdv: false,
  frameBeforePainting: 0,
  advAfterPainting: 0,
  min_frame_before_painting: 800, // Assuming dead battery.
  max_frame_before_painting: 0xffff,
  min_adv_after_painting: 7000, // About 4800 advances from painting to battle video. then 2200 advances buffer.
  showAdvancedSettings: false,
  max_result_count: 100,
  sortBy: "time",
};

const getColumns = (): ResultColumn<Result>[] => {
  return [
    {
      title: "Painting Seed",
      dataIndex: "advs",
      render: (advs) => {
        return advs.frame_before_painting === 0
          ? "-"
          : formatHex(advs.frame_before_painting, 2);
      },
    },
    {
      title: (
        <span>
          Frames before
          <br /> painting
        </span>
      ),
      key: "frame_before_painting",
      dataIndex: "advs",
      render: (advs) => {
        return advs.frame_before_painting === 0
          ? "-"
          : formatLargeInteger(advs.frame_before_painting);
      },
    },
    {
      title: (
        <span>
          RNG state after <br />
          painting <br />
          (in advances)
        </span>
      ),
      key: "rng_state_after",
      dataIndex: "advs",
      render: (advs) => {
        return advs.frame_before_painting === 0
          ? "-"
          : formatLargeInteger(lcrng_distance(0, advs.frame_before_painting));
      },
    },
    {
      title: (
        <span>
          Additional advances <br />
          after painting <br />
          to hit target
        </span>
      ),
      key: "additional_adv_after_painting",
      dataIndex: "advs",
      render: (advs) => {
        return formatLargeInteger(advs.adv_after_painting);
      },
    },
    {
      title: (
        <span>
          Time to create Battle Video <br />
          assuming 10 painting attempts
        </span>
      ),
      key: "wait_dur",
      dataIndex: "wait_dur",
      render: (wait_dur) => {
        return formatDuration(wait_dur / GBA_FPS);
      },
    },
  ];
};

const MyFields = () => {
  const alreadyKnowPaintingFrameAndAdv = useWatch_UNSAFE<
    FormState,
    "alreadyKnowPaintingFrameAndAdv"
  >({
    name: "alreadyKnowPaintingFrameAndAdv",
  });
  const frameBeforePainting = useWatch_UNSAFE<FormState, "frameBeforePainting">(
    {
      name: "frameBeforePainting",
    },
  );
  const advAfterPainting = useWatch_UNSAFE<FormState, "advAfterPainting">({
    name: "advAfterPainting",
  });
  const resultingTargetTxt = targetAdvanceAfterPaintingTitle({
    before: frameBeforePainting ?? 0,
    after: advAfterPainting ?? 0,
  });

  return (
    <FormSection>
      <FormSwitchField<FormState>
        name="alreadyKnowPaintingFrameAndAdv"
        label="I already know my painting frame and advance"
      >
        <FrameBeforePaintingField<FormState>
          name="frameBeforePainting"
          label="Frame before painting (Painting seed)"
        />
        <FormNumberField<FormState>
          name="advAfterPainting"
          label="Advances after painting"
          numType="decimal"
        />
        <FormSummary
          rows={[{ label: "Resulting Target", value: resultingTargetTxt }]}
        />
      </FormSwitchField>
      {!alreadyKnowPaintingFrameAndAdv && (
        <>
          <TargetAdvanceField<FormState>
            name="targetAdvance"
            label="Target of the RNG manipulation"
            tooltip={{
              title: "Target of the RNG manipulation",
              description: "Ex: Target advance to generate the wanted Pokémon.",
            }}
          />
          <FormSwitchField<FormState>
            name="showAdvancedSettings"
            label="Show advanced settings?"
          >
            <FieldRow>
              <FormNumberField<FormState>
                name="min_frame_before_painting"
                numType="decimal"
                {...minFramesBeforePaintingLabel()}
              />
              <FormNumberField<FormState>
                name="max_frame_before_painting"
                label="Max frames before painting"
                numType="decimal"
              />
            </FieldRow>
            <FormNumberField<FormState>
              name="min_adv_after_painting"
              numType="decimal"
              {...minAdvsAfterPaintingLabel()}
            />
            <FormNumberField<FormState>
              name="max_result_count"
              label="Max result count"
              numType="decimal"
            />
            <FormRadioField<FormState>
              name="sortBy"
              label="Sort by"
              cellSize="word"
              options={[
                { label: "Manip Time", value: "time" },
                { label: "Frame Before", value: "frameBeforePainting" },
                { label: "RNG State After", value: "rngStateAfterPainting" },
              ]}
            />
          </FormSwitchField>
        </>
      )}
    </FormSection>
  );
};

type Props = {
  onSelected?: (advs: { before: number; after: number } | null) => void;
};

let nextUid = 0;

export const EmeraldSeedToAdvances = ({ onSelected }: Props) => {
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit: ToolFormSubmit<FormState> = async (opts: FormState) => {
    if (opts.alreadyKnowPaintingFrameAndAdv) {
      setResults([
        {
          advs: {
            frame_before_painting: opts.frameBeforePainting,
            adv_after_painting: opts.advAfterPainting,
          },
          wait_dur: await rngTools.evaluate_dur_to_perform_painting(
            opts.frameBeforePainting,
            opts.advAfterPainting,
          ),
          uid: nextUid++,
        },
      ]);
      return;
    }

    const painting_opts: Wild3PaintingOpts = {
      min_frame_before_painting: 0,
      min_adv_after_painting: 0,
    };

    const targetSeed = pokerng_with_jump(0, opts.targetAdvance);
    rngTools
      .find_all_painting_advs_for_seed(painting_opts, targetSeed)
      .then((results) => {
        const filteredResults = results.filter((res) => {
          if (res.advs.frame_before_painting === 0) {
            return true;
          }
          if (
            opts.max_frame_before_painting != null &&
            res.advs.frame_before_painting > opts.max_frame_before_painting
          ) {
            return false;
          }
          return (
            res.advs.frame_before_painting >= opts.min_frame_before_painting &&
            res.advs.adv_after_painting >= opts.min_adv_after_painting
          );
        });
        filteredResults.sort((lhs, rhs) => {
          // Painting Seed = 0 goes first.
          if (lhs.advs.frame_before_painting === 0) {
            return -1;
          }
          if (rhs.advs.frame_before_painting === 0) {
            return 1;
          }
          return match(opts.sortBy)
            .with("time", () => lhs.wait_dur - rhs.wait_dur)
            .with(
              "frameBeforePainting",
              () =>
                lhs.advs.frame_before_painting - rhs.advs.frame_before_painting,
            )
            .with(
              "rngStateAfterPainting",
              () =>
                lcrng_distance(0, lhs.advs.frame_before_painting) -
                lcrng_distance(0, rhs.advs.frame_before_painting),
            )
            .exhaustive();
        });
        const limitedResults = filteredResults.slice(0, opts.max_result_count);
        setResults(
          limitedResults.map((res) => ({
            ...res,
            uid: nextUid++,
          })),
        );
      });
  };

  const onClickResultRow =
    onSelected == null
      ? undefined
      : (row: Result | null) => {
          onSelected(
            row != null
              ? {
                  before: row.advs.frame_before_painting,
                  after: row.advs.adv_after_painting,
                }
              : null,
          );
        };

  return (
    <ToolForm<FormState, Result>
      getColumns={getColumns}
      onClickResultRow={onClickResultRow}
      rowKey="uid"
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="emerald_seed_to_advances"
    >
      <MyFields />
    </ToolForm>
  );
};
