import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const fadeInOut = keyframes({
  "0%,100%": { opacity: 0 },
  "50%": { opacity: 1 },
});

export const MapGlow = styled.div({
  position: "absolute",
  inset: 0,
  display: "grid",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  opacity: 0,
  transition: "opacity 0.2s ease-in-out",
  "&:hover": {
    opacity: 1,
    animation: `${fadeInOut} 2s ease-in-out infinite`,
  },
});
