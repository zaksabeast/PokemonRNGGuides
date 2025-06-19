import React, { StrictMode } from "react";
import { Router } from "~/routes/router";
import { Flex } from "~/components";
import { App as AntdApp } from "antd";
import { ThemeProvider } from "~/theme/provider";
import { MDXProvider } from "@mdx-js/react";
import { markdownComponents } from "~/markdownExports";
import { NeedsUpdateNotification } from "~/swRefresh/notification";
import { useActiveRoute } from "./hooks/useActiveRoute";
import { getGuide } from "./guides";

type Props = {
  updateSw: (reloadPage: boolean) => void;
};

export const App = ({ updateSw }: Props) => {
  const route = useActiveRoute();

  React.useEffect(() => {
    const guide = getGuide(route);
    const languageCode = guide.meta.translation?.language ?? "en";
    document.documentElement.lang = languageCode;
  }, [route]);

  return (
    <StrictMode>
      <ThemeProvider>
        <AntdApp>
          <MDXProvider components={markdownComponents}>
            <NeedsUpdateNotification updateSw={updateSw} />
            <Flex height="100vh" vertical backgroundColor="BgBase">
              <Router />
            </Flex>
          </MDXProvider>
        </AntdApp>
      </ThemeProvider>
    </StrictMode>
  );
};
