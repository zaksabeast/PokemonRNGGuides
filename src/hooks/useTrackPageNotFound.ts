import React from "react";
// We really do want useLocation here to track any page viewed, not just routes.
// eslint-disable-next-line no-restricted-imports
import { useLocation } from "wouter";
import { track } from "~/analytics";

export const useTrackPageNotFound = () => {
  const [location] = useLocation();
  React.useEffect(() => {
    track("Page not found", { location });
  }, [location]);
};
