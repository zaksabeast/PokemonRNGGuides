import React from "react";
import { track } from "~/analytics";

export const useScreenViewed = (screenName: string) => {
  React.useEffect(() => {
    track("Screen Viewed", { screen: screenName });
  }, [screenName]);
};
