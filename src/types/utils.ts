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

// Limit index depth to prevent excessive recursion
export type Paths<
  Obj extends tst.O.Object,
  // It's fine to use any here since we are looking for paths that match a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Type = any,
  Index extends number = 5,
> =
  tst.N.GreaterEq<Index, 0> extends 1
    ? {
        [K in keyof Obj]: K extends string
          ? Obj[K] extends tst.L.List
            ? Obj[K] extends Type
              ? K
              : never
            : Obj[K] extends tst.O.Object
              ? `${K}.${Paths<Obj[K], Type, tst.N.Sub<Index, 1>>}`
              : Obj[K] extends Type
                ? K
                : never
          : never;
      }[keyof Obj]
    : never;

type SinglePath<Obj extends tst.O.Object, P extends string> = tst.O.Path<
  Obj,
  tst.S.Split<P, ".">
>;

type _Path<
  Obj extends tst.O.Object,
  InList extends tst.L.List<string>,
  OutList extends tst.L.List = [],
> = InList extends [infer Head, ...infer Tail]
  ? Head extends string
    ? Tail extends tst.L.List<string>
      ? _Path<Obj, Tail, [...OutList, SinglePath<Obj, Head>]>
      : never
    : never
  : OutList;

export type Path<Obj extends tst.O.Object, P extends string> = tst.L.UnionOf<
  _Path<Obj, tst.U.ListOf<P>>
>;
