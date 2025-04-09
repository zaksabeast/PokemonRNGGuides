import React from "react";
import { Link } from "~/routes";
import { Divider, Drawer } from "antd";
import { Flex } from "./flex";
import { Typography } from "./typography";
import { useMobileNavDrawerOpen } from "~/state/navDrawer";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { settings } from "~/settings";
import { Menu } from "antd";
import {
  getGuide,
  guides,
  categories,
  Category,
  GuideMeta,
  GuideSlug,
} from "~/guides";
import { partition, groupBy } from "lodash-es";
import styled from "@emotion/styled";
import { difference, upperFirst, sortBy } from "lodash-es";
import { track } from "~/analytics";
import dayjs from "dayjs";
import { Tag } from "./tag";
import { match } from "ts-pattern";
import { Color } from "@emotion/react";

const StyledMenu = styled(Menu)({
  "&&&.ant-menu-root": {
    border: 0,
  },
});

type GuideTag = "new" | GuideMeta["tag"];

type GuideConfig = {
  color: Color;
  backgroundColor: Color;
};

type MenuItemTagProps = {
  tag: GuideTag;
  isNew: boolean;
};

const MenuItemTag = ({ tag, isNew }: MenuItemTagProps) => {
  const config = match<GuideTag, GuideConfig | null>(isNew ? "new" : tag)
    .with("new", () => ({ color: "White", backgroundColor: "Primary" }))
    .otherwise(() => null);
  const label = match<GuideTag, string>(tag)
    .with("cfw", () => "CFW")
    .otherwise(() => upperFirst(tag));
  return (
    <Flex style={{ position: "relative", left: 0 }}>
      <Tag
        width={47}
        textAlign="center"
        color={config?.color}
        backgroundColor={config?.backgroundColor}
      >
        {label}
      </Tag>
    </Flex>
  );
};

const [roughDraftGuides, finalizedGuides] = partition(
  guides,
  (guide) => guide.meta.isRoughDraft,
);

type isNew<T> = { isNew: boolean; item: T };

type MenuItem = {
  key: string;
  title: string;
  tag: GuideTag;
  label: React.ReactNode;
  icon: React.ReactNode;
};

type MenuCategory = {
  key: string;
  children: (MenuItem | MenuCategory)[];
  label: React.ReactNode;
  icon: React.ReactNode;
};

const getMenuItemFromGuide = ({
  slug,
  showIcon = true,
}: {
  slug: GuideSlug;
  showIcon?: boolean;
}): isNew<MenuItem> => {
  const meta = getGuide(slug).meta;
  const isNew = dayjs(meta.addedOn).isAfter(dayjs().subtract(7, "days"));
  return {
    isNew,
    item: {
      key: meta.slug,
      title: meta.title,
      tag: meta.tag,
      label: <Link href={meta.slug}>{meta.title}</Link>,
      icon: showIcon ? <MenuItemTag isNew={isNew} tag={meta.tag} /> : null,
    },
  };
};

const getMenuCategory = (
  category: Category,
  keyPrefix: string,
  guideItems: isNew<MenuItem>[],
): isNew<MenuCategory> => {
  const sortedGuideItems = sortBy(guideItems, ({ item }) => [
    item.tag,
    item.title,
  ]).map(({ item }) => item);
  const isNew = guideItems.some((item) => item.isNew);

  const label = match(category)
    .with("GBA Technical Documentation", () => "Technical Documentation")
    .otherwise(() => category);

  return {
    isNew,
    item: {
      key: `${keyPrefix}${category}`,
      label,
      children: sortedGuideItems,
      icon: isNew ? <MenuItemTag tag="new" isNew /> : null,
    },
  };
};

const getGuideMenu = (
  guideList: (typeof guides)[keyof typeof guides][],
  keyPrefix: string = "",
) => {
  const guidesByCategory = groupBy(guideList, (guide) => guide.meta.category);
  return categories
    .filter((category) => guidesByCategory[category] != null)
    .map((category) => {
      const guideItems = guidesByCategory[category]
        .filter((guide) => !guide.meta.hideFromNavDrawer)
        .map((guide) => getMenuItemFromGuide(guide.meta));
      return getMenuCategory(category, keyPrefix, guideItems);
    });
};

const finalizedGuideMenu = getGuideMenu(finalizedGuides);

const getMenuForCategory = (categories: Category[]) => {
  return finalizedGuideMenu.filter(({ item }) =>
    (categories as string[]).includes(item.key),
  );
};

type CategoryConfig =
  | {
      key: string;
      label: string;
      pages?: isNew<MenuItem>[];
      categories: Category[];
      children?: never;
    }
  | {
      key: string;
      label: string;
      pages?: never;
      categories?: never;
      children: ReturnType<typeof getGuideMenu>;
    };

const getCategory = ({
  key,
  label,
  pages = [],
  categories,
  children: _children,
}: CategoryConfig): isNew<MenuCategory> => {
  const subCategories = _children ?? getMenuForCategory(categories);
  const children = [...pages, ...subCategories];
  const isNew = children.some((item) => item.isNew);
  return {
    isNew,
    item: {
      key,
      label,
      children: children.map(({ item }) => item),
      icon: isNew ? <MenuItemTag tag="new" isNew /> : null,
    },
  };
};

const roughDraftPrefix = "roughDraft-";

const topLevelMenu = [
  getMenuForCategory(["Tools and Emulators"])[0].item,
  getCategory({
    key: "GB",
    label: "GB",
    categories: ["Gold, Silver, Crystal"],
  }).item,
  getCategory({
    key: "GBA",
    label: "GBA",
    categories: [
      "Ruby and Sapphire",
      "FireRed and LeafGreen",
      "Emerald",
      "GBA Technical Documentation",
    ],
    pages: [getMenuItemFromGuide({ slug: "/gba-overview", showIcon: false })],
  }).item,
  getCategory({
    key: "NDS",
    label: "NDS",
    categories: [
      "Diamond, Pearl, and Platinum",
      "HeartGold and SoulSilver",
      "Black and White",
      "Black 2 and White 2",
    ],
  }).item,
  getCategory({
    key: "3DS",
    label: "3DS",
    categories: [
      "X and Y",
      "Omega Ruby and Alpha Sapphire",
      "Sun and Moon",
      "Ultra Sun and Ultra Moon",
      "Transporter",
    ],
  }).item,
  getMenuForCategory(["Gamecube"])[0].item,
  getCategory({
    key: "Switch",
    label: "Switch",
    categories: [
      "Sword and Shield",
      "Legends Arceus",
      "Brilliant Diamond and Shining Pearl",
    ],
  }).item,
  getCategory({
    key: "Rough Drafts",
    label: "Rough Drafts",
    children: getGuideMenu(roughDraftGuides, roughDraftPrefix),
  }).item,
] satisfies (MenuItem | MenuCategory)[];

const NavDrawerContent = () => {
  const [route] = useActiveRoute();
  const [, setMobileNavDrawerOpen] = useMobileNavDrawerOpen();
  const [openKeys, setOpenedKeys] = React.useState<string[]>(() => {
    const guideMeta = getGuide(route)?.meta;
    if (route === "/" || guideMeta == null) {
      return [];
    }
    const openCategory = guideMeta.isRoughDraft
      ? `${roughDraftPrefix}${guideMeta.category}`
      : guideMeta.category;
    const openTopLevelItem = topLevelMenu.find((item) =>
      item.children.some((child) =>
        [openCategory, guideMeta.slug].includes(child.key),
      ),
    );
    return [openTopLevelItem?.key, openCategory].filter((item) => item != null);
  });

  return (
    <Flex vertical height="100%" gap={8}>
      <Flex vertical gap={16} flex={1}>
        <StyledMenu
          mode="inline"
          inlineIndent={10}
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
          onClick={() => setMobileNavDrawerOpen(false)}
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
