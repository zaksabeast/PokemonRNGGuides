import {
  FormFieldTable,
  FormikNumberInput,
  MinMaxContainer,
  type Field,
} from "~/components";
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

  const { seed } = useWatch({
    validationSchema: advanceFilterValidator,
    names: { seed: true },
  });

  const fields: Field[] = [
    {
      label: t["Seed"],
      input: (
        <FormikNumberInput<AdvanceFilterFormState>
          name="seed"
          numType="hex"
          disabled={mode === "embedded"}
          errorMessage={
            seed == null && mode === "embedded"
              ? "Find your seed first"
              : undefined
          }
        />
      ),
    },
    {
      key: "embeddedTargetAdvance",
      label: t["Target Advance"],
      show: mode === "embedded",
      input: (
        <FormikNumberInput<AdvanceFilterFormState>
          name="targetAdvance"
          numType="decimal"
          disabled={mode === "embedded"}
          errorMessage={
            targetAdvance == null && mode === "embedded"
              ? "Find your target first"
              : undefined
          }
        />
      ),
    },
    {
      label: t["Advances"],
      input: (
        <MinMaxContainer
          min={
            <FormikNumberInput<AdvanceFilterFormState>
              name="minAdvance"
              numType="decimal"
            />
          }
          max={
            <FormikNumberInput<AdvanceFilterFormState>
              name="maxAdvance"
              numType="decimal"
            />
          }
        />
      ),
    },
    {
      key: "standaloneAdvance",
      label: t["Target Advance"],
      show: mode === "standalone",
      input: (
        <FormikNumberInput<AdvanceFilterFormState>
          name="targetAdvance"
          numType="decimal"
        />
      ),
    },
  ];

  return <FormFieldTable fields={fields} />;
};
