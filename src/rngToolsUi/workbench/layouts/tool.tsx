import * as tst from "ts-toolbelt";
import { Flex, ResultTable, ResultColumn, Button, Icon } from "~/components";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { Splitter, Progress } from "antd";
import styled from "@emotion/styled";
import { z } from "zod";

const SplitterContainer = styled(Splitter)({
  height: "100%",
});

const ProgressContainer = styled(Flex)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 1,
  backgroundColor: theme.token.colorBgContainer,
  paddingTop: 8,
  paddingBottom: 8,
  paddingLeft: 8,
  paddingRight: 8,
  flex: 1,
}));

const UpDownIconContainer = styled(Flex)(({ theme }) => ({
  backgroundColor: theme.token.colorBgMask,
  borderRadius: 4,
  paddingTop: 4,
  paddingBottom: 4,
  paddingLeft: 10,
  paddingRight: 10,
}));

const LeftRightIconContainer = styled(Flex)(({ theme }) => ({
  backgroundColor: theme.token.colorBgMask,
  borderRadius: 4,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 4,
  paddingRight: 4,
}));

const upDownIcons = {
  start: (
    <UpDownIconContainer mb={20}>
      <Icon name="CaretUp" size={20} />
    </UpDownIconContainer>
  ),
  end: (
    <UpDownIconContainer mt={20}>
      <Icon name="CaretDown" size={20} />
    </UpDownIconContainer>
  ),
};

const leftRightIcons = {
  start: (
    <LeftRightIconContainer mr={20}>
      <Icon name="CaretLeft" size={20} />
    </LeftRightIconContainer>
  ),
  end: (
    <LeftRightIconContainer ml={20}>
      <Icon name="CaretRight" size={20} />
    </LeftRightIconContainer>
  ),
};

type ToolLayoutProps<FormState, Result> = {
  results: Result[];
  progressPercent: number | null;
  loading: boolean;
  initialValues: DefaultValues<FormState>;
  validationSchema: z.ZodType<FormState>;
  columns: ResultColumn<Result>[];
  slots: {
    filterFields?: React.ReactNode;
    rngInfoActions?: React.ReactNode;
    rngInfoFields?: React.ReactNode;
    timer?: React.ReactNode;
  };
  onSubmit: (opts: FormState) => Promise<void>;
  cancel?: () => void;
};

export const ToolLayout = <
  FormState extends FieldValues,
  Result extends tst.O.Object,
>({
  initialValues,
  validationSchema,
  loading,
  results,
  progressPercent,
  columns,
  slots,
  onSubmit,
  cancel,
}: ToolLayoutProps<FormState, Result>) => {
  const { handleSubmit, setValue, control, ...form } = useForm<FormState>({
    mode: "onTouched",
    resolver: standardSchemaResolver(validationSchema),
    resetOptions: { keepDirtyValues: false },
    defaultValues: initialValues,
  });

  return (
    <FormProvider
      handleSubmit={handleSubmit}
      setValue={setValue}
      control={control}
      {...form}
    >
      <SplitterContainer vertical collapsibleIcon={upDownIcons}>
        <Splitter.Panel>
          <Splitter collapsibleIcon={leftRightIcons}>
            {slots.rngInfoFields != null && (
              <Splitter.Panel collapsible>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Flex vertical gap={4} ph={8}>
                    {slots.rngInfoFields}
                    <Flex flex={1} gap={8}>
                      {slots.rngInfoActions != null ? (
                        slots.rngInfoActions
                      ) : (
                        <>
                          <Button
                            flex={1}
                            trackerId="rng-workbench-search"
                            htmlType="submit"
                          >
                            Search
                          </Button>
                          {cancel != null && (
                            <Button
                              flex={1}
                              disabled={!loading}
                              trackerId="rng-workbench-cancel"
                              onClick={cancel}
                            >
                              Cancel
                            </Button>
                          )}
                        </>
                      )}
                    </Flex>
                  </Flex>
                </form>
              </Splitter.Panel>
            )}
            {slots.filterFields != null && (
              <Splitter.Panel collapsible>
                <Flex vertical gap={10} ph={8}>
                  {slots.filterFields}
                </Flex>
              </Splitter.Panel>
            )}
            {slots.timer != null && (
              <Splitter.Panel collapsible>
                <Flex vertical gap={10} ph={8}>
                  {slots.timer}
                </Flex>
              </Splitter.Panel>
            )}
          </Splitter>
        </Splitter.Panel>
        <Splitter.Panel collapsible>
          {progressPercent != null && (
            <ProgressContainer>
              <Progress percent={progressPercent} size={["100%", 12]} />
            </ProgressContainer>
          )}
          <ResultTable<Result>
            size="small"
            loading={loading}
            sticky={{ offsetHeader: progressPercent == null ? 0 : 30 }}
            columns={columns}
            expandable={false}
            dataSource={results}
          />
        </Splitter.Panel>
      </SplitterContainer>
    </FormProvider>
  );
};
