#[cfg(test)]
use crate::gen3::ace::ace_code_generator::NAME_SIZE;
use crate::gen3::ace::ace_code_generator::{
    AceResult, CommandBytes, EmeraldLang, PC, R11, R12, cached_constants, data_proc,
    fit_codes_into_boxes, mov_like, preferred_bytes, str_pre, strh, tweak_mov, tweak_sbc,
};

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
    out.extend(tweak_mov(R11, seed, lang, constants, constants_mov_mvn)?);
    out.push(preferred_bytes(str_pre(R11, R12, 0), lang)?);
    Some(out)
}

fn box_names_for_commands(
    commands: Option<Vec<CommandBytes>>,
    lang: EmeraldLang,
) -> Option<AceResult> {
    let Some(commands) = commands else {
        return None;
    };
    let Some(raw_boxes) = fit_codes_into_boxes(&commands, lang) else {
        return None;
    };
    Some(AceResult { raw_boxes })
}

pub fn get_emerald_sid_box_names_result(sid: u16, lang: EmeraldLang) -> Option<AceResult> {
    box_names_for_commands(sid_program_bytes(sid, lang), lang)
}

pub fn get_emerald_seed_box_names_result(seed: u32, lang: EmeraldLang) -> Option<AceResult> {
    box_names_for_commands(seed_program_bytes(seed, lang), lang)
}

#[cfg(test)]
mod tests {
    use super::*;

    fn parse_hex(value: &str) -> u32 {
        u32::from_str_radix(value.strip_prefix("0x").unwrap_or(value), 16).unwrap()
    }

    fn parse_lang(lang: &str) -> EmeraldLang {
        match lang {
            "eng" => EmeraldLang::English,
            "fra" => EmeraldLang::French,
            "ita" => EmeraldLang::Italian,
            "spa" => EmeraldLang::Spanish,
            "ger" => EmeraldLang::German,
            "jap" => EmeraldLang::Japanese,
            _ => panic!("invalid Emerald lang {lang:?}"),
        }
    }

    fn result_to_hex(res: Option<AceResult>) -> String {
        box_names_to_hex(&boxes(res))
    }

    fn box_names_to_hex(boxes: &[Vec<u8>]) -> String {
        use std::fmt::Write;

        let mut out = String::with_capacity(boxes.len() * NAME_SIZE * 2);
        for box_name in boxes {
            for &byte in box_name {
                write!(out, "{byte:02X}").ok();
            }

            for _ in box_name.len()..=NAME_SIZE {
                out.push_str("FF");
            }
        }

        out
    }

    fn boxes(result: Option<AceResult>) -> Vec<Vec<u8>> {
        result.map(|res| res.raw_boxes).unwrap_or(vec![])
    }

    // cargo test --release emerald_ace -- --ignored
    // Input and output files are used instead of inlining data, in order to simplify tests in multiple implementations.
    #[test]
    #[ignore]
    fn emerald_ace() {
        let inputs = include_str!("test_input.txt").lines();
        let mut expected = include_str!("test_output.txt").lines();

        for (line_idx, input) in inputs.enumerate() {
            let mut parts = input.split_ascii_whitespace();
            let manip = parts.next().unwrap();
            let value = parse_hex(parts.next().unwrap());
            let lang = parse_lang(parts.next().unwrap());

            let actual = match manip {
                "sid" => result_to_hex(get_emerald_sid_box_names_result(value as u16, lang)),
                "seed" => result_to_hex(get_emerald_seed_box_names_result(value, lang)),
                _ => panic!(
                    "text_input.txt:{} has unsupported manip {manip:?}",
                    line_idx + 1
                ),
            };
            let expected = expected.next().unwrap();

            assert_eq!(
                actual,
                expected,
                "compare mismatch on line {}",
                line_idx + 1
            );
        }

        assert!(
            expected.next().is_none(),
            "text_output.txt has more rows than text_input.txt"
        );
    }
}
