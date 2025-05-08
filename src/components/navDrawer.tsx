import React from "react";
import { Link } from "~/routes";
import { Menu, MenuProps, Drawer } from "antd";
import { Flex } from "./flex";
import { Divider } from "./divider";
import { Typography } from "./typography";
import { useMobileNavDrawerOpen } from "~/state/navDrawer";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { settings } from "~/settings";
import { getGuide, guides, categories, Category, GuideMeta } from "~/guides";
import { difference, upperFirst, sortBy, groupBy } from "lodash-es";
import styled from "@emotion/styled";
import { track } from "~/analytics";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Tag } from "./tag";
import { match } from "ts-pattern";
import { Color } from "@emotion/react";
import * as tst from "ts-toolbelt";

dayjs.extend(utc);

type MenuItemTagProps = {
  tag: GuideTag;
};

const MenuItemTag = ({ tag }: MenuItemTagProps) => {
  const config = match<GuideTag, GuideConfig | null>(tag)
    .with("new", () => ({
      color: "TextLightSolid",
      backgroundColor: "Primary",
    }))
    .otherwise(() => null);
  const label = match<GuideTag, string | null>(tag)
    .with("challenge", () => null)
    .with("cfw", () => "CFW")
    .otherwise(() => upperFirst(tag));

  if (label == null) {
    return null;
  }

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

type MenuItem = {
  type: "menuItem";
  key: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  tag: GuideTag;
};

type MenuCategory = {
  type: "menuCategory";
  key: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  children: (MenuItem | MenuCategory)[];
};

type RootCategory = {
  label: string;
  categories: Readonly<Category[]>;
  isRoughDraft?: true;
};

const rootCategories: RootCategory[] = [
  { label: "GB", categories: ["Gold, Silver, Crystal"] },
  {
    label: "GBA",
    categories: [
      "GBA Tools",
      "Ruby and Sapphire",
      "FireRed and LeafGreen",
      "Emerald",
      "GBA Technical Documentation",
    ],
  },
  {
    label: "NDS",
    categories: [
      "NDS Tools",
      "Diamond, Pearl, and Platinum",
      "HeartGold and SoulSilver",
      "Black and White",
      "Black 2 and White 2",
    ],
  },
  {
    label: "3DS",
    categories: [
      "3DS Tools",
      "X and Y",
      "Omega Ruby and Alpha Sapphire",
      "Sun and Moon",
      "Ultra Sun and Ultra Moon",
      "Transporter",
    ],
  },
  { label: "Gamecube", categories: [] },
  {
    label: "Switch",
    categories: [
      "Switch Tools",
      "Sword and Shield",
      "Legends Arceus",
      "Brilliant Diamond and Shining Pearl",
    ],
  },
  { label: "Rough Drafts", categories, isRoughDraft: true },
];

const tagOrder: GuideMeta["tag"][] = [
  "info",
  "challenge",
  "any",
  "cfw",
  "emu",
  "retail",
];

const guideByCategory = groupBy(guides, (guide) => guide.meta.category);

const roughDraftPrefix = "roughDraft-";

const addPrefix = ({
  key,
  isRoughDraft,
}: {
  key: string;
  isRoughDraft: boolean;
}) => (isRoughDraft ? `${roughDraftPrefix}${key}` : key);

const getMenuItem = (guide: GuideMeta): isNew<MenuItem> => {
  const isNew = dayjs
    .utc(guide.addedOn)
    .isAfter(dayjs.utc().subtract(7, "days"));
  const tag = isNew ? "new" : guide.tag;
  return {
    isNew,
    item: {
      type: "menuItem",
      key: addPrefix({
        key: guide.slug,
        isRoughDraft: guide.isRoughDraft,
      }),
      label: <Link href={guide.slug}>{guide.navDrawerTitle}</Link>,
      tag: guide.tag,
      icon: <MenuItemTag tag={tag} />,
    },
  };
};

const shouldShowGuide = ({
  guide,
  showRoughDrafts,
}: {
  guide: GuideMeta;
  showRoughDrafts: boolean;
}) => {
  if (guide.translation != null) {
    return null;
  }

  if (guide.hideFromNavDrawer) {
    return null;
  }

  return showRoughDrafts ? guide.isRoughDraft : !guide.isRoughDraft;
};

const getMenuItems = ({
  guides,
  isRoughDraft,
}: {
  guides: GuideMeta[];
  isRoughDraft: boolean;
}): isNew<MenuItem[]> | null => {
  const filteredGuides = guides.filter((guide) =>
    shouldShowGuide({ guide, showRoughDrafts: isRoughDraft }),
  );

  if (filteredGuides.length === 0) {
    return null;
  }

  const sortedGuides = sortBy(filteredGuides, (guide) => guide.navDrawerTitle);
  const menuItems = sortedGuides.map(getMenuItem);
  return {
    isNew: menuItems.some(({ isNew }) => isNew),
    item: menuItems.map(({ item }) => item),
  };
};

const getMiddleCategory = ({
  category,
  isRoughDraft,
}: {
  category: Category;
  isRoughDraft: boolean;
}): isNew<MenuItem | MenuCategory> | null => {
  const guides = category == null ? null : guideByCategory[category];

  if (guides == null) {
    return null;
  }

  const guidesByTag = groupBy(guides, (guide) => guide.meta.tag);

  const navItems = tagOrder
    .filter((tag) => guidesByTag[tag] != null)
    .flatMap((guide) => {
      return getMenuItems({
        isRoughDraft,
        guides: guidesByTag[guide].map((guide) => guide.meta),
      });
    })
    .filter((item) => item != null);

  if (navItems.length === 0) {
    return null;
  }

  const isNew = navItems.some(({ isNew }) => isNew);

  const label = match(category)
    .with("GBA Tools", () => "Tools")
    .with("NDS Tools", () => "Tools")
    .with("3DS Tools", () => "Tools")
    .with("Switch Tools", () => "Tools")
    .with("USUM Challenges", () => "USUM")
    .with("GBA Technical Documentation", () => "Technical Documentation")
    .otherwise(() => category);

  return {
    isNew,
    item: {
      label,
      type: "menuCategory",
      key: addPrefix({
        key: category,
        isRoughDraft,
      }),
      children: navItems.flatMap(({ item }) => item),
      icon: isNew ? <MenuItemTag tag="new" /> : null,
    },
  };
};

const getRootCategory = (rootCategory: RootCategory): MenuCategory => {
  const isRoughDraft = !!rootCategory.isRoughDraft;
  const middleCategories = rootCategory.categories
    .map((category) => {
      return getMiddleCategory({
        category,
        isRoughDraft,
      });
    })
    .filter((category) => category != null);

  return {
    type: "menuCategory",
    key: addPrefix({
      key: rootCategory.label,
      isRoughDraft,
    }),
    label: rootCategory.label,
    children: middleCategories.map(({ item }) => item),
    icon: middleCategories.some((item) => item.isNew) ? (
      <MenuItemTag tag="new" />
    ) : null,
  };
};

const guideMenu = rootCategories.map(getRootCategory);

// Stricter item types
type StyledMenuProps = tst.O.Overwrite<MenuProps, { items: MenuCategory[] }>;
const StyledMenu = styled(Menu as unknown as React.FC<StyledMenuProps>)({
  "&&&.ant-menu-root": {
    border: 0,
  },
});

type GuideTag = "new" | GuideMeta["tag"];

type GuideConfig = {
  color: Color;
  backgroundColor: Color;
};

type isNew<T> = { isNew: boolean; item: T };

const challengeCategories: RootCategory[] = [
  {
    label: "Challenges",
    categories: ["USUM Challenges"],
  },
];

const challengesMenu: MenuCategory[] = challengeCategories.map(getRootCategory);

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
    const openTopLevelItem = [...challengesMenu, ...guideMenu].find((item) =>
      item.type === "menuCategory"
        ? item.children.some((child) =>
            [openCategory, guideMeta.slug].includes(child.key),
          )
        : item.key === guideMeta.slug,
    );
    return [openTopLevelItem?.key, openCategory].filter((item) => item != null);
  });

  const onOpenChange = React.useCallback(
    (updatedKeys: string[]) => {
      const newKeys = difference(updatedKeys, openKeys);
      if (newKeys.length === 1) {
        track("NavDrawer Open Category", { category: newKeys[0] });
      }
      if (newKeys.length > 1) {
        track("NavDrawer Open Multiple Categories", {});
      }
      setOpenedKeys(updatedKeys);
    },
    [openKeys],
  );

  return (
    <Flex vertical height="100%" gap={8}>
      <Flex vertical flex={1}>
        <StyledMenu
          mode="inline"
          inlineIndent={10}
          items={challengesMenu}
          defaultSelectedKeys={[route]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={() => setMobileNavDrawerOpen(false)}
        />
        <Divider mv={16} />
        <StyledMenu
          mode="inline"
          inlineIndent={10}
          items={guideMenu}
          defaultSelectedKeys={[route]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={() => setMobileNavDrawerOpen(false)}
        />
      </Flex>
      <Divider />
      <Flex vertical gap={16}>
        <Typography>Build {settings.gitCommit}</Typography>
      </Flex>
    </Flex>
  );
};

const mobileNavDrawerStyles = { wrapper: { width: 300 } };

export const MobileDrawer = () => {
  const [mobileNavDrawerOpen, setMobileNavDrawerOpen] =
    useMobileNavDrawerOpen();
  return (
    <Drawer
      title="PokemonRNG.com"
      placement="left"
      open={mobileNavDrawerOpen}
      onClose={() => setMobileNavDrawerOpen(false)}
      styles={mobileNavDrawerStyles}
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
