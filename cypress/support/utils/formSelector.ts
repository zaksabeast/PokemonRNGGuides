export const getFormSelector = (formId: string) => `div[id="${formId}"]`;

export const getElementSelector = ({
  parentSelector,
  selector,
}: {
  parentSelector?: string;
  selector: string;
}): string => {
  return [parentSelector, selector].filter((item) => item != null).join(" ");
};
