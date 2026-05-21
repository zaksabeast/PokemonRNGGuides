import React from "react";

export const MapContext = React.createContext<{
  ref: React.RefObject<HTMLDivElement | null>;
}>({ ref: { current: null } });
