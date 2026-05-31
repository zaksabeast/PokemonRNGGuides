import React from "react";
import { getEmeraldSidBoxNames } from "./aceCodeGenerator";
import {
  CopyToClipboardButton,
  Field,
  Flex,
  FormikSelect,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import { Typography } from "antd";

import Instructions from "./instructions_ace_change_sid.mdx";
import z from "zod";
import { emeraldLangOptions, emeraldLangs } from "./emeraldLang";
import { MarkdownCode } from "~/markdownExports/components";
import { match } from "ts-pattern";

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

let nextUid = 0;
type BoxNameResult = {
  uid: number;
  boxNum: number;
  boxName: string;
};

const getColumns = (): ResultColumn<BoxNameResult>[] => {
  return [
    {
      title: "Box",
      dataIndex: "boxNum",
      render: (boxNum) => {
        if (boxNum === 0) {
          return "All Boxes";
        }
        return `Box ${boxNum}`;
      },
    },
    {
      title: "Box Name",
      dataIndex: "boxName",
      render: (boxName, values) => {
        if (values.boxNum === 0) {
          return (
            <CopyToClipboardButton text={boxName} size="small">
              {""}
            </CopyToClipboardButton>
          );
        }

        return (
          <Flex gap={30}>
            <CopyToClipboardButton text={boxName} size="small">
              {""}
            </CopyToClipboardButton>{" "}
            <Flex gap={5}>
              {boxName
                .split("")
                .map((char) => {
                  return match(char)
                    .with(" ", () => <span title="Space">{"\u00a0"}</span>)
                    .with("l", () => (
                      <span title="Lowercase l letter">{char}</span>
                    ))
                    .with("1", () => <span title="Number 1">{char}</span>)
                    .with("o", () => (
                      <span title="Lowercase o letter">{char}</span>
                    ))
                    .with("O", () => (
                      <span title="Uppercase O letter">{char}</span>
                    ))
                    .with("0", () => <span title="Number 0">{char}</span>)
                    .otherwise(() => char);
                })
                .map((char, i) => {
                  return <MarkdownCode key={i}>{char}</MarkdownCode>;
                })}
            </Flex>
          </Flex>
        );
      },
    },
  ];
};

export const EmeraldAceChangeSid = ({ sid }: Props) => {
  const [results, setResults] = React.useState<BoxNameResult[]>([]);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {}, [sid]);

  const manipName = `Change SID to ${sid}`;

  const initialValues = getInitialValues();

  const onSubmit: RngToolSubmit<FormState> = async (opts) => {
    setHasError(false);
    setResults([]);

    setTimeout(async () => {
      const res = await getEmeraldSidBoxNames(sid, opts.lang);
      setHasError(!res.success);

      if (res.success) {
        const allBoxesNames = res.boxes.join("\n");
        setResults(
          res.boxes
            .map((box, i) => {
              return {
                uid: nextUid++,
                boxNum: i + 1,
                boxName: box,
              };
            })
            .concat({
              uid: nextUid++,
              boxNum: 0,
              boxName: allBoxesNames,
            }),
        );
      }
    }, 100);
  };

  const getFields = (): Field[] => {
    return [
      {
        label: "Game Language",
        input: (
          <FormikSelect<FormState, "lang">
            name="lang"
            options={emeraldLangOptions}
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
        getColumns={getColumns}
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
