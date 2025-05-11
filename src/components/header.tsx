import styled from "@emotion/styled";
import { Layout } from "antd";
import { Typography } from "./typography";
import { Button, BaseButton } from "./button";
import { Icon } from "./icons";
import { Flex } from "./flex";
import { settings } from "~/settings";
import { Link } from "./link";

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

export const HeaderSpace = styled.div(({ theme }) => ({
  minHeight: theme.components?.Layout?.headerHeight,
}));

HeaderSpace.displayName = "HeaderSpace";

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
