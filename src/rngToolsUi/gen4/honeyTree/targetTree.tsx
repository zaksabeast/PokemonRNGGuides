import { Flex, AtomSelect, Field, FormFieldTable } from "~/components";
import { Translations } from "~/translations";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { honeyTreeAtom } from "./state";
import { HONEY_TREE_LOCATIONS } from "./constants";
import { AtomSwitch } from "~/components/switch";

const getFields = (t: Translations): Field[] => [
  {
    label: "Show Trees",
    input: (
      <AtomSwitch
        atom={honeyTreeAtom}
        getValue={(atom) => atom.honeyTreeMap.showTrees}
        nextState={(state, showTrees) => ({
          ...state,
          honeyTreeMap: { ...state.honeyTreeMap, showTrees },
        })}
      />
    ),
  },
  {
    label: "Show Recommended",
    input: (
      <AtomSwitch
        atom={honeyTreeAtom}
        getValue={(atom) => atom.honeyTreeMap.showRecommended}
        nextState={(state, showRecommended) => ({
          ...state,
          honeyTreeMap: { ...state.honeyTreeMap, showRecommended },
        })}
      />
    ),
  },
  {
    label: "Show Munchlax",
    input: (
      <AtomSwitch
        atom={honeyTreeAtom}
        getValue={(atom) => atom.honeyTreeMap.showMunchlax}
        nextState={(state, showMunchlax) => ({
          ...state,
          honeyTreeMap: { ...state.honeyTreeMap, showMunchlax },
        })}
      />
    ),
  },
  {
    label: t["Target Tree"],
    input: (
      <AtomSelect
        atom={honeyTreeAtom}
        getValue={(atom) => atom.targetLocation}
        nextState={(state, targetLocation) => ({ ...state, targetLocation })}
        options={HONEY_TREE_LOCATIONS}
      />
    ),
  },
];

export const HoneyTreeTargetTree = () => {
  const t = useActiveRouteTranslations();
  return (
    <Flex vertical gap={4}>
      <FormFieldTable fields={getFields(t)} />
    </Flex>
  );
};
