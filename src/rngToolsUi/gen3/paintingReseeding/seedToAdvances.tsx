import {
  rngTools,
  Wild3PaintingAdvsAndDur,
  Wild3PaintingOpts,
} from "~/rngTools";
import {
  ResultColumn,
  RngToolSubmit,
  RngToolForm,
  FormikNumberInput,
  FormikSwitch,
  FormFieldTable,
  Icon,
  Field,
  FormikRadio,
} from "~/components";
import React from "react";
import { formatHex } from "~/utils/formatHex";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { formatDuration } from "~/utils/formatDuration";
import { z } from "zod";
import { useWatch } from "react-hook-form";
import { Tooltip } from "antd";
import { GBA_FPS } from "~/utils/consts";
import { lcrng_distance, pokerng_with_jump } from "~/utils/lcrng";
import { FormikEmeraldTargetAdvance } from "~/components/emeraldTargetAdvance";
import { match } from "ts-pattern";
import { FormikNumberDecimalHexInput } from "~/components/numberInput";
import { formatEmeraldTargetFromPainting } from "~/utils/formatEmeraldTargetFromPainting";

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
        <>
          Frames before
          <br /> painting
        </>
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
        <>
          RNG state after <br />
          painting <br />
          (in advances)
        </>
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
        <>
          Additional advances <br />
          after painting <br />
          to hit target
        </>
      ),
      key: "additional_adv_after_painting",
      dataIndex: "advs",
      render: (advs) => {
        return formatLargeInteger(advs.adv_after_painting);
      },
    },
    {
      title: (
        <>
          Time to create Battle Video <br />
          assuming 10 painting attempts
        </>
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
  const alreadyKnowPaintingFrameAndAdv = useWatch<
    FormState,
    "alreadyKnowPaintingFrameAndAdv"
  >({
    name: "alreadyKnowPaintingFrameAndAdv",
  });
  const showAdvanced = useWatch<FormState, "showAdvancedSettings">({
    name: "showAdvancedSettings",
  });

  const frameBeforePainting = useWatch<FormState, "frameBeforePainting">({
    name: "frameBeforePainting",
  });
  const advAfterPainting = useWatch<FormState, "advAfterPainting">({
    name: "advAfterPainting",
  });
  const resultingTargetTxt = formatEmeraldTargetFromPainting(
    frameBeforePainting ?? 0,
    advAfterPainting ?? 0,
  );

  const fields: Field[] = [
    {
      label: "I already know my painting frame and advance",
      key: "alreadyKnowPaintingFrameAndAdv",
      input: <FormikSwitch<FormState> name="alreadyKnowPaintingFrameAndAdv" />,
    },
    {
      label: "Frame before painting",
      input: (
        <FormikNumberDecimalHexInput<FormState>
          initialNumType="decimal"
          name="frameBeforePainting"
          byteCount={2}
        />
      ),
      show: alreadyKnowPaintingFrameAndAdv,
      indent: 1,
    },
    {
      label: "Advance after painting",
      input: (
        <FormikNumberDecimalHexInput<FormState>
          initialNumType="decimal"
          name="advAfterPainting"
          byteCount={4}
        />
      ),
      show: alreadyKnowPaintingFrameAndAdv,
      indent: 1,
    },
    {
      label: "Resulting Target",
      input: resultingTargetTxt,
      show: alreadyKnowPaintingFrameAndAdv,
      indent: 1,
    },
    {
      label: (
        <Tooltip title="Ex: Target advance to generate the wanted Pokémon.">
          <div>
            Target of the RNG manipulation{" "}
            <Icon name="InformationCircle" size={16} />
          </div>
        </Tooltip>
      ),
      show: !alreadyKnowPaintingFrameAndAdv,
      key: "targetSeed",
      input: <FormikEmeraldTargetAdvance name="targetAdvance" />,
    },
    {
      label: "Show advanced settings?",
      input: <FormikSwitch<FormState> name="showAdvancedSettings" />,
      show: !alreadyKnowPaintingFrameAndAdv,
    },
    {
      label: (
        <Tooltip title="To ensure there is enough time between booting the game and interacting with the painting.">
          <div>
            Min frames before painting{" "}
            <Icon name="InformationCircle" size={16} />
          </div>
        </Tooltip>
      ),
      key: "min_frame_before_painting",
      input: (
        <FormikNumberInput<FormState>
          name="min_frame_before_painting"
          numType="decimal"
        />
      ),
      show: !alreadyKnowPaintingFrameAndAdv && showAdvanced,
      indent: 1,
    },
    {
      label: "Max frames before painting",
      key: "max_frame_before_painting",
      input: (
        <FormikNumberInput<FormState>
          name="max_frame_before_painting"
          numType="decimal"
        />
      ),
      show: !alreadyKnowPaintingFrameAndAdv && showAdvanced,
      indent: 1,
    },
    {
      label: (
        <Tooltip title="To ensure there is enough time between interacting with the painting, and creating a Battle Video.">
          <div>
            Min advances after painting{" "}
            <Icon name="InformationCircle" size={16} />
          </div>
        </Tooltip>
      ),
      key: "min_adv_after_painting",
      input: (
        <FormikNumberInput<FormState>
          name="min_adv_after_painting"
          numType="decimal"
        />
      ),
      show: !alreadyKnowPaintingFrameAndAdv && showAdvanced,
      indent: 1,
    },
    {
      label: "Max result count",
      input: (
        <FormikNumberInput<FormState>
          name="max_result_count"
          numType="decimal"
        />
      ),
      show: !alreadyKnowPaintingFrameAndAdv && showAdvanced,
      indent: 1,
    },
    {
      label: "Sort by",
      input: (
        <FormikRadio<FormState>
          name="sortBy"
          options={[
            { label: "Manip Time", value: "time" },
            { label: "Frame Before", value: "frameBeforePainting" },
            { label: "RNG State After", value: "rngStateAfterPainting" },
          ]}
        />
      ),
      show: !alreadyKnowPaintingFrameAndAdv && showAdvanced,
      indent: 1,
    },
  ];

  return <FormFieldTable fields={fields} />;
};

type Props = {
  onSelected?: (before: number, after: number) => void;
};

let nextUid = 0;

export const EmeraldSeedToAdvances = ({ onSelected }: Props) => {
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit: RngToolSubmit<FormState> = async (opts: FormState) => {
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
        results = results.filter((res) => {
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
        results.sort((lhs, rhs) => {
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
        results = results.slice(0, opts.max_result_count);
        setResults(
          results.map((res) => ({
            ...res,
            uid: nextUid++,
          })),
        );
      });
  };

  const onClickResultRow =
    onSelected == null
      ? undefined
      : (row: Result) => {
          onSelected(
            row.advs.frame_before_painting,
            row.advs.adv_after_painting,
          );
        };

  return (
    <RngToolForm<FormState, Result>
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
    </RngToolForm>
  );
};
