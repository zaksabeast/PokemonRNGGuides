import React from "react";
import { z } from "zod";
import { uniqueId } from "lodash-es";
import { rngTools, type SeedTime4, type VoltorbFlipCard } from "~/rngTools";
import {
  RngToolForm,
  FormikNumberInput,
  MinMaxContainer,
  FormFieldTable,
  type Field,
  type RngToolSubmit,
  ResultColumn,
  Button,
} from "~/components";
import { FormikDatePicker, FormikTimePicker } from "~/components/datePicker";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import {
  rngDate,
  RngDateSchema,
  rngTime,
  RngTimeSchema,
  addRngTime,
  formatRngDateTime,
} from "~/utils/time";
import { Translations } from "~/translations";
import { useCurrentStep } from "~/components/stepper/state";
import { useAtom, atom } from "jotai";
import { gen4StateAtom } from "../shared/state";
import { EditableBoard } from "./board/editableBoard";
import { formatHex } from "~/utils/formatHex";
import { BoardSizeContainer } from "./board/boardSizeContainer";

const cardsAtom = atom<(VoltorbFlipCard | null)[]>(new Array(25).fill(null));

type Result = SeedTime4 & { id: string };

const Validator = z.object({
  date: RngDateSchema,
  time: RngTimeSchema,
  minDelay: z.number().int().min(0),
  maxDelay: z.number().int().min(0),
});

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  date: rngDate(),
  time: rngTime(),
  minDelay: 400,
  maxDelay: 2000,
};

const Fields = () => {
  const t = useActiveRouteTranslations();
  const [cards, setCards] = useAtom(cardsAtom);

  const fields: Field[] = [
    {
      label: t["Date"],
      input: <FormikDatePicker<FormState> name="date" />,
    },
    {
      label: t["Time"],
      input: <FormikTimePicker<FormState> name="time" />,
    },
    {
      label: t["Delay"],
      input: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState> name="minDelay" numType="decimal" />
          }
          max={
            <FormikNumberInput<FormState> name="maxDelay" numType="decimal" />
          }
        />
      ),
    },
    {
      label: t["Board"],
      direction: "column",
      input: (
        <BoardSizeContainer>
          <EditableBoard cards={cards} setCards={setCards} />
        </BoardSizeContainer>
      ),
    },
  ];

  return <FormFieldTable fields={fields} />;
};

type SelectButtonProps = {
  seedTime: SeedTime4;
};

const SelectButton = ({ seedTime }: SelectButtonProps) => {
  const [, setState] = useAtom(gen4StateAtom);
  const [, setCurrentStep] = useCurrentStep();

  return (
    <Button
      trackerId="voltorb_flip_select_seed"
      onClick={() => {
        setState({ target: { seedTime } });
        setCurrentStep((step) => step + 1);
      }}
    >
      Select
    </Button>
  );
};

const getColumns = (t: Translations): ResultColumn<Result>[] => [
  {
    title: t["Select"],
    dataIndex: "id",
    render: (_, seedTime) => <SelectButton seedTime={seedTime} />,
  },
  {
    title: t["Seed"],
    dataIndex: "seed",
    render: (seed) => formatHex(seed),
  },
  {
    title: t["Date/Time"],
    dataIndex: "datetime",
    render: (datetime) => formatRngDateTime(datetime),
  },
  {
    title: t["Delay"],
    dataIndex: "delay",
  },
];

export const FindVoltorbFlipSeed = () => {
  const [results, setResults] = React.useState<Result[]>([]);
  const [cards] = useAtom(cardsAtom);

  const onSubmit: RngToolSubmit<FormState> = async (opts) => {
    const res = await rngTools.find_voltorb_flip_seed({
      datetime: addRngTime(opts.date, {
        ...opts.time,
        second: 0,
      }),
      min_delay: opts.minDelay,
      max_delay: opts.maxDelay,
      // Always use the first board so we know the RNG hasn't advanced
      level: "Lvl1",
      seconds_increment: 60,
      board: { cards: cards.map((card) => card ?? "One") },
    });
    const mapped = res.map((seedTime) => ({ ...seedTime, id: uniqueId() }));
    setResults(mapped);
  };

  return (
    <RngToolForm<FormState, Result>
      getColumns={getColumns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      rowKey="id"
      submitTrackerId="voltorb_flip_seed_search"
      disableGenerate={cards.some((card) => card == null)}
    >
      <Fields />
    </RngToolForm>
  );
};
