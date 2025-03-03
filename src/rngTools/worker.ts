// This is the only file where using rng_tools directly is okay
// eslint-disable-next-line no-restricted-imports
import * as rng_tools from "rng_tools";
import { expose } from "comlink";
import * as tst from "ts-toolbelt";

type RngToolModule = typeof rng_tools;
type RngToolName = tst.O.SelectKeys<RngToolModule, tst.F.Function>;

const callRngTool = <Name extends RngToolName>(
  name: Name,
  ...args: tst.F.Parameters<RngToolModule[Name]>
): tst.F.Return<RngToolModule[Name]> => {
  // @ts-expect-error - TS can't relate the name, args, and return value correctly,
  // but the types above should ensure that the call is valid.
  return rng_tools[name](...args);
};

export type CallRngTool = typeof callRngTool;

expose(callRngTool);
