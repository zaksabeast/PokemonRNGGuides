import { TabsProps } from "antd";
import { Gen4AdvanceFinderTab } from "./advanceFinder";

export const advanceFinder4Tabs: TabsProps["items"] = [
  {
    key: "advance-finder4",
    label: "Chatot/Elm Tracker",
    children: <Gen4AdvanceFinderTab />,
  },
];
