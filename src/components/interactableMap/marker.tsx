import { BaseButton } from "../button";
import styled from "@emotion/styled";

export const MapMarker = styled(BaseButton)(({ theme }) => ({
  "&&&": {
    backgroundColor: theme.token.colorWhite,
    transition: "filter 0.3s ease-in-out",
    filter: `drop-shadow(0 1px 0 rgba(0,0,0,0.25))
    drop-shadow(0 3px 6px rgba(0,0,0,0.2))`,
    ":hover": {
      filter: `drop-shadow(0 1px 0 rgba(0,0,0,0.18))
    drop-shadow(0 2px 4px rgba(0,0,0,0.22))
    drop-shadow(0 6px 10px rgba(0,0,0,0.18))`,
    },
  },
  "::after": {
    content: '""',
    position: "absolute",
    bottom: -8,
    left: "50%",
    transform: "translateX(-50%)",
    width: 10,
    height: 10,
    background: theme.token.colorWhite,
    clipPath: "polygon(50% 100%, 0 0, 100% 0)",
  },
}));
