import ky from "ky";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import queryString from "query-string";
import { z } from "zod";

interface AuthServerDeps {}

type Bindings = {
  CLIENT_ID: string;
  CLIENT_SECRET: string;
};

export const createAuthServer = ({}: AuthServerDeps = {}) => {
  return new Hono<{ Bindings: Bindings }>().post(
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
          client_id: ctx.env.CLIENT_ID,
          client_secret: ctx.env.CLIENT_SECRET,
          redirect_uri: "http://localhost:3000/oauth/redirect",
          code: code,
        },
      });
      // WIP: 예외 처리
      const { access_token: accessToken } = (await fetch(uri, {
        headers: { Accept: "application/json" },
      }).then((r) => r.json())) as { access_token: string };

      const { name } = (await fetch(`https://api.github.com/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "User-Agent": "CyGitWorld",
        },
      }).then((r) => r.json())) as { name: string };

      return ctx.json({ name, accessToken }, 200);
    }
  );
};
