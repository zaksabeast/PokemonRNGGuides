use wasm_bindgen::prelude::*;

const MAX_PID_MOD_24_CYCLE_COUNT: usize = 1000; // min is 18 and max is 900

// Calculate the number of cycles for unsigned modulo operation in Gen3 GBA games.
// Original code by Shao
pub const fn calc_modulo_cycle_unsigned(dividend: u32, divisor: u32) -> usize {
    if divisor == 0 {
        return 0; // error
    }

    if dividend < divisor {
        return 18; // 2*5 + 8 fo branch on 6th instruction
    }

    let mut cycles = 24; // Time to get into first loop and between first/second loops
    let mut r0 = dividend;
    let mut r1 = divisor;
    let mut r3: u32 = 1;
    let mut r2: u32;
    let mut r12: u32;
    let mut r4: u32 = 0x10000000;

    // Enter into first loop at offest 0x12
    loop {
        if r1 >= r4 {
            cycles += 10;
            break;
        }
        if r1 >= r0 {
            cycles += 14;
            break;
        }
        r1 <<= 4;
        r3 <<= 4;
        cycles += 20;
    }
    r4 <<= 3;
    loop {
        if r1 >= r4 {
            cycles += 10;
            break;
        }
        if r1 >= r0 {
            cycles += 14;
            break;
        }
        r1 <<= 1;
        r3 <<= 1;
        cycles += 20;
    }
    loop {
        // Entering loop at 0x30
        r2 = 0;
        cycles += 48;
        if r0 >= r1 {
            r0 -= r1;
            cycles -= 4;
        }
        r4 = r1 >> 1; // Now at 0x38
        if r0 >= r4 {
            r0 -= r4;
            r12 = r3;
            r3 = r3.rotate_right(1);
            r2 |= r3;
            r3 = r12;
            cycles += 7;
        }
        r4 = r1 >> 2; // Now at 0x4A
        if r0 >= r4 {
            r0 -= r4;
            r12 = r3;
            r3 = r3.rotate_right(2);
            r2 |= r3;
            r3 = r12;
            cycles += 7;
        }
        r4 = r1 >> 3; // Now at 0x5C
        if r0 >= r4 {
            r0 -= r4;
            r12 = r3;
            r3 = r3.rotate_right(3);
            r2 |= r3;
            r3 = r12;
            cycles += 7;
        }
        r12 = r3; // Now at 0x6E
        if r0 == 0 {
            cycles += 12;
            break;
        }
        r3 >>= 4;
        if r3 == 0 {
            cycles += 16;
            break;
        }
        r1 >>= 4;
        cycles += 20;
    }

    r2 &= 0xE0000000; // Now at 0x7C
    if r2 == 0 {
        return cycles + 18;
    }

    r3 = r12; // Now at 0x88
    r3 = r3.rotate_right(3);
    if (r2 & r3) != 0 {
        //r0 += r1 >> 3;
        cycles -= 2;
    }
    r3 = r12;
    r3 = r3.rotate_right(2);
    if (r2 & r3) != 0 {
        //r0 += r1 >> 2;
        cycles -= 2;
    }
    r3 = r12;
    r3 = r3.rotate_right(1);
    if (r2 & r3) != 0 {
        // r0 += r1 >> 1;
        cycles -= 2;
    }
    cycles + 75
}

pub const fn calc_modulo_cycle_signed(dividend: i32, divisor: i32) -> usize {
    let mut r0: u32;
    let mut r1: u32;
    let mut r2: u32;
    let mut r3: u32;
    let mut r4: u32;
    let mut r12: u32;
    let mut cycles = 10;
    r1 = divisor.unsigned_abs();
    r0 = dividend.unsigned_abs();
    r3 = 1;
    if divisor > 0 {
        cycles += 4;
    }

    cycles += 10;
    if dividend > 0 {
        cycles += 4;
    }

    if r0 < r1 {
        if dividend > 0 {
            return cycles + 32;
        }
        return cycles + 28;
    }
    r4 = 0x10000000;

    cycles += 8;

    loop {
        if r1 >= r4 {
            cycles += 10;
            break;
        }
        if r1 >= r0 {
            cycles += 14;
            break;
        }
        r1 <<= 4;
        r3 <<= 4;
        cycles += 20;
    }

    r4 <<= 3;
    cycles += 2;

    loop {
        if r1 >= r4 {
            cycles += 10;
            break;
        }
        if r1 >= r0 {
            cycles += 14;
            break;
        }
        r1 <<= 1;
        r3 <<= 1;
        cycles += 20;
    }

    loop {
        r2 = 0;
        cycles += 48;
        if r0 >= r1 {
            r0 -= r1;
            cycles -= 4;
        }

        r4 = r1 >> 1;
        if r0 >= r4 {
            r0 -= r4;
            r12 = r3;
            r3 = r3.rotate_right(1);
            r2 |= r3;
            r3 = r12;
            cycles += 7;
        }

        r4 = r1 >> 2;

        if r0 >= r4 {
            r0 -= r4;
            r12 = r3;
            r3 = r3.rotate_right(2);
            r2 |= r3;
            r3 = r12;
            cycles += 7;
        }

        r4 = r1 >> 3;
        if r0 >= r4 {
            r0 -= r4;
            r12 = r3;
            r3 = r3.rotate_right(3);
            r2 |= r3;
            r3 = r12;
            cycles += 7;
        }

        r12 = r3;
        if r0 == 0 {
            cycles += 12;
            break;
        }
        r3 >>= 4;
        if r3 == 0 {
            cycles += 16;
            break;
        }
        r1 >>= 4;
        cycles += 20;
    }

    r2 &= 0xE0000000;
    if r2 == 0 {
        if dividend >= 0 {
            return cycles + 36;
        }
        return cycles + 32;
    }
    cycles += 8;

    r3 = r12;
    cycles += 17;
    r3 = r3.rotate_right(3);
    if (r2 & r3) != 0 {
        //r0 += r1 >> 3;
        cycles -= 2;
    }
    r3 = r12;

    cycles += 17;
    r3 = r3.rotate_right(2);
    if (r2 & r3) != 0 {
        //r0 += r1 >> 2;
        cycles -= 2;
    }
    r3 = r12;

    cycles += 17;
    r3 = r3.rotate_right(1);
    if (r2 & r3) != 0 {
        // r0 += r1 >> 1;
        cycles -= 2;
    }

    cycles += 18;
    if dividend >= 0 {
        cycles += 4;
    }
    cycles
}

pub fn find_longest_modulo_cycle_unsigned(divisor: u32) -> (u32, usize) {
    let mut max = 0;
    let mut dividend_for_max = 0;
    for dividend in 0..=u32::MAX {
        let cycles = calc_modulo_cycle_unsigned(dividend, divisor);
        if cycles > max {
            max = cycles;
            dividend_for_max = dividend;
        }
    }
    (dividend_for_max, max)
}

pub fn calculate_distribution_modulo_cycle_unsigned_24() -> Vec<u32> {
    let mut res: [u32; MAX_PID_MOD_24_CYCLE_COUNT] = [0; MAX_PID_MOD_24_CYCLE_COUNT];
    for dividend in 0..=u32::MAX {
        let cycles = calc_modulo_cycle_unsigned(dividend, 24);
        res[cycles] += 1;
    }
    res.to_vec()
}

pub const FASTEST_MODULO_CYCLE_24: usize = 18;
pub const SLOWEST_MODULO_CYCLE_24: usize = 900;

// This range contains 99.9% of the values of DISTRIBUTION_CYCLE_COUNT_MODULO_24
pub const COMMON_LEAD_RANGE: std::ops::Range<usize> = 608..868;

const DISTRIBUTION_CYCLE_COUNT_MODULO_24: [u32; MAX_PID_MOD_24_CYCLE_COUNT] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0,
    0, 0, 0, 0, 0, 3, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 1, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 2, 0, 0, 3, 0,
    0, 3, 6, 1, 0, 3, 6, 0, 1, 6, 0, 0, 1, 6, 3, 0, 2, 0, 6, 1, 2, 3, 0, 0, 0, 15, 0, 0, 1, 9, 3,
    0, 20, 0, 0, 0, 18, 3, 6, 16, 0, 0, 0, 15, 1, 15, 6, 0, 0, 9, 6, 0, 20, 4, 0, 0, 18, 9, 9, 16,
    9, 0, 6, 16, 28, 24, 6, 11, 18, 36, 9, 27, 29, 19, 12, 20, 45, 6, 21, 20, 18, 9, 14, 26, 2, 21,
    21, 6, 3, 24, 24, 0, 22, 45, 12, 1, 38, 55, 0, 15, 60, 39, 9, 30, 78, 9, 12, 45, 58, 36, 12,
    60, 18, 43, 19, 46, 84, 11, 24, 15, 128, 8, 27, 126, 45, 7, 12, 222, 10, 39, 126, 96, 9, 43,
    241, 11, 84, 96, 114, 11, 128, 180, 17, 126, 99, 91, 25, 223, 145, 55, 136, 154, 108, 114, 246,
    201, 147, 170, 205, 218, 303, 202, 271, 261, 296, 220, 312, 464, 173, 289, 315, 410, 217, 295,
    465, 157, 297, 321, 376, 199, 257, 445, 110, 310, 391, 337, 163, 267, 612, 91, 288, 504, 503,
    157, 258, 855, 180, 297, 500, 762, 274, 237, 867, 326, 564, 352, 815, 551, 416, 596, 401, 1251,
    244, 625, 876, 1015, 298, 429, 2130, 351, 482, 1104, 1892, 165, 663, 2654, 641, 603, 1309,
    2521, 160, 1307, 2582, 972, 879, 1763, 2641, 297, 2165, 2380, 1447, 1159, 2520, 2785, 913,
    2746, 2634, 2505, 1684, 3151, 3587, 2345, 2920, 3213, 4242, 2795, 3234, 4659, 4205, 3059, 3499,
    5808, 4083, 2875, 5003, 5557, 3249, 3269, 6295, 4770, 2407, 4450, 6293, 3175, 2837, 6006, 5315,
    2008, 3740, 7429, 3214, 2627, 5800, 7170, 2015, 3505, 9234, 4412, 3262, 5727, 10241, 3080,
    4368, 10253, 6717, 5896, 5657, 12270, 5415, 7813, 9379, 8509, 11482, 6741, 11925, 8119, 15400,
    7900, 8972, 18999, 10707, 11282, 9992, 26112, 8174, 10235, 25038, 17359, 13734, 11327, 35324,
    10815, 15673, 26711, 23867, 19883, 14178, 38761, 14582, 25665, 25133, 28140, 27206, 19938,
    38025, 19392, 36475, 24516, 32833, 34223, 27211, 39471, 28039, 44656, 27361, 43084, 42756,
    33409, 46106, 42995, 50735, 32063, 58797, 54361, 37647, 53546, 62292, 56449, 35558, 72765,
    68052, 40452, 55950, 81787, 62364, 36709, 78828, 85528, 43307, 52874, 100497, 73172, 38046,
    77776, 113242, 52895, 49007, 118121, 99426, 48574, 73096, 150537, 82904, 52717, 127876, 143733,
    85701, 67183, 179450, 142731, 78655, 120033, 187898, 166497, 66203, 178248, 221044, 144376,
    95424, 205868, 286532, 82505, 146932, 286683, 251792, 69398, 192837, 407088, 124106, 111629,
    313603, 370628, 59857, 175093, 476293, 184103, 102919, 306889, 454976, 77871, 189093, 474562,
    251912, 138105, 302304, 488816, 136085, 257134, 437376, 339496, 226984, 341378, 508365, 260574,
    384601, 427843, 482850, 381427, 447729, 567012, 478292, 564945, 488327, 702557, 603109, 614792,
    682263, 786001, 769692, 614534, 970571, 868963, 797448, 825275, 1145926, 947209, 760562,
    1230157, 1154902, 923722, 953837, 1518609, 1067569, 869411, 1440159, 1471342, 950564, 1054517,
    1874564, 1170222, 929336, 1599028, 1831058, 921725, 1187941, 2167115, 1327183, 1022689,
    1777533, 2170462, 952260, 1527824, 2361596, 1558377, 1311090, 2193374, 2374845, 1175935,
    2351856, 2588452, 1858373, 1993475, 3293527, 2475788, 1796156, 4017747, 3371314, 2367923,
    3375177, 5869267, 2920163, 3231779, 7050962, 5940344, 3504990, 6024747, 11264012, 4885045,
    6067561, 12243070, 12634725, 5959648, 10637589, 21305796, 10693473, 10599998, 20256679,
    26765156, 10766995, 17294336, 37145088, 23823050, 16368326, 30522019, 50712545, 19506207,
    24637107, 57067623, 47251021, 22405778, 40388928, 82370411, 33885757, 30148293, 75379009,
    79844355, 28169557, 46018672, 113070499, 53902028, 31860310, 84714663, 113560318, 33933277,
    44955849, 130768374, 75589471, 29995404, 80906332, 135707493, 39780391, 38128828, 127666392,
    91324941, 26674186, 66141942, 136626954, 44324632, 29151937, 105930268, 94184748, 23874549,
    47265332, 116812762, 45178769, 21524160, 75989166, 83285041, 21854932, 30875809, 86626685,
    41210446, 16441909, 49041015, 64837246, 19623213, 19747709, 58642156, 34099422, 13001608,
    30638992, 47444542, 16568445, 13013905, 39687540, 27172970, 9947950, 20012107, 36002431,
    13220344, 8638731, 28998558, 22605166, 6928056, 13693989, 29661858, 10485210, 5352080,
    22204069, 19934776, 4349481, 9065787, 24743126, 8589995, 2884702, 16071453, 17235874, 2583212,
    5335590, 18819454, 7020405, 1291960, 10112472, 13333816, 1562163, 2644716, 12187776, 5280329,
    465717, 5277521, 8714840, 974518, 1066909, 6479526, 3415793, 131055, 2217809, 4661073, 580839,
    339724, 2758317, 1822455, 27669, 729455, 1992797, 301584, 82089, 915603, 779329, 4118, 180723,
    663561, 128089, 14146, 228273, 259692, 385, 31716, 165789, 42637, 1549, 40216, 64923, 17, 3515,
    29246, 10659, 81, 4465, 11457, 0, 185, 3249, 1881, 0, 235, 1273, 0, 0, 171, 209, 0, 0, 67, 0,
    0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
];

pub fn calculate_common_lead_range() -> std::ops::Range<usize> {
    // find the smallest range of DISTRIBUTION_CYCLE_COUNT_MODULO_24 that contains 99.9% of the values

    const COUNT_FOR_99_9_PCT: u64 = 4294967296 * 999 / 1000;

    // the range (x, x + range_len_by_start_idx[x]) contains 99.9% values
    let range_len_by_start_idx = (0..DISTRIBUTION_CYCLE_COUNT_MODULO_24.len()).map(|i| {
        let mut total_val_count_contained = 0_u64;
        for (j, val_count_contained) in DISTRIBUTION_CYCLE_COUNT_MODULO_24
            .iter()
            .enumerate()
            .skip(i)
        {
            total_val_count_contained += *val_count_contained as u64;

            if total_val_count_contained >= COUNT_FOR_99_9_PCT {
                return j - i;
            }
        }
        1000 // impossible to hold 99.9% of the values
    });

    let (smallest_range_idx, smallest_range_len) = range_len_by_start_idx
        .enumerate()
        .min_by(|(_, a), (_, b)| a.cmp(b))
        .unwrap();

    return smallest_range_idx..smallest_range_idx + smallest_range_len;
}

#[wasm_bindgen]
pub fn calculate_pid_speed(pid: u32) -> usize {
    calc_modulo_cycle_unsigned(pid, 24)
}

#[wasm_bindgen]
pub fn calculate_pid_speed_ranking(pid_cycle_speed: usize) -> f64 {
    let pid_cycle_speed = std::cmp::min(pid_cycle_speed, MAX_PID_MOD_24_CYCLE_COUNT);

    let mut slower_than_count = 0u64;
    for i in 0..pid_cycle_speed {
        slower_than_count += DISTRIBUTION_CYCLE_COUNT_MODULO_24[i] as u64;
    }
    slower_than_count as f64 / 4294967296.0_f64
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    #[ignore] // The test takes too long to be enabled by default
    fn test_calculate_distribution_modulo_cycle_unsigned_24() {
        assert_eq!(
            calculate_distribution_modulo_cycle_unsigned_24(),
            DISTRIBUTION_CYCLE_COUNT_MODULO_24
        );
    }

    #[test]
    #[ignore] // The test takes too long to be enabled by default
    fn test_find_longest_modulo_cycle_unsigned() {
        assert_eq!(
            find_longest_modulo_cycle_unsigned(24),
            (0x59999995, SLOWEST_MODULO_CYCLE_24)
        );
        assert_eq!(
            find_longest_modulo_cycle_unsigned(25),
            (0x5d555550, SLOWEST_MODULO_CYCLE_24)
        );
    }

    #[test]
    fn test_calculate_common_lead_range() {
        assert_eq!(calculate_common_lead_range(), COMMON_LEAD_RANGE);
    }

    #[test]
    fn test_calc_modulo_cycle_unsigned() {
        assert_eq!(calc_modulo_cycle_unsigned(0x4747745, 1), 868);
        assert_eq!(calc_modulo_cycle_signed(0x4747745, 1), 888);

        assert_eq!(
            calc_modulo_cycle_unsigned(0x59999995, 24),
            SLOWEST_MODULO_CYCLE_24
        );

        assert_eq!(
            calc_modulo_cycle_unsigned(0x5d555550, 25),
            SLOWEST_MODULO_CYCLE_24
        );

        assert_eq!(calc_modulo_cycle_unsigned(24, 25), FASTEST_MODULO_CYCLE_24);
        assert_eq!(calc_modulo_cycle_unsigned(25, 25), 126);

        assert_eq!(calc_modulo_cycle_unsigned(1140479406, 25), 767);
        assert_eq!(calc_modulo_cycle_unsigned(1141359974, 25), 836);
        assert_eq!(calc_modulo_cycle_unsigned(1270576878, 25), 777);
        assert_eq!(calc_modulo_cycle_unsigned(1355424535, 25), 767);
        assert_eq!(calc_modulo_cycle_unsigned(1584375516, 25), 807);
        assert_eq!(calc_modulo_cycle_unsigned(1708021406, 25), 776);
        assert_eq!(calc_modulo_cycle_unsigned(1749665817, 25), 754);
        assert_eq!(calc_modulo_cycle_unsigned(2081426142, 25), 804);
        assert_eq!(calc_modulo_cycle_unsigned(524763481, 25), 777);
        assert_eq!(calc_modulo_cycle_unsigned(927365657, 25), 735);

        assert_eq!(calc_modulo_cycle_unsigned(1455995688, 100), 799);
        assert_eq!(calc_modulo_cycle_unsigned(1969433148, 100), 783);
        assert_eq!(calc_modulo_cycle_unsigned(704919059, 100), 803);
        assert_eq!(calc_modulo_cycle_unsigned(1025776836, 100), 768);
        assert_eq!(calc_modulo_cycle_unsigned(765851278, 100), 762);
        assert_eq!(calc_modulo_cycle_unsigned(1609208851, 100), 774);
        assert_eq!(calc_modulo_cycle_unsigned(1915624704, 100), 729);

        assert_eq!(calc_modulo_cycle_unsigned(133070802, 44), 773);
        assert_eq!(calc_modulo_cycle_unsigned(2690473360, 91), 780);
        assert_eq!(calc_modulo_cycle_unsigned(517978802, 82), 777);
        assert_eq!(calc_modulo_cycle_unsigned(932746226, 64), 801);
        assert_eq!(calc_modulo_cycle_unsigned(1447158151, 94), 808);
        assert_eq!(calc_modulo_cycle_unsigned(1586160591, 81), 798);
        assert_eq!(calc_modulo_cycle_unsigned(2533948937, 55), 848);
    }

    #[test]
    fn test_calc_modulo_cycle_signed() {
        assert_eq!(calc_modulo_cycle_signed(1881135926, 25), 836);
        assert_eq!(calc_modulo_cycle_signed(375357918, 25), 792);
        assert_eq!(calc_modulo_cycle_signed(1413825380, 25), 801);
        assert_eq!(calc_modulo_cycle_signed(-118428064, 25), 781);
        assert_eq!(calc_modulo_cycle_signed(1657444058, 25), 827);
        assert_eq!(calc_modulo_cycle_signed(38557744, 25), 782);
        assert_eq!(calc_modulo_cycle_signed(-1372116835, 25), 762);

        assert_eq!(calc_modulo_cycle_signed(1321724843, 99), 811);
        assert_eq!(calc_modulo_cycle_signed(-974761848, 99), 782);
        assert_eq!(calc_modulo_cycle_signed(660664920, 99), 751);
        assert_eq!(calc_modulo_cycle_signed(1843514586, 99), 803);
        assert_eq!(calc_modulo_cycle_signed(-1436296528, 99), 777);
        assert_eq!(calc_modulo_cycle_signed(-432991421, 99), 785);

        assert_eq!(calc_modulo_cycle_signed(1403756501, 49), 812);
        assert_eq!(calc_modulo_cycle_signed(-493429862, 48), 802);
        assert_eq!(calc_modulo_cycle_signed(-1001956674, 33), 824);
        assert_eq!(calc_modulo_cycle_signed(-321103627, 36), 765);
        assert_eq!(calc_modulo_cycle_signed(904862469, 14), 874);
        assert_eq!(calc_modulo_cycle_signed(-357004509, 83), 769);
        assert_eq!(calc_modulo_cycle_signed(396388959, 21), 785);
        assert_eq!(calc_modulo_cycle_signed(-367289968, 12), 843);
        assert_eq!(calc_modulo_cycle_signed(771082162, 15), 857);
    }
}
