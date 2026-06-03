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
import { emeraldLangs } from "./emeraldLang";
import { toOptions } from "~/utils/options";
import {
  formatBoxCharacter,
  FormattedBoxCharacter,
} from "./aceBoxNameFormatter";

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

let nextUid = 0;
type BoxNameResult =
  | {
      uid: number;
      boxNum: null;
      allBoxesNamesTxt: string;
    }
  | {
      uid: number;
      boxNum: number;
      formattedBoxChars: FormattedBoxCharacter[];
    };

const getColumns = (): ResultColumn<BoxNameResult>[] => {
  return [
    {
      title: "Box",
      dataIndex: "boxNum",
      render: (boxNum) => {
        if (boxNum === null) {
          return "All Boxes";
        }
        return `Box ${boxNum}`;
      },
    },
    {
      title: "Box Name",
      dataIndex: "boxNum",
      render: (_, values) => {
        if (values.boxNum === null) {
          return (
            <CopyToClipboardButton text={values.allBoxesNamesTxt} size="small">
              {""}
            </CopyToClipboardButton>
          );
        }

        const boxNameTxt = values.formattedBoxChars
          .map((byte) => byte.charTxt)
          .join("");
        return (
          <Flex gap={30}>
            <CopyToClipboardButton text={boxNameTxt} size="small">
              {""}
            </CopyToClipboardButton>{" "}
            <Flex gap={5}>
              {values.formattedBoxChars.map((byte, i) => (
                <React.Fragment key={`${i}-${byte.charTxt}`}>
                  {byte.charReact}
                </React.Fragment>
              ))}
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
      const { lang } = opts;
      const res = await getEmeraldSidBoxNames(sid, lang);
      setHasError(!res.success);

      if (res.success) {
        const allBoxesNamesFormatted = res.raw_boxes.map((bytes) =>
          bytes.map((byte) => formatBoxCharacter(byte, lang)),
        );

        const allBoxesNamesTxt = allBoxesNamesFormatted
          .map((bytes) => bytes.map((byte) => byte.charTxt).join(""))
          .join("\n");

        setResults([
          ...allBoxesNamesFormatted.map((box, i) => {
            return {
              uid: nextUid++,
              boxNum: i + 1,
              formattedBoxChars: box,
            };
          }),
          {
            uid: nextUid++,
            boxNum: null,
            allBoxesNamesTxt,
          },
        ]);
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
