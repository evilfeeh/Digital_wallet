import { Email } from "../../application/valueObjects/email";

describe("Value Object Email", () => {
  it("Email shouldn't be empty", () => {
    const sut = () => {
      new Email("");
    };

    expect(sut).toThrow();
  });

  it("Email shouldn't be invalid", () => {
    const sut = () => {
      new Email("teste");
    };

    expect(sut).toThrow();
  });

  it("Email should be valid", () => {
    const sut = new Email("teste@teste.com");
  });
});
