import { Flex, Select, Typography } from "~/components";
import { match } from "ts-pattern";
import { Gen5StandardTimer } from "./standard";
import { Gen5CGearTimer } from "./cgear";
import { Gen5EntralinkTimer } from "./entralink";
import { Gen5EntralinkPlusTimer } from "./entralinkPlus";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { z } from "zod";

const Gen5TimerModeSchema = z.enum([
  "standard",
  "cgear",
  "entralink",
  "entralink_plus",
]);

type Gen5TimerMode = z.infer<typeof Gen5TimerModeSchema>;

const gen5TimerModeAtom = atomWithPersistence(
  "gen5TimerMode",
  z.object({
    mode: Gen5TimerModeSchema,
  }),
  { mode: "standard" },
);

export const Gen5Timer = () => {
  const [{ mode }, setMode] = useAtom(gen5TimerModeAtom);
  const timer = match(mode)
    .with("standard", () => <Gen5StandardTimer />)
    .with("cgear", () => <Gen5CGearTimer />)
    .with("entralink", () => <Gen5EntralinkTimer />)
    .with("entralink_plus", () => <Gen5EntralinkPlusTimer />)
    .exhaustive();

  return (
    <Flex vertical gap={32}>
      <Flex gap={16} align="center">
        <Typography.Text strong>Mode</Typography.Text>
        <Select<Gen5TimerMode>
          fullFlex
          value={mode}
          name="gen5-timer-mode"
          onChange={(mode) => setMode({ mode })}
          options={[
            {
              label: "Standard",
              value: "standard",
            },
            {
              label: "C-Gear",
              value: "cgear",
            },
            {
              label: "Entralink",
              value: "entralink",
            },
            {
              label: "Entralink+",
              value: "entralink_plus",
            },
          ]}
        />
      </Flex>

      {timer}
    </Flex>
  );
};
