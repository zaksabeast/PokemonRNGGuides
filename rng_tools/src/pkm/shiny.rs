pub fn gen3_tsv(tid: u16, sid: u16) -> u16 {
    (tid ^ sid) >> 3
}

pub fn gen3_psv(pid: u32) -> u16 {
    let pidh = (pid >> 16) as u16;
    let pidl = pid as u16;
    (pidh ^ pidl) >> 3
}

pub fn gen3_shiny(pid: u32, tid: u16, sid: u16) -> ShinyType {
    ShinyType::from_xor(((pid >> 16) as u16) ^ (pid as u16) ^ tid ^ sid, 8)
}

pub fn gen6_tsv(tid: u16, sid: u16) -> u16 {
    (tid ^ sid) >> 4
}

pub fn gen6_psv(pid: u32) -> u16 {
    let pidh = (pid >> 16) as u16;
    let pidl = pid as u16;
    (pidh ^ pidl) >> 4
}

#[derive(
    Clone, Copy, Debug, Default, Eq, PartialEq, serde::Serialize, serde::Deserialize, tsify::Tsify,
)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum ShinyType {
    #[default]
    NotShiny,
    SquareShiny,
    StarShiny,
}

impl ShinyType {
    pub fn from_xor(xor: u16, threshold: u16) -> Self {
        match xor {
            0 => Self::SquareShiny,
            value if value < threshold => Self::StarShiny,
            _ => Self::NotShiny,
        }
    }

    pub fn is_shiny(self) -> bool {
        self != Self::NotShiny
    }
}

#[derive(
    Clone, Copy, Debug, Default, Eq, PartialEq, serde::Serialize, serde::Deserialize, tsify::Tsify,
)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum ShinyFilter {
    #[default]
    Any,
    AnyShiny,
    SquareShiny,
    StarShiny,
}

impl ShinyFilter {
    pub fn allows(self, shiny: ShinyType) -> bool {
        match self {
            Self::Any => true,
            Self::AnyShiny => shiny.is_shiny(),
            Self::SquareShiny => shiny == ShinyType::SquareShiny,
            Self::StarShiny => shiny == ShinyType::StarShiny,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn classification_boundaries() {
        for (xor, expected) in [
            (0, ShinyType::SquareShiny),
            (1, ShinyType::StarShiny),
            (7, ShinyType::StarShiny),
            (8, ShinyType::NotShiny),
            (65535, ShinyType::NotShiny),
        ] {
            assert_eq!(
                gen3_shiny(0x12340000 | (0x1234 ^ 54321 ^ 12345 ^ xor), 54321, 12345),
                expected
            );
        }
        assert_eq!(ShinyType::from_xor(15, 16), ShinyType::StarShiny);
        assert_eq!(ShinyType::from_xor(16, 16), ShinyType::NotShiny);
    }

    #[test]
    fn filter_truth_table() {
        for shiny in [
            ShinyType::NotShiny,
            ShinyType::SquareShiny,
            ShinyType::StarShiny,
        ] {
            assert!(ShinyFilter::Any.allows(shiny));
            assert_eq!(
                ShinyFilter::AnyShiny.allows(shiny),
                shiny != ShinyType::NotShiny
            );
            assert_eq!(
                ShinyFilter::SquareShiny.allows(shiny),
                shiny == ShinyType::SquareShiny
            );
            assert_eq!(
                ShinyFilter::StarShiny.allows(shiny),
                shiny == ShinyType::StarShiny
            );
        }
    }
}
