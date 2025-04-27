import React from "react";
import { z } from "zod";
import {
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  Field,
  FormFieldTable,
  RngToolSubmit,
} from "~/components";
import { Game } from "./index";
import { MultiTimer } from "~/components";
import { rngTools, Gen3NearbySid, Gen3TidSidShinyResult } from "~/rngTools";
import { FormikProps } from "formik";

const Validator = z.object({
  offset: z.number().int().min(-999).max(999),
  tid: z.number().int().min(0).max(65535),
});

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  offset: 50, // offset on Emerald on mgba 0.11-8764
  tid: 0,
};

type Props = {
  game: Game;
};

type Result = Gen3NearbySid & {
  tid_gen_target_adv: number;
};

const QUALITATIVE_RATINGS = [
  "Perfect",
  "Very good",
  "Good",
  "Acceptable",
  "So-so",
  "Bad",
  "Very bad",
] as const;

const RECOMMEND_REDO_MSG = (chanceInPct: number) =>
  `Redo Step 1 to generate a new easier TID (~${chanceInPct}% chance that each new TID is significately better)`;

const RECOMMEND_KEEP_MSG = `Keep that TID and go to Step 2.`;

const IDEAL_TIDSID_ADVANCE_WITH_OFFSET = (game:Game) => game === "emerald" ? 1410 : 1633;
const ADDITIONAL_DUR_IN_MINUTES = 30; // Duration not caused by in-game waiting (ex: filling form etc.)

export const GenerateTidSidRating = ({
  result,
}: {
  result: Gen3TidSidShinyResult;
}) => {
  const durInMinutes = Math.round(result.avg_adv_to_determine_sid / 60 / 60);
  const pct = result.avg_adv_to_determine_sid_percentile;
  const qualitativeRating = (() => {
    if (pct <= 2) return QUALITATIVE_RATINGS[0];
    if (pct <= 5) return QUALITATIVE_RATINGS[1];
    if (pct <= 10) return QUALITATIVE_RATINGS[2];
    if (!result.should_improve_tid || pct <= 15) return QUALITATIVE_RATINGS[3];
    if (pct <= 25) return QUALITATIVE_RATINGS[4];
    if (pct <= 50) return QUALITATIVE_RATINGS[5];
    return QUALITATIVE_RATINGS[6];
  })();

  const estimatedTime = `~${durInMinutes + ADDITIONAL_DUR_IN_MINUTES} min (${qualitativeRating})`;
  const recommendation = result.should_improve_tid
    ? RECOMMEND_REDO_MSG(pct)
    : RECOMMEND_KEEP_MSG;

  const fields = [
    {
      label: "Estimated time to determine SID for obtained TID:",
      input: estimatedTime,
    },
    {
      label: "Recommendation:",
      input: recommendation,
    },
  ];
  return <FormFieldTable fields={fields} />;
};

export const GenerateTidSid = ({ game }: Props) => {
  const idealAdvance = IDEAL_TIDSID_ADVANCE_WITH_OFFSET(game);

  const getFields = (formik: FormikProps<FormState>): Field[] => {
    const milliseconds = (() => {
      const advFromOffset = formik.values.offset;
      const advFromTimer = idealAdvance - advFromOffset;
      let milliseconds = Math.round((advFromTimer * 1000) / 59.7275);
      if (milliseconds < 0) milliseconds = 0;
      return [5000, milliseconds];
    })();

    const minutesBeforeTarget = Math.floor(milliseconds[1] / 60000);

    return [
      {
        label: "Offset",
        input: <FormikNumberInput<FormState> name="offset" numType="decimal" />,
      },
      {
        label: "TID/SID Timer",
        direction: "column",
        input: (
          <MultiTimer
            {...{ minutesBeforeTarget, milliseconds }}
            startButtonTrackerId="start_gen3_shiny_starter_tidsid_timer"
            stopButtonTrackerId="stop_gen3_shiny_starter_tidsid_timer"
          />
        ),
      },
      {
        label: "Obtained TID",
        input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
      },
    ];
  };

  const [formResults, setFormResults] = React.useState<Result[]>([]);
  const [result, setResult] = React.useState<Gen3TidSidShinyResult | null>(
    null,
  );

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const seed = game === "emerald" ? 0 : 0x5a0;
      const rng_res = await rngTools.gen3_calculate_tidsid_shiny_for_tid(
        seed,
        idealAdvance,
        opts.tid,
      );
      const res = rng_res.nearby_sids.map((r) => {
        return { ...r, tid_gen_target_adv: idealAdvance };
      });

      setResult(rng_res);

      setFormResults(res);
    },
    [game],
  );

  const getColumns = (): ResultColumn<Result>[] => {
    const columns: ResultColumn<Result>[] = [
      {
        title: "TID/SID advance",
        dataIndex: "tid_gen_adv",
        render: (val, values) => {
          const diffWithTarget = val - values.tid_gen_target_adv;
          if (diffWithTarget === 0) return `${val}`;
          if (diffWithTarget > 0) return `${val} (+${diffWithTarget})`;
          return `${val} (${diffWithTarget})`;
        },
      },
      {
        title: "SID",
        dataIndex: "sid",
      },
      {
        title: "Earliest Method-1 advance for shiny starter",
        dataIndex: "earliest_shiny_adv",
        render: (val) => {
          const durInMinutes = (val / 60 / 60).toFixed(1);
          return `${val} (~${durInMinutes} min)`;
        },
      },
    ];
    return columns;
  };

  return (
    <>
      <RngToolForm<FormState, Result>
        results={formResults}
        getFields={getFields}
        columns={getColumns()}
        validationSchema={Validator}
        initialValues={initialValues}
        submitButtonLabel="Generate possible SIDs"
        submitTrackerId="generate_tid_sid_for_shiny_starter"
        onSubmit={onSubmit}
      />
      {result && <GenerateTidSidRating result={result} />}
    </>
  );
};
