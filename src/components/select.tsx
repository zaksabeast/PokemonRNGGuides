import React from "react";
import * as tst from "ts-toolbelt";
import { isEqual } from "lodash-es";
import styled from "@emotion/styled";
import { Select as AntdSelect, SelectProps as AntdSelectProps } from "antd";
import { useField } from "~/hooks/form";
import { GenericForm } from "~/types/form";
import { Flex } from "./flex";
import { Icon } from "./icons";
import { Button } from "./button";
import { Typography } from "./typography";
import { Path, Paths } from "~/types";
import { PrimitiveAtom, useAtom } from "jotai";
import { toOptions } from "~/utils/options";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { Translation } from "~/translations";

const SelectContainer = styled(Flex)({
  ".ant-select": {
    width: "100%",
  },
});

const SelectAllContainer = styled(Flex)({
  flexFlow: "row wrap",
});

type SelectProps<ValueType> = {
  fullFlex?: boolean;
  name?: string;
} & AntdSelectProps<ValueType>;

export const Select = <ValueType,>({
  fullFlex,
  value,
  onChange,
  onSelect,
  mode,
  options,
  ...props
}: SelectProps<ValueType>) => {
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
    <SelectContainer flex={fullFlex ? 1 : undefined}>
      <AntdSelect
        size="large"
        showSearch={{ optionFilterProp: "label" }}
        mode={mode}
        value={value}
        onSelect={onSelect}
        onChange={onChange}
        options={options}
        {...props}
      />
    </SelectContainer>
  );
};

type SingleFormikSelectValue<
  FormState extends GenericForm,
  FieldKey extends Paths<FormState>,
> =
  Path<FormState, FieldKey> extends string | number | null
    ? {
        label: string;
        value: Path<FormState, FieldKey>;
      }[]
    : never;

type SingleFormikSelectProps<
  FormState extends GenericForm,
  FieldKey extends Paths<FormState>,
> = tst.O.Merge<
  Omit<
    SelectProps<SingleFormikSelectValue<FormState, FieldKey>>,
    "onChange" | "defaultValue" | "options" | "mode"
  >,
  {
    selectAllNoneButtons?: undefined;
    mode?: undefined;
    name: FieldKey;
    options: SingleFormikSelectValue<FormState, FieldKey>;
  }
>;

type MultiFormikSelectValue<
  FormState extends GenericForm,
  FieldKey extends Paths<FormState>,
> =
  Path<FormState, FieldKey> extends string[] | number[] | null
    ? {
        label: string;
        value: Path<FormState, FieldKey>[keyof Path<FormState, FieldKey>];
      }[]
    : never;

type MultiFormikSelectProps<
  FormState extends GenericForm,
  FieldKey extends Paths<FormState>,
> = tst.O.Merge<
  Omit<
    SelectProps<MultiFormikSelectValue<FormState, FieldKey>>,
    "onChange" | "defaultValue" | "options" | "mode"
  >,
  {
    selectAllNoneButtons?: boolean;
    mode: "multiple";
    name: FieldKey;
    options: MultiFormikSelectValue<FormState, FieldKey>;
  }
>;

export const FormikSelect = <
  FormState extends GenericForm,
  FieldKey extends Paths<FormState>,
>({
  name,
  selectAllNoneButtons,
  ...props
}:
  | SingleFormikSelectProps<FormState, FieldKey>
  | MultiFormikSelectProps<FormState, FieldKey>) => {
  const [{ value, onBlur }, { error, status }, { setValue }] =
    useField<Path<FormState, typeof name>>(name);

  const selectAllNonePopupRender = (menu: React.ReactElement) => {
    return (
      <>
        <SelectAllContainer>
          <div>
            <Button
              type="text"
              trackerId="select-all-button"
              onClick={() => {
                const newVals = props.options.map(({ value }) => value);
                // @ts-expect-error -- prop types guarantee this is correct
                setValue(newVals);
              }}
            >
              <Icon name="AddCircleOutline" /> Select All
            </Button>
          </div>
          <div>
            <Button
              type="text"
              trackerId="select-none-button"
              // @ts-expect-error -- prop types guarantee this is correct
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

  const popupRender = selectAllNoneButtons
    ? selectAllNonePopupRender
    : undefined;

  return (
    <>
      <Select
        {...props}
        name={String(name)}
        onBlur={onBlur}
        // @ts-expect-error -- prop types guarantee this is correct
        onChange={(value) => setValue(value)}
        // @ts-expect-error -- prop types guarantee this is correct
        value={value}
        popupRender={popupRender}
        status={status}
      />
      {error != null && (
        <Typography.Text type="danger">{error}</Typography.Text>
      )}
    </>
  );
};

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
