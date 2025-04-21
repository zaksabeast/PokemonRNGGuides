import * as tst from "ts-toolbelt";

export type OneOf<T extends Record<string, unknown>> = tst.O.Either<
  T,
  tst.O.RequiredKeys<T>
>;

export type AllOrNone<T extends Record<string, unknown>> =
  | T
  | { [key in keyof T]?: undefined };

export type FeatureConfig<
  Feature extends string,
  Config extends Record<string, unknown>,
> =
  | tst.O.Merge<Config, { [key in Feature]: true }>
  | tst.O.Merge<
      { [key in keyof Config]?: undefined },
      { [key in Feature]?: false }
    >;

type AddNullToType<T> = undefined extends T
  ? tst.U.Exclude<T, undefined> | null
  : T;

export type AddNull<T> = T extends tst.O.Object
  ? {
      [K in keyof T]: AddNull<T[K]>;
    }
  : AddNullToType<T>;

export type AddNullToList<T extends tst.L.List> = {
  [K in keyof T]: AddNull<T[K]>;
};
