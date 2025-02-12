import React from "react";
import { Divider, Drawer } from "antd";
import { Flex } from "./flex";
import { Typography } from "./typography";
import { useMobileNavDrawerOpen } from "~/state";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { settings } from "~/settings";
import { Menu, MenuProps } from "antd";
import { getGuide, guides, categories, Category } from "~/guides";
import { partition, groupBy } from "lodash-es";
import { RouteSchema } from "~/routes/defs";
import * as tst from "ts-toolbelt";
import styled from "@emotion/styled";
import { difference } from "lodash-es";
import { track } from "~/analytics";

const StyledMenu = styled(Menu)({
  "&&&.ant-menu-root": {
    border: 0,
  },
});

type MenuItem = tst.U.NonNullable<tst.O.Required<MenuProps>["items"][number]>;

const [roughDraftGuides, finalizedGuides] = partition(
  guides,
  (guide) => guide.meta.isRoughDraft,
);

const getGuideMenu = (
  guideList: (typeof guides)[keyof typeof guides][],
  keyPrefix: string = "",
) => {
  const guidesByCategory = groupBy(guideList, (guide) => guide.meta.category);
  return categories
    .filter((category) => guidesByCategory[category] != null)
    .map((category) => ({
      key: `${keyPrefix}${category}`,
      label: category,
      children: guidesByCategory[category]
        .map((guide) => ({
          key: guide.meta.slug,
          label: guide.meta.title,
        }))
        .sort((first, second) => first.label.localeCompare(second.label)),
    })) satisfies MenuItem[];
};

const finalizedGuideMenu = getGuideMenu(finalizedGuides);

const getMenuInCategory = (categories: Category[]) => {
  return finalizedGuideMenu.filter(({ key }) =>
    (categories as string[]).includes(key),
  );
};

const topLevelMenu = [
  getMenuInCategory(["Tools and Emulators"])[0],
  {
    key: "GBA",
    label: "GBA",
    children: getMenuInCategory([
      "Ruby and Sapphire",
      "FireRed and LeafGreen",
      "Emerald",
    ]),
  },
  {
    key: "NDS",
    label: "NDS",
    children: getMenuInCategory([
      "Diamond, Pearl, and Platinum",
      "HeartGold and SoulSilver",
      "Black and White",
      "Black 2 and White 2",
    ]),
  },
  {
    key: "3DS",
    label: "3DS",
    children: getMenuInCategory([
      "X and Y",
      "Omega Ruby and Alpha Sapphire",
      "Sun and Moon",
      "Ultra Sun and Ultra Moon",
      "Transporter",
    ]),
  },
  getMenuInCategory(["Gamecube"])[0],
  {
    key: "Switch",
    label: "Switch",
    children: getMenuInCategory([
      "Sword and Shield",
      "Legends Arceus",
      "Brilliant Diamond and Shining Pearl",
    ]),
  },
  {
    key: "Rough Drafts",
    label: "Rough Drafts",
    children: getGuideMenu(roughDraftGuides, "roughDraft-"),
  },
] satisfies MenuItem[];

const NavDrawerContent = () => {
  const [route, setRoute] = useActiveRoute();
  const [, setMobileNavDrawerOpen] = useMobileNavDrawerOpen();
  const [openKeys, setOpenedKeys] = React.useState<string[]>(() => {
    const openCategory = route === "/" ? null : getGuide(route)?.meta?.category;
    const openTopLevelItem = topLevelMenu.find((item) =>
      item.children.some((child) => child.key === openCategory),
    );
    return [openTopLevelItem?.key, openCategory].filter((item) => item != null);
  });

  return (
    <Flex vertical height="100%" gap={8}>
      <Flex vertical gap={16} flex={1}>
        <StyledMenu
          mode="inline"
          inlineIndent={16}
          items={topLevelMenu}
          defaultSelectedKeys={[route]}
          openKeys={openKeys}
          onOpenChange={(updatedKeys) => {
            const newKeys = difference(updatedKeys, openKeys);
            if (newKeys.length === 1) {
              track("NavDrawer Open Category", { category: newKeys[0] });
            }
            if (newKeys.length > 1) {
              track("NavDrawer Open Multiple Categories", {});
            }
            setOpenedKeys(updatedKeys);
          }}
          onClick={(event) => {
            const parsedRoute = RouteSchema.safeParse(event.key);
            const safeRoute = parsedRoute.success ? parsedRoute.data : "/";
            setMobileNavDrawerOpen(false);
            setRoute(safeRoute);
          }}
        />
      </Flex>
      <Divider />
      <Flex vertical gap={16}>
        <Typography>Build {settings.gitCommit}</Typography>
        <Typography>
          Updated {settings.isoBuildDate.format("MMM D, YYYY h:mma")}
        </Typography>
      </Flex>
    </Flex>
  );
};

export const MobileDrawer = () => {
  const [mobileNavDrawerOpen, setMobileNavDrawerOpen] =
    useMobileNavDrawerOpen();
  return (
    <Drawer
      title="PokemonRNG.com"
      placement="left"
      open={mobileNavDrawerOpen}
      onClose={() => setMobileNavDrawerOpen(false)}
      styles={{ wrapper: { width: 300 } }}
    >
      <NavDrawerContent />
    </Drawer>
  );
};

export const DesktopDrawer = () => {
  return (
    <Flex vertical flex={1}>
      <NavDrawerContent />
    </Flex>
  );
};
