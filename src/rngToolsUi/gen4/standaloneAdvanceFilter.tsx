import { Flex } from "~/components";
import { FormCard, RadioField, type RadioOption } from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { ChatterFilterBase } from "./shared/chatterFilter";
import { HgssElmCallAdvanceFilterBase } from "./shared/hgssElmCalls/advanceFilter";
import { gen4TargetAtom } from "./shared/state/target";
import { atom, useAtom, useAtomValue } from "jotai";

type FilterMode = "chatot" | "elm";

const filterModeAtom = atom<FilterMode>("chatot");

export const StandaloneGen4AdvanceFilter = () => {
  const t = useActiveRouteTranslations();
  const [filterMode, setFilterMode] = useAtom(filterModeAtom);
  const target = useAtomValue(gen4TargetAtom);

  const filterModeOptions: RadioOption<FilterMode>[] = [
    { label: t["Chatot Pitches"], value: "chatot" },
    { label: t["Pokégear Calls"], value: "elm" },
  ];

  const filter =
    filterMode === "chatot" ? (
      <ChatterFilterBase
        mode="standalone"
        submitTrackerId="standalone_chatter_filter"
      />
    ) : (
      <HgssElmCallAdvanceFilterBase
        seed={target?.seedTime.seed}
        targetAdvance={target?.mtAdvance}
        mode="standalone"
        submitTrackerId="elm_call_advance_filter_generate"
      />
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
