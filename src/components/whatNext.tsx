import { Flex } from "./flex";
import { RouteSchema } from "~/routes/defs";
import { getGuide } from "~/guides";
import { List, ListItem } from "./list";
import { Link } from "./link";
import { Typography } from "./typography";

type WhatNextProps = {
  label?: string;
  slugs?: string[];
};

export const WhatNext = ({ slugs }: WhatNextProps) => {
  const slugList = slugs ?? [];

  if (slugList.length === 0) {
    return null;
  }

  const list = slugList
    .map((slug) => {
      const prefixedSlug = slug.startsWith("/") ? slug : `/${slug}`;
      const suffixedSlug = slug.endsWith("/") ? slug : `${prefixedSlug}/`;
      const link = RouteSchema.safeParse(suffixedSlug);
      if (!link.success) {
        return null;
      }
      const title = getGuide(link.data).meta.title;
      return (
        <ListItem>
          <Link href={link.data}>{title}</Link>
        </ListItem>
      );
    })
    .filter((item) => item != null);
  return (
    <Flex vertical>
      <Typography.Text fontSize={30} strong>
        🚀 What next?
      </Typography.Text>

      <Flex vertical>
        <List>{list}</List>
      </Flex>
    </Flex>
  );
};
