import { GenericForm, GuaranteeFormNameType } from "~/types/form";
import { Select } from "./select";
import { Flex } from "./flex";
import { NumberInput } from "./numberInput";
import { useField } from "formik";
import { IdFilter } from "~/types/id";
import * as tst from "ts-toolbelt";
import { get } from "lodash-es";

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
  const [{ value }, { error }, { setValue, setTouched }] =
    useField<tst.O.Nullable<IdFilter, "value0" | "value1">>(name);
  const value0Error = error == null ? undefined : get(error, "value0");
  const value1Error = error == null ? undefined : get(error, "value1");

  return (
    <Flex vertical gap={10}>
      <Select<FilterType>
        fullFlex
        name={`${name}.type`}
        options={optional ? optionalFilterOptions : filterOptions}
        value={value.type}
        onChange={(value) => {
          setValue({ type: value, value0: null, value1: null });
          setTouched(true, false);
        }}
      />
      {value.type !== "none" && (
        <NumberInput
          fullFlex
          name={`${name}.value0`}
          numType={value.type === "pid" ? "hex" : "decimal"}
          value={value.value0 ?? null}
          errorMessage={value0Error}
          onChange={(fieldValue) => {
            setValue({
              ...value,
              value0: fieldValue,
            });
            setTouched(true);
          }}
        />
      )}
      {(value.type === "tidpid" || value.type === "tidsid") && (
        <NumberInput
          fullFlex
          name={`${name}.value1`}
          numType={value.type === "tidpid" ? "hex" : "decimal"}
          value={value.value1}
          errorMessage={value1Error}
          onChange={(fieldValue) => {
            setValue({
              ...value,
              value1: fieldValue,
            });
            setTouched(true);
          }}
        />
      )}
    </Flex>
  );
};
