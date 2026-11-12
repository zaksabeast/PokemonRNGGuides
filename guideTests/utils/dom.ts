const WAIT_TIMEOUT_MS = 10_000;
const WAIT_INTERVAL_MS = 20;

/** A selector matched several elements, which waiting won't fix, so waitFor fails right away */
class AmbiguousMatchError extends Error {}

type CheckAttempt<Result> =
  | { passed: true; result: Result }
  | { passed: false; error: unknown };

const attemptCheck = async <Result>(
  check: () => Result,
): Promise<CheckAttempt<Awaited<Result>>> => {
  try {
    return { passed: true, result: await check() };
  } catch (error) {
    return { passed: false, error };
  }
};

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/** Retries `check` until it stops throwing, like a user waiting for the page to update */
export const waitFor = async <Result>(
  check: () => Result,
  timeoutMs = WAIT_TIMEOUT_MS,
): Promise<Awaited<Result>> => {
  const deadline = Date.now() + timeoutMs;
  let timedOut = false;

  for (;;) {
    const attempt = await attemptCheck(check);
    if (attempt.passed) {
      return attempt.result;
    }

    if (timedOut || attempt.error instanceof AmbiguousMatchError) {
      throw attempt.error;
    }

    // In-process rng_tools can block a sleep past the deadline before React renders its
    // result, so a timeout still gets one more attempt
    timedOut = Date.now() > deadline;
    await sleep(WAIT_INTERVAL_MS);
  }
};

export const getText = (element: Element) => {
  return (element.textContent ?? "").replace(/\s+/g, " ").trim();
};

export const getOnly = <Item extends Element>(
  items: Item[],
  description: string,
): Item => {
  const [item] = items;
  if (items.length > 1) {
    throw new AmbiguousMatchError(
      `Expected 1 ${description}, found ${items.length}`,
    );
  }

  if (item == null) {
    throw new Error(`Expected 1 ${description}, found 0`);
  }

  return item;
};

/** A guide's <Step>, which stays mounted while hidden */
export const getStep = (root: ParentNode, step: number): HTMLElement => {
  const element = root.querySelector<HTMLElement>(`#step-${step}`);
  if (element == null) {
    throw new Error(`Step ${step} isn't rendered`);
  }

  return element;
};

/** The stepper's own Next/Previous button, found by its tracker ID so a step's buttons can't match */
export const getStepperButton = (
  root: ParentNode,
  direction: "next" | "previous",
): HTMLButtonElement => {
  const button = root.querySelector<HTMLButtonElement>(
    `#stepper-${direction}-button`,
  );
  if (button == null) {
    throw new Error(`Stepper has no ${direction} button`);
  }

  return button;
};

/** jsdom lets tests click elements hidden with display: none, which a user can't */
export const isShown = (element: Element) => {
  return getComputedStyle(element).display !== "none";
};

// jsdom has no CSS.escape, and a quoted attribute value only needs quotes and backslashes escaped
const escapeAttributeValue = (value: string) => {
  return value.replace(/["\\]/g, "\\$&");
};

/**
 * The control a field label names: the <input> for `<label for>`,
 * or the group (e.g. a radio grid) that points at the label with aria-labelledby.
 */
export const getByLabel = (root: ParentNode, label: string): HTMLElement => {
  const labels = [
    ...root.querySelectorAll<HTMLElement>("[data-field-label]"),
  ].filter((element) => getText(element) === label);

  const labelElement = getOnly(labels, `field labelled "${label}"`);
  const inputId = labelElement.getAttribute("for");
  const control =
    inputId != null
      ? root.querySelector<HTMLElement>(
          `[id="${escapeAttributeValue(inputId)}"]`,
        )
      : root.querySelector<HTMLElement>(
          `[aria-labelledby~="${escapeAttributeValue(labelElement.id)}"]`,
        );

  if (control == null) {
    throw new Error(`Field "${label}" has no control`);
  }

  return control;
};

export const getButton = (
  root: ParentNode,
  name: string,
): HTMLButtonElement => {
  const buttons = [...root.querySelectorAll("button")].filter(
    (button) => getText(button) === name,
  );

  return getOnly(buttons, `button named "${name}"`);
};

export const click = (element: Element) => {
  element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
};

// React tracks the last value it set, so setting `.value` directly is ignored
const getValueSetter = (field: HTMLInputElement | HTMLTextAreaElement) => {
  const prototype =
    field instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype;

  return Object.getOwnPropertyDescriptor(prototype, "value")?.set;
};

/** Types into a React-controlled input or text area the way a user does, then leaves the field */
export const typeInto = (field: HTMLElement, value: string) => {
  if (
    !(field instanceof HTMLInputElement) &&
    !(field instanceof HTMLTextAreaElement)
  ) {
    throw new Error("Expected an <input> or <textarea>");
  }

  getValueSetter(field)?.call(field, value);
  field.dispatchEvent(new Event("input", { bubbles: true }));
  field.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
};

export const closestAncestorWithText = (element: Element) => {
  let ancestor = element.parentElement;
  while (ancestor != null && getText(ancestor) === "") {
    ancestor = ancestor.parentElement;
  }

  return ancestor;
};

/** The only <input> whose field shows exactly `fieldText`, for fields without a `<label for>` */
export const getInputByFieldText = (root: ParentNode, fieldText: string) => {
  const inputs = [...root.querySelectorAll("input")].filter((input) => {
    const field = closestAncestorWithText(input);

    return field != null && getText(field) === fieldText;
  });

  return getOnly(inputs, `input in a field named "${fieldText}"`);
};

export const readTextNodes = (root: Element) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const texts: string[] = [];
  while (walker.nextNode() != null) {
    texts.push((walker.currentNode.textContent ?? "").trim());
  }

  return texts.filter((text) => text !== "");
};

// Each option repeats its label in an aria-hidden copy that sizes the cell
export const getRadioOptionLabel = (input: HTMLInputElement) => {
  const cell = input.closest("label")?.cloneNode(true);
  if (!(cell instanceof Element)) {
    return "";
  }

  for (const hidden of cell.querySelectorAll("[aria-hidden]")) {
    hidden.remove();
  }

  return getText(cell);
};

export const selectRadio = (group: HTMLElement, optionLabel: string) => {
  const inputs = [
    ...group.querySelectorAll<HTMLInputElement>("input[type=radio]"),
  ].filter((input) => getRadioOptionLabel(input) === optionLabel);

  getOnly(inputs, `radio option "${optionLabel}"`).click();
};

const getComboboxes = (element: Element) => {
  return [...element.querySelectorAll<HTMLElement>("[role=combobox]")];
};

const getNearestComboboxes = (
  element: Element,
  root: ParentNode,
): HTMLElement[] => {
  let container: Element | null = element;
  while (container != null) {
    const comboboxes = getComboboxes(container);
    if (comboboxes.length > 0 || container === root) {
      return comboboxes;
    }

    container = container.parentElement;
  }

  return [];
};

const hasChildWithText = (element: Element, text: string) => {
  return [...element.children].some((child) => getText(child) === text);
};

const getInnermostElementsWithText = (root: ParentNode, text: string) => {
  return [...root.querySelectorAll("*")].filter(
    (element) => getText(element) === text && !hasChildWithText(element, text),
  );
};

export const getInnermostElementWithText = (root: ParentNode, text: string) => {
  return getOnly(
    getInnermostElementsWithText(root, text),
    `element showing "${text}"`,
  );
};

/** The only select near the given text, which can be a field label or a nearby heading. */
export const getSelectByLabel = (
  root: ParentNode,
  label: string,
): HTMLElement => {
  const selects = getInnermostElementsWithText(root, label)
    .map((element) => getNearestComboboxes(element, root))
    .filter((comboboxes) => comboboxes.length === 1)
    .flat();

  return getOnly([...new Set(selects)], `select labelled "${label}"`);
};

const getOpenOption = (select: HTMLElement, optionLabel: string) => {
  const listboxId = select.getAttribute("aria-controls");
  const listbox = listboxId != null ? document.getElementById(listboxId) : null;
  if (listbox == null) {
    throw new Error("Select isn't open");
  }

  const options = [
    ...listbox.querySelectorAll<HTMLElement>("[role=option]"),
  ].filter((option) => getText(option) === optionLabel);

  return getOnly(options, `select option "${optionLabel}"`);
};

export const getShownOptionLabel = (select: HTMLElement) => {
  const selection = closestAncestorWithText(select);

  return selection == null ? "" : getText(selection);
};

/** Opens an antd select and clicks an option the way a user does */
export const selectOption = async (
  select: HTMLElement,
  optionLabel: string,
) => {
  select.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
  const option = await waitFor(() => getOpenOption(select, optionLabel));

  option.click();
};

export type TableRow = { cells: Record<string, string>; element: HTMLElement };

const readRow = (row: HTMLElement, headers: string[]): TableRow => {
  const values = [...row.querySelectorAll("td")].map(getText);
  const cells = Object.fromEntries(
    headers.map((header, index) => [header, values[index] ?? ""]),
  );

  return { cells, element: row };
};

/** Reads a results table into rows keyed by column title */
export const readTable = (root: ParentNode): TableRow[] => {
  const table = getOnly([...root.querySelectorAll("table")], "table");
  const headers = [...table.querySelectorAll("thead th")].map(getText);
  const rows = table.querySelectorAll<HTMLElement>("tbody tr.ant-table-row");

  return [...rows].map((row) => readRow(row, headers));
};

/** Throws until results appear, so it can be passed to waitFor */
export const getFirstTableRow = (root: ParentNode): TableRow => {
  const [row] = readTable(root);
  if (row == null) {
    throw new Error("No results yet");
  }

  return row;
};

export type TimerPhase = { label: string; duration: string };

// Each run view row shows its position, label, and duration, in that order
const readTimerPhase = (row: Element): TimerPhase => {
  const [, label = "", duration = ""] = [...row.children].map(getText);

  return { label, duration };
};

/** Timer phases in the order they run, as the run view shows them */
export const readTimer = (root: ParentNode): TimerPhase[] => {
  const rows = root.querySelectorAll("[data-timer-phase]");

  return [...rows].map(readTimerPhase);
};

/** Replaces the clipboard and returns every text written to it, oldest first */
export const stubClipboard = () => {
  const copiedTexts: string[] = [];
  const clipboard: Pick<Clipboard, "writeText"> = {
    writeText: async (text) => {
      copiedTexts.push(text);
    },
  };

  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: clipboard,
  });

  return copiedTexts;
};
