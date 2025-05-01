import React from "react";
import {
  Flex,
  Field,
  FormFieldTable,
  RadioGroup,
  Switch,
  Typography,
  Button,
  Select,
} from "~/components";
import { useThemeMode } from "~/state/theme";
import { Progress, ColorPicker, Menu } from "antd";
import { themePalette, ThemePalette } from "~/theme";
import { useTheme } from "@emotion/react";
import { Link } from "~/routes";
import { throttle } from "lodash-es";
import { settings } from "~/settings";

const createDarkPresent = (primary: string): ThemePalette => ({
  mask: true,
  mode: "dark",
  colorPrimary: primary,
  colorLink: primary,
  colorBgBase: "#121212",
  colorTextBase: "#fff",
  colorBrandSecondary: "#ff60f4",
  colorTextLightSolid: "#121212",
});

const presetThemes = {
  light: themePalette.light,
  dark_blue: createDarkPresent("#00FFF5"),
  dark_green: createDarkPresent("#80ff61"),
  dark_orange: createDarkPresent("#ff8c00"),
  dark_purple: createDarkPresent("#d07aff"),
  dark_yellow: createDarkPresent("#fbff00"),
} as const satisfies Record<string, ThemePalette>;

type Presets = keyof typeof presetThemes;

const themeOptions = [
  { label: "Current", value: "light" },
  { label: "Ice", value: "dark_blue" },
  { label: "Ghost", value: "dark_green" },
  { label: "Magma", value: "dark_orange" },
  { label: "Shadow", value: "dark_purple" },
  { label: "Firefly", value: "dark_yellow" },
] satisfies { label: string; value: Presets }[];

export const ExperimentsPanel = () => {
  const theme = useTheme();
  const [pallete, _setPallete] = useThemeMode();

  const setPallete = React.useMemo(
    () =>
      throttle(
        (partial: Partial<ThemePalette>) =>
          _setPallete((old) => ({ ...old, ...partial })),
        25,
      ),
    [_setPallete],
  );

  const fields: Field[] = [
    {
      label: "Presets",
      input: (
        <RadioGroup
          optionType="button"
          options={themeOptions}
          defaultValue="light"
          onChange={(event) =>
            setPallete(presetThemes[event.target.value as Presets])
          }
        />
      ),
    },
    {
      label: "Night Mode",
      input: (
        <Switch
          checked={pallete.mode === "dark"}
          onChange={(checked) =>
            setPallete({
              mode: checked ? "dark" : "light",
              colorBgBase: checked ? "#121212" : "#fff",
              colorTextLightSolid: checked ? "#121212" : "#fff",
            })
          }
        />
      ),
    },
    {
      label: "Mask",
      input: (
        <Switch
          checked={pallete.mask}
          onChange={(checked) => setPallete({ mask: checked })}
        />
      ),
    },
    {
      label: "Primary Color",
      input: (
        <ColorPicker
          value={pallete.colorPrimary}
          onChange={(color) =>
            setPallete({ colorPrimary: color.toHexString() })
          }
        />
      ),
    },
    {
      label: "Link Color",
      input: (
        <ColorPicker
          value={pallete.colorLink}
          onChange={(color) => setPallete({ colorLink: color.toHexString() })}
        />
      ),
    },
    {
      label: "Support Color",
      input: (
        <ColorPicker
          value={pallete.colorBrandSecondary}
          onChange={(color) =>
            setPallete({ colorBrandSecondary: color.toHexString() })
          }
        />
      ),
    },
    {
      label: "Text Color",
      input: (
        <ColorPicker
          value={pallete.colorTextBase}
          onChange={(color) =>
            setPallete({ colorTextBase: color.toHexString() })
          }
        />
      ),
    },
    {
      label: "Background Color",
      input: (
        <ColorPicker
          value={pallete.colorBgBase}
          onChange={(color) => setPallete({ colorBgBase: color.toHexString() })}
        />
      ),
    },
    {
      label: "Primary Button Text Color",
      input: (
        <ColorPicker
          value={pallete.colorTextLightSolid}
          onChange={(color) =>
            setPallete({ colorTextLightSolid: color.toHexString() })
          }
        />
      ),
    },
  ];

  const sampleComponents: Field[] = [
    {
      label: "Buttons",
      input: (
        <Flex gap={8}>
          <Button trackerId="experimental_sample_button_1">Button</Button>
          <Button trackerId="experimental_sample_button_2" type="primary">
            Button
          </Button>
          <Button
            type="primary"
            trackerId="experimental_sample_button_3"
            backgroundColor="BrandSecondary"
            backgroundHoverColor="BrandSecondaryHover"
          >
            Button
          </Button>
        </Flex>
      ),
    },
    {
      label: "Switch",
      input: (
        <Flex gap={8}>
          <Switch defaultChecked />
        </Flex>
      ),
    },
    {
      label: "Link",
      input: (
        <>
          <Link href="/experiments">Example link</Link> with surrounding text
        </>
      ),
    },
    {
      label: "Select",
      input: (
        <Select
          options={[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
          ]}
          defaultValue="option1"
        />
      ),
    },
    {
      label: "Progress",
      input: (
        <Flex vertical>
          <Progress
            strokeColor={theme.token.colorBrandSecondary}
            percent={50}
          />
          <Progress strokeColor={theme.token.colorPrimary} percent={50} />
        </Flex>
      ),
    },
    {
      label: "Menu",
      input: (
        <Flex backgroundColor="BgContainer">
          <Menu
            defaultSelectedKeys={["2", "2-1"]}
            openKeys={["2", "2-1"]}
            mode="inline"
            items={[
              {
                key: "1",
                label: "Item 1",
              },
              {
                key: "2",
                label: "Item 2",
                children: [
                  {
                    key: "2-1",
                    label: "Item 2-1",
                  },
                  {
                    key: "2-2",
                    label: "Item 2-2",
                  },
                ],
              },
            ]}
          />
        </Flex>
      ),
    },
  ];

  return (
    <Flex vertical gap={32}>
      <Flex vertical>
        <Typography.Title level={2}>Dark Mode</Typography.Title>
        <Typography.Text>
          Help us find light and dark theme colors that are easy on the eyes.
          Post screenshots and colors{" "}
          <a href={settings.discordUrl}>on Discord</a>.
        </Typography.Text>
      </Flex>

      <Flex vertical gap={16}>
        <Typography.Title level={3}>Experiment Panel</Typography.Title>
        <FormFieldTable fields={fields} />
      </Flex>

      <Flex vertical gap={16}>
        <Typography.Title level={4}>Sample Components</Typography.Title>
        <FormFieldTable fields={sampleComponents} />
      </Flex>
    </Flex>
  );
};
