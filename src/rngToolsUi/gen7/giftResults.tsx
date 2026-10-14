import { uniqueId } from "lodash-es";
import { Button, ResultColumn } from "~/components";
import { AbilityType, Gen7Gift } from "~/rngTools";
import {
  FlattenIvs,
  flattenIvs,
  getIvColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { formatHex } from "~/utils/formatHex";
import { Translations } from "~/translations";

export type GiftAbilityNames = Record<AbilityType, string | null>;

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
  // The ability column is shown when set. Null shows the ability slots.
  abilityNames?: GiftAbilityNames | null;
};

export const getGiftColumns = (
  t: Translations,
  { selectTrackerId, selectedGift, onSelect, abilityNames }: GiftColumnsOpts,
): ResultColumn<GiftResult>[] => {
  const abilityColumns: ResultColumn<GiftResult>[] =
    abilityNames === undefined
      ? []
      : [
          {
            title: t["Ability"],
            dataIndex: "ability",
            render: (ability: AbilityType) =>
              abilityNames?.[ability] ?? ability,
          },
        ];

  return [
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
      render: (shiny: boolean) => (shiny ? t["Yes"] : t["No"]),
    },
    { title: t["Nature"], dataIndex: "nature" },
    ...abilityColumns,
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
};
