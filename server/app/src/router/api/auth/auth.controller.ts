import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { AuthService } from "./auth.service";
import { HTTPException } from "hono/http-exception";
import { type Env } from "../../../worker-env";

export const createAuthController = ({
  service: authService,
  env,
}: {
  service: AuthService;
  env: Env;
}) => {
  return new Hono().post(
    "/login",
    zValidator(
      "json",
      z.object({
        code: z.string(),
      })
    ),
    async (ctx) => {
      try {
        const { code } = ctx.req.valid("json");

        const accessToken = await authService.getGithubAccessToken({ code });

        const { name } = await authService.getGithbuUserInfo({ accessToken });

        return ctx.json({ success: true, data: { accessToken, name } }, 200);
      } catch (e) {
        throw new HTTPException(401, {
          message: "Github 로그인에 실패했어요",
          cause: e,
        });
      }
    }
  );
};
