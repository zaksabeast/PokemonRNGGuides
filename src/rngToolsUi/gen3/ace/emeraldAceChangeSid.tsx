import React from "react";
import { AceResult, getEmeraldSidBoxNames } from "./aceCodeGenerator";
import { Flex, FormikSelect, RngToolForm, RngToolSubmit } from "~/components";
import { Typography } from "antd";

import Instructions from "./instructions_ace_change_sid.mdx";
import z from "zod";
import { emeraldLangOptions, emeraldLangs } from "./emeraldLang";

type Props = {
  sid: number;
};

const schema = z.object({
  lang: z.enum(emeraldLangs),
});

const getInitialValues = (): FormState => {
  return {
    lang: "eng",
  };
};

export type FormState = z.infer<typeof schema>;

const longestBoxNameLength = 8;
const spacedBoxNameLength = longestBoxNameLength * 2 - 1;

export const BoxNames = ({ boxNames, manipName }: Props) => {
  return (
    <Flex vertical>
      <pre style={{ fontFamily: "monospace" }}>
        {boxNames.map(formatBoxNameLine).join("\n")}
      </pre>
    </Flex>
  );
};

const formatBoxNameLine = (boxName: string, i: number) => {
  const spacedBoxName = [...boxName]
    .map((char) => (char === " " ? "_" : char))
    .join(" ");

  return `Box ${(i + 1).toString().padStart(2)}:    ${spacedBoxName.padEnd(spacedBoxNameLength)}    [${boxName}]`;
};

export const EmeraldAceChangeSid = ({ sid }: Props) => {
  const [aceResult, setAceResult] = React.useState<AceResult | null>(null);
  const lang = "eng"; // NO_PROD

  React.useEffect(() => {
    getEmeraldSidBoxNames(sid, lang).then((res) => {
      setAceResult(res);
    });
  }, [sid]);

  const manipName = `Change SID to ${sid}`;

  const initialValues = getInitialValues();

  const onSubmit: RngToolSubmit<FormState> = async (opts) => {
    //TODO
  };

  const fields = [
    {
      label: "Language",
      input: (
        <FormikSelect<FormState, "lang">
          name="lang"
          options={emeraldLangOptions}
        />
      ),
    },
  ];

  return (
    <Flex vertical>
      <Instructions />

      <Typography.Title level={4}> {manipName}</Typography.Title>

      <RngToolForm<FormState, never>
        fields={fields}
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        submitTrackerId="emerald_ace_change_sid"
        rowKey="uid"
      />
    </Flex>
  );
};
