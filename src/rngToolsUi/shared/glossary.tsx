import { Flex } from "~/components";
import { MarkdownA } from "~/markdownExports/components";
import React from "react";
import { Table, TableColumnsType } from "antd";
import { match } from "ts-pattern";

type JsonFileId = "gen3";

type Props = {
  jsonFileId: JsonFileId;
};

type Importance = 1 | 2 | 3 | 4 | 5;

const isImportance = (num: number): num is Importance => {
  return [1, 2, 3, 4, 5].includes(num);
};

type TermInJson = {
  name: string;
  url?: string;
  aliases?: string[];
  importance: number;
  desc: string;
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
      if (!values.url) {
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
      if (!record.aliases.length) {
        return value;
      }
      return (
        <Flex vertical gap={10}>
          <div>{value}</div>
          <div>{"Also known as: " + record.aliases.join(", ")}</div>
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

const importTerms = async (jsonFileId: string) => {
  if (jsonFileId === "gen3") {
    return (await import("../../assets/glossary_gen3.json")).default;
  }
  return [];
};

export const Glossary = ({ jsonFileId }: Props) => {
  const [terms, setTerms] = React.useState<Term[]>([]);

  React.useEffect(() => {
    importTerms(jsonFileId).then((res) => {
      const termsInJson: TermInJson[] = res;

      const terms: Term[] = termsInJson.map((rawTerm, i) => {
        return {
          rowKey: `${i}`,
          name: rawTerm.name,
          url: rawTerm.url ?? null,
          aliases: rawTerm.aliases ?? [],
          importance: isImportance(rawTerm.importance) ? rawTerm.importance : 1,
          desc: rawTerm.desc,
        };
      });

      setTerms(terms);
    });
  }, [setTerms, jsonFileId]);

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={terms}
      rowKey={"rowKey"}
    />
  );
};
