import React from "react";
import { message } from "antd";
import {
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
  Button,
  FormikSelect,
  FormikSwitch,
  FormFieldTable,
} from "~/components";
import { rngTools, Id4, GenderRatio, Nature, IdFilter } from "~/rngTools";
import { z } from "zod";
import { useId4State } from "./state";
import { useCurrentStep } from "~/components/stepper/state";
import { range } from "lodash-es";
import pMap from "p-map";
import { useFormikContext } from "formik";
import { nature } from "~/types/nature";
import { gen4SpeciesOptions, species } from "~/types/species";
import { natureOptions } from "~/components/pkmFilter";
import { toOptions } from "~/utils/options";
import {
  getCuteCharmTsvProps,
  getCuteCharmTsvs,
  maxShinyOddsCuteCharmTsvs,
} from "./tsvs";

const CuteCharmGenders = ["Male", "Female"] as const;
type CuteCharmGender = (typeof CuteCharmGenders)[number];

type SelectButtonProps = {
  target: Id4;
};

const SelectButton = ({ target }: SelectButtonProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { values } = useFormikContext<FormState>();
  const [, setState] = useId4State();
  const [, setCurrentStep] = useCurrentStep();
  return (
    <>
      {contextHolder}
      <Button
        trackerId="select_id4_target"
        onClick={async () => {
          const months = range(1, 12);
          const dates = (
            await pMap(
              months,
              async (month) => {
                return await rngTools.dppt_calculate_seedtime({
                  seed: target.seed,
                  forced_second: null,
                  year: values.year,
                  month,
                });
              },
              { concurrency: 12 },
            )
          ).flat();

          if (dates.length === 0) {
            messageApi.error(
              "No valid dates found for this target.  Report this as a bug!",
            );
            return;
          }

          setState((state) => ({
            ...state,
            target: { id: target, dateTime: dates[0] },
          }));
          setCurrentStep((step) => step + 1);
        }}
      >
        Select
      </Button>
    </>
  );
};

type Result = Id4 & {
  targetGender: CuteCharmGender;
  natures: Nature[];
  genderRatios: GenderRatio[];
};

const columns: ResultColumn<Result>[] = [
  {
    title: "Select",
    dataIndex: "seed",
    render: (_, target) => <SelectButton target={target} />,
  },
  {
    title: "TID",
    dataIndex: "tid",
  },
  {
    title: "SID",
    dataIndex: "sid",
  },
  {
    title: "TSV",
    dataIndex: "tsv",
  },
  {
    title: "Delay",
    dataIndex: "delay",
  },
  {
    title: "Target Gender",
    dataIndex: "targetGender",
  },
  {
    title: "Natures",
    dataIndex: "natures",
    render: (natures) => natures.join(", "),
  },
  {
    title: "Gender Ratios",
    dataIndex: "genderRatios",
    render: (genderRatios) =>
      genderRatios.length === 0 ? "All" : genderRatios.join(", "),
  },
];

const Validator = z.object({
  year: z.number().int().min(2000).max(2100),
  min_delay: z.number().int().min(0),
  max_delay: z.number().int().min(0),
  maxShinyOdds: z.boolean(),
  targetGender: z.enum(CuteCharmGenders),
  targetNature: z.enum(["None", ...nature]),
  targetSpecies: z.enum(species),
  tid: z.number().int().min(0).max(65535).nullable(),
});

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  year: 2000,
  min_delay: 5000,
  max_delay: 5200,
  maxShinyOdds: true,
  targetGender: "Female",
  targetNature: "None",
  targetSpecies: "None",
  tid: null,
};

const getFields = ({
  maxShinyOdds,
  setValues,
}: {
  maxShinyOdds: boolean;
  setValues: (values: FormState) => void;
}): Field[] => [
  {
    label: "Year",
    input: <FormikNumberInput<FormState> name="year" numType="decimal" />,
  },
  {
    label: "Min Delay",
    input: <FormikNumberInput<FormState> name="min_delay" numType="decimal" />,
  },
  {
    label: "Max Delay",
    input: <FormikNumberInput<FormState> name="max_delay" numType="decimal" />,
  },
  {
    label: "Max Shiny Odds",
    input: (
      <FormikSwitch<FormState, "maxShinyOdds">
        name="maxShinyOdds"
        onChange={(checked) => {
          if (checked) {
            setValues(initialValues);
          }
        }}
      />
    ),
  },
  {
    label: "Target Gender",
    input: (
      <FormikSelect<FormState, "targetGender">
        name="targetGender"
        options={toOptions(CuteCharmGenders)}
        disabled={maxShinyOdds}
      />
    ),
  },
  {
    label: "Target Nature",
    input: (
      <FormikSelect<FormState, "targetNature">
        name="targetNature"
        options={natureOptions.required}
        disabled={maxShinyOdds}
      />
    ),
  },
  {
    label: "Target Species",
    input: (
      <FormikSelect<FormState, "targetSpecies">
        name="targetSpecies"
        options={gen4SpeciesOptions.byName}
        disabled={maxShinyOdds}
      />
    ),
  },
  {
    label: "Optional TID",
    input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
  },
];

const Id4SearcherFields = () => {
  const { values, setValues } = useFormikContext<FormState>();
  const maxShinyOdds = values.maxShinyOdds;
  const fields = React.useMemo(
    () =>
      getFields({
        maxShinyOdds,
        setValues,
      }),
    [maxShinyOdds, setValues],
  );
  return <FormFieldTable fields={fields} />;
};

export const Id4Searcher = () => {
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const interestedTsvs = opts.maxShinyOdds
      ? maxShinyOddsCuteCharmTsvs
      : getCuteCharmTsvs({
          targetGender: opts.targetGender,
          ratio: await rngTools.get_species_gender_ratio(opts.targetSpecies),
          nature: opts.targetNature === "None" ? null : opts.targetNature,
        });

    const idFilter: IdFilter =
      opts.tid == null
        ? {
            Tsvs: interestedTsvs,
          }
        : {
            TidTsvs: {
              tid: opts.tid,
              tsvs: interestedTsvs,
            },
          };

    const idResults = await rngTools.search_dppt_ids({
      ...opts,
      filter: idFilter,
    });

    const formattedResults = idResults.map(
      (res): Result => ({
        ...res,
        ...getCuteCharmTsvProps(res.tsv),
      }),
    );

    setResults(formattedResults);
  }, []);

  return (
    <RngToolForm<FormState, Result>
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="search_dppt_id"
    >
      <Id4SearcherFields />
    </RngToolForm>
  );
};
