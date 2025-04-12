import { Test } from "ts-toolbelt";
import { OneOf, AllOrNone, FeatureConfig } from "../utils";

const { check } = Test;

export const OneOfTest = () => {
  type Config = {
    fields: string[];
    getFields: () => string[];
  };

  type Result = OneOf<Config>;

  type Expected =
    | {
        fields: string[];
        getFields?: undefined;
      }
    | {
        getFields: () => string[];
        fields?: undefined;
      };

  check<Result, Expected, Test.Pass>();
};

export const AllOrNoneTest = () => {
  type Config = {
    rowKey: string;
    onRow: (key: string) => void;
  };

  type Result = AllOrNone<Config>;

  type Expected =
    | {
        rowKey: string;
        onRow: (key: string) => void;
      }
    | {
        rowKey?: undefined;
        onRow?: undefined;
      };

  check<Result, Expected, Test.Pass>();
};

export const FeatureConfigTest = () => {
  type FieldConfig = {
    resetButtonLabel: string;
    onReset: () => void;
  };

  type Result = FeatureConfig<"reset", FieldConfig>;

  type Expected =
    | {
        reset: true;
        resetButtonLabel: string;
        onReset: () => void;
      }
    | {
        reset?: false;
        resetButtonLabel?: undefined;
        onReset?: undefined;
      };

  check<Result, Expected, Test.Pass>();
};
