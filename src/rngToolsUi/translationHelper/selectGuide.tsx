import { Flex, Typography, Tag } from "~/components";
import { Tree, TreeDataNode } from "antd";
import { Guide, guides } from "~/guides";
import { RouteSchema } from "~/routes/defs";
import { map, groupBy, sortBy } from "lodash-es";
import { useTranslationState } from "./state";
import { useCurrentStep } from "~/components/stepper/state";

const getFirstCategory = (guide: Guide) => guide.meta.categories[0];
const guidesByCategory = groupBy(
  sortBy(guides, getFirstCategory),
  getFirstCategory,
);

const guideTree: TreeDataNode[] = map(guidesByCategory, (guides, category) => ({
  key: category,
  title: category,
  selectable: false,
  autoExpandParent: true,
  children: guides
    .filter(
      (guide) =>
        guide.meta.translation == null && !guide.meta.hideFromNavDrawer,
    )
    .map((guide) => ({
      key: guide.meta.slug,
      title: (
        <Flex gap={16}>
          <Typography.Text>{guide.meta.title}</Typography.Text>
          <Flex>
            {Object.keys(guide.meta.translations ?? {})
              ?.filter((language) => language !== "en")
              .map((language) => (
                <Tag key={language}>{language.toUpperCase()}</Tag>
              ))}
          </Flex>
        </Flex>
      ),
    })),
}));

const treeData: TreeDataNode[] = [
  {
    key: "root",
    title: "PokemonRNG.com",
    selectable: false,
    children: guideTree,
  },
];

export const TranslationHelperSelectGuide = () => {
  const [{ selectedGuide }, setState] = useTranslationState();
  const [, setCurrentStep] = useCurrentStep();

  return (
    <Flex vertical gap={20}>
      <Tree
        selectedKeys={selectedGuide == null ? [] : [selectedGuide]}
        onSelect={(key) => {
          const parsed = RouteSchema.safeParse(key[0]);
          if (!parsed.success) {
            return;
          }
          setState({
            type: "guide",
            selectedGuide: parsed.data,
          });
          setCurrentStep((prev) => prev + 1);
        }}
        treeData={treeData}
      />
    </Flex>
  );
};
