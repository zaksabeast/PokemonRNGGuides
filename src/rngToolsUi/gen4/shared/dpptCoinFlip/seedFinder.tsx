import React from "react";
import { type SeedTime4 } from "~/rngTools";
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
import { matchesCoinFlipFilter, SmallCoinFlip } from "./utils";
import { CoinFlipFilterButtons } from "./coinFlipButtons";
import { rngDate, RngDateSchema, rngTime, RngTimeSchema } from "~/utils/time";
import { gen4StateAtom } from "../state";
import { useAtom } from "jotai";
import { useCurrentStep } from "~/components/stepper/state";
import { Translations } from "~/translations";
import { getSeedTime4WithMarkers } from "../getFindableSeeds";

type ResultRow = {
  id: string;
  seed: number;
  seedTime: SeedTime4;
  coinFlips: SmallCoinFlip[];
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
  const [state, setState] = useAtom(gen4StateAtom);

  const [, setCurrentStep] = useCurrentStep();

  return (
    <Button
      trackerId="coin_flip_select_seed"
      onClick={() => {
        setState({
          target: {
            seedTime,
            lcrngAdvance: null,
            mtAdvance: null,
            coinFlipCount: state.gameState.coinFlips.length,
          },
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
    title: t["Coin Flips"],
    dataIndex: "coinFlips",
    render: (coinFlips: SmallCoinFlip[]) => coinFlips.join(", "),
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
        label={t["Coin Flip Count"]}
        numType="decimal"
      />
    </FormSection>
  );
};

export const DpptCoinFlipSeedFinder = () => {
  const [allResults, setAllResults] = React.useState<ResultRow[]>([]);
  const [state, setState] = useAtom(gen4StateAtom);
  const [filterItemCount, setFilterItemCount] = React.useState(
    initialValues.filterItemCount,
  );

  const filteredResults = allResults.filter((result) =>
    matchesCoinFlipFilter(result.coinFlips, state.gameState.coinFlips),
  );

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    const results = await getSeedTime4WithMarkers({
      ...opts,
      includeCoinFlips: true,
      includeElmCalls: false,
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
        <CoinFlipFilterButtons
          hasResults={allResults.length > 0}
          maxCoinFlips={filterItemCount}
          coinFlipFilter={state.gameState.coinFlips}
          onCoinFlipFilterChange={(coinFlips) =>
            setState({ gameState: { coinFlips } })
          }
          headsTrackerId="hit_seed_add_heads"
          tailsTrackerId="hit_seed_add_tails"
        />
      }
      onSubmit={onSubmit}
      rowKey="id"
      submitTrackerId="coin_flip_seed_search"
    >
      <Fields />
    </ToolForm>
  );
};
