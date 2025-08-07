import React from "react";
import { Link } from "./link";
import { Menu, MenuProps } from "antd";
import { Flex } from "./flex";
import { Divider } from "./divider";
import { Typography } from "./typography";
import { settings } from "~/settings";
import {
  Category,
  categoryHasNewContent,
  categoryOwners,
  CategorySlug,
  getGuide,
} from "~/guides";
import styled from "@emotion/styled";
import { Tag } from "./tag";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { MenuItemType, SubMenuType } from "antd/es/menu/interface";
import * as tst from "ts-toolbelt";

const NewTag = () => {
  return (
    <Tag
      width={47}
      textAlign="center"
      color="TextLightSolid"
      backgroundColor="Primary"
    >
      New
    </Tag>
  );
};

type MenuItem = Required<MenuProps>["items"][number];

type SubMenuItem = {
  label: string;
  href: CategorySlug;
};

const createMenuItem = ({
  label,
  href,
}: SubMenuItem): { item: MenuItemType; isNew: boolean } => {
  const isNew = categoryHasNewContent(href);
  const item: MenuItemType = {
    type: "item",
    key: href,
    icon: isNew ? <NewTag /> : null,
    label: <Link href={href}>{label}</Link>,
  };

  return { isNew, item };
};

type Menu = {
  label: string;
  items: SubMenuItem[];
  categories: Category[];
};

type StrictSubMenu = tst.O.Overwrite<SubMenuType, { label: string }> & {
  categories: Category[];
};

const createMenu = ({ label, items, categories }: Menu): StrictSubMenu => {
  let isNew = false;
  const children = items.map((item) => {
    const { isNew: itemIsNew, item: menuItem } = createMenuItem(item);
    if (itemIsNew) {
      isNew = true;
    }
    return menuItem;
  });

  return {
    label,
    type: "submenu",
    icon: isNew ? <NewTag /> : null,
    children,
    key: label,
    categories,
  };
};

const gameMenu = [
  createMenu({
    label: "GB",
    items: [{ label: "Crystal", href: "/crystal/" }],
    categories: ["Gold, Silver, Crystal"],
  }),
  createMenu({
    label: "GBA",
    items: [
      { label: "Ruby and Sapphire", href: "/ruby-and-sapphire/" },
      { label: "FireRed and LeafGreen", href: "/fire-red-and-leaf-green/" },
      { label: "Emerald", href: "/emerald/" },
    ],
    categories: [
      "GBA Tools",
      "Ruby and Sapphire",
      "FireRed and LeafGreen",
      "Emerald",
      "GBA Technical Documentation",
    ],
  }),
  createMenu({
    label: "Gamecube",
    items: [{ label: "Colosseum / Gales", href: "/gamecube/" }],
    categories: ["Gamecube"],
  }),
  createMenu({
    label: "NDS",
    items: [
      {
        label: "Diamond, Pearl, and Platinum",
        href: "/diamond-pearl-and-platinum/",
      },
      {
        label: "Heart Gold and Soul Silver",
        href: "/heart-gold-and-soul-silver/",
      },
      { label: "Black and White", href: "/black-and-white/" },
      { label: "Black 2 and White 2", href: "/black-2-and-white-2/" },
    ],
    categories: [
      "NDS Tools",
      "Diamond, Pearl, and Platinum",
      "HeartGold and SoulSilver",
      "Black and White",
      "Black 2 and White 2",
    ],
  }),
  createMenu({
    label: "3DS",
    items: [
      {
        label: "Pokemon Transporter and Dream Radar",
        href: "/transporter-dream-radar/",
      },
      { label: "X and Y", href: "/x-and-y/" },
      {
        label: "Omega Ruby and Alpha Sapphire",
        href: "/omega-ruby-and-alpha-sapphire/",
      },
      { label: "Sun and Moon", href: "/sun-and-moon/" },
      {
        label: "Ultra Sun and Ultra Moon",
        href: "/ultra-sun-and-ultra-moon/",
      },
    ],
    categories: [
      "3DS Tools",
      "X and Y",
      "Omega Ruby and Alpha Sapphire",
      "Sun and Moon",
      "Ultra Sun and Ultra Moon",
      "Transporter and Dream Radar",
    ],
  }),
  createMenu({
    label: "Switch",
    items: [
      { label: "Sword and Shield", href: "/sword-and-shield/" },
      {
        label: "Brilliant Diamond and Shining Pearl",
        href: "/brilliant-diamond-and-shining-pearl/",
      },
    ],
    categories: [
      "Switch Tools",
      "Sword and Shield",
      "Legends Arceus",
      "Brilliant Diamond and Shining Pearl",
    ],
  }),
] as const satisfies MenuItem[];

const StyledMenu = styled(Menu)({
  "&&&.ant-menu-root": {
    border: 0,
  },
});

const NavDrawerContent = React.memo(() => {
  const route = useActiveRoute();
  const guideMeta = getGuide(route).meta;

  const openKey1 = gameMenu.find(
    (menu) =>
      menu.categories.includes(guideMeta.categories[0]) ||
      menu.children.some((item) => item?.key === route),
  )?.key;
  const openKey2 = categoryOwners[guideMeta.categories[0]];
  const openKeys = [openKey1, openKey2, route].filter((key) => key != null);

  return (
    <Flex vertical height="100%" gap={8}>
      <Flex vertical flex={1}>
        <StyledMenu
          mode="inline"
          inlineIndent={10}
          items={gameMenu}
          defaultOpenKeys={openKeys}
          defaultSelectedKeys={openKeys}
        />
      </Flex>
      <Divider />
      <Flex vertical gap={16}>
        <Typography>Build {settings.gitCommit}</Typography>
      </Flex>
    </Flex>
  );
});

export const DesktopDrawer = () => {
  return (
    <Flex vertical flex={1}>
      <NavDrawerContent />
    </Flex>
  );
};
