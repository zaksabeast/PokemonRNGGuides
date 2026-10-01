import { Breadcrumb, BreadcrumbProps } from "antd";
import { Flex } from "./flex";
import { Icon } from "./icons";
import { guides, getGuide, categoryOwners } from "~/guides";
import { Route, RouteSchema } from "~/routes/defs";
import { mapValues } from "lodash-es";
import { Link } from "./link";
import { track } from "~/analytics";
import styled from "@emotion/styled";

const ColorlessLink = styled(Link)({
  "&&&": { color: "unset" },
});

type Screen = {
  route: Route;
  parentScreen?: Route;
};

const screens: Record<Route, Screen> = mapValues(guides, (guide): Screen => {
  const category =
    guide.meta.categories.length > 1 ? "Home" : guide.meta.categories[0];
  return {
    route: guide.meta.slug,
    parentScreen: categoryOwners[category],
  };
});

type BreadcrumbItem = { title: string; href: Route; onClick: () => void };

const getBreadcrumbs = ({
  route,
  origin,
  count,
}: {
  route: Route;
  origin: Route;
  count: number;
}): BreadcrumbItem[] => {
  if (count != null && count > 5) {
    // Prevent infinite recursion
    return [];
  }

  const { meta } = getGuide(route);

  const onClick = () => track("Breadcrumb clicked", { route, origin });

  if (meta.slug === "/") {
    return [{ title: "Home", href: "/", onClick }];
  }

  const breadcrumbItem = {
    title: meta.navDrawerTitle,
    href: meta.slug,
    onClick,
  };
  const parentScreen = screens[meta.slug].parentScreen;

  if (parentScreen == null) {
    return [breadcrumbItem];
  }

  return [
    ...getBreadcrumbs({ route: parentScreen, origin, count: count + 1 }),
    breadcrumbItem,
  ];
};

const itemRender: BreadcrumbProps["itemRender"] = (item) => {
  const route = RouteSchema.safeParse(item.href);

  if (route.success) {
    return (
      <ColorlessLink href={route.data} onClick={item.onClick}>
        {item.title}
      </ColorlessLink>
    );
  }

  return <span onClick={item.onClick}>{item.title}</span>;
};

type Props = {
  route: Route;
};

export const NavBreadcrumbs = ({ route }: Props) => {
  const breadcrumbItems = getBreadcrumbs({ route, origin: route, count: 0 });

  if (route === "/") {
    return null;
  }

  return (
    <Breadcrumb
      items={breadcrumbItems}
      itemRender={itemRender}
      separator={
        <Flex height="100%">
          <Icon name="ChevronRight" size={18} />
        </Flex>
      }
    />
  );
};
