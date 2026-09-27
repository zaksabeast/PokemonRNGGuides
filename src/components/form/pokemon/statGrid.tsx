import React from "react";
import styled from "@emotion/styled";
import { z } from "zod";
import { get, uniq } from "lodash-es";
import { useFormState } from "react-hook-form";
import { useField } from "~/hooks/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { GenericForm } from "~/types/form";
import { Paths } from "~/types";
import { statLabels, stats, type Stat } from "~/types/stat";
import { NumberField } from "~/components/form/base/numberField";

type StatValues = Record<Stat, number | null>;

type StatGridForm = Record<string, StatValues>;

// Errors can be on the whole group or on individual stats
const errorSchema = z.object({ message: z.string() });
const errorsSchema = z
  .union([z.record(z.string(), errorSchema), errorSchema])
  .optional();

const getErrorMessages = (error: unknown): string[] => {
  const parsed = errorsSchema.safeParse(error);

  if (!parsed.success) {
    return ["Unknown error"];
  }

  if (parsed.data == null) {
    return [];
  }

  if (typeof parsed.data.message === "string") {
    return [parsed.data.message];
  }

  return Object.values(parsed.data).flatMap(getErrorMessages);
};

const Block = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  minWidth: 0,
});

const Heading = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

const Title = styled.div(({ theme }) => ({
  ...theme.typography.titleSmall,
  color: theme.token.colorText,
}));

const Description = styled.div(({ theme }) => ({
  ...theme.typography.bodySmall,
  color: theme.token.colorTextTertiary,
}));

const Grid = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 12,
  [theme.mediaQueries.up("mobile")]: {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  },
  [theme.mediaQueries.up("tablet")]: {
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
  },
}));

const ErrorText = styled.div(({ theme }) => ({
  ...theme.typography.bodySmall,
  paddingInline: 16,
  color: theme.token.colorError,
}));

type StatCellProps = {
  name: Paths<StatGridForm, number | null>;
  label: string;
  placeholder?: string;
  maxLength?: number;
};

const StatCell = ({ name, label, placeholder, maxLength }: StatCellProps) => {
  const [{ value, onBlur }, { error }, { setValue }] = useField<number | null>(
    name,
  );

  return (
    <NumberField
      name={name}
      label={label}
      numType="decimal"
      value={value}
      onBlur={onBlur}
      onChange={setValue}
      placeholder={placeholder}
      maxLength={maxLength}
      invalid={error != null}
    />
  );
};

export type StatGridProps<
  FormState extends GenericForm,
  Value extends StatValues,
> = {
  name: Paths<FormState, Value>;
  title?: React.ReactNode;
  description?: React.ReactNode;
  placeholder?: string;
  maxLength?: number;
};

export const StatGrid = <
  FormState extends GenericForm,
  Value extends StatValues = StatValues,
>({
  name,
  title,
  description,
  placeholder,
  maxLength,
}: StatGridProps<FormState, Value>) => {
  const t = useActiveRouteTranslations();
  const { errors } = useFormState();
  const errorMessages = uniq(getErrorMessages(get(errors, name)));

  return (
    <Block>
      {title != null && (
        <Heading>
          <Title>{title}</Title>
          {description != null && <Description>{description}</Description>}
        </Heading>
      )}
      <Grid>
        {stats.map((stat) => (
          <StatCell
            key={stat}
            name={`${name}.${stat}`}
            label={t[statLabels[stat]]}
            placeholder={placeholder}
            maxLength={maxLength}
          />
        ))}
      </Grid>
      {errorMessages.length > 0 && (
        <ErrorText role="alert">{errorMessages.join(", ")}</ErrorText>
      )}
    </Block>
  );
};
