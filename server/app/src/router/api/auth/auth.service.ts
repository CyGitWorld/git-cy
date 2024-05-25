import queryString from "query-string";
import { Env } from "../../../worker";
import { sign } from "hono/jwt";
import { EXPIRATION_DURATION } from "./constant";

type GithubAccessTokenError = {
  error: string;
  error_description: string;
  error_uri: string;
};
type GithubUserInfoError = {
  message: string;
};
type GithubUserInfo = {
  id: number;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
};
export class AuthService {
  private env;
  constructor({ env }: { env: Env }) {
    this.env = env;
  }

  async getGithubAccessToken({ code }: { code: string }) {
    const uri = queryString.stringifyUrl({
      url: `https://github.com/login/oauth/access_token`,
      query: {
        client_id: this.env.CLIENT_ID,
        client_secret: this.env.CLIENT_SECRET,
        redirect_uri: this.env.OAUTH_REDIRECT_URI,
        code: code,
      },
    });
    const res = (await fetch(uri, {
      headers: { Accept: "application/json" },
    }).then((r) => r.json())) as
      | { access_token: string }
      | GithubAccessTokenError;
    if ("error" in res) {
      console.log("res", res);
      throw new Error(res.error);
    }

    return res.access_token;
  }

  async getGithbuUserInfo({ accessToken }: { accessToken: string }) {
    const res = (await fetch(`https://api.github.com/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "User-Agent": "CyGitWorld",
      },
    }).then((r) => r.json())) as GithubUserInfo | GithubUserInfoError;

    if ("message" in res) {
      throw new Error(res.message);
    }

    return res;
  }

  async createJwtAccessToken({
    userId,
    userName,
  }: {
    userId: number;
    userName: string;
  }) {
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      sub: userId,
      name: userName,
      exp: now + EXPIRATION_DURATION,
      iat: now,
    };
    const secret = this.env.JWT_SECRET_KEY;
    const accessToken = await sign(payload, secret);

    return accessToken;
  }
}
