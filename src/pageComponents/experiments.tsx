import {
  Flex,
  Field,
  FormFieldTable,
  Switch,
  Typography,
  Button,
  Select,
  Link,
} from "~/components";
import { Menu } from "antd";
import { settings } from "~/settings";

export const ExperimentsPageComponent = () => {
  const sampleComponents: Field[] = [
    {
      label: "Buttons",
      input: (
        <Flex gap={8}>
          <Button trackerId="experimental_sample_button_1">Button</Button>
          <Button trackerId="experimental_sample_button_2" type="primary">
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
          <Link href="/experiments/">Example link</Link> with surrounding text
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
        <Typography.Title level={4}>Sample Components</Typography.Title>
        <FormFieldTable fields={sampleComponents} />
      </Flex>
    </Flex>
  );
};
