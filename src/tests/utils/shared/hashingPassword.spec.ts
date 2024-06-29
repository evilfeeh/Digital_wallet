import {
  hashingPassword,
  IsPasswordValid,
} from "../../../utils/shared/HashingPassword";

describe("Hashing Password Function", () => {
  it("Should hashing a variable correctly", () => {
    const prhase = "longHashUsedToTestCode#2024";
    const [salt, hash] = hashingPassword(prhase).split(":");

    expect(salt.length).toBe(32); // 16 bytes
    expect(hash.length).toBe(128); // 64 bytes
  });

  it("Should be check if password is Valid", () => {
    const prhase = "longHashUsedToTestCode#2024";
    const hash = hashingPassword(prhase);

    expect(IsPasswordValid(prhase, hash)).toBeTruthy();
  });

  it("Should reject an invalid password", () => {
    const prhase = "longHashUsedToTestCode#2024";
    const hash = hashingPassword(prhase);

    expect(IsPasswordValid("nãoConsigoLerNada", hash)).toBeFalsy();
  });
});
