import { TabsProps } from "antd";
import { Gen3ProfileTool } from "./gen3/tab";
import { Gen4ProfileTool } from "./gen4/tab";

export const profileTabs: TabsProps["items"] = [
  {
    key: "gen3",
    label: "Gen 3 Profile",
    children: <Gen3ProfileTool />,
  },
  {
    key: "gen4",
    label: "Gen 4 Profile",
    children: <Gen4ProfileTool />,
  },
];
