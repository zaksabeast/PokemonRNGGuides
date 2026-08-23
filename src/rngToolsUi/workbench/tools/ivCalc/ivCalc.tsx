import { LevelStat } from "~/rngTools";
import {
  Validator,
  IvRangeColumn,
  IvRangeResult,
} from "~/rngToolsUi/ivCalc/types";
import { Fields } from "~/rngToolsUi/ivCalc/components";
import { ivRangeColumns, getColumns } from "~/rngToolsUi/ivCalc/columns";
import { initialValues, initialResult } from "~/rngToolsUi/ivCalc/constants";
import { useOnSubmit } from "~/rngToolsUi/ivCalc/utils";
import { ResultTable, Flex, Button } from "~/components";
import { ToolLayout } from "~/rngToolsUi/workbench/layouts/tool";
import { z } from "zod";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";

type FormState = z.infer<typeof Validator>;

type ActionsProps = {
  hasSubmitted: boolean;
  setResult: React.Dispatch<React.SetStateAction<IvRangeResult>>;
  onReset: () => void;
};

const Actions = ({ hasSubmitted, setResult, onReset }: ActionsProps) => {
  return (
    <Flex vertical flex={1} gap={8}>
      <Button trackerId="iv_calc_submit" htmlType="submit">
        Add Data
      </Button>
      <Button
        trackerId="iv_calc_remove_last_row"
        disabled={!hasSubmitted}
        onClick={() =>
          setResult((prev) => ({
            ...prev,
            data: prev.data.slice(0, -1),
          }))
        }
      >
        Remove Last Row
      </Button>
      <Button trackerId="iv_calc_reset" onClick={onReset}>
        Reset
      </Button>
    </Flex>
  );
};

export const IvCalcTab = () => {
  const t = useActiveRouteTranslations();
  const { ivRangeData, result, setResult, onSubmit } = useOnSubmit({ t });

  return (
    <ToolLayout<FormState, IvRangeColumn>
      results={ivRangeData}
      progressPercent={null}
      loading={false}
      initialValues={initialValues}
      validationSchema={Validator}
      columns={ivRangeColumns(t)}
      slots={{
        rngInfoFields: <Fields hasSubmitted={result.hasSubmitted} />,
        rngInfoActions: (
          <Actions
            hasSubmitted={result.hasSubmitted}
            setResult={setResult}
            onReset={() => setResult(initialResult)}
          />
        ),
        filterFields: (
          <ResultTable<LevelStat>
            size="small"
            expandable={false}
            columns={getColumns(t)}
            dataSource={result.data.map((entry) => entry.submittedLevelStats)}
          />
        ),
      }}
      onSubmit={onSubmit}
    />
  );
};
