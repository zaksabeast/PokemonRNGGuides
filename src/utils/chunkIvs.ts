import { Ivs } from "~/rngTools";

export const chunkIvs = (minIvs: Ivs, maxIvs: Ivs): [Ivs, Ivs][] => {
  const ivs: [Ivs, Ivs][] = [];
  for (let hp = minIvs.hp; hp <= maxIvs.hp; hp += 10) {
    for (let atk = minIvs.atk; atk <= maxIvs.atk; atk += 10) {
      for (let def = minIvs.def; def <= maxIvs.def; def += 10) {
        for (let spa = minIvs.spa; spa <= maxIvs.spa; spa += 10) {
          for (let spd = minIvs.spd; spd <= maxIvs.spd; spd += 10) {
            for (let spe = minIvs.spe; spe <= maxIvs.spe; spe += 10) {
              ivs.push([
                { hp, atk, def, spa, spd, spe },
                {
                  hp: Math.min(maxIvs.hp, hp + 9),
                  atk: Math.min(maxIvs.atk, atk + 9),
                  def: Math.min(maxIvs.def, def + 9),
                  spa: Math.min(maxIvs.spa, spa + 9),
                  spd: Math.min(maxIvs.spd, spd + 9),
                  spe: Math.min(maxIvs.spe, spe + 9),
                },
              ]);
            }
          }
        }
      }
    }
  }
  return ivs;
};
