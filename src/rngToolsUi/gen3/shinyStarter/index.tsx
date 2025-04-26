import React from "react";
import { Flex, MultiTimer } from "~/components";
import { FindTargetAdvance } from "./findTarget";
import { GenerateTidSid } from "./generateTidSid";
import { CaughtMon } from "./caughtMon";
import { FormFieldTable } from "../../../components/formFieldTable";
import { Field } from "~/components";
import { Icon } from "~/components/icons";
import { Button } from "~/components/button";

export type Game = "emerald" | "rs";
export type Starter = "Mudkip" | "Torchic" | "Treecko";

const calculateMillis = (
  targetAdvance: number,
  hitAdvance: number,
): number[] => {
  // ex: target was 100, hit was 120 (diff = +20).
  // this means the calibratedTargetAdv is 80.

  const diff = hitAdvance === 0 ? 0 : hitAdvance - targetAdvance;
  const calibratedTargetAdv = targetAdvance - diff;
  const milliseconds = Math.round((calibratedTargetAdv * 1000) / 59.7275);
  return [5000, milliseconds];
};

type Props = {
  game: Game;
  children: React.ReactNode[];
};

export const ShinyStarter = ({ game, children }: Props) => {
  const [targetAdvance, setTargetAdvance] = React.useState(0);
  const [hitAdvance, setHitAdvance] = React.useState(0);

  const milliseconds = React.useMemo(() => {
    return calculateMillis(targetAdvance, hitAdvance);
  }, [targetAdvance, hitAdvance]);

  const minutesBeforeTarget = Math.floor(milliseconds[1] / 60000);

  const fields = React.useMemo((): Field[] => {
    return [
      {
        label: "Target advance",
        input: <>{targetAdvance}</>,
      },
      {
        label: "Last hit advance",
        input:
          hitAdvance === 0 ? (
            "-"
          ) : (
            <>
              {hitAdvance} ({hitAdvance >= targetAdvance ? "+" : ""}
              {hitAdvance - targetAdvance})
              <Button
                type="text"
                color="Red"
                trackerId="clear_last_hit_advance"
                onClick={() => setHitAdvance(0)}
              >
                <Icon name="OutlineCloseCircle" size={20} />
              </Button>
            </>
          ),
      },
    ];
  }, [targetAdvance, hitAdvance]);

  return (
    <Flex gap={16} vertical>
      <FindTargetAdvance
        game={game}
        setTargetAdvance={(val) => {
          setTargetAdvance(val);
          setHitAdvance(0);
        }}
      />
      {children}
      <FormFieldTable fields={fields} />
      <MultiTimer
        {...{ minutesBeforeTarget, milliseconds }}
        startButtonTrackerId="start_gen3_shiny_starter_timer"
        stopButtonTrackerId="stop_gen3_shiny_starter_timer"
      />
      <CaughtMon
        {...{ game, targetAdvance }}
        setLatestHitAdv={(val) => {
          setHitAdvance(val + hitAdvance);
        }}
      />
    </Flex>
  );
};
