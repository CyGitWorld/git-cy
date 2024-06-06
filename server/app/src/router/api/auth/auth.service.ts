import queryString from "query-string";
import { sign, verify } from "hono/jwt";
import { EXPIRATION_DURATION } from "./constant";
import { UserRepository } from "../user/user.repository";
import { type Env } from "../../../worker-env";
import { JwtPayload } from "./types";

type GithubAccessTokenError = {
  error: string;
  error_description: string;
  error_uri: string;
};
type GithubUserInfoError = {
  message: string;
};

// https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user
type GithubUserInfo = {
  id: number;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  login: string; // ex. euijinkk
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
    const payload: JwtPayload = {
      sub: userId,
      name: userName,
      exp: now + EXPIRATION_DURATION,
      iat: now,
    };
    const secret = this.env.JWT_SECRET_KEY;
    const accessToken = await sign(payload, secret);

    return accessToken;
  }

  async verifyJwt(token: string) {
    const payload = (await verify(
      token,
      this.env.JWT_SECRET_KEY
    )) as JwtPayload;

    return payload;
  }
}
