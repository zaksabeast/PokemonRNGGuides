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
  const { setFieldValue } = useFormContext<FormState>();
  const fields: Field[] = [
    {
      label: "",
      key:"pidSpeed",
      input: (
        <Flex gap={20}>
            <Button trackerId="pidSpeed_min" onClick={() => {
                setFieldValue("filter_pid_speed.min_cycle_count", 18);
                setFieldValue("filter_pid_speed.max_cycle_count", 18);
            }}>Fastest</Button>
            <Button trackerId="pidSpeed_min" onClick={() => {
                setFieldValue("filter_pid_speed.min_cycle_count", 900);
                setFieldValue("filter_pid_speed.min_cycle_count", 900);
            }}>Slowest</Button>
            <Flex>
                Range:
                <FormikNumberInput<Gen3PkmFilterFields>
                name="filter_pid_speed.min_cycle_count"
                numType="decimal"
                />
                <FormikNumberInput<Gen3PkmFilterFields>
            name="filter_pid_speed.max_cycle_count"
            numType="decimal"
            </Flex>
        </Flex>
      ),
    },
  ];

  return <FormFieldTable fields={fields} />;
};
