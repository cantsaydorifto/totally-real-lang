import type { Program } from "./ast.ts";
import { tokenize } from "./lexer.ts";
import { Parser } from "./parser.ts";

import { assertEquals } from "jsr:@std/assert";

Deno.test("Parse Exp", () => {
  const input = "(50 * (45 / (65 % 4)))";
  const expectedOutput = {
    type: "Program",
    body: [
      {
        type: "BinaryExpression",
        left: { type: "NumberLiteral", value: 50 },
        right: {
          type: "BinaryExpression",
          left: { type: "NumberLiteral", value: 45 },
          right: {
            type: "BinaryExpression",
            left: { type: "NumberLiteral", value: 65 },
            right: { type: "NumberLiteral", value: 4 },
            operator: "%",
          },
          operator: "/",
        },
        operator: "*",
      },
    ],
  };
  assertEquals(
    new Parser(tokenize(input)).createAst(),
    expectedOutput as Program
  );
});
