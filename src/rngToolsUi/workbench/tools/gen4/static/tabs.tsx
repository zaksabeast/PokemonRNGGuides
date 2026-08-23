import { TabsProps } from "antd";
import { Static4Generator } from "./generator";
import { Static4Searcher } from "./searcher";
import { Static4Calibrator } from "./calibrator";
import { Gen4TimerTab } from "../timer";

export const static4Tabs: TabsProps["items"] = [
  {
    key: "searcher",
    label: "Searcher",
    children: <Static4Searcher />,
  },
  {
    key: "calibrator",
    label: "Calibrator",
    children: <Static4Calibrator />,
  },
  {
    key: "generator",
    label: "Generator",
    children: <Static4Generator />,
  },
  {
    key: "timer",
    label: "Timer",
    children: <Gen4TimerTab />,
  },
];
