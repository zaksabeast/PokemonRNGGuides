import { Alert, Typography, Flex } from "~/components";

export const Metronome3dsNotice = () => {
  return (
    <Alert
      showIcon
      type="info"
      message="Using the 3DS Helper"
      description={
        <Flex vertical gap={8}>
          <Typography.Text>
            1. Click "Start 3ds Helper" before starting the timer. This will
            limit when you can start the timer.
          </Typography.Text>
          <Typography.Text>
            2. Try to start the timer. If it doesn't start, you missed the safe
            time range and need to try again.
          </Typography.Text>
          <Typography.Text>
            3. If your calibration results on the next screen have second offset
            of +1, update the "3ds Offset" to the next option and try again.
          </Typography.Text>
        </Flex>
      }
    />
  );
};
