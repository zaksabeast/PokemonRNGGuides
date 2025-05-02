import { getElementSelector } from "../formSelector";

type Props = {
  parentSelector?: string;
  name: string;
  value: string;
};

const assert = ({ parentSelector, name, value }: Props) => {
  const id = getElementSelector({
    parentSelector,
    selector: `input[name="${name}"]`,
  });
  cy.get(id).should("have.value", value);
};

const set = ({ parentSelector, name, value }: Props) => {
  const id = getElementSelector({
    parentSelector,
    selector: `input[name="${name}"]`,
  });
  cy.get(id).scrollIntoView();
  cy.get(id).clear().type(value);
  assert({ parentSelector, name, value });
};

export const input = {
  assert,
  set,
};
