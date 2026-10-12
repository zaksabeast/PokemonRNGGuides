import React from "react";
import { message } from "antd";
import { ResultColumn, Button } from "~/components";
import {
  FieldRow,
  FormNumberField,
  FormRadioField,
  FormSection,
  FormSelectField,
  FormSwitchField,
  getNatureOptions,
  IdFilterField,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
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
import { id4Atom } from "./state";
import { gen4StateAtom } from "../shared/state";
import { useCurrentStep } from "~/components/stepper/state";
import { useFormContext, useWatch } from "~/hooks/form";
import { nature } from "~/types/nature";
import { getGen4SpeciesOptions, species } from "~/types/species";
import { toOptions } from "~/utils/options";
import {
  getCuteCharmTsvProps,
  getCuteCharmTsvs,
  maxShinyOddsCuteCharmTsvs,
} from "./tsvs";
import { denormalizeIdFilterOrDefault, IdFilterSchema } from "~/types/id";
import { match, P } from "ts-pattern";
import { chunkRange } from "~/utils/chunkRange";
import { RustOption } from "~/types";
import { Translations } from "~/translations";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useAtom } from "jotai";
import { getGameDateTime } from "./utils";
import { toRngDateTime } from "~/utils/time";

const idTypes = ["Cute Charm", "Any TID"] as const;
type IdType = (typeof idTypes)[number];
const defaultIdType: IdType = "Cute Charm";

const CuteCharmGenders = ["Male", "Female"] as const;
type CuteCharmGender = (typeof CuteCharmGenders)[number];

type SelectButtonProps = {
  target: Id4;
};

const SelectButton = ({ target }: SelectButtonProps) => {
  const [state, setState] = useAtom(gen4StateAtom);
  const [, setId4State] = useAtom(id4Atom);
  const [, setCurrentStep] = useCurrentStep();

  const adjustedDateTime = getGameDateTime({
    seedTime: target.seed_time,
    game: state.config.game,
  });

  return (
    <Button
      trackerId="select_id4_target"
      onClick={() => {
        if (adjustedDateTime == null) {
          return;
        }
        setState({
          target: {
            seedTime: {
              ...target.seed_time,
              datetime: toRngDateTime(adjustedDateTime),
            },
          },
        });
        setId4State({ id: target });
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

const getColumns = ({
  t,
  idType,
}: {
  t: Translations;
  idType: IdType;
}): ResultColumn<Result>[] => {
  const startColumns: ResultColumn<Result>[] = [
    {
      title: t["Select"],
      dataIndex: "seed",
      disableVerticalPadding: true,
      render: (_, target) => <SelectButton target={target} />,
    },
    {
      title: t["TID"],
      dataIndex: "tid",
    },
    {
      title: t["SID"],
      dataIndex: "sid",
    },
  ];
  const endColumns: ResultColumn<Result>[] = [
    {
      title: t["TSV"],
      dataIndex: "tsv",
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

  if (idType === "Any TID") {
    return [...startColumns, ...endColumns];
  }

  return [
    ...startColumns,
    {
      title: t["Gender Ratios"],
      dataIndex: "genderRatios",
      render: (genderRatios) =>
        genderRatios.length === 0
          ? "All"
          : genderRatios.map(formatGenderRatio).join(", "),
    },
    {
      title: t["Target Gender"],
      dataIndex: "targetGender",
    },
    {
      title: t["Natures"],
      dataIndex: "natures",
      render: (natures) => natures.join(", "),
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

export type FormState = z.infer<typeof Validator>;

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

const Id4SearcherFields = () => {
  const t = useActiveRouteTranslations();
  const { reset } = useFormContext<FormState>();
  const { max_shiny_odds, id_type } = useWatch({
    validationSchema: Validator,
    names: { max_shiny_odds: true, id_type: true },
  });
  const idType = id_type ?? initialValues.id_type;
  const maxShinyOdds = max_shiny_odds ?? initialValues.max_shiny_odds;

  return (
    <>
      <FormSection title={t["Search"]}>
        <FormNumberField<FormState>
          name="year"
          label={t["Year"]}
          numType="decimal"
        />
        <FieldRow>
          <FormNumberField<FormState>
            name="min_delay"
            label={t["Min Delay"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="max_delay"
            label={t["Max Delay"]}
            numType="decimal"
          />
        </FieldRow>
        <FormRadioField<FormState>
          name="id_type"
          label={t["ID Type"]}
          cellSize="word"
          options={toOptions(idTypes)}
        />
      </FormSection>

      {idType === "Any TID" ? (
        <FormSection title={t["Filters"]}>
          <IdFilterField<FormState> name="id_filter" />
        </FormSection>
      ) : (
        <>
          <FormSection title={t["Filters"]}>
            <FormSwitchField<FormState>
              name="max_shiny_odds"
              label={t["Max Shiny Odds"]}
              onChange={(checked) => {
                if (checked) {
                  reset();
                }
              }}
            />
            <FormRadioField<FormState>
              name="target_gender"
              label={t["Target Gender"]}
              cellSize="word"
              options={toOptions(CuteCharmGenders, (gender) => t[gender])}
              disabled={maxShinyOdds}
            />
            <FormSelectField<FormState>
              name="target_nature"
              label={t["Target Nature"]}
              options={[
                { value: "None", label: t["None"] },
                ...getNatureOptions(t),
              ]}
              disabled={maxShinyOdds}
            />
            <FormSelectField<FormState>
              name="target_species"
              label={t["Target Species"]}
              options={getGen4SpeciesOptions().byNameOptional}
              disabled={maxShinyOdds}
            />
            <FormNumberField<FormState>
              name="tid"
              label={t["Optional TID"]}
              numType="decimal"
            />
          </FormSection>

          <FormSection title={t["Advanced"]}>
            <FormNumberField<FormState>
              name="force_second"
              label={t["Force Second"]}
              numType="decimal"
            />
          </FormSection>
        </>
      )}
    </>
  );
};

const mapResult = (res: Id4): Result => ({
  ...res,
  seed: res.seed_time.seed,
  delay: res.seed_time.delay,
  seconds: res.seed_time.datetime.second,
  ...getCuteCharmTsvProps(res.tsv),
});

export const Id4Searcher = () => {
  const t = useActiveRouteTranslations();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    run: searchDpptIds,
    data: results,
    progressPercent,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.search_dppt_ids, { map: mapResult });

  const [idType, setIdType] = React.useState<IdType>(defaultIdType);

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    try {
      const interestedTsvs = opts.max_shiny_odds
        ? maxShinyOddsCuteCharmTsvs
        : getCuteCharmTsvs({
            targetGender: opts.target_gender,
            ratio:
              opts.target_species === "None"
                ? null
                : await rngTools.get_species_gender_ratio(opts.target_species),
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
      const searchOpts: RustOption<Id4SearchOptions>[] = chunked.map(
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
  };

  const columns = getColumns({ t, idType });

  return (
    <ToolForm<FormState, Result>
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="search_dppt_id"
      allowCancel
      cancelTrackerId="cancel_dppt_id"
      onCancel={cancel}
      progressPercent={progressPercent}
    >
      {contextHolder}
      <Id4SearcherFields />
    </ToolForm>
  );
};
