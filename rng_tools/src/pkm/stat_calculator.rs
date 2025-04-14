
pub fn calculate_hp(base_stat:u16, iv:u8, ev:u16, level:u8) -> u16 {
  if base_stat == 1 {
    return 1; // Shedinja
  }

  let n:u16 = 2 * (base_stat as u16) + (iv as u16);
  return (((n + ev / 4) * (level as u16)) / 100) + (level as u16) + 10;
}

pub fn calculate_non_hp(base_stat:u16, iv:u8, ev:u16, level:u8, nature_factor:i8) -> u16 {
  let n:u16 = (((2 * (base_stat as u16) + (iv as u16) + (ev as u16) / 4) * (level as u16)) / 100) + 5;
  if nature_factor == 1 {
    (n * 110) / 100
  } else if nature_factor == -1 {
    (n * 90) / 100
  } else {
    n
  }
}
