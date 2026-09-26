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

  // The page keeps its scroll position across routes, so we need to reset it.
  // Only do this for when wouter navigates (the pushState event)
  // so back/forward keep the browser's restored position.
  React.useEffect(() => {
    const scrollToTop = () => window.scrollTo(0, 0);
    window.addEventListener("pushState", scrollToTop);
    return () => window.removeEventListener("pushState", scrollToTop);
  }, []);

  return (
    <StrictMode>
      <SizeContext.Provider value="medium">
        <ThemeProvider>
          <AntdApp>
            <PageLanguageContext.Provider value={currentLanguage}>
              <MDXProvider components={markdownComponents}>
                <NeedsUpdateNotification updateSw={updateSw} />
                <Flex minHeight="100dvh" vertical backgroundColor="BgBase">
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
