import React from "react";
import { uniqueId } from "lodash-es";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
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
import { Button, ResultColumn } from "~/components";
import {
  AbilityType,
  Gen7Egg,
  Gen7EggResult,
  multiWorkerRngTools,
} from "~/rngTools";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import { useWatch } from "~/hooks/form";
import { useCurrentStep } from "~/components/stepper/state";
import {
  FlattenIvs,
  flattenIvs,
  getIvColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { formatHex } from "~/utils/formatHex";
import { toOptions } from "~/utils/options";
import { nature } from "~/types/nature";
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
  gen7EggFormValuesAtom,
  gen7EggTargetAtom,
} from "./eggState";

const MAX_RESULTS = 10_000;
const ACCEPT_AND_REJECT_STEP = 1;

type FormState = Gen7EggFormState;

type ParentFieldsProps = {
  prefix: "male" | "female";
  title: string;
};

const ParentFields = ({ prefix, title }: ParentFieldsProps) => {
  const t = useActiveRouteTranslations();
  const items = useWatch({
    names: { male_item: true, female_item: true },
    validationSchema: Gen7EggValidator,
  });
  const item = items[`${prefix}_item`];

  return (
    <FormSection title={title}>
      <SwitchGroup>
        <FormSwitchField<FormState>
          name={`${prefix}_ditto`}
          label={t["Ditto"]}
          supportingText={t["Turn on if this parent is a Ditto"]}
        />
      </SwitchGroup>
      <IvFields<FormState> name={`${prefix}_ivs`} title={t["IVs"]} />
      <FieldRow>
        <FormSelectField<FormState>
          name={`${prefix}_item`}
          label={t["Held Item"]}
          options={getGen7EggItemOptions(t)}
        />
        <FormSelectField<FormState>
          name={`${prefix}_ability`}
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
      <FieldRow>
        <FormSelectField<FormState>
          name={`${prefix}_nature`}
          label={t["Nature"]}
          disabled={item !== "Everstone"}
          options={toOptions(nature)}
          tooltip={{
            title: t["Nature"],
            description: t["Only needed when this parent holds an Everstone."],
          }}
        />
      </FieldRow>
    </FormSection>
  );
};

const Fields = () => {
  const t = useActiveRouteTranslations();
  const { male_ditto, female_ditto } = useWatch({
    names: { male_ditto: true, female_ditto: true },
    validationSchema: Gen7EggValidator,
  });

  return (
    <>
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
            name="max_advances"
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
        </FieldRow>
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
            disabled={male_ditto === true || female_ditto === true}
          />
        </SwitchGroup>
      </FormSection>

      <ParentFields prefix="male" title={t["Male Parent"]} />
      <ParentFields prefix="female" title={t["Female Parent"]} />

      <FormSection title={t["Filters"]}>
        <PkmFilter<FormState> displayHiddenAbility />
      </FormSection>
    </>
  );
};

type EggResult = FlattenIvs<Gen7Egg> & {
  key: string;
  actions: number;
  egg: Gen7Egg;
};

const mapEggResult = ({ egg, actions }: Gen7EggResult): EggResult => ({
  ...flattenIvs(egg),
  key: uniqueId(),
  actions,
  egg,
});

type EggColumnsOpts = {
  selectedEgg: Gen7Egg | null;
  onSelect: (result: EggResult) => void;
};

const getEggColumns = (
  t: Translations,
  { selectedEgg, onSelect }: EggColumnsOpts,
): ResultColumn<EggResult>[] => [
  {
    title: t["Select"],
    dataIndex: "key",
    disableVerticalPadding: true,
    render: (_, result) => (
      <Button
        trackerId="gen7_select_usum_egg"
        type={result.egg === selectedEgg ? "primary" : "default"}
        onClick={() => onSelect(result)}
      >
        {t["Select"]}
      </Button>
    ),
  },
  { title: t["Advance"], dataIndex: "advance" },
  { title: t["Accepts + Rejects"], dataIndex: "actions" },
  {
    title: t["Shiny"],
    dataIndex: "shiny",
    render: (shiny: boolean) => (shiny ? t["Yes"] : t["No"]),
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
  const [target, setTarget] = useAtom(gen7EggTargetAtom);
  const formValues = useAtomValue(gen7EggFormValuesAtom);
  const fetchPath = useSetAtom(fetchGen7EggPathAtom);
  const [, setCurrentStep] = useCurrentStep();
  const [submitted, setSubmitted] = React.useState<FormState | null>(null);
  const {
    run: searchEggs,
    data: results,
    progressPercent,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.gen7_search_eggs, {
    map: mapEggResult,
    sortBy: (result) => result.advance,
    limit: MAX_RESULTS,
  });

  const onSelect = async (result: EggResult) => {
    if (submitted == null) {
      return;
    }
    const newTarget: Gen7EggTarget = {
      opts: toGen7EggSearchOpts(submitted),
      formValues: submitted,
      egg: result.egg,
    };
    setTarget(newTarget);
    setCurrentStep(ACCEPT_AND_REJECT_STEP);
    await fetchPath(newTarget);
  };

  const onSubmit: ToolFormSubmit<FormState> = async (values) => {
    setSubmitted(values);
    setTarget(null);
    // The path needs every egg from advance 0, so this is one chunk.
    await searchEggs([toGen7EggSearchOpts(values)]);
  };

  return (
    <ToolForm<FormState, EggResult>
      initialValues={gen7EggInitialValues}
      values={formValues ?? undefined}
      validationSchema={Gen7EggValidator}
      onSubmit={onSubmit}
      columns={getEggColumns(t, {
        selectedEgg: target?.egg ?? null,
        onSelect,
      })}
      results={results}
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
