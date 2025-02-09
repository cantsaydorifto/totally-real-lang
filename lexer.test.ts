import { tokenize } from "./lexer.ts";

import { assertEquals } from "jsr:@std/assert";

Deno.test("Tokenize Simple let Statement", () => {
  const input = "let nums = 50;";
  const expectedTokens = [
    { value: "let", type: "LET" },
    { value: "nums", type: "IDENTIFIER" },
    { value: "=", type: "EQUALS" },
    { value: "50", type: "NUMBER" },
    { value: ";", type: "SEMICOLON" },
    { value: "", type: "EOF" },
  ];
  assertEquals(tokenize(input), expectedTokens);
});

Deno.test("Tokenize a mathematical expression", () => {
  const input = "10 + 20 - 5;";
  const expectedTokens = [
    { value: "10", type: "NUMBER" },
    { value: "+", type: "BINARY_OPERATOR" },
    { value: "20", type: "NUMBER" },
    { value: "-", type: "BINARY_OPERATOR" },
    { value: "5", type: "NUMBER" },
    { value: ";", type: "SEMICOLON" },
    { value: "", type: "EOF" },
  ];
  assertEquals(tokenize(input), expectedTokens);
});

Deno.test("Tokenize parentheses", () => {
  const input = "(x + y)";
  const expectedTokens = [
    { value: "(", type: "OPEN_PARENTHESIS" },
    { value: "x", type: "IDENTIFIER" },
    { value: "+", type: "BINARY_OPERATOR" },
    { value: "y", type: "IDENTIFIER" },
    { value: ")", type: "CLOSE_PARENTHESIS" },
    { value: "", type: "EOF" },
  ];
  assertEquals(tokenize(input), expectedTokens);
});

Deno.test("Tokenize null keyword", () => {
  const input = "null";
  const expectedTokens = [
    { value: "null", type: "NULL" },
    { value: "", type: "EOF" },
  ];
  assertEquals(tokenize(input), expectedTokens);
});
