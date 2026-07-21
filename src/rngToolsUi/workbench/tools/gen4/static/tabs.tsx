import { TabsProps } from "antd";
import { Static4Generator } from "./generator";
import { Static4Searcher } from "./searcher";

export const static4Tabs: TabsProps["items"] = [
  {
    key: "generator",
    label: "Generator",
    children: <Static4Generator />,
  },
  {
    key: "searcher",
    label: "Searcher",
    children: <Static4Searcher />,
  },
];
