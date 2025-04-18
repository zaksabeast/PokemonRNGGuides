import { GenericForm, GuaranteeFormNameType } from "~/types/form";
import { Select } from "./select";
import { Flex } from "./flex";
import { NumberInput } from "./numberInput";
import { useFormikContext } from "formik";
import { IdFilter } from "~/types/id";

type FilterType = IdFilter["type"];

type Props<FormState extends GenericForm> = {
  name: GuaranteeFormNameType<FormState, IdFilter>;
  optional?: boolean;
};

const filterOptions = [
  { label: "TID", value: "tid" },
  { label: "SID", value: "sid" },
  { label: "PID", value: "pid" },
  { label: "TSV", value: "tsv" },
  { label: "TID/SID", value: "tidsid" },
  { label: "TID/PID", value: "tidpid" },
] as const satisfies { label: string; value: FilterType }[];

const optionalFilterOptions = [
  { label: "None", value: "none" },
  ...filterOptions,
] as const satisfies { label: string; value: FilterType }[];

export const FormikIdFilter = <FormState extends GenericForm>({
  name,
  optional = false,
}: Props<FormState>) => {
  const formik = useFormikContext<Record<typeof name, IdFilter>>();
  const value = formik.values[name];

  return (
    <Flex vertical gap={10}>
      <Select<FilterType>
        fullFlex
        options={optional ? optionalFilterOptions : filterOptions}
        value={value.type}
        onChange={(value) => {
          formik.setFieldValue(name, { type: value, value0: "", value1: "" });
        }}
      />
      {value.type !== "none" && (
        <NumberInput
          fullFlex
          numType={value.type === "pid" ? "hex" : "decimal"}
          value={value.value0}
          onChange={(fieldValue) => {
            formik.setFieldValue(name, {
              ...value,
              value0: fieldValue,
            });
          }}
        />
      )}
      {(value.type === "tidpid" || value.type === "tidsid") && (
        <NumberInput
          fullFlex
          numType={value.type === "tidpid" ? "hex" : "decimal"}
          value={value.value1}
          onChange={(fieldValue) => {
            formik.setFieldValue(name, {
              ...value,
              value1: fieldValue,
            });
          }}
        />
      )}
    </Flex>
  );
};
