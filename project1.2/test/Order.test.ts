import Order from "../src/Order";
import Item from "../src/Item";
import Coupon from "../src/Coupon";
import DefaultFreightCalculator from "../src/DefaultFreightCalculator";
import FixedFreightCalculator from "../src/FixedFreightCalculator";

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

test("Should create an order with 3 items", () => {
  const cpf = "798.591.940-68";
  const order = new Order(cpf);
  order.addItem(new Item(1, "Type of item", "item", 400), 1);
  order.addItem(new Item(2, "Type of item", "item", 300), 1);
  order.addItem(new Item(3, "Type of item", "item", 100), 3);
  const total = order.getTotal();
  expect(total).toBe(1000);
});

test("Should create an order with 3 items with discount", () => {
  const cpf = "798.591.940-68";
  const order = new Order(cpf);
  order.addItem(new Item(1, "Type of item", "item", 400), 1);
  order.addItem(new Item(2, "Type of item", "item", 300), 1);
  order.addItem(new Item(3, "Type of item", "item", 100), 3);
  order.addCoupon(new Coupon("VALE20", 20));
  const total = order.getTotal();
  expect(total).toBe(800);
});

test("Should create an order with 3 items with discount is expired", () => {
  const cpf = "798.591.940-68";
  const order = new Order(cpf);
  order.addItem(new Item(1, "Type of item", "item", 400), 1);
  order.addItem(new Item(2, "Type of item", "item", 300), 1);
  order.addItem(new Item(3, "Type of item", "item", 100), 3);
  order.addCoupon(new Coupon("VALE20", 20, new Date("1999-03-01")));
  const total = order.getTotal();
  expect(total).toBe(1000);
});

test("Should create an order with 3 items  and calculate freight default", () => {
  const cpf = "798.591.940-68";
  const order = new Order(cpf, new Date(), new DefaultFreightCalculator());
  order.addItem(new Item(4, "Type 1", "item 1", 1000, 100, 30, 10, 3), 1); // 30
  order.addItem(new Item(5, "Type 1", "item 2", 5000, 100, 50, 50, 20), 1);
  order.addItem(new Item(6, "Type 2", "item 2", 30, 10, 10, 10, 0.9), 3);
  const freight = order.getFreight();
  expect(freight).toBe(260);
});

test("Should create an order with 3 items  and calculate freight fixed", () => {
  const cpf = "798.591.940-68";
  const order = new Order(cpf, new Date(), new FixedFreightCalculator());
  order.addItem(new Item(4, "Type 1", "item 1", 1000, 100, 30, 10, 3), 1); // 30
  order.addItem(new Item(5, "Type 1", "item 2", 5000, 100, 50, 50, 20), 1);
  order.addItem(new Item(6, "Type 2", "item 2", 30, 10, 10, 10, 0.9), 3);
  const freight = order.getFreight();
  expect(freight).toBe(50);
});

// test("Deve criar um pedido com código", () => {
//     const cpf = "798.591.940-68";
//   const order = new Order(cpf, new Date(), new FixedFreightCalculator());
//   order.addItem(new Item(4, "Type 1", "item 1", 1000, 100, 30, 10, 3), 1); // 30
//   order.addItem(new Item(5, "Type 1", "item 2", 5000, 100, 50, 50, 20), 1);
//   order.addItem(new Item(6, "Acessórios", "Cabo", 30, 10, 10, 10, 0.9), 3);
//   const code = order.getCode();
//   expect(code).toBe("202100000001");
// });
