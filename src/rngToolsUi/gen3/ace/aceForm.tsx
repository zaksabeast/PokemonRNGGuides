import { ToolForm, type ToolFormSubmit } from "~/components/form";
import {
  BoxNameResult,
  convertAceResultToBoxNames,
  getBoxNameColumns,
} from "./aceBoxNameFormatter";
import { GenericForm } from "~/types";
import { DefaultValues } from "react-hook-form";
import { Flex, Typography } from "~/components";
import React from "react";
import z from "zod";
import { AceResult } from "~/rngTools";

export type Props<FormState extends GenericForm> = {
  initialValues: DefaultValues<FormState>;
  values?: FormState;
  validationSchema?: z.ZodType<FormState>;
  onSubmit: (values: FormState) => Promise<AceResult | null | undefined>;
  children: React.ReactNode;
};

export const AceForm = <FormState extends GenericForm>(
  props: Props<FormState>,
) => {
  const [results, setResults] = React.useState<BoxNameResult[]>([]);
  const [hasError, setHasError] = React.useState(false);

  const onSubmit: ToolFormSubmit<FormState> = async (values) => {
    setHasError(false);
    setResults([]);

    setTimeout(async () => {
      const res = await props.onSubmit(values);
      if (res == null) {
        setHasError(true);
        return;
      }

      setResults(convertAceResultToBoxNames(res));
    }, 100); // Without setTimeout, it's not obvious that something happened.
  };
  return (
    <Flex vertical>
      <ToolForm<FormState, BoxNameResult>
        {...props}
        getColumns={getBoxNameColumns}
        submitTrackerId="emerald_ace_generate"
        rowKey="uid"
        pagination={false}
        results={results}
        onSubmit={onSubmit}
      />
      {hasError && (
        <Typography.Text type="danger">
          Error: Unable to generate the box names.
        </Typography.Text>
      )}
    </Flex>
  );
};
