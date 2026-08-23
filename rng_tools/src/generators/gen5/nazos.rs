use super::ds_type::DsType;
use super::game::Gen5Game;
use super::language::Gen5Language;

const fn compute_nazo_bw(nazo: u32) -> [u32; 5] {
    const OFFSET1: u32 = 0xfc;
    const OFFSET2: u32 = OFFSET1 + 0x4c;

    let mut nazos = [0u32; 5];

    nazos[0] = nazo.swap_bytes();
    nazos[1] = (nazo + OFFSET1).swap_bytes();
    nazos[2] = nazos[1];
    nazos[3] = (nazo + OFFSET2).swap_bytes();
    nazos[4] = nazos[3];

    nazos
}

const fn compute_nazo_bw2(nazo: u32, nazo0: u32, nazo1: u32) -> [u32; 5] {
    const OFFSET: u32 = 0x54;

    let mut nazos = [0u32; 5];

    nazos[0] = nazo0.swap_bytes();
    nazos[1] = nazo1.swap_bytes();
    nazos[2] = nazo.swap_bytes();
    nazos[3] = (nazo + OFFSET).swap_bytes();
    nazos[4] = nazos[3];

    nazos
}

const ENGLISH_BLACK: [u32; 5] = compute_nazo_bw(0x022160b0);
const ENGLISH_WHITE: [u32; 5] = compute_nazo_bw(0x022160d0);
const ENGLISH_BLACK_DSI: [u32; 5] = compute_nazo_bw(0x02760190);
const ENGLISH_WHITE_DSI: [u32; 5] = compute_nazo_bw(0x027601b0);
const ENGLISH_BLACK_2: [u32; 5] = compute_nazo_bw2(0x02200010, 0x0209aee8, 0x02039de9);
const ENGLISH_WHITE_2: [u32; 5] = compute_nazo_bw2(0x02200050, 0x0209af28, 0x02039e15);
const ENGLISH_BLACK_2_DSI: [u32; 5] = compute_nazo_bw2(0x027a5f70, 0x0209aee8, 0x02039de9);
const ENGLISH_WHITE_2_DSI: [u32; 5] = compute_nazo_bw2(0x027a5e90, 0x0209af28, 0x02039e15);

const JAPANESE_BLACK: [u32; 5] = compute_nazo_bw(0x02215f10);
const JAPANESE_WHITE: [u32; 5] = compute_nazo_bw(0x02215f30);
const JAPANESE_BLACK_DSI: [u32; 5] = compute_nazo_bw(0x02761150);
const JAPANESE_WHITE_DSI: [u32; 5] = compute_nazo_bw(0x02761150);
const JAPANESE_BLACK_2: [u32; 5] = compute_nazo_bw2(0x021ff9b0, 0x0209a8dc, 0x02039ac9);
const JAPANESE_WHITE_2: [u32; 5] = compute_nazo_bw2(0x021ff9d0, 0x0209a8fc, 0x02039af5);
const JAPANESE_BLACK_2_DSI: [u32; 5] = compute_nazo_bw2(0x027aa730, 0x0209a8dc, 0x02039ac9);
const JAPANESE_WHITE_2_DSI: [u32; 5] = compute_nazo_bw2(0x027aa5f0, 0x0209a8fc, 0x02039af5);

const GERMAN_BLACK: [u32; 5] = compute_nazo_bw(0x02215ff0);
const GERMAN_WHITE: [u32; 5] = compute_nazo_bw(0x02216010);
const GERMAN_BLACK_DSI: [u32; 5] = compute_nazo_bw(0x027602f0);
const GERMAN_WHITE_DSI: [u32; 5] = compute_nazo_bw(0x027602f0);
const GERMAN_BLACK_2: [u32; 5] = compute_nazo_bw2(0x021fff50, 0x0209ae28, 0x02039d69);
const GERMAN_WHITE_2: [u32; 5] = compute_nazo_bw2(0x021fff70, 0x0209ae48, 0x02039d95);
const GERMAN_BLACK_2_DSI: [u32; 5] = compute_nazo_bw2(0x027a6110, 0x0209ae28, 0x02039d69);
const GERMAN_WHITE_2_DSI: [u32; 5] = compute_nazo_bw2(0x027a6010, 0x0209ae48, 0x02039d95);

const SPANISH_BLACK: [u32; 5] = compute_nazo_bw(0x02216070);
const SPANISH_WHITE: [u32; 5] = compute_nazo_bw(0x02216070);
const SPANISH_BLACK_DSI: [u32; 5] = compute_nazo_bw(0x027601f0);
const SPANISH_WHITE_DSI: [u32; 5] = compute_nazo_bw(0x027601f0);
const SPANISH_BLACK_2: [u32; 5] = compute_nazo_bw2(0x021fffd0, 0x0209aea8, 0x02039db9);
const SPANISH_WHITE_2: [u32; 5] = compute_nazo_bw2(0x021ffff0, 0x0209aec8, 0x02039de5);
const SPANISH_BLACK_2_DSI: [u32; 5] = compute_nazo_bw2(0x027a6070, 0x0209aea8, 0x02039db9);
const SPANISH_WHITE_2_DSI: [u32; 5] = compute_nazo_bw2(0x027a5fb0, 0x0209aec8, 0x02039de5);

const FRENCH_BLACK: [u32; 5] = compute_nazo_bw(0x02216030);
const FRENCH_WHITE: [u32; 5] = compute_nazo_bw(0x02216050);
const FRENCH_BLACK_DSI: [u32; 5] = compute_nazo_bw(0x02760230);
const FRENCH_WHITE_DSI: [u32; 5] = compute_nazo_bw(0x02760250);
const FRENCH_BLACK_2: [u32; 5] = compute_nazo_bw2(0x02200030, 0x0209af08, 0x02039df9);
const FRENCH_WHITE_2: [u32; 5] = compute_nazo_bw2(0x02200050, 0x0209af28, 0x02039e25);
const FRENCH_BLACK_2_DSI: [u32; 5] = compute_nazo_bw2(0x027a5f90, 0x0209af08, 0x02039df9);
const FRENCH_WHITE_2_DSI: [u32; 5] = compute_nazo_bw2(0x027a5ef0, 0x0209af28, 0x02039e25);

const ITALIAN_BLACK: [u32; 5] = compute_nazo_bw(0x02215fb0);
const ITALIAN_WHITE: [u32; 5] = compute_nazo_bw(0x02215fd0);
const ITALIAN_BLACK_DSI: [u32; 5] = compute_nazo_bw(0x027601d0);
const ITALIAN_WHITE_DSI: [u32; 5] = compute_nazo_bw(0x027601d0);
const ITALIAN_BLACK_2: [u32; 5] = compute_nazo_bw2(0x021fff10, 0x0209ade8, 0x02039d69);
const ITALIAN_WHITE_2: [u32; 5] = compute_nazo_bw2(0x021fff50, 0x0209ae28, 0x02039d95);
const ITALIAN_BLACK_2_DSI: [u32; 5] = compute_nazo_bw2(0x027a5f70, 0x0209ade8, 0x02039d69);
const ITALIAN_WHITE_2_DSI: [u32; 5] = compute_nazo_bw2(0x027a5ed0, 0x0209ae28, 0x02039d95);

const KOREAN_BLACK: [u32; 5] = compute_nazo_bw(0x022167b0);
const KOREAN_WHITE: [u32; 5] = compute_nazo_bw(0x022167b0);
const KOREAN_BLACK_DSI: [u32; 5] = compute_nazo_bw(0x02761150);
const KOREAN_WHITE_DSI: [u32; 5] = compute_nazo_bw(0x02761150);
const KOREAN_BLACK_2: [u32; 5] = compute_nazo_bw2(0x02200750, 0x0209b60c, 0x0203a4d5);
const KOREAN_WHITE_2: [u32; 5] = compute_nazo_bw2(0x02200770, 0x0209b62c, 0x0203a501);
const KOREAN_BLACK_2_DSI: [u32; 5] = compute_nazo_bw2(0x02200770, 0x0209b60c, 0x0203a4d5);
const KOREAN_WHITE_2_DSI: [u32; 5] = compute_nazo_bw2(0x027a57b0, 0x0209b62c, 0x0203a501);

pub fn get_nazo(language: Gen5Language, version: Gen5Game, ds_type: DsType) -> &'static [u32; 5] {
    use DsType::*;
    use Gen5Game::*;
    use Gen5Language::*;

    match (language, version, ds_type) {
        (English, Black, DS) => &ENGLISH_BLACK,
        (English, Black, DSi | DS3) => &ENGLISH_BLACK_DSI,
        (English, White, DS) => &ENGLISH_WHITE,
        (English, White, DSi | DS3) => &ENGLISH_WHITE_DSI,
        (English, Black2, DS) => &ENGLISH_BLACK_2,
        (English, Black2, DSi | DS3) => &ENGLISH_BLACK_2_DSI,
        (English, White2, DS) => &ENGLISH_WHITE_2,
        (English, White2, DSi | DS3) => &ENGLISH_WHITE_2_DSI,
        (Japanese, Black, DS) => &JAPANESE_BLACK,
        (Japanese, Black, DSi | DS3) => &JAPANESE_BLACK_DSI,
        (Japanese, White, DS) => &JAPANESE_WHITE,
        (Japanese, White, DSi | DS3) => &JAPANESE_WHITE_DSI,
        (Japanese, Black2, DS) => &JAPANESE_BLACK_2,
        (Japanese, Black2, DSi | DS3) => &JAPANESE_BLACK_2_DSI,
        (Japanese, White2, DS) => &JAPANESE_WHITE_2,
        (Japanese, White2, DSi | DS3) => &JAPANESE_WHITE_2_DSI,
        (German, Black, DS) => &GERMAN_BLACK,
        (German, Black, DSi | DS3) => &GERMAN_BLACK_DSI,
        (German, White, DS) => &GERMAN_WHITE,
        (German, White, DSi | DS3) => &GERMAN_WHITE_DSI,
        (German, Black2, DS) => &GERMAN_BLACK_2,
        (German, Black2, DSi | DS3) => &GERMAN_BLACK_2_DSI,
        (German, White2, DS) => &GERMAN_WHITE_2,
        (German, White2, DSi | DS3) => &GERMAN_WHITE_2_DSI,
        (Spanish, Black, DS) => &SPANISH_BLACK,
        (Spanish, Black, DSi | DS3) => &SPANISH_BLACK_DSI,
        (Spanish, White, DS) => &SPANISH_WHITE,
        (Spanish, White, DSi | DS3) => &SPANISH_WHITE_DSI,
        (Spanish, Black2, DS) => &SPANISH_BLACK_2,
        (Spanish, Black2, DSi | DS3) => &SPANISH_BLACK_2_DSI,
        (Spanish, White2, DS) => &SPANISH_WHITE_2,
        (Spanish, White2, DSi | DS3) => &SPANISH_WHITE_2_DSI,
        (French, Black, DS) => &FRENCH_BLACK,
        (French, Black, DSi | DS3) => &FRENCH_BLACK_DSI,
        (French, White, DS) => &FRENCH_WHITE,
        (French, White, DSi | DS3) => &FRENCH_WHITE_DSI,
        (French, Black2, DS) => &FRENCH_BLACK_2,
        (French, Black2, DSi | DS3) => &FRENCH_BLACK_2_DSI,
        (French, White2, DS) => &FRENCH_WHITE_2,
        (French, White2, DSi | DS3) => &FRENCH_WHITE_2_DSI,
        (Italian, Black, DS) => &ITALIAN_BLACK,
        (Italian, Black, DSi | DS3) => &ITALIAN_BLACK_DSI,
        (Italian, White, DS) => &ITALIAN_WHITE,
        (Italian, White, DSi | DS3) => &ITALIAN_WHITE_DSI,
        (Italian, Black2, DS) => &ITALIAN_BLACK_2,
        (Italian, Black2, DSi | DS3) => &ITALIAN_BLACK_2_DSI,
        (Italian, White2, DS) => &ITALIAN_WHITE_2,
        (Italian, White2, DSi | DS3) => &ITALIAN_WHITE_2_DSI,
        (Korean, Black, DS) => &KOREAN_BLACK,
        (Korean, Black, DSi | DS3) => &KOREAN_BLACK_DSI,
        (Korean, White, DS) => &KOREAN_WHITE,
        (Korean, White, DSi | DS3) => &KOREAN_WHITE_DSI,
        (Korean, Black2, DS) => &KOREAN_BLACK_2,
        (Korean, Black2, DSi | DS3) => &KOREAN_BLACK_2_DSI,
        (Korean, White2, DS) => &KOREAN_WHITE_2,
        (Korean, White2, DSi | DS3) => &KOREAN_WHITE_2_DSI,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_nazo() {
        let nazo = get_nazo(Gen5Language::English, Gen5Game::Black, DsType::DS);
        assert_eq!(
            nazo,
            &[0xb0602102, 0xac612102, 0xac612102, 0xf8612102, 0xf8612102]
        );
    }
}
