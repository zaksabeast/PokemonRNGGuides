import React from "react";
import {
  FormCard,
  FormSection,
  FormSummary,
  TextField,
} from "~/components/form";

export const PaintingSeedToEmuTimer = () => {
  const [seedText, setSeedText] = React.useState("");

  const desiredSeed = parseInt(seedText, 16);
  const targetSeed = desiredSeed - 30;
  const isValid = targetSeed > 0 && targetSeed <= 0xffff && !isNaN(targetSeed);
  const seed = isValid ? targetSeed : null;

  return (
    <FormCard>
      <FormSection>
        <TextField
          name="Seed"
          label="Target Seed"
          placeholder="abcd"
          value={seedText}
          onChange={setSeedText}
        />
        <FormSummary
          rows={[
            {
              label: "Target Painting Timer",
              value: seed?.toString(16).toUpperCase() ?? "None",
            },
          ]}
        />
      </FormSection>
    </FormCard>
  );
};
