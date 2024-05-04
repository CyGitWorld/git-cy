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
      const { access_token: accessToken } = await ky
        .get(uri, {
          headers: { Accept: "application/json" },
        })
        .json<{ access_token: string }>();

      // if (accessToken == null) {
      //   console.error("에러가 있는뎁쇼?");
      //   return ctx.status(403);
      // }

      const { name } = await ky
        .get(`https://api.github.com/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
            "User-Agent": "CyGitWorld",
          },
        })
        .json<{ name: string }>();

      const accessToken2 = "123";
      return ctx.json({ name, accessToken: accessToken2 }, 200);
    }
  );
};
