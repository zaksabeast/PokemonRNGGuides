import React from "react";
import { uniqueId } from "lodash-es";
import { useAtom, useSetAtom } from "jotai";
import {
  FieldRow,
  FormNumberField,
  FormSection,
  FormSelectField,
  FormSwitchField,
  IvFields,
  PkmFilter,
  SwitchGroup,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { Button, Divider, ResultColumn, ShinyIcon } from "~/components";
import {
  AbilityType,
  Gen7Egg,
  Gen7EggResult,
  Gen7EggSearchOpts,
  multiWorkerRngTools,
  type ShinyType,
} from "~/rngTools";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import { useFormContext, useWatch } from "~/hooks/form";
import { useCurrentStep } from "~/components/stepper/state";
import {
  FlattenIvs,
  flattenIvs,
  getIvColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { formatHex } from "~/utils/formatHex";
import { toOptions } from "~/utils/options";
import { nature } from "~/types/nature";
import { RustOption } from "~/types/utils";
import { Translations } from "~/translations";
import {
  Gen7EggFormState,
  Gen7EggValidator,
  gen7EggInitialValues,
  getGen7EggGenderOptions,
  formatGen7EggAbility,
  getGen7EggAbilityOptions,
  getGen7EggItemOptions,
  toGen7EggSearchOpts,
} from "./eggForm";
import {
  Gen7EggTarget,
  fetchGen7EggPathAtom,
  gen7EggSeedsAfterTargetAtom,
  gen7EggTargetAtom,
} from "./eggState";

const MAX_RESULTS = 10_000;
const ACCEPT_AND_REJECT_STEP = 1;

type FormState = Gen7EggFormState;

type ParentFieldsProps = {
  parent: "male" | "female";
  title: string;
  description: string;
};

const ParentFields = ({ parent, title, description }: ParentFieldsProps) => {
  const t = useActiveRouteTranslations();
  const items = useWatch({
    names: { male_item: true, female_item: true },
    validationSchema: Gen7EggValidator,
  });

  const item = items[`${parent}_item`];

  return (
    <FormSection title={title} description={description}>
      <SwitchGroup>
        <FormSwitchField<FormState>
          name={`${parent}_is_ditto`}
          label={t["Ditto"]}
          supportingText={t["Turn on if this parent is a Ditto"]}
        />
      </SwitchGroup>
      <IvFields<FormState> name={`${parent}_ivs`} title={t["IVs"]} />
      <FieldRow>
        <FormSelectField<FormState>
          name={`${parent}_item`}
          label={t["Held Item"]}
          options={getGen7EggItemOptions(t)}
        />
        <FormSelectField<FormState>
          name={`${parent}_ability`}
          label={t["Ability"]}
          options={getGen7EggAbilityOptions(t)}
          tooltip={{
            title: t["Ability"],
            description:
              t[
                "Ability 1 and 2 follow the order the species' abilities are listed in. If the species only has one ability, either works."
              ],
          }}
        />
      </FieldRow>
      <FormSelectField<FormState>
        name={`${parent}_nature`}
        label={t["Nature"]}
        disabled={item !== "Everstone"}
        options={toOptions(nature)}
        tooltip={{
          title: t["Nature"],
          description: t["Only needed when this parent holds an Everstone."],
        }}
      />
    </FormSection>
  );
};

const EggSeedFields = () => {
  const t = useActiveRouteTranslations();
  const { setFieldValue } = useFormContext<FormState>();
  const [seedsAfterTarget, setSeedsAfterTarget] = useAtom(
    gen7EggSeedsAfterTargetAtom,
  );

  React.useEffect(() => {
    if (seedsAfterTarget == null) {
      return;
    }

    const [seed_0, seed_1, seed_2, seed_3] = seedsAfterTarget;
    const options = { shouldValidate: true };
    setFieldValue("seed_0", seed_0, options);
    setFieldValue("seed_1", seed_1, options);
    setFieldValue("seed_2", seed_2, options);
    setFieldValue("seed_3", seed_3, options);
    setSeedsAfterTarget(null);
  }, [seedsAfterTarget, setFieldValue, setSeedsAfterTarget]);

  return (
    <FormSection
      title={t["Egg Seeds"]}
      description={
        t[
          "Enter all four in the order PokeReader or your seed finder shows them."
        ]
      }
    >
      <FieldRow>
        <FormNumberField<FormState> name="seed_3" label="[3]" numType="hex" />
        <FormNumberField<FormState> name="seed_2" label="[2]" numType="hex" />
      </FieldRow>
      <FieldRow>
        <FormNumberField<FormState> name="seed_1" label="[1]" numType="hex" />
        <FormNumberField<FormState> name="seed_0" label="[0]" numType="hex" />
      </FieldRow>
    </FormSection>
  );
};

const Fields = () => {
  const t = useActiveRouteTranslations();
  const { male_is_ditto, female_is_ditto } = useWatch({
    names: { male_is_ditto: true, female_is_ditto: true },
    validationSchema: Gen7EggValidator,
  });

  return (
    <>
      <EggSeedFields />

      <FormSection title={t["Your game"]}>
        <FieldRow>
          <FormNumberField<FormState>
            name="tsv"
            label={t["TSV"]}
            numType="decimal"
            tooltip={{
              title: t["TSV"],
              description:
                t[
                  "Your Trainer Shiny Value. Eggs with a matching PSV hatch shiny."
                ],
            }}
          />
          <FormNumberField<FormState>
            name="trv"
            label={t["TRV"]}
            numType="hex"
          />
        </FieldRow>
        <FormNumberField<FormState>
          name="max_advance"
          label={t["Max Advances"]}
          numType="decimal"
          tooltip={{
            title: t["Max Advances"],
            description:
              t[
                "How far ahead to search. Higher values find more eggs, but they can take more accepts and rejects to reach."
              ],
          }}
        />
        <SwitchGroup>
          <FormSwitchField<FormState>
            name="masuda_method"
            label={t["Masuda Method"]}
            supportingText={
              t["The parents are from games in different languages"]
            }
          />
          <FormSwitchField<FormState>
            name="shiny_charm"
            label={t["Shiny Charm"]}
            supportingText={t["You have the Shiny Charm"]}
          />
        </SwitchGroup>
      </FormSection>

      <FormSection title={t["Egg"]}>
        <FormSelectField<FormState>
          name="gender"
          label={t["Gender Ratio"]}
          options={getGen7EggGenderOptions(t)}
          tooltip={{
            title: t["Gender Ratio"],
            description:
              t[
                "The gender ratio of the Pokemon that hatches, listed in its Pokedex entry."
              ],
          }}
        />
        <SwitchGroup>
          <FormSwitchField<FormState>
            name="same_species"
            label={t["Same Species"]}
            supportingText={t["Both parents are the same species"]}
            disabled={male_is_ditto === true || female_is_ditto === true}
          />
        </SwitchGroup>
      </FormSection>

      <Divider m={0} />
      <ParentFields
        parent="male"
        title={t["Male Parent"]}
        description={t["The male Pokemon at the Nursery, or Ditto."]}
      />
      <Divider m={0} />
      <ParentFields
        parent="female"
        title={t["Female Parent"]}
        description={t["The female Pokemon at the Nursery, or Ditto."]}
      />
      <Divider m={0} />

      <FormSection
        title={t["Filters"]}
        description={
          t[
            "Only show eggs that match these. Leave them as they are to see every egg."
          ]
        }
      >
        <PkmFilter<FormState> generation={7} displayHiddenAbility />
      </FormSection>
    </>
  );
};

type EggRow = FlattenIvs<Gen7Egg> & {
  key: string;
  fewest_actions_to_reach: number;
  egg: Gen7Egg;
};

const toEggRow = ({ egg, fewest_actions_to_reach }: Gen7EggResult): EggRow => ({
  ...flattenIvs(egg),
  key: uniqueId(),
  fewest_actions_to_reach,
  egg,
});

type EggColumnsOpts = {
  selectedEgg: Gen7Egg | null;
  onSelect: (row: EggRow) => void;
};

const getEggColumns = (
  t: Translations,
  { selectedEgg, onSelect }: EggColumnsOpts,
): ResultColumn<EggRow>[] => [
  {
    title: t["Select"],
    dataIndex: "key",
    disableVerticalPadding: true,
    render: (_, row) => (
      <Button
        trackerId="gen7_select_usum_egg"
        type={row.egg === selectedEgg ? "primary" : "default"}
        onClick={() => onSelect(row)}
      >
        {t["Select"]}
      </Button>
    ),
  },
  { title: t["Advance"], dataIndex: "advance" },
  { title: t["Accepts + Rejects"], dataIndex: "fewest_actions_to_reach" },
  {
    title: t["Shiny"],
    dataIndex: "shiny",
    render: (shiny: ShinyType) => <ShinyIcon shiny={shiny} />,
  },
  { title: t["Nature"], dataIndex: "nature" },
  {
    title: t["Ability"],
    dataIndex: "ability",
    render: (ability: AbilityType) => formatGen7EggAbility(t, ability),
  },
  { title: t["Gender"], dataIndex: "gender" },
  ...getIvColumns(t),
  { title: t["PSV"], dataIndex: "psv" },
  {
    title: t["PID"],
    dataIndex: "pid",
    monospace: true,
    render: (pid: number) => formatHex(pid),
  },
  {
    title: t["EC"],
    dataIndex: "ec",
    monospace: true,
    render: (ec: number) => formatHex(ec),
  },
];

export const Gen7EggSearch = () => {
  const t = useActiveRouteTranslations();
  const [, setCurrentStep] = useCurrentStep();

  const [target, setTarget] = useAtom(gen7EggTargetAtom);
  const fetchPath = useSetAtom(fetchGen7EggPathAtom);

  const [submittedOpts, setSubmittedOpts] =
    React.useState<RustOption<Gen7EggSearchOpts> | null>(null);

  const {
    run: searchEggs,
    data: rows,
    progressPercent,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.gen7_search_eggs, {
    map: toEggRow,
    sortBy: (row) => row.advance,
    limit: MAX_RESULTS,
  });

  const onSelect = async (row: EggRow) => {
    if (submittedOpts == null) {
      return;
    }

    const newTarget: Gen7EggTarget = { opts: submittedOpts, egg: row.egg };

    setTarget(newTarget);
    setCurrentStep(ACCEPT_AND_REJECT_STEP);
    await fetchPath(newTarget);
  };

  const onSubmit: ToolFormSubmit<FormState> = async (values) => {
    const opts = toGen7EggSearchOpts(values);

    setSubmittedOpts(opts);
    setTarget(null);

    // The path needs every egg from advance 0, so this is one chunk.
    await searchEggs([opts]);
  };

  return (
    <ToolForm<FormState, EggRow>
      initialValues={gen7EggInitialValues}
      validationSchema={Gen7EggValidator}
      onSubmit={onSubmit}
      columns={getEggColumns(t, {
        selectedEgg: target?.egg ?? null,
        onSelect,
      })}
      results={rows}
      rowKey="key"
      submitTrackerId="gen7_search_usum_eggs"
      allowCancel
      cancelTrackerId="gen7_cancel_search_usum_eggs"
      onCancel={cancel}
      progressPercent={progressPercent}
    >
      <Fields />
    </ToolForm>
  );
};
