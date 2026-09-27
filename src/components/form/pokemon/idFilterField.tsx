import { match } from "ts-pattern";
import { useField } from "~/hooks/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { IdFilter } from "~/types/id";
import { GenericForm } from "~/types/form";
import { Paths } from "~/types";
import { FieldRow } from "~/components/form/base/layout";
import { FormNumberField } from "~/components/form/base/numberField";
import {
  FormSelectField,
  type SelectOption,
} from "~/components/form/base/selectField";

type IdFilterForm = Record<string, IdFilter>;

type FilterType = IdFilter["type"];

const filterOptions = [
  { label: "TID", value: "tid" },
  { label: "SID", value: "sid" },
  { label: "PID", value: "pid" },
  { label: "TSV", value: "tsv" },
  { label: "TID/SID", value: "tidsid" },
  { label: "TID/PID", value: "tidpid" },
] as const satisfies SelectOption<FilterType>[];

type IdFilterFieldProps<FormState extends GenericForm> = {
  name: Paths<FormState, IdFilter>;
  /** Adds an "Any" option that disables the filter */
  optional?: boolean;
};

export const IdFilterField = <FormState extends GenericForm>({
  name,
  optional = false,
}: IdFilterFieldProps<FormState>) => {
  const t = useActiveRouteTranslations();
  const [{ value: type }] = useField<FilterType>(`${name}.type`);

  const options: SelectOption<FilterType>[] = optional
    ? [{ label: t["Any"], value: "none" }, ...filterOptions]
    : [...filterOptions];

  const value0 = match(type)
    .with("none", () => null)
    .with("tid", "tidsid", "tidpid", () => ({ label: t["TID"], hex: false }))
    .with("sid", () => ({ label: t["SID"], hex: false }))
    .with("pid", () => ({ label: t["PID"], hex: true }))
    .with("tsv", () => ({ label: t["TSV"], hex: false }))
    .exhaustive();

  const value1 = match(type)
    .with("tidsid", () => ({ label: t["SID"], hex: false }))
    .with("tidpid", () => ({ label: t["PID"], hex: true }))
    .with("none", "tid", "sid", "pid", "tsv", () => null)
    .exhaustive();

  return (
    <>
      <FormSelectField<IdFilterForm>
        name={`${name}.type`}
        label={t["Filter"]}
        options={options}
      />
      {value0 != null && (
        <FieldRow>
          <FormNumberField<IdFilterForm>
            name={`${name}.value0`}
            label={value0.label}
            numType={value0.hex ? "hex" : "decimal"}
          />
          {value1 != null && (
            <FormNumberField<IdFilterForm>
              name={`${name}.value1`}
              label={value1.label}
              numType={value1.hex ? "hex" : "decimal"}
            />
          )}
        </FieldRow>
      )}
    </>
  );
};
