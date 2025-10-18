import React from "react";
import { FloatButton } from "antd";
import { MainLayout } from "~/layouts/main";
import { GuideMeta } from "~/guides";
import {
  Flex,
  Typography,
  Button,
  Icon,
  Alert,
  LanguageButton,
  NavBreadcrumbs,
} from "~/components";
import { settings } from "~/settings";
import styled from "@emotion/styled";
import { track } from "~/analytics";

const SmallScreenFab = styled(FloatButton)(({ theme }) => ({
  [theme.mediaQueries.up("tablet")]: {
    display: "none",
  },
}));

const DiscordButtonContainer = styled(Flex)(({ theme }) => ({
  gap: 10,
  flexDirection: "column",
  width: "fit-content",
  [theme.mediaQueries.up("mobile")]: {
    flexDirection: "row",
  },
}));

type Props = {
  guideMeta: GuideMeta;
  children: React.ReactNode;
};

export const GuideLayout = ({ guideMeta, children }: Props) => {
  const topRef = React.useRef<HTMLDivElement>(null);
  return (
    <MainLayout>
      <div ref={topRef} />
      <NavBreadcrumbs route={guideMeta.slug} />
      <Typography.Title level={1} mt={0}>
        {guideMeta.title}
      </Typography.Title>

      <Flex vertical gap={10}>
        <DiscordButtonContainer>
          <Flex>
            <Button
              trackerId="get_help_on_discord"
              icon={<Icon name="Discord" />}
              type="primary"
              size="middle"
              href={settings.discordUrl}
            >
              Hunt and Trade on PokemonRNG
            </Button>
          </Flex>
          <Flex>
            <Button
              trackerId="join_lazy_discord"
              icon={<Icon name="Discord" />}
              type="primary"
              size="middle"
              href="https://discord.gg/rvY3SwJHMk"
            >
              LazyHunters
            </Button>
          </Flex>
        </DiscordButtonContainer>
      </Flex>

      {guideMeta.isRoughDraft && (
        <Alert
          type="warning"
          showIcon
          message="This is a rough draft!"
          description="Everything on this page is a work in progress!"
        />
      )}

      {guideMeta.translations != null && (
        <LanguageButton {...guideMeta.translations} />
      )}

      {children}
      <SmallScreenFab
        icon={<Icon name="ArrowUp" />}
        onClick={() => {
          track("Button clicked", { id: "scroll_to_top" });
          topRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </MainLayout>
  );
};
