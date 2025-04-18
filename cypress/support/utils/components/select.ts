import { getElementSelector } from "../formSelector";

type Props = {
  parentSelector?: string;
  name: string;
  value: string;
};

const assert = ({ parentSelector, name, value }: Props) => {
  const id = getElementSelector({
    parentSelector,
    selector: `div[name="${name}"]`,
  });
  cy.get(id).contains(value);
};

const set = ({ parentSelector, name, value }: Props) => {
  const id = getElementSelector({
    parentSelector,
    selector: `div[name="${name}"]`,
  });
  cy.get(id).scrollIntoView();
  cy.get(id).click();
  // Options are mounted outside the form, so we choose it outside the form
  cy.get(".ant-select-dropdown")
    // Multiple dropdowns might be in view at a time,
    // but we always want the last one we clicked on
    .last()
    .should("be.visible")
    .within(() => {
      const optionId = getElementSelector({
        selector: `[title="${value}"]`,
      });
      cy.get(optionId).should("be.visible").click();
    });

  assert({ parentSelector, name, value });
};

export const select = {
  assert,
  set,
};
