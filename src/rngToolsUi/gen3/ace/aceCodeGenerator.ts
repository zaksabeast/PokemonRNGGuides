export type EmeraldLanguage = "eng" | "fra" | "ita" | "spa" | "ger" | "jap";

const MAX_CARDS = 6;

const EOF = 0xff;
const SPACE = 0x00;
const NAME_SIZE = 8;
const PADDING = [0x00, 0x00, 0x00, 0x00];

const parseHexBytes = (hex: string): number[] => {
  const out: number[] = [];
  for (let i = 0; i < hex.length; i += 2) {
    out.push(parseInt(hex.slice(i, i + 2), 16));
  }
  return out;
};

const DEFAULT_FILLERS = {
  nopCode: [0xff, 0xff, 0xff, 0xff],
  nopCodeAlt: [0xbb, 0xff, 0xff, 0xff],
  fillers: [
    [0xff, 0xbb, 0xbb, 0xbb],
    [0xff, 0xff, 0xbb, 0xbb],
    [0xff, 0xff, 0xff, 0xbb],
    [0xff, 0xff, 0xff, 0xff],
  ],
  rewriting: [
    {
      pre: parseHexBytes("FFBBBBBB00000000FFFFBBBB"),
      post: parseHexBytes("FFBBFFFFFFFFFFFFFFFFBBBB"),
    },
    {
      pre: parseHexBytes("FFFFBBBB00000000FFFFFFBB"),
      post: parseHexBytes("FFFFBBFFFFFFFFFFFFFFFFBB"),
    },
  ],
};

const COND_AL = 0xe;
const REG = { r0: 0, r11: 11, r12: 12, lr: 14, pc: 15 };
const UINT32 = 0x100000000;

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

const charset = (
  lang: EmeraldLanguage,
): {
  lang: EmeraldLanguage;
  chars: (string | null)[];
} => {
  const chars = lang === "jap" ? JAP_CHARS.slice() : EURO_CHARS.slice();
  if (lang === "fra") {
    chars[0xb1] = "«";
    chars[0xb2] = "»";
  } else if (lang === "ger") {
    chars[0xb1] = "„";
    chars[0xb2] = "“";
  }
  return { lang, chars };
};

const isCodeAvailable = (code: number, lang: EmeraldLanguage) => {
  if (lang === "jap") {
    return code >= 0 && code <= 0xff && !JAP_UNAVAILABLE.has(code);
  }
  if (lang === "ger" && GERMAN_EXTRA_AVAILABLE.has(code)) {
    return true;
  }
  return EURO_AVAILABLE.has(code);
};

type EmeraldCharset = ReturnType<typeof charset>;
type Bytes = number[];
type PackedByte = { byte: number; command: boolean };
type SynthOptions = {
  maxCard: number;
  additive: boolean;
  incr: boolean;
  validFirst: (value: number) => boolean;
  validRest: (value: number) => boolean;
};
type TweakMovOptions = { preferSubtractive?: boolean };
type ExitInstruction = ["adc" | "sbc" | "bic", number, number, number];
type AceResult = {
  language: EmeraldLanguage;
  boxes: string[];
  rawBoxes: Bytes[];
  commands: { bytes: Bytes; hex: string }[];
};

const writableCharAt = (code: number, cs: EmeraldCharset): string | null => {
  if (!isCodeAvailable(code, cs.lang)) {
    return "✖";
  }
  return cs.chars[code];
};

const boxNameCharAt = (code: number, cs: EmeraldCharset): string | null => {
  return code === SPACE ? " " : writableCharAt(code, cs);
};

const uint32Compare = (left: number, right: number): number => {
  const uintLeft = left >>> 0;
  const uintRight = right >>> 0;
  return uintLeft === uintRight ? 0 : uintLeft > uintRight ? 1 : -1;
};

const ror = (value: number, bits: number): number => {
  const uintValue = value >>> 0;
  const maskedBits = bits & 31;
  return ((uintValue >>> maskedBits) | (uintValue << (32 - maskedBits))) >>> 0;
};

const rol = (value: number, bits: number): number => {
  const uintValue = value >>> 0;
  const maskedBits = bits & 31;
  return ((uintValue << maskedBits) | (uintValue >>> (32 - maskedBits))) >>> 0;
};

const decomposeImmediate = (imm: number): [number, number][] => {
  const uintImmediate = imm >>> 0;
  const out: [number, number][] = [];
  let rotated = uintImmediate;
  for (let rotation = 0; rotation <= 15; rotation++) {
    const imm8 = rotated & 0xff;
    if (imm8 === rotated) {
      out.push([rotation, imm8]);
    }
    rotated = rol(rotated, 2);
  }
  return out;
};

const addrMode1Immediate = (imm: number): number[] => {
  return decomposeImmediate(imm).map(
    ([rot, imm8]) => (0x02000000 | (rot << 8) | imm8) >>> 0,
  );
};

const dataProc = (
  opcode: number,
  setFlags: boolean,
  rd: number,
  rn: number,
  imm: number,
): number[] => {
  const base =
    ((COND_AL << 28) |
      opcode |
      (setFlags ? 0x00100000 : 0) |
      (rn << 16) |
      (rd << 12)) >>>
    0;
  return addrMode1Immediate(imm).map((mode) => (base | mode) >>> 0);
};

const movLike = (
  mvn: boolean,
  setFlags: boolean,
  rd: number,
  imm: number,
): number[] => {
  const opcodes = mvn ? [0x01e00000] : [0x01a00000, 0x01ad0000];
  const modes = addrMode1Immediate(imm);
  const out: number[] = [];
  for (const opcode of opcodes) {
    const base =
      ((COND_AL << 28) | opcode | (setFlags ? 0x00100000 : 0) | (rd << 12)) >>>
      0;
    for (const mode of modes) {
      out.push((base | mode) >>> 0);
    }
  }
  return out;
};

const strh = (rd: number, rn: number, offset: number): number[] => {
  const immL = offset & 0xf;
  const immH = (offset >>> 4) & 0xf;
  return [
    ((COND_AL << 28) |
      0x004000b0 |
      (1 << 24) |
      (1 << 23) |
      (1 << 22) |
      (rn << 16) |
      (rd << 12) |
      (immH << 8) |
      immL) >>>
      0,
  ];
};

const strPre = (rd: number, rn: number, offset: number): number[] => {
  return [
    ((COND_AL << 28) |
      0x04000000 |
      (1 << 24) |
      (1 << 23) |
      (1 << 21) |
      (rn << 16) |
      (rd << 12) |
      offset) >>>
      0,
  ];
};

const commandBytes = (command: number): Bytes => {
  return [
    command & 0xff,
    (command >>> 8) & 0xff,
    (command >>> 16) & 0xff,
    (command >>> 24) & 0xff,
  ];
};

const commandForBytes = (bytes: Bytes): number => {
  return (
    (bytes[0] | (bytes[1] << 8) | (bytes[2] << 16) | (bytes[3] << 24)) >>> 0
  );
};

const scoreBytes = (bytes: Bytes, lang: EmeraldLanguage): number => {
  const bad: [number, number][] = [];
  for (let i = 0; i < bytes.length; i++) {
    if (!isCodeAvailable(bytes[i], lang)) {
      bad.push([i, bytes[i]]);
    }
  }
  if (bad.some(([, byte]) => byte !== EOF)) {
    return Number.MAX_SAFE_INTEGER;
  }
  let score = 0;
  let last = null;
  for (const [i] of bad) {
    score += last === null || i === last + 1 ? 1 : 5;
    last = i;
  }
  return score;
};

const preferredBytes = (commands: number[], lang: EmeraldLanguage): Bytes => {
  let best: Bytes | null = null;
  let bestScore = Number.MAX_SAFE_INTEGER;
  for (const command of commands) {
    const bytes = commandBytes(command);
    const score = scoreBytes(bytes, lang);
    if (score < bestScore) {
      bestScore = score;
      best = bytes;
    }
  }
  if (best === null || bestScore === Number.MAX_SAFE_INTEGER) {
    throw new Error("No writable encoding found.");
  }
  return best;
};

const buildConstants = (lang: EmeraldLanguage, movMvn: boolean): number[] => {
  const set = new Set<number>();
  for (let i = 0; i <= 0xff; i++) {
    if (!isCodeAvailable(i, lang)) {
      continue;
    }
    let rotated = i >>> 0;
    do {
      set.add(rotated >>> 0);
      rotated = ror(rotated, 2);
    } while (rotated !== i);
  }
  if (movMvn) {
    for (const value of Array.from(set)) {
      set.add(~value >>> 0);
    }
  }
  return Array.from(set).sort((left, right) => uint32Compare(left, right));
};

// Find the shortest writable constant sequence that reaches target using the
// requested additive/subtractive encoding strategy.
const synthesize = (
  target: number,
  constants: number[],
  opts: SynthOptions,
): number[] | null => {
  const maxCard = opts.maxCard;
  const additive = opts.additive;
  const incr = opts.incr;
  const validFirst = opts.validFirst;
  const validRest = opts.validRest;
  const descending = constants.slice().reverse();
  const initial = additive ? descending : constants;
  const restConstants = descending.filter(validRest);
  const restSet = new Set(restConstants);
  const pairSums = new Map<number, [number, number]>();
  const firstAtMost = (arr: number[], limit: number): number => {
    const uintLimit = limit >>> 0;
    let lo = 0;
    let hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (uint32Compare(arr[mid], uintLimit) <= 0) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }
    return lo;
  };
  const remDepthCanReach = (
    candidate: number,
    depthLeft: number,
    remaining: number,
  ): boolean => {
    const value = incr ? (candidate + 1) >>> 0 : candidate;
    return value * depthLeft >= remaining >>> 0;
  };
  const contribution = (candidate: number): number =>
    incr ? (candidate + 1) >>> 0 : candidate;
  for (const first of restConstants) {
    const firstValue = contribution(first);
    for (const second of restConstants) {
      const secondValue = contribution(second);
      if (firstValue < secondValue) {
        continue;
      }
      const sum = firstValue + secondValue;
      if (sum >= UINT32 || pairSums.has(sum)) {
        continue;
      }
      pairSums.set(sum, [first, second]);
    }
  }
  const removeAdd = (arr: number[], i: number): number[] =>
    arr.filter((j) => uint32Compare(i, j) >= 0);
  const removeSub = (arr: number[], i: number): number[] =>
    arr.filter((j) => uint32Compare(i, j) <= 0);

  let failed = new Set<number>();
  const synthesizeTail = (
    acc: number[],
    remaining: number,
    card: number,
    pool: number[],
  ): boolean => {
    if (remaining === 0) {
      return true;
    }
    if (acc.length >= card) {
      return false;
    }
    const depthLeft = card - acc.length;
    const key = depthLeft * UINT32 + (remaining >>> 0);
    if (failed.has(key)) {
      return false;
    }
    if (depthLeft === 1) {
      const candidate = incr ? (remaining - 1) >>> 0 : remaining;
      if (restSet.has(candidate)) {
        acc.push(candidate);
        return true;
      }
      failed.add(key);
      return false;
    }
    const limit = incr ? (remaining - 1) >>> 0 : remaining;
    for (let i = firstAtMost(pool, limit); i < pool.length; i++) {
      const candidate = pool[i];
      if (!remDepthCanReach(candidate, depthLeft, remaining)) {
        break;
      }
      const nextRemaining =
        (remaining - (incr ? (candidate + 1) >>> 0 : candidate)) >>> 0;
      acc.push(candidate);
      if (nextRemaining === 0) {
        return true;
      }
      if (depthLeft === 2) {
        const last = incr ? (nextRemaining - 1) >>> 0 : nextRemaining;
        if (restSet.has(last)) {
          acc.push(last);
          return true;
        }
      } else if (depthLeft === 3) {
        const pair = pairSums.get(nextRemaining);
        if (pair !== undefined) {
          acc.push(pair[0], pair[1]);
          return true;
        }
      } else if (synthesizeTail(acc, nextRemaining, card, pool)) {
        return true;
      }
      acc.pop();
    }
    failed.add(key);
    return false;
  };

  for (let card = 1; card <= maxCard; card++) {
    failed = new Set<number>();
    const starts = (
      additive ? removeAdd(initial, target) : removeSub(constants, target)
    ).filter(validFirst);
    for (const first of starts) {
      const remainder = additive
        ? (target - first) >>> 0
        : (first - target) >>> 0;
      const acc = [first];
      if (synthesizeTail(acc, remainder, card, restConstants)) {
        return acc.slice();
      }
    }
  }

  return null;
};

const isValidCommandBytes = (bytes: Bytes, lang: EmeraldLanguage): boolean => {
  return scoreBytes(bytes, lang) !== Number.MAX_SAFE_INTEGER;
};

const hasWritableEncoding = (
  commands: number[],
  lang: EmeraldLanguage,
): boolean => {
  try {
    return isValidCommandBytes(preferredBytes(commands, lang), lang);
  } catch {
    return false;
  }
};

const tweakMov = (
  rd: number,
  imm: number,
  lang: EmeraldLanguage,
  constants: number[],
  constantsMovMvn: number[],
  options?: TweakMovOptions,
): Bytes[] => {
  const preferSubtractive = options?.preferSubtractive === true;
  const constantsSet = new Set(constants);
  const validFirst = (fst: number): boolean => {
    const useMov = constantsSet.has(fst) || !constantsSet.has(~fst >>> 0);
    return hasWritableEncoding(
      useMov
        ? movLike(false, false, rd, fst)
        : movLike(true, false, rd, ~fst >>> 0),
      lang,
    );
  };
  const validAdd = (i: number): boolean =>
    hasWritableEncoding(dataProc(0x00a00000, rd === 0, rd, rd, i), lang);
  const validSub = (i: number): boolean =>
    hasWritableEncoding(dataProc(0x00c00000, false, rd, rd, i), lang);
  let parts: number[] | null = null;
  let additive = true;
  const tryAdditive = (card: number): number[] | null =>
    synthesize(imm >>> 0, constantsMovMvn, {
      maxCard: card,
      additive: true,
      incr: false,
      validFirst,
      validRest: validAdd,
    });
  const trySubtractive = (card: number): number[] | null =>
    synthesize(imm >>> 0, constantsMovMvn, {
      maxCard: card,
      additive: false,
      incr: true,
      validFirst,
      validRest: validSub,
    });
  for (let card = 1; card <= MAX_CARDS && parts === null; card++) {
    parts = preferSubtractive ? trySubtractive(card) : tryAdditive(card);
    if (parts !== null) {
      additive = !preferSubtractive;
      break;
    }
    parts = preferSubtractive ? tryAdditive(card) : trySubtractive(card);
    if (parts !== null) {
      additive = preferSubtractive;
    }
  }
  if (parts === null) {
    throw new Error("Unable to synthesize MOV immediate.");
  }
  const [first, ...rest] = parts;
  const useMov = constants.includes(first) || !constants.includes(~first >>> 0);
  const out = [
    preferredBytes(
      useMov
        ? movLike(false, false, rd, first)
        : movLike(true, false, rd, ~first >>> 0),
      lang,
    ),
  ];
  for (const part of rest) {
    out.push(
      preferredBytes(
        additive
          ? dataProc(0x00a00000, rd === 0, rd, rd, part)
          : dataProc(0x00c00000, false, rd, rd, part),
        lang,
      ),
    );
  }
  return out;
};

const tweakSbc = (
  rd: number,
  rn: number,
  imm: number,
  lang: EmeraldLanguage,
  constants: number[],
): Bytes[] => {
  const validFirst = (fst: number): boolean =>
    hasWritableEncoding(dataProc(0x00c00000, false, rd, rn, fst), lang);
  const validAdd = (i: number): boolean =>
    hasWritableEncoding(dataProc(0x00c00000, false, rd, rd, i), lang);
  const validSub = (i: number): boolean =>
    hasWritableEncoding(dataProc(0x00a00000, false, rd, rd, i), lang);
  let parts: number[] | null = null;
  let additive = true;
  for (let card = 1; card <= MAX_CARDS && parts === null; card++) {
    parts = synthesize(imm >>> 0, constants, {
      maxCard: card,
      additive: true,
      incr: true,
      validFirst,
      validRest: validAdd,
    });
    if (parts !== null) {
      additive = true;
      break;
    }
    parts = synthesize(imm >>> 0, constants, {
      maxCard: card,
      additive: false,
      incr: false,
      validFirst,
      validRest: validSub,
    });
    if (parts !== null) {
      additive = false;
    }
  }
  if (parts === null) {
    throw new Error("Unable to synthesize SBC immediate.");
  }
  const [first, ...rest] = parts;
  const out = [
    preferredBytes(dataProc(0x00c00000, false, rd, rn, first), lang),
  ];
  for (const part of rest) {
    out.push(
      preferredBytes(
        additive
          ? dataProc(0x00c00000, false, rd, rd, part)
          : dataProc(0x00a00000, false, rd, rd, part),
        lang,
      ),
    );
  }
  return out;
};

const sidProgramBytes = (sid: number, lang: EmeraldLanguage): Bytes[] => {
  const constants = buildConstants(lang, false);
  const constantsMovMvn = buildConstants(lang, true);
  const out: Bytes[] = [];
  out.push(...tweakSbc(REG.r11, REG.pc, 0xd0f7, lang, constants));
  out.push(...tweakMov(REG.r12, sid, lang, constants, constantsMovMvn));
  out.push(preferredBytes(strh(REG.r12, REG.r11, 2), lang));
  return out;
};

const seedProgramBytes = (seed: number, lang: EmeraldLanguage): Bytes[] => {
  const constants = buildConstants(lang, false);
  const constantsMovMvn = buildConstants(lang, true);
  const out: Bytes[] = [];
  out.push(preferredBytes(movLike(false, true, REG.r12, 0x3000000), lang));
  out.push(
    preferredBytes(dataProc(0x00a00000, false, REG.r12, REG.r12, 0x2d80), lang),
  );
  out.push(
    preferredBytes(dataProc(0x00a00000, false, REG.r12, REG.r12, 0x3000), lang),
  );
  out.push(...tweakMov(REG.r11, seed, lang, constants, constantsMovMvn));
  out.push(preferredBytes(strPre(REG.r11, REG.r12, 0), lang));
  return out;
};

const certificateExit = (
  lang: EmeraldLanguage,
): { start: number; bytes: Bytes[] } => {
  const variants: Partial<Record<EmeraldLanguage, ExitInstruction[]>> = {
    eng: [
      ["sbc", REG.r12, REG.lr, 0x2c40],
      ["adc", REG.r12, REG.r12, 0xd30000],
      ["bic", REG.r12, REG.r12, 0xc00000],
      ["adc", REG.r12, REG.r12, 0x3fc0],
      ["sbc", REG.r0, REG.r12, 0xb0],
    ],
    fra: [
      ["adc", REG.r12, REG.lr, 0xe30],
      ["adc", REG.r12, REG.r12, 0xd30000],
      ["bic", REG.r12, REG.r12, 0xc00000],
      ["adc", REG.r0, REG.r12, 0xe2],
    ],
    ger: [
      ["adc", REG.r12, REG.lr, 0xe10],
      ["adc", REG.r12, REG.r12, 0xd30000],
      ["bic", REG.r12, REG.r12, 0xc00000],
      ["adc", REG.r0, REG.r12, 0xe2],
    ],
    ita: [
      ["adc", REG.r12, REG.lr, 0xe00],
      ["adc", REG.r12, REG.r12, 0xd30000],
      ["bic", REG.r12, REG.r12, 0xc00000],
      ["adc", REG.r0, REG.r12, 0xde],
    ],
    spa: [
      ["adc", REG.r12, REG.lr, 0xe10],
      ["adc", REG.r12, REG.r12, 0xd30000],
      ["bic", REG.r12, REG.r12, 0xc00000],
      ["adc", REG.r0, REG.r12, 0xd6],
    ],
  };

  const commandBytesFor = ([op, rd, rn, imm]: ExitInstruction): Bytes => {
    const opcodes = { adc: 0x00a00000, sbc: 0x00c00000, bic: 0x01c00000 };
    return preferredBytes(dataProc(opcodes[op], false, rd, rn, imm), lang);
  };
  const common = [
    preferredBytes(movLike(true, false, REG.r11, 0xee00000), lang),
    preferredBytes(dataProc(0x00c00000, false, REG.r11, REG.r11, 0xed), lang),
    preferredBytes(
      dataProc(0x00c00000, false, REG.r11, REG.r11, 0xff00000),
      lang,
    ),
    preferredBytes(dataProc(0x00a00000, true, REG.r12, REG.pc, 0x30), lang),
    preferredBytes(strPre(REG.r11, REG.r12, 0), lang),
  ];
  const commands = variants[lang] ?? variants.eng;
  if (commands === undefined) {
    throw new Error("No certificate exit commands found.");
  }
  return {
    start: 72,
    bytes: common.concat(commands.map(commandBytesFor)),
  };
};

const noEof = (bytes: Bytes): boolean => {
  return bytes.every((byte) => byte !== EOF);
};

const onlyEof = (bytes: Bytes): boolean => {
  return bytes.every((byte) => byte === EOF);
};

const firstNonEofIndex = (bytes: Bytes): number => {
  const i = bytes.findIndex((byte) => byte !== EOF);
  return i < 0 ? bytes.length : i;
};

const usableEofIndex = (bytes: Bytes): number => {
  let i = 0;
  while (i < bytes.length && bytes[i] !== EOF) {
    i++;
  }
  while (i < bytes.length && bytes[i] === EOF) {
    i++;
  }
  return bytes.length - 1 - (bytes.length - i);
};

const nopCodeAtPos = (pos: number): Bytes => {
  const wrappedPos = pos % (NAME_SIZE + 1);
  return wrappedPos + 4 <= NAME_SIZE
    ? PADDING
    : DEFAULT_FILLERS.fillers[NAME_SIZE - wrappedPos];
};

const pack = (flag: boolean, bytes: Bytes): PackedByte[] => {
  return bytes.map((byte) => ({ byte, command: flag }));
};

const fitCodeAtPos = (
  pos: number,
  bytes: Bytes,
  next: Bytes | null,
): PackedByte[] => {
  const nextBytes = next !== null && onlyEof(next) ? null : next;
  for (let tries = NAME_SIZE + 1; tries > 0; tries--) {
    const bytePos = pos % (NAME_SIZE + 1);
    const byteCount = bytes.length;
    let ok: boolean;
    if (noEof(bytes)) {
      ok = bytePos + byteCount <= NAME_SIZE;
    } else {
      const eofIndex = usableEofIndex(bytes);
      ok =
        bytePos + eofIndex === NAME_SIZE ||
        (eofIndex === byteCount - 1 &&
          bytePos + byteCount <= NAME_SIZE &&
          (bytePos +
            byteCount +
            firstNonEofIndex(nopCodeAtPos(bytePos + byteCount)) -
            1 ===
            NAME_SIZE ||
            (nextBytes !== null
              ? bytePos + byteCount + firstNonEofIndex(nextBytes) - 1 ===
                NAME_SIZE
              : true)));
    }
    if (ok) {
      return pack(true, bytes);
    }
    const nop = nopCodeAtPos(bytePos);
    return pack(false, nop).concat(fitCodeAtPos(pos + 4, bytes, nextBytes));
  }
  throw new Error("Box fitting algorithm failed.");
};

const addCodesAfter = (
  res: PackedByte[],
  commands: Bytes[],
  final: boolean,
): PackedByte[] => {
  let acc = res.slice();
  for (let i = 0; i < commands.length; i++) {
    const next =
      i === commands.length - 1 ? (final ? null : PADDING) : commands[i + 1];
    acc = acc.concat(fitCodeAtPos(acc.length, commands[i], next));
  }
  return acc;
};

const padNb = (pos: number, nb: number): Bytes => {
  if (nb < 0) {
    throw new Error("Cannot pad requested amount.");
  }
  const out: Bytes = [];
  let currentPos = pos;
  let remaining = nb;
  while (remaining > 0) {
    const bytePos = currentPos % (NAME_SIZE + 1);
    const code =
      bytePos + 4 <= NAME_SIZE
        ? PADDING
        : DEFAULT_FILLERS.fillers[NAME_SIZE - bytePos];
    out.push(...code);
    currentPos += 4;
    remaining -= 4;
  }
  return out;
};

const rewriteBytes = (bytes: Bytes): Bytes => {
  let out = bytes.slice();
  for (let pos = 0; pos + 4 <= out.length; pos += 4) {
    for (const rule of DEFAULT_FILLERS.rewriting) {
      const part = out.slice(pos, pos + rule.pre.length);
      if (
        part.length === rule.pre.length &&
        part.every((byte, index) => byte === rule.pre[index])
      ) {
        out = out
          .slice(0, pos)
          .concat(rule.post, out.slice(pos + rule.pre.length));
        break;
      }
    }
  }
  return out;
};

const splitRawIntoBoxes = (raw: Bytes, fillLast: boolean): Bytes[] => {
  const finished: Bytes[] = [];
  let current: Bytes = [];
  let i = 0;
  for (const code of raw) {
    if (i === NAME_SIZE && code === EOF) {
      finished.push(current);
      current = [];
      i = 0;
    } else if (i === NAME_SIZE) {
      throw new Error("EOF expected while splitting box names.");
    } else if (code === EOF) {
      i++;
    } else {
      if (current.length !== i) {
        throw new Error("Non-EOF byte after EOF in box name.");
      }
      current.push(code);
      i++;
    }
  }
  if (i !== 0) {
    if (fillLast && current.length === i) {
      current = current.concat(Array(NAME_SIZE - current.length).fill(SPACE));
    }
    finished.push(current);
  }
  return finished;
};

const modulo = (x: number, y: number): number => {
  return ((x % y) + y) % y;
};

const isFullOfSpaces = (bytes: Bytes): boolean => {
  return bytes.every((byte) => byte === SPACE);
};

const replacePaddingInBoxes = (boxes: Bytes[]): Bytes[] => {
  return boxes.map((box, boxIndex) => {
    let out = box.slice();
    const start = modulo(-boxIndex * (NAME_SIZE + 1), 4);
    const replaceFrom = (pos: number, first: boolean): void => {
      if (pos + 4 > NAME_SIZE) {
        return;
      }
      replaceFrom(pos + 4, false);
      if (
        out.slice(pos, pos + 4).every((byte, index) => byte === PADDING[index])
      ) {
        for (const code of [
          DEFAULT_FILLERS.nopCode,
          DEFAULT_FILLERS.nopCodeAlt,
        ]) {
          const candidate = out.slice(0, pos).concat(code, out.slice(pos + 4));
          while (candidate[candidate.length - 1] === EOF) {
            candidate.pop();
          }
          if (!noEof(candidate)) {
            continue;
          }
          if (first && isFullOfSpaces(candidate)) {
            continue;
          }
          out = candidate;
          break;
        }
      }
    };
    replaceFrom(start, true);
    return out;
  });
};

const fitCodesIntoBoxes = (
  commands: Bytes[],
  lang: EmeraldLanguage,
): Bytes[] => {
  let res = addCodesAfter([], commands, false);
  const exit = certificateExit(lang);
  const byteCount = res.length;
  res = res.concat(pack(false, padNb(byteCount, exit.start - byteCount)));
  res = addCodesAfter(res, exit.bytes, true);
  const raw = rewriteBytes(res.map((packed) => packed.byte));
  return replacePaddingInBoxes(splitRawIntoBoxes(raw, true));
};

const getEmeraldBoxNamesForCommands = (
  commands: Bytes[],
  cs: ReturnType<typeof charset>,
): AceResult => {
  const boxes = fitCodesIntoBoxes(commands, cs.lang);
  const names = boxes.map((box) =>
    box.map((byte) => boxNameCharAt(byte, cs)).join(""),
  );
  return {
    language: cs.lang,
    boxes: names,
    rawBoxes: boxes.map((box) => box.slice()),
    commands: commands.map((bytes) => ({
      bytes: bytes.slice(),
      hex: commandForBytes(bytes).toString(16).padStart(8, "0").toUpperCase(),
    })),
  };
};

export const getEmeraldSidBoxNames = (
  sid: number,
  languageInput: EmeraldLanguage,
): AceResult => {
  const cs = charset(languageInput);
  return getEmeraldBoxNamesForCommands(sidProgramBytes(sid, cs.lang), cs);
};

export const getEmeraldSeedBoxNames = (
  seed: number,
  languageInput: EmeraldLanguage,
): AceResult => {
  const cs = charset(languageInput);
  return getEmeraldBoxNamesForCommands(seedProgramBytes(seed, cs.lang), cs);
};
