import { Tabs, TabsProps } from "antd";
import { Gen3Timer } from "./gen3";
import { Gen4Timer } from "./gen4";
import { Gen5Timer } from "./gen5";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { z } from "zod";

const tabStateSchema = z.object({
  activeTab: z.string(),
});

const tabStateAtom = atomWithPersistence("rngTimerTabState", tabStateSchema, {
  activeTab: "gen3",
});

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
  const [state, setState] = useAtom(tabStateAtom);
  return (
    <Tabs
      activeKey={state.activeTab}
      onTabClick={(activeTab) => setState({ activeTab })}
      items={items}
    />
  );
};
