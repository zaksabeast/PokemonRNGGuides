import React from "react";
import { Flex } from "./flex";
import { Typography } from "./typography";
import dayjs from "dayjs";

type Props = {
  date: string;
};

export const Countdown = ({ date }: Props) => {
  const [now, setNow] = React.useState(dayjs());
  React.useEffect(() => {
    const timer = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const diffSeconds = dayjs(date).diff(now, "second");
  const days = Math.floor(diffSeconds / (24 * 60 * 60));
  const hours = Math.floor((diffSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((diffSeconds % (60 * 60)) / 60);
  const seconds = diffSeconds % 60;

  return (
    <Flex>
      <Flex backgroundColor="Primary" pv={4} ph={8} borderRadius={8}>
        <Typography.Text strong color="White">
          {days} days, {hours}hr {minutes}m{" "}
          {seconds.toString().padStart(2, "0")}s
        </Typography.Text>
      </Flex>
    </Flex>
  );
};
