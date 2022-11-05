import Order from "../src/Order";
import Item from "../src/Item";
import Coupon from "../src/Coupon";

test("Should create an empty order with valid CPF", () => {
  const cpf = "798.591.940-68";
  const order = new Order(cpf);
  const total = order.getTotal();
  expect(total).toBe(0);
});

test("Should try to create an empty order with invalid CPF", () => {
  const cpf = "111.111.111-11";
  expect(() => new Order(cpf)).toThrow(new Error("Invalid cpf"));
});

test("Should create an order with 3 items", function () {
  const cpf = "798.591.940-68";
  const order = new Order(cpf);
  order.addItem(new Item(1, "Type of item", "item", 400), 1);
  order.addItem(new Item(2, "Type of item", "item", 300), 1);
  order.addItem(new Item(3, "Type of item", "item", 100), 3);
  const total = order.getTotal();
  expect(total).toBe(1000);
});

test("Should create an order with 3 items with discount", function () {
  const cpf = "798.591.940-68";
  const order = new Order(cpf);
  order.addItem(new Item(1, "Type of item", "item", 400), 1);
  order.addItem(new Item(2, "Type of item", "item", 300), 1);
  order.addItem(new Item(3, "Type of item", "item", 100), 3);
  order.addCoupon(new Coupon("VALE20", 20));
  const total = order.getTotal();
  expect(total).toBe(800);
});
