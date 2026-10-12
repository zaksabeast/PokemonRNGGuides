import styled from "@emotion/styled";
import { Switch as AntdSwitch, SwitchProps as AntdSwitchProps } from "antd";
import { useField } from "~/hooks/form";
import * as tst from "ts-toolbelt";
import { FormFieldProps, GenericForm } from "~/types/form";
import { withCss } from "./withCss";
import { Flex } from "./flex";
import { Typography } from "./typography";
import { PrimitiveAtom, useAtom } from "jotai";

const StyledSwitch = styled(AntdSwitch)(({ theme }) => ({
  // active
  "&&&.ant-switch-checked": {
    background: theme.token.colorPrimary,
    ":hover": {
      background: theme.token.colorPrimaryHover,
    },
    ".ant-switch-handle": {
      "::before": {
        backgroundColor: theme.token.colorPrimaryBg,
      },
    },
  },

  // inactive
  "&&&": {
    backgroundColor: theme.token.colorFillTertiary,
    ".ant-switch-handle": {
      "::before": {
        backgroundColor: theme.token.colorTextTertiary,
      },
    },
    ":hover": {
      background: theme.token.colorFillSecondary,
    },
  },
}));

export const Switch = withCss(StyledSwitch);

type FormikSwitchProps<FormState extends GenericForm> = tst.O.Merge<
  Pick<AntdSwitchProps, "onChange">,
  FormFieldProps<
    FormState,
    boolean,
    Omit<AntdSwitchProps, "checked" | "defaultChecked">
  >
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
        {...props}
        data-name={name}
        onChange={(updatedValue, event) => {
          setValue(updatedValue);
          _onChange?.(updatedValue, event);
        }}
        value={value}
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
