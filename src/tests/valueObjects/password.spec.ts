import { Password } from "../../application/valueObjects/password";

describe("Value Objects Password", () => {
  it("Shouldn't pass an invalid password", () => {
    const sut = () => {
      new Password("a");
    };

    expect(sut).toThrow();
  });

  it("Shouldn't pass an empty password", () => {
    const sut = () => {
      new Password("");
    };

    expect(sut).toThrow();
  });

  it("Shouldn't have less than 8 caracters", () => {
    const sut = () => {
      new Password("1234567");
    };

    expect(sut).toThrow();
  });

  it("Should be a valid password", () => {
    const sut = new Password("Banana#1234");
    expect(sut.toString()).toBeTruthy();
  });

  it("Should be a large valid passprhase", () => {
    const sut = new Password("AMatterOfPerspective-Droeloe#2021");
    expect(sut.toString()).toBeTruthy;
  });

  it("Should be a hashed password", () => {
    const sut = new Password("They'reComming!They'reComming!01234");
    expect(sut.toHashed).toBeTruthy();
  });
});
