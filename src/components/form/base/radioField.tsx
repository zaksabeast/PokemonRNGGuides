import React from "react";
import styled from "@emotion/styled";
import * as tst from "ts-toolbelt";
import { useField } from "~/hooks/form";
import { FormControlledProps, GenericForm } from "~/types/form";
import { Path, Paths } from "~/types";
import { styledPropGuard } from "~/utils/styled";
import { LabeledFieldProps, FieldFrame } from "./field";
import { useFieldIds } from "./hooks";

type OptionValue = string | number | null;

export type RadioOption<Value extends OptionValue> = {
  label: React.ReactNode;
  value: Value;
  disabled?: boolean;
};

export type RadioCellSize = "number" | "word";

const minCellWidths = {
  number: 56,
  word: 96,
} satisfies Record<RadioCellSize, number>;

const GRID_LINE_WIDTH = 1;

const Outline = styled(
  "div",
  styledPropGuard,
)<{ $invalid: boolean; $cellSize: RadioCellSize; $optionCount: number }>(
  ({ theme, $invalid, $cellSize, $optionCount }) => ({
    boxSizing: "border-box",
    borderWidth: GRID_LINE_WIDTH,
    borderStyle: "solid",
    borderColor: $invalid ? theme.token.colorError : theme.token.colorBorder,
    borderRadius: theme.shape.medium,
    overflow: "hidden",
    ...($cellSize === "number"
      ? {
          maxWidth: $optionCount * minCellWidths.number + GRID_LINE_WIDTH * 2,
        }
      : {
          [theme.mediaQueries.up("mobile")]: {
            width: "fit-content",
            maxWidth: "100%",
          },
        }),
  }),
);

// Every cell draws its own right and bottom line, and the grid is pulled under the outline
// so only lines between options show, even when the last row is short
const Grid = styled(
  "div",
  styledPropGuard,
)<{ $cellSize: RadioCellSize; $optionCount: number }>(
  ({ theme, $cellSize, $optionCount }) => ({
    display: "grid",
    gridTemplateColumns:
      $cellSize === "number"
        ? `repeat(auto-fill, minmax(${minCellWidths.number}px, 1fr))`
        : `repeat(auto-fit, minmax(${minCellWidths.word}px, 1fr))`,
    marginRight: -GRID_LINE_WIDTH,
    marginBottom: -GRID_LINE_WIDTH,
    ...($cellSize === "word" && {
      // One row sized by its content, with every option as wide as the widest label
      [theme.mediaQueries.up("mobile")]: {
        gridTemplateColumns: `repeat(${Math.max($optionCount, 1)}, minmax(${minCellWidths.word}px, 1fr))`,
      },
    }),
  }),
);

const cellPaddings = {
  number: 8,
  word: 16,
} satisfies Record<RadioCellSize, number>;

const Cell = styled(
  "label",
  styledPropGuard,
)<{ $cellSize: RadioCellSize }>(({ theme, $cellSize }) => ({
  ...theme.interactive,
  ...theme.typography.labelLarge,
  fontWeight: 400,
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: theme.size.touchTarget,
  [theme.mediaQueries.dense]: {
    minHeight: theme.size.dense.touchTarget,
  },
  paddingInline: cellPaddings[$cellSize],
  textAlign: "center",
  color: theme.token.colorText,
  borderStyle: "solid",
  borderWidth: 0,
  borderRightWidth: GRID_LINE_WIDTH,
  borderBottomWidth: GRID_LINE_WIDTH,
  borderColor: theme.token.colorBorderSecondary,
  ":hover": {
    backgroundColor: theme.token.colorStateLayerHover,
  },
  ":has(input:checked)": {
    fontWeight: 500,
    color: theme.token.colorPrimaryActive,
    backgroundColor: theme.token.colorPrimaryBg,
  },
  ":has(input:focus-visible)": {
    boxShadow: `inset 0 0 0 2px ${theme.token.colorPrimary}`,
  },
  ":has(input:disabled)": {
    color: theme.token.colorTextDisabled,
    backgroundColor: "transparent",
    cursor: "not-allowed",
  },
}));

// Stacks the label on a hidden bold copy, so every cell is always as wide as its selected
// state and selecting an option doesn't resize the columns
const CellLabel = styled.span({
  display: "grid",
  "& > *": {
    gridArea: "1 / 1",
  },
});

const BoldSizer = styled.span({
  fontWeight: 500,
  visibility: "hidden",
});

const HiddenInput = styled.input({
  position: "absolute",
  opacity: 0,
  width: 1,
  height: 1,
  margin: 0,
  pointerEvents: "none",
});

export type RadioFieldProps<Value extends OptionValue> = LabeledFieldProps & {
  value: Value;
  options: readonly RadioOption<Value>[];
  onChange?: (value: Value) => void;
  cellSize: RadioCellSize;
  name?: string;
  disabled?: boolean;
  onBlur?: () => void;
};

export const RadioField = <Value extends OptionValue>({
  label,
  tooltip,
  helperText,
  errorMessage,
  invalid: _invalid,
  value,
  options,
  onChange,
  cellSize,
  name,
  disabled,
  onBlur,
}: RadioFieldProps<Value>) => {
  const ids = useFieldIds();
  const invalid = _invalid === true || errorMessage != null;

  return (
    <FieldFrame
      ids={ids}
      labelTarget="group"
      label={label}
      tooltip={tooltip}
      helperText={helperText}
      errorMessage={errorMessage}
      invalid={invalid}
    >
      <Outline
        $invalid={invalid}
        $cellSize={cellSize}
        $optionCount={options.length}
      >
        <Grid
          role="radiogroup"
          aria-labelledby={ids.labelId}
          aria-describedby={ids.helperId}
          aria-invalid={invalid}
          $cellSize={cellSize}
          $optionCount={options.length}
          onBlur={onBlur}
        >
          {options.map((option) => (
            <Cell key={String(option.value)} $cellSize={cellSize}>
              <HiddenInput
                type="radio"
                name={name ?? ids.inputId}
                value={String(option.value)}
                checked={option.value === value}
                disabled={disabled === true || option.disabled === true}
                onChange={() => onChange?.(option.value)}
              />
              <CellLabel>
                <span>{option.label}</span>
                <BoldSizer aria-hidden>{option.label}</BoldSizer>
              </CellLabel>
            </Cell>
          ))}
        </Grid>
      </Outline>
    </FieldFrame>
  );
};

type FormRadioFieldBaseProps = Omit<
  RadioFieldProps<OptionValue>,
  FormControlledProps | "options"
>;

type FormRadioFieldKey<FormState extends GenericForm> = Paths<
  FormState,
  OptionValue
>;

// A union with one member per field, so options are checked against the named field
type FormRadioFieldProps<
  FormState extends GenericForm,
  FieldKey extends FormRadioFieldKey<FormState>,
> = {
  [Key in FieldKey]: tst.O.Merge<
    FormRadioFieldBaseProps,
    {
      name: Key;
      options: Path<FormState, Key> extends OptionValue
        ? readonly RadioOption<Path<FormState, Key>>[]
        : never;
    }
  >;
}[FieldKey];

type InternalFormRadioFieldProps = tst.O.Merge<
  FormRadioFieldBaseProps,
  {
    name: string;
    options: readonly RadioOption<OptionValue>[];
  }
>;

const InternalFormRadioField = ({
  name,
  options,
  ...props
}: InternalFormRadioFieldProps) => {
  const [{ value, onBlur }, { error }, { setValue }] =
    useField<OptionValue>(name);

  const isValidValue = options.some((option) => option.value === value);

  // Keep the value on a real option, e.g. when the options change
  React.useEffect(() => {
    if (options.length > 0 && !isValidValue) {
      setValue(options[0].value);
    }
  }, [options, isValidValue, setValue]);

  return (
    <RadioField
      {...props}
      name={name}
      value={value}
      options={options}
      onBlur={onBlur}
      onChange={setValue}
      errorMessage={error}
    />
  );
};

type FormRadioFieldComponent = <
  FormState extends GenericForm,
  FieldKey extends FormRadioFieldKey<FormState> = FormRadioFieldKey<FormState>,
>(
  props: FormRadioFieldProps<FormState, FieldKey>,
) => React.JSX.Element;

// The public props tie options to the field's type, which TS can't follow
// internally, so the implementation works with loosely typed values.
export const FormRadioField = InternalFormRadioField as FormRadioFieldComponent;
