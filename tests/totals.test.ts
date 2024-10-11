import { Checkout, rules } from "../checkout";

const rules1 = {
  A: ["50", "3 for 130", "7 for 100"],
  B: ["30", "2 for 45"],
  C: ["20"],
  D: ["15"],
};
const rules2 = {
  A: ["50", "Buy 1 get 1 free"],
  B: ["10", "Buy 2 get 1 free"],
  C: ["100"],
  D: ["10"],
};
const rules3 = {
  A: ["50", "Buy 1 get 1 free"],
  B: ["10", "Buy 2 get 1 free"],
  C: ["100"],
  D: ["10"],
  AB: ["55"],
};
const data1 = { id: "1", rules: rules1 };
const data2 = { id: "2", rules: rules2 };
const data3 = { id: "3", rules: rules3 };

interface data {
  id: string;
  rules: rules;
}
const init = (goods: string) => (data: data) => {
  const co = new Checkout(data);
  goods.split("").forEach((good) => {
    co.scan(good);
  });
  return co.total();
};
const initData1 = (goods: string) => init(goods)(data1);
const initData2 = (goods: string) => init(goods)(data2);
const initData3 = (goods: string) => init(goods)(data3);

const price = (goods: string) => initData1(goods);
const price2 = (goods: string) => initData2(goods);
const price3 = (goods: string) => initData3(goods);

test("single price", () => {
  expect(price("")).toBe(0);
  expect(price("A")).toBe(50);
  expect(price("AB")).toBe(80);
  expect(price("CDBA")).toBe(115);
});

test("A rules", () => {
  expect(price("AA")).toBe(100);
  expect(price("AAA")).toBe(130);
  expect(price("AAAA")).toBe(180);
  expect(price("AAAAA")).toBe(230);
  expect(price("AAAAAA")).toBe(260);
});

test("AB rules", () => {
  expect(price("AAAB")).toBe(160);
  expect(price("AAABB")).toBe(175);
  expect(price("AAABBD")).toBe(190);
  expect(price("DABABA")).toBe(190);
});

test("incremental", () => {
  const co = new Checkout(data1);
  expect(co.total()).toBe(0);

  co.scan("A");
  expect(co.total()).toBe(50);
  co.scan("B");
  expect(co.total()).toBe(80);
  co.scan("A");
  expect(co.total()).toBe(130);
  co.scan("A");
  expect(co.total()).toBe(160);
  co.scan("B");
  expect(co.total()).toBe(175);
});

test("A multiple rules", () => {
  expect(price("AAAAAAA")).toBe(100);
  expect(price("AAAAAAAAAA")).toBe(230);
});

test("Bluebird rules", () => {
  expect(price3("AB")).toBe(55);
});
