import { Gen3PidSpeedFilter } from "~/rngTools";
import { FormikNumberInput, FormFieldTable } from "~/components";
import { useField } from "~/hooks/form";
import React from "react";
import { Paths } from "~/types";
import { Gen3PkmFilterFields } from "./gen3PkmFilter";

type Props<FormState extends Gen3PkmFilterFields> = {
  name: Paths<FormState, Gen3PidSpeedFilter>;
};

export const Gen3PidSpeedInput = <FormState extends Gen3PkmFilterFields>({
  name,
}: Props<FormState>) => {
  const [{ value: active }] = useField<Gen3PidSpeedFilter["active"]>(
    `${name}.active`,
  );
  const fields = React.useMemo(
    () => [
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
    ],
    [],
  );

  // Eslint is asking this to be a strict check
  if (active === true) {
    return <FormFieldTable fields={fields} />;
  }

  return null;
};
