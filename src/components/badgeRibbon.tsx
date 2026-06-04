import { Badge } from "antd";
import styled from "@emotion/styled";
import { styledPropGuard } from "~/utils/styled";

export const BadgeRibbon = styled(
  Badge.Ribbon,
  styledPropGuard,
)<{ $show: boolean }>(({ $show }) => ({
  display: $show ? "flex" : "none",
}));
