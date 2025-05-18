import { ResultColumn, Flex } from "~/components";
import { MarkdownA } from "~/markdownExports/components";
import { FormikRadio } from "~/components/radio";
import { rngTools, MirageIslandResult } from "~/rngTools";
import React from "react";
import { clamp } from "lodash-es";
import { z } from "zod";
import { Table, TableColumnsType } from "antd";
import { match } from "ts-pattern";

type Props = {
  jsonUrl: string;
};

type Importance = 1 | 2 | 3 | 4 | 5;
type Tag = "Emu" | "Research";

type TermInJson = {
  name: string;
  url?: string;
  aliases?: string[];
  importance: Importance;
  desc: string;
  tags?: Tag[];
};

type Term = {
  rowKey: string;
  name: string;
  url: string | null;
  aliases: string[];
  importance: Importance;
  desc: string;
  tags: Tag[];
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
        .with(1, () => "Niche")
        .with(2, () => "Low")
        .with(3, () => "Mid")
        .with(4, () => "High")
        .with(5, () => "Essential")
        .otherwise(() => "");
    },
  },
];

export const Glossary = ({ jsonUrl }: Props) => {
  const [terms, setTerms] = React.useState<Term[]>([]);

  React.useEffect(() => {
    fetch(jsonUrl).then(async (res) => {
      const termsInJson: TermInJson[] = await res.json();

      const terms: Term[] = termsInJson.map((rawTerm, i) => {
        return {
          rowKey: `${i}`,
          name: rawTerm.name,
          url: rawTerm.url ?? null,
          aliases: rawTerm.aliases ?? [],
          importance: rawTerm.importance,
          desc: rawTerm.desc,
          tags: rawTerm.tags ?? [],
        };
      });

      setTerms(terms);
    });
  }, [setTerms, jsonUrl]);

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={terms}
      rowKey={"rowKey"}
    />
  );
};
