import { generateToken, verifyToken } from "../../utils/jwtToken";

describe("JWT Token", () => {
  it("Should validate a JWT", () => {
    const email = "teste@teste.com";
    const token = generateToken(email);

    expect(token).toBeTruthy();
    expect(typeof token).toBe("string");

    const validated = verifyToken(token);
    expect(validated).toBeTruthy();
    expect(typeof validated).toBe("object");
  });

  it("Should not validate a JWT", () => {
    const fakeToken =
      "fk40LmvWnehVs2kyGFSn9AbKriWmIu9wNPU.ufvNI47gS576JzKScUVwLHJpgUuSmyC5D0rpzGMPrcP8BG8pbh5mqnCinF6Q8Rfii7BxrN7fqy.rpLLEIUR9SR1rUZ8D0rpzGMPrcPUR9SR1rFSn9AbKri";
    const fn = () => {
      verifyToken(fakeToken);
    };
    expect(fn).toThrow();
  });
});
