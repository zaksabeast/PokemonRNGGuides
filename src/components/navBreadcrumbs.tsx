import React from "react";
import { Breadcrumb, BreadcrumbProps } from "antd";
import { Category, guides, getGuide } from "~/guides";
import { Route, RouteSchema } from "~/routes/defs";
import { mapValues } from "lodash-es";
import { Link } from "./link";
import { track } from "~/analytics";

const categoryOwners: Record<Category, Route> = {
  Home: "/",
  "Gold, Silver, Crystal": "/crystal/",
  Transporter: "/",
  "Ruby and Sapphire": "/ruby-and-sapphire/",
  Gamecube: "/gamecube/",
  "FireRed and LeafGreen": "/fire-red-and-leaf-green/",
  Emerald: "/emerald/",
  "Diamond, Pearl, and Platinum": "/diamond-pearl-and-platinum/",
  "HeartGold and SoulSilver": "/heart-gold-and-soul-silver/",
  "Black and White": "/black-and-white/",
  "Black 2 and White 2": "/black-2-and-white-2/",
  "X and Y": "/x-and-y/",
  "Omega Ruby and Alpha Sapphire": "/omega-ruby-and-alpha-sapphire/",
  "Sun and Moon": "/sun-and-moon/",
  "Ultra Sun and Ultra Moon": "/ultra-sun-and-ultra-moon/",
  "Sword and Shield": "/sword-and-shield/",
  "Brilliant Diamond and Shining Pearl":
    "/brilliant-diamond-and-shining-pearl/",
  "Legends Arceus": "/legends-arceus/",
  "GBA Overview": "/",
  "GBA Technical Documentation": "/",
  "GBA Tools": "/",
  "NDS Tools": "/",
  "3DS Tools": "/",
  "Switch Tools": "/",
  "USUM Challenges": "/",
  "User Settings": "/",
  "Game Hub": "/",
};

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
      <Link href={route.data} onClick={item.onClick}>
        {item.title}
      </Link>
    );
  }

  return <span onClick={item.onClick}>{item.title}</span>;
};

type Props = {
  route: Route;
};

export const NavBreadcrumbs = ({ route }: Props) => {
  const breadcrumbItems = React.useMemo(
    () => getBreadcrumbs({ route, origin: route, count: 0 }),
    [route],
  );

  if (route === "/") {
    return null;
  }

  return <Breadcrumb items={breadcrumbItems} itemRender={itemRender} />;
};
