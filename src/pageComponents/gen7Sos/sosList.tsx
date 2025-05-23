import React from "react";
import { Table } from "antd";
import { Input, Icon } from "~/components";
import { sosCallRates } from "./sosCallRates";
import styled from "@emotion/styled";

const StyledInput = styled(Input)({
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
      <StyledInput
        placeholder="Search Pokemon name"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        suffix={<Icon name="OutlineSearch" color="Primary" />}
      />
      <Table columns={columns} dataSource={filteredData} rowKey="dexnum" />
    </div>
  );
};
