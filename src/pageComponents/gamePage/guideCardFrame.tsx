import { Card as AntdCard } from "antd";
import type { ReactNode, ComponentProps } from "react";
import { Flex, Card, Icon, BadgeRibbon } from "~/components";
import styled from "@emotion/styled";
import { DisplayAttribute, DisplayTags } from "./displayTags";
import { LanguageKey } from "~/types/language";

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

type Props = {
  cardId: string;
  title: ReactNode;
  isNew: boolean;
  cardProps?: Partial<ComponentProps<typeof GuideCard>>;
  displayAttributes: readonly DisplayAttribute[];
  bottomContent?: ReactNode;
  translations: LanguageKey[];
};

export const GuideCardFrame = ({
  cardId,
  title,
  isNew,
  cardProps,
  displayAttributes,
  bottomContent,
  translations,
}: Props) => {
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
              <DisplayTags
                attributes={displayAttributes}
                translations={translations}
              />
            </Flex>
          </Flex>
          {bottomContent}
        </GuideCardContent>
      </BadgeRibbon>
    </GuideCard>
  );
};
