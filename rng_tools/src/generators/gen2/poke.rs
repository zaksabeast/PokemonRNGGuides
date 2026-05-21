#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum SpecialTrait {
    None,
    Shiny,
    MaxDv,
}

pub fn possible_special_trait(pokes: &[Poke]) -> SpecialTrait {
    pokes
        .iter()
        .filter_map(|poke| match poke.special_trait() {
            SpecialTrait::None => None,
            special_trait => Some(special_trait),
        })
        .next()
        .unwrap_or(SpecialTrait::None)
}

#[derive(Debug)]
pub struct Poke {
    pub hp: u8,
    pub atk: u8,
    pub def: u8,
    pub spe: u8,
    pub spc: u8,
}

impl Poke {
    pub fn new(atkdef: u8, spespc: u8) -> Self {
        let atk = atkdef >> 4;
        let def = atkdef & 0xf;
        let spe = spespc >> 4;
        let spc = spespc & 0xf;
        let hp = ((atk & 1) * 8) + ((def & 1) * 4) + ((spe & 1) * 2) + (spc & 1);

        Self {
            hp,
            atk,
            def,
            spe,
            spc,
        }
    }

    pub fn max_dvs(&self) -> bool {
        self.hp == 15 && self.atk == 15 && self.def == 15 && self.spe == 15 && self.spc == 15
    }

    pub fn is_shiny(&self) -> bool {
        self.spe == 10
            && self.spc == 10
            && self.def == 10
            && [0x2, 0x3, 0x6, 0x7, 0xA, 0xB, 0xE, 0xF].contains(&self.atk)
    }

    pub fn special_trait(&self) -> SpecialTrait {
        if self.is_shiny() {
            return SpecialTrait::Shiny;
        }

        if self.max_dvs() {
            return SpecialTrait::MaxDv;
        }

        SpecialTrait::None
    }
}
