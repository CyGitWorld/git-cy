import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import queryString from "query-string";
import { z } from "zod";
import { AuthService } from "./auth.service";

type Bindings = {
  CLIENT_ID: string;
  CLIENT_SECRET: string;
};

export const createAuthServer = (authService: AuthService) => {
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

      const accessToken = await authService.getGithubAccessToken({
        clientId: ctx.env.CLIENT_ID,
        clientSecret: ctx.env.CLIENT_SECRET,
        code,
      });

      const { name } = await authService.getGithbuUserInfo({ accessToken });

      return ctx.json({ success: true, data: { accessToken, name } }, 200);
    }
  );
};
