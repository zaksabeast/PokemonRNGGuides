import { Tabs, TabsProps } from "antd";
import { Static3Searcher } from "~/rngToolsUi/gen3/static/staticSearcher";
import { Static3Generator } from "~/rngToolsUi/gen3/static/staticGenerator";
import { Static3Game } from "~/rngToolsUi/gen3/static/constants";

type Props = {
  game?: Static3Game;
};

const getItems = (game: Static3Game): TabsProps["items"] => [
  {
    key: "search",
    label: "Searcher",
    children: <Static3Searcher game={game} />,
  },
  {
    key: "generator",
    label: "Generator",
    children: <Static3Generator game={game} />,
  },
];

export const Static3 = ({ game = "emerald" }: Props) => {
  const items = getItems(game);
  return <Tabs defaultActiveKey="search" items={items} />;
};
