import * as tst from "ts-toolbelt";
import { ClassNames } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Select as AntdSelect,
  SelectProps as AntdSelectProps,
  Tooltip,
} from "antd";
import { useField } from "formik";
import { GenericForm } from "~/types/form";
import { Flex } from "./flex";
import React from "react";
import { Icon } from "./icons";
import { Button } from "./button";

const SelectContainer = styled(Flex)({
  ".ant-select": {
    width: "100%",
    outline: "none",
    boxShadow: "none",
    ".ant-select-selector": {
      fontSize: 18,
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      outline: "none",
      boxShadow: "none !important",
      borderRadius: 0,
    },
    ".ant-select-selection-search-input": {
      fontSize: 18,
    },
  },
});

const SelectAllContainer = styled(Flex)({
  flexFlow: "row wrap",
});

type SelectProps<ValueType> = {
  fullWidth?: boolean;
  fullFlex?: boolean;
  name?: string;
} & AntdSelectProps<ValueType>;

export const Select = <ValueType,>({
  fullWidth,
  fullFlex,
  ...props
}: SelectProps<ValueType>) => {
  return (
    <SelectContainer flex={fullFlex ? 1 : undefined}>
      <ClassNames>
        {({ css }) => (
          <AntdSelect
            size="large"
            {...props}
            className={css({
              width: fullWidth ? "100%" : undefined,
              flex: fullFlex ? 1 : undefined,
            })}
          />
        )}
      </ClassNames>
    </SelectContainer>
  );
};

type SingleFormikSelectValue<
  FormState extends GenericForm,
  FieldKey extends keyof FormState,
> = FormState[FieldKey] extends string | number | null
  ? {
      label: string;
      value: FormState[FieldKey];
    }[]
  : never;

type MultiFormikSelectValue<
  FormState extends GenericForm,
  FieldKey extends keyof FormState,
> = FormState[FieldKey] extends string[] | number[] | null
  ? {
      label: string;
      value: FormState[FieldKey][keyof FormState[FieldKey]];
    }[]
  : never;

type FormikSelectValue<
  FormState extends GenericForm,
  FieldKey extends keyof FormState,
  Multiple extends boolean,
> = Multiple extends true
  ? MultiFormikSelectValue<FormState, FieldKey>
  : SingleFormikSelectValue<FormState, FieldKey>;

type FormikSelectProps<
  FormState extends GenericForm,
  FieldKey extends keyof FormState,
> =
  | tst.O.Merge<
      Omit<
        SelectProps<FormikSelectValue<FormState, FieldKey, false>>,
        "onChange" | "defaultValue" | "options" | "mode"
      >,
      {
        selectAllNoneButtons?: undefined;
        mode?: undefined;
        name: FieldKey;
        options: FormikSelectValue<FormState, FieldKey, false>;
      }
    >
  | tst.O.Merge<
      Omit<
        SelectProps<FormikSelectValue<FormState, FieldKey, true>>,
        "onChange" | "defaultValue" | "options" | "mode"
      >,
      {
        selectAllNoneButtons?: boolean;
        mode: "multiple";
        name: FieldKey;
        options: FormikSelectValue<FormState, FieldKey, true>;
      }
    >;

export const FormikSelect = <
  FormState extends GenericForm,
  FieldKey extends keyof FormState,
>({
  name,
  ...props
}: FormikSelectProps<FormState, FieldKey>) => {
  const [{ value, onBlur }, { error }, { setValue }] =
    useField<FormState[FieldKey]>(name);

  const selectAllNoneDropdownRender = React.useCallback<
    (menu: React.ReactElement) => React.ReactElement
  >(
    (menu: React.ReactElement) => {
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
    },
    [props.options, setValue],
  );

  const dropdownRender = props.selectAllNoneButtons
    ? selectAllNoneDropdownRender
    : undefined;

  return (
    <Tooltip color="red" title={error} placement="top">
      <Select
        {...props}
        name={String(name)}
        onBlur={onBlur}
        // @ts-expect-error -- prop types guarantee this is correct
        onChange={(value) => setValue(value)}
        // @ts-expect-error -- prop types guarantee this is correct
        value={value}
        dropdownRender={dropdownRender}
      />
    </Tooltip>
  );
};
