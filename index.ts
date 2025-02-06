import { tokenize } from "./lexer.ts";

const text = await Deno.readTextFile("./source-code.txt");
for (const tok of tokenize(text)) {
  console.log(tok);
}
