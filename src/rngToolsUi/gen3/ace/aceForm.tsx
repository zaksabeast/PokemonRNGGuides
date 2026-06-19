import { Field } from "~/components/formFieldTable";
import { RngToolForm, RngToolSubmit } from "~/components/rngToolForm";
import { Translations } from "~/translations";
import { BoxNameResult } from "./aceBoxNameFormatter";
import { GenericForm, OneOf } from "~/types";
import { DefaultValues, } from "react-hook-form";

export type Props<FormState extends GenericForm> = {
    results: BoxNameResult[];
    initialValues: DefaultValues<FormState>;
    values?: FormState;
    validationSchema?: z.ZodType<FormState>;
    onSubmit:RngToolSubmit<FormState>
} & OneOf<{
  getFields: (t: Translations) => Field[];
  children: React.ReactNode;
}>;

export const AceForm = <
  FormState extends GenericForm,
>(props: Props) => {
    return <Flex vertical>
      <RngToolForm<FormState, BoxNameResult>
        {...props}
        getColumns={getBoxNameColumns}
        submitTrackerId="emerald_ace_generate"
        rowKey="uid"
        pagination={false}
      />
      {hasError && (
        <Typography.Text type="danger">
          Error: Unable to generate the box names.
        </Typography.Text>
      )}
    </Flex>
};
