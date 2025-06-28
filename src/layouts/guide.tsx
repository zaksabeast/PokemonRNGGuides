import React from "react";
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
import { useSupportModal } from "~/components/supportModal/state";

type Props = {
  guideMeta: GuideMeta;
  children: React.ReactNode;
};

export const GuideLayout = ({ guideMeta, children }: Props) => {
  const { openSupportModal } = useSupportModal();

  return (
    <MainLayout>
      <NavBreadcrumbs route={guideMeta.slug} />
      <Typography.Title level={1} mt={0}>
        {guideMeta.title}
      </Typography.Title>

      <Flex>
        <Button
          trackerId="get_help_on_discord"
          icon={<Icon name="Discord" />}
          type="primary"
          size="middle"
          href={settings.discordUrl}
        >
          Hunt, Trade, and RNG with Us!
        </Button>
      </Flex>

      <Flex>
        <Button
          trackerId="support_us_on_discord"
          icon={<Icon name="Heart" />}
          type="primary"
          backgroundColor="BrandSecondary"
          backgroundHoverColor="BrandSecondaryHover"
          size="middle"
          onClick={openSupportModal}
        >
          Keep Pokémon RNG Free & Growing
        </Button>
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
    </MainLayout>
  );
};
