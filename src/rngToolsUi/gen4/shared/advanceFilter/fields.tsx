import {
  FormFieldTable,
  FormikNumberInput,
  MinMaxContainer,
  type Field,
} from "~/components";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useWatch } from "~/hooks/form";
import {
  AdvanceFilterBaseProps,
  AdvanceFilterFormState,
  advanceFilterValidator,
} from "./utils";

export const AdvanceFilterFields = ({
  mode,
}: {
  mode: AdvanceFilterBaseProps["mode"];
}) => {
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
