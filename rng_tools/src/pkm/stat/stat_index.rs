use num_enum::FromPrimitive;

/// Used to index stat lists using gen 3/4 order.
/// Can also be used when order is unimportant.
#[derive(Debug, Clone, Copy, FromPrimitive, PartialEq)]
#[repr(u8)]
pub enum G3Idx {
    #[num_enum(default)]
    Hp = 0,
    Atk = 1,
    Def = 2,
    Spe = 3,
    Spa = 4,
    Spd = 5,
}

impl G3Idx {
    pub const ORDER: [G3Idx; 6] = [
        G3Idx::Hp,
        G3Idx::Atk,
        G3Idx::Def,
        G3Idx::Spe,
        G3Idx::Spa,
        G3Idx::Spd,
    ];
}

/// Used to index stat lists using gen 5+ order.
/// Can also be used when order is unimportant.
#[derive(Debug, Clone, Copy, FromPrimitive)]
#[repr(u8)]
pub enum G5Idx {
    #[num_enum(default)]
    Hp = 0,
    Atk = 1,
    Def = 2,
    Spa = 3,
    Spd = 4,
    Spe = 5,
}

impl G5Idx {
    pub const ORDER: [G5Idx; 6] = [
        G5Idx::Hp,
        G5Idx::Atk,
        G5Idx::Def,
        G5Idx::Spa,
        G5Idx::Spd,
        G5Idx::Spe,
    ];
}

#[macro_export]
macro_rules! impl_stat_index {
    ($idx:ty, $ty:ty, $item:ty) => {
        impl std::ops::Index<$idx> for $ty {
            type Output = $item;

            fn index(&self, index: $idx) -> &Self::Output {
                match index {
                    <$idx>::Hp => &self.hp,
                    <$idx>::Atk => &self.atk,
                    <$idx>::Def => &self.def,
                    <$idx>::Spe => &self.spe,
                    <$idx>::Spa => &self.spa,
                    <$idx>::Spd => &self.spd,
                }
            }
        }

        impl std::ops::IndexMut<$idx> for $ty {
            fn index_mut(&mut self, index: $idx) -> &mut Self::Output {
                match index {
                    <$idx>::Hp => &mut self.hp,
                    <$idx>::Atk => &mut self.atk,
                    <$idx>::Def => &mut self.def,
                    <$idx>::Spe => &mut self.spe,
                    <$idx>::Spa => &mut self.spa,
                    <$idx>::Spd => &mut self.spd,
                }
            }
        }
    };
}
