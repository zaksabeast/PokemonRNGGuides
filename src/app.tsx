import React, { StrictMode } from "react";
import { Router } from "~/routes/router";
import { Flex, MobileDrawer } from "~/components";
import { App as AntdApp } from "antd";
import { ThemeProvider } from "~/theme/provider";
import { MDXProvider } from "@mdx-js/react";
import { markdownComponents } from "~/markdownExports";
import { NeedsUpdateNotification } from "~/swRefresh/notification";
import { initRngTools } from "./rngTools";

const InnerApp = () => {
  return (
    <Flex height="100vh" vertical backgroundColor="BgBase">
      <MobileDrawer />
      <Router />
    </Flex>
  );
};

type Props = {
  updateSw: (reloadPage: boolean) => void;
};

export const App = ({ updateSw }: Props) => {
  React.useEffect(() => {
    initRngTools();
  }, []);

  return (
    <StrictMode>
      <ThemeProvider>
        <AntdApp>
          <MDXProvider components={markdownComponents}>
            <NeedsUpdateNotification updateSw={updateSw} />
            <InnerApp />
          </MDXProvider>
        </AntdApp>
      </ThemeProvider>
    </StrictMode>
  );
};
