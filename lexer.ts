export interface Token {
  value: string;
  type: TokenType;
}

const TOKEN_TYPE = {
  NUMBER: "Number",
  IDENTIFIER: "Identifier",
  LET: "Let",
  EQUALS: "Equals",
  OPEN_PARENTHESIS: "Open Parenthesis",
  CLOSE_PARENTHESIS: "Close Parenthesis",
  BINARY_OPERATOR: "Binary Operator",
  SEMICOLON: "Semicolon",
  EOF: "End Of File",
  NULL: "Null",
} as const;

type TokenType = keyof typeof TOKEN_TYPE;

type TokenVals = (typeof TOKEN_TYPE)[TokenType];

const KEYWORDS: Record<string, TokenType> = {
  let: "LET",
  null: "NULL",
};

export function tokenize(input: string): Token[] {
  const res: Token[] = [];
  const chars = input.split("");
  while (chars.length > 0) {
    if (isSpace(chars[0])) {
      chars.shift();
      continue;
    }
    if (isDigit(chars[0])) {
      let num = "";
      while (chars.length > 0 && isDigit(chars[0])) {
        num += chars.shift();
      }
      res.push(createToken(num, "NUMBER"));
      continue;
    }
    if (isChar(chars[0])) {
      let identifierToken = "";
      while (chars.length > 0 && isChar(chars[0])) {
        identifierToken += chars.shift();
      }
      const tokType =
        identifierToken in KEYWORDS ? KEYWORDS[identifierToken] : "IDENTIFIER";
      res.push(createToken(identifierToken, tokType));
      continue;
    }
    switch (chars[0]) {
      case "(":
        res.push(createToken(chars.shift()!, "OPEN_PARENTHESIS"));
        break;
      case ")":
        res.push(createToken(chars.shift()!, "CLOSE_PARENTHESIS"));
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
        res.push(createToken(chars.shift()!, "BINARY_OPERATOR"));
        break;
      case "=":
        res.push(createToken(chars.shift()!, "EQUALS"));
        break;
      case ";":
        res.push(createToken(chars.shift()!, "SEMICOLON"));
        break;
      default:
        console.error(`Error - Unrecognized Char : ${chars[0]}`);
        Deno.exit(0);
    }
  }
  res.push(createToken("", "EOF"));
  return res;
}

function isSpace(input: string) {
  return [" ", "\n", "\t"].includes(input);
}

function isChar(input: string) {
  return input.toUpperCase() != input.toLowerCase();
}

function isDigit(input: string) {
  return (
    input.charCodeAt(0) >= "0".charCodeAt(0) &&
    input.charCodeAt(0) <= "9".charCodeAt(0)
  );
}

function createToken(val: string, tokType: TokenType): Token {
  return { value: val, type: tokType };
}
