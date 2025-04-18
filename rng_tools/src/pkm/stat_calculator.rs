
use wasm_bindgen::prelude::*;
use crate::{StatsValue};

//NO_PROD
#[wasm_bindgen]
extern { fn js_log(msg:&str); }

pub fn gen3_calculate_hp(base_stat:u16, iv:u8, ev:u16, level:u8) -> u16 {
  if base_stat == 1 {
    return 1; // Shedinja
  }

  let n:u16 = 2 * (base_stat as u16) + (iv as u16);
  return (((n + ev / 4) * (level as u16)) / 100) + (level as u16) + 10;
}

pub fn gen3_calculate_non_hp(base_stat:u16, iv:u8, ev:u16, level:u8, nature_factor:i8) -> u16 {
  let n:u16 = (((2 * (base_stat as u16) + (iv as u16) + (ev as u16) / 4) * (level as u16)) / 100) + 5;
  if nature_factor == 1 {
    (n * 110) / 100
  } else if nature_factor == -1 {
    unsafe { js_log(&format!("{} * 90 / 100 = {}", n, (n * 90) / 100)); }
    (n * 90) / 100
  } else {
    n
  }
}

#[wasm_bindgen]
pub fn gen3_calculate_minmax_stats(base_stats:StatsValue, level:u8, is_min_stat:bool) -> StatsValue {
  let iv = if is_min_stat { 0 } else { 31 };
  let nature_fact = if is_min_stat { -1 } else { 1 };

  StatsValue {
    hp:gen3_calculate_hp(base_stats.hp, iv, 0, level),
    atk:gen3_calculate_non_hp(base_stats.atk, iv, 0, level, nature_fact),
    def:gen3_calculate_non_hp(base_stats.def, iv, 0, level, nature_fact),
    spa:gen3_calculate_non_hp(base_stats.spa, iv, 0, level, nature_fact),
    spd:gen3_calculate_non_hp(base_stats.spd, iv, 0, level, nature_fact),
    spe:gen3_calculate_non_hp(base_stats.spe, iv, 0, level, nature_fact),
  }
}



 