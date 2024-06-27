import { CPF } from "../../application/valueObjects/cpf";

describe("Value Object CPF", () => {
  it("should be an invalid CPF", () => {
    const sut = () => {
      new CPF("abc");
    };
    expect(sut).toThrow();
  });
  it("should return a CPF as string", () => {
    const sut = new CPF("123.456.789-34").toString();

    expect(typeof sut).toBe("string");
  });
});
