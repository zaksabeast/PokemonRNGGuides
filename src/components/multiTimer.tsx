import React from "react";
import { Flex } from "./flex";
import { Button } from "./button";
import { Typography } from "./typography";
import { Timer } from "./timer";
import { RadioGroup } from "./radio";
import firstBeepMp3 from "~/assets/first-beep.mp3";
import secondBeepMp3 from "~/assets/second-beep.mp3";
import { useAudio } from "~/hooks/useAudio";

type Props = {
  minutesBeforeTarget: number;
  milliseconds: number[];
  startButtonTrackerId: string;
  stopButtonTrackerId: string;
};

const countdownIntervalMs = 500;

export const MultiTimer = ({
  minutesBeforeTarget,
  milliseconds,
  startButtonTrackerId,
  stopButtonTrackerId,
}: Props) => {
  const [showAllTimers, setShowAllTimers] = React.useState(true);
  const [isRunning, setIsRunning] = React.useState(false);
  const [currentTimerIndex, setCurrentTimerIndex] = React.useState(0);
  const firstBeep = useAudio(firstBeepMp3);
  const secondBeep = useAudio(secondBeepMp3);

  const currentMs = milliseconds[currentTimerIndex] ?? 0;
  const nextMs = milliseconds[currentTimerIndex + 1] ?? 0;
  const displayTimerMs = milliseconds.length === 0 ? [0] : milliseconds;
  const countdownBeeps = Math.min(
    Math.floor(currentMs / countdownIntervalMs),
    5,
  );
  const countdownMs = currentMs - countdownBeeps * countdownIntervalMs;

  const onCountdown = React.useCallback(
    () => firstBeep.playBeeps(countdownBeeps),
    [firstBeep, countdownBeeps],
  );

  const onExpire = React.useCallback(() => {
    secondBeep.playBeeps(1);
    setCurrentTimerIndex((prev) => prev + 1);
  }, [secondBeep]);

  React.useEffect(() => {
    setIsRunning(false);
    setCurrentTimerIndex(0);
  }, [milliseconds]);

  return (
    <Flex vertical gap={24}>
      {!showAllTimers && (
        <>
          <Flex vertical gap={16} justify="center" align="center">
            <Timer
              expirationMs={currentMs}
              countdownMs={countdownMs}
              run={isRunning && currentTimerIndex < milliseconds.length}
              onCountdown={onCountdown}
              onExpire={onExpire}
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

      {showAllTimers && (
        <>
          <Flex wrap gap={16} justify="center" align="center">
            {displayTimerMs.map((ms, index) => (
              <Timer
                key={index}
                expirationMs={ms}
                countdownMs={countdownMs}
                run={isRunning && index <= currentTimerIndex}
                onCountdown={onCountdown}
                onExpire={onExpire}
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
          const newIsRunning = !isRunning;
          setIsRunning(newIsRunning);
          setCurrentTimerIndex(0);
          if (!newIsRunning) {
            firstBeep.stopBeeps();
            secondBeep.stopBeeps();
          }
        }}
      >
        {isRunning ? "Stop" : "Start"}
      </Button>
    </Flex>
  );
};
