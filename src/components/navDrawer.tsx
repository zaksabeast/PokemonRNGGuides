import React from "react";
import { Link } from "~/routes";
import { Divider, Drawer } from "antd";
import { Flex } from "./flex";
import { Typography } from "./typography";
import { useMobileNavDrawerOpen } from "~/state/navDrawer";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { settings } from "~/settings";
import { Menu, MenuProps } from "antd";
import { getGuide, guides, categories, Category, GuideMeta } from "~/guides";
import { partition, groupBy } from "lodash-es";
import * as tst from "ts-toolbelt";
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
    .map((category) => {
      const guideItems = guidesByCategory[category]
        .filter((guide) => !guide.meta.hideFromNavDrawer)
        .map((guide) => {
          const isNew = dayjs(guide.meta.addedOn).isAfter(
            dayjs().subtract(7, "days"),
          );
          return {
            key: guide.meta.slug,
            title: guide.meta.title,
            label: <Link href={guide.meta.slug}>{guide.meta.title}</Link>,
            isNew,
            tag: guide.meta.tag,
            icon: (
              <>
                {/* {isNew && <MenuItemTag tag="new" />} */}
                <MenuItemTag isNew={isNew} tag={guide.meta.tag} />
              </>
            ),
          };
        });

      const sortedGuideItems = sortBy(guideItems, (item) => [
        item.tag,
        item.title,
      ]);

      const isNew = guideItems.some((item) => item.isNew);

      return {
        key: `${keyPrefix}${category}`,
        label: category,
        children: sortedGuideItems,
        isNew,
        icon: isNew ? <MenuItemTag tag="new" isNew /> : null,
      };
    }) satisfies MenuItem[];
};

const finalizedGuideMenu = getGuideMenu(finalizedGuides);

const getMenuInCategory = (categories: Category[]) => {
  return finalizedGuideMenu.filter(({ key }) =>
    (categories as string[]).includes(key),
  );
};

type CategoryConfig =
  | {
      key: string;
      label: string;
      categories: Category[];
      children?: never;
    }
  | {
      key: string;
      label: string;
      children: ReturnType<typeof getGuideMenu>;
      categories?: never;
    };

const getCategory = ({ key, label, categories, children }: CategoryConfig) => {
  const subCategories = children ?? getMenuInCategory(categories);
  const isNew = subCategories.some((item) => item.isNew);
  return {
    key,
    label,
    children: subCategories,
    icon: isNew ? <MenuItemTag tag="new" isNew /> : null,
  };
};

const roughDraftPrefix = "roughDraft-";

const topLevelMenu = [
  getMenuInCategory(["Tools and Emulators"])[0],
  getCategory({
    key: "GB",
    label: "GB",
    categories: ["Gold, Silver, Crystal"],
  }),
  getCategory({
    key: "GBA",
    label: "GBA",
    categories: ["Ruby and Sapphire", "FireRed and LeafGreen", "Emerald"],
  }),
  getCategory({
    key: "NDS",
    label: "NDS",
    categories: [
      "Diamond, Pearl, and Platinum",
      "HeartGold and SoulSilver",
      "Black and White",
      "Black 2 and White 2",
    ],
  }),
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
  }),
  getMenuInCategory(["Gamecube"])[0],
  getCategory({
    key: "Switch",
    label: "Switch",
    categories: [
      "Sword and Shield",
      "Legends Arceus",
      "Brilliant Diamond and Shining Pearl",
    ],
  }),
  getCategory({
    key: "Rough Drafts",
    label: "Rough Drafts",
    children: getGuideMenu(roughDraftGuides, roughDraftPrefix),
  }),
] satisfies MenuItem[];

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
      item.children.some((child) => child.key === openCategory),
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
