import { match } from "ts-pattern";
import type { EmeraldLang } from "./emeraldLang";
import { MarkdownCode } from "~/markdownExports/components";
import { CopyToClipboardButton, Flex, ResultColumn } from "~/components";
import React from "react";
import { AceResult } from "~/rngTools";
import { EURO_CHARS, JAP_CHARS } from "./chars";

const SPACE = 0x00;

const EURO_AVAILABLE = new Set([
  0x00, 0xa1, 0xa2, 0xa3, 0xa4, 0xa5, 0xa6, 0xa7, 0xa8, 0xa9, 0xaa, 0xab, 0xac,
  0xad, 0xae, 0xb0, 0xb1, 0xb2, 0xb3, 0xb4, 0xb5, 0xb6, 0xb8, 0xba, 0xbb, 0xbc,
  0xbd, 0xbe, 0xbf, 0xc0, 0xc1, 0xc2, 0xc3, 0xc4, 0xc5, 0xc6, 0xc7, 0xc8, 0xc9,
  0xca, 0xcb, 0xcc, 0xcd, 0xce, 0xcf, 0xd0, 0xd1, 0xd2, 0xd3, 0xd4, 0xd5, 0xd6,
  0xd7, 0xd8, 0xd9, 0xda, 0xdb, 0xdc, 0xdd, 0xde, 0xdf, 0xe0, 0xe1, 0xe2, 0xe3,
  0xe4, 0xe5, 0xe6, 0xe7, 0xe8, 0xe9, 0xea, 0xeb, 0xec, 0xed, 0xee,
]);
const GERMAN_EXTRA_AVAILABLE = new Set([0xf1, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6]);
const JAP_UNAVAILABLE = new Set([
  0xb7, 0xb8, 0xb9, 0xef, 0xf0, 0xf1, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xfa, 0xfb,
  0xfc, 0xfd, 0xfe, 0xff,
]);

export const getCharset = (
  lang: EmeraldLang,
): {
  lang: EmeraldLang;
  chars: (string | null)[];
} => {
  const chars = lang === "Japanese" ? JAP_CHARS.slice() : EURO_CHARS.slice();
  if (lang === "French") {
    chars[0xb1] = "«";
    chars[0xb2] = "»";
  } else if (lang === "German") {
    chars[0xb1] = "„";
    chars[0xb2] = "“";
  }
  return { lang, chars };
};

export const isCharAvailable = (char: number, lang: EmeraldLang) => {
  if (lang === "Japanese") {
    return char >= 0 && char <= 0xff && !JAP_UNAVAILABLE.has(char);
  }
  if (lang === "German" && GERMAN_EXTRA_AVAILABLE.has(char)) {
    return true;
  }
  return EURO_AVAILABLE.has(char);
};

export type EmeraldCharset = ReturnType<typeof getCharset>;

const formatBoxCharacterAsTxt = (char: number, cs: EmeraldCharset) => {
  if (char === SPACE) {
    return " ";
  }

  if (!isCharAvailable(char, cs.lang)) {
    return "✖";
  }
  return cs.chars[char] ?? "";
};

export type FormattedBoxCharacter = {
  charTxt: string;
  charReact: React.ReactNode;
};

export const formatBoxCharacter = (
  char: number,
  lang: EmeraldLang,
): FormattedBoxCharacter => {
  const cs = getCharset(lang);

  const charTxt = formatBoxCharacterAsTxt(char, cs);
  const charHtml = char === SPACE ? "\u00a0" : charTxt;
  const title = match(charTxt)
    .with(" ", () => "Space")
    .with("l", () => "Lowercase L letter")
    .with("I", () => "Uppercase i letter")
    .with("1", () => "Number 1")
    .with("o", () => "Lowercase o letter")
    .with("O", () => "Uppercase O letter")
    .with("0", () => "Number 0")
    .otherwise(() => undefined);

  return {
    charTxt,
    charReact: (
      <MarkdownCode>
        <span title={title}>{charHtml}</span>
      </MarkdownCode>
    ),
  };
};

export type BoxNameResult =
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

export const getBoxNameColumns = (): ResultColumn<BoxNameResult>[] => {
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

let nextUid = 0;
export const convertAceResultToBoxNames = (res: AceResult): BoxNameResult[] => {
  const allBoxesNamesFormatted = res.raw_boxes.map((bytes) =>
    bytes.map((byte) => formatBoxCharacter(byte, res.lang)),
  );

  const allBoxesNamesTxt = allBoxesNamesFormatted
    .map((bytes) => bytes.map((byte) => byte.charTxt).join(""))
    .join("\n");

  return [
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
  ];
};
