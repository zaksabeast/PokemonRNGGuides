import React from "react";
import { Table } from "antd";
import { TextField } from "~/components/form";
import { sosCallRates } from "./sosCallRates";
import styled from "@emotion/styled";

const SearchFieldLayout = styled.div({
  marginBottom: 16,
  maxWidth: 300,
});

const columns = [
  {
    title: "Dex #",
    dataIndex: "dexnum",
    key: "dexnum",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "SM",
    dataIndex: "sm_call_rate",
    key: "sm_call_rate",
  },
  {
    title: "USUM",
    dataIndex: "usum_call_rate",
    key: "usum_call_rate",
  },
];
export const Gen7SosList = () => {
  const [searchText, setSearchText] = React.useState("");

  const filteredData = sosCallRates.filter((entry) =>
    entry.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div>
      <SearchFieldLayout>
        <TextField
          label="Pokemon"
          placeholder="Search Pokemon name"
          trailingIcon="OutlineSearch"
          value={searchText}
          onChange={setSearchText}
        />
      </SearchFieldLayout>
      <Table columns={columns} dataSource={filteredData} rowKey="dexnum" />
    </div>
  );
};
