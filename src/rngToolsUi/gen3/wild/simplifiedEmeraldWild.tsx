import React from "react";
import { Flex } from "~/components";
import {
  FieldRow,
  FormMultiSelectField,
  FormNumberField,
  FormSection,
  FormSelectField,
  SwitchField,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { useField, useFormContext, useWatch_UNSAFE } from "~/hooks/form";
import { toOptions } from "~/utils/options";
import { formatActionName, formatLeadName, formatMapName } from "./utils";
import { Wild3Calib } from "./wild3Calib";
import {
  getSimplifiedChoices,
  getSimplifiedInitialValues,
  searchSimplifiedWild,
  simplifiedLeadKeys,
  simplifiedSearchSchema,
  simplifiedSpecies,
  type FormState,
  type SelectedWildSetup,
} from "./simplifiedWildSearch";

const Fields = ({ onInputsChange }: { onInputsChange: () => void }) => {
  const { setFieldValue } = useFormContext<FormState>();
  const values = useWatch_UNSAFE<FormState>();
  const species = values.species ?? "Abra";
  const [{ value: recommendedSetups }, , { setValue: setRecommendedSetups }] =
    useField<boolean>("recommendedSetups");
  const choices = getSimplifiedChoices(species);

  React.useEffect(() => {
    const choices = getSimplifiedChoices(species);
    setFieldValue("maps", choices.maps);
    setFieldValue("actions", choices.actions);
  }, [species, setFieldValue]);

  React.useEffect(() => {
    onInputsChange();
  }, [values, onInputsChange]);

  return (
    <FormSection>
      <FormSelectField<FormState, "species">
        name="species"
        label="Target Species"
        options={toOptions(simplifiedSpecies)}
      />
      <FieldRow>
        <FormNumberField<FormState> name="tid" label="TID" numType="decimal" />
        <FormNumberField<FormState> name="sid" label="SID" numType="decimal" />
      </FieldRow>
      <SwitchField
        label="Ignore Recommended Setups"
        value={!recommendedSetups}
        onChange={(ignore) => setRecommendedSetups(!ignore)}
      >
        <FormMultiSelectField<FormState, "maps">
          name="maps"
          label="Maps"
          options={toOptions(choices.maps, formatMapName)}
        />
        <FormMultiSelectField<FormState, "actions">
          name="actions"
          label="Actions"
          options={toOptions(choices.actions, formatActionName)}
        />
        <FormMultiSelectField<FormState, "leadKeys">
          name="leadKeys"
          label="Leads"
          options={toOptions(simplifiedLeadKeys, (lead) =>
            lead === "Synchronize" ? lead : formatLeadName(lead),
          )}
        />
      </SwitchField>
    </FormSection>
  );
};

export const SimplifiedEmeraldWild = () => {
  const [selected, setSelected] = React.useState<SelectedWildSetup | null>(
    null,
  );

  const clearSelection = React.useCallback(() => {
    setSelected(null);
  }, []);

  const onSubmit: ToolFormSubmit<FormState> = async (submitted) => {
    clearSelection();
    const result = await searchSimplifiedWild(submitted);
    setSelected(result);
  };

  return (
    <Flex vertical gap={32}>
      <ToolForm<FormState, never>
        initialValues={getSimplifiedInitialValues()}
        validationSchema={simplifiedSearchSchema}
        onSubmit={onSubmit}
        submitTrackerId="simplified_emerald_wild_search"
        submitButtonLabel="Find shiny setup"
      >
        <Fields onInputsChange={clearSelection} />
      </ToolForm>

      {selected != null && (
        <section>
          <h2>Catch and Calibrate</h2>
          <Wild3Calib
            key={JSON.stringify(selected.targetSetup)}
            targetSetup={selected.targetSetup}
            leadCycleSpeed={selected.leadCycleSpeed}
            battleVideoInfo={{
              targetPaintingAdvs: selected.targetSetup.targetPaintingAdvs,
              battleVideoAdvAfterPainting: 0,
              consoleType: null,
            }}
            clearAll={clearSelection}
            simplified
            summaryTitle="Setup"
          />
        </section>
      )}
    </Flex>
  );
};
