import { Gen3PidSpeedFilter } from "~/rngTools";
import { FormikNumberInput, FormFieldTable, Field } from "~/components";
import { Paths } from "~/types";
import { Gen3PkmFilterFields } from "./gen3PkmFilter";

type Props<FormState extends Gen3PkmFilterFields> = {
  name: Paths<FormState, Gen3PidSpeedFilter>;
};

export const Gen3PidSpeedInput = <FormState extends Gen3PkmFilterFields>(
  // Keeping props to make sure form state is compatible
  _props: Props<FormState>,
) => {
  const fields: Field[] = [
    {
      label: "Min cycle count",
      input: (
        <FormikNumberInput<Gen3PkmFilterFields>
          name="filter_pid_speed.min_cycle_count"
          numType="decimal"
        />
      ),
    },
    {
      label: "Max cycle count",
      input: (
        <FormikNumberInput<Gen3PkmFilterFields>
          name="filter_pid_speed.max_cycle_count"
          numType="decimal"
        />
      ),
    },
  ];

  return <FormFieldTable fields={fields} />;
};
