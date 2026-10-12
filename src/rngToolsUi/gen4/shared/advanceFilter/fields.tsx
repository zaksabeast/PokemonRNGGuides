import { FieldRow, FormNumberField, FormSection } from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useWatch } from "~/hooks/form";
import {
  AdvanceFilterMode,
  AdvanceFilterFormState,
  advanceFilterValidator,
} from "./utils";

type AdvanceFilterFieldsProps = {
  mode: AdvanceFilterMode;
  targetAdvance: number | null;
};

export const AdvanceFilterFields = ({
  mode,
  targetAdvance,
}: AdvanceFilterFieldsProps) => {
  const t = useActiveRouteTranslations();
  const embedded = mode === "embedded";

  const { seed } = useWatch({
    validationSchema: advanceFilterValidator,
    names: { seed: true },
  });

  return (
    <FormSection>
      <FormNumberField<AdvanceFilterFormState>
        name="seed"
        label={t["Seed"]}
        numType="hex"
        disabled={embedded}
        errorMessage={
          seed == null && embedded ? "Find your seed first" : undefined
        }
      />
      {embedded && (
        <FormNumberField<AdvanceFilterFormState>
          name="targetAdvance"
          label={t["Target Advance"]}
          numType="decimal"
          disabled
          errorMessage={
            targetAdvance == null ? "Find your target first" : undefined
          }
        />
      )}
      <FieldRow>
        <FormNumberField<AdvanceFilterFormState>
          name="minAdvance"
          label={t["Min Advance"]}
          numType="decimal"
        />
        <FormNumberField<AdvanceFilterFormState>
          name="maxAdvance"
          label={t["Max Advance"]}
          numType="decimal"
        />
      </FieldRow>
      {!embedded && (
        <FormNumberField<AdvanceFilterFormState>
          name="targetAdvance"
          label={t["Target Advance"]}
          numType="decimal"
        />
      )}
    </FormSection>
  );
};
