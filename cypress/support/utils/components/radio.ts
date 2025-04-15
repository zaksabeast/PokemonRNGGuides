import { getElementSelector } from "../formSelector";

type Props = {
  parentSelector?: string;
  name: string;
  value: string;
};

const assert = ({ parentSelector, name, value }: Props) => {
  const id = getElementSelector({
    parentSelector,
    selector: `input[name="${name}"][value="${value}"]`,
  });

  cy.get(id).should("have.value", value);
};

const set = ({ parentSelector, name, value }: Props) => {
  const id = getElementSelector({
    parentSelector,
    selector: `input[name="${name}"][value="${value}"]`,
  });
  cy.get(id).parent().parent().scrollIntoView().click();
  assert({ parentSelector, name, value });
};

export const radio = { assert, set };
