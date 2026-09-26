import styled from "@emotion/styled";
import { Layout } from "antd";
import { Button } from "./button";
import { Icon } from "./icons";
import { Flex } from "./flex";
import { settings } from "~/settings";
import { Link } from "./link";
import { LinkButton } from "./linkButton";
import { setTheme, type ThemeMode } from "~/theme/themeMode";
import { styledPropGuard } from "~/utils/styled";
import React from "react";

const MobileDisplay = styled(Flex)(({ theme }) => ({
  [theme.mediaQueries.up("mobile")]: {
    display: "none",
  },
}));

const NonMobileDisplay = styled(Flex)(({ theme }) => ({
  [theme.mediaQueries.down("mobile")]: {
    display: "none",
  },
}));

type BaseContributeButtonProps = { id: string; children?: React.ReactNode };

const BaseContributeButton = (props: BaseContributeButtonProps) => {
  return (
    <LinkButton
      {...props}
      trackerId="contribute_url"
      link={CONTRIBUTE_LINK}
      icon={<Icon name="Edit" size={20} />}
    />
  );
};

const ContributeButton = () => {
  return (
    <>
      <MobileDisplay>
        <BaseContributeButton id="mobile_contribute_url" />
      </MobileDisplay>
      <NonMobileDisplay>
        <BaseContributeButton id="desktop_contribute_url">
          Contribute
        </BaseContributeButton>
      </NonMobileDisplay>
    </>
  );
};

const ShowIfTheme = styled(
  "div",
  styledPropGuard,
)<{ $themeMode: ThemeMode }>(({ $themeMode }) => ({
  [`[data-theme="${$themeMode}"] &`]: {
    display: "flex",
  },
  display: "none",
}));

const CONTRIBUTE_LINK = { type: "slug", slug: "/contributing/" } as const;

const HeaderTitle = styled.span(({ theme }) => ({
  color: theme.token.colorText,
  fontSize: 22,
  fontWeight: 500,
  lineHeight: "28px",
  [theme.mediaQueries.down("mobile")]: {
    fontSize: 20,
  },
}));

const StyledHeader = styled(Layout.Header)({
  zIndex: 100,
  position: "fixed",
  top: 0,
  width: "100%",
  backdropFilter: "blur(8px)",
  alignItems: "center",
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  display: "flex",
});

export const Header = () => {
  return (
    <StyledHeader>
      <Flex
        align="center"
        gap={16}
        justify="space-between"
        width="100%"
        ph={18}
      >
        <Flex align="center">
          <Link href="/" display="flex">
            <Button trackerId="home" type="text">
              <HeaderTitle>Pokemon RNG</HeaderTitle>
            </Button>
          </Link>
        </Flex>

        <Flex align="center" gap={8}>
          <ContributeButton />
          <ShowIfTheme $themeMode="light">
            <Button
              type="text"
              trackerId="switch_to_dark_mode"
              onClick={() => setTheme("dark")}
              icon={<Icon name="DarkMode" size={20} />}
            />
          </ShowIfTheme>
          <ShowIfTheme $themeMode="dark">
            <Button
              type="text"
              trackerId="switch_to_light_mode"
              onClick={() => setTheme("light")}
              icon={<Icon name="LightMode" size={20} />}
            />
          </ShowIfTheme>
          <Button
            trackerId="discord_url"
            href={settings.discordUrl}
            icon={<Icon name="Discord" size={20} />}
            type="primary"
          />
        </Flex>
      </Flex>
    </StyledHeader>
  );
};
