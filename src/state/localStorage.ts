import { z } from "zod";
import { atomWithStorage } from "jotai/utils";

export { useAtom } from "jotai";

export const atomWithPersistence = <Schema extends z.AnyZodObject>(
  key: string,
  schema: Schema,
  initialValue: z.infer<Schema>,
) => {
  return atomWithStorage(
    key,
    initialValue,
    {
      getItem: (key, initialValue) => {
        const storedValue = localStorage.getItem(key);
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
        localStorage.setItem(key, JSON.stringify(value));
      },
      removeItem: (key) => {
        localStorage.removeItem(key);
      },
    },
    {
      getOnInit: true,
    },
  );
};
