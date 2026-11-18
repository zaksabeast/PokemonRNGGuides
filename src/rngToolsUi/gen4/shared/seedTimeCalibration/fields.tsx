import { FieldRow, FormNumberField, FormSection } from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { type SeedCalibratorFormState } from "./utils";

export const SeedCalibratorFields = () => {
  const t = useActiveRouteTranslations();

  return (
    <FormSection>
      <FieldRow>
        <FormNumberField<SeedCalibratorFormState>
          name="delayOffset"
          label={t["Delay Offset"]}
          numType="decimal"
        />
        <FormNumberField<SeedCalibratorFormState>
          name="secondOffset"
          label={t["Second Offset"]}
          numType="decimal"
        />
      </FieldRow>
    </FormSection>
  );
};
