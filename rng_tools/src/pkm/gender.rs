use crate::generators::gen3::MultiFilter;
use num_enum::FromPrimitive;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;

#[derive(
    Default, Clone, Copy, Debug, Eq, PartialEq, FromPrimitive, Tsify, Serialize, Deserialize,
)]
#[tsify(into_wasm_abi, from_wasm_abi)]
#[repr(u8)]
pub enum Gender {
    #[default]
    Male = 0,
    Female = 1,
    Genderless = 2,
}
