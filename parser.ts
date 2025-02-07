import type { Expression, Program, Statement } from "./ast.ts";
import { BinaryExpression } from "./ast.ts";
import { NumberLiteral } from "./ast.ts";
import { Identifier } from "./ast.ts";
import { Token } from "./lexer.ts";

export class Parser {
  private tokens: Token[] = [];
  private current = 0;
  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }
  private peek(): Token {
    return this.tokens[this.current];
  }
  private eat(): Token {
    return this.tokens[this.current++];
  }
  public createAst(): Program {
    const program: Program = {
      type: "Program",
      body: [],
    };

    while (this.peek().type != "EOF") {
      program.body.push(this.parseStatement());
    }

    return program;
  }
  private parseStatement(): Statement {
    return this.parseExpression();
  }
  private parseExpression(): Expression {
    return this.parseAdditiveExpression();
  }
  // 5 + 4 * 7
  private parseAdditiveExpression(): Expression {
    let left = this.parseMultiplicativeExpression();
    while (this.peek().value === "+" || this.peek().value === "-") {
      const operator = this.eat().value;
      const right = this.parseMultiplicativeExpression();
      left = {
        type: "BinaryExpression",
        left,
        right,
        operator,
      } as BinaryExpression;
    }
    return left;
  }
  private parseMultiplicativeExpression(): Expression {
    let left = this.parsePrimaryExpression();
    while (
      this.peek().value === "*" ||
      this.peek().value === "/" ||
      this.peek().value === "%"
    ) {
      const operator = this.eat().value;
      const right = this.parsePrimaryExpression();
      left = {
        type: "BinaryExpression",
        left,
        right,
        operator,
      } as BinaryExpression;
    }
    return left;
  }
  private parsePrimaryExpression(): Expression {
    const tok = this.peek().type;
    switch (tok) {
      case "IDENTIFIER":
        return { type: "Identifier", symbol: this.eat().value } as Identifier;
      case "NUMBER":
        return {
          type: "NumberLiteral",
          value: parseFloat(this.eat().value),
        } as NumberLiteral;
      case "OPEN_PARENTHESIS": {
        // ( EXP )
        this.eat(); // open paranthesis (
        const val = this.parseExpression(); // EXP
        const closing = this.eat(); // )
        if (closing.type !== "CLOSE_PARENTHESIS") {
          console.error(
            `Unexpected Token Found - Expected Closing Paranthesis ')' `
          );
          Deno.exit(1);
        }
        return val;
      }
      default:
        console.error(`Unexpected Token Found : ${this.peek()}`);
        Deno.exit(1);
    }
  }
}
