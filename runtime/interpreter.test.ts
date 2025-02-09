import { evaluate } from "./interpreter.ts";
import { tokenize } from "../lexer.ts";
import { Parser } from "../parser.ts";
import { assertEquals } from "jsr:@std/assert";
import type { RuntimeVal } from "./values.ts";

Deno.test("Evaluate Value", () => {
  const input = "(50 * (45 / (65 % 4)))";
  const expectedOutput = { value: 2250, type: "number" };
  assertEquals(
    evaluate(new Parser(tokenize(input)).createAst()),
    expectedOutput as RuntimeVal
  );
});
