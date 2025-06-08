import { Badge } from "antd";
import styled from "@emotion/styled";

export const BadgeRibbon = styled(Badge.Ribbon)<{ $show: boolean }>(
  ({ $show }) => ({
    display: $show ? "flex" : "none",
  }),
);
