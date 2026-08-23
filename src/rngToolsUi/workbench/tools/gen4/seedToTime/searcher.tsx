import { uniqueId } from "lodash-es";
import { ToolLayout } from "~/rngToolsUi/workbench/layouts/tool";
import {
  Descriptions,
  Field,
} from "~/rngToolsUi/workbench/components/descriptions";
import { FormikNumberInput } from "~/components";
import { ResultColumn } from "~/components/resultTable";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import {
  multiWorkerRngTools,
  FindAllSeedtime4Opts,
  RngDateTime,
  SeedTime4,
} from "~/rngTools";
import { z } from "zod";
import { RustOption } from "~/types";
import { formatRngDateTime } from "~/utils/time";

const Validator = z.object({
  seed: z.number().int().min(0).max(0xffffffff),
  year: z.number().int().min(2000).max(2100),
  second: z.number().int().min(0).max(59).nullable(),
});

type FormState = z.infer<typeof Validator>;
type Result = { id: string; datetime: RngDateTime; delay: number };

const initialValues: FormState = {
  seed: 0,
  year: 2000,
  second: null,
};

const FilterFields = () => {
  const fields: Field[] = [
    {
      label: "Optional Second",
      children: (
        <FormikNumberInput<FormState> name="second" numType="decimal" />
      ),
    },
  ];
  return <Descriptions bordered title="Filters" items={fields} column={1} />;
};

const RngInfoFields = () => {
  const fields: Field[] = [
    {
      label: "Seed",
      children: <FormikNumberInput<FormState> name="seed" numType="hex" />,
    },
    {
      label: "Year",
      children: <FormikNumberInput<FormState> name="year" numType="decimal" />,
    },
  ];
  return <Descriptions bordered title="RNG Info" items={fields} column={1} />;
};

const columns: ResultColumn<Result>[] = [
  {
    title: "Date Time",
    dataIndex: "datetime",
    render: (value) => formatRngDateTime(value, { seconds: true }),
  },
  {
    title: "Delay",
    dataIndex: "delay",
  },
];

const mapResult = (res: SeedTime4): Result => ({ ...res, id: uniqueId() });

export const SeedTime4Searcher = () => {
  const {
    run: findAllSeedtime4,
    data: results,
    loading,
    progressPercent,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.find_all_seedtime4, {
    map: mapResult,
  });

  const onSubmit = async (opts: FormState) => {
    const searchOpts: RustOption<FindAllSeedtime4Opts> = {
      year: opts.year,
      seed: opts.seed,
      second: opts.second,
    };

    await findAllSeedtime4([searchOpts]);
  };

  return (
    <ToolLayout<FormState, Result>
      initialValues={initialValues}
      validationSchema={Validator}
      loading={loading}
      results={results}
      progressPercent={progressPercent}
      columns={columns}
      onSubmit={onSubmit}
      cancel={cancel}
      slots={{
        filterFields: <FilterFields />,
        rngInfoFields: <RngInfoFields />,
      }}
    />
  );
};
