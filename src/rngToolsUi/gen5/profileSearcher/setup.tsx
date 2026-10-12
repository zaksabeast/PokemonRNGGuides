import {
  FormCard,
  FormSection,
  RadioField,
  SelectField,
  type RadioOption,
} from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { toOptions } from "~/utils/options";
import {
  DS_TYPE,
  DsType,
  GEN5_GAMES,
  GEN5_LANGUAGE,
  Gen5Game,
  Gen5Language,
} from "../constants";
import { Profile5SearcherState, useProfile5State } from "./state";

type CalibrationType = Profile5SearcherState["calibrationType"];

export const Profile5Setup = () => {
  const t = useActiveRouteTranslations();
  const [state, setState] = useProfile5State();

  const calibrationOptions: RadioOption<CalibrationType>[] = [
    { label: t["IV"], value: "ivs" },
    { label: t["Needle"], value: "needles" },
    { label: t["Seed"], value: "seed" },
  ];

  return (
    <FormCard>
      <FormSection>
        <SelectField<Gen5Game>
          label={t["Game"]}
          value={state.game}
          options={toOptions(GEN5_GAMES, (game) => t[game])}
          onChange={(game) => setState((prev) => ({ ...prev, game }))}
        />
        <SelectField<Gen5Language>
          label={t["Language"]}
          value={state.language}
          options={toOptions(GEN5_LANGUAGE, (language) => t[language])}
          onChange={(language) => setState((prev) => ({ ...prev, language }))}
        />
        <RadioField<DsType>
          label={t["DS Type"]}
          cellSize="word"
          value={state.dsType}
          options={toOptions(DS_TYPE, (dsType) => t[dsType])}
          onChange={(dsType) => setState((prev) => ({ ...prev, dsType }))}
        />
        <RadioField<CalibrationType>
          label={t["Calibration"]}
          cellSize="word"
          value={state.calibrationType}
          options={calibrationOptions}
          onChange={(calibrationType) =>
            setState((prev) => ({ ...prev, calibrationType }))
          }
        />
      </FormSection>
    </FormCard>
  );
};
