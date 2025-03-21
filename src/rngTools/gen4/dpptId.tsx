import { Tabs, TabsProps } from "antd";
import { DpptIdFinder } from "./dpptIdFinder";
import { DpptIdSearcher } from "./dpptIdSearcher";

const items: TabsProps["items"] = [
  {
    key: "search",
    label: "Searcher",
    children: <DpptIdSearcher />,
  },
  {
    key: "finder",
    label: "Finder",
    children: <DpptIdFinder />,
  },
];

export const DpptId = () => {
  return <Tabs defaultActiveKey="search" items={items} />;
};
