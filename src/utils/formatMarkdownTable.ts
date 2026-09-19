const formatRow = ({
  cells,
  widths,
}: {
  cells: string[];
  widths: number[];
}) => {
  const paddedCells = widths.map((width, i) => {
    return (cells[i] ?? "").padStart(width);
  });

  return `| ${paddedCells.join(" | ")} |`;
};

export const formatMarkdownTable = (headers: string[], rows: string[][]) => {
  const widths = headers.map((header, i) => {
    const rowLengths = rows.map((row) => row[i]?.length ?? 0);
    return Math.max(header.length, ...rowLengths);
  });

  const headerSeparator = `| ${widths.map((width) => "-".repeat(width)).join(" | ")} |`;

  const formattedRows = rows.map((row) => formatRow({ widths, cells: row }));

  return [
    formatRow({ widths, cells: headers }),
    headerSeparator,
    ...formattedRows,
  ].join("\n");
};
