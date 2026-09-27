import { Flex } from "~/components";
import { FormCard, RadioField, type RadioOption } from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { ChatterFilterBase } from "./shared/chatterFilter";
import { HgssCallAdvanceFilter } from "./shared/hgssElmCalls/advanceFilter";
import { atom, useAtom } from "jotai";

type FilterMode = "chatot" | "elm";

const filterModeAtom = atom<FilterMode>("chatot");

export const StandaloneGen4AdvanceFilter = () => {
  const t = useActiveRouteTranslations();
  const [filterMode, setFilterMode] = useAtom(filterModeAtom);

  const filterModeOptions: RadioOption<FilterMode>[] = [
    { label: t["Chatot Pitches"], value: "chatot" },
    { label: t["Elm Calls"], value: "elm" },
  ];

  const filter =
    filterMode === "chatot" ? (
      <ChatterFilterBase
        mode="standalone"
        submitTrackerId="standalone_chatter_filter"
      />
    ) : (
      <HgssCallAdvanceFilter />
    );

  return (
    <Flex vertical gap={16}>
      <FormCard>
        <RadioField<FilterMode>
          label={t["Filter"]}
          cellSize="word"
          value={filterMode}
          options={filterModeOptions}
          onChange={setFilterMode}
        />
      </FormCard>
      {filter}
    </Flex>
  );
};
