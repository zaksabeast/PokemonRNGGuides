import React from "react";
import { FormikInput, RngToolForm, Field } from "~/components";
import { RadioGroup } from "~/components/radio";
import { RngToolUpdate } from "~/components/rngToolForm";
import {Starter,Game} from "./index";
import {findTargetAdvanceForShinyPokemon} from "./calc";
import { Flex, MultiTimer } from "~/components";

import {
  DecimalString,
  fromDecimalString,
  fromHexString,
  HexString,
  toDecimalString,
  toHexString,
} from "~/utils/number";


type FormState = {
  offset: DecimalString;
};

const initialValues: FormState = {
  offset: toDecimalString(60), //NO_PROD
};

type Props = {
  game:Game;
};

export const GenerateTidSid = ({ 
  game,
}: Props) => {
    
  const milliseconds = React.useMemo(() => {
    return [0,0]; //NO_PROD calculateMillis(targetAdvance, hitAdvance);
  }, []);

  const minutesBeforeTarget = Math.floor(milliseconds[1] / 60000);

  const fields: Field[] = React.useMemo(() => ([
    {
      label: "Offset for TID/SID generation",
      input: <FormikInput<FormState> name="offset" />,
    },
    {
      label:"TID/SID Timer",
      direction:"column",
      input:<MultiTimer
        {...{ minutesBeforeTarget, milliseconds }}
        startButtonTrackerId="start_gen3_shiny_starter_tidsid_timer"
        stopButtonTrackerId="stop_gen3_shiny_starter_tidsid_timer"
      />
    },
    {
      label: "Obtained TID",
      input: <FormikInput<FormState> name="offset" />,
    },
  ]), []);

  const onSubmit = React.useCallback<RngToolUpdate<FormState>>(
    async (opts) => {
      const offset = fromDecimalString(opts.offset);

      if (offset == null){
        return;
      }

    },
    [game],
  );

  return (<>
    <RngToolForm<FormState, never[]>
      fields={fields}
      initialValues={initialValues}
      submitTrackerId="findTarget"
      onSubmit={onSubmit}
    />
  </>);
};
