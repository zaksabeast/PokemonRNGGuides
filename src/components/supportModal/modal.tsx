import React from "react";
import { Flex, Typography, Button, Icon } from "~/components";
import { shuffle } from "lodash-es";
import { settings } from "~/settings";
import { Modal } from "antd";
import { track } from "~/analytics";
import styled from "@emotion/styled";
import { useSupportModal } from "./state";

const StyledModal = styled(Modal)({
  ".ant-modal-footer": {
    display: "none",
  },
});

export const SupportModal = () => {
  const [isNotInterested, setIsNotInterested] = React.useState(false);
  const { isOpen, closeSupportModal } = useSupportModal();
  const closeModal = () => {
    setIsNotInterested(false);
    closeSupportModal();
  };

  return (
    <StyledModal
      title={
        isNotInterested
          ? "We’d love your input"
          : "Thanks for supporting Pokémon RNG!"
      }
      open={isOpen}
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
              trackerId="support_us_discord_399"
              href={settings.supportUsDiscordUrl}
              icon={<Icon name="Discord" />}
              flex={1}
            >
              $3.99
            </Button>
            <Button
              type="primary"
              trackerId="support_us_discord_499"
              href={settings.supportUsDiscordUrl}
              icon={<Icon name="Discord" />}
              flex={1}
            >
              $4.99
            </Button>
            <Button
              type="primary"
              trackerId="support_us_discord_999"
              href={settings.supportUsDiscordUrl}
              icon={<Icon name="Discord" />}
              flex={1}
            >
              $9.99
            </Button>
          </Flex>

          <Flex gap={8}>
            <Button
              type="primary"
              trackerId="support_us_patreon_399"
              backgroundColor="Error"
              href={settings.supportUsPatreonUrl}
              icon={<Icon name="Patreon" />}
              flex={1}
            >
              $3.99
            </Button>
            <Button
              type="primary"
              trackerId="support_us_patreon_499"
              backgroundColor="Error"
              href={settings.supportUsPatreonUrl}
              icon={<Icon name="Patreon" />}
              flex={1}
            >
              $4.99
            </Button>
            <Button
              type="primary"
              trackerId="support_us_patreon_999"
              backgroundColor="Error"
              href={settings.supportUsPatreonUrl}
              icon={<Icon name="Patreon" />}
              flex={1}
            >
              $9.99
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
