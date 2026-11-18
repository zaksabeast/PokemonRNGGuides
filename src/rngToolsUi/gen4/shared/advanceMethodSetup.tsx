import { useAtomValue, useSetAtom } from "jotai";
import { FormCard, FormSection, RadioField } from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import {
  gen4SetupAtom,
  setHgssAdvanceMethodAtom,
  type Gen4AdvanceMethod,
} from "./state/setup";

export const Gen4AdvanceMethodSetup = () => {
  const t = useActiveRouteTranslations();
  const setup = useAtomValue(gen4SetupAtom);
  const setAdvanceMethod = useSetAtom(setHgssAdvanceMethodAtom);

  if (setup.group !== "hgss") {
    return null;
  }

  const advanceMethodOptions: { label: string; value: Gen4AdvanceMethod }[] = [
    { label: t["Pokégear Calls"], value: "pokegearCall" },
    { label: t["Chatot"], value: "chatot" },
  ];

  return (
    <FormCard>
      <FormSection>
        <RadioField<Gen4AdvanceMethod>
          label={t["Advance Method"]}
          cellSize="word"
          value={setup.advanceMethod}
          options={advanceMethodOptions}
          onChange={setAdvanceMethod}
        />
      </FormSection>
    </FormCard>
  );
};
