import React from "react";
import { FormikInput, RngToolForm, Field } from "~/components";
import { FormikRadio } from "~/components/radio";
import { RngToolUpdate } from "~/components/rngToolForm";
import {
  DecimalString,
  fromDecimalString,
  fromHexString,
  HexString,
  toDecimalString,
  toHexString,
} from "~/utils/number";

type Starter = "Mudkip" | "Torchic" | "Treecko";

const getTargetAdvance = ({
  tid,
}: {
  tid: number;
  sid: number;
  starter: Starter;
}) => {
  // stubbed
  return tid;
};

type FormState = {
  tid: DecimalString;
  sid: HexString;
  starter: Starter;
};

const initialValues: FormState = {
  tid: toDecimalString(0),
  sid: toHexString(0),
  starter: "Mudkip",
};

const fields: Field[] = [
  {
    label: "Starter",
    input: (
      <FormikRadio<FormState, "starter">
        name="starter"
        options={[
          { value: "Mudkip", label: "Mudkip" },
          { value: "Torchic", label: "Torchic" },
          { value: "Treecko", label: "Treecko" },
        ]}
      />
    ),
  },
  {
    label: "TID",
    input: <FormikInput<FormState> name="tid" />,
  },
  {
    label: "SID",
    input: <FormikInput<FormState> name="sid" />,
  },
];

type Props = {
  setTargetAdvance: (targetAdvance: number) => void;
};

export const FindTargetAdvance = ({ setTargetAdvance }: Props) => {
  const onUpdate = React.useCallback<RngToolUpdate<FormState>>(
    async (opts) => {
      const tid = fromDecimalString(opts.tid);
      const sid = fromHexString(opts.sid);

      if (tid == null || sid == null) {
        return;
      }

      const targetAdvance = getTargetAdvance({
        tid,
        sid,
        starter: opts.starter,
      });
      setTargetAdvance(targetAdvance);
    },
    [setTargetAdvance],
  );

  return (
    <RngToolForm<FormState, unknown[]>
      fields={fields}
      initialValues={initialValues}
      onUpdate={onUpdate}
    />
  );
};
