import React from "react";
import { Typography, Flex, Header, DesktopDrawer } from "~/components";
import { useScreenViewed } from "~/hooks/useScreenViewed";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { settings } from "~/settings";
import { useMaxWidthEnabled } from "~/state/contentMaxWidth";
import styled from "@emotion/styled";
import { styledPropGuard } from "~/utils/styled";

type Props = {
  children: React.ReactNode;
  trackerName?: string;
  fullWidth?: boolean;
};

export const SIDE_MARGIN = 24;

const ContentLayout = styled(
  "div",
  styledPropGuard,
)<{ $fullWidth: boolean }>(({ theme, $fullWidth }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // The document scrolls instead of this container so mobile browsers can hide their toolbars
  minHeight: `calc(100dvh - ${theme.token.layoutHeaderHeight})`,
  width: "100%",
  minWidth: 0,
  overflowX: "auto",
  gap: 24,
  boxSizing: "border-box",
  paddingLeft: $fullWidth ? 0 : SIDE_MARGIN,
  paddingRight: $fullWidth ? 0 : SIDE_MARGIN,
  marginTop: theme.token.layoutHeaderHeight,

  backgroundColor: theme.token.colorBgContainer,
  [theme.mediaQueries.up("desktop")]: {
    borderTopLeftRadius: 16,
  },
}));

const Main = styled.main(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: 24,
  backgroundColor: theme.token.colorBgContainer,
}));

const DesktopNavDrawerContainer = styled.div(({ theme }) => ({
  display: "none",
  flexDirection: "column",
  position: "sticky",
  top: theme.token.layoutHeaderHeight,
  alignSelf: "flex-start",
  height: `calc(100dvh - ${theme.token.layoutHeaderHeight})`,
  width: "100%",
  marginTop: theme.token.layoutHeaderHeight,
  maxWidth: 286,
  backgroundColor: theme.token.colorBgLayout,
  [theme.mediaQueries.up("desktop")]: {
    display: "flex",
  },
}));

const BodyContainer = styled.div(({ theme }) => ({
  flex: 1,
  width: "100%",
  display: "flex",
  backgroundColor: theme.token.colorBgLayout,
}));

const ContentContainer = styled(
  "div",
  styledPropGuard,
)<{ $useMaxWidth: boolean; $fullWidth: boolean }>(({
  theme,
  $useMaxWidth,
  $fullWidth,
}) => {
  const useMaxWidth = $useMaxWidth && !$fullWidth;
  return {
    height: "100%",
    width: "100%",
    maxWidth: useMaxWidth ? 750 : "none",
    display: "flex",
    flexDirection: "column",
    gap: 32,
    paddingTop: $fullWidth ? 0 : 24,
    [theme.mediaQueries.up("tablet")]: {
      width: useMaxWidth ? "90%" : "100%",
    },
    [theme.mediaQueries.up("desktop")]: {
      width: useMaxWidth ? "80%" : "100%",
    },
  };
});

const BottomSpace = styled.div({
  paddingBottom: 32,
});

const Footer = styled(
  "footer",
  styledPropGuard,
)<{ $fullWidth: boolean }>(({ theme, $fullWidth }) => ({
  width: "100%",
  boxSizing: "border-box",
  marginTop: 100,
  paddingTop: 24,
  paddingBottom: 36,
  paddingLeft: $fullWidth ? SIDE_MARGIN : 0,
  paddingRight: $fullWidth ? SIDE_MARGIN : 0,
  backgroundColor: "unset",
  borderTop: `1px solid ${theme.token.colorBorder}`,
}));

export const MainLayout = ({
  children,
  trackerName,
  fullWidth = false,
}: Props) => {
  const route = useActiveRoute();
  const [maxWidthEnabled, setMaxWidthEnabled] = useMaxWidthEnabled();
  useScreenViewed(trackerName ?? route);

  React.useEffect(() => {
    setMaxWidthEnabled(true);
  }, [route, setMaxWidthEnabled]);

  return (
    <>
      <Header />

      <BodyContainer>
        <DesktopNavDrawerContainer>
          <Flex flex={1} vertical p={8} overflowY="auto">
            <DesktopDrawer />
          </Flex>
        </DesktopNavDrawerContainer>
        <ContentLayout $fullWidth={fullWidth}>
          <ContentContainer
            $useMaxWidth={maxWidthEnabled}
            $fullWidth={fullWidth}
          >
            <Main>{children}</Main>
            {settings.hallOfFameSupporters.length === 0 && <BottomSpace />}
            {settings.hallOfFameSupporters.length > 0 && (
              <Footer $fullWidth={fullWidth}>
                <Typography.Text color="TextSecondary">
                  <Typography.Text strong>
                    Special thanks to our Hall of Fame supporters:{" "}
                  </Typography.Text>
                  {settings.hallOfFameSupporters
                    .map((supporter) => supporter.name)
                    .join(", ")}
                </Typography.Text>
              </Footer>
            )}
          </ContentContainer>
        </ContentLayout>
      </BodyContainer>
    </>
  );
};
