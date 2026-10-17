import React from "react";
import styled from "@emotion/styled";
import * as tst from "ts-toolbelt";
import { Select as AntdSelect } from "antd";
import { useField } from "~/hooks/form";
import { FormControlledProps, GenericForm } from "~/types/form";
import { Path, Paths } from "~/types";
import { Icon } from "~/components/icons";
import { Button } from "~/components/button";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { LabeledFieldProps, FieldFrame } from "./field";
import { type FieldIds, useFieldIds } from "./hooks";

type OptionValue = string | number | null;

type MultiOptionValue = string | number;

type SearchableLabel =
  | { label: string; searchText?: string }
  | { label: React.ReactNode; searchText: string };

export type SelectOption<Value extends OptionValue> = SearchableLabel & {
  value: Value;
  /** Shown in the field instead of `label` once selected */
  selectedLabel?: React.ReactNode;
  /** Renders the selected value like a placeholder, e.g. "Any" when it means no filter */
  muted?: boolean;
  disabled?: boolean;
};

const Container = styled.div(({ theme }) => ({
  "&&& .ant-select": {
    "--ant-select-height": `${theme.size.field}px`,
    [theme.mediaQueries.dense]: {
      "--ant-select-height": `${theme.size.dense.field}px`,
    },
    "--ant-select-font-size": `${theme.typography.bodyLarge.fontSize}px`,
    "--ant-select-line-height": theme.typography.bodyLarge.lineHeight,
    "--ant-select-font-height": `${theme.typography.bodyLarge.fontSize * theme.typography.bodyLarge.lineHeight}px`,
    "--ant-select-border-radius": `${theme.shape.medium}px`,
    "--ant-select-border-color": theme.token.colorBorder,
    "--ant-select-background-color": theme.token.colorBgContainer,
    "--ant-select-color": theme.token.colorText,
    width: "100%",
    boxShadow: "none",
    "&:not(.ant-select-disabled):hover": {
      "--ant-select-border-color": theme.token.colorText,
    },
    "&.ant-select-focused": {
      "--ant-select-border-color": theme.token.colorPrimary,
      boxShadow: `inset 0 0 0 1px ${theme.token.colorPrimary}`,
    },
    "&.ant-select-status-error": {
      "--ant-select-border-color": theme.token.colorError,
      "&.ant-select-focused": {
        boxShadow: `inset 0 0 0 1px ${theme.token.colorError}`,
      },
    },
  },
  "&&& .ant-select-single": {
    paddingInlineStart: 16,
    paddingInlineEnd: 8,
  },
  "&&& .ant-select-single:has(.pokemon-species-label) .ant-select-input": {
    paddingLeft: 28,
  },
  "&&& .ant-select-placeholder": {
    color: theme.token.colorTextTertiary,
  },
  "&&& .ant-select-suffix": {
    display: "flex",
    marginInlineStart: 8,
    color: theme.token.colorTextSecondary,
    fontSize: 24,
  },
}));

const MutedLabel = styled.span(({ theme }) => ({
  color: theme.token.colorTextTertiary,
  ".ant-select-content-has-search-value &": {
    color: "transparent",
  },
}));

const Popup = styled.div({
  // Hopefully helps prevent funky scroll behavior on mobile
  ".rc-virtual-list-holder": {
    overscrollBehavior: "contain",
  },
});

const SelectAllRow = styled.div(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 4,
  paddingBottom: 4,
  marginBottom: 4,
  borderBottom: `1px solid ${theme.token.colorSplit}`,
}));

type SelectFieldBaseProps = LabeledFieldProps & {
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  onBlur?: () => void;
};

export type SelectFieldProps<Value extends OptionValue> =
  SelectFieldBaseProps & {
    value: Value;
    options: readonly SelectOption<Value>[];
    onChange?: (value: Value) => void;
  };

export type MultiSelectFieldProps<Value extends MultiOptionValue> =
  SelectFieldBaseProps & {
    value: Value[];
    options: readonly SelectOption<Value>[];
    onChange?: (value: Value[]) => void;
  };

const getSearchText = (option: SelectOption<OptionValue>) => {
  if (option.searchText != null) {
    return option.searchText;
  }

  return typeof option.label === "string" ? option.label : "";
};

const matchesSearch = (option: SelectOption<OptionValue>, input: string) => {
  return getSearchText(option).toLowerCase().includes(input.toLowerCase());
};

// Props shared by single and multiple antd selects
const getAntdSelectProps = (
  {
    placeholder,
    disabled,
    onBlur,
    errorMessage,
    invalid,
    options,
  }: SelectFieldBaseProps & { options: readonly SelectOption<OptionValue>[] },
  ids: FieldIds,
) => {
  const findOption = (value: unknown) => {
    return options.find((option) => option.value === value);
  };

  return {
    id: ids.inputId,
    "aria-describedby": ids.helperId,
    placeholder,
    disabled,
    onBlur,
    // antd adds unknown option keys to the DOM, so only pass what it understands
    options: options.map((option) => ({
      label: option.label,
      value: option.value,
      disabled: option.disabled,
    })),
    status:
      invalid === true || errorMessage != null ? ("error" as const) : undefined,
    suffixIcon: <Icon name="ArrowDropDown" />,
    // The virtual list emulates touch scrolling, which fights the page's native scrolling on mobile
    virtual: false,
    popupRender: (menu: React.ReactElement) => <Popup>{menu}</Popup>,
    showSearch: {
      filterOption: (input: string, option?: { value: unknown }) => {
        const found = findOption(option?.value);
        return found != null && matchesSearch(found, input);
      },
    },
    labelRender: ({
      label,
      value,
    }: {
      label?: React.ReactNode;
      value: unknown;
    }) => {
      const option = findOption(value);
      const displayed = option?.selectedLabel ?? label;
      return option?.muted === true ? (
        <MutedLabel>{displayed}</MutedLabel>
      ) : (
        displayed
      );
    },
  };
};

type SelectFrameProps = LabeledFieldProps & {
  ids: FieldIds;
  name?: string;
  children: React.ReactNode;
};

const SelectFrame = ({
  ids,
  name,
  label,
  tooltip,
  helperText,
  errorMessage,
  invalid,
  children,
}: SelectFrameProps) => (
  <FieldFrame
    ids={ids}
    label={label}
    tooltip={tooltip}
    helperText={helperText}
    errorMessage={errorMessage}
    invalid={invalid}
  >
    <Container data-name={name}>{children}</Container>
  </FieldFrame>
);

export const SelectField = <Value extends OptionValue>(
  props: SelectFieldProps<Value>,
) => {
  const ids = useFieldIds();

  return (
    <SelectFrame {...props} ids={ids}>
      <AntdSelect
        {...getAntdSelectProps(props, ids)}
        value={props.value}
        onChange={(value) => props.onChange?.(value)}
      />
    </SelectFrame>
  );
};

export const MultiSelectField = <Value extends MultiOptionValue>(
  props: MultiSelectFieldProps<Value>,
) => {
  const t = useActiveRouteTranslations();
  const ids = useFieldIds();

  const selectAll = () => {
    props.onChange?.(
      props.options
        .filter((option) => option.disabled !== true)
        .map((option) => option.value),
    );
  };

  return (
    <SelectFrame {...props} ids={ids}>
      <AntdSelect
        {...getAntdSelectProps(props, ids)}
        mode="multiple"
        value={props.value}
        onChange={(value) => props.onChange?.(value)}
        popupRender={(menu) => (
          <Popup>
            <SelectAllRow>
              <Button
                type="text"
                trackerId="select-all-button"
                icon={<Icon name="AddCircleOutline" />}
                onClick={selectAll}
              >
                {t["Select All"]}
              </Button>
              <Button
                type="text"
                trackerId="select-none-button"
                icon={<Icon name="Block" />}
                onClick={() => props.onChange?.([])}
              >
                {t["Select None"]}
              </Button>
            </SelectAllRow>
            {menu}
          </Popup>
        )}
      />
    </SelectFrame>
  );
};

type FormSelectFieldBaseProps = Omit<SelectFieldBaseProps, FormControlledProps>;

type FormSelectFieldKey<FormState extends GenericForm> = Paths<
  FormState,
  OptionValue
>;

type FormMultiSelectFieldKey<FormState extends GenericForm> = Paths<
  FormState,
  MultiOptionValue[]
>;

type FormSelectFieldProps<
  FormState extends GenericForm,
  FieldKey extends FormSelectFieldKey<FormState>,
> = {
  [Key in FieldKey]: tst.O.Merge<
    FormSelectFieldBaseProps,
    {
      name: Key;
      options: Path<FormState, Key> extends OptionValue
        ? readonly SelectOption<Path<FormState, Key>>[]
        : never;
    }
  >;
}[FieldKey];

type FormMultiSelectFieldProps<
  FormState extends GenericForm,
  FieldKey extends FormMultiSelectFieldKey<FormState>,
> = {
  [Key in FieldKey]: tst.O.Merge<
    FormSelectFieldBaseProps,
    {
      name: Key;
      options: Path<FormState, Key> extends readonly (infer Item)[]
        ? [Item] extends [MultiOptionValue]
          ? readonly SelectOption<Item>[]
          : never
        : never;
    }
  >;
}[FieldKey];

type InternalFormSelectFieldProps<Value> = tst.O.Merge<
  FormSelectFieldBaseProps,
  {
    name: string;
    options: readonly SelectOption<Value & OptionValue>[];
  }
>;

const InternalFormSelectField = ({
  name,
  options,
  ...props
}: InternalFormSelectFieldProps<OptionValue>) => {
  const [{ value, onBlur }, { error }, { setValue }] =
    useField<OptionValue>(name);

  const isValidValue = options.some((option) => option.value === value);

  // Keep the value on a real option, e.g. when the options change
  React.useEffect(() => {
    if (options.length > 0 && !isValidValue) {
      setValue(options[0].value);
    }
  }, [options, isValidValue, setValue]);

  return (
    <SelectField
      {...props}
      name={name}
      value={value}
      options={options}
      onBlur={onBlur}
      onChange={setValue}
      errorMessage={error}
    />
  );
};

const InternalFormMultiSelectField = ({
  name,
  options,
  ...props
}: InternalFormSelectFieldProps<MultiOptionValue>) => {
  const [{ value, onBlur }, { error }, { setValue }] =
    useField<MultiOptionValue[]>(name);

  return (
    <MultiSelectField
      {...props}
      name={name}
      value={value}
      options={options}
      onBlur={onBlur}
      onChange={setValue}
      errorMessage={error}
    />
  );
};

type FormSelectFieldComponent = <
  FormState extends GenericForm,
  FieldKey extends
    FormSelectFieldKey<FormState> = FormSelectFieldKey<FormState>,
>(
  props: FormSelectFieldProps<FormState, FieldKey>,
) => React.JSX.Element;

type FormMultiSelectFieldComponent = <
  FormState extends GenericForm,
  FieldKey extends
    FormMultiSelectFieldKey<FormState> = FormMultiSelectFieldKey<FormState>,
>(
  props: FormMultiSelectFieldProps<FormState, FieldKey>,
) => React.JSX.Element;

// The public props tie options to the field's type, which TS can't follow
// internally, so the implementations work with loosely typed values.
export const FormSelectField =
  InternalFormSelectField as FormSelectFieldComponent;

export const FormMultiSelectField =
  InternalFormMultiSelectField as FormMultiSelectFieldComponent;
