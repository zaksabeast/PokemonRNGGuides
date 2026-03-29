import * as tst from "ts-toolbelt";
import styled from "@emotion/styled";
import { Select as AntdSelect, SelectProps as AntdSelectProps } from "antd";
import { useField } from "~/hooks/form";
import { GenericForm } from "~/types/form";
import { Flex } from "./flex";
import React from "react";
import { Icon } from "./icons";
import { Button } from "./button";
import { Typography } from "./typography";
import { Path, Paths } from "~/types";

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
  ...props
}: SelectProps<ValueType>) => {
  return (
    <SelectContainer flex={fullFlex ? 1 : undefined}>
      <AntdSelect size="large" showSearch {...props} />
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

  const selectAllNoneDropdownRender = (menu: React.ReactElement) => {
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

  const dropdownRender = selectAllNoneButtons
    ? selectAllNoneDropdownRender
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
        dropdownRender={dropdownRender}
        status={status}
      />
      {error != null && (
        <Typography.Text type="danger">{error}</Typography.Text>
      )}
    </>
  );
};
