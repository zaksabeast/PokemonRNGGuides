import { TabsProps } from "antd";
import { IvCalcTab } from "./ivCalc";

export const ivCalcTabs: TabsProps["items"] = [
  {
    key: "iv-calc",
    label: "IV Calculator",
    children: <IvCalcTab />,
  },
];
