type Props = {
  dataNodeKey: string;
};

const click = ({ dataNodeKey }: Props) => {
  cy.get(`.ant-tabs-tab[data-node-key="${dataNodeKey}"]`)
    .scrollIntoView()
    .click();
};

export const tab = {
  click,
};
