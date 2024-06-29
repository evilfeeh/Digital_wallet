import { Phone } from "../../application/valueObjects/phone";

describe("Value Object Phone", () => {
  it("should be an invalid phone Number", () => {
    const sut = () => {
      new Phone("123");
    };
    expect(sut).toThrow();
  });

  it("shouldn't phone be empty", () => {
    const sut = () => {
      new Phone("");
    };
    expect(sut).toThrow();
  });

  it("should be numeric", () => {
    const sut = () => {
      new Phone("ABcs");
    };
    expect(sut).toThrow();
  });

  it("should return phone number as string", () => {
    const sut = new Phone("11940028922").toString();

    expect(typeof sut).toBe("string");
  });
});
