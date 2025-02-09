import { tokenize } from "./lexer.ts";
import { Parser } from "./parser.ts";
import { evaluate } from "./runtime/interpreter.ts";

const text = await Deno.readTextFile("./source-code.txt");
const tokens = tokenize(text);
// for (const tok of tokens) {
//   console.log(tok);
// }

const parser = new Parser(tokens);
const result = evaluate(parser.createAst());
console.log(Deno.inspect(result, { depth: Infinity, colors: true }));
