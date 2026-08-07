import { FormikSelect, Flex, Button } from "~/components";
import { GenericForm } from "~/types/form";
import { Paths } from "~/types";
import { useHydrate } from "~/hooks/useHydrate";
import { HydrationLock } from "~/utils/hydration";
import { useAtom, Atom } from "jotai";
import { Gen4Profile } from "~/rngToolsUi/workbench/tools/profile/gen4/state";
import { Gen3Profile } from "~/rngToolsUi/workbench/tools/profile/gen3/state";
import { routeAtom } from "~/rngToolsUi/workbench/state";

type FormikProfileSelectProps<FormState extends GenericForm> = {
  name: Paths<FormState, string>;
  profileAtom: Atom<HydrationLock<(Gen4Profile | Gen3Profile)[]>>;
};

export const FormikProfileSelect = <FormState extends GenericForm>({
  name,
  profileAtom,
}: FormikProfileSelectProps<FormState>) => {
  const [, setRoute] = useAtom(routeAtom);
  const [lockedProfiles] = useAtom(profileAtom);
  const { hydrated, client: profiles } = useHydrate(lockedProfiles);

  return (
    <Flex gap={8}>
      <Flex vertical flex={1}>
        <FormikSelect<Record<string, string>, string>
          name={name}
          loading={!hydrated}
          options={
            hydrated
              ? profiles.map(({ id, name }) => ({
                  label: name,
                  value: id,
                }))
              : []
          }
        />
      </Flex>
      <Button trackerId="create_profile" onClick={() => setRoute("profile")}>
        Manage
      </Button>
    </Flex>
  );
};
