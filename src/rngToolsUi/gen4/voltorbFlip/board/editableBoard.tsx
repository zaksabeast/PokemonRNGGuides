import { type VoltorbFlipCard } from "~/rngTools";
import { VoltorbFlipBoard } from "./board";

const nextVariant = {
  One: "Two",
  Two: "Three",
  Three: "Voltorb",
  Voltorb: "One",
} as const satisfies Record<VoltorbFlipCard, VoltorbFlipCard>;

const nextCardVariant = (current: VoltorbFlipCard | null): VoltorbFlipCard => {
  if (current === null) {
    return "One";
  }
  return nextVariant[current];
};

type EditableBoardProps = {
  cards: (VoltorbFlipCard | null)[];
  setCards: (cards: (VoltorbFlipCard | null)[]) => void;
};

export const EditableBoard = ({ cards, setCards }: EditableBoardProps) => {
  return (
    <VoltorbFlipBoard
      cards={cards}
      onClickCard={(index) => {
        const newCards = [...cards];
        newCards[index] = nextCardVariant(newCards[index]);
        setCards(newCards);
      }}
    />
  );
};
