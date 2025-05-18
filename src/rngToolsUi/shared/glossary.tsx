import {
  Field,
  RngToolForm,
  ResultColumn,
  RngToolSubmit,
  Link,
  FormikNumberInput,
} from "~/components";
import { FormikRadio } from "~/components/radio";
import { rngTools, MirageIslandResult } from "~/rngTools";
import React from "react";
import { clamp } from "lodash-es";
import { z } from "zod";
import { Table, TableProps } from "antd";
import { match } from "ts-pattern";

type Props = {
  jsonUrl: string;
};

type Importance = "low" | "mid" | "high" | "veryHigh";
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

const columns: ResultColumn<Term>[] = [
  {
    title: "Name",
    dataIndex: "name",
    render: (name, values) => {
      if (!values.url) {
        return name;
      }
      return <Link href={values.url}>{name}</Link>;
    },
  },
  /*{
    title: "Aliases",
    dataIndex: "aliases",
    render: (val) => {
      if (!val.length) {
        return "";
      }
      return `(${val.join(", ")})`;
    },
  },
  {
    title: "Importance",
    dataIndex: "importance",
    render: (val) => {
      return match(val)
        .with("low", () => "Low")
        .with("mid", () => "Mid")
        .with("high", () => "High")
        .with("veryHigh", () => "Essential")
        .otherwise(() => "");
    },
  },*/
  {
    title: "Description",
    dataIndex: "desc",
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
