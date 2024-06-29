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
});
