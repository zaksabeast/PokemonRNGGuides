import { Test } from "ts-toolbelt";
import { Console, ZodConsole } from ".";
import { z } from "zod";

const { checks, check } = Test;

checks([check<z.infer<typeof ZodConsole>, Console, Test.Pass>()]);
