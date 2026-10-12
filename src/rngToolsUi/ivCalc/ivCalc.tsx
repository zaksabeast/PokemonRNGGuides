import { Flex, ResultTable } from "~/components";
import { OutlinedButton, ToolForm } from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { Typography } from "antd";
import { Fields } from "./components";
import { initialValues, initialResult } from "./constants";
import { getColumns, ivRangeColumns } from "./columns";
import { useOnSubmit } from "./utils";
import { Validator, type FormState, type IvRangeColumn } from "./types";

export const IvCalc = () => {
  const t = useActiveRouteTranslations();
  const { ivRangeData, result, setResult, onSubmit } = useOnSubmit({ t });

  return (
    <>
      <ToolForm<FormState, IvRangeColumn>
        allowReset
        resetTrackerId="iv_calc_reset"
        submitTrackerId="iv_calc_submit"
        submitButtonLabel="Add Data"
        submitButtonIcon="AddCircleOutline"
        initialValues={initialValues}
        onReset={() => setResult(initialResult)}
        validationSchema={Validator}
        onSubmit={onSubmit}
        columns={ivRangeColumns(t)}
        additionalButtons={
          <OutlinedButton
            trackerId="iv_calc_remove_last_row"
            disabled={!result.hasSubmitted}
            onClick={() =>
              setResult((prev) => ({
                ...prev,
                data: prev.data.slice(0, -1),
              }))
            }
          >
            Remove Last Row
          </OutlinedButton>
        }
        results={ivRangeData}
      >
        <Fields hasSubmitted={result.hasSubmitted} />
      </ToolForm>

      <Flex vertical>
        <Typography.Title level={4}>Applied Stats</Typography.Title>
        <ResultTable
          columns={getColumns(t)}
          dataSource={result.data.map((entry) => entry.submittedLevelStats)}
        />
      </Flex>
    </>
  );
};
