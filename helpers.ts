import { rule } from "./checkout";

export class Transformer {
  constructor() {
    if (this.constructor == Transformer) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  transformRule(rule: string): rule {
    throw new Error("Method 'transform()' must be implemented.");
  }
}

export class TransformerFactory {
  _transformer: Transformer;
  constructor(id: string) {
    switch (id) {
      case "1":
        this._transformer = new KataTransformer();
      case "2":
        this._transformer = new WooliesTransformer();
      default:
        this._transformer = new KataTransformer();
    }
  }

  getTransformer() {
    return this._transformer;
  }
}

class KataTransformer extends Transformer {
  transformRule(rule: string): rule {
    const split = rule.split(" ");
    if (split.length > 1) {
      // discount
      return [split[0], split[2]];
    }
    // individual price
    return ["1", split[0]];
  }
}

class WooliesTransformer extends Transformer {
  transformRule(rule: string): rule {
    const split = rule.split(" ");
    if (split.length > 1) {
      // discount
      return [split[1], split[3]];
    }
    // individual price
    return ["1", split[0]];
  }
}

class BluebirdTransformer extends Transformer {
  transformRule(rule: string): rule {
    const split = rule.split(" ");
    if (split.length > 1) {
      // discount
      return [split[1], split[3]];
    }
    // individual price
    return ["1", split[0]];
  }
}
