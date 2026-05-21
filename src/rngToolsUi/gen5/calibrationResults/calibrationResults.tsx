import React from "react";
import {
  Button,
  Flex,
  Typography,
  ResultColumn,
  ResultTable,
} from "~/components";
import { CopyToClipboardButton } from "~/components/copyToClipboardButton";
import { TextArea } from "~/components/textArea";

type CalibrationRow = {
  index: number;
  seconds: string;
  vCount: string;
  timer0: string;
  gxStat: string;
  vFrame: string;
};

type Timer0CountRow = {
  timer0: string;
  count: number;
};

const calibrationColumns: ResultColumn<CalibrationRow>[] = [
  { title: "#", dataIndex: "index" },
  { title: "Seconds", dataIndex: "seconds" },
  { title: "VCount", dataIndex: "vCount", monospace: true },
  { title: "Timer0", dataIndex: "timer0", monospace: true },
  { title: "GxStat", dataIndex: "gxStat", monospace: true },
  { title: "VFrame", dataIndex: "vFrame" },
];

const timer0Columns: ResultColumn<Timer0CountRow>[] = [
  { title: "Timer0", dataIndex: "timer0", monospace: true },
  { title: "Count", dataIndex: "count" },
];

export const Gen5CalibrationResults = () => {
  const [input, setInput] = React.useState("");
  const [rows, setRows] = React.useState<CalibrationRow[]>([]);

  const addRows = React.useCallback(() => {
    const text = input.trim();
    if (text.length === 0) {
      return;
    }

    const newRows: Omit<CalibrationRow, "index">[] = text
      .split("\n")
      .map((line) => {
        const parts = line.trim().split(/\s+/);
        if (parts.length !== 5) {
          return null;
        }

        return {
          seconds: parts[0],
          vCount: parts[1],
          timer0: parts[2],
          gxStat: parts[3],
          vFrame: parts[4],
        };
      })
      .filter((row) => row != null);

    setRows((prev) => [
      ...prev,
      ...newRows.map((row, i) => ({ ...row, index: prev.length + i + 1 })),
    ]);
    setInput("");
  }, [input]);

  const counts = new Map<string, number>();
  for (const { timer0 } of rows) {
    counts.set(timer0, (counts.get(timer0) ?? 0) + 1);
  }
  const timer0Counts = [...counts.entries()].map(([timer0, count]) => ({
    timer0,
    count,
  }));

  let text = "Seconds\tVCount\tTimer0\tGxStat\tVFrame\n";
  for (const row of rows) {
    text +=
      [row.seconds, row.vCount, row.timer0, row.gxStat, row.vFrame].join("\t") +
      "\n";
  }
  const clipboardText = text;

  return (
    <Flex vertical gap={8}>
      <TextArea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="0 70 10e0 6 0"
      />
      <Flex gap={8} wrap="wrap">
        <Button trackerId="add_calibration_row" onClick={addRows}>
          Add Tests
        </Button>
      </Flex>

      <Typography.Title level={4}>Timer0 Counts</Typography.Title>
      <ResultTable<Timer0CountRow>
        columns={timer0Columns}
        dataSource={timer0Counts}
        rowKey="timer0"
        pagination={false}
      />

      <Typography.Title level={4}>Calibration Results</Typography.Title>
      <ResultTable<CalibrationRow>
        columns={calibrationColumns}
        dataSource={rows}
        rowKey="index"
        pagination={false}
      />
      <Flex>
        <CopyToClipboardButton
          text={clipboardText}
          disabled={rows.length === 0}
        />
      </Flex>
    </Flex>
  );
};
