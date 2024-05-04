import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import queryString from "query-string";
import { z } from "zod";

interface AuthServerDeps {}

export const createAuthServer = ({}: AuthServerDeps) => {
  return new Hono().post(
    "/login",
    zValidator(
      "json",
      z.object({
        code: z.string(),
      })
    ),
    async (ctx) => {
      const { code } = ctx.req.valid("json");
      const uri = queryString.stringifyUrl({
        url: `https://github.com/login/oauth/access_token`,
        query: {
          client_id: (ctx.env as any).CLIENT_ID,
          client_secret: (ctx.env as any).CLIENT_SECRET,
          redirect_uri: "http://localhost:3000/oauth/redirect",
          code: code,
        },
      });
      console.log("uri", uri);
      const res1 = await fetch(uri, {
        headers: { Accept: "application/json" },
      });
      console.log("res1 status", res1.status);

      const response = await res1.json();

      console.log("response", response);

      if ("error" in response) {
        console.error("에러가 있는뎁쇼?", response.error_description);
        return ctx.status(403);
      }

      const { access_token: accessToken } = response;

      const res2 = await fetch(`https://api.github.com/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "User-Agent": "CyGitWorld",
        },
      }).then((r) => r.json());

      console.log("res2", res2);

      return ctx.json({ name: res2.name, accessToken });
    }
  );
};
