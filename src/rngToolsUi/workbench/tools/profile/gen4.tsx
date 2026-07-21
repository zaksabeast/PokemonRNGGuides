import { Descriptions } from "~/rngToolsUi/workbench/components/descriptions";
import { uniqueId } from "lodash-es";
import { Skeleton } from "antd";
import {
  Button,
  ResultColumn,
  Field,
  FormikInput,
  FormikNumberInput,
  FormikRadio,
  FormikSwitch,
} from "~/components";
import { z } from "zod";
import { useAtom } from "jotai";
import { Gen4GameVersions } from "~/rngToolsUi/gen4/gen4types";
import { useHydrate } from "~/hooks/useHydrate";
import { hydrationLock } from "~/utils/hydration";
import { toOptions } from "~/utils/options";
import { ToolLayout } from "~/rngToolsUi/workbench/layouts/tool";
import { gen4ProfilesAtom, Gen4ProfileSchema } from "./state";

type FormState = z.infer<typeof Gen4ProfileSchema>;
type Result = FormState & { id: string };

const initialValues: FormState = {
  id: "",
  name: "",
  tid: 0,
  sid: 0,
  game: "Diamond",
  nationalDex: false,
};

const FilterFields = () => {
  const fields: Field[] = [
    { label: "Profile Name", input: <FormikInput<FormState> name="name" /> },
    {
      label: "TID",
      input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
    },
    {
      label: "SID",
      input: <FormikNumberInput<FormState> name="sid" numType="decimal" />,
    },
    {
      label: "Game",
      input: (
        <FormikRadio<FormState>
          name="game"
          options={toOptions(Gen4GameVersions)}
        />
      ),
    },
    {
      label: "National Dex",
      input: <FormikSwitch<FormState> name="nationalDex" />,
    },
  ].map((field) => ({ ...field, children: field.input }));

  return <Descriptions bordered column={1} items={fields} />;
};

export const Gen4ProfileTool = () => {
  const [lockedProfiles, setProfiles] = useAtom(gen4ProfilesAtom);
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
      dataIndex: "nationalDex",
      title: "National Dex",
      render: (value) => (value ? "Yes" : "No"),
    },
    {
      dataIndex: "id",
      title: "Delete",
      render: (id) => {
        return (
          <Button
            trackerId="delete_gen4_profile"
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
    setProfiles(hydrationLock([...profiles, { ...opts, id: uniqueId() }]));
  };

  return (
    <ToolLayout<FormState, Result>
      initialValues={initialValues}
      validationSchema={Gen4ProfileSchema}
      loading={false}
      results={profiles}
      columns={columns}
      progressPercent={null}
      onSubmit={onSubmit}
      slots={{
        rngInfoFields: <FilterFields />,
        rngInfoActions: (
          <Button htmlType="submit" trackerId="add_gen4_profile">
            Add Profile
          </Button>
        ),
      }}
    />
  );
};
