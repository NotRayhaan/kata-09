import { checkout } from "../checkout";

const price = (goods) => {
  // run checkout
  return checkout(goods);
};

test("single item", () => {
  expect(price("A")).toBe("A");
});
