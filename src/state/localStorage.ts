import { z } from "zod";
import { atomWithStorage } from "jotai/utils";
import { noop } from "lodash-es";
import { hydrationLock } from "~/utils/hydration";

export { useAtom } from "jotai";

const fakeLocalStorage = {
  getItem: noop,
  setItem: noop,
  removeItem: noop,
};

const ssrLocalStorage =
  typeof window !== "undefined" ? window.localStorage : fakeLocalStorage;

export const atomWithPersistence = <Schema extends z.ZodObject>(
  key: string,
  schema: Schema,
  initialValue: z.infer<Schema>,
) => {
  return atomWithStorage(
    key,
    hydrationLock(initialValue),
    {
      getItem: (key, initialValue) => {
        const storedValue = ssrLocalStorage.getItem(key);
        try {
          const parsed = schema.partial().parse(JSON.parse(storedValue ?? ""));
          return {
            ...initialValue,
            ...parsed,
          };
        } catch {
          return initialValue;
        }
      },
      setItem: (key, value) => {
        ssrLocalStorage.setItem(key, JSON.stringify(value));
      },
      removeItem: (key) => {
        ssrLocalStorage.removeItem(key);
      },
    },
    {
      getOnInit: true,
    },
  );
};
