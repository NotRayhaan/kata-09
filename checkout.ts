export class Checkout {
  rules: string;
  _total: number;
  constructor(rules: string) {
    this.rules = rules;
    this._total = 0;
  }

  scan(goods: string) {}

  total() {
    return this._total;
  }
}
