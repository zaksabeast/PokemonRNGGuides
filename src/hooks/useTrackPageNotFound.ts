import React from "react";
import { useLocation } from "wouter";
import { track } from "~/analytics";

export const useTrackPageNotFound = () => {
  const [location] = useLocation();
  React.useEffect(() => {
    track("Page not found", { location });
  }, [location]);
};
