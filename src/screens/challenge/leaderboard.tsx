import React from "react";
import { Flex, Typography, Button } from "~/components";
import { Table } from "antd";
import { Dayjs } from "dayjs";

export type LeaderboardRank =
  | "None"
  | "Beginner"
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Legend";

type LeaderboardItem = {
  id: string;
  rank: LeaderboardRank;
  displayName: React.ReactNode;
  completionPercent: number;
  lastUpdated: Dayjs;
};

const items: LeaderboardItem[] = [];

export const Leaderboard = () => {
  const [showedInterested, setShowedInterested] = React.useState(false);
  const interestLabel = showedInterested
    ? "Thanks for your interest!"
    : "Show interest in this feature!";

  return (
    <Flex vertical gap={16}>
      <Typography.Text strong>Coming soon!</Typography.Text>
      <Typography.Text>Want this feature built faster?</Typography.Text>
      <Button
        trackerId="show_leaderboard_interest"
        type="primary"
        disabled={showedInterested}
        onClick={() => setShowedInterested(true)}
      >
        {interestLabel}
      </Button>
      <Table
        columns={[
          {
            title: "Name",
            dataIndex: "displayName",
            key: "displayName",
          },
          {
            title: "Rank",
            dataIndex: "rank",
            key: "rank",
          },

          {
            title: "Completion Percentage",
            dataIndex: "completionPercent",
            key: "completionPercent",
            render: (value: number) => `${value}%`,
          },
          {
            title: "Last Updated",
            dataIndex: "lastUpdated",
            key: "lastUpdated",
            render: (value: Dayjs) => value.format("YYYY-MM-DD"),
          },
        ]}
        dataSource={items}
        pagination={false}
        rowKey="id"
      />
    </Flex>
  );
};
