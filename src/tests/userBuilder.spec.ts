import { UserBuilder } from "../utils";
import { test, expect, describe } from "@jest/globals";

describe("User builder", () => {
  test("should build user correctly", async () => {
    const sut = new UserBuilder();
    const candidate = {
      fullname: "Jose Silva",
      email: "jose@teste.com",
      password: "ABCDEFghij@12345678",
      phone: "11999999999",
      CPF_CNPJ: "12345678901",
    };

    const user = sut
      .fullname(candidate.fullname)
      .cpfCnpj(candidate.CPF_CNPJ)
      .email(candidate.email)
      .phone(candidate.phone)
      .password(candidate.password)
      .commonUser()
      .build();

    expect(user).toHaveProperty("active");
    expect(user.active).toBeTruthy();
    expect(user).toHaveProperty("hash");
  });

  test("should build an CPF customer correctly", async () => {
    const sut = new UserBuilder();
    const candidate = {
      fullname: "Jose Silva",
      email: "jose@teste.com",
      password: "ABCDEFghij@12345678",
      phone: "11999999999",
      CPF_CNPJ: "12345678901",
    };
    const user = sut
      .fullname(candidate.fullname)
      .cpfCnpj(candidate.CPF_CNPJ)
      .email(candidate.email)
      .phone(candidate.phone)
      .password(candidate.password)
      .commonUser()
      .build();
    expect(user).toHaveProperty("CPF_CNPJ");
    expect(user.CPF_CNPJ).toHaveLength(11);
    expect(user.commonUser).toBeTruthy();
  });

  test("should build an CNPJ customer correctly", async () => {
    const sut = new UserBuilder();
    const candidate = {
      fullname: "Jose Silva",
      email: "jose@teste.com",
      password: "ABCDEFghij@12345678",
      phone: "11999999999",
      CPF_CNPJ: "12345678901000",
    };
    const user = sut
      .fullname(candidate.fullname)
      .cpfCnpj(candidate.CPF_CNPJ)
      .email(candidate.email)
      .phone(candidate.phone)
      .password(candidate.password)
      .commonUser()
      .build();
    expect(user).toHaveProperty("CPF_CNPJ");
    expect(user.CPF_CNPJ).toHaveLength(14);
    expect(user.commonUser).toBeFalsy();
  });
  test("should throw an error", async () => {
    const sut = new UserBuilder();
    const candidate = {
      fullname: "",
      email: "",
      password: "8",
      phone: "11999999",
      CPF_CNPJ: "78901000",
    };
    try {
      sut
        .fullname(candidate.fullname)
        .cpfCnpj(candidate.CPF_CNPJ)
        .email(candidate.email)
        .phone(candidate.phone)
        .password(candidate.password)
        .commonUser()
        .build();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBeTruthy();
    }
  });
});
