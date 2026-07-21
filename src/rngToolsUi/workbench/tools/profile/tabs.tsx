import { TabsProps } from "antd";
import { Gen4ProfileTool } from "./gen4";

export const profileTabs: TabsProps["items"] = [
  {
    key: "gen4",
    label: "Gen 4 Profile",
    children: <Gen4ProfileTool />,
  },
];
