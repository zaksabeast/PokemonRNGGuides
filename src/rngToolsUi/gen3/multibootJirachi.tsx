import React from "react";
import {
  Flex,
  ResultColumn,
  Field,
  FileUpload,
  RngToolForm,
  Alert,
  FormikNumberInput,
  RngToolSubmit,
} from "~/components";
import { maxIvs, minIvs } from "~/types/ivs";
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
import { getPkmFilterFields, pkmFilterSchema } from "~/components/pkmFilter";

const JirachiSaveErrorSchema: z.Schema<JirachiSaveError> = z.enum([
  "InvalidSave",
  "NeedToSaveAgain",
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

const columns: ResultColumn<Result>[] = [
  {
    title: "Seed",
    dataIndex: "seed",
    render: (seed) => seed.toString(16).toUpperCase().padStart(4, "0"),
  },
  { title: "Hours", dataIndex: "hours" },
  { title: "Minutes", dataIndex: "minutes" },
  { title: "Seconds", dataIndex: "seconds" },
  { title: "Frames", dataIndex: "frames" },
  {
    title: "Shiny",
    dataIndex: "shiny",
    render: (shiny) => (shiny ? "Yes" : "No"),
  },
  ...ivColumns,
];

const Validator = z
  .object({
    hours: z.number().int().min(1).max(999),
  })
  .merge(pkmFilterSchema);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  hours: 1,
  filter_shiny: false,
  filter_nature: null,
  filter_ability: null,
  filter_gender: null,
  filter_min_ivs: minIvs,
  filter_max_ivs: maxIvs,
};

type Props = {
  jirachi: MultibootJirachiType;
};

export const MultibootJirachi = ({ jirachi }: Props) => {
  const [save, setSave] = React.useState<Uint8Array>(Uint8Array.from([]));
  const [results, setResults] = React.useState<Result[]>([]);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const fields: Field[] = React.useMemo(
    () => [
      {
        label: "Search Hours",
        input: <FormikNumberInput<FormState> name="hours" numType="decimal" />,
      },
      ...getPkmFilterFields<FormState>({ ability: false, gender: false }),
      {
        label: "Save file",
        input: (
          <Flex width="100%">
            <FileUpload
              id="multiboot_jirachi_save"
              flex={1}
              onUpload={async ([file]) => setSave(file)}
            />
          </Flex>
        ),
      },
    ],
    [],
  );

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      try {
        const results = await rngTools.search_mb_jirachi_times({
          save: [...save],
          hours: opts.hours,
          jirachi_type: jirachi,
          filter: {
            shiny: opts.filter_shiny,
            nature: opts.filter_nature,
            gender: opts.filter_gender,
            ability: opts.filter_ability,
            min_ivs: opts.filter_min_ivs,
            max_ivs: opts.filter_max_ivs,
          },
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
          .with({ data: "InvalidSave" }, () => "Invalid save!")
          .with({ data: "NeedToSaveAgain" }, () => "Need to save again!")
          .exhaustive();

        setResults([]);
        setErrorMessage(message);
      }
    },
    [save, jirachi],
  );

  return (
    <Flex vertical gap={16}>
      {errorMessage != null && (
        <Alert showIcon type="error" message={errorMessage} />
      )}
      <RngToolForm<FormState, Result>
        fields={fields}
        columns={columns}
        results={results}
        initialValues={initialValues}
        validationSchema={Validator}
        onSubmit={onSubmit}
        formContainerId="multiboot_jirachi_form"
        submitTrackerId="generate_multiboot_jirachi"
      />
    </Flex>
  );
};
