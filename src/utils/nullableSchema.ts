import { z } from "zod";
import { mapValues } from "lodash-es";

type ZodNullableObject<Shape extends z.core.$ZodLooseShape> = z.ZodObject<{
  [K in keyof Shape]: z.ZodNullable<Shape[K]>;
}>;

export const NullableSchema = <Shape extends z.core.$ZodLooseShape>(
  schema: z.ZodObject<Shape>,
): ZodNullableObject<Shape> =>
  z.object(mapValues(schema.shape, (field) => field.nullable()));
