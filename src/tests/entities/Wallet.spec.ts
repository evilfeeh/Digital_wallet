import { Wallet, Iwallet } from "../../application/entities/Wallet";
describe("Entity Wallet", () => {
  const walletProperties: Iwallet = {
    user_id: "44918e02-3c87-4c64-ad81-e3e3261812df",
    debit_amount: 50.0,
  };
  it("Should be instatiate Wallet", () => {
    const properties = Object.assign({}, walletProperties);
    const wallet = Wallet.create(properties);

    expect(wallet instanceof Wallet).toBeTruthy();
    expect(wallet.id).toBeTruthy();
  });
});
