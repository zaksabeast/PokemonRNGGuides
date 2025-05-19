import { Skeleton, Tabs, TabsProps } from "antd";
import { Gen3Timer } from "./gen3";
import { Gen4Timer } from "./gen4";
import { Gen5Timer } from "./gen5";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { z } from "zod";
import { hydrationLock } from "~/utils/hydration";
import { useHydrate } from "~/hooks/useHydrate";
import styled from "@emotion/styled";

const TimerSkeleton = styled(Skeleton.Node)({
  "&& .ant-skeleton-image": {
    width: "100%",
    height: 300,
    borderRadius: 20,
  },
});

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
    forceRender: true,
    children: <Gen5Timer />,
  },
  {
    key: "gen4",
    label: "Gen 4",
    forceRender: true,
    children: <Gen4Timer />,
  },
  {
    key: "gen3",
    label: "Gen 3",
    forceRender: true,
    children: <Gen3Timer />,
  },
];

export const RngTimer = () => {
  const [lockedState, setLockedState] = useAtom(tabStateAtom);
  const { hydrated, client } = useHydrate(lockedState);

  if (!hydrated) {
    return <TimerSkeleton />;
  }

  return (
    <Tabs
      activeKey={client.activeTab}
      onTabClick={(activeTab) => setLockedState(hydrationLock({ activeTab }))}
      items={items}
    />
  );
};
