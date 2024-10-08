import { Checkout } from "../checkout";

const price = (goods: string) => {
  // run checkout
  const co = new Checkout("");
  goods.split("").forEach((good) => {
    co.scan(good);
  });
  return co.total();
};

test("single item", () => {
  expect(price("")).toBe(0);
});
