import type {
  BinaryExpression,
  NumberLiteral,
  Statement,
  Program,
} from "../ast.ts";
import type { NullValue, NumberValue, RuntimeVal } from "./values.ts";

export function evaluate(astNode: Statement): RuntimeVal {
  switch (astNode.type) {
    case "NumberLiteral":
      return {
        value: (astNode as NumberLiteral).value,
        type: "number",
      } as NumberValue;

    case "NullLiteral":
      return {
        value: "null",
        type: "null",
      } as NullValue;

    case "BinaryExpression":
      return evaluateBinaryExpression(astNode as BinaryExpression);

    case "Program":
      return evaluateProgram(astNode as Program);

    default:
      console.error("Unsupported Statement: ", astNode);
      Deno.exit(0);
  }
}

function evaluateProgram(program: Program) {
  let prevEval: RuntimeVal = { type: "null", value: "null" } as NullValue;
  for (const statement of program.body) {
    prevEval = evaluate(statement);
    // console.log(prevEval);
  }
  return prevEval;
}

function evaluateBinaryExpression(
  binaryExpression: BinaryExpression
): RuntimeVal {
  const left = evaluate(binaryExpression.left);
  const right = evaluate(binaryExpression.right);

  if (left.type === "number" && right.type === "number") {
    return evaluateNumberBinaryExpression(
      left as NumberValue,
      right as NumberValue,
      binaryExpression.operator
    );
  }
  return { type: "null", value: "null" } as NullValue;
}

function evaluateNumberBinaryExpression(
  left: NumberValue,
  right: NumberValue,
  operator: string
): NumberValue {
  switch (operator) {
    case "+":
      return { value: left.value + right.value, type: "number" };
    case "-":
      return { value: left.value - right.value, type: "number" };
    case "/":
      return { value: left.value / right.value, type: "number" };
    case "*":
      return { value: left.value * right.value, type: "number" };
    default:
      return { value: left.value % right.value, type: "number" };
  }
}
