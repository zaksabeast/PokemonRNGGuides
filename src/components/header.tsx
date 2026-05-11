import styled from "@emotion/styled";
import { Layout } from "antd";
import { Typography } from "./typography";
import { Button, BaseButton } from "./button";
import { Icon } from "./icons";
import { Flex } from "./flex";
import { settings } from "~/settings";
import { Link } from "./link";
import { LinkButton } from "./linkButton";
import { setTheme, type ThemeMode } from "~/theme/themeMode";
import { styledPropGuard } from "~/utils/styled";

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
  boxShadow:
    "0 1px 2px 0 rgba(0, 0, 0, 0.03),0 1px 6px -1px rgba(0, 0, 0, 0.02),0 2px 4px 0 rgba(0, 0, 0, 0.02)",
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
            <BaseButton trackerId="home" ml={18}>
              <Typography.Title level={4} mv={0} mr={0}>
                Pokemon RNG
              </Typography.Title>
            </BaseButton>
          </Link>
        </Flex>

        <Flex align="center" gap={8}>
          <LinkButton
            trackerId="contribute_url"
            link={CONTRIBUTE_LINK}
            icon={<Icon name="Edit" size={20} />}
          >
            Contribute
          </LinkButton>
          <ShowIfTheme $themeMode="light">
            <Button
              trackerId="switch_to_dark_mode"
              onClick={() => setTheme("dark")}
              icon={<Icon name="DarkMode" size={20} />}
            />
          </ShowIfTheme>
          <ShowIfTheme $themeMode="dark">
            <Button
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
