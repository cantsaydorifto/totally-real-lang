import { tokenize } from "./lexer.ts";
import { Parser } from "./parser.ts";

const text = await Deno.readTextFile("./source-code.txt");
const tokens = tokenize(text);
for (const tok of tokens) {
  console.log(tok);
}

const parser = new Parser(tokens);
console.log(
  Deno.inspect(parser.createAst(), { depth: Infinity, colors: true })
);
