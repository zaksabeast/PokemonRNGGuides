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
} from "~/components";
import { shuffle } from "lodash-es";
import { settings } from "~/settings";
import { Modal } from "antd";
import { track } from "~/analytics";
import styled from "@emotion/styled";

const StyledModal = styled(Modal)({
  ".ant-modal-footer": {
    display: "none",
  },
});

const FeedbackModal = ({
  isModalOpen,
  closeModal: _closeModal,
}: {
  isModalOpen: boolean;
  closeModal: () => void;
}) => {
  const [isNotInterested, setIsNotInterested] = React.useState(false);
  const closeModal = () => {
    setIsNotInterested(false);
    _closeModal();
  };

  return (
    <StyledModal
      title={
        isNotInterested
          ? "We’d love your input"
          : "Thanks for supporting Pokémon RNG!"
      }
      open={isModalOpen}
      onCancel={() => {
        closeModal();
        track("Support us modal cancelled", {});
      }}
    >
      {!isNotInterested && (
        <Flex vertical gap={16}>
          <Typography.Text>
            Pick a support tier - every bit helps us stay free!
          </Typography.Text>
          <Flex gap={8}>
            <Button
              type="primary"
              trackerId="support_us_399"
              href={settings.supportUsUrl}
              flex={1}
            >
              $3.99
            </Button>
            <Button
              type="primary"
              trackerId="support_us_499"
              href={settings.supportUsUrl}
              flex={1}
            >
              $4.99
            </Button>
            <Button
              type="primary"
              trackerId="support_us_599"
              href={settings.supportUsUrl}
              flex={1}
            >
              $5.99
            </Button>
          </Flex>

          <Button
            trackerId="support_us_not_interested"
            onClick={() => setIsNotInterested(true)}
          >
            Not right now
          </Button>
        </Flex>
      )}

      {isNotInterested && (
        <Flex vertical gap={16}>
          <Typography.Text>Mind sharing what held you back?</Typography.Text>
          {
            // Randomize the order of the buttons
            // so people who click the first one without reason won't skew metrics.
            // We can use the orderIndex to tell if this is happening.
            [
              ...shuffle([
                { label: "It's too expensive" },
                { label: "Not enough rewards or benefits" },
                { label: "I don't use or like Discord" },
                { label: "I only support one-time payments" },
              ]),
              { label: "Other" },
            ].map((item, index) => (
              <Button
                key={index}
                trackerId={`support_us_not_interested_${item.label.toLowerCase().replace(" ", "_")}`}
                onClick={() => {
                  closeModal();
                  track("Not interested response", {
                    reason: item.label,
                    orderIndex: index,
                  });
                }}
              >
                {item.label}
              </Button>
            ))
          }
        </Flex>
      )}
    </StyledModal>
  );
};

type Props = {
  guideMeta: GuideMeta;
  children: React.ReactNode;
};

export const GuideLayout = ({ guideMeta, children }: Props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
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
            onClick={openModal}
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
              If everyone who used this site donated just $3/month, it could be
              a full time job for multiple people!
              <Flex>
                <Button
                  trackerId="support_us_footer"
                  icon={<Icon name="Heart" />}
                  type="primary"
                  backgroundColor="BrandSecondary"
                  backgroundHoverColor="BrandSecondaryHover"
                  size="middle"
                  onClick={openModal}
                >
                  Help make this a reality!
                </Button>
              </Flex>
            </Flex>
          }
        />
      </MainLayout>
      <FeedbackModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};
