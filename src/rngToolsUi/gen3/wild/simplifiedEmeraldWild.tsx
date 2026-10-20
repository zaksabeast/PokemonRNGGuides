import React from "react";
import {
  Card,
  Flex,
  FormFieldTable,
  FormikNumberInput,
  FormikSelect,
  RngToolForm,
  Switch,
  type RngToolSubmit,
} from "~/components";
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
    <FormFieldTable
      fields={[
        {
          label: "Target Species",
          input: (
            <FormikSelect<FormState, "species">
              name="species"
              options={toOptions(simplifiedSpecies)}
            />
          ),
        },
        {
          label: "TID",
          input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
        },
        {
          label: "SID",
          input: <FormikNumberInput<FormState> name="sid" numType="decimal" />,
        },
        {
          label: "Ignore Recommended Setups",
          input: (
            <Switch
              value={!recommendedSetups}
              onChange={(ignore) => setRecommendedSetups(!ignore)}
            />
          ),
        },
        {
          label: "Maps",
          show: !recommendedSetups,
          indent: 1,
          input: (
            <FormikSelect<FormState, "maps">
              name="maps"
              mode="multiple"
              options={toOptions(choices.maps, formatMapName)}
            />
          ),
        },
        {
          label: "Actions",
          show: !recommendedSetups,
          indent: 1,
          input: (
            <FormikSelect<FormState, "actions">
              name="actions"
              mode="multiple"
              options={toOptions(choices.actions, formatActionName)}
            />
          ),
        },
        {
          label: "Leads",
          show: !recommendedSetups,
          indent: 1,
          input: (
            <FormikSelect<FormState, "leadKeys">
              name="leadKeys"
              mode="multiple"
              options={toOptions(simplifiedLeadKeys, (lead) =>
                lead === "Synchronize" ? lead : formatLeadName(lead),
              )}
            />
          ),
        },
      ]}
    />
  );
};

export const SimplifiedEmeraldWild = () => {
  const [selected, setSelected] = React.useState<SelectedWildSetup | null>(
    null,
  );

  const clearSelection = React.useCallback(() => {
    setSelected(null);
  }, []);

  const onSubmit: RngToolSubmit<FormState> = async (submitted) => {
    clearSelection();
    const result = await searchSimplifiedWild(submitted);
    setSelected(result);
  };

  return (
    <Flex vertical gap={32}>
      <Card>
        <RngToolForm<FormState, never>
          initialValues={getSimplifiedInitialValues()}
          validationSchema={simplifiedSearchSchema}
          onSubmit={onSubmit}
          submitTrackerId="simplified_emerald_wild_search"
          submitButtonLabel="Find shiny setup"
        >
          <Fields onInputsChange={clearSelection} />
        </RngToolForm>
      </Card>

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
