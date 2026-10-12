import React from "react";
import { type ElmCall, type SeedTime4 } from "~/rngTools";
import { type ResultColumn, Button } from "~/components";
import {
  FieldRow,
  FormDateField,
  FormNumberField,
  FormSection,
  FormTimeField,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { z } from "zod";
import { ElmCallFilterButtons } from "./elmCallFilterButtons";
import { rngDate, RngDateSchema, rngTime, RngTimeSchema } from "~/utils/time";
import { gen4StateAtom } from "../state";
import { useAtom } from "jotai";
import { useCurrentStep } from "~/components/stepper/state";
import { Translations } from "~/translations";
import { matchesElmCallFilter } from "./utils";
import { getSeedTime4WithMarkers } from "../getFindableSeeds";

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
  filterItemCount: z.number().int().min(0),
});

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  date: rngDate(),
  time: rngTime(),
  minDelay: 600,
  maxDelay: 800,
  minSeconds: 0,
  maxSeconds: 0,
  filterItemCount: 20,
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

const Fields = () => {
  const t = useActiveRouteTranslations();

  return (
    <FormSection>
      <FieldRow>
        <FormDateField<FormState> name="date" label={t["Date"]} />
        <FormTimeField<FormState> name="time" label={t["Time"]} />
      </FieldRow>
      <FieldRow>
        <FormNumberField<FormState>
          name="minSeconds"
          label={t["Min Seconds"]}
          numType="decimal"
        />
        <FormNumberField<FormState>
          name="maxSeconds"
          label={t["Max Seconds"]}
          numType="decimal"
        />
      </FieldRow>
      <FieldRow>
        <FormNumberField<FormState>
          name="minDelay"
          label={t["Min Delay"]}
          numType="decimal"
        />
        <FormNumberField<FormState>
          name="maxDelay"
          label={t["Max Delay"]}
          numType="decimal"
        />
      </FieldRow>
      <FormNumberField<FormState>
        name="filterItemCount"
        label={t["Elm Call Count"]}
        numType="decimal"
      />
    </FormSection>
  );
};

export const HgssElmCallSeedFinder = () => {
  const [allResults, setAllResults] = React.useState<ResultRow[]>([]);
  const [state, setState] = useAtom(gen4StateAtom);
  const [filterItemCount, setFilterItemCount] = React.useState(
    initialValues.filterItemCount,
  );

  const filteredResults = allResults.filter((result) =>
    matchesElmCallFilter(result.elmCalls, state.gameState.elmCalls),
  );

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    const results = await getSeedTime4WithMarkers({
      ...opts,
      includeCoinFlips: false,
      includeElmCalls: true,
    });
    setFilterItemCount(opts.filterItemCount);
    setAllResults(results);
  };

  return (
    <ToolForm<FormState, ResultRow>
      getColumns={getColumns}
      results={filteredResults}
      initialValues={initialValues}
      validationSchema={Validator}
      filters={
        <ElmCallFilterButtons
          hasResults={allResults.length > 0}
          maxElmCalls={filterItemCount}
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
    >
      <Fields />
    </ToolForm>
  );
};
