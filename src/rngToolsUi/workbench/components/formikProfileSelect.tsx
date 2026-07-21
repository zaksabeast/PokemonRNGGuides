import { FormikSelect, Flex, Button } from "~/components";
import { GenericForm } from "~/types/form";
import { Paths } from "~/types";
import { useHydrate } from "~/hooks/useHydrate";
import { useAtom } from "jotai";
import { gen4ProfilesAtom } from "~/rngToolsUi/workbench/tools/profile/state";
import { routeAtom } from "~/rngToolsUi/workbench/state";

type FormikProfileSelectProps<FormState extends GenericForm> = {
  name: Paths<FormState, string>;
};

export const FormikProfileSelect = <FormState extends GenericForm>({
  name,
}: FormikProfileSelectProps<FormState>) => {
  const [, setRoute] = useAtom(routeAtom);
  const [lockedProfiles] = useAtom(gen4ProfilesAtom);
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
