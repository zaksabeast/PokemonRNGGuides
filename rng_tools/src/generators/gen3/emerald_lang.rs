use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Clone, Copy, Default, Debug, Eq, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum EmeraldLang {
    #[default]
    English,
    French,
    Italian,
    Spanish,
    German,
    Japanese,
}
