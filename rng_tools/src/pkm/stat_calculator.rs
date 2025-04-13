
fn calculate_hp(iv:u8, base_stat:u16, ev:u16, lvl:u8) -> u16 {
  if base_stat == 1 {
    return 1; // Shedinja
  }

  let tmp = (iv + 2 * base_stat + ev / 4);
  tmp * lvl / 100 + 10 + lvl
}

fn calculate_non_hp(iv:u8, base_stat:u16, ev:u16, lvl:u8) -> u16 {
    let baseResult = Math.floor(((iv + baseStats * 2 + ev / 4) * level / 100 + 5))
    let result = Math.floor(baseResult * nature)
    return result
}

//NO_PROD
