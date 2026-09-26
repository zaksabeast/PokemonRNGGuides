import styled from "@emotion/styled";
import { Flex } from "~/components";
import { Hero } from "./hero";
import { Starters } from "./starters";
import { LatestUpdates } from "./latestUpdates";
import { GameDirectory } from "./gameDirectory";
import { homeContainerStyles, homeQueries } from "./styles";

const HomeContainer = styled.div({
  ...homeContainerStyles,
  width: "100%",
});

const HomeContent = styled(Flex)(({ theme }) => ({
  "&&": {
    flexDirection: "column",
    gap: 56,
    maxWidth: 1200,
    margin: "0 auto",
    padding: "48px 64px 64px",
    boxSizing: "border-box",
    color: theme.token.colorText,
    [homeQueries.mobile]: {
      gap: 28,
      padding: "8px 16px 32px",
    },
  },
}));

export const HomePageComponent = () => {
  return (
    <HomeContainer>
      <HomeContent>
        <Hero />
        <Starters />
        <LatestUpdates />
        <GameDirectory />
      </HomeContent>
    </HomeContainer>
  );
};
