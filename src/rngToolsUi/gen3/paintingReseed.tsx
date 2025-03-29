import React from "react";
import { Input, Typography, Flex } from "~/components";

export const PaintingReseed = () => {
  const [seed, setSeed] = React.useState<number | null>(null);

  return (
    <Flex vertical gap={16}>
      <Typography.Text strong>Target Seed:</Typography.Text>
      <Input
        type="text"
        name="Seed"
        placeholder="abcd"
        onChange={(event) => {
          const desiredSeed = parseInt(event.target.value, 16);
          const targetSeed = desiredSeed - 30;
          const isValid =
            targetSeed > 0 && targetSeed <= 0xffff && !isNaN(targetSeed);
          const safeSeed = isValid ? targetSeed : null;
          setSeed(safeSeed);
        }}
      />
      <Typography.Text strong>
        Target Painting Timer: {seed?.toString(16).toUpperCase() ?? "None"}
      </Typography.Text>
    </Flex>
  );
};
