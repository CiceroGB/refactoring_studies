import OrderItem from "../src/OrderItem";

test("Should calculate price", function () {
    const orderItem = new OrderItem(700,100, 70);
    expect(orderItem.getTotal()).toBe(7000);
});