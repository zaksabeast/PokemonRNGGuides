import React from "react";
import { Link } from "./link";
import { Menu, MenuProps } from "antd";
import { Flex } from "./flex";
import { Divider } from "./divider";
import { Typography } from "./typography";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { settings } from "~/settings";
import {
  getGuide,
  guides,
  categories,
  Category,
  GuideMeta,
  GuideTag,
} from "~/guides";
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
import { Tag } from "./tag";
import { match } from "ts-pattern";
import { Color } from "@emotion/react";
import * as tst from "ts-toolbelt";
import { atom, useAtom } from "jotai";
import { Route } from "~/routes/defs";

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

type TagOrNew = GuideTag | "new";

type MenuItemTagProps = {
  tag: TagOrNew;
};

const MenuItemTag = ({ tag }: MenuItemTagProps) => {
  const config: GuideConfig | null =
    tag === "new"
      ? {
          color: "TextLightSolid",
          backgroundColor: "Primary",
        }
      : null;
  const label = match<TagOrNew, string | null>(tag)
    .with("challenge", () => null)
    .with("cfw", () => "CFW")
    .otherwise(() => upperFirst(tag));

  if (label == null) {
    return null;
  }

  return (
    <Tag
      width={47}
      textAlign="center"
      color={config?.color}
      backgroundColor={config?.backgroundColor}
    >
      {label}
    </Tag>
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
      "Transporter and Dream Radar",
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

const tagOrder: GuideTag[] = [
  "info",
  "challenge",
  "any",
  "cfw",
  "emu",
  "retail",
  "patch",
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
      tag?: undefined;
      rootCategory: string;
      middleCategory?: undefined;
      isRoughDraft: boolean;
    }
  | {
      type: "middleCategory";
      slug?: undefined;
      tag?: undefined;
      rootCategory?: undefined;
      middleCategory: string;
      isRoughDraft: boolean;
    }
  | {
      type: "menuItem";
      slug: Route;
      tag: GuideTag;
      rootCategory?: undefined;
      middleCategory: string;
      isRoughDraft: boolean;
    };

const createKey = ({
  slug,
  rootCategory,
  middleCategory,
  isRoughDraft,
  tag,
}: KeyParts) => {
  const roughDraft = isRoughDraft ? "roughDraft" : null;
  return [roughDraft, tag, rootCategory, middleCategory, slug]
    .filter((str) => str != null)
    .join("-");
};

const getTaggedMenuItem = ({
  guide,
  middleCategory,
  navKeys,
  tag,
}: {
  guide: GuideMeta;
  middleCategory: string;
  navKeys: string[];
  tag: GuideTag;
}): isNew<MenuItem> => {
  const key = createKey({
    tag,
    type: "menuItem",
    slug: guide.slug,
    middleCategory,
    isRoughDraft: guide.isRoughDraft,
  });
  const item = {
    type: "menuItem",
    key,
    tag,
    icon: <MenuItemTag tag={guide.isNew ? "new" : tag} />,
    label: (
      <NavMenuLink
        href={guide.slug}
        navKeys={[...navKeys, key]}
        label={guide.navDrawerTitle}
      />
    ),
  } as const;

  return { isNew: guide.isNew, item };
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
  tag,
}: {
  guides: GuideMeta[];
  isRoughDraft: boolean;
  middleCategory: string;
  navKeys: string[];
  tag: GuideTag;
}): isNew<MenuItem[]> | null => {
  const filteredGuides = guides.filter((guide) =>
    shouldShowGuide({ guide, showRoughDrafts: isRoughDraft }),
  );

  if (filteredGuides.length === 0) {
    return null;
  }

  const sortedGuides = sortBy(filteredGuides, (guide) => guide.navDrawerTitle);
  const menuItems = sortedGuides.map((guide) =>
    getTaggedMenuItem({ guide, middleCategory, navKeys, tag }),
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

  const flattenedTags = guides.flatMap((guide) =>
    guide.tags.map((tag) => ({ ...guide, tag })),
  );
  const guidesByTag = groupBy(flattenedTags, (guide) => guide.tag);

  const key = createKey({
    type: "middleCategory",
    middleCategory,
    isRoughDraft,
  });

  const navItems = tagOrder
    .filter((tag) => guidesByTag[tag] != null)
    .flatMap((tag) => {
      return getMenuItems({
        isRoughDraft,
        middleCategory,
        navKeys: [...navKeys, key],
        guides: guidesByTag[tag],
        tag,
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
    tag: guideMeta.tags[0],
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

const NavDrawerContent = React.memo(() => {
  const route = useActiveRoute();
  const [previouslyOpenedKeys] = useAtom(openKeysAtom);
  const [openKeys, setOpenedKeys] = React.useState<string[]>(
    () => previouslyOpenedKeys ?? getOpenKeys(route),
  );

  const onOpenChange = React.useCallback(
    (updatedKeys: string[]) => {
      setOpenedKeys(updatedKeys);
      const newKeys = difference(updatedKeys, openKeys);
      if (newKeys.length === 1) {
        track("NavDrawer Open Category", { category: newKeys[0] });
      }
      if (newKeys.length > 1) {
        track("NavDrawer Open Multiple Categories", {});
      }
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
        />
        <Divider mv={16} />
        <StyledMenu
          mode="inline"
          inlineIndent={10}
          items={guideMenu}
          defaultSelectedKeys={openKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
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
