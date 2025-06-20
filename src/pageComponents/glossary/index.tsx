import { Flex } from "~/components";
import { MarkdownA } from "~/markdownExports/components";
import React from "react";
import { Table, TableColumnsType } from "antd";
import { match } from "ts-pattern";
import { importance, Importance } from "./types";
import { memoize } from "lodash-es";

type JsonFileId = "gen3" | "it-gen3";

const importTerms = memoize(async (jsonFileId: JsonFileId) => {
  return match(jsonFileId)
    .with("it-gen3", async () => (await import("./terms/it-gen3")).gen3Glossary)
    .with("gen3", async () => (await import("./terms/gen3")).gen3Glossary)
    .otherwise(() => []);
});

type Props = {
  jsonFileId: JsonFileId;
};

const isImportance = (num: number): num is Importance => {
  // Loosen types for check
  return (importance as Readonly<number[]>).includes(num);
};

type Term = {
  rowKey: string;
  name: string;
  url: string | null;
  aliases: string[];
  importance: Importance;
  desc: string;
};

const columns: TableColumnsType<Term> = [
  {
    title: "Name",
    dataIndex: "name",
    render: (name, values) => {
      if (values.url == null) {
        return name;
      }
      return <MarkdownA href={values.url}>{name}</MarkdownA>;
    },
    showSorterTooltip: { target: "full-header" },
    sorter: (left, right) => left.name.localeCompare(right.name),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Description",
    dataIndex: "desc",
    render: (value, record) => {
      if (record.aliases.length === 0) {
        return value;
      }
      return (
        <Flex vertical gap={10}>
          <div>{value}</div>
          <div>Also known as: {record.aliases.join(", ")}</div>
        </Flex>
      );
    },
  },
  {
    title: "Importance",
    dataIndex: "importance",
    render: (val) => {
      return match(val)
        .with(1, () => "Minor")
        .with(2, () => "Low")
        .with(3, () => "Mid")
        .with(4, () => "High")
        .with(5, () => "Essential")
        .otherwise(() => "");
    },
  },
];

export const Glossary = ({ jsonFileId }: Props) => {
  const baseTerms = React.use(importTerms(jsonFileId));

  const terms: Term[] = baseTerms.map((rawTerm, i) => {
    return {
      rowKey: `${i}`,
      name: rawTerm.name,
      url: rawTerm.url ?? null,
      aliases: rawTerm.aliases ?? [],
      importance: isImportance(rawTerm.importance) ? rawTerm.importance : 1,
      desc: rawTerm.desc,
    };
  });

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={terms}
      rowKey="rowKey"
    />
  );
};
