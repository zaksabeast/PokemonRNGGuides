import { ResultColumn } from "~/components";
import { Profile5SearchResult } from "~/rngTools";
import { formatHex } from "~/utils/formatHex";

type Result = Profile5SearchResult & { id: string };

export const profile5Columns: ResultColumn<Result>[] = [
  {
    title: "Seed",
    dataIndex: "seed",
    render: (seed) => formatHex(BigInt(seed), 8),
  },
  {
    title: "Timer0",
    dataIndex: "timer0",
    render: (timer0) => formatHex(timer0, 0),
  },
  {
    title: "VCount",
    dataIndex: "vcount",
    render: (vcount) => formatHex(vcount, 0),
  },
  {
    title: "VFrame",
    dataIndex: "vframe",
    render: (vframe) => formatHex(vframe, 0),
  },
  {
    title: "GxStat",
    dataIndex: "gx_stat",
    render: (gx_stat) => formatHex(gx_stat, 0),
  },
  {
    title: "Seconds",
    dataIndex: "second",
  },
];
