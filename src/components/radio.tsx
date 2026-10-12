import {
  Radio as AntdRadio,
  RadioGroupProps as AntdRadioGroupProps,
  CheckboxOptionType,
  RadioChangeEvent as AntdRadioChangeEvent,
} from "antd";
import { useField } from "~/hooks/form";
import * as tst from "ts-toolbelt";
import { FormControlledProps, GenericForm } from "~/types/form";
import { Typography } from "./typography";
import { Flex } from "./flex";
import { withCss } from "./withCss";
import { Path, Paths } from "~/types";
import { PrimitiveAtom, useAtom } from "jotai";
import { Translation } from "~/translations";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import React from "react";
import isEqual from "lodash-es/isEqual";
import styled from "@emotion/styled";

type RadioOptions<OptionValues extends string | number> =
  CheckboxOptionType<OptionValues>[];

export type RadioChangeEvent<OptionValues extends string | number> =
  tst.O.Overwrite<
    AntdRadioChangeEvent,
    {
      target: tst.O.Required<
        tst.O.Overwrite<
          AntdRadioChangeEvent["target"],
          { value: OptionValues }
        >,
        "value"
      >;
    }
  >;

type RadioGroupProps<OptionValues extends string | number> = tst.O.Overwrite<
  AntdRadioGroupProps,
  {
    options: RadioOptions<OptionValues> | Readonly<RadioOptions<OptionValues>>;
    onChange?: (evt: RadioChangeEvent<OptionValues>) => void;
  }
>;

const _RadioGroup = styled(withCss(AntdRadio.Group))(({ theme }) => ({
  "&& .ant-radio-button-wrapper:not(.ant-radio-button-wrapper-disabled):hover":
    {
      color: theme.token.colorText,
      backgroundColor: theme.token.colorStateLayerHover,
    },
  "&& .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)":
    {
      "&, &:hover, &:active, &:first-of-type": {
        color: theme.token.colorPrimaryActive,
        backgroundColor: theme.token.colorPrimaryBg,
        borderColor: theme.token.colorBorder,
      },
      "&::before, &:hover::before, &:active::before": {
        backgroundColor: theme.token.colorBorder,
      },
    },
}));

export const RadioGroup = <OptionValues extends string | number>(
  props: RadioGroupProps<OptionValues>,
) => {
  // @ts-expect-error - Antd doesn't like readonly types, but they're fine
  return <_RadioGroup {...props} />;
};

type FormikRadioBaseProps = Omit<
  AntdRadioGroupProps,
  FormControlledProps | "options"
>;

type FormikRadioFieldKey<FormState extends GenericForm> = Paths<
  FormState,
  string | number | null
>;

type FormikRadioOptions<OptionValues extends string | number> =
  | RadioOptions<OptionValues>
  | Readonly<RadioOptions<OptionValues>>;

// A union with one member per field, so options are checked against the named field.
type FormikRadioProps<
  FormState extends GenericForm,
  FieldKey extends FormikRadioFieldKey<FormState>,
> = {
  [Key in FieldKey]: tst.O.Merge<
    FormikRadioBaseProps,
    {
      name: Key;
      options: Path<FormState, Key> extends string | number | null
        ? FormikRadioOptions<Exclude<Path<FormState, Key>, null>>
        : never;
    }
  >;
}[FieldKey];

type InternalFormikRadioProps = tst.O.Merge<
  FormikRadioBaseProps,
  {
    name: string;
    options: FormikRadioOptions<string | number>;
  }
>;

const InternalFormikRadio = ({
  name,
  options,
  ...props
}: InternalFormikRadioProps) => {
  const [{ value, onChange, onBlur }, { error }, { setValue }] = useField<
    string | number | null
  >(name);

  React.useEffect(() => {
    if (
      options.length > 0 &&
      options.find((opt) => isEqual(opt.value, value)) == null
    ) {
      setValue(options[0].value);
    }
  }, [options, setValue, value]);

  return (
    <Flex vertical>
      <RadioGroup
        optionType="button"
        {...props}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        options={options}
      />
      {error != null && (
        <Typography.Text type="danger">{error}</Typography.Text>
      )}
    </Flex>
  );
};

type FormikRadioComponent = <
  FormState extends GenericForm,
  FieldKey extends
    FormikRadioFieldKey<FormState> = FormikRadioFieldKey<FormState>,
>(
  props: FormikRadioProps<FormState, FieldKey>,
) => React.JSX.Element;

// The public props tie options to the field's type, which TS can't follow
// internally, so the implementation works with loosely typed values.
export const FormikRadio = InternalFormikRadio as FormikRadioComponent;

type AtomRadioProps<
  State,
  Option extends { label: Translation; value: string | number },
> = {
  options: Option[];
  atom: PrimitiveAtom<State>;
  getValue: (state: State) => Option["value"];
  nextState: (state: State, option: Option["value"]) => State;
};

export const AtomRadio = <
  State,
  Option extends { label: Translation; value: string | number },
>({
  atom,
  options,
  getValue,
  nextState,
}: AtomRadioProps<State, Option>) => {
  const t = useActiveRouteTranslations();
  const [state, setState] = useAtom(atom);

  return (
    <RadioGroup<Option["value"]>
      optionType="button"
      value={getValue(state)}
      options={options.map((opt) => ({ ...opt, label: t[opt.label] }))}
      onChange={(event) => setState(nextState(state, event.target.value))}
    />
  );
};
