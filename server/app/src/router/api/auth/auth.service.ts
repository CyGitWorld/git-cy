import queryString from "query-string";
import { type Env } from "../../../worker-env";

type GithubAccessTokenError = {
  error: string;
  error_description: string;
  error_uri: string;
};
type GithubUserInfoError = {
  message: string;
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
    }).then((r) => r.json())) as { name: string } | GithubUserInfoError;

    if ("message" in res) {
      throw new Error(res.message);
    }

    return res;
  }
}
