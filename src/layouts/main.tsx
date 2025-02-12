import React from "react";
import { Flex, Header, HeaderSpace, DesktopDrawer } from "~/components";
import styled from "@emotion/styled";
import { useScreenViewed } from "~/hooks/useScreenViewed";

type Props = {
  children: React.ReactNode;
  trackerName: string;
};

export const SIDE_MARGIN = 24;

const Main = styled.main({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
  width: "100%",
  gap: 24,
  boxSizing: "border-box",
  paddingLeft: SIDE_MARGIN,
  paddingRight: SIDE_MARGIN,
  overflowY: "scroll",
});

const DesktopNavDrawerContainer = styled.div(({ theme }) => ({
  display: "none",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  maxWidth: 300,
  backgroundColor: "white",
  borderRight: "2px solid #f0f0f0",
  [theme.mediaQueries.up("desktop")]: {
    display: "flex",
  },
}));

const BodyContainer = styled.div({
  height: "100%",
  width: "100%",
  display: "flex",
});

const ContentContainer = styled.div(({ theme }) => ({
  height: "100%",
  width: "100%",
  maxWidth: 750,
  display: "flex",
  flexDirection: "column",
  gap: 24,
  [theme.mediaQueries.up("tablet")]: {
    width: "90%",
  },
  [theme.mediaQueries.up("desktop")]: {
    width: "80%",
  },
}));

const BottomSpace = styled.div({
  paddingBottom: 32,
});

export const MainLayout = ({ children, trackerName }: Props) => {
  useScreenViewed(trackerName);

  return (
    <>
      <Header />

      <BodyContainer>
        <DesktopNavDrawerContainer>
          <HeaderSpace />
          <Flex flex={1} vertical p={16} overflowY="scroll">
            <DesktopDrawer />
          </Flex>
        </DesktopNavDrawerContainer>
        <Main>
          <ContentContainer>
            <HeaderSpace />
            {children}
            <BottomSpace />
          </ContentContainer>
        </Main>
      </BodyContainer>
    </>
  );
};
