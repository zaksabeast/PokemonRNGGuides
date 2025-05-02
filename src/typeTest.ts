import * as tst from "ts-toolbelt";

export const Fail = 0;
export const Pass = 1;
export type Equals<A, B> = tst.A.Equals<A, B>;

export const check = <A, B>(assertion: Equals<A, B>) => {
  return assertion;
};
