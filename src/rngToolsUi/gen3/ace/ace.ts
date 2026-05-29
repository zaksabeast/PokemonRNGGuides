/*
 * Standalone Pokemon Emerald SID box-name generator.
 *
 * Exports getEmeraldSidBoxNames(sid, language, options).
 * No dependency on this repository's generated aceGen bundle.
 */
const EOF = 0xff;
const SPACE = 0x00;
const NAME_SIZE = 8;
const PADDING = [0x00, 0x00, 0x00, 0x00];
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
const REG = { r0: 0, r11: 11, r12: 12, pc: 15 };

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

function parseHexBytes(hex) {
  const out = [];
  for (let i = 0; i < hex.length; i += 2)
    out.push(parseInt(hex.slice(i, i + 2), 16));
  return out;
}

function normalizeLanguage(language) {
  const key = String(language || "eng")
    .toLowerCase()
    .slice(0, 3);
  if (["eng", "fra", "ita", "spa", "ger", "jap"].includes(key)) return key;
  throw new RangeError("Unsupported Emerald language: " + language);
}

function parseSid(sid) {
  const n =
    typeof sid === "number"
      ? sid
      : Number(String(sid).trim().replace(/^\$/, "0x"));
  if (!Number.isInteger(n) || n < 0 || n > 0xffff) {
    throw new RangeError("SID must be an integer from 0 to 65535.");
  }
  return n >>> 0;
}

function charset(language) {
  const lang = normalizeLanguage(language);
  const chars = lang === "jap" ? JAP_CHARS.slice() : EURO_CHARS.slice();
  if (lang === "fra") {
    chars[0xb1] = "«";
    chars[0xb2] = "»";
  } else if (lang === "ger") {
    chars[0xb1] = "„";
    chars[0xb2] = "“";
  }
  return { lang, chars };
}

function isCodeAvailable(code, lang) {
  if (lang === "jap")
    return code >= 0 && code <= 0xff && !JAP_UNAVAILABLE.has(code);
  if (lang === "ger" && GERMAN_EXTRA_AVAILABLE.has(code)) return true;
  return EURO_AVAILABLE.has(code);
}

function writableCharAt(code, cs) {
  if (!isCodeAvailable(code, cs.lang)) return "✖";
  return cs.chars[code];
}

function uint32(n) {
  return n >>> 0;
}

function uint32Compare(a, b) {
  a >>>= 0;
  b >>>= 0;
  return a === b ? 0 : a > b ? 1 : -1;
}

function ror(value, bits) {
  value >>>= 0;
  bits &= 31;
  return ((value >>> bits) | (value << (32 - bits))) >>> 0;
}

function rol(value, bits) {
  value >>>= 0;
  bits &= 31;
  return ((value << bits) | (value >>> (32 - bits))) >>> 0;
}

function decomposeImmediate(imm) {
  imm >>>= 0;
  const out = [];
  let v = imm;
  for (let n = 0; n <= 15; n++) {
    const imm8 = v & 0xff;
    if (imm8 === v) out.push([n, imm8]);
    v = rol(v, 2);
  }
  return out;
}

function addrMode1Immediate(imm) {
  return decomposeImmediate(imm).map(
    ([rot, imm8]) => (0x02000000 | (rot << 8) | imm8) >>> 0,
  );
}

function dataProc(opcode, s, rd, rn, imm) {
  const base =
    ((COND_AL << 28) |
      opcode |
      (s ? 0x00100000 : 0) |
      (rn << 16) |
      (rd << 12)) >>>
    0;
  return addrMode1Immediate(imm).map((mode) => (base | mode) >>> 0);
}

function movLike(mvn, s, rd, imm) {
  const opcodes = mvn ? [0x01e00000] : [0x01a00000, 0x01ad0000];
  const modes = addrMode1Immediate(imm);
  const out = [];
  for (const opcode of opcodes) {
    const base =
      ((COND_AL << 28) | opcode | (s ? 0x00100000 : 0) | (rd << 12)) >>> 0;
    for (const mode of modes) out.push((base | mode) >>> 0);
  }
  return out;
}

function strh(rd, rn, offset) {
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
}

function commandBytes(command) {
  return [
    command & 0xff,
    (command >>> 8) & 0xff,
    (command >>> 16) & 0xff,
    (command >>> 24) & 0xff,
  ];
}

function commandForBytes(bytes) {
  return (
    (bytes[0] | (bytes[1] << 8) | (bytes[2] << 16) | (bytes[3] << 24)) >>> 0
  );
}

function scoreBytes(bytes, lang) {
  const bad = [];
  for (let i = 0; i < bytes.length; i++) {
    if (!isCodeAvailable(bytes[i], lang)) bad.push([i, bytes[i]]);
  }
  if (bad.some(([, b]) => b !== EOF)) return Number.MAX_SAFE_INTEGER;
  let score = 0;
  let last = null;
  for (const [i] of bad) {
    score += last === null || i === last + 1 ? 1 : 5;
    last = i;
  }
  return score;
}

function preferredBytes(commands, lang) {
  let best = null;
  let bestScore = Number.MAX_SAFE_INTEGER;
  for (const command of commands) {
    const bytes = commandBytes(command);
    const score = scoreBytes(bytes, lang);
    if (score < bestScore) {
      bestScore = score;
      best = bytes;
    }
  }
  if (!best || bestScore === Number.MAX_SAFE_INTEGER)
    throw new Error("No writable encoding found.");
  return best;
}

function buildConstants(lang, movMvn) {
  const set = new Set();
  for (let i = 0; i <= 0xff; i++) {
    if (!isCodeAvailable(i, lang)) continue;
    let v = i >>> 0;
    do {
      set.add(v >>> 0);
      v = ror(v, 2);
    } while (v !== i);
  }
  if (movMvn) {
    for (const v of Array.from(set)) set.add(~v >>> 0);
  }
  return Array.from(set).sort((a, b) => uint32Compare(a, b));
}

function synthesize(target, constants, opts) {
  const maxCard = opts.maxCard;
  const additive = opts.additive;
  const incr = opts.incr;
  const validFirst = opts.validFirst;
  const validRest = opts.validRest;
  const descending = constants.slice().reverse();
  const initial = additive ? descending : constants;
  const restConstants = descending.filter(validRest);
  const remDepthCanReach = (candidate, depthLeft, remaining) => {
    const value = incr ? (candidate + 1) >>> 0 : candidate;
    return BigInt(value) * BigInt(depthLeft) >= BigInt(remaining >>> 0);
  };
  const removeAdd = (arr, i) => arr.filter((j) => uint32Compare(i, j) >= 0);
  const removeSub = (arr, i) => arr.filter((j) => uint32Compare(i, j) <= 0);

  for (let card = 1; card <= maxCard; card++) {
    const starts = (
      additive ? removeAdd(initial, target) : removeSub(initial, target)
    ).filter(validFirst);
    for (const first of starts) {
      const remainder = additive
        ? (target - first) >>> 0
        : (first - target) >>> 0;
      const found = synthesizeTail([first], remainder, card, restConstants);
      if (found) return found;
    }
  }

  function synthesizeTail(acc, remaining, card, pool) {
    if (remaining === 0) return acc.slice();
    if (acc.length >= card) return null;
    let candidates = removeAdd(pool, incr ? (remaining - 1) >>> 0 : remaining);
    for (const c of candidates) {
      if (!remDepthCanReach(c, card - acc.length, remaining)) break;
      const nextRemaining = (remaining - (incr ? (c + 1) >>> 0 : c)) >>> 0;
      const found = synthesizeTail(acc.concat(c), nextRemaining, card, pool);
      if (found) return found;
    }
    return null;
  }

  return null;
}

function isValidCommandBytes(bytes, lang) {
  return scoreBytes(bytes, lang) !== Number.MAX_SAFE_INTEGER;
}

function hasWritableEncoding(commands, lang) {
  try {
    return isValidCommandBytes(preferredBytes(commands, lang), lang);
  } catch (_) {
    return false;
  }
}

function tweakMov(rd, imm, lang, constants, constantsMovMvn) {
  const validFirst = (fst) => {
    const useMov = constants.includes(fst) || !constants.includes(~fst >>> 0);
    return hasWritableEncoding(
      useMov
        ? movLike(false, false, rd, fst)
        : movLike(true, false, rd, ~fst >>> 0),
      lang,
    );
  };
  const validAdd = (i) =>
    hasWritableEncoding(dataProc(0x00a00000, rd === 0, rd, rd, i), lang);
  const validSub = (i) =>
    hasWritableEncoding(dataProc(0x00c00000, false, rd, rd, i), lang);
  let parts = null;
  let additive = true;
  for (let card = 1; card <= 5 && !parts; card++) {
    parts = synthesize(imm >>> 0, constantsMovMvn, {
      maxCard: card,
      additive: true,
      incr: false,
      validFirst,
      validRest: validAdd,
    });
    if (parts) {
      additive = true;
      break;
    }
    parts = synthesize(imm >>> 0, constantsMovMvn, {
      maxCard: card,
      additive: false,
      incr: true,
      validFirst,
      validRest: validSub,
    });
    if (parts) additive = false;
  }
  if (!parts) throw new Error("Unable to synthesize MOV immediate.");
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
}

function tweakSbc(rd, rn, imm, lang, constants) {
  const validFirst = (fst) =>
    hasWritableEncoding(dataProc(0x00c00000, false, rd, rn, fst), lang);
  const validAdd = (i) =>
    hasWritableEncoding(dataProc(0x00c00000, false, rd, rd, i), lang);
  const validSub = (i) =>
    hasWritableEncoding(dataProc(0x00a00000, false, rd, rd, i), lang);
  let parts = null;
  let additive = true;
  for (let card = 1; card <= 5 && !parts; card++) {
    parts = synthesize(imm >>> 0, constants, {
      maxCard: card,
      additive: true,
      incr: false,
      validFirst,
      validRest: validAdd,
    });
    if (parts) {
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
    if (parts) additive = false;
  }
  if (!parts) throw new Error("Unable to synthesize SBC immediate.");
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
}

function sidProgramBytes(sid, lang) {
  const constants = buildConstants(lang, false);
  const constantsMovMvn = buildConstants(lang, true);
  const out = [];
  out.push(...tweakSbc(REG.r11, REG.pc, 0xd0f7, lang, constants));
  out.push(...tweakMov(REG.r12, sid, lang, constants, constantsMovMvn));
  out.push(preferredBytes(strh(REG.r12, REG.r11, 2), lang));
  return out;
}

function noEof(bytes) {
  return bytes.every((b) => b !== EOF);
}

function onlyEof(bytes) {
  return bytes.every((b) => b === EOF);
}

function firstNonEofIndex(bytes) {
  const i = bytes.findIndex((b) => b !== EOF);
  return i < 0 ? bytes.length : i;
}

function usableEofIndex(bytes) {
  let i = 0;
  while (i < bytes.length && bytes[i] !== EOF) i++;
  while (i < bytes.length && bytes[i] === EOF) i++;
  return bytes.length - 1 - (bytes.length - i);
}

function nopCodeAtPos(pos) {
  pos %= NAME_SIZE + 1;
  return pos + 4 <= NAME_SIZE
    ? PADDING
    : DEFAULT_FILLERS.fillers[NAME_SIZE - pos];
}

function pack(flag, bytes) {
  return bytes.map((b) => ({ byte: b, command: flag }));
}

function fitCodeAtPos(pos, bytes, next) {
  if (next && onlyEof(next)) next = null;
  for (let tries = NAME_SIZE + 1; tries > 0; tries--) {
    const p = pos % (NAME_SIZE + 1);
    const n = bytes.length;
    let ok;
    if (noEof(bytes)) {
      ok = p + n <= NAME_SIZE;
    } else {
      const i = usableEofIndex(bytes);
      ok =
        p + i === NAME_SIZE ||
        (i === n - 1 &&
          p + n <= NAME_SIZE &&
          (p + n + firstNonEofIndex(nopCodeAtPos(p + n)) - 1 === NAME_SIZE ||
            (next ? p + n + firstNonEofIndex(next) - 1 === NAME_SIZE : true)));
    }
    if (ok) return pack(true, bytes);
    const nop = nopCodeAtPos(p);
    return pack(false, nop).concat(fitCodeAtPos(pos + 4, bytes, next));
  }
  throw new Error("Box fitting algorithm failed.");
}

function addCodesAfter(res, commands, final) {
  let acc = res.slice();
  for (let i = 0; i < commands.length; i++) {
    const next =
      i === commands.length - 1 ? (final ? null : PADDING) : commands[i + 1];
    acc = acc.concat(fitCodeAtPos(acc.length, commands[i], next));
  }
  return acc;
}

function padNb(pos, nb) {
  if (nb < 0) throw new Error("Cannot pad requested amount.");
  const out = [];
  while (nb > 0) {
    const p = pos % (NAME_SIZE + 1);
    const code =
      p + 4 <= NAME_SIZE ? PADDING : DEFAULT_FILLERS.fillers[NAME_SIZE - p];
    out.push(...code);
    pos += 4;
    nb -= 4;
  }
  return out;
}

function rewriteBytes(bytes) {
  let out = bytes.slice();
  for (let pos = 0; pos + 4 <= out.length; pos += 4) {
    for (const rule of DEFAULT_FILLERS.rewriting) {
      const part = out.slice(pos, pos + rule.pre.length);
      if (
        part.length === rule.pre.length &&
        part.every((b, i) => b === rule.pre[i])
      ) {
        out = out
          .slice(0, pos)
          .concat(rule.post, out.slice(pos + rule.pre.length));
        break;
      }
    }
  }
  return out;
}

function splitRawIntoBoxes(raw, fillLast) {
  const finished = [];
  let current = [];
  let i = 0;
  for (const c of raw) {
    if (i === NAME_SIZE && c === EOF) {
      finished.push(current);
      current = [];
      i = 0;
    } else if (i === NAME_SIZE) {
      throw new Error("EOF expected while splitting box names.");
    } else if (c === EOF) {
      i++;
    } else {
      if (current.length !== i)
        throw new Error("Non-EOF byte after EOF in box name.");
      current.push(c);
      i++;
    }
  }
  if (i !== 0) {
    if (fillLast && current.length === i) {
      current = Array(NAME_SIZE - current.length)
        .fill(SPACE)
        .concat(current);
    }
    finished.push(current);
  }
  return finished;
}

function modulo(x, y) {
  return ((x % y) + y) % y;
}

function isFullOfSpaces(bytes) {
  return bytes.every((b) => b === SPACE);
}

function replacePaddingInBoxes(boxes) {
  return boxes.map((box, boxIndex) => {
    let out = box.slice();
    const start = modulo(-boxIndex * (NAME_SIZE + 1), 4);
    function replaceFrom(pos, first) {
      if (pos + 4 > NAME_SIZE) return;
      replaceFrom(pos + 4, false);
      if (out.slice(pos, pos + 4).every((b, i) => b === PADDING[i])) {
        for (const code of [
          DEFAULT_FILLERS.nopCode,
          DEFAULT_FILLERS.nopCodeAlt,
        ]) {
          const candidate = out.slice(0, pos).concat(code, out.slice(pos + 4));
          while (candidate[candidate.length - 1] === EOF) candidate.pop();
          if (!noEof(candidate)) continue;
          if (first && isFullOfSpaces(candidate)) continue;
          out = candidate;
          break;
        }
      }
    }
    replaceFrom(start, true);
    return out;
  });
}

function fitCodesIntoBoxes(commands) {
  let res = addCodesAfter([], commands, false);
  const i = res.length;
  res = res.concat(pack(false, padNb(i, 116 - i)));
  const raw = rewriteBytes(res.map((x) => x.byte));
  return replacePaddingInBoxes(splitRawIntoBoxes(raw, true));
}

function getEmeraldSidBoxNames(sidInput, languageInput, options) {
  const sid = parseSid(sidInput);
  const cs = charset(languageInput);
  const commands = sidProgramBytes(sid, cs.lang);
  const boxes = fitCodesIntoBoxes(commands);
  const names = boxes.map((box) =>
    box.map((b) => writableCharAt(b, cs)).join(""),
  );
  if (options && options.debug) {
    return {
      sid,
      language: cs.lang,
      boxes: names,
      rawBoxes: boxes.map((box) => box.slice()),
      commands: commands.map((bytes) => ({
        bytes: bytes.slice(),
        hex: commandForBytes(bytes).toString(16).padStart(8, "0").toUpperCase(),
      })),
    };
  }
  return names;
}

/*
Example:

const { getEmeraldSidBoxNames } = require("./emerald_sid_box_names.js");
console.log(getEmeraldSidBoxNames(12345, "eng"));
console.log(getEmeraldSidBoxNames("$3039", "fra"));
*/

console.log(getEmeraldSidBoxNames(43231, "spa"));

//TODO: Convert to typescript
