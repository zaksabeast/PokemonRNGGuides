import React from "react";
import { Alert } from "antd";
import { Flex } from "~/components";
import {
  ToolForm,
  FormSection,
  SelectField,
  MultiSelectField,
  SwitchField,
  NumberField,
  FieldRow,
} from "~/components/form";
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

export const SimplifiedEmeraldWild = () => {
  const [values, setValues] = React.useState<FormState>(getSimplifiedInitialValues);
  const [selected, setSelected] = React.useState<SelectedWildSetup | null>(null);
  const [searching, setSearching] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [failed, setFailed] = React.useState(false);
  const request = React.useRef(0);
  const clearSelection = () => {
    request.current += 1;
    setSelected(null);
    setMessage(null);
    setFailed(false);
  };
  const updateValues = (next: FormState) => {
    clearSelection();
    setValues(next);
  };
  const choices = getSimplifiedChoices(values.species);
  const invalidTrainerIds =
    values.tid == null || values.sid == null ||
    !Number.isInteger(values.tid) || !Number.isInteger(values.sid) ||
    values.tid < 0 || values.tid > 0xffff ||
    values.sid < 0 || values.sid > 0xffff;
  const missingRestrictions =
    !values.recommendedSetups &&
    (values.maps.length === 0 ||
      values.actions.length === 0 ||
      values.leadKeys.length === 0);
  const onSubmit = async (submitted: FormState) => {
    clearSelection();
    const generation = request.current;
    setSearching(true);
    try {
      const result = await searchSimplifiedWild(submitted);
      if (generation !== request.current) return;
      setSelected(result);
      if (result == null) {
        setMessage(
          "No reliable setup was found for these choices. Try other maps, actions, or leads.",
        );
      } else if (result.probability <= 0.5) {
        setMessage(
          "No returned setup exceeded 50% likelihood. The setup with the highest likelihood was selected.",
        );
      }
    } catch {
      if (generation !== request.current) return;
      setFailed(true);
      setMessage("The search failed. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  return (
    <Flex vertical gap={32}>
      <ToolForm<FormState, never>
        initialValues={getSimplifiedInitialValues()}
        values={values}
        validationSchema={simplifiedSearchSchema}
        onSubmit={onSubmit}
        submitTrackerId="simplified_emerald_wild_search"
        submitButtonLabel={searching ? "Searching..." : "Find setup"}
        disableGenerate={searching || missingRestrictions || invalidTrainerIds}
      >
        <FormSection title="Target Pokemon">
          <SelectField<FormState["species"]>
            name="species"
            label="Species"
            value={values.species}
            options={toOptions(simplifiedSpecies)}
            onChange={(species) =>
              updateValues({
                ...values,
                species,
                ...getSimplifiedChoices(species),
              })
            }
          />
        </FormSection>
        <FormSection title="Considered Setups">
          <FieldRow>
            <NumberField
              name="tid"
              label="TID"
              numType="decimal"
              value={values.tid}
              onChange={(tid) => updateValues({ ...values, tid })}
            />
            <NumberField
              name="sid"
              label="SID"
              numType="decimal"
              value={values.sid}
              onChange={(sid) => updateValues({ ...values, sid })}
            />
          </FieldRow>
          <SwitchField
            name="recommendedSetups"
            label="Ignore Recommended Setups"
            value={!values.recommendedSetups}
            onChange={(ignore) =>
              updateValues({ ...values, recommendedSetups: !ignore })
            }
          >
            <MultiSelectField<string>
              name="maps"
              label="Maps"
              value={values.maps}
              options={toOptions(choices.maps, formatMapName)}
              onChange={(maps) => updateValues({ ...values, maps })}
            />
            <MultiSelectField<FormState["actions"][number]>
              name="actions"
              label="Actions"
              value={values.actions}
              options={toOptions(choices.actions, formatActionName)}
              onChange={(actions) => updateValues({ ...values, actions })}
            />
            <MultiSelectField<string>
              name="leadKeys"
              label="Leads"
              value={values.leadKeys}
              options={toOptions(simplifiedLeadKeys, (lead) =>
                lead === "Synchronize" ? lead : formatLeadName(lead),
              )}
              onChange={(leadKeys) => updateValues({ ...values, leadKeys })}
            />
          </SwitchField>
          {missingRestrictions && (
            <p role="alert">Select at least one map, action, and lead.</p>
          )}
        </FormSection>
      </ToolForm>
      {message != null && (
        <Alert type={failed ? "error" : "info"} title={message} showIcon />
      )}
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
            summaryTitle="Selected setup"
          />
        </section>
      )}
    </Flex>
  );
};
