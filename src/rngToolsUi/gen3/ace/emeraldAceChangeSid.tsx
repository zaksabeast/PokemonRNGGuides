import { Flex } from "~/components";
import { FormSection, FormSelectField } from "~/components/form";
import { Typography } from "antd";
import Instructions from "./instructions_ace_change_sid.mdx";
import z from "zod";
import {
  emeraldLangs,
  getEmeraldLangOptions,
} from "~/rngToolsUi/gen3/shared/emeraldLang";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { EmeraldLang, rngTools } from "~/rngTools";
import { AceForm } from "./aceForm";

// Japanese isn't supported by ACE yet.
const aceEmeraldLangs = emeraldLangs.filter(
  (lang): lang is Exclude<EmeraldLang, "Japanese"> => lang !== "Japanese",
);

type Props = {
  sid: number;
};

const schema = z.object({
  lang: z.enum(aceEmeraldLangs),
});

const getInitialValues = (): FormState => {
  return {
    lang: "English",
  };
};

export type FormState = z.infer<typeof schema>;

export const EmeraldAceChangeSid = ({ sid }: Props) => {
  const t = useActiveRouteTranslations();
  const manipName = t["Change SID to {sid}"].replace("{sid}", sid.toString());

  const initialValues = getInitialValues();

  const onSubmit = (values: FormState) => {
    return rngTools.get_emerald_sid_box_names_result(sid, values.lang);
  };

  return (
    <Flex vertical>
      <Instructions />

      <Typography.Title level={4}> {manipName}</Typography.Title>

      <AceForm<FormState>
        key={sid}
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <FormSection>
          <FormSelectField<FormState>
            name="lang"
            label={t["Game Language"]}
            options={getEmeraldLangOptions(aceEmeraldLangs)}
          />
        </FormSection>
      </AceForm>
    </Flex>
  );
};
