import styled from "@emotion/styled";
import { KeepScale } from "react-zoom-pan-pinch";
import { styledPropGuard } from "~/utils/styled";

export const MapKeepScale = styled(
  KeepScale,
  styledPropGuard,
)<{ $transformOrigin?: string }>(({ $transformOrigin }) => ({
  transformOrigin: $transformOrigin ?? "bottom center",
}));
