import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { z } from "zod";

import { type Env } from "../../../worker-env";
import { createNewMockGuestBook,MOCK_GUEST_BOOK_LIST } from "./mock";

export const createGuestbookController = ({ env }: { env: Env }) => {
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
        return ctx.json({
          success: true,
          data: MOCK_GUEST_BOOK_LIST,
        });
      }
    )
    .post(
      "/",
      jwt({
        secret: env.JWT_SECRET_KEY,
      }),
      zValidator(
        "json",
        z.object({
          content: z.string(),
          guestbookId: z.number(),
          parentCommentId: z.nullable(z.number()),
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
