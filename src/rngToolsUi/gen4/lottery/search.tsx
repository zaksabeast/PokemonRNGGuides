import {
  type SearchLottery4Opts,
  type SearchLottery4Res,
  multiWorkerRngTools,
} from "~/rngTools";
import { z } from "zod";
import {
  FormFieldTable,
  type Field,
  RngToolForm,
  FormikNumberInput,
  RngToolSubmit,
  ResultColumn,
  Button,
  MinMaxContainer,
  FormikSelect,
  Alert,
} from "~/components";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import { uniqueId } from "lodash-es";
import { chunkRange } from "~/utils/chunkRange";
import { RustOption } from "~/types/utils";
import { useAtom } from "~/state/localStorage";
import { gen4StateAtom } from "../shared/state";
import { useCurrentStep } from "~/components/stepper/state";
import { formatHex } from "~/utils/formatHex";

type Result = SearchLottery4Res & {
  key: string;
  delay: number;
  seed: number;
  seconds: number;
};

const Validator = z.object({
  min_delay: z.number(),
  max_delay: z.number(),
  year: z.number().int().min(2000).max(2100),
  tid: z.number().int().min(0).max(65535),
  min_mt_advance: z.number(),
  max_mt_advance: z.number(),
  prize_filter: z
    .enum([
      "MasterBall",
      "MaxRevive",
      "ExpShare",
      "PpUp",
      "UltraBall",
      "Backdrop",
    ])
    .nullable(),
});

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  year: 2000,
  min_delay: 800,
  max_delay: 1000,
  tid: 0,
  min_mt_advance: 20,
  max_mt_advance: 30,
  prize_filter: null,
};

const Fields = () => {
  const t = useActiveRouteTranslations();
  const [state] = useAtom(gen4StateAtom);
  const isDp = state.config.game === "Diamond" || state.config.game === "Pearl";

  const fields: Field[] = [
    {
      label: t["TID"],
      input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
    },
    {
      label: t["Year"],
      input: <FormikNumberInput<FormState> name="year" numType="decimal" />,
    },
    {
      label: t["Delay"],
      input: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState> name="min_delay" numType="decimal" />
          }
          max={
            <FormikNumberInput<FormState> name="max_delay" numType="decimal" />
          }
        />
      ),
    },
    {
      label: t["Advance"],
      input: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState>
              name="min_mt_advance"
              numType="decimal"
            />
          }
          max={
            <FormikNumberInput<FormState>
              name="max_mt_advance"
              numType="decimal"
            />
          }
        />
      ),
    },
    {
      label: t["Prize"],
      input: (
        <FormikSelect<FormState, "prize_filter">
          name="prize_filter"
          options={[
            { value: null, label: t["Any"] },
            { value: "MasterBall", label: t["Master Ball"] },
            { value: "MaxRevive", label: t["Max Revive"] },
            { value: "ExpShare", label: t["Exp. Share"] },
            { value: "PpUp", label: t["PP Up"] },
            isDp
              ? { value: "Backdrop", label: t["Backdrop"] }
              : { value: "UltraBall", label: t["Ultra Ball"] },
          ]}
        />
      ),
    },
  ];

  return <FormFieldTable fields={fields} />;
};

const mapResult = (result: SearchLottery4Res): Result => ({
  ...result,
  delay: result.seed_time.delay,
  seed: result.seed_time.seed,
  seconds: result.seed_time.datetime.second,
  key: uniqueId(),
});

export const Lottery4Searcher = () => {
  const t = useActiveRouteTranslations();
  const [, setCurrentStep] = useCurrentStep();
  const [state, setState] = useAtom(gen4StateAtom);
  const {
    run: searchLottery4,
    data: results,
    progressPercent,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.search_lotto_prizes, {
    limit: 1000,
    map: mapResult,
    sortBy: (result) => result.mt_advance,
  });

  const columns: ResultColumn<Result>[] = [
    {
      title: t["Select"],
      dataIndex: "key",
      disableVerticalPadding: true,
      render: (_, target) => (
        <Button
          trackerId="select_lottery4"
          onClick={() => {
            setState({
              target: {
                seedTime: target.seed_time,
                mtAdvance: target.mt_advance,
              },
            });
            setCurrentStep((step) => step + 1);
          }}
        >
          Select
        </Button>
      ),
    },
    {
      title: t["Advance"],
      dataIndex: "mt_advance",
      render: (value) => value.toString(),
    },
    {
      title: t["Prize"],
      dataIndex: "prize",
      render: (value) => value,
    },
    {
      title: t["Seed"],
      dataIndex: "seed",
      render: (seed) => formatHex(seed),
    },
    {
      title: t["Delay"],
      dataIndex: "delay",
    },
    {
      title: t["Seconds"],
      dataIndex: "seconds",
    },
  ];

  const onSubmit: RngToolSubmit<FormState> = async (opts) => {
    const chunked = chunkRange([opts.min_delay, opts.max_delay], 100);
    const chunksOpts = chunked.map(
      ([min_delay, max_delay]): RustOption<SearchLottery4Opts> => ({
        ...opts,
        game: state.config.game,
        force_seconds: null,
        min_delay,
        max_delay,
        limit: 1000,
      }),
    );
    return searchLottery4(chunksOpts);
  };

  return (
    <RngToolForm<FormState, Result>
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="search_lottery4"
      columns={columns}
      results={results}
      allowCancel
      progressPercent={progressPercent}
      cancelTrackerId="cancel_search_lottery4"
      onCancel={cancel}
    >
      <Fields />
      {results.length >= 1000 && (
        <Alert
          title="Too many results! Only showing the first 1000 results. Please narrow your search."
          type="error"
        />
      )}
    </RngToolForm>
  );
};
