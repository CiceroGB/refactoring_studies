import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";
import Coupon from "./Coupon";

export default class Order {
  cpf: Cpf;
  coupon?: Coupon;
  orderItems: OrderItem[];

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
  }

  addItem(item: Item, quantity: number) {
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
  }

  addCoupon(coupon: Coupon) {
    this.coupon = coupon;
  }

  getTotal() {
    let total = this.orderItems.reduce((acc, item) => {
      return acc + item.getTotal();
    }, 0);

    if (this.coupon) {
      total -= (total * this.coupon.percentage) / 100;
    }

    return total;
  }
}
