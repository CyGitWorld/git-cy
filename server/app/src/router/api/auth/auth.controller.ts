import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { AuthService } from "./auth.service";
import { HTTPException } from "hono/http-exception";
import { Env } from "../../../worker";
import { jwt } from "hono/jwt";
import { UserService } from "./user.service";

export const createAuthController = ({
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
                id: user.id,
                githubUserId,
                thumbnailUrl,
                githubUrl,
                name,
                githubUserName,
                bio,
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
      async (ctx) => {
        const credentials = ctx.req.raw.headers.get("Authorization");
        const token = credentials?.split(/\s+/)[1];
        if (token == null) {
          throw new HTTPException(401, { message: "인증에 실패했어요" });
        }
        const payload = await authService.verifyJwt(token);

        const user = await userService.getUserById(payload.sub);

        if (user == null) {
          throw new HTTPException(401, { message: "유저 정보가 없습니다." });
        }

        return ctx.json({ success: true, data: user });
      }
    );
};
