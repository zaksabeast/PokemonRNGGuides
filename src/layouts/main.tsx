import React from "react";
import {
  Typography,
  Flex,
  Header,
  DesktopDrawer,
  Loading,
  List,
  ListItem,
  Icon,
  SupportModal,
  Button,
} from "~/components";
import styled from "@emotion/styled";
import { useScreenViewed } from "~/hooks/useScreenViewed";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { useSupportModal } from "~/components/supportModal/state";
import { settings } from "~/settings";

type Props = {
  children: React.ReactNode;
  trackerName?: string;
};

export const SIDE_MARGIN = 24;

const ContentLayout = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: `calc(100% - ${theme.components?.Layout?.headerHeight})`,
  width: "100%",
  gap: 24,
  boxSizing: "border-box",
  paddingLeft: SIDE_MARGIN,
  paddingRight: SIDE_MARGIN,
  overflowY: "scroll",
  marginTop: theme.components?.Layout?.headerHeight,
}));

const Main = styled.main({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: 24,
});

const DesktopNavDrawerContainer = styled.div(({ theme }) => ({
  display: "none",
  flexDirection: "column",
  height: `calc(100% - ${theme.components?.Layout?.headerHeight})`,
  width: "100%",
  marginTop: theme.components?.Layout?.headerHeight,
  maxWidth: 300,
  backgroundColor: theme.token.colorBgContainer,
  borderRight: `1px solid ${theme.token.colorBorder}`,
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
  gap: 32,
  paddingTop: 24,
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

const Footer = styled.footer(({ theme }) => ({
  width: "100%",
  paddingTop: 24,
  paddingBottom: 36,
  backgroundColor: theme.token.colorBgContainer,
  borderTop: `1px solid ${theme.token.colorBorder}`,
}));

export const MainLayout = ({ children, trackerName }: Props) => {
  const route = useActiveRoute();
  const { openSupportModal } = useSupportModal();
  useScreenViewed(trackerName ?? route);

  return (
    <>
      <Header />

      <BodyContainer>
        <DesktopNavDrawerContainer>
          <Flex flex={1} vertical p={16} overflowY="scroll">
            <DesktopDrawer />
          </Flex>
        </DesktopNavDrawerContainer>
        <ContentLayout>
          <ContentContainer>
            <Main>
              <React.Suspense
                fallback={
                  <Flex
                    height="100%"
                    width="100%"
                    justify="center"
                    align="center"
                  >
                    <Loading />
                  </Flex>
                }
              >
                {children}
              </React.Suspense>
            </Main>
            {settings.discordHallOfFameSupporters.length === 0 && (
              <BottomSpace />
            )}
            {settings.discordHallOfFameSupporters.length > 0 && (
              <Footer>
                <Typography.Text strong fontSize={20}>
                  Special thanks to our Hall of Fame supporters!
                </Typography.Text>
                <List ml={24}>
                  {settings.discordHallOfFameSupporters.map((supporter) => (
                    <ListItem fontSize={18}>
                      <Flex gap={8} align="center">
                        <Icon name="Discord" color="Primary" />
                        {supporter}
                      </Flex>
                    </ListItem>
                  ))}
                </List>
                <Button
                  trackerId="support_us_footer"
                  icon={<Icon name="Heart" />}
                  type="primary"
                  backgroundColor="BrandSecondary"
                  backgroundHoverColor="BrandSecondaryHover"
                  size="middle"
                  onClick={openSupportModal}
                >
                  Want your name here?
                </Button>
              </Footer>
            )}
          </ContentContainer>
        </ContentLayout>
      </BodyContainer>
      <SupportModal />
    </>
  );
};
