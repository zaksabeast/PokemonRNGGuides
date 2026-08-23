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
import { useUpdateHydration } from "./hooks/useHydrate";
import { useUserInteraction } from "./hooks/useUserInteraction";
import { resumeSharedAudioContext } from "~/utils/sharedAudio";
import { SizeContext } from "~/theme/size";

type Props = {
  updateSw: (reloadPage: boolean) => void;
};

export const App = ({ updateSw }: Props) => {
  useUpdateHydration();
  const route = useActiveRoute();
  const currentLanguage = getGuide(route).meta.translation?.language ?? "en";

  useUserInteraction(resumeSharedAudioContext);

  React.useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return (
    <StrictMode>
      <SizeContext.Provider value="large">
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
      </SizeContext.Provider>
    </StrictMode>
  );
};
