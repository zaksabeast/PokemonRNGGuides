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
import { useBatchedTool } from "~/hooks/useBatchedTool";
import {
  rngTools,
  Id4,
  GenderRatio,
  Nature,
  IdFilter,
  Id4SearchOptions,
  multiWorkerRngTools,
} from "~/rngTools";
import { z } from "zod";
import { useId4State } from "./state";
import { useCurrentStep } from "~/components/stepper/state";
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
import { chunkRange } from "~/utils/chunkRange";
import { UndefinedToNull } from "~/types";

const idTypes = ["Cute Charm", "Any TID"] as const;
type IdType = (typeof idTypes)[number];
const defaultIdType: IdType = "Cute Charm";

const CuteCharmGenders = ["Male", "Female"] as const;
type CuteCharmGender = (typeof CuteCharmGenders)[number];

type SelectButtonProps = {
  target: Id4;
};

const SelectButton = ({ target }: SelectButtonProps) => {
  const [, setState] = useId4State();
  const [, setCurrentStep] = useCurrentStep();
  return (
    <Button
      trackerId="select_id4_target"
      onClick={() => {
        setState((state) => ({
          ...state,
          target,
        }));
        setCurrentStep((step) => step + 1);
      }}
    >
      Select
    </Button>
  );
};

type Result = Id4 & {
  seed: number;
  targetGender: CuteCharmGender;
  natures: Nature[];
  genderRatios: GenderRatio[];
  delay: number;
  seconds: number;
};

const formatGenderRatio = (genderRatio: GenderRatio) => {
  return match(genderRatio)
    .with("FemaleOnly", () => "0% Male")
    .with("MaleOnly", () => "100% Male")
    .with("Genderless", () => "Genderless")
    .with("OneToOne", () => "50% Male")
    .with("OneToSeven", () => "87.5% Male")
    .with("OneToThree", () => "75% Male")
    .with("ThreeToOne", () => "25% Male")
    .with("SevenToOne", () => "12.5% Male")
    .exhaustive();
};

const getColumns = ({ idType }: { idType: IdType }): ResultColumn<Result>[] => {
  const startColumns: ResultColumn<Result>[] = [
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
  ];
  const endColumns: ResultColumn<Result>[] = [
    {
      title: "Delay",
      dataIndex: "delay",
    },
    {
      title: "Seconds",
      dataIndex: "seconds",
    },
  ];

  if (idType === "Any TID") {
    return [...startColumns, ...endColumns];
  }

  return [
    ...startColumns,
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
        genderRatios.length === 0
          ? "All"
          : genderRatios.map(formatGenderRatio).join(", "),
    },
    ...endColumns,
  ];
};

const Validator = z.object({
  year: z.number().int().min(2000).max(2100),
  min_delay: z.number().int().min(5000),
  max_delay: z.number().int().min(5000),
  id_type: z.enum(idTypes),
  max_shiny_odds: z.boolean(),
  target_gender: z.enum(CuteCharmGenders),
  target_nature: z.enum(["None", ...nature]),
  target_species: z.enum(species),
  tid: z.number().int().min(0).max(65535).nullable(),
  force_second: z.number().int().min(0).max(59).nullable(),
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
  force_second: null,
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

  if (idType === "Any TID") {
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
        <FormikSwitch<FormState>
          name="max_shiny_odds"
          onChange={(checked: boolean) => {
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
          options={gen4SpeciesOptions.byNameOptional}
          disabled={maxShinyOdds}
        />
      ),
    },
    {
      label: "Optional TID",
      input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
    },
    {
      label: "Force Second",
      input: (
        <FormikNumberInput<FormState> name="force_second" numType="decimal" />
      ),
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

const mapResult = (res: Id4): Result => ({
  ...res,
  seed: res.seed_time.seed,
  delay: res.seed_time.delay,
  seconds: res.seed_time.datetime.second,
  ...getCuteCharmTsvProps(res.tsv),
});

export const Id4Searcher = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { run: searchDpptIds, data: results } = useBatchedTool(
    multiWorkerRngTools.search_dppt_ids,
    { map: mapResult },
  );

  const [idType, setIdType] = React.useState<IdType>(defaultIdType);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      try {
        const interestedTsvs = opts.max_shiny_odds
          ? maxShinyOddsCuteCharmTsvs
          : getCuteCharmTsvs({
              targetGender: opts.target_gender,
              ratio:
                opts.target_species === "None"
                  ? null
                  : await rngTools.get_species_gender_ratio(
                      opts.target_species,
                    ),
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
          .with({ id_type: "Any TID" }, () =>
            denormalizeIdFilterOrDefault(opts.id_filter),
          )
          .exhaustive();

        const chunked = chunkRange([opts.min_delay, opts.max_delay], 200);
        const searchOpts: UndefinedToNull<Id4SearchOptions>[] = chunked.map(
          ([min_delay, max_delay]) => ({
            year: opts.year,
            min_delay,
            max_delay,
            filter: idFilter,
            force_second: opts.force_second,
          }),
        );
        await searchDpptIds(searchOpts);

        setIdType(opts.id_type);
      } catch (error) {
        messageApi.error(
          `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    },
    [searchDpptIds, messageApi],
  );

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
      {contextHolder}
      <Id4SearcherFields />
    </RngToolForm>
  );
};
