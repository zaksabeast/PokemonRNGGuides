import { GenericForm, GuarnteeFormNameType } from "~/types/form";
import { useFormikContext } from "formik";
import { Flex } from "~/components/flex";
import { Select } from "~/components/select";
import { Switch } from "~/components/switch";
import { PkmFilter, Ivs } from "~/rngTools";
import { nature } from "~/types/nature";
import { ability } from "~/types/ability";
import { gender } from "~/types/gender";
import { Input } from "~/components/input";

type Props<FormState extends GenericForm> = {
  name: GuarnteeFormNameType<FormState, PkmFilter>;
};

type IvInputProps<FormState extends GenericForm> = {
  parentName: GuarnteeFormNameType<FormState, PkmFilter>;
  stat: keyof Ivs;
  min?: boolean;
};

const IvInput = <FormState extends GenericForm>({
  parentName,
  stat,
  min = false,
}: IvInputProps<FormState>) => {
  const formik = useFormikContext<Record<typeof parentName, PkmFilter>>();
  const value = formik.values[parentName];
  const defaultValue =
    formik.values[parentName]["ivs"][min ? "min_ivs" : "max_ivs"][stat];
  return (
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
        const ivs = value.ivs;
        if (min) {
          ivs.min_ivs[stat] = safeIv;
        } else {
          ivs.max_ivs[stat] = safeIv;
        }
        formik.setFieldValue(parentName, { ...value, ivs });
      }}
    />
  );
};

export const FormikPkmFilter = <FormState extends GenericForm>({
  name,
}: Props<FormState>) => {
  const formik = useFormikContext<Record<typeof name, PkmFilter>>();
  const value = formik.values[name];

  return (
    <Flex vertical gap={10}>
      <Switch
        value={Boolean(value.shiny)}
        onChange={(shiny) => {
          formik.setFieldValue(name, { ...value, shiny });
        }}
      />
      <Select
        value={value.nature ?? null}
        options={(["None", ...nature] as const).map((nat) => ({
          label: nat,
          value: nat === "None" ? null : nat,
        }))}
        onChange={(nature) => {
          formik.setFieldValue(name, { ...value, nature });
        }}
      />
      <Select
        value={value.ability ?? null}
        options={(["None", ...ability] as const).map((ability) => ({
          label: ability,
          value: ability === "None" ? null : ability,
        }))}
        onChange={(ability) => {
          formik.setFieldValue(name, { ...value, ability });
        }}
      />
      <Select
        value={value.gender ?? null}
        options={(["None", ...gender] as const).map((gen) => ({
          label: gen,
          value: gen === "None" ? null : gen,
        }))}
        onChange={(gender) => {
          formik.setFieldValue(name, { ...value, gender });
        }}
      />
      <Flex gap={16}>
        <IvInput<FormState> stat="hp" parentName={name} min />
        <IvInput<FormState> stat="atk" parentName={name} min />
        <IvInput<FormState> stat="def" parentName={name} min />
        <IvInput<FormState> stat="spa" parentName={name} min />
        <IvInput<FormState> stat="spd" parentName={name} min />
        <IvInput<FormState> stat="spe" parentName={name} min />
      </Flex>
      <Flex gap={16}>
        <IvInput<FormState> stat="hp" parentName={name} />
        <IvInput<FormState> stat="atk" parentName={name} />
        <IvInput<FormState> stat="def" parentName={name} />
        <IvInput<FormState> stat="spa" parentName={name} />
        <IvInput<FormState> stat="spd" parentName={name} />
        <IvInput<FormState> stat="spe" parentName={name} />
      </Flex>
    </Flex>
  );
};
