import React from "react";
import { FormikInput,ResultColumn, RngToolForm, Field, FormFieldTable } from "~/components";
import { RadioGroup } from "~/components/radio";
import { RngToolUpdate } from "~/components/rngToolForm";
import {Starter,Game} from "./index";
import {findTargetAdvanceForShinyPokemon} from "./calc";
import { Flex, MultiTimer } from "~/components";
import {rngTools, Gen3NearbySid, Gen3TidSidShinyResult} from "~/rngTools";
import { Formik, FormikProps, FormikConfig } from "formik";

import {
  DecimalString,
  fromDecimalString,
  fromHexString,
  HexString,
  toDecimalString,
  toHexString,
} from "~/utils/number";


type FormState = {
  offset: DecimalString;
  tid: DecimalString;
};

const initialValues: FormState = {
  offset: toDecimalString(60), //NO_PROD. test in TAS mode, and check number of advance between inputs
  tid:toDecimalString(0),
};

type Props = {
  game:Game;
};

type Result = Gen3NearbySid & {
  tid_gen_target_adv:number;
};

const QUALITATIVE_RATINGS = ['Perfect', 'Very good', 'Good', 'Acceptable', 'So-so', 'Bad', 'Very bad'] as const;

const RECOMMEND_REDO_MSG = (chanceInPct:number) => `Redo Step 1 to generate a new easier TID (~${chanceInPct}% chance that each new TID is significately better)`;

const RECOMMEND_KEEP_MSG = `Keep that TID and go to Step 2.`;


export const GenerateTidSidRating = ({
  result,
}:{
  result:Gen3TidSidShinyResult
}) => {
  const durInMinutes = Math.round(result.avg_adv_to_determine_sid / 60 / 60);
  const pct = result.avg_adv_to_determine_sid_percentile;
  const qualitativeRating = (() => {
    if (pct <= 2)
      return QUALITATIVE_RATINGS[0];
    if (pct <= 5)
      return QUALITATIVE_RATINGS[1];
    if (pct <= 10)
      return QUALITATIVE_RATINGS[2];
    if (!result.should_improve_tid || pct <= 15)
      return QUALITATIVE_RATINGS[3];
    if (pct <= 25)
      return QUALITATIVE_RATINGS[4];
    if (pct <= 50)
      return QUALITATIVE_RATINGS[5];
    return QUALITATIVE_RATINGS[6];
  })();

  const estimatedTime = `~${durInMinutes} min (${qualitativeRating})`;
  const recommendation = result.should_improve_tid ? RECOMMEND_REDO_MSG(pct) : RECOMMEND_KEEP_MSG;

  const fields = [
    {
      label: "Estimated time to determine SID for TID:",
      input: estimatedTime,
    },
    {
      label: "Recommendation:",
      input: recommendation,
    },
    
  ];
  return (<FormFieldTable fields={fields} />);
};

export const GenerateTidSid = ({
  game,
}: Props) => {


  const getFields = (formik:FormikProps<FormState>) : Field[] => {
    const milliseconds = (() => {
      const offset = fromDecimalString(formik.values.offset) ?? 0;
      const milliseconds = Math.round((offset * 1000) / 59.7275);
      return [5000, milliseconds];
    })();

    const minutesBeforeTarget = Math.floor(milliseconds[1] / 60000);

    return [
      {
        label: "Offset for TID/SID generation",
        input: <FormikInput<FormState> name="offset" />,
      },
      {
        label:"TID/SID Timer",
        direction:"column",
        input:<MultiTimer
          {...{ minutesBeforeTarget, milliseconds }}
          startButtonTrackerId="start_gen3_shiny_starter_tidsid_timer"
          stopButtonTrackerId="stop_gen3_shiny_starter_tidsid_timer"
        />
      },
      {
        label: "Obtained TID",
        input: <FormikInput<FormState> name="tid" />,
      },
    ]
  };

  const [formResults, setFormResults] = React.useState<Result[]>([]);
  const [result, setResult] = React.useState<Gen3TidSidShinyResult | null>(null);

  const onSubmit = React.useCallback<RngToolUpdate<FormState>>(
    async (opts) => {
      const offset = fromDecimalString(opts.offset);
      const tid = fromDecimalString(opts.tid);

      if (offset == null || tid == null || tid < 0 || tid > 0xFFFF)
        return;

      const seed = game === "emerald" ? 0 : 0x5A0;
      const tid_gen_adv = 1505 - 60 + offset; //NO_PROD
      const rng_res = await rngTools.gen3_calculate_tidsid_shiny_for_tid(seed, tid_gen_adv, tid);
      const res = rng_res.nearby_sids.map(r => {
        return {...r, tid_gen_target_adv:tid_gen_adv}
      });
      setResult(rng_res);

      setFormResults(res);
    },
    [game],
  );

  const getColumns = (): ResultColumn<Result>[] => {
    const columns: ResultColumn<Result>[] = [
      { title: "TID/SID Advance", dataIndex: "tid_gen_adv",
        render: (val, values) => {
          const diffWithTarget = val - values.tid_gen_target_adv;
          if (diffWithTarget === 0)
            return `${val}`;
          if (diffWithTarget > 0)
            return `${val} (+${diffWithTarget})`;
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

  return (<>
    <RngToolForm<FormState, Result>
      results={formResults}
      getFields={getFields}
      columns={getColumns()}
      initialValues={initialValues}
      submitTrackerId="generate_tid_sid_for_shiny_starter"
      onSubmit={onSubmit}
    />
    {result && <GenerateTidSidRating result={result} />}
  </>);
};
