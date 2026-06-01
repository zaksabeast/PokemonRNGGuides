use once_cell::sync::Lazy;
use serde::Serialize;
use std::collections::{HashMap, HashSet};
use wasm_bindgen::prelude::*;

const MAX_CARDS: usize = 6;
const EOF: u8 = 0xff;
const SPACE: u8 = 0x00;
const NAME_SIZE: usize = 8;
const PADDING: [u8; 4] = [0x00, 0x00, 0x00, 0x00];
const FILLERS: [[u8; 4]; 4] = [
    [0xff, 0xbb, 0xbb, 0xbb],
    [0xff, 0xff, 0xbb, 0xbb],
    [0xff, 0xff, 0xff, 0xbb],
    [0xff, 0xff, 0xff, 0xff],
];
const REWRITE_PRE_1: [u8; 12] = [
    0xff, 0xbb, 0xbb, 0xbb, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xbb, 0xbb,
];
const REWRITE_POST_1: [u8; 12] = [
    0xff, 0xbb, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbb, 0xbb,
];
const REWRITE_PRE_2: [u8; 12] = [
    0xff, 0xff, 0xbb, 0xbb, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xbb,
];
const REWRITE_POST_2: [u8; 12] = [
    0xff, 0xff, 0xbb, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbb,
];

const COND_AL: u32 = 0xe;
const R0: u32 = 0;
const R11: u32 = 11;
const R12: u32 = 12;
const LR: u32 = 14;
const PC: u32 = 15;

#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash, Serialize)]
#[serde(rename_all = "lowercase")]
enum EmeraldLang {
    Eng,
    Fra,
    Ita,
    Spa,
    Ger,
    Jap,
}

impl EmeraldLang {
    fn parse(lang: &str) -> Self {
        match lang {
            "eng" => Self::Eng,
            "fra" => Self::Fra,
            "ita" => Self::Ita,
            "spa" => Self::Spa,
            "ger" => Self::Ger,
            "jap" => Self::Jap,
            _ => panic!("Invalid Emerald language."),
        }
    }

    fn as_str(self) -> &'static str {
        match self {
            Self::Eng => "eng",
            Self::Fra => "fra",
            Self::Ita => "ita",
            Self::Spa => "spa",
            Self::Ger => "ger",
            Self::Jap => "jap",
        }
    }

    fn constants_index(self, mov_mvn: bool) -> usize {
        let lang_index = match self {
            Self::Eng => 0,
            Self::Fra => 1,
            Self::Ita => 2,
            Self::Spa => 3,
            Self::Ger => 4,
            Self::Jap => 5,
        };
        lang_index * 2 + usize::from(mov_mvn)
    }
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize)]
#[serde(untagged)]
pub enum AceResult {
    Success(AceSuccess),
    Failure(AceFailure),
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize)]
pub struct AceSuccess {
    pub language: String,
    pub boxes: Vec<String>,
    #[serde(rename = "rawBoxes")]
    pub raw_boxes: Vec<Vec<u8>>,
    pub commands: Vec<AceCommand>,
    pub success: bool,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize)]
pub struct AceFailure {
    pub success: bool,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize)]
pub struct AceCommand {
    pub bytes: Vec<u8>,
    pub hex: String,
}

#[derive(Clone, Copy)]
struct PackedByte {
    byte: u8,
}

#[derive(Clone, Copy)]
struct TweakMovOptions {
    prefer_subtractive: bool,
}

#[derive(Clone, Copy)]
enum ExitOp {
    Adc,
    Sbc,
    Bic,
}

#[derive(Clone, Copy)]
struct ExitInstruction {
    op: ExitOp,
    rd: u32,
    rn: u32,
    imm: u32,
}

#[derive(Clone, Copy)]
struct SynthOptions<First, Rest>
where
    First: Fn(u32) -> bool,
    Rest: Fn(u32) -> bool,
{
    max_card: usize,
    additive: bool,
    incr: bool,
    valid_first: First,
    valid_rest: Rest,
}

static CONSTANTS: Lazy<Vec<Vec<u32>>> = Lazy::new(|| {
    let langs = [
        EmeraldLang::Eng,
        EmeraldLang::Fra,
        EmeraldLang::Ita,
        EmeraldLang::Spa,
        EmeraldLang::Ger,
        EmeraldLang::Jap,
    ];
    let mut out = Vec::with_capacity(12);
    for lang in langs {
        out.push(build_constants_uncached(lang, false));
        out.push(build_constants_uncached(lang, true));
    }
    out
});

fn cached_constants(lang: EmeraldLang, mov_mvn: bool) -> &'static [u32] {
    &CONSTANTS[lang.constants_index(mov_mvn)]
}

fn is_code_available(code: u8, lang: EmeraldLang) -> bool {
    match lang {
        EmeraldLang::Jap => !matches!(
            code,
            0xb7 | 0xb8
                | 0xb9
                | 0xef
                | 0xf0
                | 0xf1
                | 0xf2
                | 0xf3
                | 0xf4
                | 0xf5
                | 0xf6
                | 0xfa
                | 0xfb
                | 0xfc
                | 0xfd
                | 0xfe
                | 0xff
        ),
        EmeraldLang::Ger if matches!(code, 0xf1..=0xf6) => true,
        _ => matches!(
            code,
            0x00 | 0xa1..=0xae
                | 0xb0..=0xb6
                | 0xb8
                | 0xba..=0xee
        ),
    }
}

fn euro_char_at(code: u8, lang: EmeraldLang) -> &'static str {
    match code {
        0x00 => "_",
        0xa1 => "0",
        0xa2 => "1",
        0xa3 => "2",
        0xa4 => "3",
        0xa5 => "4",
        0xa6 => "5",
        0xa7 => "6",
        0xa8 => "7",
        0xa9 => "8",
        0xaa => "9",
        0xab => "!",
        0xac => "?",
        0xad => ".",
        0xae => "–",
        0xb0 => "…",
        0xb1 if lang == EmeraldLang::Fra => "«",
        0xb1 if lang == EmeraldLang::Ger => "„",
        0xb1 => "“",
        0xb2 if lang == EmeraldLang::Fra => "»",
        0xb2 if lang == EmeraldLang::Ger => "“",
        0xb2 => "”",
        0xb3 => "‘",
        0xb4 => "’",
        0xb5 => "♂",
        0xb6 => "♀",
        0xb8 => ",",
        0xba => "/",
        0xbb => "A",
        0xbc => "B",
        0xbd => "C",
        0xbe => "D",
        0xbf => "E",
        0xc0 => "F",
        0xc1 => "G",
        0xc2 => "H",
        0xc3 => "I",
        0xc4 => "J",
        0xc5 => "K",
        0xc6 => "L",
        0xc7 => "M",
        0xc8 => "N",
        0xc9 => "O",
        0xca => "P",
        0xcb => "Q",
        0xcc => "R",
        0xcd => "S",
        0xce => "T",
        0xcf => "U",
        0xd0 => "V",
        0xd1 => "W",
        0xd2 => "X",
        0xd3 => "Y",
        0xd4 => "Z",
        0xd5 => "a",
        0xd6 => "b",
        0xd7 => "c",
        0xd8 => "d",
        0xd9 => "e",
        0xda => "f",
        0xdb => "g",
        0xdc => "h",
        0xdd => "i",
        0xde => "j",
        0xdf => "k",
        0xe0 => "l",
        0xe1 => "m",
        0xe2 => "n",
        0xe3 => "o",
        0xe4 => "p",
        0xe5 => "q",
        0xe6 => "r",
        0xe7 => "s",
        0xe8 => "t",
        0xe9 => "u",
        0xea => "v",
        0xeb => "w",
        0xec => "x",
        0xed => "y",
        0xee => "z",
        0xf1 => "Ä",
        0xf2 => "Ö",
        0xf3 => "Ü",
        0xf4 => "ä",
        0xf5 => "ö",
        0xf6 => "ü",
        _ => "✖",
    }
}

fn jap_char_at(code: u8) -> &'static str {
    match code {
        0x00 => "_",
        0x01 => "あ",
        0x02 => "い",
        0x03 => "う",
        0x04 => "え",
        0x05 => "お",
        0x06 => "か",
        0x07 => "き",
        0x08 => "く",
        0x09 => "け",
        0x0a => "こ",
        0x0b => "さ",
        0x0c => "し",
        0x0d => "す",
        0x0e => "せ",
        0x0f => "そ",
        0x10 => "た",
        0x11 => "ち",
        0x12 => "つ",
        0x13 => "て",
        0x14 => "と",
        0x15 => "な",
        0x16 => "に",
        0x17 => "ぬ",
        0x18 => "ね",
        0x19 => "の",
        0x1a => "は",
        0x1b => "ひ",
        0x1c => "ふ",
        0x1d => "へ",
        0x1e => "ほ",
        0x1f => "ま",
        0x20 => "み",
        0x21 => "む",
        0x22 => "め",
        0x23 => "も",
        0x24 => "や",
        0x25 => "ゆ",
        0x26 => "よ",
        0x27 => "ら",
        0x28 => "り",
        0x29 => "る",
        0x2a => "れ",
        0x2b => "ろ",
        0x2c => "わ",
        0x2d => "を",
        0x2e => "ん",
        0x2f => "ぁ",
        0x30 => "ぃ",
        0x31 => "ぅ",
        0x32 => "ぇ",
        0x33 => "ぉ",
        0x34 => "ゃ",
        0x35 => "ゅ",
        0x36 => "ょ",
        0x37 => "が",
        0x38 => "ぎ",
        0x39 => "ぐ",
        0x3a => "げ",
        0x3b => "ご",
        0x3c => "ざ",
        0x3d => "じ",
        0x3e => "ず",
        0x3f => "ぜ",
        0x40 => "ぞ",
        0x41 => "だ",
        0x42 => "ぢ",
        0x43 => "づ",
        0x44 => "で",
        0x45 => "ど",
        0x46 => "ば",
        0x47 => "び",
        0x48 => "ぶ",
        0x49 => "べ",
        0x4a => "ぼ",
        0x4b => "ぱ",
        0x4c => "ぴ",
        0x4d => "ぷ",
        0x4e => "ぺ",
        0x4f => "ぽ",
        0x50 => "っ",
        0x51 => "ア",
        0x52 => "イ",
        0x53 => "ウ",
        0x54 => "エ",
        0x55 => "オ",
        0x56 => "カ",
        0x57 => "キ",
        0x58 => "ク",
        0x59 => "ケ",
        0x5a => "コ",
        0x5b => "サ",
        0x5c => "シ",
        0x5d => "ス",
        0x5e => "セ",
        0x5f => "ソ",
        0x60 => "タ",
        0x61 => "チ",
        0x62 => "ツ",
        0x63 => "テ",
        0x64 => "ト",
        0x65 => "ナ",
        0x66 => "ニ",
        0x67 => "ヌ",
        0x68 => "ネ",
        0x69 => "ノ",
        0x6a => "ハ",
        0x6b => "ヒ",
        0x6c => "フ",
        0x6d => "ヘ",
        0x6e => "ホ",
        0x6f => "マ",
        0x70 => "ミ",
        0x71 => "ム",
        0x72 => "メ",
        0x73 => "モ",
        0x74 => "ヤ",
        0x75 => "ユ",
        0x76 => "ヨ",
        0x77 => "ラ",
        0x78 => "リ",
        0x79 => "ル",
        0x7a => "レ",
        0x7b => "ロ",
        0x7c => "ワ",
        0x7d => "ヲ",
        0x7e => "ン",
        0x7f => "ァ",
        0x80 => "ィ",
        0x81 => "ゥ",
        0x82 => "ェ",
        0x83 => "ォ",
        0x84 => "ャ",
        0x85 => "ュ",
        0x86 => "ョ",
        0x87 => "ガ",
        0x88 => "ギ",
        0x89 => "グ",
        0x8a => "ゲ",
        0x8b => "ゴ",
        0x8c => "ザ",
        0x8d => "ジ",
        0x8e => "ズ",
        0x8f => "ゼ",
        0x90 => "ゾ",
        0x91 => "ダ",
        0x92 => "ヂ",
        0x93 => "ヅ",
        0x94 => "デ",
        0x95 => "ド",
        0x96 => "バ",
        0x97 => "ビ",
        0x98 => "ブ",
        0x99 => "ベ",
        0x9a => "ボ",
        0x9b => "パ",
        0x9c => "ピ",
        0x9d => "プ",
        0x9e => "ペ",
        0x9f => "ポ",
        0xa0 => "ッ",
        0xa1 => "0",
        0xa2 => "1",
        0xa3 => "2",
        0xa4 => "3",
        0xa5 => "4",
        0xa6 => "5",
        0xa7 => "6",
        0xa8 => "7",
        0xa9 => "8",
        0xaa => "9",
        0xab => "！",
        0xac => "？",
        0xad => "。",
        0xae => "ー",
        0xaf => "・",
        0xb0 => "‥",
        0xb1 => "『",
        0xb2 => "』",
        0xb3 => "「",
        0xb4 => "」",
        0xb5 => "♂",
        0xb6 => "♀",
        0xb7 => "円",
        0xb8 => ".",
        0xb9 => "×",
        0xba => "/",
        0xbb => "A",
        0xbc => "B",
        0xbd => "C",
        0xbe => "D",
        0xbf => "E",
        0xc0 => "F",
        0xc1 => "G",
        0xc2 => "H",
        0xc3 => "I",
        0xc4 => "J",
        0xc5 => "K",
        0xc6 => "L",
        0xc7 => "M",
        0xc8 => "N",
        0xc9 => "O",
        0xca => "P",
        0xcb => "Q",
        0xcc => "R",
        0xcd => "S",
        0xce => "T",
        0xcf => "U",
        0xd0 => "V",
        0xd1 => "W",
        0xd2 => "X",
        0xd3 => "Y",
        0xd4 => "Z",
        0xd5 => "a",
        0xd6 => "b",
        0xd7 => "c",
        0xd8 => "d",
        0xd9 => "e",
        0xda => "f",
        0xdb => "g",
        0xdc => "h",
        0xdd => "i",
        0xde => "j",
        0xdf => "k",
        0xe0 => "l",
        0xe1 => "m",
        0xe2 => "n",
        0xe3 => "o",
        0xe4 => "p",
        0xe5 => "q",
        0xe6 => "r",
        0xe7 => "s",
        0xe8 => "t",
        0xe9 => "u",
        0xea => "v",
        0xeb => "w",
        0xec => "x",
        0xed => "y",
        0xee => "z",
        _ => "✖",
    }
}

fn box_name_char_at(code: u8, lang: EmeraldLang) -> &'static str {
    if code == SPACE {
        return " ";
    }
    if !is_code_available(code, lang) {
        return "✖";
    }
    match lang {
        EmeraldLang::Jap => jap_char_at(code),
        _ => euro_char_at(code, lang),
    }
}

fn rol(value: u32, bits: u32) -> u32 {
    value.rotate_left(bits & 31)
}

fn ror(value: u32, bits: u32) -> u32 {
    value.rotate_right(bits & 31)
}

fn decompose_immediate(imm: u32) -> Vec<(u32, u32)> {
    let mut out = Vec::new();
    let mut rotated = imm;
    for rotation in 0..=15 {
        let imm8 = rotated & 0xff;
        if imm8 == rotated {
            out.push((rotation, imm8));
        }
        rotated = rol(rotated, 2);
    }
    out
}

fn addr_mode1_immediate(imm: u32) -> Vec<u32> {
    decompose_immediate(imm)
        .into_iter()
        .map(|(rot, imm8)| 0x0200_0000 | (rot << 8) | imm8)
        .collect()
}

fn data_proc(opcode: u32, set_flags: bool, rd: u32, rn: u32, imm: u32) -> Vec<u32> {
    let base = (COND_AL << 28)
        | opcode
        | if set_flags { 0x0010_0000 } else { 0 }
        | (rn << 16)
        | (rd << 12);
    addr_mode1_immediate(imm)
        .into_iter()
        .map(|mode| base | mode)
        .collect()
}

fn mov_like(mvn: bool, set_flags: bool, rd: u32, imm: u32) -> Vec<u32> {
    let opcodes: &[u32] = if mvn {
        &[0x01e0_0000]
    } else {
        &[0x01a0_0000, 0x01ad_0000]
    };
    let modes = addr_mode1_immediate(imm);
    let mut out = Vec::new();
    for opcode in opcodes {
        let base =
            (COND_AL << 28) | opcode | if set_flags { 0x0010_0000 } else { 0 } | (rd << 12);
        for mode in &modes {
            out.push(base | mode);
        }
    }
    out
}

fn strh(rd: u32, rn: u32, offset: u32) -> Vec<u32> {
    let imm_l = offset & 0xf;
    let imm_h = (offset >> 4) & 0xf;
    vec![
        (COND_AL << 28)
            | 0x0040_00b0
            | (1 << 24)
            | (1 << 23)
            | (1 << 22)
            | (rn << 16)
            | (rd << 12)
            | (imm_h << 8)
            | imm_l,
    ]
}

fn str_pre(rd: u32, rn: u32, offset: u32) -> Vec<u32> {
    vec![
        (COND_AL << 28)
            | 0x0400_0000
            | (1 << 24)
            | (1 << 23)
            | (1 << 21)
            | (rn << 16)
            | (rd << 12)
            | offset,
    ]
}

fn command_bytes(command: u32) -> Vec<u8> {
    vec![
        (command & 0xff) as u8,
        ((command >> 8) & 0xff) as u8,
        ((command >> 16) & 0xff) as u8,
        ((command >> 24) & 0xff) as u8,
    ]
}

fn command_for_bytes(bytes: &[u8]) -> u32 {
    (bytes[0] as u32)
        | ((bytes[1] as u32) << 8)
        | ((bytes[2] as u32) << 16)
        | ((bytes[3] as u32) << 24)
}

fn score_bytes(bytes: &[u8], lang: EmeraldLang) -> usize {
    let mut bad = Vec::new();
    for (i, byte) in bytes.iter().copied().enumerate() {
        if !is_code_available(byte, lang) {
            bad.push((i, byte));
        }
    }
    if bad.iter().any(|(_, byte)| *byte != EOF) {
        return usize::MAX;
    }
    let mut score = 0;
    let mut last = None;
    for (i, _) in bad {
        score += if last.is_none() || last == Some(i - 1) {
            1
        } else {
            5
        };
        last = Some(i);
    }
    score
}

fn preferred_bytes(commands: Vec<u32>, lang: EmeraldLang) -> Option<Vec<u8>> {
    let mut best = None;
    let mut best_score = usize::MAX;
    for command in commands {
        let bytes = command_bytes(command);
        let score = score_bytes(&bytes, lang);
        if score < best_score {
            best_score = score;
            best = Some(bytes);
        }
    }
    if best_score == usize::MAX { None } else { best }
}

fn build_constants_uncached(lang: EmeraldLang, mov_mvn: bool) -> Vec<u32> {
    let mut set = HashSet::new();
    for i in 0..=0xffu8 {
        if !is_code_available(i, lang) {
            continue;
        }
        let mut rotated = i as u32;
        loop {
            set.insert(rotated);
            rotated = ror(rotated, 2);
            if rotated == i as u32 {
                break;
            }
        }
    }
    if mov_mvn {
        for value in set.clone() {
            set.insert(!value);
        }
    }
    let mut out: Vec<u32> = set.into_iter().collect();
    out.sort_unstable();
    out
}

fn first_at_most_desc(arr: &[u32], limit: u32) -> usize {
    let mut lo = 0;
    let mut hi = arr.len();
    while lo < hi {
        let mid = (lo + hi) >> 1;
        if arr[mid] <= limit {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    lo
}

fn contribution(candidate: u32, incr: bool) -> u32 {
    if incr {
        candidate.wrapping_add(1)
    } else {
        candidate
    }
}

fn synthesize<First, Rest>(target: u32, constants: &[u32], opts: SynthOptions<First, Rest>) -> Option<Vec<u32>>
where
    First: Fn(u32) -> bool,
    Rest: Fn(u32) -> bool,
{
    let mut descending = constants.to_vec();
    descending.reverse();
    let initial: &[u32] = if opts.additive { &descending } else { constants };
    let rest_constants: Vec<u32> = descending
        .iter()
        .copied()
        .filter(|value| (opts.valid_rest)(*value))
        .collect();
    let rest_set: HashSet<u32> = rest_constants.iter().copied().collect();
    let mut pair_sums: HashMap<u32, (u32, u32)> = HashMap::new();
    for first in rest_constants.iter().copied() {
        let first_value = contribution(first, opts.incr);
        for second in rest_constants.iter().copied() {
            let second_value = contribution(second, opts.incr);
            if first_value < second_value {
                continue;
            }
            let sum = first_value as u64 + second_value as u64;
            if sum >= 0x1_0000_0000 || pair_sums.contains_key(&(sum as u32)) {
                continue;
            }
            pair_sums.insert(sum as u32, (first, second));
        }
    }

    for card in 1..=opts.max_card {
        let mut failed = HashSet::new();
        let starts = initial
            .iter()
            .copied()
            .filter(|first| {
                if opts.additive {
                    target >= *first
                } else {
                    *first >= target
                }
            })
            .filter(|first| (opts.valid_first)(*first));
        for first in starts {
            let remainder = if opts.additive {
                target.wrapping_sub(first)
            } else {
                first.wrapping_sub(target)
            };
            let mut acc = vec![first];
            let tail = SynthTailCtx {
                card,
                pool: &rest_constants,
                rest_set: &rest_set,
                pair_sums: &pair_sums,
                incr: opts.incr,
            };
            if synthesize_tail(&mut acc, remainder, &tail, &mut failed) {
                return Some(acc);
            }
        }
    }
    None
}

struct SynthTailCtx<'a> {
    card: usize,
    pool: &'a [u32],
    rest_set: &'a HashSet<u32>,
    pair_sums: &'a HashMap<u32, (u32, u32)>,
    incr: bool,
}

fn synthesize_tail(
    acc: &mut Vec<u32>,
    remaining: u32,
    ctx: &SynthTailCtx,
    failed: &mut HashSet<u64>,
) -> bool {
    if remaining == 0 {
        return true;
    }
    if acc.len() >= ctx.card {
        return false;
    }
    let depth_left = ctx.card - acc.len();
    let key = (depth_left as u64) << 32 | remaining as u64;
    if failed.contains(&key) {
        return false;
    }
    if depth_left == 1 {
        let candidate = if ctx.incr {
            remaining.wrapping_sub(1)
        } else {
            remaining
        };
        if ctx.rest_set.contains(&candidate) {
            acc.push(candidate);
            return true;
        }
        failed.insert(key);
        return false;
    }

    let limit = if ctx.incr {
        remaining.wrapping_sub(1)
    } else {
        remaining
    };
    for candidate in ctx.pool.iter().copied().skip(first_at_most_desc(ctx.pool, limit)) {
        let value = contribution(candidate, ctx.incr);
        if (value as u64) * (depth_left as u64) < remaining as u64 {
            break;
        }
        let next_remaining = remaining.wrapping_sub(value);
        acc.push(candidate);
        if next_remaining == 0 {
            return true;
        }
        if depth_left == 2 {
            let last = if ctx.incr {
                next_remaining.wrapping_sub(1)
            } else {
                next_remaining
            };
            if ctx.rest_set.contains(&last) {
                acc.push(last);
                return true;
            }
        } else if depth_left == 3 {
            if let Some((first, second)) = ctx.pair_sums.get(&next_remaining) {
                acc.push(*first);
                acc.push(*second);
                return true;
            }
        } else if synthesize_tail(acc, next_remaining, ctx, failed) {
            return true;
        }
        acc.pop();
    }
    failed.insert(key);
    false
}

fn has_writable_encoding(commands: Vec<u32>, lang: EmeraldLang) -> bool {
    preferred_bytes(commands, lang)
        .map(|bytes| score_bytes(&bytes, lang) != usize::MAX)
        .unwrap_or(false)
}

fn tweak_mov(
    rd: u32,
    imm: u32,
    lang: EmeraldLang,
    constants: &[u32],
    constants_mov_mvn: &[u32],
    options: TweakMovOptions,
) -> Option<Vec<Vec<u8>>> {
    let constants_set: HashSet<u32> = constants.iter().copied().collect();
    let valid_first = |fst: u32| {
        let use_mov = constants_set.contains(&fst) || !constants_set.contains(&!fst);
        has_writable_encoding(
            if use_mov {
                mov_like(false, false, rd, fst)
            } else {
                mov_like(true, false, rd, !fst)
            },
            lang,
        )
    };
    let valid_add = |i| has_writable_encoding(data_proc(0x00a0_0000, rd == R0, rd, rd, i), lang);
    let valid_sub = |i| has_writable_encoding(data_proc(0x00c0_0000, false, rd, rd, i), lang);

    let mut parts = None;
    let mut additive = true;
    for card in 1..=MAX_CARDS {
        if options.prefer_subtractive {
            parts = synthesize(
                imm,
                constants_mov_mvn,
                SynthOptions {
                    max_card: card,
                    additive: false,
                    incr: true,
                    valid_first,
                    valid_rest: valid_sub,
                },
            );
            if parts.is_some() {
                additive = false;
                break;
            }
            parts = synthesize(
                imm,
                constants_mov_mvn,
                SynthOptions {
                    max_card: card,
                    additive: true,
                    incr: false,
                    valid_first,
                    valid_rest: valid_add,
                },
            );
            if parts.is_some() {
                additive = true;
                break;
            }
        } else {
            parts = synthesize(
                imm,
                constants_mov_mvn,
                SynthOptions {
                    max_card: card,
                    additive: true,
                    incr: false,
                    valid_first,
                    valid_rest: valid_add,
                },
            );
            if parts.is_some() {
                additive = true;
                break;
            }
            parts = synthesize(
                imm,
                constants_mov_mvn,
                SynthOptions {
                    max_card: card,
                    additive: false,
                    incr: true,
                    valid_first,
                    valid_rest: valid_sub,
                },
            );
            if parts.is_some() {
                additive = false;
                break;
            }
        }
    }

    let parts = parts?;
    let first = parts[0];
    let use_mov = constants.contains(&first) || !constants.contains(&!first);
    let mut out = vec![preferred_bytes(
        if use_mov {
            mov_like(false, false, rd, first)
        } else {
            mov_like(true, false, rd, !first)
        },
        lang,
    )?];
    for part in parts.iter().copied().skip(1) {
        out.push(preferred_bytes(
            if additive {
                data_proc(0x00a0_0000, rd == R0, rd, rd, part)
            } else {
                data_proc(0x00c0_0000, false, rd, rd, part)
            },
            lang,
        )?);
    }
    Some(out)
}

fn tweak_sbc(
    rd: u32,
    rn: u32,
    imm: u32,
    lang: EmeraldLang,
    constants: &[u32],
) -> Option<Vec<Vec<u8>>> {
    let valid_first =
        |fst| has_writable_encoding(data_proc(0x00c0_0000, false, rd, rn, fst), lang);
    let valid_add = |i| has_writable_encoding(data_proc(0x00c0_0000, false, rd, rd, i), lang);
    let valid_sub = |i| has_writable_encoding(data_proc(0x00a0_0000, false, rd, rd, i), lang);

    let mut parts = None;
    let mut additive = true;
    for card in 1..=MAX_CARDS {
        parts = synthesize(
            imm,
            constants,
            SynthOptions {
                max_card: card,
                additive: true,
                incr: true,
                valid_first,
                valid_rest: valid_add,
            },
        );
        if parts.is_some() {
            additive = true;
            break;
        }
        parts = synthesize(
            imm,
            constants,
            SynthOptions {
                max_card: card,
                additive: false,
                incr: false,
                valid_first,
                valid_rest: valid_sub,
            },
        );
        if parts.is_some() {
            additive = false;
            break;
        }
    }

    let parts = parts?;
    let mut out = vec![preferred_bytes(
        data_proc(0x00c0_0000, false, rd, rn, parts[0]),
        lang,
    )?];
    for part in parts.iter().copied().skip(1) {
        out.push(preferred_bytes(
            if additive {
                data_proc(0x00c0_0000, false, rd, rd, part)
            } else {
                data_proc(0x00a0_0000, false, rd, rd, part)
            },
            lang,
        )?);
    }
    Some(out)
}

fn sid_program_bytes(sid: u16, lang: EmeraldLang) -> Option<Vec<Vec<u8>>> {
    let constants = cached_constants(lang, false);
    let constants_mov_mvn = cached_constants(lang, true);
    let mut out = Vec::new();
    out.extend(tweak_sbc(R11, PC, 0xd0f7, lang, constants)?);
    out.extend(tweak_mov(
        R12,
        sid as u32,
        lang,
        constants,
        constants_mov_mvn,
        TweakMovOptions {
            prefer_subtractive: false,
        },
    )?);
    out.push(preferred_bytes(strh(R12, R11, 2), lang)?);
    Some(out)
}

fn seed_program_bytes(seed: u32, lang: EmeraldLang) -> Option<Vec<Vec<u8>>> {
    let constants = cached_constants(lang, false);
    let constants_mov_mvn = cached_constants(lang, true);
    let mut out = Vec::new();
    out.push(preferred_bytes(mov_like(false, true, R12, 0x0300_0000), lang)?);
    out.push(preferred_bytes(
        data_proc(0x00a0_0000, false, R12, R12, 0x2d80),
        lang,
    )?);
    out.push(preferred_bytes(
        data_proc(0x00a0_0000, false, R12, R12, 0x3000),
        lang,
    )?);
    out.extend(tweak_mov(
        R11,
        seed,
        lang,
        constants,
        constants_mov_mvn,
        TweakMovOptions {
            prefer_subtractive: false,
        },
    )?);
    out.push(preferred_bytes(str_pre(R11, R12, 0), lang)?);
    Some(out)
}

fn certificate_exit(lang: EmeraldLang) -> Option<(usize, Vec<Vec<u8>>)> {
    let variants: &[ExitInstruction] = match lang {
        EmeraldLang::Eng | EmeraldLang::Jap => &[
            ExitInstruction {
                op: ExitOp::Sbc,
                rd: R12,
                rn: LR,
                imm: 0x2c40,
            },
            ExitInstruction {
                op: ExitOp::Adc,
                rd: R12,
                rn: R12,
                imm: 0xd30000,
            },
            ExitInstruction {
                op: ExitOp::Bic,
                rd: R12,
                rn: R12,
                imm: 0xc00000,
            },
            ExitInstruction {
                op: ExitOp::Adc,
                rd: R12,
                rn: R12,
                imm: 0x3fc0,
            },
            ExitInstruction {
                op: ExitOp::Sbc,
                rd: R0,
                rn: R12,
                imm: 0xb0,
            },
        ],
        EmeraldLang::Fra => &[
            ExitInstruction {
                op: ExitOp::Adc,
                rd: R12,
                rn: LR,
                imm: 0xe30,
            },
            ExitInstruction {
                op: ExitOp::Adc,
                rd: R12,
                rn: R12,
                imm: 0xd30000,
            },
            ExitInstruction {
                op: ExitOp::Bic,
                rd: R12,
                rn: R12,
                imm: 0xc00000,
            },
            ExitInstruction {
                op: ExitOp::Adc,
                rd: R0,
                rn: R12,
                imm: 0xe2,
            },
        ],
        EmeraldLang::Ger => &[
            ExitInstruction {
                op: ExitOp::Adc,
                rd: R12,
                rn: LR,
                imm: 0xe10,
            },
            ExitInstruction {
                op: ExitOp::Adc,
                rd: R12,
                rn: R12,
                imm: 0xd30000,
            },
            ExitInstruction {
                op: ExitOp::Bic,
                rd: R12,
                rn: R12,
                imm: 0xc00000,
            },
            ExitInstruction {
                op: ExitOp::Adc,
                rd: R0,
                rn: R12,
                imm: 0xe2,
            },
        ],
        EmeraldLang::Ita => &[
            ExitInstruction {
                op: ExitOp::Adc,
                rd: R12,
                rn: LR,
                imm: 0xe00,
            },
            ExitInstruction {
                op: ExitOp::Adc,
                rd: R12,
                rn: R12,
                imm: 0xd30000,
            },
            ExitInstruction {
                op: ExitOp::Bic,
                rd: R12,
                rn: R12,
                imm: 0xc00000,
            },
            ExitInstruction {
                op: ExitOp::Adc,
                rd: R0,
                rn: R12,
                imm: 0xde,
            },
        ],
        EmeraldLang::Spa => &[
            ExitInstruction {
                op: ExitOp::Adc,
                rd: R12,
                rn: LR,
                imm: 0xe10,
            },
            ExitInstruction {
                op: ExitOp::Adc,
                rd: R12,
                rn: R12,
                imm: 0xd30000,
            },
            ExitInstruction {
                op: ExitOp::Bic,
                rd: R12,
                rn: R12,
                imm: 0xc00000,
            },
            ExitInstruction {
                op: ExitOp::Adc,
                rd: R0,
                rn: R12,
                imm: 0xd6,
            },
        ],
    };

    let mut out = vec![
        preferred_bytes(mov_like(true, false, R11, 0x0ee0_0000), lang)?,
        preferred_bytes(data_proc(0x00c0_0000, false, R11, R11, 0xed), lang)?,
        preferred_bytes(data_proc(0x00c0_0000, false, R11, R11, 0xff00000), lang)?,
        preferred_bytes(data_proc(0x00a0_0000, true, R12, PC, 0x30), lang)?,
        preferred_bytes(str_pre(R11, R12, 0), lang)?,
    ];
    for instruction in variants {
        let opcode = match instruction.op {
            ExitOp::Adc => 0x00a0_0000,
            ExitOp::Sbc => 0x00c0_0000,
            ExitOp::Bic => 0x01c0_0000,
        };
        out.push(preferred_bytes(
            data_proc(opcode, false, instruction.rd, instruction.rn, instruction.imm),
            lang,
        )?);
    }
    Some((72, out))
}

fn no_eof(bytes: &[u8]) -> bool {
    bytes.iter().all(|byte| *byte != EOF)
}

fn only_eof(bytes: &[u8]) -> bool {
    bytes.iter().all(|byte| *byte == EOF)
}

fn first_non_eof_index(bytes: &[u8]) -> usize {
    bytes
        .iter()
        .position(|byte| *byte != EOF)
        .unwrap_or(bytes.len())
}

fn usable_eof_index(bytes: &[u8]) -> usize {
    let mut i = 0;
    while i < bytes.len() && bytes[i] != EOF {
        i += 1;
    }
    while i < bytes.len() && bytes[i] == EOF {
        i += 1;
    }
    bytes.len() - 1 - (bytes.len() - i)
}

fn nop_code_at_pos(pos: usize) -> &'static [u8; 4] {
    let wrapped_pos = pos % (NAME_SIZE + 1);
    if wrapped_pos + 4 <= NAME_SIZE {
        &PADDING
    } else {
        &FILLERS[NAME_SIZE - wrapped_pos]
    }
}

fn pack(bytes: &[u8]) -> Vec<PackedByte> {
    bytes
        .iter()
        .copied()
        .map(|byte| PackedByte { byte })
        .collect()
}

fn fit_code_at_pos(pos: usize, bytes: &[u8], next: Option<&[u8]>) -> Vec<PackedByte> {
    let next_bytes = next.and_then(|bytes| if only_eof(bytes) { None } else { Some(bytes) });
    let byte_pos = pos % (NAME_SIZE + 1);
    let byte_count = bytes.len();
    let ok = if no_eof(bytes) {
        byte_pos + byte_count <= NAME_SIZE
    } else {
        let eof_index = usable_eof_index(bytes);
        byte_pos + eof_index == NAME_SIZE
            || (eof_index == byte_count - 1
                && byte_pos + byte_count <= NAME_SIZE
                && (byte_pos
                    + byte_count
                    + first_non_eof_index(nop_code_at_pos(byte_pos + byte_count))
                    - 1
                    == NAME_SIZE
                    || next_bytes
                        .map(|next| {
                            byte_pos + byte_count + first_non_eof_index(next) - 1 == NAME_SIZE
                        })
                        .unwrap_or(true)))
    };
    if ok {
        return pack(bytes);
    }
    let mut out = pack(nop_code_at_pos(byte_pos));
    out.extend(fit_code_at_pos(pos + 4, bytes, next_bytes));
    out
}

fn add_codes_after(mut res: Vec<PackedByte>, commands: &[Vec<u8>], final_block: bool) -> Vec<PackedByte> {
    for (i, command) in commands.iter().enumerate() {
        let next = if i == commands.len() - 1 {
            if final_block {
                None
            } else {
                Some(PADDING.as_slice())
            }
        } else {
            Some(commands[i + 1].as_slice())
        };
        res.extend(fit_code_at_pos(res.len(), command, next));
    }
    res
}

fn pad_nb(pos: usize, nb: isize) -> Option<Vec<u8>> {
    if nb < 0 {
        return None;
    }
    let mut out = Vec::new();
    let mut current_pos = pos;
    let mut remaining = nb;
    while remaining > 0 {
        let byte_pos = current_pos % (NAME_SIZE + 1);
        let code = if byte_pos + 4 <= NAME_SIZE {
            &PADDING
        } else {
            &FILLERS[NAME_SIZE - byte_pos]
        };
        out.extend(code);
        current_pos += 4;
        remaining -= 4;
    }
    Some(out)
}

fn rewrite_bytes(bytes: &[u8]) -> Vec<u8> {
    let mut out = bytes.to_vec();
    let mut pos = 0;
    while pos + 4 <= out.len() {
        if pos + REWRITE_PRE_1.len() <= out.len()
            && out[pos..pos + REWRITE_PRE_1.len()] == REWRITE_PRE_1
        {
            out.splice(pos..pos + REWRITE_PRE_1.len(), REWRITE_POST_1);
        } else if pos + REWRITE_PRE_2.len() <= out.len()
            && out[pos..pos + REWRITE_PRE_2.len()] == REWRITE_PRE_2
        {
            out.splice(pos..pos + REWRITE_PRE_2.len(), REWRITE_POST_2);
        }
        pos += 4;
    }
    out
}

fn split_raw_into_boxes(raw: &[u8], fill_last: bool) -> Option<Vec<Vec<u8>>> {
    let mut finished = Vec::new();
    let mut current = Vec::new();
    let mut i = 0;
    for code in raw.iter().copied() {
        if i == NAME_SIZE && code == EOF {
            finished.push(current);
            current = Vec::new();
            i = 0;
        } else if i == NAME_SIZE {
            return None;
        } else if code == EOF {
            i += 1;
        } else {
            if current.len() != i {
                return None;
            }
            current.push(code);
            i += 1;
        }
    }
    if i != 0 {
        if fill_last && current.len() == i {
            current.extend(std::iter::repeat(SPACE).take(NAME_SIZE - current.len()));
        }
        finished.push(current);
    }
    Some(finished)
}

fn modulo(x: isize, y: isize) -> isize {
    ((x % y) + y) % y
}

fn is_full_of_spaces(bytes: &[u8]) -> bool {
    bytes.iter().all(|byte| *byte == SPACE)
}

fn replace_padding_in_boxes(boxes: Vec<Vec<u8>>) -> Vec<Vec<u8>> {
    boxes
        .into_iter()
        .enumerate()
        .map(|(box_index, mut out)| {
            let start = modulo(-((box_index * (NAME_SIZE + 1)) as isize), 4) as usize;
            replace_padding_from(&mut out, start, true);
            out
        })
        .collect()
}

fn replace_padding_from(out: &mut Vec<u8>, pos: usize, first: bool) {
    if pos + 4 > NAME_SIZE {
        return;
    }
    replace_padding_from(out, pos + 4, false);
    if pos + 4 > out.len() || out[pos..pos + 4] != PADDING {
        return;
    }
    for code in [[EOF, EOF, EOF, EOF], [0xbb, EOF, EOF, EOF]] {
        let mut candidate = out[..pos].to_vec();
        candidate.extend(code);
        candidate.extend(&out[pos + 4..]);
        while candidate.last() == Some(&EOF) {
            candidate.pop();
        }
        if !no_eof(&candidate) {
            continue;
        }
        if first && is_full_of_spaces(&candidate) {
            continue;
        }
        *out = candidate;
        break;
    }
}

fn fit_codes_into_boxes(commands: &[Vec<u8>], lang: EmeraldLang) -> Option<Vec<Vec<u8>>> {
    let mut res = add_codes_after(Vec::new(), commands, false);
    let (exit_start, exit_bytes) = certificate_exit(lang)?;
    let byte_count = res.len();
    res.extend(pack(&pad_nb(byte_count, exit_start as isize - byte_count as isize)?));
    res = add_codes_after(res, &exit_bytes, true);
    let raw = rewrite_bytes(&res.into_iter().map(|packed| packed.byte).collect::<Vec<_>>());
    split_raw_into_boxes(&raw, true).map(replace_padding_in_boxes)
}

fn box_names_for_commands(commands: Option<Vec<Vec<u8>>>, lang: EmeraldLang) -> AceResult {
    let Some(commands) = commands else {
        return AceResult::Failure(AceFailure { success: false });
    };
    let Some(raw_boxes) = fit_codes_into_boxes(&commands, lang) else {
        return AceResult::Failure(AceFailure { success: false });
    };
    let boxes = raw_boxes
        .iter()
        .map(|box_bytes| {
            box_bytes
                .iter()
                .map(|byte| box_name_char_at(*byte, lang))
                .collect::<String>()
        })
        .collect();
    let commands = commands
        .into_iter()
        .map(|bytes| AceCommand {
            hex: format!("{:08X}", command_for_bytes(&bytes)),
            bytes,
        })
        .collect();
    AceResult::Success(AceSuccess {
        language: lang.as_str().to_owned(),
        boxes,
        raw_boxes,
        commands,
        success: true,
    })
}

pub fn get_emerald_sid_box_names_result(sid: u16, lang: &str) -> AceResult {
    let lang = EmeraldLang::parse(lang);
    box_names_for_commands(sid_program_bytes(sid, lang), lang)
}

pub fn get_emerald_seed_box_names_result(seed: u32, lang: &str) -> AceResult {
    let lang = EmeraldLang::parse(lang);
    box_names_for_commands(seed_program_bytes(seed, lang), lang)
}

#[wasm_bindgen(js_name = getEmeraldSidBoxNames)]
pub fn get_emerald_sid_box_names(sid: u16, lang: String) -> JsValue {
    serde_wasm_bindgen::to_value(&get_emerald_sid_box_names_result(sid, &lang)).unwrap()
}

#[wasm_bindgen(js_name = getEmeraldSeedBoxNames)]
pub fn get_emerald_seed_box_names(seed: u32, lang: String) -> JsValue {
    serde_wasm_bindgen::to_value(&get_emerald_seed_box_names_result(seed, &lang)).unwrap()
}

#[cfg(test)]
mod tests {
    use super::*;

    fn boxes(result: AceResult) -> Vec<String> {
        match result {
            AceResult::Success(success) => success.boxes,
            AceResult::Failure(_) => panic!("expected success"),
        }
    }

    fn commands(result: AceResult) -> Vec<String> {
        match result {
            AceResult::Success(success) => success.commands.into_iter().map(|c| c.hex).collect(),
            AceResult::Failure(_) => panic!("expected success"),
        }
    }

    #[test]
    fn emerald_sid_box_names_match_typescript() {
        assert_eq!(
            boxes(get_emerald_sid_box_names_result(0x1234, "eng")),
            vec![
                "VBUnv…Qn",
                "AAA…”Qn",
                "AAzT.o",
                "AaU?n",
                "”FQm",
                "A",
                "A",
                "A",
                "z♀loy…Qn",
                "♀QnFGEn",
                "AA …?q",
                "A“STn",
                "YN?nFNRo",
                "S?n… Rn ",
            ]
        );
        assert_eq!(
            boxes(get_emerald_sid_box_names_result(0xff23, "ita")),
            vec![
                "VBUnv…Qn",
                "AAA…”Qn",
                "AAbR.o",
                "A1S?n",
                "2F?n”FQm",
                "A",
                "A",
                "A",
                "z♀loy…Qn",
                "♀QnFGEn",
                "AA …?q",
                "AlT–n",
                "YN?nFNRo",
                "AAAj ?n ",
            ]
        );
        assert_eq!(
            boxes(get_emerald_sid_box_names_result(0x0001, "ger")),
            vec![
                "VBUnü…Qn",
                "AAAVH.o",
                "AA…HRn",
                "A“FQm",
                "A",
                "A",
                "A",
                "A",
                "z♀loy…Qn",
                "♀QnFGEn",
                "AA …?q",
                "AmT–n",
                "YN?nFNRo",
                "AAAn ?n ",
            ]
        );
    }

    #[test]
    fn emerald_seed_box_names_match_typescript() {
        assert_eq!(
            boxes(get_emerald_seed_box_names_result(0xacde1234, "eng")),
            vec![
                "FM…o♀S?n",
                "AAAFS?n",
                "AA?’.o",
                "Aj,!n",
                "zD!naE!n",
                "AAA …?q",
                "A",
                "A",
                "z♀loy…Qn",
                "♀QnFGEn",
                "AA …?q",
                "A“STn",
                "YN?nFNRo",
                "S?n… Rn ",
            ]
        );
        assert_eq!(
            boxes(get_emerald_seed_box_names_result(0xff123423, "ita")),
            vec![
                "FM…o♀S?n",
                "AAAFS?n",
                "AAz,lo",
                "ATC!n",
                "3…!n …?q",
                "A",
                "A",
                "A",
                "z♀loy…Qn",
                "♀QnFGEn",
                "AA …?q",
                "AlT–n",
                "YN?nFNRo",
                "AAAj ?n ",
            ]
        );
        assert_eq!(
            boxes(get_emerald_seed_box_names_result(0x00000001, "ger")),
            vec![
                "FM…o♀S?n",
                "AAAFS?n",
                "AAV“.o",
                "A…“Qn",
                " …?q",
                "A",
                "A",
                "A",
                "z♀loy…Qn",
                "♀QnFGEn",
                "AA …?q",
                "AmT–n",
                "YN?nFNRo",
                "AAAn ?n ",
            ]
        );
    }

    #[test]
    fn command_hexes_are_stable() {
        assert_eq!(
            commands(get_emerald_sid_box_names_result(0x1234, "eng")),
            vec![
                "E2CFBCD0",
                "E2CBB0EA",
                "E2CBB2B0",
                "E3ADCEEE",
                "E2ACCFD5",
                "E1CBC0B2",
            ]
        );
        assert_eq!(
            commands(get_emerald_seed_box_names_result(0xacde1234, "eng")),
            vec![
                "E3B0C7C0",
                "E2ACCDB6",
                "E2ACCDC0",
                "E3ADB4AC",
                "E2ABB8DE",
                "E2ABBEEE",
                "E2ABBFD5",
                "E5ACB000",
            ]
        );
    }
}
