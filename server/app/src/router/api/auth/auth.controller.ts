import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { AuthService } from "./auth.service";
import { HTTPException } from "hono/http-exception";
import { Env } from "../../../worker";
import { sign } from "hono/jwt";

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

        const githubAccessToken = await authService.getGithubAccessToken({
          code,
        });

        const { avatar_url, id, name, html_url } =
          await authService.getGithbuUserInfo({
            accessToken: githubAccessToken,
          });

        const accessToken = await authService.createJwtAccessToken({
          userId: id,
          userName: name,
        });

        return ctx.json(
          {
            success: true,
            data: {
              id,
              thumbnailUrl: avatar_url,
              githubUrl: html_url,
              name: name,
              accessToken: accessToken,
            },
          },
          200
        );
      } catch (e) {
        throw new HTTPException(401, {
          message: "Github 로그인에 실패했어요",
          cause: e,
        });
      }
    }
  );
};
