const POKERNG_JUMP_TABLE = [
  [0x41c64e6dn, 0x6073n],
  [0xc2a29a69n, 0xe97e7b6an],
  [0xee067f11n, 0x31b0dde4n],
  [0xcfdddf21n, 0x67dbb608n],
  [0x5f748241n, 0xcba72510n],
  [0x8b2e1481n, 0x1d29ae20n],
  [0x76006901n, 0xba84ec40n],
  [0x1711d201n, 0x79f01880n],
  [0xbe67a401n, 0x8793100n],
  [0xdddf4801n, 0x6b566200n],
  [0x3ffe9001n, 0x803cc400n],
  [0x90fd2001n, 0xa6b98800n],
  [0x65fa4001n, 0xe6731000n],
  [0xdbf48001n, 0x30e62000n],
  [0xf7e90001n, 0xf1cc4000n],
  [0xefd20001n, 0x23988000n],
  [0xdfa40001n, 0x47310000n],
  [0xbf480001n, 0x8e620000n],
  [0x7e900001n, 0x1cc40000n],
  [0xfd200001n, 0x39880000n],
  [0xfa400001n, 0x73100000n],
  [0xf4800001n, 0xe6200000n],
  [0xe9000001n, 0xcc400000n],
  [0xd2000001n, 0x98800000n],
  [0xa4000001n, 0x31000000n],
  [0x48000001n, 0x62000000n],
  [0x90000001n, 0xc4000000n],
  [0x20000001n, 0x88000000n],
  [0x40000001n, 0x10000000n],
  [0x80000001n, 0x20000000n],
  [0x1n, 0x40000000n],
  [0x1n, 0x80000000n],
];

const UINT32_MAX = 4294967296n;

export const lcrng_distance = (start_num: number, end_num: number) => {
  let start = BigInt(start_num);
  const end = BigInt(end_num);

  let count = 0n;
  let mask = 1n;

  for (const [mult, add] of POKERNG_JUMP_TABLE) {
    if (start === end) {
      break;
    }

    if (((start ^ end) & mask) !== 0n) {
      start = (start * mult + add) % UINT32_MAX;
      count += mask;
    }
    mask <<= 1n;
  }

  return Number(count);
};

export const pokerng_with_jump = (seed_num: number, advances_num: number) => {
  let seed = BigInt(seed_num);
  let advances = BigInt(advances_num);

  for (const [mult, add] of POKERNG_JUMP_TABLE) {
    if ((advances & 1n) !== 0n) {
      seed = (seed * mult + add) % UINT32_MAX;
    }
    advances >>= 1n;
    if (advances === 0n) {
      break;
    }
  }

  return Number(seed);
};
