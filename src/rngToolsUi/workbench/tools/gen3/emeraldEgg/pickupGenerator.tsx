import { ToolLayout } from "~/rngToolsUi/workbench/layouts/tool";
import { z } from "zod";

const Validator = z.object({});

type FormState = z.infer<typeof Validator>;
type Result = {};

const initialValues: FormState = {};

const FilterFields = () => {
  return "Placeholder filter fields";
};

const RngInfoFields = () => {
  return "Placeholder RNG info fields";
};

export const EmeraldEggPickupGenerator = () => {
  return (
    <ToolLayout<FormState, Result>
      initialValues={initialValues}
      validationSchema={Validator}
      loading={false}
      results={[]}
      progressPercent={0}
      columns={[]}
      onSubmit={async () => {}}
      cancel={() => {}}
      slots={{
        filterFields: <FilterFields />,
        rngInfoFields: <RngInfoFields />,
      }}
    />
  );
};
