import React from "react";
import { Field, Flex, FormikSelect } from "~/components";
import { Typography } from "antd";

import Instructions from "./instructions_ace_change_sid.mdx";
import z from "zod";
import { emeraldLangs } from "./emeraldLang";
import { toOptions } from "~/utils/options";
import { rngTools } from "~/rngTools";
import { AceForm } from "./aceForm";

type Props = {
  sid: number;
};

const schema = z.object({
  lang: z.enum(emeraldLangs),
});

const getInitialValues = (): FormState => {
  return {
    lang: "English",
  };
};

export type FormState = z.infer<typeof schema>;

export const EmeraldAceChangeSid = ({ sid }: Props) => {
  const manipName = `Change SID to ${sid}`;

  const initialValues = getInitialValues();

  const getFields = (): Field[] => {
    return [
      {
        label: "Game Language",
        input: (
          <FormikSelect<FormState, "lang">
            name="lang"
            options={toOptions(emeraldLangs)}
          />
        ),
      },
    ];
  };

  const onSubmit = (values: FormState) => {
    return rngTools.get_emerald_sid_box_names_result(sid, values.lang);
  };

  return (
    <Flex vertical>
      <Instructions />

      <Typography.Title level={4}> {manipName}</Typography.Title>

      <AceForm<FormState>
        key={sid}
        getFields={getFields}
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </Flex>
  );
};
