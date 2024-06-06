import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { createNewMockGuestBook } from "./mock";
import { jwt } from "hono/jwt";
import { type Env } from "../../../worker-env";
import { CommentService } from "../comment/comment.service";
import { HTTPException } from "hono/http-exception";
import { getUserJwtMiddleware } from "../../../middlewares/getUserJwtMiddleware";
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
        try {
          const { githubUserName } = ctx.req.valid("param");
          const { comments, guestbookId } =
            await commentService.getAllGuestbookCommentsByGithubUserName(
              githubUserName
            );
          return ctx.json({
            success: true,
            data: { comments, guestbookId },
          });
        } catch (e) {
          throw new HTTPException(404, { message: "Guestbook not found" });
        }
      }
    )
    .post(
      "/",
      zValidator(
        "json",
        z.object({
          content: z.string(),
          guestbookId: z.number(),
          parentId: z.number().optional().nullable(),
        })
      ),
      jwt({
        secret: env.JWT_SECRET_KEY,
      }),
      getUserJwtMiddleware({ userService }),
      async (ctx) => {
        const { content, guestbookId, parentId } = ctx.req.valid("json");
        const user = ctx.get("user");

        const comment = await commentService.createComment({
          content,
          guestbookId,
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
          commentId: z.number(),
        })
      ),
      async (ctx) => {
        const { content } = ctx.req.valid("json");
        return ctx.json({
          success: true,
          data: createNewMockGuestBook({ content }),
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
          commentId: z.number(),
        })
      ),
      async (ctx) => {
        ctx.req.valid("json");
        return ctx.json({
          success: true,
          data: true,
        });
      }
    );
};
