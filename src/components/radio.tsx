import {
  Radio as AntdRadio,
  RadioGroupProps as AntdRadioGroupProps,
  CheckboxOptionType,
  RadioChangeEvent as AntdRadioChangeEvent,
} from "antd";
import { useField } from "~/hooks/form";
import * as tst from "ts-toolbelt";
import { GenericForm } from "~/types/form";
import { Typography } from "./typography";
import { Flex } from "./flex";
import { withCss } from "./withCss";
import { Path, Paths } from "~/types";
import { PrimitiveAtom, useAtom } from "jotai";
import { Translation } from "~/translations";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";

type RadioOptions<OptionValues extends string | number> =
  | OptionValues[]
  | CheckboxOptionType<OptionValues>[];

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

const _RadioGroup = withCss(AntdRadio.Group);

export const RadioGroup = <OptionValues extends string | number>(
  props: RadioGroupProps<OptionValues>,
) => {
  // @ts-expect-error - Antd doesn't like readonly types, but they're fine
  return <_RadioGroup {...props} />;
};

type FormikRadioProps<
  FormState extends GenericForm,
  FieldKey extends Paths<FormState, string | number | null> = Paths<
    FormState,
    string | number | null
  >,
> = tst.O.Overwrite<
  tst.O.Omit<tst.O.Required<AntdRadioGroupProps, "name">, "onChange">,
  {
    name: FieldKey;
    options: RadioOptions<
      Path<FormState, FieldKey> extends string | number | null
        ? tst.U.Exclude<Path<FormState, FieldKey>, null>
        : never
    >;
  }
>;

export const FormikRadio = <FormState extends GenericForm>({
  name,
  ...props
}: FormikRadioProps<FormState>) => {
  type FieldKey = typeof name;
  const [{ value, onChange, onBlur }, { error }] =
    useField<Path<FormState, FieldKey>>(name);

  return (
    <Flex vertical>
      <RadioGroup
        optionType="button"
        name={String(name)}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        {...props}
      />
      {error != null && (
        <Typography.Text type="danger">{error}</Typography.Text>
      )}
    </Flex>
  );
};

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
  ...props
}: AtomRadioProps<State, Option>) => {
  const t = useActiveRouteTranslations();
  const [state, setState] = useAtom(atom);

  return (
    <RadioGroup
      optionType="button"
      value={getValue(state)}
      options={options.map((opt) => ({ ...opt, label: t[opt.label] }))}
      onChange={(event) =>
        setState(nextState(state, event.target.value as Option["value"]))
      }
      {...props}
    />
  );
};
