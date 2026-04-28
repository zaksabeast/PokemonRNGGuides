import { Flex } from "./flex";
import { FormikRadio } from "./radio";
import { toOptions } from "~/utils/options";
import { range } from "lodash-es";
import { MinMax, Stat } from "~/types/stat";
import { useField } from "~/hooks/form";

const toStatOptions = ({ min, max }: MinMax) => {
  return toOptions(range(min, max + 1));
};

export type StatFields = Record<`${Stat}Stat`, number>;

// @ts-expect-error - This helps enforce the parent FormState has the expected fields
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StatInput = <FormState extends StatFields>({
  stat,
  options,
}: {
  stat: Stat;
  options: { min: number; max: number };
}) => {
  const [{ value }, , { setValue }] = useField<number>(`${stat}Stat`);
  if (value < options.min) {
    setValue(options.min);
  } else if (value > options.max) {
    setValue(options.max);
  }

  return (
    <Flex gap={8}>
      <FormikRadio<StatFields>
        name={`${stat}Stat`}
        options={toStatOptions(options)}
      />
    </Flex>
  );
};
