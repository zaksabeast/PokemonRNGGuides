import {
  FieldRow,
  FormDateField,
  FormMultiSelectField,
  FormNumberField,
  FormSection,
  FormTimeField,
} from "~/components/form";
import { GEN5_BUTTONS } from "~/rngToolsUi/gen5/constants";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { toOptions } from "~/utils/options";
import { Profile5ValidatorFormState } from "./validator";

type FormState = Profile5ValidatorFormState;

export const Profile5Fields = () => {
  const t = useActiveRouteTranslations();

  return (
    <>
      <FormSection title={t["Your game"]}>
        <FormNumberField<FormState>
          name="mac"
          label={t["MAC Address"]}
          numType="hex"
        />
        <FieldRow>
          <FormDateField<FormState> name="date" label={t["Boot Date"]} />
          <FormTimeField<FormState> name="time" label={t["Boot Time"]} />
        </FieldRow>
        <FormMultiSelectField<FormState>
          name="buttons"
          label={t["Buttons"]}
          options={toOptions(GEN5_BUTTONS)}
        />
      </FormSection>

      <FormSection title={t["Search"]}>
        <FieldRow>
          <FormNumberField<FormState>
            name="min_seconds"
            label={t["Min Seconds"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="max_seconds"
            label={t["Max Seconds"]}
            numType="decimal"
          />
        </FieldRow>
        <FieldRow>
          <FormNumberField<FormState>
            name="min_v_count"
            label={t["Min VCount"]}
            numType="hex"
          />
          <FormNumberField<FormState>
            name="max_v_count"
            label={t["Max VCount"]}
            numType="hex"
          />
        </FieldRow>
        <FieldRow>
          <FormNumberField<FormState>
            name="min_timer0"
            label={t["Min Timer0"]}
            numType="hex"
          />
          <FormNumberField<FormState>
            name="max_timer0"
            label={t["Max Timer0"]}
            numType="hex"
          />
        </FieldRow>
        <FieldRow>
          <FormNumberField<FormState>
            name="min_gx_stat"
            label={t["Min GxStat"]}
            numType="hex"
          />
          <FormNumberField<FormState>
            name="max_gx_stat"
            label={t["Max GxStat"]}
            numType="hex"
          />
        </FieldRow>
        <FieldRow>
          <FormNumberField<FormState>
            name="min_v_frame"
            label={t["Min VFrame"]}
            numType="hex"
          />
          <FormNumberField<FormState>
            name="max_v_frame"
            label={t["Max VFrame"]}
            numType="hex"
          />
        </FieldRow>
      </FormSection>
    </>
  );
};
