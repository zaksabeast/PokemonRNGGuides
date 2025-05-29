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

type UndefinedToNullForType<T> = undefined extends T
  ? tst.U.Exclude<T, undefined> | null
  : T;

export type UndefinedToNull<T> = T extends tst.O.Object
  ? {
      [K in keyof T]: UndefinedToNull<T[K]>;
    }
  : UndefinedToNullForType<T>;

export type UndefinedToNullForList<T extends tst.L.List> = {
  [K in keyof T]: UndefinedToNull<T[K]>;
};

export type Nullable<T> = T extends tst.O.Object
  ? { [key in keyof T]: T[key] | null }
  : T | null;
