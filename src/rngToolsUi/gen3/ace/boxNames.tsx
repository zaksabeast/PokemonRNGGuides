type Props = {
  boxNames: string[];
};

const longestBoxNameLength = 8;
const spacedBoxNameLength = longestBoxNameLength * 2 - 1;

export const BoxNames = ({ boxNames }: Props) => {
  return (
    <pre style={{ fontFamily: "monospace" }}>
      {boxNames.map(formatBoxNameLine).join("\n")}
    </pre>
  );
};

const formatBoxNameLine = (boxName: string, i: number) => {
  const spacedBoxName = [...boxName]
    .map((char) => (char === " " ? "_" : char))
    .join(" ");

  return `Box ${(i + 1).toString().padStart(2)}: ${spacedBoxName.padEnd(spacedBoxNameLength)}   [${boxName}]`;
};
