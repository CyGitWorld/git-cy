import queryString from "query-string";

type GithubAccessTokenError = {
  error: string;
  error_description: string;
  error_uri: string;
};
type GithubUserInfoError = {
  message: string;
};
export class AuthService {
  async getGithubAccessToken({
    clientId,
    clientSecret,
    code,
  }: {
    clientId: string;
    clientSecret: string;
    code: string;
  }) {
    const uri = queryString.stringifyUrl({
      url: `https://github.com/login/oauth/access_token`,
      query: {
        client_id: clientId,
        client_secret: clientSecret,
        // TODO: redirect_uri 변경
        redirect_uri: "http://localhost:3000/oauth/redirect",
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
