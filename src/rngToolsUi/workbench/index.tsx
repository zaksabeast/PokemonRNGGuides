import { match } from "ts-pattern";
import { Flex } from "~/components";
import { profileTabs } from "./tools/profile/tabs";
import { ivCalcTabs } from "./tools/ivCalc/tabs";
import { emeraldEggTabs } from "./tools/gen3/emeraldEgg/tabs";
import { Tabs, Menu, MenuProps } from "antd";
import styled from "@emotion/styled";
import { SizeContext } from "~/theme/size";
import { useAtom } from "jotai";
import { static4Tabs } from "./tools/gen4/static/tabs";
import { routeAtom, WorkbenchRoute } from "./state";
import { advanceFinder4Tabs } from "./tools/gen4/advanceFinder/tabs";
import { seedToTime4Tabs } from "./tools/gen4/seedToTime/tabs";

const FullHeight = styled(Flex)(({ theme }) => ({
  // Header + Menu
  height: `calc(100vh - ${theme.token.layoutHeaderHeight} - ${theme.token.layoutHeaderHeight})`,
}));

const FullHeightTabs = styled(Tabs)({
  height: "100%",
  ".ant-tabs-content": {
    height: "100%",
  },
  ".ant-tabs-tabpane": {
    height: "100%",
  },
});

const Content = () => {
  const [route] = useAtom(routeAtom);
  return match(route)
    .with("profile", () => <FullHeightTabs items={profileTabs} type="card" />)
    .with("static4", () => <FullHeightTabs items={static4Tabs} type="card" />)
    .with("iv-calc", () => <FullHeightTabs items={ivCalcTabs} type="card" />)
    .with("emerald-egg", () => (
      <FullHeightTabs items={emeraldEggTabs} type="card" />
    ))
    .with("advance-finder4", () => (
      <FullHeightTabs items={advanceFinder4Tabs} type="card" />
    ))
    .with("seed-to-time4", () => {
      return <FullHeightTabs items={seedToTime4Tabs} type="card" />;
    })
    .exhaustive();
};

type MenuItem = Required<MenuProps>["items"][number];

export const RngWorkbench = () => {
  const [route, setRoute] = useAtom(routeAtom);

  const createSubItem = ({
    route,
    label,
  }: {
    route: WorkbenchRoute;
    label: string;
  }) => {
    return {
      key: route,
      label: label,
      onClick: () => setRoute(route),
    };
  };

  const menuItems: MenuItem[] = [
    {
      key: "g3",
      label: "Gen 3 Tools",
      type: "submenu",
      children: [createSubItem({ route: "emerald-egg", label: "Emerald Egg" })],
    },
    {
      key: "g4",
      label: "Gen 4 Tools",
      type: "submenu",
      children: [
        createSubItem({ route: "static4", label: "Static" }),
        createSubItem({ route: "seed-to-time4", label: "Seed to Time" }),
        createSubItem({
          route: "advance-finder4",
          label: "Chatot/Elm Tracker",
        }),
      ],
    },
    {
      key: "extra",
      label: "Extra Tools",
      type: "submenu",
      children: [
        createSubItem({ route: "profile", label: "Profile Manager" }),
        createSubItem({ route: "iv-calc", label: "IV Calculator" }),
      ],
    },
  ];

  return (
    <SizeContext.Provider value="medium">
      <FullHeight vertical>
        <Flex vertical width="100%" mb={8}>
          <Menu items={menuItems} mode="horizontal" selectedKeys={[route]} />
        </Flex>
        <Content />
      </FullHeight>
    </SizeContext.Provider>
  );
};
