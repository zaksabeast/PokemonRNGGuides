import React from "react";
import { Header } from "~/components";
import { useScreenViewed } from "~/hooks/useScreenViewed";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import styled from "@emotion/styled";

type Props = {
  children: React.ReactNode;
  trackerName?: string;
};

const Main = styled.main({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  flex: 1,
  gap: 24,
});

const BodyContainer = styled.div({
  flex: 1,
  width: "100%",
  display: "flex",
});

const ContentLayout = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: `calc(100dvh - ${theme.token.layoutHeaderHeight})`,
  width: "100%",
  minWidth: 0,
  // Keeps wide content scrolling sideways here instead of widening the page
  overflowX: "auto",
  gap: 24,
  boxSizing: "border-box",
  marginTop: theme.token.layoutHeaderHeight,
}));

export const ApplicationLayout = ({ children, trackerName }: Props) => {
  const route = useActiveRoute();
  useScreenViewed(trackerName ?? route);

  return (
    <>
      <Header />

      <BodyContainer>
        <ContentLayout>
          <Main>{children}</Main>
        </ContentLayout>
      </BodyContainer>
    </>
  );
};
