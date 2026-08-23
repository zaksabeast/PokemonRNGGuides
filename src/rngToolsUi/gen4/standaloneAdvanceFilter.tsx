import { Flex, AtomRadio } from "~/components";
import { ChatterFilterBase } from "./shared/chatterFilter";
import { HgssCallAdvanceFilter } from "./shared/hgssElmCalls/advanceFilter";
import { atom, useAtom } from "jotai";

type FilterMode = "chatot" | "elm";

const filterModeAtom = atom<FilterMode>("chatot");

export const StandaloneGen4AdvanceFilter = () => {
  const [filterMode] = useAtom(filterModeAtom);

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
      <AtomRadio
        atom={filterModeAtom}
        getValue={(state) => state}
        nextState={(_, value) => value}
        options={[
          { label: "Chatot Pitches", value: "chatot" as const },
          { label: "Elm Calls", value: "elm" as const },
        ]}
      />
      {filter}
    </Flex>
  );
};
