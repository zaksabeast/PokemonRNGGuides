import {
  Flex,
  Field,
  FormFieldTable,
  AtomSelect,
  AtomRadio,
} from "~/components";
import { profile5SearcherAtom } from "./state";
import { Translations } from "~/translations";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { DS_TYPE, GEN5_GAMES, GEN5_LANGUAGE } from "../constants";
import { toOptions } from "~/utils/options";

const getFields = (t: Translations): Field[] => [
  {
    label: t["Game"],
    input: (
      <AtomSelect
        atom={profile5SearcherAtom}
        options={GEN5_GAMES}
        getValue={(state) => state.game}
        nextState={(prev, game) => ({ ...prev, game })}
      />
    ),
  },
  {
    label: t["Language"],
    input: (
      <AtomSelect
        atom={profile5SearcherAtom}
        options={GEN5_LANGUAGE}
        getValue={(state) => state.language}
        nextState={(prev, language) => ({ ...prev, language })}
      />
    ),
  },
  {
    label: t["DS Type"],
    input: (
      <AtomRadio
        atom={profile5SearcherAtom}
        options={toOptions(DS_TYPE)}
        getValue={(state) => state.dsType}
        nextState={(prev, dsType) => ({ ...prev, dsType })}
      />
    ),
  },
  {
    label: "Calibration",
    input: (
      <AtomRadio
        atom={profile5SearcherAtom}
        options={
          [
            { label: "IV", value: "ivs" },
            { label: "Needle", value: "needles" },
            { label: "Seed", value: "seed" },
          ] as const
        }
        getValue={(state) => state.calibrationType}
        nextState={(prev, calibrationType) => ({ ...prev, calibrationType })}
      />
    ),
  },
];

export const Profile5Setup = () => {
  const t = useActiveRouteTranslations();
  const fields = getFields(t);
  return (
    <Flex vertical gap={8}>
      <FormFieldTable fields={fields} />
    </Flex>
  );
};
