import React from "react";
import styled from "@emotion/styled";
import { SWITCH_ROW_INSET, SwitchGroupContext } from "./switchContext";

const Container = styled.div(({ theme }) => ({
  paddingBlock: 4,
  borderRadius: theme.shape.largeIncreased,
  backgroundColor: theme.token.colorBgContainer,
  "& > * + *::before": {
    content: '""',
    display: "block",
    height: 1,
    marginInline: SWITCH_ROW_INSET,
    backgroundColor: theme.token.colorBorderSecondary,
  },
}));

type Props = {
  children: React.ReactNode;
};

export const SwitchGroup = ({ children }: Props) => (
  <SwitchGroupContext.Provider value>
    <Container>{children}</Container>
  </SwitchGroupContext.Provider>
);
