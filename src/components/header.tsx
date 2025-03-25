import styled from "@emotion/styled";
import { Layout } from "antd";
import { Typography } from "./typography";
import { Button, BaseButton } from "./button";
import { Icon } from "./icons";
import { useMobileNavDrawerOpen } from "~/state/navDrawer";
import { Flex } from "./flex";
import { settings } from "~/settings";

const StyledHeader = styled(Layout.Header)(({ theme }) => ({
  zIndex: 100,
  position: "fixed",
  top: 0,
  height: theme.token.headerHeight,
  width: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  backdropFilter: "blur(8px)",
  alignItems: "center",
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  boxShadow:
    "0 1px 2px 0 rgba(0, 0, 0, 0.03),0 1px 6px -1px rgba(0, 0, 0, 0.02),0 2px 4px 0 rgba(0, 0, 0, 0.02)",
  display: "flex",
}));

const HeaderButton = styled(Button)(({ theme }) => ({
  [theme.mediaQueries.up("desktop")]: {
    display: "none",
  },
}));

export const HeaderSpace = styled.div(({ theme }) => ({
  minHeight: theme.token.headerHeight,
}));

HeaderSpace.displayName = "HeaderSpace";

export const Header = () => {
  const [, setMobileNavDrawerOpen] = useMobileNavDrawerOpen();
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
          <HeaderButton
            trackerId="open_mobile_nav_drawer"
            type="text"
            size="large"
            icon={<Icon name="Menu" size={20} extraAlignment={-1} />}
            onClick={() => setMobileNavDrawerOpen(true)}
          />
          <BaseButton href="/" trackerId="home" ml={18}>
            <Typography.Title level={4} mv={0} mr={0}>
              PokemonRNG.com
            </Typography.Title>
          </BaseButton>
        </Flex>

        <Flex align="center" gap={16}>
          <Button
            trackerId="github_url"
            href={settings.githubUrl}
            icon={<Icon name="Github" size={20} />}
          />
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
