import React from "react";
import {
  Field,
  Flex,
  FormikSelect,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import { Typography } from "antd";

import Instructions from "./instructions_ace_change_sid.mdx";
import z from "zod";
import { emeraldLangs } from "./emeraldLang";
import { toOptions } from "~/utils/options";
import {
  BoxNameResult,
  convertAceResultToBoxNames,
  getBoxNameColumns,
} from "./aceBoxNameFormatter";
import { rngTools } from "~/rngTools";

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
  const [results, setResults] = React.useState<BoxNameResult[]>([]);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setResults([]);
    setHasError(false);
  }, [sid]);

  const manipName = `Change SID to ${sid}`;

  const initialValues = getInitialValues();

  const onSubmit: RngToolSubmit<FormState> = async (opts) => {
    setHasError(false);
    setResults([]);

    setTimeout(async () => {
      const res = await rngTools.get_emerald_sid_box_names_result(
        sid,
        opts.lang,
      );
      if (res == null) {
        setHasError(true);
        return;
      }

      setResults(convertAceResultToBoxNames(res));
    }, 100); // Without setTimeout, it's not obvious that something happened.
  };

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

  return (
    <Flex vertical>
      <Instructions />

      <Typography.Title level={4}> {manipName}</Typography.Title>

      <RngToolForm<FormState, BoxNameResult>
        getFields={getFields}
        results={results}
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        getColumns={getBoxNameColumns}
        submitTrackerId="emerald_ace_change_sid"
        rowKey="uid"
        pagination={false}
      />
      {hasError && (
        <Typography.Text type="danger">
          Error: Unable to generate the box names.
        </Typography.Text>
      )}
    </Flex>
  );
};
