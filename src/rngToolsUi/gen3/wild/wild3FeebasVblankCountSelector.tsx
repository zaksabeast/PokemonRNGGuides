import { Wild3Weather } from "~/rngTools";
import { FieldFrame, useFieldIds } from "~/components/form";
import { useField } from "~/hooks/form";
import React from "react";
import styled from "@emotion/styled";
import { getAllFeebasCycleDistributions } from "./data/initial_cycle/feebas_cycle_info";
import { formatProbability } from "~/utils/formatProbability";

const feebasWeathers = [
  "Sunny",
  "Rain",
  "Thunderstorm",
] as const satisfies readonly Wild3Weather[];
const feebasVblankCounts = [null, 0, 1, 2, 3, 4, 5] as const;

const NONE = "none";

const VblankCountRows = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

const VblankCountHeader = styled.div(({ theme }) => ({
  display: "none",
  [theme.mediaQueries.up("mobile")]: {
    display: "grid",
    gridTemplateColumns: "minmax(100px, 1fr) repeat(3, minmax(0, 1fr))",
    gap: 8,
    paddingInline: 12,
    color: theme.token.colorTextSecondary,
  },
}));

const VblankCountRow = styled.label<{ $selected: boolean }>(
  ({ theme, $selected }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 8,
    padding: 12,
    border: `1px solid ${theme.token.colorBorder}`,
    borderRadius: theme.shape.medium,
    backgroundColor: $selected ? theme.token.colorPrimaryBg : undefined,
    cursor: "pointer",
    [theme.mediaQueries.up("mobile")]: {
      gridTemplateColumns: "minmax(100px, 1fr) repeat(3, minmax(0, 1fr))",
      alignItems: "center",
    },
    ":hover": {
      backgroundColor: $selected
        ? theme.token.colorPrimaryBg
        : theme.token.colorStateLayerHover,
    },
  }),
);

const VblankCountChoice = styled.span(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  gridColumn: "1 / -1",
  color: theme.token.colorText,
  [theme.mediaQueries.up("mobile")]: {
    gridColumn: "auto",
  },
  input: {
    accentColor: theme.token.colorPrimary,
  },
}));

const VblankWeatherLabel = styled.span(({ theme }) => ({
  display: "block",
  color: theme.token.colorTextSecondary,
  [theme.mediaQueries.up("mobile")]: {
    display: "none",
  },
}));

const VblankProbability = styled.span({
  minWidth: 0,
});

export const FeebasVblankCountField = ({
  feebasCycle,
}: {
  feebasCycle: number | null;
}) => {
  const ids = useFieldIds();
  const [{ value, onBlur }, { error }, { setValue }] = useField<number | null>(
    "feebasVblankCount",
  );
  const distributions =
    feebasCycle == null
      ? []
      : getAllFeebasCycleDistributions(feebasCycle).filter(
          (distribution) => distribution.action === "OldRod",
        );
  const isSelectedCountAvailable = feebasVblankCounts.some(
    (count) => count === value,
  );
  const rows = feebasVblankCounts.map((count) => ({
    count,
    probabilities: feebasWeathers.map((weather) =>
      count == null
        ? "N/A"
        : formatProbability(
            distributions.find(
              (distribution) =>
                distribution.weather === weather &&
                distribution.feebas_vblank_count === count,
            )?.feebas_vblank_count_probability ?? 0,
          ),
    ),
  }));

  React.useEffect(() => {
    if (!isSelectedCountAvailable) {
      setValue(0);
    }
  }, [isSelectedCountAvailable, setValue]);

  return (
    <FieldFrame
      ids={ids}
      labelTarget="group"
      label="VBlank count during Feebas tile check"
      errorMessage={error}
    >
      {feebasCycle == null ? (
        <span>Select a Feebas fishing spot to see the likelihoods.</span>
      ) : (
        <VblankCountRows
          role="radiogroup"
          aria-labelledby={ids.labelId}
          aria-describedby={ids.helperId}
          aria-invalid={error != null}
          onBlur={onBlur}
        >
          <VblankCountHeader>
            <span>VBlanks</span>
            {feebasWeathers.map((weather) => (
              <span key={weather}>{weather}</span>
            ))}
          </VblankCountHeader>
          {rows.map(({ count, probabilities }) => (
            <VblankCountRow key={count ?? NONE} $selected={value === count}>
              <VblankCountChoice>
                <input
                  type="radio"
                  name={ids.inputId}
                  value={count ?? NONE}
                  checked={value === count}
                  aria-label={
                    count == null
                      ? "None"
                      : `${count} VBlanks. ${feebasWeathers.map((weather, index) => `${weather} ${probabilities[index]}`).join(", ")}`
                  }
                  onChange={() => setValue(count)}
                />
                {count ?? "None"}
              </VblankCountChoice>
              {feebasWeathers.map((weather, index) => (
                <VblankProbability key={weather}>
                  <VblankWeatherLabel>{weather}</VblankWeatherLabel>
                  {probabilities[index]}
                </VblankProbability>
              ))}
            </VblankCountRow>
          ))}
        </VblankCountRows>
      )}
    </FieldFrame>
  );
};
