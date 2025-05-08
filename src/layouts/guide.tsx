import { Skeleton } from "antd";
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
import { useAbCohort } from "~/hooks/useAbTest";
import { match } from "ts-pattern";

const SupportButton = () => {
  const { hydrated, cohort } = useAbCohort("supportUsIcon");

  if (!hydrated) {
    return <Skeleton.Button block />;
  }

  const iconName = match(cohort)
    .with("heart", () => "Heart" as const)
    .with("coffee", () => "Coffee" as const)
    .exhaustive();

  return (
    <Button
      trackerId="support_us_on_discord"
      icon={<Icon name={iconName} />}
      type="primary"
      backgroundColor="BrandSecondary"
      backgroundHoverColor="BrandSecondaryHover"
      size="middle"
      href={settings.supportUsUrl}
    >
      Keep Pokémon RNG Free & Growing
    </Button>
  );
};

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
        <SupportButton />
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
