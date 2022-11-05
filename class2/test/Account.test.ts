import sinon from "sinon";

import Account from "../src/Account";
import CurrencyAPI from "../src/CurrencyAPI";
import CurrencyAPIFake from "../src/CurrencyAPIFake";

let account: Account;
let currencyApi: CurrencyAPI;

beforeEach(() => {
  currencyApi = new CurrencyAPIFake();
  account = new Account(currencyApi);
});

test("Should create an account", () => {
  const balance = account.getBalance();
  expect(balance).toBe(0);
});

test("Should credit R$100", () => {
  account.credit(100);
  const balance = account.getBalance();
  expect(balance).toBe(100);
});

test("Should debit R$50", () => {
  account.credit(100);
  account.debit(50);
  const balance = account.getBalance();
  expect(balance).toBe(50);
});

test("Should credit U$100 with fake ", () => {
  account.credit(100, "USD");
  const balance = account.getBalance();
  expect(balance).toBe(500);
});

test("Should credit U$100 with stub", () => {
  sinon.stub(currencyApi, "convert").returns(900);
  account.credit(100, "USD");
  const balance = account.getBalance();
  expect(balance).toBe(900);
});

test("Should create account  with spy", () => {
  const spy = sinon.spy(account, "getBalance");
  account.getBalance();
  sinon.assert.calledOnce(spy);
});

test("Should credit U$100  with mock", () => {
    const mock = sinon.mock(account);
    mock.expects("credit").once().withArgs(100,"USD");
    mock.expects("getBalance").once().returns(700);
    account.credit(100, "USD");
    const balance = account.getBalance();
    expect(balance).toBe(700);
  });
