import { OneOf, AllOrNone, FeatureConfig, Paths, Path } from "../utils";
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
    | "nested"
    | "topLevel"
    | "anotherNested"
    | "nested.test"
    | "anotherNested.deeper"
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

export const PathsWithArrayTest = () => {
  type Result = Paths<
    {
      array: number[];
      nested: {
        test: boolean | undefined;
      };
    },
    boolean | undefined
  >;
  type Expected = "nested.test";
  check<Result, Expected>(Pass);
};

export const PathsSelectingArrayTest = () => {
  type Result = Paths<
    {
      array: number[];
      nested: {
        test: boolean | undefined;
      };
    },
    number[]
  >;
  type Expected = "array";
  check<Result, Expected>(Pass);
};

export const PathSelectingObjectTest = () => {
  type Person = {
    name: string;
    age: number;
  };
  type Result = Paths<
    {
      array: number[];
      nested: {
        test: Person;
      };
    },
    Person
  >;
  type Expected = "nested.test";
  check<Result, Expected>(Pass);
};

export const PathRootTest = () => {
  type Result = Path<{ other: number; foo: { bar: boolean } }, "other">;
  type Expected = number;
  check<Result, Expected>(Pass);
};

export const PathNestedTest = () => {
  type Result = Path<{ other: number; foo: { bar: boolean } }, "foo.bar">;
  type Expected = boolean;
  check<Result, Expected>(Pass);
};

export const PathUnionTest = () => {
  type Result = Path<
    { other: number; foo: { bar: boolean } },
    "other" | "foo.bar"
  >;
  type Expected = boolean | number;
  check<Result, Expected>(Pass);
};

export const PathWithArrayTest = () => {
  type Result = Path<{ array: number[]; foo: { bar: boolean } }, "foo.bar">;
  type Expected = boolean;
  check<Result, Expected>(Pass);
};

export const PathSelectArrayTest = () => {
  type Result = Path<{ array: number[]; foo: { bar: boolean } }, "array">;
  type Expected = number[];
  check<Result, Expected>(Pass);
};
