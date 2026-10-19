import { uniqueId } from "lodash-es";
import { Button, ResultColumn, ShinyIcon } from "~/components";
import { Gen7Gift, type ShinyType } from "~/rngTools";
import {
  FlattenIvs,
  flattenIvs,
  getIvColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { formatHex } from "~/utils/formatHex";
import { Translations } from "~/translations";

export type GiftResult = FlattenIvs<Gen7Gift> & {
  key: string;
  gift: Gen7Gift;
};

export const mapGiftResult = (gift: Gen7Gift): GiftResult => ({
  ...flattenIvs(gift),
  key: uniqueId(),
  gift,
});

type GiftColumnsOpts = {
  selectTrackerId: string;
  selectedGift: Gen7Gift | null;
  onSelect: (result: GiftResult) => void;
};

export const getGiftColumns = (
  t: Translations,
  { selectTrackerId, selectedGift, onSelect }: GiftColumnsOpts,
): ResultColumn<GiftResult>[] => [
  {
    title: t["Select"],
    dataIndex: "key",
    disableVerticalPadding: true,
    render: (_, result) => (
      <Button
        trackerId={selectTrackerId}
        type={result.gift === selectedGift ? "primary" : "default"}
        onClick={() => onSelect(result)}
      >
        {t["Select"]}
      </Button>
    ),
  },
  { title: t["Target Advance"], dataIndex: "advance" },
  {
    title: t["Shiny"],
    dataIndex: "shiny",
    render: (shiny: ShinyType) => <ShinyIcon shiny={shiny} />,
  },
  { title: t["Nature"], dataIndex: "nature" },
  { title: t["Ability"], dataIndex: "ability" },
  { title: t["Gender"], dataIndex: "gender" },
  ...getIvColumns(t),
  { title: t["PSV"], dataIndex: "psv" },
  {
    title: t["PID"],
    dataIndex: "pid",
    monospace: true,
    render: (pid: number) => formatHex(pid),
  },
  {
    title: t["EC"],
    dataIndex: "ec",
    monospace: true,
    render: (ec: number) => formatHex(ec),
  },
];
