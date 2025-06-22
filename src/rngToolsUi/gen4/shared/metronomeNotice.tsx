import { Alert, Typography, Flex } from "~/components";

export const Metronome3dsNotice = () => {
  return (
    <Alert
      showIcon
      type="info"
      message="3DS users"
      description={
        <Flex vertical gap={8}>
          <Typography.Text>
            Start the metronome before starting the timer. This will help you
            hit your target more accurately.
          </Typography.Text>
          <Typography.Text>
            If the timer doesn't start, you missed the metronome - try again.
          </Typography.Text>
          <Typography.Text>
            If your calibration results in the next step consistently have
            advance and delay offsets of 0, but second offset of 1, toggle the
            "Metronome Offset" below.
          </Typography.Text>
        </Flex>
      }
    />
  );
};
