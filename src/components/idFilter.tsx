import { GenericForm } from "~/types/form";
import { FormikSelect } from "./select";
import { Flex } from "./flex";
import { FormikNumberInput } from "./numberInput";
import { IdFilter } from "~/types/id";
import { Paths } from "~/types";
import { useWatch } from "react-hook-form";

type FilterType = IdFilter["type"];

type Props<FormState extends GenericForm> = {
  name: Paths<FormState, IdFilter>;
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
  type FakeForm = Record<"field", IdFilter>;
  const fakeName = name as "field";

  const type = useWatch<FakeForm>({
    name: `${fakeName}.type`,
  });

  return (
    <Flex vertical gap={10}>
      <FormikSelect<FakeForm, `${typeof fakeName}.type`>
        name={`${fakeName}.type`}
        options={optional ? optionalFilterOptions : filterOptions}
      />
      {type !== "none" && (
        <FormikNumberInput<FakeForm>
          name={`${fakeName}.value0`}
          numType={type === "pid" ? "hex" : "decimal"}
        />
      )}
      {(type === "tidpid" || type === "tidsid") && (
        <FormikNumberInput<FakeForm>
          name={`${fakeName}.value1`}
          numType={type === "tidpid" ? "hex" : "decimal"}
        />
      )}
    </Flex>
  );
};
