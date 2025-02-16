import {
  Input as AntdInput,
  InputProps as AntdInputProps,
  InputRef,
} from "antd";
import React from "react";
import styled from "@emotion/styled";

const InputContainer = styled.div<{ fullFlex?: boolean }>(({ fullFlex }) => ({
  flex: fullFlex ? 1 : undefined,
  ".ant-input": {
    fontSize: 20,
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    outline: "none",
    boxShadow: "none",
    borderRadius: 0,
  },
  ".ant-input-group-addon": {
    fontSize: 20,
    backgroundColor: "unset",
    border: "unset",
    borderRadius: "unset",
  },
}));

type InputProps = {
  fullFlex?: boolean;
  autoFocus?: boolean;
} & AntdInputProps;

export const Input = ({ fullFlex, autoFocus, ...props }: InputProps) => {
  const inputRef = React.useRef<InputRef>(null);

  React.useEffect(() => {
    if (autoFocus && inputRef.current != null) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <InputContainer fullFlex={fullFlex}>
      <AntdInput size="large" ref={inputRef} {...props} />
    </InputContainer>
  );
};
