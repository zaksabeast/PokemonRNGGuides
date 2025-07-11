import { OneOf, AllOrNone, FeatureConfig, Paths } from "../utils";
import { check, Pass } from "~/typeTest";

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

  check<Result, Expected>(Pass);
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

  check<Result, Expected>(Pass);
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

  check<Result, Expected>(Pass);
};

export const PathsTest = () => {
  type Result = Paths<{
    nested: {
      test: boolean;
    };
    topLevel: string;
    anotherNested: {
      deeper: {
        value1: number;
        value2: string;
      };
    };
  }>;
  type Expected =
    | "topLevel"
    | "nested.test"
    | "anotherNested.deeper.value1"
    | "anotherNested.deeper.value2";
  check<Result, Expected>(Pass);
};

export const PathsOfTypeTest = () => {
  type Result = Paths<
    {
      nested: {
        test: boolean;
      };
      topLevel: string;
      anotherNested: {
        deeper: {
          value1: number;
          value2: string;
        };
      };
    },
    boolean
  >;
  type Expected = "nested.test";
  check<Result, Expected>(Pass);
};

export const PathsOfUndefinedTypeTest = () => {
  type Result = Paths<
    {
      nested: {
        test: boolean | undefined;
      };
    },
    boolean | undefined
  >;
  type Expected = "nested.test";
  check<Result, Expected>(Pass);
};
