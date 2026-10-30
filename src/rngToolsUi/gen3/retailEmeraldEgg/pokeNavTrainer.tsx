import React from "react";
import { Skeleton } from "antd";
import { Flex } from "~/components";
import {
  FormCard,
  OutlinedButton,
  PrimaryButton,
  SelectField,
  SwitchField,
  SwitchGroup,
} from "~/components/form";
import {
  useRegisteredTrainers,
  usePokeNavGameLanguage,
  RegisteredPokeNavTrainers,
} from "./state";
import { pokeNavTrainers } from "./constants";
import { EmeraldLang } from "~/rngTools";
import { useHydrate } from "~/hooks/useHydrate";
import { hydrationLock } from "~/utils/hydration";
import {
  gameLanguageOptions,
  getGuideGameLanguage,
  usePokeNavTrainerTranslations,
} from "./trainerTranslations";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";

type UpdateStateProps = {
  prev: RegisteredPokeNavTrainers;
  checked: boolean;
  trainer: RegisteredPokeNavTrainers["registeredTrainers"][number];
};

const updateTrainerState = ({
  prev,
  checked,
  trainer,
}: UpdateStateProps): RegisteredPokeNavTrainers => {
  return {
    registeredTrainers: checked
      ? [...prev.registeredTrainers, trainer]
      : prev.registeredTrainers.filter(
          (registeredTrainer) => registeredTrainer !== trainer,
        ),
  };
};

export const PokeNavInput = () => {
  const t = useActiveRouteTranslations();
  const { translatedTrainers, language: gameLanguage } =
    usePokeNavTrainerTranslations();
  const [lockedState, setRegisteredTrainers] = useRegisteredTrainers();
  const { hydrated, client } = useHydrate(lockedState);
  const [, setGameLanguage] = usePokeNavGameLanguage();

  const handleSelectAll = () =>
    setRegisteredTrainers(
      hydrationLock({
        registeredTrainers: pokeNavTrainers,
      }),
    );

  const handleDeselectAll = () =>
    setRegisteredTrainers(
      hydrationLock({
        registeredTrainers: [],
      }),
    );

  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <FormCard>
      <SelectField<EmeraldLang>
        label={t["Game Language"]}
        value={gameLanguage}
        options={gameLanguageOptions}
        onChange={(gameLanguage) =>
          // A transition keeps the current names shown while the new language loads
          React.startTransition(() =>
            setGameLanguage(
              hydrationLock({
                // Picking the guide's language goes back to following the guide
                gameLanguage:
                  gameLanguage === getGuideGameLanguage(t.language)
                    ? "default"
                    : gameLanguage,
              }),
            ),
          )
        }
      />
      <Flex gap={12} wrap="wrap">
        <PrimaryButton
          trackerId="select_all_pokenav_trainers"
          onClick={handleSelectAll}
        >
          {t["Select All"]}
        </PrimaryButton>
        <OutlinedButton
          trackerId="deselect_all_pokenav_trainers"
          onClick={handleDeselectAll}
        >
          {t["Deselect All"]}
        </OutlinedButton>
      </Flex>
      <SwitchGroup>
        {pokeNavTrainers.map((trainer) => (
          <SwitchField
            key={trainer}
            name={`${trainer}-switch`}
            label={translatedTrainers.withTitle[trainer]}
            value={client.registeredTrainers.includes(trainer)}
            onChange={(checked) =>
              setRegisteredTrainers(
                hydrationLock(
                  updateTrainerState({ prev: client, checked, trainer }),
                ),
              )
            }
          />
        ))}
      </SwitchGroup>
    </FormCard>
  );
};
