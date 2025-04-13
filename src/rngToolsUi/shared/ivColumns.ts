import * as tst from "ts-toolbelt";
import { Ivs } from "~/rngTools";

export const ivColumns = [
  { title: "HP", dataIndex: "hp", key: "hp" },
  { title: "Atk", dataIndex: "atk", key: "atk" },
  { title: "Def", dataIndex: "def", key: "def" },
  { title: "SpA", dataIndex: "spa", key: "spa" },
  { title: "SpD", dataIndex: "spd", key: "spd" },
  { title: "Spe", dataIndex: "spe", key: "spe" },
] as const;

export type FlattenIvs<T extends { ivs: Ivs }> = tst.O.Merge<
  tst.O.Omit<T, "ivs">,
  Ivs
>;

export const flattenIvs = <T extends { ivs: Ivs }>({ ivs, ...obj }: T) => {
  // tst.O.Omit has more accurate types than TS's Omit, so they aren't equal,
  // but this should be a safe cast.
  return { ...obj, ...ivs } as FlattenIvs<T>;
};
