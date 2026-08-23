import React from "react";
import { z } from "zod";
import { uniqueId } from "lodash-es";
import {
  Typography,
  NumberInput,
  FormikNumberInput,
  type Field,
  FormFieldTable,
  RngToolForm,
  type RngToolSubmit,
  Flex,
} from "~/components";
import {
  rngTools,
  type VoltorbFlipBoard as TVoltorbFlipBoard,
  type VoltorbFlipLevel,
} from "~/rngTools";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { gen4StateAtom } from "../shared/state";
import { useAtom } from "jotai";
import { VoltorbFlipBoard } from "./board/board";
import { BoardSizeContainer } from "./board/boardSizeContainer";

type Result = { id: string; board: TVoltorbFlipBoard };

const Validator = z.object({
  boardCount: z.number().int().min(1).max(100),
});

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  boardCount: 10,
};

type FieldsProps = {
  initialSeed: number | undefined;
};

const Fields = ({ initialSeed }: FieldsProps) => {
  const t = useActiveRouteTranslations();

  const fields: Field[] = [
    {
      label: t["Seed"],
      input: (
        <NumberInput
          disabled
          name="seed"
          numType="hex"
          errorMessage={
            initialSeed == null ? "Find your seed first" : undefined
          }
          value={initialSeed}
        />
      ),
    },
    {
      label: t["Board Count"],
      input: (
        <FormikNumberInput<FormState> name="boardCount" numType="decimal" />
      ),
    },
  ];

  return <FormFieldTable fields={fields} />;
};

const levelProgression: VoltorbFlipLevel[] = [
  "Lvl1",
  // User quits first level to get seed, so level 1 is repeated
  "Lvl1",
  "Lvl2",
  "Lvl3",
  "Lvl4",
  "Lvl5",
  // After so many perfect levels, the game jumps to 8
  "Lvl8",
];

const getLevel = (index: number): VoltorbFlipLevel => {
  return levelProgression[index] ?? "Lvl8";
};

const levelMap: Record<VoltorbFlipLevel, number> = {
  Lvl1: 1,
  Lvl2: 2,
  Lvl3: 3,
  Lvl4: 4,
  Lvl5: 5,
  Lvl6: 6,
  Lvl7: 7,
  Lvl8: 8,
};

// Skip the first board because the user quits it to get the seed, so it is not a valid board to display
const seedBoardSkip = 1;

export const GenerateVoltorbFlipBoards = () => {
  const [state] = useAtom(gen4StateAtom);
  const [results, setResults] = React.useState<Result[]>([]);

  const initialSeed = state.target.seedTime?.seed;

  const onSubmit: RngToolSubmit<FormState> = async (opts) => {
    const boardLevels = new Array(opts.boardCount + seedBoardSkip)
      .fill(null)
      // The level stays on 8 once the player reaches it
      .map((_, i) => getLevel(i));

    const res = await rngTools.generate_voltorb_flip_boards({
      board_levels: boardLevels,
      quit_first_board: true,
      seed: state.target.seedTime?.seed ?? 0,
    });
    const mapped = res.map((board) => ({ board, id: uniqueId() }));
    setResults(mapped);
  };

  return (
    <>
      <RngToolForm<FormState, Result>
        initialValues={initialValues}
        validationSchema={Validator}
        onSubmit={onSubmit}
        rowKey="id"
        submitTrackerId="voltorb_flip_board_generate"
        disableGenerate={initialSeed == null}
      >
        <Fields initialSeed={initialSeed} />
      </RngToolForm>

      <Flex vertical gap={32}>
        {results.slice(seedBoardSkip).map((result, i) => (
          <Flex vertical gap={8} key={result.id}>
            <Typography.Title level={2} m={0}>
              Board {i + 1} – Level: {levelMap[getLevel(i + seedBoardSkip)]}
            </Typography.Title>
            <BoardSizeContainer>
              <VoltorbFlipBoard cards={result.board.cards} />
            </BoardSizeContainer>
          </Flex>
        ))}
      </Flex>
    </>
  );
};
