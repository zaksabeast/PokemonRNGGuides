import { Card as AntdCard } from "antd";
import type { ReactNode, ComponentProps } from "react";
import {
  Flex,
  Typography,
  Card,
  Tag,
  Icon,
  BadgeRibbon,
  LinkButton,
} from "~/components";
import { getGuide, GuideMeta, getGuidesBySectionForSlug } from "~/guides";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { sortBy } from "lodash-es";
import { match } from "ts-pattern";
import styled from "@emotion/styled";

type DisplayAttribute =
  | GuideMeta["displayAttributes"][number]
  | "new"
  | "external-link";

type PageSection = "info" | "challenge" | "guides" | "tool" | "patch";

const sectionDisplayOrder: PageSection[] = [
  "info",
  "challenge",
  "guides",
  "tool",
  "patch",
];

const DisplayTag = styled(Tag)<{ tag: DisplayAttribute }>(({ tag }) => {
  const colors = match(tag)
    .with("new", () => ({
      color: "#AF52DE",
      backgroundColor: "rgba(175, 82, 222, 0.1)",
    }))
    .with("external-link", () => ({
      color: "#30B0C7",
      backgroundColor: "rgba(48, 176, 199, 0.1)",
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

const getDisplayAttributeLabel = (tag: DisplayAttribute) => {
  return match(tag)
    .with("new", () => "New")
    .with("external-link", () => "External Link")
    .with("web_tool", () => "Web Tool")
    .with("video_guide", () => "Video")
    .exhaustive();
};

const { Meta: CardMeta } = AntdCard;

const GuideCard = styled(Card, {
  shouldForwardProp: (prop) => !prop.includes("$"),
})<{ $isTop?: boolean; $isBottom?: boolean }>(
  ({ theme, $isTop: $top, $isBottom: $bottom }) => ({
    borderTopLeftRadius: $top ? 10 : 0,
    borderTopRightRadius: $top ? 10 : 0,
    borderBottomLeftRadius: $bottom ? 10 : 0,
    borderBottomRightRadius: $bottom ? 10 : 0,
    "& .ant-card-body": {
      padding: 0,
    },
    "& .ant-ribbon-wrapper": {
      height: "100%",
      display: "flex",
    },
    "&:hover": {
      borderRadius: 10,
      boxShadow: theme.token.boxShadow,
      zIndex: 1,
      transform: "scale(1.03)",
    },
  }),
);

const GuideCardContent = styled(Flex)({
  minHeight: 40,
  overflow: "hidden",
});

const PokeballContainer = styled.div({
  transform: "rotate(-40deg) scale(1.2)",
  transformOrigin: "center",
});

const GuideCardFrame = ({
  cardId,
  title,
  isNew,
  cardProps,
  displayAttributesContent,
  bottomContent,
}: {
  cardId: string;
  title: string;
  isNew: boolean;
  cardProps?: Partial<ComponentProps<typeof GuideCard>>;
  displayAttributesContent?: ReactNode;
  bottomContent?: ReactNode;
}) => {
  return (
    <GuideCard
      id={cardId}
      fullBody
      borderColor={isNew ? "PrimaryBorderHover" : undefined}
      {...(cardProps ?? {})}
    >
      <BadgeRibbon $show={isNew} text="New">
        <GuideCardContent
          vertical
          gap={12}
          justify="space-between"
          flex={1}
          p={14}
        >
          <Flex gap={8} align="flex-start">
            <PokeballContainer>
              <Icon name="Pokeball" size={40} color="PrimaryBgHover" />
            </PokeballContainer>
            <Flex vertical gap={8} flex={1}>
              <CardMeta title={title} />
              {displayAttributesContent}
            </Flex>
          </Flex>
          {bottomContent}
        </GuideCardContent>
      </BadgeRibbon>
    </GuideCard>
  );
};

const isSectionDisplay = (section: string): section is PageSection => {
  return sectionDisplayOrder.includes(section as PageSection);
};

const getSectionLabel = (section: string) => {
  if (!isSectionDisplay(section)) {
    return section;
  }

  return match<PageSection>(section)
    .with("challenge", () => "Challenge")
    .with("guides", () => "Guides")
    .with("info", () => "Info")
    .with("tool", () => "Tools")
    .with("patch", () => "Patches")
    .exhaustive();
};

const getUniqueDisplayTags = (
  displayAttributes: ReadonlyArray<GuideMeta["displayAttributes"][number]>,
): DisplayAttribute[] => {
  const uniqueTags = new Set<DisplayAttribute>();

  for (const tag of displayAttributes) {
    if (tag != null && !isSectionDisplay(tag)) {
      uniqueTags.add(tag);
    }
  }

  return [...uniqueTags];
};

type DisplayTagsProps = {
  displayTags: DisplayAttribute[];
};

const DisplayTags = ({ displayTags }: DisplayTagsProps) => {
  if (displayTags.length === 0) {
    return null;
  }

  return (
    <Flex wrap>
      {displayTags.map((tag) => (
        <Flex key={tag}>
          <DisplayTag tag={tag}>{getDisplayAttributeLabel(tag)}</DisplayTag>
        </Flex>
      ))}
    </Flex>
  );
};

export const GamePageComponent = () => {
  const route = useActiveRoute();

  const { meta } = getGuide(route);
  const guidesBySection = getGuidesBySectionForSlug(meta.slug);

  return (
    <Flex vertical gap={12}>
      {sectionDisplayOrder.map((section) => {
        if (section === "guides") {
          const filteredGuides = guidesBySection.guides.filter(
            (guide) => !guide.isRoughDraft && !guide.hideFromNavDrawer,
          );

          if (filteredGuides.length === 0) {
            return null;
          }

          return (
            <Flex key={section} vertical gap={12}>
              <Typography.Title level={2} mb={2}>
                {getSectionLabel(section)}
              </Typography.Title>
              <Flex vertical>
                {sortBy(filteredGuides, (guide) => guide.navDrawerTitle).map(
                  (guide, index) => {
                    const displayTags = getUniqueDisplayTags(
                      guide.displayAttributes,
                    );

                    return (
                      <GuideCardFrame
                        key={guide.id}
                        cardProps={{
                          $isTop: index === 0,
                          $isBottom: index === filteredGuides.length - 1,
                        }}
                        cardId={`guide-${guide.id}`}
                        title={guide.navDrawerTitle}
                        isNew={guide.isNew}
                        displayAttributesContent={
                          <DisplayTags displayTags={displayTags} />
                        }
                        bottomContent={
                          <Flex gap={8} wrap>
                            <LinkButton
                              href={guide.retailSlug ?? "/"}
                              trackerId={`guide-retail-${guide.id}`}
                              disabled={guide.retailSlug == null}
                              type={guide.retailIsNew ? "primary" : undefined}
                            >
                              Retail
                            </LinkButton>
                            <LinkButton
                              href={guide.cfwEmuSlug ?? "/"}
                              trackerId={`guide-cfw-emu-${guide.id}`}
                              disabled={guide.cfwEmuSlug == null}
                              type={guide.cfwEmuIsNew ? "primary" : undefined}
                            >
                              Emu
                            </LinkButton>
                          </Flex>
                        }
                      />
                    );
                  },
                )}
              </Flex>
            </Flex>
          );
        }

        const sectionGuides = guidesBySection[section];
        const filteredGuides = sectionGuides.filter(
          (guide) => !guide.isRoughDraft && !guide.hideFromNavDrawer,
        );

        if (filteredGuides.length === 0) {
          return null;
        }

        return (
          <Flex key={section} vertical gap={12}>
            <Typography.Title level={2} mb={2}>
              {getSectionLabel(section)}
            </Typography.Title>
            <Flex vertical>
              {sortBy(filteredGuides, (guide) => guide.navDrawerTitle).map(
                (guide, index) => {
                  const displayTags = getUniqueDisplayTags(
                    guide.displayAttributes,
                  );
                  const { url, ...linkProps } = match(guide)
                    .with({ type: "baseGuide" }, (matched) => ({
                      url: matched.slug,
                      slug: matched.slug,
                    }))
                    .exhaustive();
                  return (
                    <GuideCardFrame
                      key={url}
                      cardId={`guide-${url}`}
                      title={guide.navDrawerTitle}
                      isNew={guide.isNew}
                      cardProps={{
                        ...linkProps,
                        $isTop: index === 0,
                        $isBottom: index === filteredGuides.length - 1,
                      }}
                      displayAttributesContent={
                        <DisplayTags displayTags={displayTags} />
                      }
                    />
                  );
                },
              )}
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};
