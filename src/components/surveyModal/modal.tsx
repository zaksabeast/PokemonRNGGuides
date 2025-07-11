import React from "react";
import {
  Flex,
  Button,
  Field,
  FormikRadio,
  FormikSelect,
  Form,
  Typography,
  Countdown,
  Icon,
} from "~/components";
import { Formik } from "formik";
import { upperFirst } from "lodash-es";
import { Modal } from "antd";
import { track } from "~/analytics";
import styled from "@emotion/styled";
import { useSurveyModal } from "./state";
import { z } from "zod";
import { toOptions } from "~/utils/options";
import { toFormikValidationSchema } from "zod-formik-adapter";

const yesNo = ["yes", "no"] as const;
const yesNoMaybe = ["yes", "no", "maybe"] as const;

const YesNoMaybeSchema = z.enum(yesNoMaybe).nullable();

const SurveySchema = z.object({
  haveFutureGoals: YesNoMaybeSchema,
  struggleWithImpulseSpending: YesNoMaybeSchema,
  openToAutomation: YesNoMaybeSchema,
  currentSpendingManagement: z
    .enum([
      "budgetingApp",
      "spreadsheet",
      "bankAccount",
      "notManaging",
      "other",
    ])
    .array(),
  wouldTryApp: YesNoMaybeSchema,
});

const SurveyValidator = toFormikValidationSchema(SurveySchema);

type Survey = z.infer<typeof SurveySchema>;

const initialValues: Survey = {
  haveFutureGoals: null,
  struggleWithImpulseSpending: null,
  openToAutomation: null,
  currentSpendingManagement: [],
  wouldTryApp: null,
};

const yesNoOptions = toOptions(yesNo, upperFirst);
const yesNoMaybeOptions = toOptions(yesNoMaybe, upperFirst);

const fields: Field[] = [
  {
    label: "Do you have future goals you're trying to save for?",
    input: (
      <FormikRadio<Survey> name="haveFutureGoals" options={yesNoOptions} />
    ),
  },
  {
    label: "Do you struggle with impulse spending and want to save more?",
    input: (
      <FormikRadio<Survey>
        name="struggleWithImpulseSpending"
        options={yesNoOptions}
      />
    ),
  },
  {
    label:
      "Would you try an app that automates savings and limits impulse spending (gently)?",
    input: (
      <FormikRadio<Survey>
        name="openToAutomation"
        options={yesNoMaybeOptions}
      />
    ),
  },
  {
    label: "How do you currently manage your spending?",
    input: (
      <FormikSelect<Survey, "currentSpendingManagement">
        name="currentSpendingManagement"
        mode="multiple"
        options={[
          { label: "I use a budgeting app", value: "budgetingApp" },
          { label: "I use a spreadsheet or notes app", value: "spreadsheet" },
          { label: "I just check my bank account", value: "bankAccount" },
          { label: "I don’t really manage it", value: "notManaging" },
          { label: "Other", value: "other" },
        ]}
      />
    ),
  },
  {
    label:
      "Would you try an app that drips your money out slowly (like $25/day)?",
    input: (
      <FormikRadio<Survey> name="wouldTryApp" options={yesNoMaybeOptions} />
    ),
  },
];

const StyledModal = styled(Modal)({
  ".ant-modal-footer": {
    display: "none",
  },
});

export const SurveyModal = () => {
  const { isOpen, closeModal: closeModal } = useSurveyModal();
  const [mode, setMode] = React.useState<
    "form" | "submitted_discord" | "thank_you"
  >("form");
  const onSubmit = async ({ currentSpendingManagement, ...values }: Survey) => {
    track("Drip budget app survey submitted", {
      ...values,
      currentSpendingManagement_budgetingApp:
        currentSpendingManagement.includes("budgetingApp"),
      currentSpendingManagement_spreadsheet:
        currentSpendingManagement.includes("spreadsheet"),
      currentSpendingManagement_bankAccount:
        currentSpendingManagement.includes("bankAccount"),
      currentSpendingManagement_notManaging:
        currentSpendingManagement.includes("notManaging"),
      currentSpendingManagement_other:
        currentSpendingManagement.includes("other"),
    });
    if (
      values.haveFutureGoals === "yes" &&
      values.struggleWithImpulseSpending === "yes" &&
      (values.openToAutomation === "yes" ||
        values.openToAutomation === "maybe") &&
      (values.wouldTryApp === "yes" || values.wouldTryApp === "maybe")
    ) {
      setMode("submitted_discord");
    } else {
      setMode("thank_you");
    }
  };

  return (
    <StyledModal
      open={isOpen}
      onCancel={() => {
        closeModal();
        track("Survey modal cancelled", {});
      }}
    >
      {mode === "thank_you" && (
        <>
          <Typography.Title level={3}>
            Thank you for your feedback!
          </Typography.Title>

          <Button
            trackerId="budget_app_survey_thank_you_close"
            size="middle"
            onClick={closeModal}
          >
            Close feedback
          </Button>
        </>
      )}
      {mode === "submitted_discord" && (
        <>
          <Typography.Title level={4}>
            Help build it — or kill it
          </Typography.Title>

          <Typography.Paragraph>
            I made a Drip Budget Discord that will be{" "}
            <Typography.Text strong>
              deleted in <Countdown date="08-01-25" format="short" />
            </Typography.Text>{" "}
            unless we hit <Typography.Text strong>300 members</Typography.Text>.
          </Typography.Paragraph>

          <Typography.Paragraph>
            If we hit 300 members, it will tell me people are interested.
          </Typography.Paragraph>

          <Button
            type="primary"
            trackerId="budget_app_survey_join_discord"
            icon={<Icon name="Discord" />}
            size="middle"
            href="https://discord.gg/nwMcqyf8Xs"
          >
            Join the Drip Budget Discord
          </Button>
        </>
      )}

      {mode === "form" && (
        <>
          <Typography.Title level={3} mb={0}>
            App idea survey!
          </Typography.Title>

          <Formik
            initialValues={initialValues}
            validationSchema={SurveyValidator}
            onSubmit={onSubmit}
          >
            <Form>
              <Flex vertical>
                {fields.map((field, index) => (
                  <Flex vertical key={index}>
                    <Typography.Title level={5}>{field.label}</Typography.Title>
                    {field.input}
                  </Flex>
                ))}
              </Flex>

              <Button
                mt={24}
                htmlType="submit"
                type="primary"
                trackerId="budget_app_survey_submit"
              >
                Share feedback
              </Button>
            </Form>
          </Formik>
        </>
      )}
    </StyledModal>
  );
};
