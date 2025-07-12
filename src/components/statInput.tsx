import { Flex } from "./flex";
import { FormikRadio } from "./radio";
import { toOptions } from "~/utils/options";
import { range } from "lodash-es";
import { MinMax, Stat } from "~/types/stat";

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
  return (
    <Flex gap={8}>
      <FormikRadio<StatFields>
        name={`${stat}Stat`}
        options={toStatOptions(options)}
      />
    </Flex>
  );
};
