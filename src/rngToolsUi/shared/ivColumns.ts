import * as tst from "ts-toolbelt";
import { ResultColumn } from "~/components";
import { Ivs } from "~/rngTools";

export type FlattenIvs<T extends { ivs: Ivs }> = tst.O.Merge<
  tst.O.Omit<T, "ivs">,
  Ivs
>;

export const ivColumns = [
  { title: "HP", dataIndex: "hp" },
  { title: "Atk", dataIndex: "atk" },
  { title: "Def", dataIndex: "def" },
  { title: "SpA", dataIndex: "spa" },
  { title: "SpD", dataIndex: "spd" },
  { title: "Spe", dataIndex: "spe" },
] as const satisfies ResultColumn<Ivs>[];

export const flattenIvs = <T extends { ivs: Ivs }>({ ivs, ...obj }: T) => {
  // tst.O.Omit has more accurate types than TS's Omit, so they aren't equal,
  // but this should be a safe cast.
  return { ...obj, ...ivs } as FlattenIvs<T>;
};
