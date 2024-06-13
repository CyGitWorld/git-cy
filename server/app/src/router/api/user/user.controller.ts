import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { jwt } from "hono/jwt";
import { z } from "zod";

import { type Env } from "../../../worker-env";
import { getUserJwtMiddleware } from "../../../middlewares/getUserJwtMiddleware";
import { AuthService } from "../auth/auth.service";
import { UserService } from "./user.service";

export const createUserController = ({
  authService,
  userService,
  env,
}: {
  authService: AuthService;
  userService: UserService;
  env: Env;
}) => {
  return new Hono()
    .post(
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

          const {
            avatar_url: thumbnailUrl,
            id: githubUserId,
            name,
            html_url: githubUrl,
            login: githubUserName,
            bio,
          } = await authService.getGithbuUserInfo({
            accessToken: githubAccessToken,
          });

          const user = await userService.getUserOrCreateUser({
            githubUserId,
            bio,
            name,
            githubUrl,
            githubUserName,
            thumbnailUrl,
          });

          const accessToken = await authService.createJwtAccessToken({
            userId: user.id,
            userName: name,
          });

          return ctx.json(
            {
              success: true,
              data: {
                ...user,
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
    )
    .get(
      "/me",
      jwt({
        secret: env.JWT_SECRET_KEY,
      }),
      getUserJwtMiddleware({ userService }),
      async (ctx) => {
        const user = ctx.get("user");

        return ctx.json({ success: true, data: user });
      }
    )
    .get(
      "/by-github-user-name/:githubUserName",
      zValidator(
        "param",
        z.object({
          githubUserName: z.string(),
        })
      ),
      async (ctx) => {
        const { githubUserName } = ctx.req.valid("param");
        const user = await userService.getUserByGithubUserName(githubUserName);

        if (user == null) {
          throw new HTTPException(401, { message: "유저 정보가 없습니다." });
        }

        return ctx.json({ success: true, data: user });
      }
    );
};
