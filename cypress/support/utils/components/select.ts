import { getElementSelector } from "../formSelector";

type Props = {
  parentSelector?: string;
  name: string;
  value: string;
};

const scrollUntil = (
  dropdown: Cypress.Chainable<JQuery<HTMLElement>>,
  optionSel: string,
  maxTries = 20,
) => {
  if (maxTries === 0) {
    throw new Error(`"${optionSel}" not found after scrolling`);
  }

  cy.document().then((doc) => {
    const match = doc.querySelector(optionSel);
    if (match) {
      return;
    }

    dropdown
      .find(".rc-virtual-list")
      .last()
      .trigger("wheel", {
        deltaY: 200,
        bubbles: true,
        cancelable: true,
      })
      .wait(100)
      .then(() => scrollUntil(dropdown, optionSel, maxTries - 1));
  });
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
  const dropdown = cy
    .get(".ant-select-dropdown")
    // Multiple dropdowns might be in view at a time,
    // but we always want the last one we clicked on
    .last()
    .should("be.visible");

  dropdown.within(() => {
    scrollUntil(dropdown, `[title="${value}"]`);

    const optionId = getElementSelector({
      selector: `[title="${value}"]`,
    });
    cy.get(optionId).click();
  });

  assert({ parentSelector, name, value });
};

export const select = {
  assert,
  set,
};
