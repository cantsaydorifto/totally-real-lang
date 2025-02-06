interface Token {
  value: string;
  type: TokenType;
}

const TokenType = {
  NUMBER: "Number",
  IDENTIFIER: "Identifier",
  LET: "Let",
  EQUALS: "Equals",
  OPEN_PARENTHESIS: "Open Parenthesis",
  CLOSE_PARENTHESIS: "Close Parenthesis",
  BINARY_OPERATOR: "BINARY_OPERATOR",
  SEMICOLON: "SEMICOLON",
} as const;

type TokenType = (typeof TokenType)[keyof typeof TokenType];

const KEYWORDS: Record<string, TokenType> = {
  let: TokenType.LET,
};

const inputCode = "let nums = (50 * (45 / (65 + 4)));";
for (const i of tokenize(inputCode)) {
  console.log(i);
}

function tokenize(input: string): Token[] {
  const res: Token[] = [];
  const chars = input.split("");
  while (chars.length > 0) {
    if (isSpace(chars[0])) {
      chars.shift();
      continue;
    }
    if (chars[0] == "(") {
      res.push(createToken(chars.shift()!, TokenType.OPEN_PARENTHESIS));
    } else if (chars[0] == ")") {
      res.push(createToken(chars.shift()!, TokenType.CLOSE_PARENTHESIS));
    } else if (
      chars[0] == "+" ||
      chars[0] == "-" ||
      chars[0] == "*" ||
      chars[0] == "/"
    ) {
      res.push(createToken(chars.shift()!, TokenType.BINARY_OPERATOR));
    } else if (chars[0] == "=") {
      res.push(createToken(chars.shift()!, TokenType.EQUALS));
    } else if (chars[0] == ";") {
      res.push(createToken(chars.shift()!, TokenType.SEMICOLON));
    } else if (isDigit(chars[0])) {
      let num = "";
      while (chars.length > 0 && isDigit(chars[0])) {
        num += chars.shift();
      }
      res.push(createToken(num, TokenType.NUMBER));
    } else if (isChar(chars[0])) {
      let identifierToken = "";
      while (chars.length > 0 && isChar(chars[0])) {
        identifierToken += chars.shift();
      }
      if (identifierToken in KEYWORDS) {
        res.push(createToken(identifierToken, KEYWORDS[identifierToken]));
      } else res.push(createToken(identifierToken, TokenType.IDENTIFIER));
    } else {
      console.log(`Unrecognized Char : ${chars[0]}`);
      console.log(res);
      throw Error(`Unrecognized Char : ${chars[0]}`);
    }
  }
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
