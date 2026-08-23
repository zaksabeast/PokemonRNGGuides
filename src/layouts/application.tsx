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
  height: "100%",
  gap: 24,
});

const BodyContainer = styled.div({
  height: "100%",
  width: "100%",
  display: "flex",
});

const ContentLayout = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: `calc(100% - ${theme.token.layoutHeaderHeight})`,
  width: "100%",
  gap: 24,
  boxSizing: "border-box",
  overflowY: "scroll",
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
