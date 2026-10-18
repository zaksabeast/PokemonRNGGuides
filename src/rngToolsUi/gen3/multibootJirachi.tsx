import React from "react";
import { Flex, ResultColumn, FileUpload, Alert, ShinyIcon } from "~/components";
import {
  FieldFrame,
  FormNumberField,
  FormSection,
  PkmFilter,
  ToolForm,
  useFieldIds,
  type ToolFormSubmit,
} from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import {
  rngTools,
  MultibootJirachiType,
  MultibootJirachiSaveSpread,
  JirachiSaveError,
} from "~/rngTools";
import { FlattenIvs, ivColumns } from "~/rngToolsUi/shared/ivColumns";
import * as tst from "ts-toolbelt";
import { match } from "ts-pattern";
import { z } from "zod";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
  pkmFilterSchema,
} from "~/components/pkmFilter";
import { Translations } from "~/translations";

const JirachiSaveErrorSchema: z.Schema<JirachiSaveError> = z.union([
  z.literal("NeedToSaveAgain"),
  z.object({ InvalidSave: z.enum(["InvalidLength", "InvalidMagic"]) }),
]);

type Result = tst.O.MergeAll<
  {
    seed: number;
  },
  [
    FlattenIvs<MultibootJirachiSaveSpread["jirachi"]> &
      MultibootJirachiSaveSpread["save_time"],
  ]
>;

const getColumns = (t: Translations): ResultColumn<Result>[] => [
  {
    title: t["Seed"],
    dataIndex: "seed",
    render: (seed) => seed.toString(16).toUpperCase().padStart(4, "0"),
  },
  { title: t["Hours"], dataIndex: "hours" },
  { title: t["Minutes"], dataIndex: "minutes" },
  { title: t["Seconds"], dataIndex: "seconds" },
  { title: t["Frames"], dataIndex: "frames" },
  {
    title: t["Shiny"],
    dataIndex: "shiny",
    render: (shiny) => <ShinyIcon shiny={shiny} />,
  },
  ...ivColumns,
];

const Validator = z
  .object({
    hours: z.number().int().min(1).max(999),
  })
  .extend(pkmFilterSchema.shape);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  hours: 1,
  ...getPkmFilterInitialValues(),
};

type Props = {
  jirachi: MultibootJirachiType;
};

type FieldsProps = {
  onUploadSave: (save: Uint8Array) => void;
};

const Fields = ({ onUploadSave }: FieldsProps) => {
  const t = useActiveRouteTranslations();
  const saveFileIds = useFieldIds();

  return (
    <>
      <FormSection title={t["Your game"]}>
        <FieldFrame
          ids={saveFileIds}
          labelTarget="group"
          label={t["Save file"]}
        >
          <Flex>
            <FileUpload
              id="multiboot_jirachi_save"
              onUpload={async ([file]) => onUploadSave(file)}
            />
          </Flex>
        </FieldFrame>
      </FormSection>

      <FormSection title={t["Search"]}>
        <FormNumberField<FormState>
          name="hours"
          label={t["Search Hours"]}
          numType="decimal"
        />
      </FormSection>

      <FormSection title={t["Filters"]}>
        <PkmFilter<FormState>
          generation={3}
          displayAbility={false}
          displayGender={false}
        />
      </FormSection>
    </>
  );
};

export const MultibootJirachi = ({ jirachi }: Props) => {
  const [save, setSave] = React.useState<Uint8Array>(Uint8Array.from([]));
  const [results, setResults] = React.useState<Result[]>([]);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    try {
      const results = await rngTools.search_mb_jirachi_times({
        save: [...save],
        hours: opts.hours,
        jirachi_type: jirachi,
        filter: pkmFilterFieldsToRustInput(opts),
      });
      setErrorMessage(null);
      setResults(
        results.map((result) => ({
          seed: result.seed,
          pid: result.jirachi.pid,
          shiny: result.jirachi.shiny,
          ...result.jirachi.ivs,
          ...result.save_time,
        })),
      );
    } catch (err) {
      const parsedError = JirachiSaveErrorSchema.safeParse(err);

      const message = match(parsedError)
        .with({ success: false }, () => "Unknown error!")
        .with(
          { data: { InvalidSave: "InvalidLength" } },
          () => "Invalid save length!",
        )
        .with(
          { data: { InvalidSave: "InvalidMagic" } },
          () => "Invalid save (magic)!",
        )
        .with({ data: "NeedToSaveAgain" }, () => "Need to save again!")
        .exhaustive();

      setResults([]);
      setErrorMessage(message);
    }
  };

  return (
    <Flex vertical gap={16}>
      {errorMessage != null && (
        <Alert showIcon type="error" title={errorMessage} />
      )}
      <ToolForm<FormState, Result>
        getColumns={getColumns}
        results={results}
        initialValues={initialValues}
        validationSchema={Validator}
        onSubmit={onSubmit}
        formContainerId="multiboot_jirachi_form"
        submitTrackerId="generate_multiboot_jirachi"
      >
        <Fields onUploadSave={setSave} />
      </ToolForm>
    </Flex>
  );
};
