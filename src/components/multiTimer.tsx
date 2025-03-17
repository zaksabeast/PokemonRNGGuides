import React from "react";
import { Flex } from "./flex";
import { Button } from "./button";
import { Typography } from "./typography";
import { Audio } from "./audio";
import { Timer } from "./timer";
import { RadioGroup } from "./radio";
import firstBeepMp3 from "~/assets/first-beep.mp3";
import secondBeepMp3 from "~/assets/second-beep.mp3";

type Props = {
  minutesBeforeTarget: number;
  milliseconds: number[];
  startButtonTrackerId: string;
  stopButtonTrackerId: string;
};

export const MultiTimer = ({
  minutesBeforeTarget,
  milliseconds,
  startButtonTrackerId,
  stopButtonTrackerId,
}: Props) => {
  const [showAllTimers, setShowAllTimers] = React.useState(true);
  const firstBeepRef = React.useRef<HTMLAudioElement>(null);
  const secondBeepRef = React.useRef<HTMLAudioElement>(null);
  const [isRunning, setIsRunning] = React.useState(false);
  const [currentTimerIndex, setCurrentTimerIndex] = React.useState(0);

  React.useEffect(() => {
    setIsRunning(false);
    setCurrentTimerIndex(0);
  }, [milliseconds]);

  const currentMs = milliseconds[currentTimerIndex] ?? 0;
  const nextMs = milliseconds[currentTimerIndex + 1] ?? 0;
  const displayTimerMs = milliseconds.length === 0 ? [0] : milliseconds;

  return (
    <Flex vertical gap={24}>
      {showAllTimers && (
        <>
          <Flex vertical gap={16} justify="center" align="center">
            <Timer
              expireMilliseconds={currentMs}
              run={isRunning}
              onExpire={() => {
                secondBeepRef.current?.play();
                if (currentTimerIndex === milliseconds.length - 1) {
                  setIsRunning(false);
                  setCurrentTimerIndex(0);
                  return;
                }

                setCurrentTimerIndex(currentTimerIndex + 1);
              }}
              onCountdown={() => firstBeepRef.current?.play()}
            />
          </Flex>
          <Flex vertical gap={8}>
            <Typography.Title level={5} p={0} m={0}>
              Next Phase: {nextMs == null ? "None" : nextMs / 1000}
            </Typography.Title>
            <Typography.Title level={5} p={0} m={0}>
              Minutes Before Target: {minutesBeforeTarget}
            </Typography.Title>
          </Flex>
        </>
      )}

      {!showAllTimers && (
        <>
          <Flex wrap gap={16} justify="center" align="center">
            {displayTimerMs.map((ms, index) => (
              <Timer
                key={index}
                expireMilliseconds={ms}
                run={isRunning && index <= currentTimerIndex}
                onExpire={() => {
                  if (index !== currentTimerIndex) {
                    return;
                  }

                  secondBeepRef.current?.play();
                  if (index === milliseconds.length - 1) {
                    setIsRunning(false);
                    return;
                  }

                  setCurrentTimerIndex(index + 1);
                }}
                onCountdown={() => firstBeepRef.current?.play()}
              />
            ))}
          </Flex>
          <Flex vertical gap={8}>
            <Typography.Title level={5} p={0} m={0}>
              Minutes Before Target: {minutesBeforeTarget}
            </Typography.Title>
          </Flex>
        </>
      )}

      <Flex flex={1} align="center">
        <Typography.Text strong flex={1}>
          Display All Timers?
        </Typography.Text>
        <RadioGroup
          optionType="button"
          value={showAllTimers ? "showAllTimers" : "showCurrentTimer"}
          onChange={({ target }) =>
            setShowAllTimers(target.value === "showAllTimers")
          }
          options={[
            { label: "Yes", value: "showAllTimers" },
            { label: "No", value: "showCurrentTimer" },
          ]}
        />
      </Flex>

      <Button
        trackerId={isRunning ? startButtonTrackerId : stopButtonTrackerId}
        onClick={() => {
          setIsRunning(!isRunning);
          setCurrentTimerIndex(0);
        }}
      >
        {isRunning ? "Stop" : "Start"}
      </Button>

      <Audio ref={firstBeepRef} src={firstBeepMp3} />
      <Audio ref={secondBeepRef} src={secondBeepMp3} />
    </Flex>
  );
};
