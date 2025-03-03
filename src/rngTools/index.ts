import type { CallRngTool } from "./worker";
import RngToolWorker from "./worker?worker";
import { wrap } from "comlink";

export const callRngTool = wrap<CallRngTool>(new RngToolWorker());
