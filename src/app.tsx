import React, { StrictMode } from "react";
import { Router } from "~/routes/router";
import { Flex } from "~/components";
import { App as AntdApp } from "antd";
import { ThemeProvider } from "~/theme/provider";
import { MDXProvider } from "@mdx-js/react";
import { markdownComponents } from "~/markdownExports";
import { PageLanguageContext } from "~/markdownExports/languageContext";
import { NeedsUpdateNotification } from "~/swRefresh/notification";
import { useActiveRoute } from "./hooks/useActiveRoute";
import { getGuide } from "./guides";

type Props = {
  updateSw: (reloadPage: boolean) => void;
};

export const App = ({ updateSw }: Props) => {
  const route = useActiveRoute();
  const currentLanguage = getGuide(route).meta.translation?.language ?? "en";

  React.useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return (
    <StrictMode>
      <ThemeProvider>
        <AntdApp>
          <PageLanguageContext.Provider value={currentLanguage}>
            <MDXProvider components={markdownComponents}>
              <NeedsUpdateNotification updateSw={updateSw} />
              <Flex height="100vh" vertical backgroundColor="BgBase">
                <Router />
              </Flex>
            </MDXProvider>
          </PageLanguageContext.Provider>
        </AntdApp>
      </ThemeProvider>
    </StrictMode>
  );
};
