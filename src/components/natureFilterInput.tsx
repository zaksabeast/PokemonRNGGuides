import { getNatureLabelProps, type PkmFilterFields } from "./pkmFilter";
import { Flex } from "./flex";
import { FormikSelect } from "./select";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";

export const NatureFilterInput = () => {
  const t = useActiveRouteTranslations();
  return (
    <Flex gap={20} vertical>
      <FormikSelect<PkmFilterFields, "filter_nature">
        name="filter_nature"
        mode="multiple"
        {...getNatureLabelProps(t)}
        selectAllNoneButtons
        placeholder={t["Any"]}
      />
    </Flex>
  );
};
