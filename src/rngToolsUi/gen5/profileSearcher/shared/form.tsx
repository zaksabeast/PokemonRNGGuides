import React from "react";
import { z } from "zod";
import { ToolForm, type ToolFormSubmit } from "~/components/form";
import { uniqueId } from "lodash-es";
import {
  multiWorkerRngTools,
  Profile5SearchResult,
  ProfileSearcher5,
} from "~/rngTools";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import { chunkRange } from "~/utils/chunkRange";
import { RustOption } from "~/types";
import { addRngTime } from "~/utils/time";
import { Profile5ValidatorFormState } from "./validator";
import { profile5Columns } from "./columns";
import { Profile5Fields } from "./fields";
import { Profile5SearcherState, useProfile5State } from "../state";
import { DefaultValues } from "react-hook-form";

type Result = Profile5SearchResult & { id: string };

const mapResult = (res: Profile5SearchResult): Result => ({
  ...res,
  id: uniqueId(),
});

const mapFormState = ({
  opts,
  state,
  minVFrame,
  maxVFrame,
}: {
  opts: Profile5ValidatorFormState;
  state: Profile5SearcherState;
  minVFrame: number;
  maxVFrame: number;
}): RustOption<Omit<ProfileSearcher5, "validator">> => {
  return {
    mac: opts.mac.toString(),
    max_timer0: opts.max_timer0,
    min_timer0: opts.min_timer0,
    max_gx_stat: opts.max_gx_stat,
    min_gx_stat: opts.min_gx_stat,
    max_seconds: opts.max_seconds,
    min_seconds: opts.min_seconds,
    max_v_count: opts.max_v_count,
    min_v_count: opts.min_v_count,
    buttons: opts.buttons,
    date_time: addRngTime(opts.date, opts.time),
    version: state.game,
    ds_type: state.dsType,
    language: state.language,
    min_v_frame: minVFrame,
    max_v_frame: maxVFrame,
  };
};

export type ValidatorMapper<FormState> = (
  opts: FormState,
) => RustOption<ProfileSearcher5["validator"]>;

const chunkFormState = <FormState extends Profile5ValidatorFormState>({
  opts,
  state,
  mapValidator,
}: {
  opts: FormState;
  state: Profile5SearcherState;
  mapValidator: ValidatorMapper<FormState>;
}): RustOption<ProfileSearcher5>[] => {
  const chunks = chunkRange([opts.min_v_frame, opts.max_v_frame], 2);
  return chunks.map(
    ([minVFrame, maxVFrame]): RustOption<ProfileSearcher5> => ({
      ...mapFormState({ opts, state, minVFrame, maxVFrame }),
      validator: mapValidator(opts),
    }),
  );
};

type Profile5SearcherProps<FormState extends Profile5ValidatorFormState> = {
  initialValues: DefaultValues<FormState>;
  validationSchema: z.ZodType<FormState>;
  cancelTrackerId: string;
  submitTrackerId: string;
  mapValidator: ValidatorMapper<FormState>;
  children: React.ReactNode;
};

export const Profile5Searcher = <FormState extends Profile5ValidatorFormState>({
  mapValidator,
  children,
  ...props
}: Profile5SearcherProps<FormState>) => {
  const [state] = useProfile5State();
  const {
    run: searchProfile5,
    data: results,
    progressPercent,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.search_profile5, { map: mapResult });

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    const searchOpts = chunkFormState({ opts, state, mapValidator });
    return await searchProfile5(searchOpts);
  };

  return (
    <ToolForm<FormState, Result>
      rowKey="id"
      onSubmit={onSubmit}
      onCancel={cancel}
      allowCancel
      results={results}
      columns={profile5Columns}
      progressPercent={progressPercent}
      {...props}
    >
      <Profile5Fields />
      {children}
    </ToolForm>
  );
};
