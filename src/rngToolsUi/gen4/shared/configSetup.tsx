import {
  Field,
  FormFieldTable,
  Select,
  RadioGroup,
  Flex,
  Link,
} from "~/components";
import { gen4StateAtom } from "./state";
import {
  DpPt,
  Gen4GameVersions,
  Gen4GameVersion,
  Gen4ConsoleSchema,
} from "../gen4types";
import { useAtom } from "jotai";
import { toOptions } from "~/utils/options";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";

type Gen4ConfigSetupProps = {
  onlyDppt?: boolean;
};

export const Gen4ConfigSetup = ({ onlyDppt }: Gen4ConfigSetupProps) => {
  const t = useActiveRouteTranslations();
  const [state, updateState] = useAtom(gen4StateAtom);
  const gameOptions = onlyDppt ? DpPt : Gen4GameVersions;

  const fields: Field[] = [
    {
      label: t["Game"],
      input: (
        <Select<Gen4GameVersion>
          options={toOptions(gameOptions, (game) => t[game])}
          value={state.config.game}
          onChange={(game) => updateState({ config: { game } })}
        />
      ),
    },
    {
      label: t["Console"],
      input: (
        <Flex vertical gap={8}>
          <RadioGroup
            name="gen4ConsoleRadio"
            optionType="button"
            value={state.config.console}
            onChange={({ target }) => {
              const value = Gen4ConsoleSchema.safeParse(target.value);
              if (!value.success) {
                // Shouldn't happen
                return;
              }
              updateState({ config: { console: value.data } });
            }}
            options={[
              { label: t["NDS/DSi"], value: "NdsDsi" as const },
              {
                label: t["3DS (Normal Settings)"],
                value: "3dsNormalSettings" as const,
              },
              {
                label: t["3DS (Alt Settings)"],
                value: "3dsAltSettings" as const,
              },
            ]}
          />

          {state.config.console === "3dsNormalSettings" && (
            <Link href="/3ds-helper/">
              {t["Learn how to use the 3DS Helper here"]}
            </Link>
          )}
          {state.config.console === "3dsAltSettings" && (
            <Link href="/3ds-alt-settings/">
              {t["Download the 3DS Alt Settings app here"]}
            </Link>
          )}
        </Flex>
      ),
    },
  ];

  return <FormFieldTable fields={fields} />;
};
