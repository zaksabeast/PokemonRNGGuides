import { TabsProps } from "antd";
import { SeedTime4Searcher } from "./searcher";
import { SeedTime4Calibrator } from "./calibrator";

export const seedToTime4Tabs: TabsProps["items"] = [
  {
    key: "searcher",
    label: "Searcher",
    children: <SeedTime4Searcher />,
  },
  {
    key: "calibrator",
    label: "Calibrator",
    children: <SeedTime4Calibrator />,
  },
];
