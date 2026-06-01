use arrayvec::ArrayVec;
use once_cell::sync::Lazy;
use serde::Serialize;
use std::collections::{HashMap, HashSet};
use wasm_bindgen::prelude::*;

const MAX_CARDS: usize = 7;
const EOF: u8 = 0xff;
const SPACE: u8 = 0x00;
const NAME_SIZE: usize = 8;
type CommandBytes = [u8; 4];
type CommandCandidates = ArrayVec<u32, 32>;
type SynthParts = ArrayVec<u32, MAX_CARDS>;
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

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum EmeraldLang {
    Eng,
    Fra,
    Ita,
    Spa,
    Ger,
    Jap,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize)]
#[serde(untagged)]
pub enum AceResult {
    Success(AceSuccess),
    Failure(AceFailure),
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize)]
pub struct AceSuccess {
    #[serde(rename = "rawBoxes")]
    pub raw_boxes: Vec<Vec<u8>>,
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

macro_rules! constants_cache {
    ($name:ident, $lang:expr, $mov_mvn:expr) => {
        static $name: Lazy<Vec<u32>> = Lazy::new(|| build_constants_uncached($lang, $mov_mvn));
    };
}

constants_cache!(ENG_CONSTANTS, EmeraldLang::Eng, false);
constants_cache!(ENG_MOV_MVN_CONSTANTS, EmeraldLang::Eng, true);
constants_cache!(FRA_CONSTANTS, EmeraldLang::Fra, false);
constants_cache!(FRA_MOV_MVN_CONSTANTS, EmeraldLang::Fra, true);
constants_cache!(ITA_CONSTANTS, EmeraldLang::Ita, false);
constants_cache!(ITA_MOV_MVN_CONSTANTS, EmeraldLang::Ita, true);
constants_cache!(SPA_CONSTANTS, EmeraldLang::Spa, false);
constants_cache!(SPA_MOV_MVN_CONSTANTS, EmeraldLang::Spa, true);
constants_cache!(GER_CONSTANTS, EmeraldLang::Ger, false);
constants_cache!(GER_MOV_MVN_CONSTANTS, EmeraldLang::Ger, true);
constants_cache!(JAP_CONSTANTS, EmeraldLang::Jap, false);
constants_cache!(JAP_MOV_MVN_CONSTANTS, EmeraldLang::Jap, true);

fn cached_constants(lang: EmeraldLang, mov_mvn: bool) -> &'static [u32] {
    match (lang, mov_mvn) {
        (EmeraldLang::Eng, false) => ENG_CONSTANTS.as_slice(),
        (EmeraldLang::Eng, true) => ENG_MOV_MVN_CONSTANTS.as_slice(),
        (EmeraldLang::Fra, false) => FRA_CONSTANTS.as_slice(),
        (EmeraldLang::Fra, true) => FRA_MOV_MVN_CONSTANTS.as_slice(),
        (EmeraldLang::Ita, false) => ITA_CONSTANTS.as_slice(),
        (EmeraldLang::Ita, true) => ITA_MOV_MVN_CONSTANTS.as_slice(),
        (EmeraldLang::Spa, false) => SPA_CONSTANTS.as_slice(),
        (EmeraldLang::Spa, true) => SPA_MOV_MVN_CONSTANTS.as_slice(),
        (EmeraldLang::Ger, false) => GER_CONSTANTS.as_slice(),
        (EmeraldLang::Ger, true) => GER_MOV_MVN_CONSTANTS.as_slice(),
        (EmeraldLang::Jap, false) => JAP_CONSTANTS.as_slice(),
        (EmeraldLang::Jap, true) => JAP_MOV_MVN_CONSTANTS.as_slice(),
    }
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

fn rol(value: u32, bits: u32) -> u32 {
    value.rotate_left(bits & 31)
}

fn ror(value: u32, bits: u32) -> u32 {
    value.rotate_right(bits & 31)
}

fn decompose_immediate(imm: u32) -> ArrayVec<(u32, u32), 16> {
    let mut out = ArrayVec::new();
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

fn addr_mode1_immediate(imm: u32) -> ArrayVec<u32, 16> {
    decompose_immediate(imm)
        .into_iter()
        .map(|(rot, imm8)| 0x0200_0000 | (rot << 8) | imm8)
        .collect()
}

fn data_proc(opcode: u32, set_flags: bool, rd: u32, rn: u32, imm: u32) -> ArrayVec<u32, 16> {
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

fn mov_like(mvn: bool, set_flags: bool, rd: u32, imm: u32) -> CommandCandidates {
    let opcodes: &[u32] = if mvn {
        &[0x01e0_0000]
    } else {
        &[0x01a0_0000, 0x01ad_0000]
    };
    let modes = addr_mode1_immediate(imm);
    let mut out = CommandCandidates::new();
    for opcode in opcodes {
        let base = (COND_AL << 28) | opcode | if set_flags { 0x0010_0000 } else { 0 } | (rd << 12);
        for mode in &modes {
            out.push(base | mode);
        }
    }
    out
}

fn strh(rd: u32, rn: u32, offset: u32) -> [u32; 1] {
    let imm_l = offset & 0xf;
    let imm_h = (offset >> 4) & 0xf;
    [(COND_AL << 28)
        | 0x0040_00b0
        | (1 << 24)
        | (1 << 23)
        | (1 << 22)
        | (rn << 16)
        | (rd << 12)
        | (imm_h << 8)
        | imm_l]
}

fn str_pre(rd: u32, rn: u32, offset: u32) -> [u32; 1] {
    [(COND_AL << 28)
        | 0x0400_0000
        | (1 << 24)
        | (1 << 23)
        | (1 << 21)
        | (rn << 16)
        | (rd << 12)
        | offset]
}

fn command_bytes(command: u32) -> CommandBytes {
    [
        (command & 0xff) as u8,
        ((command >> 8) & 0xff) as u8,
        ((command >> 16) & 0xff) as u8,
        ((command >> 24) & 0xff) as u8,
    ]
}

fn score_bytes(bytes: CommandBytes, lang: EmeraldLang) -> usize {
    let mut bad: ArrayVec<(usize, u8), 4> = ArrayVec::new();
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

fn preferred_bytes(
    commands: impl IntoIterator<Item = u32>,
    lang: EmeraldLang,
) -> Option<CommandBytes> {
    let mut best = None;
    let mut best_score = usize::MAX;
    for command in commands {
        let bytes = command_bytes(command);
        let score = score_bytes(bytes, lang);
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

struct SynthContext {
    additive: bool,
    incr: bool,
    initial: Vec<u32>,
    rest_constants: Vec<u32>,
    rest_set: HashSet<u32>,
    pair_sums: Option<HashMap<u32, (u32, u32)>>,
}

impl SynthContext {
    fn new<First, Rest>(
        constants: &[u32],
        additive: bool,
        incr: bool,
        mut valid_first: First,
        mut valid_rest: Rest,
    ) -> Self
    where
        First: FnMut(u32) -> bool,
        Rest: FnMut(u32) -> bool,
    {
        let mut descending = constants.to_vec();
        descending.reverse();
        let initial = if additive {
            descending
                .iter()
                .copied()
                .filter(|value| valid_first(*value))
                .collect()
        } else {
            constants
                .iter()
                .copied()
                .filter(|value| valid_first(*value))
                .collect()
        };
        let rest_constants: Vec<u32> = descending
            .iter()
            .copied()
            .filter(|value| valid_rest(*value))
            .collect();
        let rest_set: HashSet<u32> = rest_constants.iter().copied().collect();
        Self {
            additive,
            incr,
            initial,
            rest_constants,
            rest_set,
            pair_sums: None,
        }
    }

    fn ensure_pair_sums(&mut self) {
        if self.pair_sums.is_some() {
            return;
        }
        let mut pair_sums: HashMap<u32, (u32, u32)> = HashMap::new();
        build_pair_sums(&self.rest_constants, self.incr, &mut pair_sums);
        self.pair_sums = Some(pair_sums);
    }

    fn synthesize(&mut self, target: u32, max_card: usize) -> Option<SynthParts> {
        for card in 1..=max_card {
            if card >= 4 {
                self.ensure_pair_sums();
            }
            let mut failed = HashSet::new();
            let tail = SynthTailCtx {
                card,
                pool: &self.rest_constants,
                rest_set: &self.rest_set,
                pair_sums: self.pair_sums.as_ref(),
                incr: self.incr,
            };
            let starts = self.initial.iter().copied().filter(|first| {
                if self.additive {
                    target >= *first
                } else {
                    *first >= target
                }
            });
            for first in starts {
                let remainder = if self.additive {
                    target.wrapping_sub(first)
                } else {
                    first.wrapping_sub(target)
                };
                let mut acc = SynthParts::new();
                acc.push(first);
                if synthesize_tail(&mut acc, remainder, &tail, &mut failed) {
                    return Some(acc);
                }
            }
        }
        None
    }
}

fn build_pair_sums(rest_constants: &[u32], incr: bool, pair_sums: &mut HashMap<u32, (u32, u32)>) {
    for first in rest_constants.iter().copied() {
        let first_value = contribution(first, incr);
        for second in rest_constants.iter().copied() {
            let second_value = contribution(second, incr);
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
}

struct SynthTailCtx<'a> {
    card: usize,
    pool: &'a [u32],
    rest_set: &'a HashSet<u32>,
    pair_sums: Option<&'a HashMap<u32, (u32, u32)>>,
    incr: bool,
}

fn synthesize_tail(
    acc: &mut SynthParts,
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
    for candidate in ctx
        .pool
        .iter()
        .copied()
        .skip(first_at_most_desc(ctx.pool, limit))
    {
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
            if let Some((first, second)) = ctx
                .pair_sums
                .and_then(|pair_sums| pair_sums.get(&next_remaining))
            {
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

fn has_writable_encoding(commands: impl IntoIterator<Item = u32>, lang: EmeraldLang) -> bool {
    preferred_bytes(commands, lang).is_some()
}

fn cached_valid(
    cache: &mut HashMap<u32, bool>,
    candidate: u32,
    commands: impl IntoIterator<Item = u32>,
    lang: EmeraldLang,
) -> bool {
    if let Some(valid) = cache.get(&candidate) {
        return *valid;
    }
    let valid = has_writable_encoding(commands, lang);
    cache.insert(candidate, valid);
    valid
}

fn has_constant(constants: &[u32], value: u32) -> bool {
    constants.binary_search(&value).is_ok()
}

fn tweak_mov(
    rd: u32,
    imm: u32,
    lang: EmeraldLang,
    constants: &[u32],
    constants_mov_mvn: &[u32],
    options: TweakMovOptions,
) -> Option<Vec<CommandBytes>> {
    let mut parts = None;
    let mut additive = true;
    let mut valid_first_cache = HashMap::new();
    let mut valid_add_cache = HashMap::new();
    let mut valid_sub_cache = HashMap::new();

    let mut valid_first = |fst: u32| {
        if let Some(valid) = valid_first_cache.get(&fst) {
            return *valid;
        }
        let use_mov = has_constant(constants, fst) || !has_constant(constants, !fst);
        let valid = has_writable_encoding(
            if use_mov {
                mov_like(false, false, rd, fst)
            } else {
                mov_like(true, false, rd, !fst)
            },
            lang,
        );
        valid_first_cache.insert(fst, valid);
        valid
    };
    let mut add_ctx = SynthContext::new(constants_mov_mvn, true, false, &mut valid_first, |i| {
        cached_valid(
            &mut valid_add_cache,
            i,
            data_proc(0x00a0_0000, rd == R0, rd, rd, i),
            lang,
        )
    });
    let mut sub_ctx = SynthContext::new(constants_mov_mvn, false, true, &mut valid_first, |i| {
        cached_valid(
            &mut valid_sub_cache,
            i,
            data_proc(0x00c0_0000, false, rd, rd, i),
            lang,
        )
    });

    let searches: &[(bool, bool)] = if options.prefer_subtractive {
        &[(false, false), (true, true)]
    } else {
        &[(true, true), (false, false)]
    };
    for card in 1..=MAX_CARDS {
        for (is_additive, use_add_ctx) in searches {
            let result = if *use_add_ctx {
                add_ctx.synthesize(imm, card)
            } else {
                sub_ctx.synthesize(imm, card)
            };
            if result.is_some() {
                parts = result;
                additive = *is_additive;
                break;
            }
        }
        if parts.is_some() {
            break;
        }
    }

    let parts = parts?;
    let first = parts[0];
    let use_mov = has_constant(constants, first) || !has_constant(constants, !first);
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
) -> Option<Vec<CommandBytes>> {
    let mut parts = None;
    let mut additive = true;
    let mut valid_first_cache = HashMap::new();
    let mut valid_add_cache = HashMap::new();
    let mut valid_sub_cache = HashMap::new();

    let mut valid_first = |fst| {
        cached_valid(
            &mut valid_first_cache,
            fst,
            data_proc(0x00c0_0000, false, rd, rn, fst),
            lang,
        )
    };
    let mut add_ctx = SynthContext::new(constants, true, true, &mut valid_first, |i| {
        cached_valid(
            &mut valid_add_cache,
            i,
            data_proc(0x00c0_0000, false, rd, rd, i),
            lang,
        )
    });
    let mut sub_ctx = SynthContext::new(constants, false, false, &mut valid_first, |i| {
        cached_valid(
            &mut valid_sub_cache,
            i,
            data_proc(0x00a0_0000, false, rd, rd, i),
            lang,
        )
    });

    for card in 1..=MAX_CARDS {
        parts = add_ctx.synthesize(imm, card);
        if parts.is_some() {
            additive = true;
            break;
        }
        parts = sub_ctx.synthesize(imm, card);
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

fn sid_program_bytes(sid: u16, lang: EmeraldLang) -> Option<Vec<CommandBytes>> {
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

fn seed_program_bytes(seed: u32, lang: EmeraldLang) -> Option<Vec<CommandBytes>> {
    let constants = cached_constants(lang, false);
    let constants_mov_mvn = cached_constants(lang, true);
    let mut out = Vec::new();
    out.push(preferred_bytes(
        mov_like(false, true, R12, 0x0300_0000),
        lang,
    )?);
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

fn certificate_exit(lang: EmeraldLang) -> Option<(usize, Vec<CommandBytes>)> {
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
            data_proc(
                opcode,
                false,
                instruction.rd,
                instruction.rn,
                instruction.imm,
            ),
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

fn add_codes_after(
    mut res: Vec<PackedByte>,
    commands: &[CommandBytes],
    final_block: bool,
) -> Vec<PackedByte> {
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

fn fit_codes_into_boxes(commands: &[CommandBytes], lang: EmeraldLang) -> Option<Vec<Vec<u8>>> {
    let mut res = add_codes_after(Vec::new(), commands, false);
    let (exit_start, exit_bytes) = certificate_exit(lang)?;
    let byte_count = res.len();
    res.extend(pack(&pad_nb(
        byte_count,
        exit_start as isize - byte_count as isize,
    )?));
    res = add_codes_after(res, &exit_bytes, true);
    let raw = rewrite_bytes(
        &res.into_iter()
            .map(|packed| packed.byte)
            .collect::<Vec<_>>(),
    );
    split_raw_into_boxes(&raw, true).map(replace_padding_in_boxes)
}

fn box_names_for_commands(commands: Option<Vec<CommandBytes>>, lang: EmeraldLang) -> AceResult {
    let Some(commands) = commands else {
        return AceResult::Failure(AceFailure { success: false });
    };
    let Some(raw_boxes) = fit_codes_into_boxes(&commands, lang) else {
        return AceResult::Failure(AceFailure { success: false });
    };
    AceResult::Success(AceSuccess {
        raw_boxes,
        success: true,
    })
}

pub fn get_emerald_sid_box_names_result(sid: u16, lang: EmeraldLang) -> AceResult {
    box_names_for_commands(sid_program_bytes(sid, lang), lang)
}

pub fn get_emerald_seed_box_names_result(seed: u32, lang: EmeraldLang) -> AceResult {
    box_names_for_commands(seed_program_bytes(seed, lang), lang)
}

#[wasm_bindgen(js_name = getEmeraldSidBoxNames)]
pub fn get_emerald_sid_box_names(sid: u16, lang: EmeraldLang) -> JsValue {
    serde_wasm_bindgen::to_value(&get_emerald_sid_box_names_result(sid, lang)).unwrap()
}

#[wasm_bindgen(js_name = getEmeraldSeedBoxNames)]
pub fn get_emerald_seed_box_names(seed: u32, lang: EmeraldLang) -> JsValue {
    serde_wasm_bindgen::to_value(&get_emerald_seed_box_names_result(seed, lang)).unwrap()
}

#[cfg(test)]
mod tests {
    use super::*;

    fn boxes(result: AceResult) -> Vec<Vec<u8>> {
        match result {
            AceResult::Success(success) => success.raw_boxes,
            AceResult::Failure(_) => panic!("Expected successful ACE generation"),
        }
    }

    #[test]
    #[ignore]
    fn benchmark_emerald_seed_box_names_result_20_random_values() {
        use std::{hint::black_box, time::Instant};

        const VALUES: usize = 100;

        fn next_random(state: &mut u32) -> u32 {
            *state ^= *state << 13;
            *state ^= *state >> 17;
            *state ^= *state << 5;
            *state
        }

        fn checksum_result(result: AceResult) -> u64 {
            match result {
                AceResult::Success(success) => success
                    .raw_boxes
                    .iter()
                    .flatten()
                    .fold(success.raw_boxes.len() as u64, |checksum, byte| {
                        checksum.wrapping_mul(31).wrapping_add(*byte as u64)
                    }),
                AceResult::Failure(_) => 0,
            }
        }

        let mut random_state = 0x1234_5678_u32;
        let mut checksum = 0_u64;
        let start_time = Instant::now();

        for _ in 0..VALUES {
            let seed = next_random(&mut random_state);
            checksum = checksum.wrapping_add(checksum_result(get_emerald_seed_box_names_result(
                black_box(seed),
                black_box(EmeraldLang::Eng),
            )));
        }

        println!(
            "get_emerald_seed_box_names_result for {} random values: {:?} (checksum {})",
            VALUES,
            start_time.elapsed(),
            checksum
        );

        assert_eq!(checksum, 11345541470647849650);
    }

    #[test]
    fn emerald_sid_box_names_match_typescript() {
        assert_eq!(
            boxes(get_emerald_sid_box_names_result(0x1234, EmeraldLang::Eng)),
            vec![
                vec![208, 188, 207, 226, 234, 176, 203, 226],
                vec![187, 187, 187, 176, 178, 203, 226],
                vec![187, 187, 238, 206, 173, 227],
                vec![187, 213, 207, 172, 226],
                vec![178, 192, 203, 225],
                vec![187],
                vec![187],
                vec![187],
                vec![238, 182, 224, 227, 237, 176, 203, 226],
                vec![182, 203, 226, 192, 193, 191, 226],
                vec![187, 187, 0, 176, 172, 229],
                vec![187, 177, 205, 206, 226],
                vec![211, 200, 172, 226, 192, 200, 204, 227],
                vec![205, 172, 226, 176, 0, 204, 226, 0],
            ]
        );
        assert_eq!(
            boxes(get_emerald_sid_box_names_result(0xff23, EmeraldLang::Ita)),
            vec![
                vec![208, 188, 207, 226, 234, 176, 203, 226],
                vec![187, 187, 187, 176, 178, 203, 226],
                vec![187, 187, 214, 204, 173, 227],
                vec![187, 162, 205, 172, 226],
                vec![163, 192, 172, 226, 178, 192, 203, 225],
                vec![187],
                vec![187],
                vec![187],
                vec![238, 182, 224, 227, 237, 176, 203, 226],
                vec![182, 203, 226, 192, 193, 191, 226],
                vec![187, 187, 0, 176, 172, 229],
                vec![187, 224, 206, 174, 226],
                vec![211, 200, 172, 226, 192, 200, 204, 227],
                vec![187, 187, 187, 222, 0, 172, 226, 0],
            ]
        );
        assert_eq!(
            boxes(get_emerald_sid_box_names_result(0x0001, EmeraldLang::Ger)),
            vec![
                vec![208, 188, 207, 226, 246, 176, 203, 226],
                vec![187, 187, 187, 208, 194, 173, 227],
                vec![187, 187, 176, 194, 204, 226],
                vec![187, 178, 192, 203, 225],
                vec![187],
                vec![187],
                vec![187],
                vec![187],
                vec![238, 182, 224, 227, 237, 176, 203, 226],
                vec![182, 203, 226, 192, 193, 191, 226],
                vec![187, 187, 0, 176, 172, 229],
                vec![187, 225, 206, 174, 226],
                vec![211, 200, 172, 226, 192, 200, 204, 227],
                vec![187, 187, 187, 226, 0, 172, 226, 0],
            ]
        );
    }

    // TODO: Find a seed that

    #[test]
    fn emerald_seed_box_names_match_typescript() {
        if !cfg!(debug_assertions) {
            // This is a difficult seed.
            assert_eq!(
                boxes(get_emerald_seed_box_names_result(
                    0x25899da4,
                    EmeraldLang::Eng,
                )),
                vec![
                    vec![192, 199, 176, 227, 182, 205, 172, 226],
                    vec![187, 187, 187, 192, 205, 172, 226],
                    vec![187, 187, 172, 180, 173, 227],
                    vec![187, 222, 184, 171, 226],
                    vec![238, 190, 171, 226, 213, 191, 171, 226],
                    vec![187, 187, 187, 0, 176, 172, 229],
                    vec![187],
                    vec![187],
                    vec![238, 182, 224, 227, 237, 176, 203, 226],
                    vec![182, 203, 226, 192, 193, 191, 226],
                    vec![187, 187, 0, 176, 172, 229],
                    vec![187, 177, 205, 206, 226],
                    vec![211, 200, 172, 226, 192, 200, 204, 227],
                    vec![205, 172, 226, 176, 0, 204, 226, 0],
                ]
            );
        }

        assert_eq!(
            boxes(get_emerald_seed_box_names_result(
                0xacde1234,
                EmeraldLang::Eng,
            )),
            vec![
                vec![192, 199, 176, 227, 182, 205, 172, 226],
                vec![187, 187, 187, 192, 205, 172, 226],
                vec![187, 187, 172, 180, 173, 227],
                vec![187, 222, 184, 171, 226],
                vec![238, 190, 171, 226, 213, 191, 171, 226],
                vec![187, 187, 187, 0, 176, 172, 229],
                vec![187],
                vec![187],
                vec![238, 182, 224, 227, 237, 176, 203, 226],
                vec![182, 203, 226, 192, 193, 191, 226],
                vec![187, 187, 0, 176, 172, 229],
                vec![187, 177, 205, 206, 226],
                vec![211, 200, 172, 226, 192, 200, 204, 227],
                vec![205, 172, 226, 176, 0, 204, 226, 0],
            ]
        );
        assert_eq!(
            boxes(get_emerald_seed_box_names_result(
                0xff123423,
                EmeraldLang::Ita,
            )),
            vec![
                vec![192, 199, 176, 227, 182, 205, 172, 226],
                vec![187, 187, 187, 192, 205, 172, 226],
                vec![187, 187, 238, 184, 224, 227],
                vec![187, 206, 189, 171, 226],
                vec![164, 176, 171, 226, 0, 176, 172, 229],
                vec![187],
                vec![187],
                vec![187],
                vec![238, 182, 224, 227, 237, 176, 203, 226],
                vec![182, 203, 226, 192, 193, 191, 226],
                vec![187, 187, 0, 176, 172, 229],
                vec![187, 224, 206, 174, 226],
                vec![211, 200, 172, 226, 192, 200, 204, 227],
                vec![187, 187, 187, 222, 0, 172, 226, 0],
            ]
        );
        assert_eq!(
            boxes(get_emerald_seed_box_names_result(
                0x00000001,
                EmeraldLang::Ger,
            )),
            vec![
                vec![192, 199, 176, 227, 182, 205, 172, 226],
                vec![187, 187, 187, 192, 205, 172, 226],
                vec![187, 187, 208, 178, 173, 227],
                vec![187, 176, 178, 203, 226],
                vec![0, 176, 172, 229],
                vec![187],
                vec![187],
                vec![187],
                vec![238, 182, 224, 227, 237, 176, 203, 226],
                vec![182, 203, 226, 192, 193, 191, 226],
                vec![187, 187, 0, 176, 172, 229],
                vec![187, 225, 206, 174, 226],
                vec![211, 200, 172, 226, 192, 200, 204, 227],
                vec![187, 187, 187, 226, 0, 172, 226, 0],
            ]
        );
    }
}
