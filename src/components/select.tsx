import React from "react";
import * as tst from "ts-toolbelt";
import { isEqual } from "lodash-es";
import styled from "@emotion/styled";
import { Select as AntdSelect, SelectProps as AntdSelectProps } from "antd";
import { useField } from "~/hooks/form";
import { FormControlledProps, GenericForm } from "~/types/form";
import { Flex } from "./flex";
import { Icon } from "./icons";
import { Button } from "./button";
import { Typography } from "./typography";
import { Path, Paths } from "~/types";
import { PrimitiveAtom, useAtom } from "jotai";
import { toOptions } from "~/utils/options";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { Translation } from "~/translations";
import { useSize } from "~/theme/size";

const SelectContainer = styled(Flex)(({ theme }) => ({
  "&&&": {
    ".ant-select": {
      width: "100%",
      borderRadius: 4,
    },
    ".ant-select-suffix": {
      color: theme.token.colorTextSecondary,
    },
  },
}));

const SelectAllContainer = styled(Flex)({
  flexFlow: "row wrap",
});

type SelectProps<ValueType> = tst.O.Merge<
  {
    fullFlex?: boolean;
    name?: string;
    errorMessage?: string;
  },
  AntdSelectProps<ValueType>
>;

export const Select = <ValueType,>({
  fullFlex,
  value,
  onChange,
  onSelect,
  mode,
  options,
  errorMessage,
  status,
  ...props
}: SelectProps<ValueType>) => {
  const size = useSize();
  React.useEffect(() => {
    if (
      mode !== "multiple" &&
      options != null &&
      options.length > 0 &&
      options.find((opt) => isEqual(opt.value, value)) == null
    ) {
      // The props types guarantee this is correct in usage, but TS can't figure it out internally
      const safeValue = options[0].value as ValueType;
      onChange?.(safeValue, options[0]);

      // @ts-expect-error -- this is incorrect for multiple select
      // but is correct for single select and we're checking mode !== "multiple"
      onSelect?.(safeValue, options[0]);
    }
  }, [mode, options, onChange, onSelect, value]);

  return (
    <SelectContainer vertical flex={fullFlex ? 1 : undefined}>
      <AntdSelect
        size={size}
        showSearch={{ optionFilterProp: "label" }}
        mode={mode}
        value={value}
        onSelect={onSelect}
        onChange={onChange}
        options={options}
        {...props}
        status={errorMessage != null ? "error" : status}
      />
      {errorMessage != null && (
        <Typography.Text type="danger">{errorMessage}</Typography.Text>
      )}
    </SelectContainer>
  );
};

type SelectOption<Value> = {
  label: React.ReactNode;
  value: Value;
};

type FormikSelectBaseProps = Omit<
  SelectProps<unknown>,
  FormControlledProps | "options" | "mode"
>;

type SingleFormikSelectProps<
  FormState extends GenericForm,
  FieldKey extends Paths<FormState>,
> = tst.O.Merge<
  FormikSelectBaseProps,
  {
    selectAllNoneButtons?: undefined;
    mode?: undefined;
    name: FieldKey;
    options: Path<FormState, FieldKey> extends string | number | null
      ? SelectOption<Path<FormState, FieldKey>>[]
      : never;
  }
>;

type MultiFormikSelectProps<
  FormState extends GenericForm,
  FieldKey extends Paths<FormState>,
> = tst.O.Merge<
  FormikSelectBaseProps,
  {
    selectAllNoneButtons?: boolean;
    mode: "multiple";
    name: FieldKey;
    options: Path<FormState, FieldKey> extends string[] | number[] | null
      ? SelectOption<NonNullable<Path<FormState, FieldKey>>[number]>[]
      : never;
  }
>;

type InternalFormikSelectProps = tst.O.Merge<
  FormikSelectBaseProps,
  {
    selectAllNoneButtons?: boolean;
    mode?: "multiple";
    name: string;
    options: SelectOption<string | number | null>[];
  }
>;

const InternalFormikSelect = ({
  name,
  selectAllNoneButtons,
  ...props
}: InternalFormikSelectProps) => {
  const [{ value, onBlur }, { error }, { setValue }] = useField<unknown>(name);

  const selectAllNonePopupRender = (menu: React.ReactElement) => {
    return (
      <>
        <SelectAllContainer>
          <div>
            <Button
              type="text"
              trackerId="select-all-button"
              onClick={() => setValue(props.options.map(({ value }) => value))}
            >
              <Icon name="AddCircleOutline" /> Select All
            </Button>
          </div>
          <div>
            <Button
              type="text"
              trackerId="select-none-button"
              onClick={() => setValue([])}
            >
              <Icon name="Block" /> Select None
            </Button>
          </div>
        </SelectAllContainer>
        {menu}
      </>
    );
  };

  return (
    <Select
      {...props}
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={setValue}
      popupRender={selectAllNoneButtons ? selectAllNonePopupRender : undefined}
      errorMessage={error}
    />
  );
};

type FormikSelectComponent = <
  FormState extends GenericForm,
  FieldKey extends Paths<FormState>,
>(
  props:
    | SingleFormikSelectProps<FormState, FieldKey>
    | MultiFormikSelectProps<FormState, FieldKey>,
) => React.JSX.Element;

// The public props tie options to the field's type, which TS can't follow
// internally, so the implementation works with loosely typed values.
export const FormikSelect = InternalFormikSelect as FormikSelectComponent;

type AtomSelectProps<State, Option> = {
  options: Option[] | Readonly<Option[]>;
  atom: PrimitiveAtom<State>;
  getValue: (state: State) => Option;
  nextState: (state: State, option: Option) => State;
  format?: (option: Option) => string;
};

export const AtomSelect = <State, Option extends Translation>({
  options,
  atom,
  getValue,
  nextState,
  format: _format,
}: AtomSelectProps<State, Option>) => {
  const t = useActiveRouteTranslations();
  const format = _format ?? ((option: Option) => t[option]);
  const [state, setState] = useAtom(atom);

  return (
    <Select<Option>
      options={toOptions(options, format)}
      value={getValue(state)}
      onChange={(option) => setState((prev) => nextState(prev, option))}
    />
  );
};
