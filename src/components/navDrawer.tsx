import React from "react";
import { Link } from "./link";
import { Menu, MenuProps, Drawer } from "antd";
import { Flex } from "./flex";
import { Divider } from "./divider";
import { Typography } from "./typography";
import { useMobileNavDrawerOpen } from "~/state/navDrawer";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { settings } from "~/settings";
import { getGuide, guides, categories, Category, GuideMeta } from "~/guides";
import {
  difference,
  upperFirst,
  sortBy,
  groupBy,
  flatMap,
  isArray,
} from "lodash-es";
import styled from "@emotion/styled";
import { track } from "~/analytics";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Tag } from "./tag";
import { match } from "ts-pattern";
import { Color } from "@emotion/react";
import * as tst from "ts-toolbelt";
import { atom, useAtom } from "jotai";
import { Route } from "~/routes/defs";

dayjs.extend(utc);

const openKeysAtom = atom<string[] | null>(null);

type NavMenuLinkProps = {
  label: string;
  href: Route;
  navKeys: string[];
};

const NavMenuLink = ({ href, label, navKeys }: NavMenuLinkProps) => {
  const [, setOpenKeys] = useAtom(openKeysAtom);
  return (
    <Link href={href} onClick={() => setOpenKeys(navKeys)}>
      {label}
    </Link>
  );
};

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
  flatten?: true;
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
  { label: "Gamecube", categories: ["Gamecube"], flatten: true },
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

const guidesWithFlattenedCategories = flatMap(guides, (guide) => {
  return guide.meta.categories.map((category) => ({ ...guide.meta, category }));
});
const guideByCategory = groupBy(
  guidesWithFlattenedCategories,
  (guide) => guide.category,
);

type KeyParts =
  | {
      type: "rootCategory";
      slug?: undefined;
      rootCategory: string;
      middleCategory?: undefined;
      isRoughDraft: boolean;
    }
  | {
      type: "middleCategory";
      slug?: undefined;
      rootCategory?: undefined;
      middleCategory: string;
      isRoughDraft: boolean;
    }
  | {
      type: "menuItem";
      slug: Route;
      rootCategory?: undefined;
      middleCategory: string;
      isRoughDraft: boolean;
    };

const createKey = ({
  slug,
  rootCategory,
  middleCategory,
  isRoughDraft,
}: KeyParts) => {
  const roughDraft = isRoughDraft ? "roughDraft" : null;
  return [roughDraft, rootCategory, middleCategory, slug]
    .filter((str) => str != null)
    .join("-");
};

const getMenuItem = ({
  guide,
  middleCategory,
  navKeys,
}: {
  guide: GuideMeta;
  middleCategory: string;
  navKeys: string[];
}): isNew<MenuItem> => {
  const isNew = dayjs
    .utc(guide.addedOn)
    .isAfter(dayjs.utc().subtract(7, "days"));
  const tag = isNew ? "new" : guide.tag;
  const key = createKey({
    type: "menuItem",
    slug: guide.slug,
    middleCategory,
    isRoughDraft: guide.isRoughDraft,
  });
  return {
    isNew,
    item: {
      type: "menuItem",
      key,
      label: (
        <NavMenuLink
          href={guide.slug}
          navKeys={[...navKeys, key]}
          label={guide.navDrawerTitle}
        />
      ),
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
  middleCategory,
  navKeys,
}: {
  guides: GuideMeta[];
  isRoughDraft: boolean;
  middleCategory: string;
  navKeys: string[];
}): isNew<MenuItem[]> | null => {
  const filteredGuides = guides.filter((guide) =>
    shouldShowGuide({ guide, showRoughDrafts: isRoughDraft }),
  );

  if (filteredGuides.length === 0) {
    return null;
  }

  const sortedGuides = sortBy(filteredGuides, (guide) => guide.navDrawerTitle);
  const menuItems = sortedGuides.map((guide) =>
    getMenuItem({ guide, middleCategory, navKeys }),
  );
  return {
    isNew: menuItems.some(({ isNew }) => isNew),
    item: menuItems.map(({ item }) => item),
  };
};

const getMiddleCategory = ({
  middleCategory,
  isRoughDraft,
  flatten,
  navKeys,
}: {
  middleCategory: Category;
  isRoughDraft: boolean;
  flatten: boolean;
  navKeys: string[];
}): isNew<MenuItem[] | MenuCategory> | null => {
  const guides = guideByCategory[middleCategory];

  if (guides == null) {
    return null;
  }

  const guidesByTag = groupBy(guides, (guide) => guide.tag);

  const key = createKey({
    type: "middleCategory",
    middleCategory,
    isRoughDraft,
  });

  const navItems = tagOrder
    .filter((tag) => guidesByTag[tag] != null)
    .flatMap((guide) => {
      return getMenuItems({
        isRoughDraft,
        middleCategory,
        navKeys: [...navKeys, key],
        guides: guidesByTag[guide],
      });
    })
    .filter((item) => item != null);

  if (navItems.length === 0) {
    return null;
  }

  if (flatten) {
    return {
      isNew: navItems.some(({ isNew }) => isNew),
      item: navItems.flatMap(({ item }) => item),
    };
  }

  const isNew = navItems.some(({ isNew }) => isNew);

  const label = match(middleCategory)
    .with("GBA Tools", () => "Tools")
    .with("NDS Tools", () => "Tools")
    .with("3DS Tools", () => "Tools")
    .with("Switch Tools", () => "Tools")
    .with("USUM Challenges", () => "USUM")
    .with("GBA Technical Documentation", () => "Technical Documentation")
    .otherwise(() => middleCategory);

  return {
    isNew,
    item: {
      label,
      type: "menuCategory",
      key,
      children: navItems.flatMap(({ item }) => item),
      icon: isNew ? <MenuItemTag tag="new" /> : null,
    },
  };
};

const getRootCategory = (rootCategory: RootCategory): MenuCategory => {
  const isRoughDraft = !!rootCategory.isRoughDraft;

  const key = createKey({
    type: "rootCategory",
    rootCategory: rootCategory.label,
    isRoughDraft,
  });

  const middleCategories = rootCategory.categories
    .map((middleCategory) => {
      return getMiddleCategory({
        middleCategory,
        isRoughDraft,
        flatten: !!rootCategory.flatten,
        navKeys: [key],
      });
    })
    .filter((category) => category != null);

  return {
    type: "menuCategory",
    key,
    label: rootCategory.label,
    children: middleCategories.flatMap(
      ({ item }): (MenuItem | MenuCategory)[] =>
        isArray(item) ? item : [item],
    ),
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

const getOpenKeys = (route: Route) => {
  // TODO: Try to find guide in already opened keys
  // If it doesn't exist, then find the closest one

  const guideMeta = getGuide(route)?.meta;
  const defaultCategory = guideMeta?.categories[0] ?? null;

  if (route === "/" || defaultCategory == null) {
    return [];
  }

  const openKey = createKey({
    type: "menuItem",
    slug: route,
    middleCategory: defaultCategory,
    isRoughDraft: guideMeta.isRoughDraft,
  });
  let openMiddleCategory: string | null = null;

  const openRootCategory = [...challengesMenu, ...guideMenu].find((item) => {
    return item.children.some((child) => {
      if (child.type === "menuItem") {
        return child.key === openKey;
      }

      const found = child.children.some((subChild) => subChild.key === openKey);
      if (found) {
        openMiddleCategory = child.key;
      }
      return found;
    });
  });
  return [openRootCategory?.key, openMiddleCategory, openKey].filter(
    (item) => item != null,
  );
};

const NavDrawerContent = () => {
  const route = useActiveRoute();
  const [, setMobileNavDrawerOpen] = useMobileNavDrawerOpen();
  const [previouslyOpenedKeys] = useAtom(openKeysAtom);
  const [openKeys, setOpenedKeys] = React.useState<string[]>(
    () => previouslyOpenedKeys ?? getOpenKeys(route),
  );

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
          defaultSelectedKeys={openKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={() => setMobileNavDrawerOpen(false)}
        />
        <Divider mv={16} />
        <StyledMenu
          mode="inline"
          inlineIndent={10}
          items={guideMenu}
          defaultSelectedKeys={openKeys}
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
