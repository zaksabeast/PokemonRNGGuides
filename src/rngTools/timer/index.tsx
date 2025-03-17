import { Tabs, TabsProps } from "antd";
import { Gen3Timer } from "./gen3";
import { Gen4Timer } from "./gen4";
import { Gen5Timer } from "./gen5";

const items: TabsProps["items"] = [
  {
    key: "gen5",
    label: "Gen 5",
    children: <Gen5Timer />,
  },
  {
    key: "gen4",
    label: "Gen 4",
    children: <Gen4Timer />,
  },
  {
    key: "gen3",
    label: "Gen 3",
    children: <Gen3Timer />,
  },
];

export const RngTimer = () => {
  return <Tabs defaultActiveKey="gen3" items={items} />;
};
