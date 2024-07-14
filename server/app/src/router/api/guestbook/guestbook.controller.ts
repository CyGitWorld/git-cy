import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { jwt } from "hono/jwt";
import { z } from "zod";

import { getUserJwtMiddleware } from "../../../middlewares/getUserJwtMiddleware";
import { type Env } from "../../../worker-env";
import { CommentService } from "../comment/comment.service";
import { UserService } from "../user/user.service";

export const createGuestbookController = ({
  env,
  commentService,
  userService,
}: {
  env: Env;
  commentService: CommentService;
  userService: UserService;
}) => {
  return new Hono()
    .get(
      "/:githubUserName",
      zValidator(
        "param",
        z.object({
          githubUserName: z.string(),
        })
      ),
      async (ctx) => {
        const { githubUserName } = ctx.req.valid("param");
        const { result, comments, guestbookId } =
          await commentService.getAllGuestbookCommentsByGithubUserName(
            githubUserName
          );
        if (result === "notFound") {
          throw new HTTPException(404, { message: "Guestbook not found" });
        }
        return ctx.json({
          success: true,
          data: { comments, guestbookId },
        });
      }
    )
    .post(
      "/",
      zValidator(
        "json",
        z.object({
          content: z.string(),
          githubUserName: z.string(),
          parentId: z.string().optional().nullable(),
        })
      ),
      jwt({
        secret: env.JWT_SECRET_KEY,
      }),
      getUserJwtMiddleware({ userService }),
      async (ctx) => {
        const { content, githubUserName, parentId } = ctx.req.valid("json");
        const user = ctx.get("user");

        const guestbook =
          await userService.getGuestbookByGithubUserName(githubUserName);

        if (guestbook == null) {
          throw new HTTPException(400, {
            message: "해당 유저는 방명록이 없어요",
          });
        }

        const comment = await commentService.createComment({
          content,
          guestbookId: guestbook.id,
          parentId: parentId ?? null,
          authorId: user.id,
        });

        return ctx.json({
          success: true,
          data: comment,
        });
      }
    )
    .put(
      "/",
      jwt({
        secret: env.JWT_SECRET_KEY,
      }),
      zValidator(
        "json",
        z.object({
          content: z.string(),
          id: z.string(),
        })
      ),
      async (ctx) => {
        const { content, id } = ctx.req.valid("json");

        const comment = await commentService.updateComment({
          content,
          id,
        });

        return ctx.json({
          success: true,
          data: comment,
        });
      }
    )
    .delete(
      "/",
      jwt({
        secret: env.JWT_SECRET_KEY,
      }),
      zValidator(
        "json",
        z.object({
          id: z.string(),
        })
      ),
      async (ctx) => {
        const { id } = ctx.req.valid("json");
        const { isSuccess } = await commentService.deleteComment({
          id,
        });

        return ctx.json({
          success: isSuccess,
        });
      }
    );
};
