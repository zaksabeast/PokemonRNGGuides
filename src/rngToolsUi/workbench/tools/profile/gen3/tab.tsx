import {
  Descriptions,
  Field,
} from "~/rngToolsUi/workbench/components/descriptions";
import { uniqueId } from "lodash-es";
import { Skeleton } from "antd";
import {
  Button,
  ResultColumn,
  FormikInput,
  FormikNumberInput,
  FormikRadio,
  FormikSelect,
} from "~/components";
import { useWatch } from "~/hooks/form";
import { z } from "zod";
import { useAtom } from "jotai";
import { Gen3GameVersions } from "~/types/games";
import { useHydrate } from "~/hooks/useHydrate";
import { hydrationLock } from "~/utils/hydration";
import { toOptions } from "~/utils/options";
import { ToolLayout } from "~/rngToolsUi/workbench/layouts/tool";
import { gen3ProfilesAtom, Gen3ProfileSchema } from "./state";
import { pokeNavTrainers } from "~/rngToolsUi/gen3/retailEmeraldEgg/state";
import { usePokeNavTranslations } from "~/translations";

type FormState = z.infer<typeof Gen3ProfileSchema>;
type Result = FormState & { id: string };

const initialValues: FormState = {
  id: "",
  name: "",
  tid: 0,
  sid: 0,
  game: "Emerald",
  pokeNavTrainers: [],
};

const FilterFields = () => {
  const translatedTrainers = usePokeNavTranslations("en");
  const { game } = useWatch({
    validationSchema: Gen3ProfileSchema,
    names: { game: true },
  });

  const fields: Field[] = [
    { label: "Profile Name", children: <FormikInput<FormState> name="name" /> },
    {
      label: "TID",
      children: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
    },
    {
      label: "SID",
      children: <FormikNumberInput<FormState> name="sid" numType="decimal" />,
    },
    {
      label: "Game",
      children: (
        <FormikRadio<FormState>
          name="game"
          options={toOptions(Gen3GameVersions)}
        />
      ),
    },
    {
      label: "PokeNav Trainers",
      show: game === "Emerald",
      children: (
        <FormikSelect<FormState, "pokeNavTrainers">
          selectAllNoneButtons
          mode="multiple"
          name="pokeNavTrainers"
          options={toOptions(
            pokeNavTrainers,
            (trainer) => translatedTrainers.withTitle[trainer],
          )}
        />
      ),
    },
  ];

  return <Descriptions bordered column={1} items={fields} />;
};

export const Gen3ProfileTool = () => {
  const [lockedProfiles, setProfiles] = useAtom(gen3ProfilesAtom);
  const { hydrated, client: profiles } = useHydrate(lockedProfiles);

  if (!hydrated) {
    return <Skeleton />;
  }

  const columns: ResultColumn<Result>[] = [
    {
      dataIndex: "name",
      title: "Profile Name",
    },
    {
      dataIndex: "tid",
      title: "TID",
    },
    {
      dataIndex: "sid",
      title: "SID",
    },
    {
      dataIndex: "game",
      title: "Game",
    },
    {
      dataIndex: "id",
      title: "Delete",
      render: (id) => {
        return (
          <Button
            trackerId="delete_gen3_profile"
            onClick={() =>
              setProfiles(
                hydrationLock(profiles.filter((profile) => profile.id !== id)),
              )
            }
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const onSubmit = async (opts: FormState) => {
    const formattedOpts = {
      ...opts,
      pokeNavTrainers: opts.game === "Emerald" ? opts.pokeNavTrainers : [],
    };
    setProfiles(
      hydrationLock([...profiles, { ...formattedOpts, id: uniqueId() }]),
    );
  };

  return (
    <ToolLayout<FormState, Result>
      initialValues={initialValues}
      validationSchema={Gen3ProfileSchema}
      loading={false}
      results={profiles}
      columns={columns}
      progressPercent={null}
      onSubmit={onSubmit}
      slots={{
        rngInfoFields: <FilterFields />,
        rngInfoActions: (
          <Button htmlType="submit" trackerId="add_gen3_profile">
            Add Profile
          </Button>
        ),
      }}
    />
  );
};
