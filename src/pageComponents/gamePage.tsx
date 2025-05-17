import { Skeleton } from "antd";
import { Flex, Typography, Grid, Card, Icon } from "~/components";
import { getGuide, GuideMeta, guides, Category } from "~/guides";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { get, groupBy, sortBy, flatMap } from "lodash-es";
import { Route } from "~/routes/defs";
import { match } from "ts-pattern";
import styled from "@emotion/styled";
import { useAbCohort } from "~/hooks/useAbTest";

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

const CardBackground = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

const InnerCardBackground = styled.div({
  position: "absolute",
  top: -12,
  transform: "rotate(-35deg)",
});

const TitleContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  zIndex: 1,
});

type PageSection = GuideMeta["tag"] | "tool" | "patch";

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

const guidesWithFlattenedCategories = flatMap(guides, (guide) => {
  return guide.meta.categories.map((category) => ({ ...guide.meta, category }));
});
const guideByCategory = groupBy(
  guidesWithFlattenedCategories,
  (guide) => guide.category,
);

export const GamePageComponent = () => {
  const route = useActiveRoute();
  const abTest = useAbCohort("guidePokeball");

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
        if (!abTest.hydrated) {
          return <Skeleton />;
        }

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
                  <Card
                    id={`guide-${guide.slug}`}
                    key={guide.slug}
                    fullBody
                    href={guide.slug}
                    borderColor="PrimaryBorderHover"
                    border="1px solid"
                  >
                    {abTest.cohort === "on" && (
                      <CardBackground>
                        <InnerCardBackground>
                          <Icon
                            name="Pokeball"
                            size={100}
                            color="PrimaryBgHover"
                          />
                        </InnerCardBackground>
                      </CardBackground>
                    )}
                    <TitleContainer>
                      <Typography.Text
                        strong
                        m={0}
                        fontSize={16}
                        textAlign="right"
                      >
                        {guide.navDrawerTitle}
                      </Typography.Text>
                    </TitleContainer>
                  </Card>
                ),
              )}
            </Grid>
          </Flex>
        );
      })}
    </Flex>
  );
};
