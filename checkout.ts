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
    const groupItems = Object.keys(this._inventory).filter(
      (sku) => sku.length > 1
    );
    if (inventoryItem) {
      this._inventory[inventoryItem].quantity++;
    }

    // take away quantity from respective SKU, add to group SKU
    groupItems.forEach((group) => {
      // if (
      // group.split("").forEach((item) => this._inventory[item].quantity > 0)
      // ) {
      // }
    });
    if (groupItems.includes(inventoryItem)) {
      this._inventory[inventoryItem].quantity--;
      // this._inventory[inventoryItem].quantity--;
      // this._inventory[groupItems.find()].quantity++;
    } else {
    }
  }

  total() {
    let total = 0;
    // console.log(Object.values(this._inventory).map((e) => e.rules));

    // could also maybe be pulled out?
    Object.values(this._inventory).forEach((item) => {
      if (item.quantity === 0) return;
      let quantity = item.quantity;
      item.rules.forEach(([count, modifier]) => {
        if (quantity === 0) {
          return;
        }
        if (parseInt(count) === 1 && quantity > 0) {
          total += quantity * parseInt(modifier);
        } else if (quantity / parseInt(count) > 0) {
          total += parseInt(modifier) * Math.floor(quantity / parseInt(count));
          quantity -=
            parseInt(count) * Math.floor(item.quantity / parseInt(count));
        }
        // console.log(
        //   `total=${total} modifier=${modifier} maths=${
        //     item.quantity / parseInt(count)
        //   }`
        // );
        // console.log(`quantity=${quantity} count=${count}`);
      });
    });
    return total;
  }
}
