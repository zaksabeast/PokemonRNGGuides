import React from "react";
import styled from "@emotion/styled";
import { Typography } from "./typography";
import { Flex } from "./flex";

type Props = {
  label: string;
  children: React.ReactNode;
  adornment?: React.ReactNode;
};

const LabelContainer = styled.div({
  ".ant-typography": {
    color: "rgb(132,144,168)",
    margin: 0,
  },
});

export const FormItem = ({ label, adornment, children }: Props) => {
  const hasAdornment = adornment != null;
  return (
    <Flex vertical gap={16}>
      <Flex
        justify={hasAdornment ? "space-between" : undefined}
        align={hasAdornment ? "flex-end" : undefined}
        flex={1}
      >
        <LabelContainer>
          <Typography.Title level={5}>{label}</Typography.Title>
        </LabelContainer>
        {adornment}
      </Flex>
      {children}
    </Flex>
  );
};
