import { getElementSelector } from "../formSelector";
import { match, P } from "ts-pattern";

export type ResultColumnValue = string | { type: "any" };

const assert = ({
  parentSelector,
  partialFirstColumnValues,
}: {
  parentSelector?: string;
  partialFirstColumnValues: ResultColumnValue[];
}) => {
  partialFirstColumnValues.forEach((value, index) => {
    match(value)
      .with({ type: "any" }, () => {})
      .with(P.string, (matched) =>
        cy
          .get(
            getElementSelector({
              parentSelector,
              selector: `.ant-table-tbody > :nth-child(1) > :nth-child(${index + 1})`,
            }),
          )
          .should("have.text", matched),
      )
      .exhaustive();
  });
};

export const resultTable = {
  assert,
};
