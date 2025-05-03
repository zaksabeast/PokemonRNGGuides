import { match } from "ts-pattern";
import { getGuide } from "~/guides";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { GuideLayout } from "~/layouts/guide";
import { TitledLayout } from "~/layouts/titled";

export const MarkdownScreen = () => {
  const [route] = useActiveRoute();
  const { Guide, meta } = getGuide(route);
  return match(meta.layout)
    .with("guide", () => (
      <GuideLayout guideMeta={meta}>
        <Guide />
      </GuideLayout>
    ))
    .with("titled", () => (
      <TitledLayout guideMeta={meta}>
        <Guide />
      </TitledLayout>
    ))
    .exhaustive();
};
