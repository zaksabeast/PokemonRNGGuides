import React, { useState } from "react";
import { natureOptions, type PkmFilterFields } from "./pkmFilter";
import { Flex } from "./flex";
import { FormikSelect } from "./select";
import { Switch } from "./switch";
import { useField } from "~/hooks/form";

export const NatureFilterInput = () => {
  const [active, setActive] = useState(false);

  const [{ value: selectedNatures }, , { setValue: setNature }] =
    useField<PkmFilterFields["filter_nature"]>("filter_nature");
  const lastSpecificNatures = React.useRef(selectedNatures);

  const updateIsSpecific = (activeNewVal: boolean) => {
    setActive(activeNewVal);
    if (activeNewVal) {
      setNature(lastSpecificNatures.current);
    } else {
      lastSpecificNatures.current = selectedNatures;
      setNature([]);
    }
  };

  return (
    <Flex gap={20} vertical>
      <Flex vertical align="start">
        <Switch value={active} onChange={updateIsSpecific} />
      </Flex>
      {active && (
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
