import { Router } from "~/routes/router";
import { MobileDrawer } from "~/components";
import { Flex } from "~/components";

export const App = () => {
  return (
    <Flex height="100vh" vertical backgroundColor="BgBase">
      <MobileDrawer />
      <Router />
    </Flex>
  );
};
