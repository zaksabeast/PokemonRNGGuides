import React from "react";
import { Skeleton } from "antd";
import { Button, Switch, Flex, Typography, List, ListItem } from "~/components";
import {
  pokeNavTrainers,
  useRegisteredTrainers,
  RegisteredPokeNavTrainers,
} from "./state";
import styled from "@emotion/styled";
import { useHydrate } from "~/hooks/useHydrate";
import { hydrationLock } from "~/utils/hydration";
import { usePokeNavTranslations } from "~/translations";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";

const Label = styled.label({
  display: "flex",
  flex: 1,
  gap: 32,
  justifyContent: "space-between",
  cursor: "pointer",
  userSelect: "none",
});

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
  const translatedTrainers = usePokeNavTranslations(t.language);
  const [lockedState, setRegisteredTrainers] = useRegisteredTrainers();
  const { hydrated, client } = useHydrate(lockedState);

  const handleSelectAll = React.useCallback(
    () =>
      setRegisteredTrainers(
        hydrationLock({
          registeredTrainers: pokeNavTrainers,
        }),
      ),
    [setRegisteredTrainers],
  );

  const handleDeselectAll = React.useCallback(
    () =>
      setRegisteredTrainers(
        hydrationLock({
          registeredTrainers: [],
        }),
      ),
    [setRegisteredTrainers],
  );

  if (!hydrated) {
    return <Skeleton />;
  }

  const fields = pokeNavTrainers.map((trainer) => (
    <ListItem key={trainer}>
      <Label>
        <Typography.Text strong>
          {translatedTrainers.withTitle[trainer]}
        </Typography.Text>
        <Switch
          id={`${trainer}-switch`}
          checked={client.registeredTrainers.includes(trainer)}
          onChange={(checked) =>
            setRegisteredTrainers(
              hydrationLock(
                updateTrainerState({ prev: client, checked, trainer }),
              ),
            )
          }
        />
      </Label>
    </ListItem>
  ));

  return (
    <Flex vertical align="center" gap={24}>
      <Flex gap={8} justify="space-between">
        <Button
          trackerId="select_all_pokenav_trainers"
          type="primary"
          onClick={handleSelectAll}
        >
          Select All
        </Button>
        <Button
          trackerId="deselect_all_pokenav_trainers"
          onClick={handleDeselectAll}
        >
          Deselect All
        </Button>
      </Flex>
      <List>{fields}</List>
    </Flex>
  );
};
