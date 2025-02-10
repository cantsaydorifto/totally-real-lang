import type { RuntimeVal } from "./values.ts";

class Environment {
  private parent: Environment | null;
  private variables: Map<string, RuntimeVal>;
  constructor(parent: Environment | null = null) {
    this.parent = parent;
    this.variables = new Map();
  }
  public declareVariable(varname: string, value: RuntimeVal) {
    if (this.variables.has(varname)) {
      console.error(
        `Variable already exists - Cannot declare Variable ${varname}`
      );
    }
    this.variables.set(varname, value);
    return value;
  }
  public assignVariable(varname: string, value: RuntimeVal): RuntimeVal {
    if (!this.variables.has(varname)) {
      console.error(`Variable is not defined : ${varname}`);
    }
    this.variables.set(varname, value);
    return value;
  }
}
