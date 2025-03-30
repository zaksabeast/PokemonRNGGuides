import { GenericForm, GuarnteeFormNameType } from "~/types/form";
import { Select } from "./select";
import { Flex } from "./flex";
import { Input } from "./input";
import { useFormikContext } from "formik";
import { IdFilter } from "~/types/id";

type FilterType = IdFilter["type"];

type Props<FormState extends GenericForm> = {
  name: GuarnteeFormNameType<FormState, IdFilter>;
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
        <Input
          fullFlex
          value={value.value0}
          onChange={(event) => {
            formik.setFieldValue(name, {
              ...value,
              value0: event.target.value,
            });
          }}
        />
      )}
      {(value.type === "tidpid" || value.type === "tidsid") && (
        <Input
          fullFlex
          value={value.value1}
          onChange={(event) => {
            formik.setFieldValue(name, {
              ...value,
              value1: event.target.value,
            });
          }}
        />
      )}
    </Flex>
  );
};
