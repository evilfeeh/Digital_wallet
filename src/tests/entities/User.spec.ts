import { User } from "../../application/entities/User";

const userProperties = {
  fullname: "João da Silva",
  CPF_CNPJ: "123.456.789-55",
  email: "teste@teste.com",
  password: "They'reComming!They'reComming!01234",
  phone: "11940028922",
};

describe("User Entity", () => {
  it("Should Instantiate a User Entity", () => {
    const properties = Object.assign({}, userProperties);
    const user = User.create(properties);

    expect(user instanceof User).toBeTruthy();
    expect(user.id).toBeTruthy();
  });

  it("Should verfiy if customer is common and active", () => {
    const properties = Object.assign({}, userProperties);
    const user = User.create(properties);

    expect(user.commonUser).toBeTruthy();
    expect(user.active).toBeTruthy();
  });
  
  it("Should return most properties of User", () => {
    const properties = Object.assign({}, userProperties);
    const user = User.create(properties);

    expect(user.CPF_CNPJ).toBe(properties.CPF_CNPJ);
    expect(user.fullname).toBe(properties.fullname);
    expect(user.email).toBe(properties.email);
    expect(user.phone).toBe(properties.phone);
    expect(user.hash).toBeTruthy();
    expect(typeof user.hash).toBe("string");
  });

  it("Should toggle user", () => {
    const properties = Object.assign({}, userProperties);
    const user = User.create(properties);

    user.toggleActive();
    expect(user.active).toBeFalsy;

    user.toggleCommonUser();
    expect(user.commonUser).toBeFalsy();
  });
});
