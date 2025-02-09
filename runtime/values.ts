export interface RuntimeVal {
  type: "null" | "number";
}

export interface NullValue extends RuntimeVal {
  type: "null";
  value: "null";
}

export interface NumberValue extends RuntimeVal {
  type: "number";
  value: number;
}
