import React from "react";
import {
  FormikNumberInput,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikSelect,
  Flex,
  MultiTimer,
  FormFieldTable,
  Select,
  Button,
  Card,
} from "~/components";
import { capPrecision } from "~/utils/number";
import { rngTools, Console } from "~/rngTools";
import { z } from "zod";
import { useWatch } from "react-hook-form";
import { P, match } from "ts-pattern";

const SingleTimerSettingsSchema = z.object({
  timerId: z.number(),
  target: z.number(),
  calibration: z.number(),
  hit: z.number().nullable(),
  targetType: z.enum(["ms", "advances", "seed_hex"]),
});

type SingleTimerSettings = z.infer<typeof SingleTimerSettingsSchema>;

type AllTimerSettings = {
  console: Console;
  timers: SingleTimerSettings[];
};

const initialAllTimerSettings: AllTimerSettings = {
  console: "Gba",
  timers: [],
};

const initialValues: Omit<SingleTimerSettings, "timerId"> = {
  target: 0,
  calibration: 0.0,
  hit: null,
  targetType: "ms",
};

const CustomTimerSettings = () => {
  const targetType = useWatch<SingleTimerSettings, "targetType">({
    name: "targetType",
  });
  const numType = targetType === "seed_hex" ? "hex" : "float";

  const fields: Field[] = [
    {
      label: "Target Type",
      input: (
        <FormikSelect<SingleTimerSettings, "targetType">
          name="targetType"
          options={[
            { label: "Milliseconds", value: "ms" },
            { label: "Advances", value: "advances" },
            { label: "Seed Hex", value: "seed_hex" },
          ]}
        />
      ),
    },
    {
      label: "Target",
      input: (
        <FormikNumberInput<SingleTimerSettings>
          name="target"
          numType={numType}
        />
      ),
    },
    {
      label: "Calibration",
      input: (
        <FormikNumberInput<SingleTimerSettings>
          name="calibration"
          numType="float"
        />
      ),
    },
    {
      label: "Hit",
      input: (
        <FormikNumberInput<SingleTimerSettings> name="hit" numType={numType} />
      ),
    },
  ];
  return <FormFieldTable fields={fields} />;
};

const calibrate = async (console: Console, settings: SingleTimerSettings) => {
  const hit = settings.hit ?? 0;
  const calibration = await match(settings.targetType)
    .with("ms", () => settings.target - hit + settings.calibration)
    .with(P.union("advances", "seed_hex"), async () => {
      const updated = await rngTools.calibrate_gen3_timer(
        {
          console,
          calibration: settings.calibration,
          target_frame: settings.target,
          pre_timer: 0,
        },
        hit,
      );
      return updated.calibration;
    })
    .exhaustive();

  return capPrecision(Math.max(0, calibration));
};

const create = async (console: Console, settings: SingleTimerSettings) => {
  const target = settings.target;

  return match(settings.targetType)
    .with("ms", () => settings.target + settings.calibration)
    .with(P.union("advances", "seed_hex"), async () => {
      const updated = await rngTools.create_gen3_timer({
        console,
        calibration: settings.calibration,
        target_frame: target,
        pre_timer: 0,
      });
      // Ignore the pre-timer
      return updated[1] ?? 0;
    })
    .exhaustive();
};

type TimerSettingsProps = {
  timerId: number;
  onSubmit: RngToolSubmit<SingleTimerSettings>;
  onCancel: (timerId: number) => void;
};

const TimerSettings = ({ timerId, onSubmit, onCancel }: TimerSettingsProps) => {
  return (
    <RngToolForm<SingleTimerSettings, number[]>
      initialValues={{
        ...initialValues,
        timerId,
      }}
      onSubmit={onSubmit}
      submitTrackerId="set_custom_timer"
      submitButtonLabel="Set Timer"
      allowCancel
      cancelTrackerId="remove_custom_timer"
      onCancel={() => onCancel(timerId)}
      cancelButtonLabel="Remove Timer"
      validationSchema={SingleTimerSettingsSchema}
    >
      <CustomTimerSettings />
    </RngToolForm>
  );
};

const updateTimer = (
  timerSettings: AllTimerSettings,
  updated: SingleTimerSettings,
): AllTimerSettings => {
  const timers = timerSettings.timers.map((timer) => {
    if (timer.timerId === updated.timerId) {
      return updated;
    }
    return timer;
  });
  return {
    ...timerSettings,
    timers,
  };
};

let currentTimerId = 0;

export const CustomTimer = () => {
  const [timerSettings, setTimerSettings] = React.useState(
    initialAllTimerSettings,
  );
  const [milliseconds, setMilliseconds] = React.useState<number[]>([]);

  React.useEffect(() => {
    const update = async () => {
      const timers = await Promise.all(
        timerSettings.timers.map(async (timer) => {
          const ms = await create(timerSettings.console, timer);
          return {
            ...timer,
            ms,
          };
        }),
      );

      setMilliseconds(timers.map((timer) => timer.ms));
    };
    update();
  }, [timerSettings]);

  const onSubmit: RngToolSubmit<SingleTimerSettings> = async (
    opts,
    { setValue },
  ) => {
    let updatedOpts = opts;

    if (opts.hit != null) {
      const calibration = await calibrate(timerSettings.console, opts);
      updatedOpts = {
        ...opts,
        calibration,
        hit: null,
      };
      setValue("calibration", calibration);
      setValue("hit", null);
    }

    const updated = updateTimer(timerSettings, updatedOpts);

    setTimerSettings(updated);
  };

  const onCancel = React.useCallback(
    (timerId: number) => {
      setTimerSettings((prev) => {
        return {
          ...prev,
          timers: prev.timers.filter((timer) => timer.timerId !== timerId),
        };
      });
    },
    [setTimerSettings],
  );

  const addTimer = () => {
    setTimerSettings((prev): AllTimerSettings => {
      return {
        ...prev,
        timers: [
          ...prev.timers,
          { timerId: currentTimerId++, ...initialValues },
        ],
      };
    });
  };

  const consoleField: Field = {
    label: "Console",
    input: (
      <Select
        name="console"
        value={timerSettings.console}
        onChange={(value) =>
          setTimerSettings((prev) => ({ ...prev, console: value }))
        }
        options={[
          { label: "GBA", value: "Gba" },
          { label: "NDS - Slot 2", value: "NdsSlot2" },
          { label: "NDS - Slot 1", value: "NdsSlot1" },
          { label: "DSI", value: "Dsi" },
          { label: "3DS", value: "ThreeDs" },
        ]}
      />
    ),
  };

  return (
    <Flex vertical gap={12}>
      <MultiTimer
        startButtonTrackerId="start_custom_timer"
        stopButtonTrackerId="stop_custom_timer"
        milliseconds={milliseconds}
      />

      <FormFieldTable fields={[consoleField]} />

      {timerSettings.timers.map((timer) => {
        return (
          <Card id={`custom_timer_${timer.timerId}`} key={timer.timerId}>
            <TimerSettings
              timerId={timer.timerId}
              onSubmit={onSubmit}
              onCancel={onCancel}
            />
          </Card>
        );
      })}

      <Button trackerId="add_custom_timer" onClick={addTimer}>
        Add timer
      </Button>
    </Flex>
  );
};
