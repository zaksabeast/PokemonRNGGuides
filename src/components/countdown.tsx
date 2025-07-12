import React from "react";
import dayjs from "dayjs";

type Props = {
  date: string;
  format?: "full" | "short";
};

export const Countdown = ({ date, format = "full" }: Props) => {
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

  if (format === "short" && days > 1) {
    return <>{days} days</>;
  }

  if (format === "short" && days === 0) {
    return (
      <>
        {hours} hours and {minutes} minutes
      </>
    );
  }

  return (
    <>
      {days} days, {hours}hr {minutes}m {seconds.toString().padStart(2, "0")}s
    </>
  );
};
