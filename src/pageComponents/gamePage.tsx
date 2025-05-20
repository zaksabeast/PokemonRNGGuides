import { Card as AntdCard, Badge } from "antd";
import { Flex, Typography, Grid, Card, Divider, Tag, Icon } from "~/components";
import { getGuide, guides, Category, GuideTag, GuideMeta } from "~/guides";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { get, groupBy, sortBy, flatMap, startCase } from "lodash-es";
import { Route } from "~/routes/defs";
import { match } from "ts-pattern";
import styled from "@emotion/styled";

const BadgeRibbon = styled(Badge.Ribbon)<{ $isNew: boolean }>(({ $isNew }) => ({
  display: $isNew ? "flex" : "none",
}));

type DisplayAttribute =
  | GuideMeta["displayAttributes"][number]
  | "new"
  | "translated";

const DisplayTag = styled(Tag)<{ tag: DisplayAttribute }>(({ tag }) => {
  const colors = match(tag)
    .with("new", () => ({
      color: "#AF52DE",
      backgroundColor: "rgba(175, 82, 222, 0.1)",
    }))
    .with("translated", () => ({
      color: "#34C759",
      backgroundColor: "rgba(52, 199, 89, 0.1)",
    }))
    .with("web_tool", () => ({
      color: "#7E5BEF",
      backgroundColor: "rgba(126, 91, 239, 0.08)",
    }))
    .with("video_guide", () => ({
      color: "#007AFF",
      backgroundColor: "rgba(0, 122, 255, 0.1)",
    }))
    .exhaustive();

  return {
    ...colors,
    borderRadius: 20,
    border: 0,
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.04)",
  };
});

const { Meta: CardMeta } = AntdCard;

const isToolCategory = (category: Category) => {
  return match(category)
    .with("GBA Tools", () => true)
    .with("NDS Tools", () => true)
    .with("3DS Tools", () => true)
    .with("Switch Tools", () => true)
    .with("Black 2 and White 2", () => false)
    .with("Black and White", () => false)
    .with("Diamond, Pearl, and Platinum", () => false)
    .with("HeartGold and SoulSilver", () => false)
    .with("Legends Arceus", () => false)
    .with("Ruby and Sapphire", () => false)
    .with("FireRed and LeafGreen", () => false)
    .with("Emerald", () => false)
    .with("Gold, Silver, Crystal", () => false)
    .with("X and Y", () => false)
    .with("Omega Ruby and Alpha Sapphire", () => false)
    .with("Sun and Moon", () => false)
    .with("Ultra Sun and Ultra Moon", () => false)
    .with("Sword and Shield", () => false)
    .with("Brilliant Diamond and Shining Pearl", () => false)
    .with("Gamecube", () => false)
    .with("GBA Overview", () => false)
    .with("GBA Technical Documentation", () => false)
    .with("Game Hub", () => false)
    .with("Home", () => false)
    .with("Transporter and Dream Radar", () => false)
    .with("USUM Challenges", () => false)
    .with("User Settings", () => false)
    .exhaustive();
};

const routeToCategory = {
  "/transporter-dream-radar/": ["Transporter and Dream Radar"],
  "/legends-arceus/": ["Legends Arceus", "Switch Tools"],
  "/crystal/": ["Gold, Silver, Crystal"],
  "/ruby-and-sapphire/": ["Ruby and Sapphire", "GBA Tools"],
  "/gamecube/": ["Gamecube"],
  "/fire-red-and-leaf-green/": ["FireRed and LeafGreen", "GBA Tools"],
  "/emerald/": ["Emerald", "GBA Tools"],
  "/diamond-pearl-and-platinum/": ["Diamond, Pearl, and Platinum", "NDS Tools"],
  "/heart-gold-and-soul-silver/": ["HeartGold and SoulSilver", "NDS Tools"],
  "/black-and-white/": ["Black and White", "NDS Tools"],
  "/black-2-and-white-2/": ["Black 2 and White 2", "NDS Tools"],
  "/x-and-y/": ["X and Y", "3DS Tools"],
  "/omega-ruby-and-alpha-sapphire/": [
    "Omega Ruby and Alpha Sapphire",
    "3DS Tools",
  ],
  "/sun-and-moon/": ["Sun and Moon", "3DS Tools"],
  "/ultra-sun-and-ultra-moon/": ["Ultra Sun and Ultra Moon", "3DS Tools"],
  "/sword-and-shield/": ["Sword and Shield", "Switch Tools"],
  "/brilliant-diamond-and-shining-pearl/": [
    "Brilliant Diamond and Shining Pearl",
    "Switch Tools",
  ],
} satisfies Partial<Record<Route, Category[]>>;

const GuideCard = styled(Card)({
  "& .ant-card-body": {
    padding: 0,
  },
  "& .ant-ribbon-wrapper": {
    height: "100%",
    display: "flex",
  },
});

const CardBackground = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

const InnerCardBackground = styled.div({
  position: "absolute",
  top: -12,
  transform: "rotate(-35deg)",
  paddingTop: 12,
});

type PageSection = GuideTag | "tool" | "patch";

const sectionDisplayOrder: PageSection[] = [
  "info",
  "challenge",
  "any",
  "cfw",
  "emu",
  "retail",
  "tool",
  "patch",
];

const isSectionDsiplay = (section: string): section is PageSection => {
  return sectionDisplayOrder.includes(section as PageSection);
};

const getSectionLabel = (section: string) => {
  if (!isSectionDsiplay(section)) {
    return section;
  }

  return match<PageSection>(section)
    .with("any", () => "Any")
    .with("cfw", () => "Custom Firmware")
    .with("challenge", () => "Challenge")
    .with("emu", () => "Emulator")
    .with("info", () => "Info")
    .with("retail", () => "Retail")
    .with("tool", () => "Tools")
    .with("patch", () => "Patches")
    .exhaustive();
};

const guidesWithFlattenedTags = flatMap(guides, (guide) => {
  return guide.meta.tags.map((tag) => ({ ...guide.meta, tag }));
});
const guidesWithFlattenedCategories = guidesWithFlattenedTags.flatMap(
  (guide) => {
    return guide.categories.map((category) => ({ ...guide, category }));
  },
);
const guideByCategory = groupBy(
  guidesWithFlattenedCategories,
  (guide) => guide.category,
);

export const GamePageComponent = () => {
  const route = useActiveRoute();

  const { meta } = getGuide(route);

  const categories = get(routeToCategory, meta.slug);
  const guides =
    categories?.flatMap((category) => guideByCategory[category]) ?? null;
  const guidesBySection = groupBy(guides, (guide) => {
    if (isToolCategory(guide.category)) {
      return "tool";
    }

    return guide.tag;
  });

  return (
    <Flex vertical gap={12}>
      <Typography.Title level={2} mb={2}>
        Guides and Articles
      </Typography.Title>
      {sectionDisplayOrder.map((section) => {
        const sectionGuides = guidesBySection[section];
        if (sectionGuides == null) {
          return null;
        }

        const filteredGuides = sectionGuides.filter(
          (guide) => !guide.isRoughDraft && !guide.hideFromNavDrawer,
        );

        if (filteredGuides.length === 0) {
          return null;
        }

        return (
          <Flex key={section} vertical gap={12}>
            <Typography.Title level={4} mb={2}>
              {getSectionLabel(section)}
            </Typography.Title>
            <Grid mobile={1} tablet={2} desktop={3}>
              {sortBy(filteredGuides, (guide) => guide.navDrawerTitle).map(
                (guide) => (
                  <GuideCard
                    id={`guide-${guide.slug}`}
                    key={guide.slug}
                    fullBody
                    href={guide.slug}
                    borderColor="PrimaryBorderHover"
                    border={guide.isNew ? "2px solid" : "1px solid"}
                  >
                    <BadgeRibbon
                      $isNew={guide.isNew}
                      text="New"
                      key={guide.slug}
                    >
                      <Flex vertical justify="space-between" flex={1} p={24}>
                        <Flex vertical minHeight={50} gap={4} height="100%">
                          <CardBackground>
                            <InnerCardBackground>
                              <Icon
                                name="Pokeball"
                                size={100}
                                color="PrimaryBgHover"
                              />
                            </InnerCardBackground>
                          </CardBackground>
                          {guide.displayAttributes
                            // Seperate filter for TS to infer types from the null check
                            .filter((tag) => tag !== null)
                            .filter((tag) => !isSectionDsiplay(tag))
                            .map((tag) => (
                              <Flex key={tag}>
                                <DisplayTag tag={tag}>
                                  {startCase(tag)}
                                </DisplayTag>
                              </Flex>
                            ))}
                        </Flex>
                        <Flex vertical>
                          <Divider />
                          <CardMeta title={guide.navDrawerTitle} />
                        </Flex>
                      </Flex>
                    </BadgeRibbon>
                  </GuideCard>
                ),
              )}
            </Grid>
          </Flex>
        );
      })}
    </Flex>
  );
};
