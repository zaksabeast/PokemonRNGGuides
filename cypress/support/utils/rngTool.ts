import { ResultColumnValue, resultTable } from "./components/resultTable";
import { FormField, form as formUtils } from "./form";
import { getElementSelector } from "./formSelector";

export const testRngTool = <FormState extends Record<string, unknown>>({
  parentSelector,
  url,
  form,
  partialFirstColumnValues,
  afterVisit,
}: {
  parentSelector?: string;
  fakeDate?: Date;
  url: `/${string}`;
  form: Record<keyof FormState, FormField>;
  partialFirstColumnValues?: ResultColumnValue[];
  afterVisit?: () => void;
}) => {
  cy.visit(url);
  cy.wait(500);
  afterVisit?.();

  if (afterVisit != null) {
    cy.wait(500);
  }

  formUtils.set<FormState>({ form, parentSelector });
  const submitId = getElementSelector({
    parentSelector,
    selector: 'button[type="submit"]',
  });
  cy.get(submitId).click();
  if (partialFirstColumnValues != null) {
    resultTable.assert({ parentSelector, partialFirstColumnValues });
  }
};
