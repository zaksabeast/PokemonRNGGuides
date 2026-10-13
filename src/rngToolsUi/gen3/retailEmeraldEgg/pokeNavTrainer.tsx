import { Skeleton } from "antd";
import { Flex } from "~/components";
import {
  FormCard,
  OutlinedButton,
  PrimaryButton,
  RadioField,
  SwitchField,
  SwitchGroup,
} from "~/components/form";
import {
  useRegisteredTrainers,
  usePokeNavGameLanguage,
  RegisteredPokeNavTrainers,
  PokeNavGameLanguage,
} from "./state";
import { pokeNavTrainers } from "./constants";
import { useHydrate } from "~/hooks/useHydrate";
import { hydrationLock } from "~/utils/hydration";
import { languageByKey } from "~/types/language";
import { usePokeNavTrainerTranslations } from "./trainerTranslations";
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
  const { translatedTrainers } = usePokeNavTrainerTranslations();
  const [lockedState, setRegisteredTrainers] = useRegisteredTrainers();
  const { hydrated, client } = useHydrate(lockedState);
  const [lockedGameLanguage, setGameLanguage] = usePokeNavGameLanguage();
  const { client: gameLanguageState } = useHydrate(lockedGameLanguage);

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
      <RadioField<PokeNavGameLanguage["gameLanguage"]>
        label={t["Game Language"]}
        cellSize="word"
        value={gameLanguageState?.gameLanguage ?? "default"}
        options={[
          { label: languageByKey[t.language].label, value: "default" },
          { label: "日本語", value: "ja" },
        ]}
        onChange={(gameLanguage) =>
          setGameLanguage(hydrationLock({ gameLanguage }))
        }
      />
      <Flex gap={12} wrap="wrap">
        <PrimaryButton
          trackerId="select_all_pokenav_trainers"
          onClick={handleSelectAll}
        >
          Select All
        </PrimaryButton>
        <OutlinedButton
          trackerId="deselect_all_pokenav_trainers"
          onClick={handleDeselectAll}
        >
          Deselect All
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
