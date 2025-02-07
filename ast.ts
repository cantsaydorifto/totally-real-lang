export interface Program {
  type: "Program";
  body: Statement[];
}

export interface Statement {
  type: "NumberLiteral" | "Identifier" | "BinaryExpression";
}

export interface Expression extends Statement {}

export interface BinaryExpression extends Expression {
  type: "BinaryExpression";
  left: Expression;
  right: Expression;
  operator: string;
}

export interface Identifier extends Expression {
  type: "Identifier";
  symbol: string;
}

export interface NumberLiteral extends Expression {
  type: "NumberLiteral";
  value: number;
}
