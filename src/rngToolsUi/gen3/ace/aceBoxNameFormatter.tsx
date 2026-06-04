import { match } from "ts-pattern";
import type { EmeraldLang } from "./emeraldLang";
import { MarkdownCode } from "~/markdownExports/components";
import { CopyToClipboardButton, Flex, ResultColumn } from "~/components";
import React from "react";
import { AceResult } from "~/rngTools";

const SPACE = 0x00;
const EURO_CHARS = [
  "_",
  "À",
  "Á",
  "Â",
  "Ç",
  "È",
  "É",
  "Ê",
  "Ë",
  "Ì",
  null,
  "Î",
  "Ï",
  "Ò",
  "Ó",
  "Ô",
  "Œ",
  "Ù",
  "Ú",
  "Û",
  "Ñ",
  "ß",
  "à",
  "á",
  null,
  "ç",
  "è",
  "é",
  "ê",
  "ë",
  "ì",
  null,
  "î",
  "ï",
  "ò",
  "ó",
  "ô",
  "œ",
  "ù",
  "ú",
  "û",
  "ñ",
  "º",
  "ª",
  "ᵉʳ",
  "&",
  "+",
  null,
  null,
  null,
  null,
  null,
  "Lv",
  "=",
  ";",
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  "▯",
  "¿",
  "¡",
  "PK",
  "MN",
  "PO",
  "Ké",
  "0x57",
  "0x58",
  "0x59",
  "Í",
  "%",
  "(",
  ")",
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  "â",
  null,
  null,
  null,
  null,
  null,
  null,
  "í",
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  "⬆",
  "⬇",
  "⬅",
  "➡",
  "*",
  "*",
  "*",
  "*",
  "*",
  "*",
  "*",
  "ᵉ",
  "<",
  ">",
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  "ʳᵉ",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "!",
  "?",
  ".",
  "–",
  "・",
  "…",
  "“",
  "”",
  "‘",
  "’",
  "♂",
  "♀",
  "Pk$",
  ",",
  "×",
  "/",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "▶",
  ":",
  "Ä",
  "Ö",
  "Ü",
  "ä",
  "ö",
  "ü",
  null,
  null,
  null,
  "0xFA",
  "0xFB",
  "0xFC",
  "0xFD",
  "0xFE",
  "0xFF",
];

const JAP_CHARS = [
  "_",
  "あ",
  "い",
  "う",
  "え",
  "お",
  "か",
  "き",
  "く",
  "け",
  "こ",
  "さ",
  "し",
  "す",
  "せ",
  "そ",
  "た",
  "ち",
  "つ",
  "て",
  "と",
  "な",
  "に",
  "ぬ",
  "ね",
  "の",
  "は",
  "ひ",
  "ふ",
  "へ",
  "ほ",
  "ま",
  "み",
  "む",
  "め",
  "も",
  "や",
  "ゆ",
  "よ",
  "ら",
  "り",
  "る",
  "れ",
  "ろ",
  "わ",
  "を",
  "ん",
  "ぁ",
  "ぃ",
  "ぅ",
  "ぇ",
  "ぉ",
  "ゃ",
  "ゅ",
  "ょ",
  "が",
  "ぎ",
  "ぐ",
  "げ",
  "ご",
  "ざ",
  "じ",
  "ず",
  "ぜ",
  "ぞ",
  "だ",
  "ぢ",
  "づ",
  "で",
  "ど",
  "ば",
  "び",
  "ぶ",
  "べ",
  "ぼ",
  "ぱ",
  "ぴ",
  "ぷ",
  "ぺ",
  "ぽ",
  "っ",
  "ア",
  "イ",
  "ウ",
  "エ",
  "オ",
  "カ",
  "キ",
  "ク",
  "ケ",
  "コ",
  "サ",
  "シ",
  "ス",
  "セ",
  "ソ",
  "タ",
  "チ",
  "ツ",
  "テ",
  "ト",
  "ナ",
  "ニ",
  "ヌ",
  "ネ",
  "ノ",
  "ハ",
  "ヒ",
  "フ",
  "ヘ",
  "ホ",
  "マ",
  "ミ",
  "ム",
  "メ",
  "モ",
  "ヤ",
  "ユ",
  "ヨ",
  "ラ",
  "リ",
  "ル",
  "レ",
  "ロ",
  "ワ",
  "ヲ",
  "ン",
  "ァ",
  "ィ",
  "ゥ",
  "ェ",
  "ォ",
  "ャ",
  "ュ",
  "ョ",
  "ガ",
  "ギ",
  "グ",
  "ゲ",
  "ゴ",
  "ザ",
  "ジ",
  "ズ",
  "ゼ",
  "ゾ",
  "ダ",
  "ヂ",
  "ヅ",
  "デ",
  "ド",
  "バ",
  "ビ",
  "ブ",
  "ベ",
  "ボ",
  "パ",
  "ピ",
  "プ",
  "ペ",
  "ポ",
  "ッ",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "！",
  "？",
  "。",
  "ー",
  "・",
  "‥",
  "『",
  "』",
  "「",
  "」",
  "♂",
  "♀",
  "円",
  ".",
  "×",
  "/",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "▶",
  ":",
  "Ä",
  "Ö",
  "Ü",
  "ä",
  "ö",
  "ü",
  null,
  null,
  null,
  "0xFA",
  "0xFB",
  "0xFC",
  "0xFD",
  "0xFE",
  "0xFF",
];

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

let nextUid = 0;
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
