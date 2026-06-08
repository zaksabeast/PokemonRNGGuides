import React from "react";
import { rngTools, type ElmCall, type SeedTime4 } from "~/rngTools";
import {
  RngToolForm,
  FormikNumberInput,
  type RngToolSubmit,
  type ResultColumn,
  Field,
  MinMaxContainer,
  Button,
} from "~/components";
import { uniqueId } from "lodash-es";
import { z } from "zod";
import { ElmCallFilterButtons } from "./elmCallFilterButtons";
import { rngDate, RngDateSchema, rngTime, RngTimeSchema } from "~/utils/time";
import { gen4StateAtom } from "../state";
import { useAtom } from "jotai";
import { FormikDatePicker, FormikTimePicker } from "~/components/datePicker";
import { useCurrentStep } from "~/components/stepper/state";
import { Translations } from "~/translations";
import { matchesElmCallFilter } from "./utils";
import { getFindableSeeds } from "../getFindableSeeds";

type ResultRow = {
  id: string;
  seed: number;
  seedTime: SeedTime4;
  elmCalls: ElmCall[];
};

const Validator = z.object({
  date: RngDateSchema,
  time: RngTimeSchema,
  minDelay: z.number().int().min(0),
  maxDelay: z.number().int().min(0),
  minSeconds: z.number().int().min(0).max(59),
  maxSeconds: z.number().int().min(0).max(60),
  elmCallCount: z.number().int().min(0),
});

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  date: rngDate(),
  time: rngTime(),
  minDelay: 600,
  maxDelay: 800,
  minSeconds: 0,
  maxSeconds: 0,
  elmCallCount: 20,
};

type SelectButtonProps = {
  seedTime: SeedTime4;
};

const SelectButton = ({ seedTime }: SelectButtonProps) => {
  const [, setState] = useAtom(gen4StateAtom);
  const [, setCurrentStep] = useCurrentStep();

  return (
    <Button
      trackerId="elm_call_select_seed"
      onClick={() => {
        setState({
          target: { seedTime, lcrngAdvance: null, mtAdvance: null },
        });
        setCurrentStep((step) => step + 1);
      }}
    >
      Select
    </Button>
  );
};

const getColumns = (t: Translations): ResultColumn<ResultRow>[] => [
  {
    title: t["Select"],
    dataIndex: "id",
    render: (_, record) => <SelectButton seedTime={record.seedTime} />,
  },
  {
    title: t["Seed"],
    dataIndex: "seed",
    render: (seed) => seed.toString(16).toUpperCase().padStart(8, "0"),
  },
  {
    title: t["Elm Call Count"],
    dataIndex: "elmCalls",
    render: (elmCalls: ElmCall[]) => elmCalls.join(", "),
  },
];

const getFields = (t: Translations): Field[] => [
  {
    label: t["Date"],
    input: <FormikDatePicker<FormState> name="date" />,
  },
  {
    label: t["Time"],
    input: <FormikTimePicker<FormState> name="time" />,
  },
  {
    label: t["Seconds"],
    input: (
      <MinMaxContainer
        min={
          <FormikNumberInput<FormState> name="minSeconds" numType="decimal" />
        }
        max={
          <FormikNumberInput<FormState> name="maxSeconds" numType="decimal" />
        }
      />
    ),
  },
  {
    label: t["Delay"],
    input: (
      <MinMaxContainer
        min={<FormikNumberInput<FormState> name="minDelay" numType="decimal" />}
        max={<FormikNumberInput<FormState> name="maxDelay" numType="decimal" />}
      />
    ),
  },
  {
    label: t["Elm Call Count"],
    input: (
      <FormikNumberInput<FormState> name="elmCallCount" numType="decimal" />
    ),
  },
];

export const HgssElmCallSeedFinder = () => {
  const [allResults, setAllResults] = React.useState<ResultRow[]>([]);
  const [state, setState] = useAtom(gen4StateAtom);
  const elmCallCount = initialValues.elmCallCount;

  const filteredResults = allResults.filter((result) =>
    matchesElmCallFilter(result.elmCalls, state.gameState.elmCalls),
  );

  const onSubmit: RngToolSubmit<FormState> = async (opts) => {
    const { seedTimesBySeed, seedList } = await getFindableSeeds(opts);

    const elmCalls = await rngTools.elm_calls_for_seeds(
      seedList,
      opts.elmCallCount,
    );

    const results = elmCalls.map(({ seed, elm_calls }): ResultRow => {
      return {
        id: uniqueId(),
        seed,
        seedTime: seedTimesBySeed[seed],
        elmCalls: elm_calls,
      };
    });

    setAllResults(results);
  };

  return (
    <RngToolForm<FormState, ResultRow>
      getFields={getFields}
      getColumns={getColumns}
      results={filteredResults}
      initialValues={initialValues}
      validationSchema={Validator}
      filters={
        <ElmCallFilterButtons
          hasResults={allResults.length > 0}
          maxElmCalls={elmCallCount}
          elmCallFilter={state.gameState.elmCalls}
          onElmCallFilterChange={(elmCalls) =>
            setState({ gameState: { elmCalls } })
          }
          eTrackerId="hgss_elm_call_seed_add_e"
          kTrackerId="hgss_elm_call_seed_add_k"
          pTrackerId="hgss_elm_call_seed_add_p"
        />
      }
      onSubmit={onSubmit}
      rowKey="id"
      submitTrackerId="hit_elm_call_seed_search"
    />
  );
};
