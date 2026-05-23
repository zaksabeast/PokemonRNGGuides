import React from "react";
import { natureOptions, type PkmFilterFields } from "./pkmFilter";
import { Flex } from "./flex";
import { FormikSelect } from "./select";
import { FormikSwitch } from "./switch";
import { useField } from "~/hooks/form";

export const NatureFilterInput = () => {
  const [{ value: isSpecific }] = useField<
    PkmFilterFields["filter_nature_active"]
  >("filter_nature_active");
  const [{ value: selectedNatures }, , { setValue: setNature }] =
    useField<PkmFilterFields["filter_nature"]>("filter_nature");
  const lastSpecificNatures = React.useRef(selectedNatures);

  const updateIsSpecific = (nextIsSpecific: boolean) => {
    if (nextIsSpecific) {
      setNature(lastSpecificNatures.current);
    } else {
      lastSpecificNatures.current = selectedNatures;
      setNature([]);
    }
  };

  return (
    <Flex gap={8} vertical>
      <FormikSwitch<PkmFilterFields>
        name="filter_nature_active"
        onChange={updateIsSpecific}
      />
      {isSpecific && (
        <FormikSelect<PkmFilterFields, "filter_nature">
          name="filter_nature"
          mode="multiple"
          options={natureOptions}
          selectAllNoneButtons
        />
      )}
    </Flex>
  );
};
