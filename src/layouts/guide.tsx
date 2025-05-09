import { MainLayout } from "~/layouts/main";
import { GuideMeta } from "~/guides";
import {
  Flex,
  Typography,
  Button,
  Icon,
  Alert,
  LanguageButton,
} from "~/components";
import { settings } from "~/settings";

type Props = {
  guideMeta: GuideMeta;
  children: React.ReactNode;
};

export const GuideLayout = ({ guideMeta, children }: Props) => {
  return (
    <MainLayout>
      <Typography.Title level={1}>{guideMeta.title}</Typography.Title>

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
          href={settings.supportUsUrl}
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

      <Alert
        mt={16}
        backgroundColor="BrandSecondaryBg"
        borderColor="BrandSecondaryBorder"
        message="Got the Pokemon you wanted?"
        description={
          <Flex vertical gap={16}>
            If everyone who used this site donated just $3/month, it could be a
            full time job for multiple people!
            <Flex>
              <Button
                trackerId="support_us_footer"
                icon={<Icon name="Heart" />}
                type="primary"
                backgroundColor="BrandSecondary"
                backgroundHoverColor="BrandSecondaryHover"
                size="middle"
                href={settings.supportUsUrl}
              >
                Help make this a reality!
              </Button>
            </Flex>
          </Flex>
        }
      />
    </MainLayout>
  );
};
