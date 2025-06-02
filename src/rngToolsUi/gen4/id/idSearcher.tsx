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
  FormikIdFilter,
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
import { FormikRadio } from "~/components/radio";
import { denormalizeIdFilterOrDefault, IdFilterSchema } from "~/types/id";
import { match, P } from "ts-pattern";

const idTypes = ["Cute Charm", "Any"] as const;
type IdType = (typeof idTypes)[number];
const defaultIdType: IdType = "Cute Charm";

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

const getColumns = ({ idType }: { idType: IdType }): ResultColumn<Result>[] => {
  const baseColumns: ResultColumn<Result>[] = [
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
  ];

  if (idType === "Any") {
    return baseColumns;
  }

  return [
    ...baseColumns,
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
};

const Validator = z.object({
  year: z.number().int().min(2000).max(2100),
  min_delay: z.number().int().min(0),
  max_delay: z.number().int().min(0),
  id_type: z.enum(idTypes),
  max_shiny_odds: z.boolean(),
  target_gender: z.enum(CuteCharmGenders),
  target_nature: z.enum(["None", ...nature]),
  target_species: z.enum(species),
  tid: z.number().int().min(0).max(65535).nullable(),
  id_filter: IdFilterSchema,
});

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  year: 2000,
  min_delay: 5000,
  max_delay: 5200,
  id_type: defaultIdType,
  max_shiny_odds: true,
  target_gender: "Female",
  target_nature: "None",
  target_species: "None",
  tid: null,
  id_filter: {
    type: "tid",
    value0: 0,
    value1: null,
  },
};

const getFields = ({
  idType,
  maxShinyOdds,
  setValues,
}: {
  idType: IdType;
  maxShinyOdds: boolean;
  setValues: (values: FormState) => void;
}): Field[] => {
  const baseFields = [
    {
      label: "Year",
      input: <FormikNumberInput<FormState> name="year" numType="decimal" />,
    },
    {
      label: "Min Delay",
      input: (
        <FormikNumberInput<FormState> name="min_delay" numType="decimal" />
      ),
    },
    {
      label: "Max Delay",
      input: (
        <FormikNumberInput<FormState> name="max_delay" numType="decimal" />
      ),
    },
    {
      label: "ID Type",
      input: (
        <FormikRadio<FormState, "id_type">
          name="id_type"
          options={toOptions(idTypes)}
        />
      ),
    },
  ];

  if (idType === "Any") {
    return [
      ...baseFields,
      {
        label: "Filter",
        input: <FormikIdFilter<FormState> name="id_filter" />,
      },
    ];
  }

  return [
    ...baseFields,
    {
      label: "Max Shiny Odds",
      input: (
        <FormikSwitch<FormState, "max_shiny_odds">
          name="max_shiny_odds"
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
        <FormikSelect<FormState, "target_gender">
          name="target_gender"
          options={toOptions(CuteCharmGenders)}
          disabled={maxShinyOdds}
        />
      ),
    },
    {
      label: "Target Nature",
      input: (
        <FormikSelect<FormState, "target_nature">
          name="target_nature"
          options={natureOptions.required}
          disabled={maxShinyOdds}
        />
      ),
    },
    {
      label: "Target Species",
      input: (
        <FormikSelect<FormState, "target_species">
          name="target_species"
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
};

const Id4SearcherFields = () => {
  const { values, setValues } = useFormikContext<FormState>();
  const maxShinyOdds = values.max_shiny_odds;
  const idType = values.id_type;
  const fields = React.useMemo(
    () =>
      getFields({
        idType,
        maxShinyOdds,
        setValues,
      }),
    [idType, maxShinyOdds, setValues],
  );
  return <FormFieldTable fields={fields} />;
};

export const Id4Searcher = () => {
  const [idType, setIdType] = React.useState<IdType>(defaultIdType);
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const interestedTsvs = opts.max_shiny_odds
      ? maxShinyOddsCuteCharmTsvs
      : getCuteCharmTsvs({
          targetGender: opts.target_gender,
          ratio: await rngTools.get_species_gender_ratio(opts.target_species),
          nature: opts.target_nature === "None" ? null : opts.target_nature,
        });

    const idFilter = match<FormState, IdFilter>(opts)
      .with({ id_type: "Cute Charm", tid: null }, () => ({
        Tsvs: interestedTsvs,
      }))
      .with({ id_type: "Cute Charm", tid: P.not(null) }, (matched) => ({
        TidTsvs: {
          tid: matched.tid,
          tsvs: interestedTsvs,
        },
      }))
      .with({ id_type: "Any" }, () =>
        denormalizeIdFilterOrDefault(opts.id_filter),
      )
      .exhaustive();

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
    setIdType(opts.id_type);
  }, []);

  const columns = React.useMemo(() => getColumns({ idType }), [idType]);

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
