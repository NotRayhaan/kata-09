import { TransformerFactory } from "./helpers";

export type rule = [string, string];
export type rules = Record<string, string[]>; // can be lifted out from here?
interface Item {
  quantity: number;
  rules: rule[];
}
export interface RulesData {
  id: string;
  rules: rules;
}

interface inventory {
  [sku: string]: Item;
}

export class Checkout {
  _inventory = {} as inventory;

  constructor(rules: RulesData) {
    const transformer = new TransformerFactory(rules.id).getTransformer();

    // this should also not be here...
    Object.entries(rules.rules).forEach(([sku, itemRules]) => {
      this._inventory[sku] = {
        quantity: 0,
        rules: itemRules
          .map((itemRules) => transformer.transformRule(itemRules))
          .sort((a, b) => parseInt(b[0]) - parseInt(a[0])),
      };
    });
  }

  scan(item: string) {
    const inventoryItem = Object.keys(this._inventory).find((e) => e === item);
    if (inventoryItem) {
      this._inventory[inventoryItem].quantity++;
    }
  }

  total() {
    let total = 0;
    console.log(Object.values(this._inventory).map((e) => e.rules));

    Object.values(this._inventory).forEach((item) => {
      if (item.quantity === 0) return;
      let quantity = item.quantity;
      item.rules.forEach(([count, modifier]) => {
        if (quantity === 0) {
          return;
        }
        if (parseInt(count) === 1 && quantity > 0) {
          total += quantity * parseInt(modifier);
        } else if (item.quantity / parseInt(count) > 0) {
          total +=
            parseInt(modifier) * Math.floor(item.quantity / parseInt(count));
          quantity -=
            parseInt(count) * Math.floor(item.quantity / parseInt(count));
        }
        console.log(
          `total=${total} modifier=${modifier} maths=${
            item.quantity / parseInt(count)
          }`
        );
        console.log(`quantity=${quantity} count=${count}`);
      });
    });
    return total;
  }
}
