import { useAtom } from "jotai";
import { type HoneyTreeLocation } from "~/rngTools";
import {
  FormCard,
  FormSection,
  SelectField,
  SwitchField,
  SwitchGroup,
} from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { toOptions } from "~/utils/options";
import { honeyTreeAtom, type HoneyTreeState } from "./state";
import { HONEY_TREE_LOCATIONS } from "./constants";

type HoneyTreeMapSettings = HoneyTreeState["honeyTreeMap"];

export const HoneyTreeTargetTree = () => {
  const t = useActiveRouteTranslations();
  const [state, setState] = useAtom(honeyTreeAtom);

  const setMapSetting = (settings: Partial<HoneyTreeMapSettings>) =>
    setState((prev) => ({
      ...prev,
      honeyTreeMap: { ...prev.honeyTreeMap, ...settings },
    }));

  return (
    <FormCard>
      <FormSection>
        <SwitchGroup>
          <SwitchField
            label="Show Trees"
            value={state.honeyTreeMap.showTrees}
            onChange={(showTrees) => setMapSetting({ showTrees })}
          />
          <SwitchField
            label="Show Recommended"
            value={state.honeyTreeMap.showRecommended}
            onChange={(showRecommended) => setMapSetting({ showRecommended })}
          />
          <SwitchField
            label="Show Munchlax"
            value={state.honeyTreeMap.showMunchlax}
            onChange={(showMunchlax) => setMapSetting({ showMunchlax })}
          />
        </SwitchGroup>
        <SelectField<HoneyTreeLocation>
          label={t["Target Tree"]}
          value={state.targetLocation}
          options={toOptions(HONEY_TREE_LOCATIONS, (location) => t[location])}
          onChange={(targetLocation) =>
            setState((prev) => ({ ...prev, targetLocation }))
          }
        />
      </FormSection>
    </FormCard>
  );
};
