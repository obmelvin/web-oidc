import { describe, expect, test } from "vitest";
import { Client } from "../src/client";
import { Issuer } from "../src/issuer";

describe(Client.name, () => {
  test.skip("fetches the userinfo", async () => {
    let google = await Issuer.discover("https://accounts.google.com");
    let client = new Client(google, {
      client_id: "",
      client_secret: "",
      redirect_uri: "",
      response_type: "code id_token",
    });

    let userinfo = await client.userinfo("token");

    expect(userinfo).toEqual({
      sub: "1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com",
      email: "john.doe@company.tld",
    });
  });

  test("generates the authorization URL", async () => {
    let google = await Issuer.discover("https://accounts.google.com");
    let client = new Client(google, {
      client_id: "CLIENT_ID",
      client_secret: "CLIENT_SECRET",
      redirect_uri: "https://company.tld/auth/callback",
      response_type: "code id_token",
    });

    let url = client.authorizationUrl({ state: "random" });

    expect(url.toString()).toEqual(
      "https://accounts.google.com/o/oauth2/v2/auth?response_type=code+id_token&client_id=CLIENT_ID&scope=openid&redirect_uri=https%3A%2F%2Fcompany.tld%2Fauth%2Fcallback&state=random"
    );
  });
});
