import Cpf from "../src/Cpf";

test("Should validate a cpf", function () {
  const cpf = new Cpf("798.591.940-68");
  expect(cpf.value).toBe("798.591.940-68");
});

test("Should not validate a cpf", function () {
  expect(() => new Cpf("111.111.111-11")).toThrow(new Error("Invalid cpf"));
});
