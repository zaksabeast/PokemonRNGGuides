#[derive(Clone, Copy, Debug, Default, Eq, PartialEq)]
pub struct TsvTrv {
    pub tid_xor_sid: u16,
}

impl TsvTrv {
    pub fn from_tid_sid(tid: u16, sid: u16) -> Self {
        Self {
            tid_xor_sid: tid ^ sid,
        }
    }

    pub fn from_tsv_trv_gen3_to_5(tsv: u16, trv: u8) -> Self {
        Self {
            tid_xor_sid: (tsv << 3) | u16::from(trv & 0x7),
        }
    }

    pub fn from_tsv_trv_gen6_plus(tsv: u16, trv: u8) -> Self {
        Self {
            tid_xor_sid: (tsv << 4) | u16::from(trv & 0xf),
        }
    }

    pub fn shiny_type_gen3_to_5(self, pid: u32) -> ShinyType {
        ShinyType::from_xor(PsvPrv::from_pid(pid).pid_high_xor_low ^ self.tid_xor_sid, 8)
    }

    pub fn shiny_type_gen6_plus(self, pid: u32) -> ShinyType {
        ShinyType::from_xor(
            PsvPrv::from_pid(pid).pid_high_xor_low ^ self.tid_xor_sid,
            16,
        )
    }

    pub fn tsv_gen3_to_5(self) -> u16 {
        self.tid_xor_sid >> 3
    }

    pub fn tsv_gen6_plus(self) -> u16 {
        self.tid_xor_sid >> 4
    }

    pub fn trv(self) -> u8 {
        (self.tid_xor_sid & 0xf) as u8
    }
}

#[derive(Clone, Copy, Debug, Default, Eq, PartialEq)]
pub struct PsvPrv {
    pub pid_high_xor_low: u16,
}

impl PsvPrv {
    pub fn from_pid(pid: u32) -> Self {
        Self {
            pid_high_xor_low: (pid >> 16) as u16 ^ pid as u16,
        }
    }

    pub fn psv_gen3_to_5(self) -> u16 {
        self.pid_high_xor_low >> 3
    }

    pub fn psv_gen6_plus(self) -> u16 {
        self.pid_high_xor_low >> 4
    }

    pub fn prv(self) -> u8 {
        (self.pid_high_xor_low & 0xf) as u8
    }
}

pub fn gen3_tsv(tid: u16, sid: u16) -> u16 {
    TsvTrv::from_tid_sid(tid, sid).tsv_gen3_to_5()
}

pub fn gen3_psv(pid: u32) -> u16 {
    PsvPrv::from_pid(pid).psv_gen3_to_5()
}

pub fn gen3_shiny(pid: u32, tid: u16, sid: u16) -> ShinyType {
    TsvTrv::from_tid_sid(tid, sid).shiny_type_gen3_to_5(pid)
}

pub fn gen6_psv(pid: u32) -> u16 {
    PsvPrv::from_pid(pid).psv_gen6_plus()
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
    fn from_xor(xor: u16, threshold: u16) -> Self {
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
    fn trainer_shiny_values_round_trip() {
        for tid_xor_sid in 0..=u16::MAX {
            let trainer = TsvTrv::from_tid_sid(tid_xor_sid, 0);
            assert_eq!(
                TsvTrv::from_tsv_trv_gen3_to_5(trainer.tsv_gen3_to_5(), trainer.trv()),
                trainer
            );
            assert_eq!(
                TsvTrv::from_tsv_trv_gen6_plus(trainer.tsv_gen6_plus(), trainer.trv()),
                trainer
            );
        }
    }

    #[test]
    fn shiny_classification_boundaries() {
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
        assert_eq!(
            TsvTrv::default().shiny_type_gen6_plus(15),
            ShinyType::StarShiny
        );
        assert_eq!(
            TsvTrv::default().shiny_type_gen6_plus(16),
            ShinyType::NotShiny
        );
    }

    #[test]
    fn shiny_values_and_remainders() {
        let trainer = TsvTrv::from_tid_sid(0x1234, 0x5678);
        let pokemon = PsvPrv::from_pid(0x12345678);
        assert_eq!(trainer.tid_xor_sid, 0x444c);
        assert_eq!(trainer.tsv_gen3_to_5(), 0x889);
        assert_eq!(trainer.tsv_gen6_plus(), 0x444);
        assert_eq!(trainer.trv(), 12);
        assert_eq!(pokemon.psv_gen3_to_5(), trainer.tsv_gen3_to_5());
        assert_eq!(pokemon.psv_gen6_plus(), trainer.tsv_gen6_plus());
        assert_eq!(pokemon.prv(), trainer.trv());
    }
}
