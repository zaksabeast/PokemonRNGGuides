import { useAtomValue, useSetAtom } from "jotai";
import {
  FormCard,
  FormSection,
  SelectField,
  type SelectOption,
} from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import type { JohtoRoamerRoute, KantoRoamerRoute } from "~/rngTools";
import type { Translations } from "~/translations";
import { gen4SetupAtom, setGen4RoamersAtom } from "./state/setup";
import { johtoRoamerRoutes, kantoRoamerRoutes } from "./roamerRoutes";

const getRouteOptions = <Route extends JohtoRoamerRoute | KantoRoamerRoute>(
  t: Translations,
  routes: Route[],
): SelectOption<Route | null>[] => {
  return [
    { label: t["Not roaming"], value: null, muted: true },
    ...routes.map((route) => ({ label: t[route], value: route })),
  ];
};

export const Gen4RoamerSetup = () => {
  const t = useActiveRouteTranslations();
  const setup = useAtomValue(gen4SetupAtom);
  const setRoamers = useSetAtom(setGen4RoamersAtom);

  if (setup.group !== "hgss") {
    return null;
  }

  const { roamers } = setup;
  const johtoOptions = getRouteOptions(t, johtoRoamerRoutes);
  const kantoOptions = getRouteOptions(t, kantoRoamerRoutes);

  return (
    <FormCard>
      <FormSection title={t["Roamers"]}>
        <SelectField<JohtoRoamerRoute | null>
          label={t["Raikou"]}
          value={roamers.raikou ?? null}
          options={johtoOptions}
          onChange={(raikou) => setRoamers({ raikou: raikou ?? undefined })}
        />
        <SelectField<JohtoRoamerRoute | null>
          label={t["Entei"]}
          value={roamers.entei ?? null}
          options={johtoOptions}
          onChange={(entei) => setRoamers({ entei: entei ?? undefined })}
        />
        <SelectField<KantoRoamerRoute | null>
          label={t["Latias/Latios"]}
          value={roamers.lati ?? null}
          options={kantoOptions}
          onChange={(lati) => setRoamers({ lati: lati ?? undefined })}
        />
      </FormSection>
    </FormCard>
  );
};
