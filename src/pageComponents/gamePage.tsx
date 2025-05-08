import { Skeleton } from "antd";
import { Flex, Typography, Grid, Card, Icon } from "~/components";
import { getGuide, GuideMeta, guides } from "~/guides";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { get, groupBy, sortBy } from "lodash-es";
import { Route } from "~/routes/defs";
import { match } from "ts-pattern";
import styled from "@emotion/styled";
import { useAbCohort } from "~/hooks/useAbTest";

const routeToCategory = {
  "/legends-arceus": "Legends Arceus",
  "/crystal": "Gold, Silver, Crystal",
  "/ruby-and-sapphire": "Ruby and Sapphire",
  "/gamecube": "Gamecube",
  "/fire-red-and-leaf-green": "FireRed and LeafGreen",
  "/emerald": "Emerald",
  "/diamond-pearl-and-platinum": "Diamond, Pearl, and Platinum",
  "/heart-gold-and-soul-silver": "HeartGold and SoulSilver",
  "/black-and-white": "Black and White",
  "/black-2-and-white-2": "Black 2 and White 2",
  "/x-and-y": "X and Y",
  "/omega-ruby-and-alpha-sapphire": "Omega Ruby and Alpha Sapphire",
  "/sun-and-moon": "Sun and Moon",
  "/ultra-sun-and-ultra-moon": "Ultra Sun and Ultra Moon",
  "/sword-and-shield": "Sword and Shield",
  "/brilliant-diamond-and-shining-pearl": "Brilliant Diamond and Shining Pearl",
} satisfies Partial<Record<Route, GuideMeta["category"]>>;

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

const tagOrder: GuideMeta["tag"][] = [
  "info",
  "challenge",
  "any",
  "cfw",
  "emu",
  "retail",
];

const isTag = (tag: string): tag is GuideMeta["tag"] => {
  return tagOrder.includes(tag as GuideMeta["tag"]);
};

const getTagLabel = (tag: string) => {
  if (!isTag(tag)) {
    return tag;
  }

  return match<GuideMeta["tag"]>(tag)
    .with("any", () => "Any")
    .with("cfw", () => "Custom Firmware")
    .with("challenge", () => "Challenge")
    .with("emu", () => "Emulator")
    .with("info", () => "Info")
    .with("retail", () => "Retail")
    .exhaustive();
};

const guideByCategory = groupBy(guides, (guide) => guide.meta.category);

export const GamePageComponent = () => {
  const [route] = useActiveRoute();
  const abTest = useAbCohort("guidePokeball");

  const { meta } = getGuide(route);

  const category = get(routeToCategory, meta.slug);
  const guides = category == null ? null : guideByCategory[category];
  const guidesByTag = groupBy(guides, (guide) => guide.meta.tag);

  return (
    <Flex vertical gap={12}>
      <Typography.Title level={2} mb={2}>
        Guides and Articles
      </Typography.Title>
      {tagOrder.map((tag) => {
        if (!abTest.hydrated) {
          return <Skeleton />;
        }

        const tagGuides = guidesByTag[tag];
        if (tagGuides == null) {
          return null;
        }

        const filteredGuides = tagGuides.filter(
          (guide) => !guide.meta.isRoughDraft && guide.meta.translation == null,
        );

        if (filteredGuides.length === 0) {
          return null;
        }

        return (
          <Flex key={tag} vertical gap={12}>
            <Typography.Title level={4} mb={2}>
              {getTagLabel(tag)}
            </Typography.Title>
            <Grid mobile={1} tablet={2} desktop={3}>
              {sortBy(filteredGuides, (guide) => guide.meta.navDrawerTitle).map(
                (guide) => (
                  <Card
                    id={`guide-${guide.meta.slug}`}
                    key={guide.meta.slug}
                    fullBody
                    href={guide.meta.slug}
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
                    <Flex vertical style={{ position: "relative", zIndex: 1 }}>
                      <Typography.Text
                        strong
                        m={0}
                        fontSize={16}
                        textAlign="right"
                      >
                        {guide.meta.navDrawerTitle}
                      </Typography.Text>
                    </Flex>
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
