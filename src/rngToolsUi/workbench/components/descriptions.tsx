import { Descriptions as AntdDescriptions } from "antd";
import styled from "@emotion/styled";

export const Descriptions = styled(AntdDescriptions)({
  ".ant-descriptions-view": { border: "none !important" },
  ".ant-descriptions-row": { border: "none !important" },
  ".ant-descriptions-item-content": {
    padding: "0 !important",
    border: "none !important",
  },
  ".ant-descriptions-item-label": {
    backgroundColor: "unset !important",
    border: "none !important",
    paddingTop: "10px !important",
    paddingBottom: "10px !important",
    paddingLeft: "24px !important",
    paddingRight: "24px !important",
  },
});
