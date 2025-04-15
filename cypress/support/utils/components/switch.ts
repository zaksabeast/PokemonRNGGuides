import { getElementSelector } from "../formSelector";

type Props = {
  parentSelector?: string;
  name: string;
  value: boolean;
};

const assert = ({ parentSelector, name, value }: Props) => {
  const id = getElementSelector({
    parentSelector,
    selector: `button[data-name="${name}"]`,
  });
  cy.get(id).invoke("attr", "aria-checked").should("eq", String(value));
};

const set = ({ parentSelector, name, value }: Props) => {
  const id = getElementSelector({
    parentSelector,
    selector: `button[data-name="${name}"]`,
  });
  cy.get(id).scrollIntoView();
  cy.get(id)
    .invoke("attr", "aria-checked")
    .then((checked) => {
      const isChecked = checked === "true";
      if (isChecked !== value) {
        cy.get(id).click();
      }
    });
  assert({ parentSelector, name, value });
};

// Can't use `switch` since its a keyword
export const switchInput = {
  assert,
  set,
};
