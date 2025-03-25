import { GenericForm, GuarnteeFormNameType } from "~/types/form";
import { Flex } from "./flex";
import { Input } from "./input";
import { useFormikContext } from "formik";
import { Ivs } from "~/rngTools";

type SingleIvFieldProps<FormState extends GenericForm> = {
  parentName: GuarnteeFormNameType<FormState, Ivs>;
  stat: keyof Ivs;
};

const SingleIvField = <FormState extends GenericForm>({
  parentName,
  stat,
}: SingleIvFieldProps<FormState>) => {
  const formik = useFormikContext<Record<typeof parentName, Ivs>>();
  const ivs = formik.values[parentName];
  const defaultValue = formik.initialValues[parentName][stat];

  return (
    <Flex minWidth={50}>
      <Input
        name={`${parentName}_${stat}`}
        defaultValue={defaultValue}
        textAlign="center"
        variant="outlined"
        onChange={(event) => {
          const iv = parseInt(event.target.value);

          if (isNaN(iv)) {
            return;
          }

          const safeIv = Math.min(31, Math.max(0, iv));
          formik.setFieldValue(parentName, { ...ivs, [stat]: safeIv });
        }}
      />
    </Flex>
  );
};

type Props<FormState extends GenericForm> = {
  name: GuarnteeFormNameType<FormState, Ivs>;
};

export const IvInput = <FormState extends GenericForm>({
  name,
}: Props<FormState>) => {
  return (
    <Flex gap={16}>
      <SingleIvField<FormState> stat="hp" parentName={name} />
      <SingleIvField<FormState> stat="atk" parentName={name} />
      <SingleIvField<FormState> stat="def" parentName={name} />
      <SingleIvField<FormState> stat="spa" parentName={name} />
      <SingleIvField<FormState> stat="spd" parentName={name} />
      <SingleIvField<FormState> stat="spe" parentName={name} />
    </Flex>
  );
};
