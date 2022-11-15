import Coupon from "../src/Coupon";

test("Should create a valid coupon", () => {
  const coupon = new Coupon("VALE20", 20, new Date("2022-10-10"));
  const isExpired = coupon.isExpired(new Date("2022-09-10"));
  expect(isExpired).toBeFalsy();
});

test("Should create an invalid expired coupon", () => {
  const coupon = new Coupon("VALE20", 20, new Date("2022-09-10"));
  const isExpired = coupon.isExpired(new Date("2022-10-10"));
  expect(isExpired).toBeTruthy();
});

test("Should create a valid coupon without expiration", () => {
  const coupon = new Coupon("VALE20", 20);
  const isExpired = coupon.isExpired(new Date("2022-10-10"));
  expect(isExpired).toBeFalsy();
});
