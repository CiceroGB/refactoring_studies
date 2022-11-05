import CurrencyAPI from "./CurrencyAPI";

export default class Account {
  balance: number;

  constructor(private currencyAPI: CurrencyAPI) {
    this.balance = 0;
  }

  credit(amount: number, currency?: string) {
    if (currency) amount = this.currencyAPI.convert(currency, amount);
    return (this.balance += amount);
  }

  debit(amount: number) {
    return (this.balance -= amount);
  }

  getBalance() {
    return this.balance;
  }
}
