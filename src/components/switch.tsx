import { Switch as AntdSwitch, SwitchProps as AntdSwitchProps } from "antd";
import { useField } from "~/hooks/form";
import * as tst from "ts-toolbelt";
import { GenericForm } from "~/types/form";
import { withCss } from "./withCss";
import { Flex } from "./flex";
import { Typography } from "./typography";
import { Paths } from "~/types";
import { PrimitiveAtom, useAtom } from "jotai";

export const Switch = withCss(AntdSwitch);

type FormikSwitchProps<FormState extends GenericForm> = tst.O.Merge<
  Omit<AntdSwitchProps, "value">,
  {
    name: Paths<FormState, boolean>;
  }
>;

export const FormikSwitch = <FormState extends GenericForm>({
  name,
  onChange: _onChange,
  ...props
}: FormikSwitchProps<FormState>) => {
  const [{ value }, { error }, { setValue }] = useField<boolean>(name);

  return (
    <Flex vertical align="start">
      <Switch
        data-name={name}
        onChange={(updatedValue, event) => {
          setValue(updatedValue);
          _onChange?.(updatedValue, event);
        }}
        value={value}
        {...props}
      />
      {error != null && (
        <Typography.Text type="danger">{error}</Typography.Text>
      )}
    </Flex>
  );
};

type AtomSwitchProps<State> = {
  atom: PrimitiveAtom<State>;
  getValue: (state: State) => boolean;
  nextState: (state: State, option: boolean) => State;
};

export const AtomSwitch = <State,>({
  atom,
  getValue,
  nextState,
}: AtomSwitchProps<State>) => {
  const [state, setState] = useAtom(atom);

  return (
    <Switch
      onChange={(updatedValue) => {
        setState((prev) => nextState(prev, updatedValue));
      }}
      value={getValue(state)}
    />
  );
};
